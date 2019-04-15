<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
// 測試 Axios 正確運行
import Vue from 'vue'
export default Vue.extend({
  created () {
    const api = `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP001/10601`
    const vm = this
    ;(async function () {
      await vm.$http.get(api)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }())
    console.log('secondData')
  }
})
</script>
