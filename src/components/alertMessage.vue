<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import eventBus from '@/assets/bus'
export default Vue.extend({
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (status: string, message: string) {
      const vm = this
      let dateTime = Math.floor(new Date().getTime() / 1000)
      let result: object[] = vm.messages
      result.push({
        status: status,
        message: message,
        NowTime: dateTime
      })
      console.log(vm.messages)
      vm.AutoRemoveMessage(dateTime)
    },
    removeMessage (item: number) {
      this.messages.splice(item, 1)
    },
    AutoRemoveMessage (dateTime: number) {
      const vm = this
      setTimeout(() => {
        vm.messages.splice(0, 1)
      }, 10000)
    }
  },
  created () {
    eventBus.$on('messsage:push', (msg: string, status: string) => {
      this.updateMessage(status, msg)
    })
  }
})
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
