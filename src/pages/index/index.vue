<template>
  <view class="content">
    <image class="logo" src="../../static/logo.png" mode />
    <button type="primary">页面主操作 primary</button>
    <button type="default">次要操作 default</button>
    <button type="error">111</button>
    <view>
      <view v-for="(title, key) in titles" :key="key" class="title" data-a="1">{{ title }}</view>
      <view
        :class="['class-item', item.active ? 'active' : '']"
        v-for="(item, index) in classList"
        :key="index"
        @click="chooseClass(index)"
      >
        <view class="class-title">{{ item.skuName }}</view>
        <pview class="class-num">共{{ item.lessonCnt }}节</pview>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Index extends Vue {
  titles: string[] = ['title1', 'title2']
  $req: any
  $api: any

  async onLoad(options: any) {
    const data: any = await this.$req.get('https://yyrd-docker.suanshubang.com/handwrite/course/home', {})
    console.log(data)
    const data1: any = await this.$req.post(this.$api.common.switch, {})
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.content {
  text-align: center;
  height: 400upx;
  bottom: 100upx;
  button {
    width: 500upx;
    margin-bottom: 50upx;
  }
  .logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }
}
</style>
