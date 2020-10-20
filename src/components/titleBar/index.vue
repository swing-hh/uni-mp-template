<template>
  <view> </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'tilteBar'
})
export default class tilteBar extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '#fff' }) backgroundColor!: string;
}
</script>

<style lang="scss" scoped></style>
