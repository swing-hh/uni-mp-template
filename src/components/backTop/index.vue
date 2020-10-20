<template>
  <view class="back_top" @click="gotoScrollTop" v-if="isShow"> 回到顶部 </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'BackTop'
})
export default class BackTop extends Vue {
  @Prop({ default: false }) isShow!: boolean;

  gotoScrollTop() {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.back_top {
  width: 140upx;
  height: 50upx;
  line-height: 50upx;
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 120upx;
  background: #fff;
  text-align: center;
  font-size: 28upx;
  color: #666;
  box-shadow: -5upx 5upx 5upx rgba(0, 0, 0, 0.3);
  border-top-left-radius: 25upx;
  border-bottom-left-radius: 25upx;
}
</style>
