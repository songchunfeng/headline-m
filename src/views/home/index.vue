<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow  = true" />
      <van-tab :title="channel.name" :key="channel.id" v-for="channel in userChannels">
        <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 标签编辑弹层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      round
    >
      <channel-edit :user-channels="userChannels" @switch="onChannelSwitch" :active="active"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/channel.js'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'home',
  components: {
    articleList,
    channelEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [], // 用户频道列表
      isChannelEditShow: false // 弹层弹出
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    // 获取我的频道
    // 当本地存储中有数据就优先从本地存储中获取
    async loadUserChannels () {
      try {
        let channels = [] // 用来存储频道列表
        // 获取本地频道列表
        const loaclUserChannels = getItem('user-channels')
        if (loaclUserChannels) {
          // 如果本地有就用本地的
          channels = loaclUserChannels
        } else {
          // 如果没有就用后台接口的
          const { data } = await getUserChannel()
          // console.log(data)

          channels = data.data.channels
        }
        this.userChannels = channels
      } catch (error) {
        console.log(error)
      }

      // console.log(this.userChannel)
    },
    // 频道切换
    onChannelSwitch (index) {
      this.isChannelEditShow = false // 关闭弹窗
      this.active = index // 切换频道，将点击的索引值给activ
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
