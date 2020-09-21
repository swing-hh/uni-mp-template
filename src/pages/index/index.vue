<template>
  <view class="content">
    <image class="logo" :src="'../../static/logo.png'"></image>
    <button type="primary">页面主操作 primary</button>
    <button type="default">次要操作 default</button>
    <button type="error">111</button>
    <view>
      <view v-for="(title, key) in titles" :key="key" class="title">{{ title }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})

export default class Home extends Vue {
  titles: string[] = ['title1', 'title2'];

  onLoad (options: any) {

  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.content {
  text-align: center;
  height: 400upx;
  bottom: 100upx;
  button{
    width: 500upx;
    margin-bottom: 50upx;
  }
  .logo{
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }
}
</style>
