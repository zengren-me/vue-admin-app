<template>
	<div class="productAdd-detail">
		<a-steps class="productAdd-steps" :current="current">
			<a-step v-for="item in steps" :key="item.title" :title="item.title" />
		</a-steps>
		<div class="steps-content">
            <BasicDetail v-if="current === 0" @next="next" :formData="formData"/>
			<SaleDetail v-if="current === 1" @next="next" @prev="prev" :formData="formData"/>
		</div>
	</div>
</template>
<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import productApi from '@/api/product';

export default {
    components: {
        BasicDetail,
		SaleDetail,
    },
	data() {
		return {
			current: 0,
			steps: [
				{
					title: '填写商品基本信息',
				},
				{
					title: '填写商品销售信息',
				},
			],
			formData: {
				title: '',
				desc: '',
				category: '',
				c_item: [],
				tags: [],
				price: 0,
				price_off: 0,
				inventory: 0,
				unit: '',
				images: [],
			},
		};
	},
	created() {
		if (this.$route.params.id) {
			productApi.getProductDetail(this.$route.params.id).then((res) => {
				this.formData = res.data;
			});
		}
	},
	methods: {
		next() {
			if (this.current === 1) {
				if (this.$route.params.id) {
					productApi.editProduct(this.formData).then((res) => {
						this.$message.success(`修改${res.msg}!`);
						this.$router.push({
							name: 'ProductList',
						});
					});
				} else {
					productApi.addProduct(this.formData).then(() => {
						this.$message.success('添加成功!');
						this.$router.push({
							name: 'ProductList',
						});
					});
				}
			} else {
				this.current += 1;
			}
		},
		prev() {
			this.current -= 1;
		},
	},
};
</script>
<style scoped lang="less">
.productAdd-detail{
  .productAdd-steps {
    width: 50%;
    margin: 20px auto;
}

.steps-content {
	margin-top: 16px;
	border: 1px dashed #e9e9e9;
	border-radius: 6px;
	background-color: #fafafa;
	min-height: 200px;
	text-align: center;
	padding-top: 80px;
}

.steps-action {
	margin-top: 24px;
}
}

</style>
