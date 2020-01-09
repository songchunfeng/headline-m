<template>
  <div class="login">
    <!-- 导航 -->
    <van-nav-bar title="标题" />
    <!-- 表单验证 -->
    <ValidationObserver ref="myForm">
      <!-- 表单 -->
      <van-cell-group>
          <!-- 为了立刻获取到错误 -->
          <!-- 多个校验方法用|间隔 -->
        <ValidationProvider name="手机号" rules="required|mobile" immediate>
          <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号">
            <!-- <i></i> -->
            <van-icon class-prefix="icon" name="mobile" slot="left-icon" />
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|code" immediate>
          <van-field v-model="user.code" type="text" label="验证码" placeholder="请输入验证码">
            <van-icon class-prefix="icon" name="lock" slot="left-icon" />
            <van-count-down
              v-if="countDownShow"
              slot="button"
              :time="1000 * 5"
              format="ss 秒"
              @finish="countDownShow = false"
            />
            <van-button
              v-else
              slot="button"
              size="small"
              type="info"
              round
              @click="onSendSmsCode"
            >发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="login-btn-container">
      <van-button class="login-btn" type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { validate } from 'vee-validate'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      countDownShow: false
    }
  },
  methods: {
    async onLogin () {
      // 表单验证
      const success = await this.$refs.myForm.validate()

      if (!success) {
        // console.log('表单验证失败')
        const error = this.$refs.myForm.errors
        for (let key in error) {
          const item = error[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }
      // 在加载中要有提示
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        await login(this.user)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 发送验证码
    async onSendSmsCode () {
      const { mobile } = this.user
      try {
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        getSmsCode(mobile)
        this.countDownShow = true
      } catch (error) {
        this.countDownShow = false
        this.$toast.fail('请勿频繁操作')
        // this.$toast.fail('请勿频繁操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-btn-container {
    padding: 27px 16px;
    .login-btn {
      width: 100%;
      border-radius: 5px;
      border-style: none;
      background: #6db4fb;
    }
  }
  .van-cell {
    align-items: center;
  }
}
</style>
