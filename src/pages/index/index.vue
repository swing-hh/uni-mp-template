<template>
  <view class="content">
    <uni-swiper-dot :info="bannerList" :current="swiper.current" field="content" :mode="swiper.mode" :dotsStyles="swiper.dotsStyles">
      <swiper
        :class="['swiper']"
        @change="change"
        :autoplay="swiper.autoplay"
        :interval="swiper.interval"
        :duration="swiper.duration"
        :circular="swiper.circular"
      >
        <swiper-item v-for="(item, index) in bannerList" :key="index" id="index_banner_show" :data-index="index">
          <view class="swiper-item" id="index_banner_click" @click="setLastfrom('xsybcd', item.outUrl, item.type)">
            <image mode="scaleToFill" class="swiper-image" :src="item.coverUrl" @error="imageError" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
import Req from '@/utils/req'
import Api from '@/utils/api'

@Component({ name: 'index', components: { uniSwiperDot } })
export default class Index extends Vue {
  bannerList: string[] = []
  swiper: any = {
    current: 0,
    mode: 'round',
    dotsStyles: {
      width: 4,
      height: 4,
      bottom: 6,
      color: 'red',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      border: 'none',
      selectedBackgroundColor: '#fff',
      selectedBorder: 'none'
    },
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true
  }

  async onLoad() {
    const data: any = await Req.get(Api.course.list, {})
    this.bannerList = data.bannerList
  }

  change(e) {
    this.swiper.current = e.detail.current
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.content {
  .swiper {
    height: 270upx;
    margin-top: 10upx;
    .swiper-image {
      width: 686upx;
      height: 270upx;
      margin: 0 auto;
      border-radius: 32upx;
    }
  }
}
</style>
