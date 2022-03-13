<template>
     <div class="sale-detail">
      <a-form-model ref="ruleForm" :model="formData" :rules="rules"
        :label-col="{span: 6}" :wrapper-col="{span: 13}">
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="formData.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="formData.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory" required>
        <a-input v-model="formData.inventory" />
      </a-form-model-item>
       <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="formData.unit" placeholder="请填写商品计量单位"/>
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
        :action="'https://mallapi.duyiedu.com/upload/images?appkey='+ $store.state.user.appkey"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
        >
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
            Upload
            </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
         <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label="" class="sale-btn" :wrapperCol="{span: 22}">
            <a-button type="default" @click="prev">上一步</a-button>
            <a-button type="primary" @click="next">提交</a-button>
      </a-form-model-item>
    </a-form-model>
     </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
    props: ['formData'],
    data() {
        return {
            rules: {},
            fileList: [],
            loading: false,
            previewVisible: false,
            previewImage: '',
        };
    },
    created() {
      this.fileList = this.formData.images.map((item, index) => ({
          uid: index,
          name: `image-${index}.png`,
          status: 'done',
          url: item,
        }));
    },
    methods: {
        handleCancel() {
          this.previewVisible = false;
          this.loading = false;
        },
        async handlePreview(file) {
            const obj = file;
            if (!file.url && !file.preview) {
                obj.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
         handleChange({ file, fileList }) {
            if (file.status === 'done') {
              this.formData.images.push(file.response.data.url);
            } else if (file.status === 'removed') {
              const { url } = file.response.data;
              this.formData.images = this.formData.images.filter((item) => item !== url);
            }
            this.fileList = fileList;
        },
        prev() {
            this.$emit('prev');
        },
        next() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                  this.$emit('next');
                  return true;
                }
                this.$message.error('请填写商品销售信息!');
                return false;
            });
        },
    },
};
</script>

<style scoped>
.sale-btn button{
    margin: 0 10px;
}
</style>
