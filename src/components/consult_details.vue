<template>
  <div>
    <div class="con_title">{{this.news_title}}</div>
    <div class="imgs_content" style="padding:.1rem .3rem 1.52rem .3rem" v-html='this.news_content'>
      {{this.news_content}}
    </div>
    <footer class="dj_footer" v-if="this.$route.query.share == 1">
      <div @click="applink()">立即打开</div>
    </footer>
  </div>
</template>

<script>
  var browser = {
    versions : function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        trident : u.indexOf('Trident') > -1,
        presto : u.indexOf('Presto') > -1,
        webKit : u.indexOf('AppleWebKit') > -1,
        gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile : !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
        ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
        iPad : u.indexOf('iPad') > -1,
        webApp : u.indexOf('Safari') == -1,
        QQbrw : u.indexOf('MQQBrowser') > -1 && u.indexOf('QQ/') <= -1,    //qq浏览器
        QQInBrw : u.indexOf('QQ/') > -1,       //qq内置
        weiXin : u.indexOf('MicroMessenger') > -1,         //微信内置
        weibo : u.indexOf('Weibo') > -1,       //微博
        ucLowEnd : u.indexOf('UCWEB7.') > -1,
        ucSpecial : u.indexOf('rv:1.2.3.4') > -1,
        ucweb : function () {
          try {
            return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
          } catch (e) {
            if (u.indexOf('UC') > -1) {
              return true;
            } else {
              return false;
            }
          }
        }(),
        Symbian : u.indexOf('Symbian') > -1,
        ucSB : u.indexOf('Firefox/1.') > -1
      };
    }()
  }
  var hips = '请点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开';

  export default {
    data () {
      return {
        news_content:"",
        news_title:"",
      }
    },
    methods:{
      applink(){
        var arr = window.location.href;
        arr = arr.split('&');
//       console.log("my_video://my_video?list={\"type\":\""+ this.$route.query.type + "\"}");
        window.location = "bcdetails://consult_details?list={\"ID\":\""+ this.$route.query.ID +"\",\"url\":\""+ arr[0] + "\"}";
        var appstore, ua = navigator.userAgent;
        if ( browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo) ){
          return  alert( hips );
        }
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
          if (browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo)){
            return  alert( hips );
          }
        } else if (u.indexOf('iPhone') > -1) { //苹果手机
          if ( (browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo)) || (browser.versions.mobile && (browser.versions.QQInBrw) )){
            return  alert( hips );
          }
        }
        if(ua.match(/Android/i)){
          appstore = 'https://www.pgyer.com/Fqg8';
          // appstore = 'file:///android_asset/test_android_appstore.html';
          // appstore = 'market://search?q=com.singtel.travelbuddy.android';
        }
        if(ua.match(/iPhone|iPod|iPad/)){
          appstore = 'https://www.pgyer.com/Fqg8';
//          appstore = "https://itunes.apple.com/cn/app/id1433521757?mt=8";
        }
        var clickedAt = +new Date;
        // During tests on 3g/3gs this timeout fires immediately if less than 500ms.
        setTimeout(function(){
          // To avoid failing on return to MobileSafari, ensure freshness!

          if (+new Date - clickedAt < 2008){
//            alert(+new Date - clickedAt)
//            window.location = appstore;
            if(ua.match(/Android/i)){
              window.location = appstore;
            }
            if(ua.match(/iPhone|iPod|iPad/)){
              var loadDateTime = new Date();
              var t =setTimeout(function () {
                var timeOutDateTime = new Date();
                if (loadDateTime && timeOutDateTime - loadDateTime < (1500 + 200)) {
                  window.location = appstore;  //ios下载地址
                } else {
                  window.close();
                }
              }, 1700); //此处时间有待确定
              window.location = appstore;
            }
          }
        }, 2000);
      },

    },
    mounted (){

    },
    created () {
      let userDatas = this.$qs.stringify({
        ID:this.$route.query.ID,
      });
      this.axios({
        method:'post',
        url:this.HOST+'Api/News/newsDetail',
        data:userDatas
      }).then((res) => {

        if(res.data.code){
          alert(res.data.msg)
        }else{
          this.news_content = res.data.data.news_content;
          this.news_title = res.data.data.news_title;
        }

    })

    }
  }
</script>
<style scoped>
 .con_title{
   padding:.0rem .3rem .0rem .3rem;
   font-size: 0.43rem;
   font-family:PingFangSC-Medium;
   color:rgba(34,34,34,1);
   line-height:48px;

 }
  .imgs_content{
    font-size: 0.35rem;
    font-family:PingFangSC-Regular;
    color:rgba(114,114,114,1);
    line-height:0.57rem;
  }

 .dj_footer{
   width: 100%;
   height: 1.2rem;
   /* background-size: 100%; */
   position: fixed;
   bottom: 0rem;
   /*background-color: #ff6100;*/
   line-height: 1.2rem;
   background: url("../img/fenxiangliangjie4.png") center no-repeat;
   background-size: 100% 100%;
   /*padding-bottom: .1rem;*/
   box-shadow:0px 0 0px #4c4c4c, /*左边阴影*/
   0px 0 0px yellow, /*右边阴影*/
   0 -1px 10px rgba(64,64,64,0.1), /*顶部阴影*/
   0 0px 0px green; /*底边阴影*/
 }
 .dj_footer div{
   width: 1.8rem;
   height: 0.6rem;
   background:rgba(255,203,0,1);
   border-radius:0.3rem;
   font-size:0.3rem;
   color:rgba(255,255,255,1);
   text-align: center;
   line-height: 0.6rem;
   float: right;
   margin-right: 0.46rem;
   margin-top: 0.3rem;
 }
</style>
