<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">產品管理介面</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button class="btn btn-success text-white">建立新產品</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td>{{item.origin_price}}</td>
            <td>{{item.price}}</td>
            <td>未啟用</td>
            <td>
              <button class="btn btn-outline-primary btn-sm">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      const vm = this
      this.$http.get(api).then(response => {
        if (response.data.success) {
          this.products = response.data.products
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
})
</script>
