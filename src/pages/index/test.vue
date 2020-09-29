<!--
 * @Author: hanlinzhe@zuoyebang.com
 * @Date: 2020-06-19 11:33:36
 * @LastEditTime: 2020-07-02 17:34:11
 * @LastEditors: Please set LastEditors
 * @Description: 转班
 * @FilePath: /yy-mp-write/src/pagesA/my/myOrder/changeClass.vue
-->
<template>
  <view class="changeClass" :style="{ paddingBottom: yyFooterPaddingHeight + 'px' }" id="changeClass_show" @click="zsTracker">
    <!-- 选择转班原因 -->
    <view v-if="isFirst" class="change-reasons">
      <view class="change-title">转班原因</view>
      <view class="reason-list">
        <view
          v-for="(item, index) in reasonList"
          :class="['reason-item', item.active ? 'active' : '']"
          :key="index"
          @click="chooseReason(index)"
          >{{ item.description }}</view
        >
      </view>
      <!-- 默认最后一项是其他 -->
      <view class="reason-area" v-show="reasonList[reasonList.length - 1].active">
        <textarea
          class="other-reason"
          @input="inputEvent"
          placeholder-class="feedPlaceholder"
          placeholder="请输入具体原因（100字内）"
          disable-default-padding="true"
          :maxlength="maxLen"
          :value="userReason"
        />
        <p :class="['reason-len', userReasonLen === maxLen ? 'max-len' : '']">{{ userReasonLen }}/{{ maxLen }}</p>
      </view>
    </view>
    <!-- 选择转入班级 -->
    <view v-else class="choose-class">
      <view class="choose-rule" @click="toChangeRules">转班规则</view>
      <view class="choose-block">
        <view class="choose-title">待转班级</view>
        <view class="cur-class">
          <view class="class-title">{{ currentCourse }}</view>
          <view class="class-num">共{{ currentCourseCnt }}节</view>
        </view>
      </view>
      <view class="choose-block">
        <view class="choose-title">选择转入班级</view>
        <view class="class-list">
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
    </view>

    <view class="submit-btn" :style="{ paddingBottom: yyFooterPaddingHeight + 'px' }">
      <!-- 下一步按钮 -->
      <button
        v-if="isFirst"
        :type="hasClicked || !userReason ? 'disabled' : 'primary'"
        :disabled="hasClicked || !userReason"
        @click="handleNext"
        id="chooseReasons_btn_click"
      >
        下一步
      </button>
      <!-- 转入此班按钮 -->
      <button
        v-else
        class="change-btn"
        :type="hasClicked || !newSkuId ? 'disabled' : 'primary'"
        :disabled="hasClicked || !newSkuId"
        @click="handleChange"
        id="changeToClass_btn_click"
      >
        转入此班
      </button>
    </view>
    <yy-dialog
      class="change-class-dialog"
      ref="changePopup"
      title="仅有一次转班机会，确定转班吗？"
      cancelText="再想想"
      confirmText="确认转班"
      :dataType="'changeClass'"
      @cancel="thinkAgain"
      @confirm="toChangeCourse"
    ></yy-dialog>
    <!-- <yy-dialog
      class="change-full-tips"
      ref="fullTips"
      title="此班级人数已满，正在调整稍后再申请"
    >
      <view slot="footer" class="dialog-footer">
        <button type="primary" @click="closeDialog">好的</button>
      </view>
    </yy-dialog>-->
  </view>
</template>

<script>
import Vue from 'vue'
import yyDialog from '@/components/yy-dialog'
export default {
  name: 'changeClass',
  data() {
    return {
      tradeId: '',
      subTradeId: '',
      skuId: '',
      newSkuId: 0,
      newCourseId: '', // 转入班级的courseId
      isFirst: true, // 当前是否是第一步--选择原因
      reasonList: [
        // {
        //   reasonType: 1,
        //   description: '课程内容太简单'
        //   active: false,
        // },
        // {
        //   reasonType: 2,
        //   description: '课程内容太难'
        //   active: false,
        // },
        // {
        //   reasonType: 3,
        //   description: '其他'
        //   active: false,
        // }
      ],
      userReason: '', // 用户选择或填写的原因
      userReasonLen: 0,
      maxLen: 100, // 其他原因，最大字数
      hasClicked: false,
      currentCourse: '启蒙幼教班——学龄前', // 当前班级
      currentCourseCnt: 4, // 当前班级章节总数
      classList: [
        // 待转入班级
        // {
        //   skuId: 123,
        //   courseId: "sdfgdgdhdgfrfe",
        //   skuName: "学习同步班——1-2年级",
        //   level: 1,
        //   lessonCnt: 360,
        //   active: false,
        // },
        // {
        //   skuId: 123,
        //   courseId: "sdfgdgdhdgfrfe",
        //   skuName: "高手进阶班——3-6年级",
        //   level: 1,
        //   lessonCnt: 360,
        //   active: false,
        // },
      ]
    }
  },
  components: {
    yyDialog
  },
  onLoad(options) {
    this.tradeId = options.tradeId
    this.subTradeId = options.subTradeId
    this.skuId = options.skuId
    this.ipXFun()
    this.getChangeReasonList()
  },
  onShow() {},
  methods: {
    getChangeReasonList() {
      this.$http.post(
        this.$baseUrl + this.$api.order.changeReasonList,
        {
          tradeId: Number(this.tradeId),
          subTradeId: Number(this.subTradeId),
          module: 2
        },
        res => {
          this.reasonList = res
          this.reasonList &&
            this.reasonList.forEach(item => {
              Vue.set(item, 'active', false) // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
            })
        },
        err => {
          console.log(err)
        }
      )
    },
    chooseReason(index) {
      this.reasonList.forEach(item => {
        item.active = false
      })
      this.userReason = ''
      this.userReasonLen = 0
      this.reasonList[index].active = true
      if (index != this.reasonList.length - 1) {
        this.userReason = this.reasonList[index].description
      }
      console.log(this.userReason)
    },
    inputEvent(e) {
      this.userReason = e.detail.value
      this.userReasonLen = e.detail.value.length
    },
    toChangeRules() {
      uni.navigateTo({
        url: `/pagesA/webview/webview?title=转班规则说明&src=${encodeURIComponent(
          this.$baseUrl + '/static/yy-phone-web/changeClass.html#/changeRules'
        )}`
      })
    },
    chooseClass(index) {
      this.classList.forEach(item => {
        Vue.set(item, 'active', false)
      })
      this.classList[index].active = true
      this.newSkuId = this.classList[index].skuId
      this.newCourseId = this.classList[index].courseId
    },
    handleNext() {
      this.hasClicked = true
      this.$http.post(
        this.$baseUrl + this.$api.order.changeCourseList,
        {
          tradeId: Number(this.tradeId),
          subTradeId: Number(this.subTradeId),
          skuId: Number(this.skuId)
        },
        res => {
          // this.skuId = res.currentSkuId;
          // 班级列表大于1，说明有待转入班级
          if (res.skuList.length <= 1) {
            uni.showToast({
              title: '太火爆啦，稍后再试~',
              duration: 2000,
              icon: 'none'
            })
          } else {
            this.isFirst = false
            res.skuList &&
              res.skuList.map(item => {
                if (item.skuId === Number(this.skuId)) {
                  this.currentCourse = item.skuName
                  this.currentCourseCnt = item.lessonCnt
                } else {
                  item.active = false
                  this.classList.push(item)
                }
              })
          }
          this.hasClicked = false
        },
        err => {
          uni.showToast({
            title: err,
            duration: 2000,
            icon: 'none'
          })
          this.hasClicked = false
          console.log(err)
        }
      )
    },
    handleChange() {
      this.$refs.changePopup.open()
    },
    thinkAgain() {
      this.$refs.changePopup.close()
    },
    toChangeCourse() {
      this.hasClicked = true
      this.$http.post(
        this.$baseUrl + this.$api.order.applyChangeCourse,
        {
          tradeId: Number(this.tradeId),
          subTradeId: Number(this.subTradeId),
          oldSkuId: Number(this.skuId),
          newSkuId: Number(this.newSkuId),
          reason: this.userReason
        },
        res => {
          this.hasClicked = false
          // 转入成功
          uni.navigateTo({
            url: `/pagesA/payment/paySuccess?courseId=${this.newCourseId}&referrer=order`
          })
        },
        err => {
          this.hasClicked = false
          uni.showToast({
            title: '转班失败，稍后再试',
            duration: 2000,
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 2000)
          console.log(err)
        }
      )
    }
    // closeDialog() {
    //   this.$refs.fullTips.close();
    //   uni.navigateBack();
    // },
  }
}
</script>

<style lang="scss">
.changeClass {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
}
.change-reasons,
.choose-class {
  width: 100%;
  height: 100%;
  border-top: 1upx solid #eef2fc;
  padding-bottom: 120upx;
  box-sizing: border-box;
  background-color: #fff;
}
.choose-class {
  background-color: #f8f8f8;
}
.change-reasons {
  .change-title {
    font-size: 32upx;
    color: #333;
    line-height: 1;
    font-weight: bold;
    padding: 44upx 32upx 36upx;
  }
  .reason-item {
    font-size: 28upx;
    color: #333;
    line-height: 1;
    font-weight: 400;
    padding: 30upx 32upx;
    background: url('~@/static/noActive.png') no-repeat calc(100% - 32upx) center;
    background-size: 40upx auto;
    &.active {
      background-image: url('~@/static/active.png');
      background-size: 44upx auto;
    }
  }
  .reason-area {
    width: 686upx;
    height: 190upx;
    border-radius: 8upx;
    padding: 22upx 28upx 60upx;
    background-color: #f8f8f8;
    box-sizing: border-box;
    margin: 6upx auto 0;
    overflow: hidden;
    position: relative;
    .other-reason {
      width: 100%;
      height: 100%;
      background-color: #f8f8f8;
      outline: none;
      border: none;
      font-size: 28upx;
      color: #333;
      line-height: 1.4;
    }
    .feedPlaceholder {
      color: #bbbbbb;
      line-height: 1.4;
    }
    .reason-len {
      width: 100%;
      padding: 8upx 24upx 24upx 0;
      box-sizing: border-box;
      border-radius: 0 0 8upx 8upx;
      box-sizing: border-box;
      text-align: right;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 28upx;
      line-height: 1;
      color: #999;
      &.max-len {
        color: #fb5555;
      }
    }
  }
}
.choose-class {
  .choose-rule {
    font-size: 24upx;
    color: #666;
    font-weight: 400;
    padding: 40upx 32upx 32upx;
    text-align: right;
  }
  .choose-block {
    margin-bottom: 16upx;
    background-color: #fff;
    .choose-title {
      font-size: 28upx;
      font-weight: 400;
      color: #666;
      padding: 26upx 32upx;
    }
    .cur-class {
      height: 170upx;
      padding: 0 32upx;
      border-top: 1upx solid #eef2fc;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .class-num {
        font-size: 28upx;
      }
    }
    .class-item {
      padding: 44upx 0 46upx 32upx;
      border-top: 1upx solid #eef2fc;
      background: url('~@/static/noActive.png') no-repeat calc(100% - 32upx) 40upx;
      background-size: 40upx auto;
      &.active {
        background-image: url('~@/static/active.png');
        background-size: 44upx auto;
      }
      .class-num {
        margin-top: 25upx;
      }
    }
    .class-title {
      font-size: 32upx;
      font-weight: 400;
      color: #333;
      line-height: 1;
    }
    .class-num {
      font-size: 24upx;
      color: #666;
      line-height: 1;
    }
  }
}
.submit-btn {
  width: 100%;
  height: 120upx;
  position: fixed;
  left: 0;
  bottom: 0;
  button {
    width: 686upx;
    height: 88upx;
    line-height: 88upx;
    font-size: 32upx;
    font-weight: bold;
    margin: 0 auto;
  }
  .change-btn[type='disabled'] {
    background-color: #ebebeb;
  }
}
.yy-dialog {
  padding-top: 70upx !important;
  .yy-dialog__title {
    font-size: 32upx;
    font-weight: 400;
    line-height: 1;
  }
  .yy-dialog__footer {
    margin-top: 39upx;
  }
}
// .change-full-tips {
//   .yy-dialog {
//     width: 622upx;
//   }
// }
// .dialog-footer {
//   width: 100%;
//   button {
//     width: 100% !important;
//   }
// }
</style>
