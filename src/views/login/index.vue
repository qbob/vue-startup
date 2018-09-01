<template>
  <div>
    <h1>login</h1>
    <div @click="handleSubmit">
      点击登录
    </div>
  </div>

</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit () {
      this.handleLogin()
    }
  }
}
</script>
