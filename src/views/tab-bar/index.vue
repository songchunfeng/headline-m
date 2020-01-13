<template>
  <div>
    <!-- 子路由出口 -->
    <router-view />
    <!-- tab-bar引用 -->
    <van-tabbar router>
      <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
      <van-tabbar-item icon="question-o" to='/qa'>问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to='/video'>视频</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to='/my'>{{$store.state.user? '我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
