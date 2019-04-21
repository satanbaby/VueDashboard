<template>
  <div class="home">
    <input type="button" value="登出" class="btn btn-outline-danger" @click="loginOut">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    loginOut () {
      const api = `${process.env.VUE_APP_Path}/logout`
      this.$http.post(api)
        .then(response => {
          if (response.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
})
</script>
