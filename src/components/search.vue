<template>
	<div class="search-container">
		<a-form-model
			layout="inline"
			:model="searchForm"
			@submit="handleSubmit"
			@submit.native.prevent
		>
			<a-form-model-item label="检索关键字">
				<a-input
					v-model="searchForm.searchWord"
					placeholder="请输入关键字"
				></a-input>
			</a-form-model-item>
			<a-form-model-item label="商品类目" class="category">
				<a-select
					show-search
					placeholder="请选择商品类型"
					style="width: 200px"
					@change="handleChange"
					allowClear
				>
					<template v-if="categoryList.length > 0">
						<a-select-option
							v-for="category in categoryList"
							:value="category.id"
							:key="category.id"
						>
							{{ category.name }}
						</a-select-option>
					</template>
				</a-select>
			</a-form-model-item>
			<a-form-model-item>
				<a-button type="primary" html-type="submit" class="btn">
					搜索
				</a-button>
			</a-form-model-item>
		</a-form-model>
	</div>
</template>

<script>
export default {
  props: ['categoryList'],
	data() {
		return {
			searchForm: {
				searchWord: '',
				category: '',
			},
		};
	},
	methods: {
		handleSubmit() {
			this.$emit('submit', this.searchForm);
		},
		handleChange(value) {
			this.searchForm.category = value;
		},
	},
};
</script>

<style scoped lang='less'>
.search-container {
	padding: 10px 30px;

	.category {
		margin: 0 30px;
	}

	.btn {
		margin-top: 0;
		margin-left: 20px;
	}
}
</style>
