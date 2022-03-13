<template>
  <div class="basic-detail">
    <a-form-model ref="ruleForm" :model="formData" :rules="rules"
        :label-col="{span: 6}" :wrapper-col="{span: 13}">
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="formData.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="formData.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select v-model="formData.category" placeholder="请选择商品类别" @change="changeCategory">
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
              {{c.name}}
            </a-select-option>
        </a-select>
        <a-select v-model="formData.c_item" placeholder="请添加子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{c}}
        </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="请选择商品标签"
          :default-value="['包邮，最晚次日达']"
          v-model="formData.tags"
        >
          <a-select-option
            value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{span: 22}">
          <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
	props: ['formData'],
	data() {
		return {
			rules: {},
			categoryList: [],
			categoryItems: [],
		};
	},
	created() {
		categoryApi.getCategoryList().then((res) => {
        this.categoryList = res.data.data;
        if (this.$route.params.id) {
           for (let i = 0; i < this.categoryList.length; i += 1) {
              if (this.categoryList[i].id === this.formData.category) {
                this.categoryItems = this.categoryList[i].c_items;
              }
           }
        }
		});
	},
	methods: {
		changeCategory() {
			for (let i = 0; i < this.categoryList.length; i += 1) {
				if (this.categoryList[i].id === this.formData.category) {
					this.categoryItems = this.categoryList[i].c_items;
				}
			}
		},
		next() {
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {
				this.$emit('next');
				return true;
				}
				this.$message.error('请填写商品基本信息!');
				return false;
			});
		},
	},
};
</script>

<style scoped lang="less">
.basic-detail-container {
	.basic-btn {
		text-align: center;
	}
}
</style>
