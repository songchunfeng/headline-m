<template>
  <div class="search-result">
    <!-- 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页数，默认为1
      perPage: 20 // 每页数量
    }
  },
  created () {
    // console.log(this.q)
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getSearchResult({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
      //   将结果放到列表中
      //   console.log(data)
      const result = data.data.results

      this.list.push(...result)
      // 加载结束
      this.loading = false
      //   下拉刷新
      if (result.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
