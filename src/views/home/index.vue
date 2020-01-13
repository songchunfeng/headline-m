<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" :key="channel.id" v-for="channel in userChannel">
        <article-list :channel = 'channel'></article-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel.js'
import articleList from './components/article-list'

export default {
  name: 'home',
  components: {
    articleList
  },
  data () {
    return {
      active: 0,
      userChannel: [] // 用户频道列表
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      const { data } = await getUserChannel()
      this.userChannel = data.data.channels
      // console.log(this.userChannel)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap{
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
