<template>
    <div class="category-add">
    <a-form-model ref="ruleForm" class="form" :model="formData" :rules="rules"
        :label-col="{span: 6}" :wrapper-col="{span: 13}">
        <a-form-model-item label="类目名称" prop="name" required>
             <a-input v-model="formData.name" />
        </a-form-model-item>
      <a-form-model-item label="商品子类目" prop="c_items" required>
        <a-select
          mode="tags"
          placeholder="请添加商品子类目"
          v-if="isShow"
          v-model="formData.c_items"
          @change="handleChange"
        >
         <template v-if="formData.c_items.length > 0">
            <a-select-option v-for="item in formData.c_items" :key="item" :value="item">
                {{ item }}
            </a-select-option>
         </template>
         <a-select-option v-else value="请添加子类目">
                请添加子类目
            </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{span: 22}">
          <a-button type="primary" @click="submit">提交</a-button>
      </a-form-model-item>
    </a-form-model>
    </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
    data() {
        return {
            rules: {},
            formData: {
                id: 0,
                name: '',
                c_items: [],
            },
            categoryList: [],
            isShow: false,
        };
    },
    created() {
        categoryApi.getCategoryList().then((res) => {
            const { id } = this.$route.params;
            if (id) {
                this.formData.c_items = res.data.data.filter((item) => item.id === +id)[0].c_items;
                this.formData.name = res.data.data.filter((item) => item.id === +id)[0].name;
            }
            this.categoryList = res.data.data;
            this.isShow = true;
        });
    },
    methods: {
        submit() {
            this.$refs.ruleForm.validate((valid) => {
				if (valid) {
                    const { id } = this.$route.params;
                    if (id) {
                        categoryApi.editCategory({
                            id,
                            ...this.formData,
                        }).then((res) => {
                            this.$message.success(`修改${res.msg}!`);
                            this.$router.push({
                                name: 'CategoryList',
                            });
                        });
                    } else {
                        this.formData.id = this.categoryList.length + 1;
                        categoryApi.addCategory(this.formData).then((res) => {
                            this.$message.success(`新增${res.msg}!`);
                            this.$router.push({
                                name: 'CategoryList',
                            });
                        });
                    }

				return true;
				}
				this.$message.error('请填写新增类目!');
				return false;
			});
        },
        handleChange(e) {
            this.formData.c_items = e;
        },
    },
};
</script>

<style lang="less" scoped>
.category-add{
    width: 100%;
    height: 500px;
    padding-top: 100px;
	background-color: #fafafa;

    .form{
    min-height: 200px;
	text-align: center;

    }
}
</style>
