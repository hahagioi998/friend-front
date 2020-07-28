<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: 登陆人默认: 李四</div>
    <br/>
    <div class="dashboard-text">模块: 个人中心</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
