<template>
<!-- 下拉刷新 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- v-model控制下拉刷新load状态，refresh触发新的事件 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <div>{{channel.name}}</div> -->
    <van-cell
    v-for="(article,index) in list"
    :key="index"
    :title="article.title"
    @click="$router.push('/article/'+ article.art_id)"
    />
  </van-list>
</van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/articles.js'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false, // 数据是否加载完毕
      timestamp: null, // 用于获取下一页数据的时间戳
      count: 0,
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 当前点击的channel的id
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      //   console.log(data)

      // 将数据放入列表
      const result = data.data.results
      this.list.push(...result)
      //   // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      // 加载状态结束
      this.loading = false
      if (result.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 500)
    },
    async onRefresh () {
    // 获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(), // 下拉刷新获取最新的数据
        with_top: 1
      })
      // 将数据放到更新的列表中
      const { results } = data.data
      this.list.unshift(...results)
      //   关闭下拉刷新
      this.isLoading = false
      // 数据更新提醒
      this.$toast(`更新了${results.length}条数据`)
    //   setTimeout(() => {
    //     this.$toast('刷新成功')
    //     this.isLoading = false
    //     this.count++
    //   }, 500)
    }

  }
}
</script>

<style>
</style>
