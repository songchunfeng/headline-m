<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        type="danger"
        round
        size="mini"
        @click="isEditShow = !isEditShow"
      >{{isEditShow ? "完成" :"编辑"}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel,index) in userChannels"
        :key="channel.id"
        @click="userChannelClick(index)"
      >
      <!-- 如果传过来的active和当前index相等，则添加active类 -->
        <span slot="text" class="text" :class="{
            active:active == index
        }">{{channel.name}}</span>
        <van-icon v-show="isEditShow && index !== 0" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/channel.js'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false // 编辑的状态
    }
  },
  computed: {
    //   计算剩余频道:全部频道-我的频道
    remainingChannels () {
      const channels = [] // 剩余频道数组
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        //   遍历所有频道的值与我的频道做对比，如果我的频道中没有则添加到channels中
        if (!userChannels.find(remain => remain.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    //   将我的频道中的数据放到本地存储
    userChannels () {
      setItem('user-channels', this.userChannels)
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    //   获取全部频道
    async loadAllChannels () {
      const { data } = await getAllChannel()
      this.allChannels = data.data.channels
      //   console.log(this.allChannels)
    },
    // 添加频道
    addChannel (channel) {
      // 将点击的channel添加到我的频道中
      this.userChannels.push(channel)
    },
    // 删除或切换频道
    userChannelClick (index) {
      // 如果是编辑状态，可以删除
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1) // 在我的频道列表中删除元素
      } else {
        this.$emit('switch', index) // 子组件控制父组件的弹窗
      }
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 40px;
  position: relative;
  /deep/ .van-grid-item__icon-wrapper {
    position: absolute;
    top: -14px;
    right: -5px;
    .van-icon-close {
      font-size: 14px;
    }
  }
  .van-grid-item__text,
    .text {
      font-size: 14px;
      color: #222;
    }
    .active {
        color: red;
    }
}
</style>
