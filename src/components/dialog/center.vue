<template>
  <uni-popup ref="popup" type="center" :animation="animation" :maskClick="maskClick">
    <view class="center">
      <view class="title">{{ title }}</view>
      <view class="close" v-if="showCloseBtn">&times;</view>
      <view>
        <view>{{ desc }}</view>
      </view>
      <view>
        <button type="default" v-if="singleBtn">{{ cancelBtnText }}</button>
        <button type="primary">{{ confirmBtnText }}</button>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'

@Component({
  name: 'DialogCenter',
  components: { uniPopup }
})
export default class DialogCenter extends Vue {
  // 标题
  @Prop({ default: '' }) title!: string
  // 确定按钮文案
  @Prop({ default: '确定' }) confirmBtnText!: string
  // 是否开启显示动画
  @Prop({ default: true }) animation?: boolean
  // 点击蒙层是否关闭
  @Prop({ default: true }) maskClick?: boolean
  // 是否为单个按钮
  @Prop({ default: false }) singleBtn?: boolean
  // 取消按钮文案
  @Prop({ default: '取消' }) cancelBtnText?: string
  // 是否显示关闭按钮
  @Prop({ default: false }) showCloseBtn?: boolean
  // 内容文案
  @Prop({ default: '' }) desc?: string

  // ts无法识别popup的类型，必须在前边手动声明一下
  $refs!: {
    popup: any
  }

  open() {
    this.$refs.popup.open()
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.center {
  background: #fff;
  width: 400upx;
  padding: 32upx;
}
</style>
