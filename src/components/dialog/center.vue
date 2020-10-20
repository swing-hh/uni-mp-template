<template>
  <uni-popup ref="popup" type="center" :animation="true" :maskClick="maskClick">
    <view class="center">
      <view class="center_title">{{ title }}</view>
      <view class="center_close" v-if="showCloseBtn" @click="close">&times;</view>
      <view class="center_desc">
        <view>{{ desc }}</view>
        <slot />
      </view>
      <view class="center_footer">
        <button type="default" class="cancel_btn" v-if="!singleBtn" @click="close">{{ cancelBtnText }}</button>
        <button type="primary" :class="{ btn100: singleBtn }" @click="confirm">{{ confirmBtnText }}</button>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

@Component({
  name: 'dialogCenter',
  components: { uniPopup }
})
export default class dialogCenter extends Vue {
  // ts无法识别popup的类型，必须在前边手动声明一下
  $refs!: {
    popup: any;
  };

  // 标题
  @Prop({ default: '' }) title!: string;
  // 确定按钮文案
  @Prop({ default: '确定' }) confirmBtnText!: string;
  // 点击蒙层是否关闭
  @Prop({ default: true }) maskClick?: boolean;
  // 是否为单个按钮
  @Prop({ default: false }) singleBtn?: boolean;
  // 取消按钮文案
  @Prop({ default: '取消' }) cancelBtnText?: string;
  // 是否显示关闭按钮
  @Prop({ default: true }) showCloseBtn?: boolean;
  // 内容文案
  @Prop({ default: '' }) desc?: string;

  open() {
    this.$refs.popup.open();
  }

  close() {
    this.$refs.popup.close();
  }

  confirm() {
    this.$refs.popup.close();
    this.$emit('confirm');
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.center {
  background: #fff;
  width: 500upx;
  padding: 32upx;
  position: relative;
  border-radius: 20upx;
  &_title {
    font-size: 36upx;
    font-weight: 600;
    text-align: center;
    line-height: 60upx;
    padding-bottom: 20upx;
  }
  &_close {
    position: absolute;
    font-size: 50upx;
    top: 10upx;
    right: 10upx;
    color: #666;
    padding: 0 20upx;
  }
  &_desc {
    text-align: center;
    line-height: 45upx;
  }
  &_footer {
    padding-top: 30upx;
    display: flex;
    button {
      width: 45%;
    }
    .cancel_btn {
      margin-right: 10%;
    }
    .btn100 {
      width: 100%;
    }
  }
}
</style>
