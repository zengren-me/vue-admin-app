<template>
    <div class="category">
	<div class="header">
		<a-button class="btn">
			<router-link :to="{ name: 'CategoryAdd' }">添加类目</router-link>
		</a-button>
	</div>
    <a-table
    class="category-table"
	:columns="columns"
	:data-source="categoryList"
	@change="handleChangePage"
    :pagination="page"
	>
		<div slot="operation" slot-scope="text, record">
			<a-button @click="handleEditCategory(record)">编辑</a-button>
			<a-button @click="handleRemoveCategory(record)">删除</a-button>
		</div>
	</a-table>
    </div>
</template>

<script>
import categoryApi from '@/api/category';

const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: '类目名',
		dataIndex: 'name',
		key: 'name',
		ellipsis: true,
	},
	{
		title: '操作',
		dataIndex: 'operation',
		key: 'operation',
		width: 200,
		scopedSlots: { customRender: 'operation' },
		ellipsis: true,
	},
];

export default {
    data() {
        return {
            columns,
            categoryList: [],
            page: {
				current: 1,
				pageSize: 5,
				total: 1,
			},
        };
    },
    created() {
        this.getCategoryTable();
    },
    methods: {
        getCategoryTable() {
            categoryApi.getCategoryList({
				page: this.current,
				size: this.pageSize,
			}).then((res) => {
            this.categoryList = res.data.data.map((item) => ({
                ...item,
                key: item.id,
            }));
			this.page.total = res.data.total;
            });
        },
        handleChangePage(page) {
			this.page = page;
			this.getCategoryTable();
			document.documentElement.scrollTop = 0;
		},
		// 商品列表中编辑商品
		handleEditCategory(record) {
			this.$router.push({
				name: 'CategoryEdit',
				params: {
					id: record.id,
				},
			});
		},
		handleRemoveCategory(record) {
			this.$confirm({
				title: '确定要删除',
				content: () => <div style="color:red;">{record.title}</div>,
				onOk: () => {
					categoryApi.removeCategory(record.id).then((res) => {
						this.getCategoryTable();
						this.$message.success(`删除${res.msg}!`);
					}).catch((error) => {
						this.$message.error(`删除${error.msg}!`);
					});
				},
				onCancel() {},
				class: 'removeCategory',
			});
		},
    },
};
</script>

<style lang="less" scoped>
.category {
    width: 100%;
    margin: 0 auto;
    background-color: #fafafa;
	.header{
		position: relative;
		height: 40px;
		background-color: #fff;

		.btn{
			position: absolute;
			top: 4px;
			right: 50px;
			margin-top: 0;
		}
	}

    .category-table{
        width: 700px;
        margin: 0 auto;
    }
}
</style>
