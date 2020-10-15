import { Vue } from 'vue-property-decorator';
import { showToast } from '@/utils/util';
const app: any = getApp();

export default class Share extends Vue {
  shareObj: any = {
    title: '我发现了一门好课，现在特惠购课，推荐你也试试！', // 分享标题
    path: '/pages/home/index/index?lastfrom=', // 被分享好友点击后，跳转页面
    imageUrl: 'https://zyb-yayapub-1253445850.file.myqcloud.com/fe/normalPriceClass.png' // 分享图片
  };

  onShareAppMessage() {
    const lastfrom: string = app.globalData.lastfrom;
    let lastfromParam: string = '';
    lastfrom === 'fxxqy' ? (lastfromParam = 'fxxqy_share') : (lastfromParam = 'fxxqy');

    return {
      title: this.shareObj.title,
      path: this.shareObj.path + lastfromParam,
      imageUrl: this.shareObj.imageUrl,
      success() {
        showToast('分享成功');
      },
      fail() {
        showToast('分享失败');
      }
    };
  }
}
