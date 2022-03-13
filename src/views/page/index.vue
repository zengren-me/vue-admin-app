<template>
     <div class="index-container" v-if="isShow">
         <Card :data="data"/>
         <Charts />
     </div>
</template>

<script>
import Card from '@/components/card.vue';
import Charts from '@/components/charts.vue';
import productApi from '@/api/product';

export default {
    components: {
        Card,
        Charts,
    },
    data() {
      return {
          data: {
            productTotal: 0,
            userTotal: 0,
            saleTotal: 0,
          },
          isShow: false,
      };
    },
    created() {
      productApi.getProductTable().then((res) => {
        this.data.productTotal = res.data.total;
        for (let i = 0; i < res.data.data.length; i += 1) {
            this.data.saleTotal += res.data.data[i].sale;
        }
        this.data.userTotal = Math.ceil(this.data.saleTotal / this.data.productTotal);
        this.isShow = true;
      });
    },
};
</script>
