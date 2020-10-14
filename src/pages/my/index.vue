<template>
  <view class="center">
    <image :class="['top-image', { 'has-bang': hasBang }]" mode="scaleToFill" :src="topSrc" @error="imageError" />
    <button v-if="!zybuss" plain class="user-info" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" id="my_login_click">
      <view class="avatar-wrap">
        <image mode="scaleToFill" class="avatar" src="@/static/logo.png" @error="imageError" />
      </view>
      <view class="basic-wrap">
        <view class="basic-info">
          <button class="name btn" plain>点击登录</button>
          <text class="phone un-sign">登录后解锁更多功能</text>
        </view>
      </view>
    </button>
    <view v-else class="user-info" id="my_info_click" @click="myLayout">
      <view class="avatar-wrap">
        <image mode="scaleToFill" class="avatar" :src="headPortrait" @error="imageError" />
      </view>
      <view class="basic-wrap">
        <view class="basic-info">
          <text class="name">{{ formatNickName }}</text>
          <text class="phone">{{ phone }}</text>
        </view>
      </view>
    </view>
    <dialog-center></dialog-center>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { showToast } from '@/utils/util'
import { getWxUser, login, loginbycode, getzybuss, layout } from '@/components/login/index'
import dialogCenter from '@/components/dialog/center.vue'
import Req from '@/utils/req'
import Api from '@/utils/api'

@Component({
  name: 'index',
  components: { dialogCenter }
})
export default class Index extends Vue {
  zybuss: string = ''
  headPortrait: string = ''
  formatNickName: string = ''
  phone: string = ''

  // 判断是否为刘海屏
  get hasBang() {
    let has: boolean = false
    const { statusBarHeight = 20 } = uni.getSystemInfoSync()
    // 刘海屏 statusBarHeight 44
    if (statusBarHeight > 40) {
      has = true
    }
    return has
  }

  // 判断头部使用图片
  get topSrc() {
    return this.hasBang ? 'https://zyb-yayapub-1253445850.file.myqcloud.com/fe/topX.png' : 'https://zyb-yayapub-1253445850.file.myqcloud.com/fe/top.png'
  }

  async onLoad() {
    this.zybuss = getzybuss()
    await loginbycode()
    if (this.zybuss) {
      this.getUserInfo() // 获取用户信息
    }
  }

  // 拿到手机号登陆
  async getPhoneNumber(e) {
    if (e.detail.errMsg && e.detail.encryptedData && e.detail.iv) {
      const wxUser: string = getWxUser()
      const zybuss: string = await login(wxUser, e.detail.encryptedData, e.detail.iv)
      if (zybuss) {
        this.zybuss = zybuss
        this.getUserInfo()
      }
    } else {
      showToast('您已拒绝授权，请重新授权')
    }
  }

  // 获取登陆后的信息
  async getUserInfo() {
    const userInfoData: any = await Req.post(Api.my.userInfo, {})
    this.headPortrait = userInfoData.avatarkid
    this.formatNickName = userInfoData.nickName
    this.phone = userInfoData.phone
  }

  // 退出
  myLayout() {
    layout()
    this.zybuss = ''
  }

  imageError() {}
}
</script>

<style type="text/scss" lang="scss" scoped>
.top-image {
  width: 100%;
  height: 270upx;
  &.has-bang {
    height: 320upx;
  }
}
.user-info {
  display: flex;
  align-items: center;
  height: 150upx;
  margin: 0 29upx 0 32upx;
  padding: 0;
  border: none;
  overflow: visible;

  .avatar-wrap {
    background: #ffffff;
    position: relative;
    top: -30upx;
    width: 184upx;
    height: 184upx;
    border-radius: 50%;
    .avatar {
      position: absolute;
      top: 12upx;
      left: 12upx;
      width: 160upx;
      height: 160upx;
      border-radius: 50%;
    }
  }
  .basic-wrap {
    width: calc(100% - 185upx);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 31upx;
    box-sizing: border-box;
    .basic-info {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 42upx;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        &.btn {
          height: 60upx;
          line-height: 60upx;
          border: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
      }
      .phone {
        font-size: 28upx;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        &.un-sign {
          color: #666666;
        }
      }
    }
  }
}
</style>
