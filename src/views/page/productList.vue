<template>
	<div class="productList-container" ref="productList">
		<!-- 头部搜索栏 -->
		<Search @submit="handleSubmit" :categoryList="categoryList" />
		<a-button class="productAdd">
			<router-link :to="{ name: 'ProductAdd' }"> 添加商品 </router-link>
		</a-button>
		<!-- 商品列表内容区 -->
		<ProductTable
			:data="productTable"
			:page="page"
			@changePage="handleChangePage"
			@edit="handleEditProduct"
			@remove="handleRemoveProduct"
		/>
	</div>
</template>

<script>
import Search from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import categoryApi from '@/api/category';
import productApi from '@/api/product';

export default {
	components: {
		Search,
		ProductTable,
	},
	data() {
		return {
			searchForm: {},
			productTable: [],
			categoryList: [],
			categoryObj: {}, // item category每一项 { item.id: item.name  }
			page: {
				current: 1,
				pageSize: 10,
				showSizeChanger: true,
				total: 1,
			},
		};
	},
	created() {
		categoryApi.getCategoryList().then((res) => {
			this.categoryList = res.data.data;
			this.categoryList.forEach((item) => {
				this.categoryObj[item.id] = item.name;
			});
		});
		this.getTableData();
	},
	methods: {
		handleSubmit(searchForm) {
			this.searchForm = searchForm;
			this.getTableData();
		},
		getTableData() {
			productApi.getProductTable({
					page: this.page.current,
					size: this.page.pageSize,
					...this.searchForm,
				})
				.then((res) => {
					this.productTable = res.data.data.map((item) => ({
						...item,
						categoryName: this.categoryObj[item.category],
					}));
					this.page.total = res.data.total;
				});
		},
		// 页码变化后重新请求数据
		handleChangePage(page) {
			this.page = page;
			this.getTableData();
			document.documentElement.scrollTop = 0;
		},
		// 商品列表中编辑商品
		handleEditProduct(record) {
			this.$router.push({
				name: 'ProductEdit',
				params: {
					id: record.id,
				},
			});
		},
		handleRemoveProduct(record) {
			this.$confirm({
				title: '确定要删除',
				content: () => <div style="color:red;">{record.title}</div>,
				onOk: () => {
					productApi.removeProduct(record.id).then((res) => {
						this.getTableData();
						this.$message.success(`删除${res.msg}!`);
					}).catch((error) => {
						this.$message.error(`删除${error.msg}!`);
					});
				},
				onCancel() {},
				class: 'removeProduct',
			});
		},
	},
};
</script>

<style lang="less" scoped>
.productList-container {
	position: relative;

	.productAdd {
		position: absolute;
		right: 50px;
		top: 4px;
	}
}
</style>
