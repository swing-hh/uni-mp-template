<template>
  <view class="dialogCenter">
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

@Component({
  name: 'dialogCenter',
  components: { uniPopup }
})
export default class Index extends Vue {
  title: string = '';
  open() {}
}
</script>

<style type="text/scss" lang="scss" scoped></style>
