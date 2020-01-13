<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar title="黑马头条号" left-arrow />
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="default" size="small">编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{user.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{user.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
      <van-cell v-for="(article,index) in list"
        :key="index"
        :title="article.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserById } from '@/api/user.js'
import { getArticlesByUser } from '@/api/articles'
export default {
  name: 'userPage',
  data () {
    return {
      user: {}, // 用户信息列表
      list: [], // 文章列表数据
      loading: false, // 控制上拉加载更多
      finished: false, // 是否加载结束
      page: 1 // 获取下一页页码
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.user = data.data
        // console.log(this.user)
      } catch (error) {
        this.$toast('用户信息获取失败')
        console.log(error)
      }
    },
    // 列表加载
    async onLoad () {
      // 获取数据
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page,
        per_page: 20
      })
      // 将获取的数据添加到列表中
      //   console.log(data)
      const { results } = data.data
      this.list.push(...results)

      //    异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      // 加载状态结束
      this.loading = false

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 500)
      // 判断是否加载完成
      if (results.length) {
        this.page++ // 更新获取下一页数据
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
