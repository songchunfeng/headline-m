<template>
  <div class="search-container">
    <!-- 搜索区 -->
    <form action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="onCancel"
        @focus="isResultShow = false"
        @input="onSearchInput"
        shape="round"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
    v-if="isResultShow"
    :q="searchContent"
    ></search-result>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search"
      v-for="(item,index) in suggestions"
      :key="index"
      @click="onSearch(item)"
      >
        <div v-html="heightlight(item)" slot="title"></div>
    </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistory = []">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete"  @click="isDeleteShow = true"/>
      </van-cell>
      <van-cell
      :title="item"
      v-for="(item,index) in searchHistory"
      :key="index"
      @click="onHistoryClick(item,index)"
      >
        <van-icon v-show="isDeleteShow" name="close"></van-icon>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import { getSuggestions } from '@/api/search.js'
import SearchResult from './component/search-result'
import { debounce } from 'lodash' // 引入第三方进行防抖处理
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  data () {
    return {
      searchContent: '', // 搜索内容
      isResultShow: false, // 搜索结果是否显示
      suggestions: [], // 联想建议
      searchHistory: getItem('search-history') || [], // 搜索历史记录
      isDeleteShow: false // 删除状态的显示
    }
  },
  watch: {
    searchHistory (newVal) {
      setItem('search-history', newVal)
    }
  },
  methods: {
    onSearch (q) {
      // alert(1)
      // console.log('onSearch')
      // 1.更新搜索框数据
      this.searchContent = q // 将文本框内容改为传入的数据
      // 2.搜索历史记录添加
      const searchHistory = this.searchHistory
      const index = searchHistory.indexOf(q)
      if (index !== -1) {
        searchHistory.splice(index)
      }
      searchHistory.unshift(q)
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 联想建议
    // debounce 函数 参数1：函数， 参数2：防抖的时间
    // 返回值：防抖之后的函数，和参数1是一样的
    onSearchInput: debounce(async function () {
      // 如果输入框内容为空则返回
      if (!this.searchContent) {
        return
      }
      const { data } = await getSuggestions(this.searchContent)
      this.suggestions = data.data.options
    }, 200),
    // 搜索内容高亮
    heightlight (str) {
      const searchContent = this.searchContent
      // new RegExp 创建一个正则表达式，如果用/searchContent/会默认写死
      // g是全局改变，i是不区分大小写
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color:#3296fa">${searchContent}</span>`)
    },
    // 删除历史记录
    onHistoryClick (item, index) {
      // 如果是删除状态就执行删除操作
      if (this.isDeleteShow) {
        this.searchHistory.splice(index, 1)
      } else {
        // 如果不是删除状态就执行搜索
        this.onSearch(item)
      }
    }
  }
}
</script>

<style>
</style>
