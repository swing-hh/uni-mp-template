<template>
  <view class="content">
    <!--顶部小程序关注提醒-->
    <view class="tip" v-if="showGuideApp">
      <view>添加到我的小程序</view>
      <view>随时观看课程视频</view>
      <text @click="closeGuide" id="index_guideclose_click">&times;</text>
    </view>

    <!--顶部轮播图-->
    <swiper-dot :info="bannerList" :current="swiper.current" field="content" :mode="swiper.mode" :dotsStyles="swiper.dotsStyles">
      <swiper :class="swiper" @change="change" :autoplay="swiper.autoplay" :interval="swiper.interval" :duration="swiper.duration" :circular="swiper.circular">
        <swiper-item v-for="(item, index) in bannerList" :key="index" id="index_banner_show" :data-index="index">
          <view class="swiper_item" id="index_banner_click" @click="gotoBannerDetail('xsybcd', item.outUrl)">
            <image mode="scaleToFill" class="swiper_image" :src="item.coverUrl" @error="imageError" />
          </view>
        </swiper-item>
      </swiper>
    </swiper-dot>

    <!--推荐课程-->
    <view class="recommend">
      <view class="recommend_in">
        <text class="recommend_in_text bold">推荐课程</text>
      </view>
      <view class="recommend_in" @click="gotoClassKnow" id="index_howtoclass_click">
        <text class="ecommend_in_how_to_class bold">如何上课</text>
        <image mode="scaleToFill" class="recommend_in_goto_class" src="/static/logo.png" @error="imageError" />
      </view>
    </view>

    <!--课程列表-->
    <view class="courseList">
      <view class="courseLi" v-for="(item, i) in list" :key="i">
        <view @click="gotoDetailType(item)">
          <image mode="scaleToFill" class="cover" :src="item.coverUrl" @error="imageError" />
          <view class="info">
            <view class="courseTitle bold">{{ item.name }}</view>
            <view class="courseClass" v-if="item.type == 1">轻松入门写字</view>
            <view class="courseClass" v-else>练字习惯养成</view>
            <view class="courseTip" v-if="item.status == 1 || item.status == 2">
              <text v-if="item.status == 1">书法老师1对1指导</text>
              <text v-else>赠送定制学习礼盒</text>
            </view>
            <view
              :class="[
                'courseT',
                {
                  t17: [3, 4, 5, 6, 7, 8, 9, 10].includes(item.status)
                },
                {
                  t18: ![3, 4, 5, 6, 7, 8, 9, 10].includes(item.status)
                }
              ]"
              v-else
            >
              <image mode="scaleToFill" class="courseIcon" src="/static/logo.png" @error="imageError" v-if="[1, 2].includes(item.status)" />
              <image mode="scaleToFill" class="courseIcon" src="/static/logo.png" @error="imageError" v-if="[3, 4, 5, 6, 7, 8, 10].includes(item.status)" />
              <text
                class="courseTips courseTipsBlue"
                v-if="item.type === 1 && item.status === 9 && (!hasTeacher(item.sessionFrom) || (hasTeacher(item.sessionFrom) && item.sendTchCode === 1))"
              >
                {{ item.openCourseDate ? item.openCourseDate + '开课' : '' }}
              </text>
              <text
                class="courseTips courseTipsBlue"
                v-else-if="item.type === 1 && item.status === 9 && hasTeacher(item.sessionFrom) && item.sendTchCode === 0"
              >
                联系老师激活课程
              </text>
              <text class="courseTips" v-else-if="item.status === 3">
                {{ item.startTimeStr }}
              </text>
              <text class="courseTips" v-else-if="item.status === 4">剩余有效期{{ item.effectiveDays }}天</text>
              <text class="courseTips" v-else-if="![3, 4].includes(item.status)">{{ item.courseTips }}</text>
              <view class="coursePop" v-if="item.status === 10">
                <text class="connect">{{ item.courseInfo }}</text>
              </view>
            </view>
          </view>
          <view
            v-if="[4, 7, 10].includes(item.status) && item.transStatus === 1"
            class="courseBtn bold blue"
            id="index_gotoclass_click"
            :data-coursetype="item.type"
            :data-status="item.status"
            :data-trans="item.transStatus"
          >
            已转班
          </view>
          <view
            v-else-if="item.type === 1 && item.status === 9 && (!hasTeacher(item.sessionFrom) || (hasTeacher(item.sessionFrom) && item.sendTchCode === 1))"
            id="index_gotoclass_click"
            :data-coursetype="item.type"
            :data-status="item.status"
            :data-send="item.sendTchCode"
            :class="['courseBtn', 'bold', btnStatus[item.status]]"
          >
            开课提醒我
          </view>
          <view
            v-else-if="item.type === 1 && item.status === 9 && hasTeacher(item.sessionFrom) && item.sendTchCode === 0"
            id="index_gotoclass_click"
            :data-coursetype="item.type"
            :data-status="item.status"
            :data-send="item.sendTchCode"
            :class="['courseBtn', 'bold', btnStatus[item.status]]"
          >
            联系老师
          </view>
          <view
            v-else
            :class="['courseBtn', 'bold', btnStatus[item.status]]"
            id="index_gotoclass_click"
            :data-coursetype="item.type"
            :data-status="item.status"
            >{{ btnText[item.status] }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
const app: any = getApp();
import { Vue, Component } from 'vue-property-decorator';
import swiperDot from '@/components/swiper-dot/swiper-dot.vue';
import { getTimestamp } from '@/utils/util';
import Req from '@/utils/req';
import Api from '@/utils/api';

@Component({
  name: 'Index',
  components: { swiperDot }
})
export default class Index extends Vue {
  bannerList: string[] = [];
  list: any = [];
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
  };
  showGuideApp: boolean = false;
  btnText: object = {
    1: '限时免费',
    2: '了解课程',
    3: '待开课',
    4: '去学习',
    5: '去学习', // 已退课（可学习）
    6: '去学习', // 已退课（不可学习）
    7: '去学习', // 已过期（可学习）
    8: '去学习', // 已过期（已到期）
    9: '待激活',
    10: '去学习', // 过期可学习,符合二次激活条件
    11: '未开课', // 赠课未开课
    12: '已失效' // 赠课已失效
  };
  btnStatus: object = {
    1: 'orange',
    2: 'blue',
    3: 'gray',
    4: 'blue',
    5: 'blue',
    6: 'gray',
    7: 'blue',
    8: 'gray',
    9: 'orange',
    10: 'blue',
    11: 'gray',
    12: 'gray'
  };

  async onLoad() {
    this.tipShowFun();
    const data: any = await Req.get(Api.course.list, {});
    this.bannerList = data.bannerList;
    this.list = data.list;
  }

  // 顶部tip是否显示
  tipShowFun() {
    this.showGuideApp = !!(getTimestamp() - uni.getStorageSync('home_guide_app') > 1000 * 60 * 60 * 24 * 7);
    return {};
  }

  // 关闭tip
  closeGuide() {
    uni.setStorageSync('home_guide_app', getTimestamp());
    this.showGuideApp = false;
  }

  // swiper切换，更新index
  change(e: any) {
    this.swiper.current = e.detail.current;
  }

  // banner跳转
  gotoBannerDetail(lastfrom: string, url: string) {
    app.globalData.lastfrom = lastfrom;
    uni.navigateTo({
      url: url
    });
  }

  // 跳转上课须知
  gotoClassKnow() {
    uni.navigateTo({
      url: ''
    });
  }

  gotoDetailType() {}

  hasTeacher() {}

  imageError() {
    console.error('Image Error');
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.content {
  .bold {
    font-size: 600;
  }

  /**顶部小程序关注提醒**/
  .tip {
    width: 340upx;
    height: 140upx;
    background: url(https://zyb-yayapub-1253445850.file.myqcloud.com/fe/1.12/follerTip1.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    right: 6upx;
    z-index: 10;
    padding: 28upx 40upx;
    box-sizing: border-box;
    view {
      font-size: 28upx;
      color: #fff;
      line-height: 28upx;
      margin-bottom: 12upx;
    }
    view:last-child {
      margin-bottom: 0upx;
    }
    text {
      position: absolute;
      color: #fff;
      font-size: 32upx;
      top: 37upx;
      right: 20upx;
      padding: 0 20upx;
    }
  }

  /**顶部轮播图**/
  .swiper {
    height: 270upx;
    margin-top: 10upx;
    &_image {
      width: 686upx;
      height: 270upx;
      margin: 0 32upx;
      border-radius: 32upx;
    }
  }

  /**推荐课程**/
  .recommend {
    padding: 0 32upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 64upx;
    &_in {
      display: flex;
      align-items: center;
      &_goto_class {
        width: 34upx;
        height: 34upx;
      }
      &_text {
        color: rgba(51, 51, 51, 1);
        font-size: 38upx;
        line-height: 50upx;
      }
      &_how_to_class {
        color: #999;
        font-size: 28upx;
        line-height: 28upx;
        margin-right: 10upx;
      }
    }
  }

  /**课程列表**/
  .courseList {
    padding: 0 32upx;
    margin-top: 20upx;
    .courseLi {
      padding: 25upx 31upx 25upx 24upx;
      box-sizing: border-box;
      // border-bottom: 1upx solid #e4e6e9;
      position: relative;
      border-radius: 24upx;
      margin-bottom: 31upx;
      box-shadow: 0 10upx 40upx rgba(0, 0, 0, 0.08);
      .activeBtn {
        position: absolute;
        width: 100%;
        height: 88upx;
        border-radius: 0;
        padding: 0;
        background-color: transparent;
        left: 0;
        top: 0;
        z-index: 1;
      }
      .cover {
        width: 90 * 2upx;
        height: 100 * 2upx;
        border-radius: 14upx;
        margin-right: 34upx;
        float: left;
      }
      .info {
        position: relative;
        .courseTitle {
          // width: 470upx;
          font-size: 42upx;
          color: #333;
          line-height: 59upx;
          height: 59upx;
          margin-bottom: 10upx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-top: 11upx;
        }
        .courseClass {
          font-size: 24upx;
          color: #999;
          line-height: 33upx;
        }
        .courseTip {
          font-size: 24upx;
          color: #00b6ff;
          margin-top: 48upx;
          font-weight: 600;
        }
        .coursePrice {
          color: #ff6640;
          font-size: 40upx;
          line-height: 56upx;
          margin: 31upx 0 4upx;
        }
        .courseMsg {
          color: #ff6640;
          font-size: 24upx;
          line-height: 33upx;
          margin: 48upx 0 10upx;
        }
        .courseT {
          display: flex;
          align-items: center;
          position: absolute;
          left: 214upx;
          .courseIcon {
            width: 20upx;
            height: 20upx;
            margin: -2upx 6upx 0 0;
          }
          .courseTips {
            color: #999;
            font-size: 24upx;
            line-height: 30upx;
          }
          .courseTipsBlue {
            color: #00b6ff;
            font-weight: bold;
          }
          .coursePop {
            width: 304upx;
            text-align: center;
            height: 54upx;
            box-sizing: border-box;
            position: absolute;
            bottom: -57upx;
            background: url(~@/static/logo.png) no-repeat;
            background-size: 100% 100%;
            .connect {
              font-size: 23upx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .courseT.t18 {
          top: 184upx;
        }
        .courseT.t17 {
          top: 168upx;
        }
      }
      .courseBtn {
        position: absolute;
        right: 31upx;
        bottom: 25upx;
        width: 190upx;
        height: 66upx;
        font-size: 30upx;
        border-radius: 38upx;
        text-align: center;
        line-height: 66upx;
      }
      .orange {
        background-color: #ff714e;
        color: #fff;
      }
      .lightBlue {
        background-color: $uni-color-primary;
        color: $uni-color-primary;
      }
      .blue {
        background-color: $uni-color-primary;
        color: #fff;
      }
      .gray {
        background-color: #f2f2f2;
        color: #999;
      }
    }
  }
}
</style>
