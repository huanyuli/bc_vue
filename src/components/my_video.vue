<template>
  <div>

    <video  id="my-video" width="100%"  height="100%" :poster="this.video_img" controls="controls" :src="this.video_src">
      <source src="movie.ogg" type="video/ogg">
      <source src="movie.mp4" type="video/mp4">
      因为格式原因无法播放该视频
    </video>




    <div class="new_title">{{this.news_title}}</div>
    <div class="imgs_content"  style="padding:.1rem .3rem 1.52rem .3rem" v-html='this.news_content'>
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
//  (function() {
//    "use strict";//严格模式
//    var video;//video标签
//    var scale = 0.8;//第一帧图片与源视频的比例
//    video = $("#my-video").get(0);//赋值标签
//    video.on("loadeddata", function () {//加载完成事件，调用函数
//
//    })
//  }());
  export default {
    data () {
      return {
        commodity:{},
        video_src:"",
        news_content:"",
        video_img:"",
        news_title:""
      }
    },
    methods:{
      video(){
        alert(1);
        "use strict";//严格模式
        var video;//video标签
        var scale = 0.8;//第一帧图片与源视频的比例
        video = $("#my-video").get(0);//赋值标签
        var canvas = document.createElement("canvas");//canvas画布
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//画图
        video.setAttribute("poster", canvas.toDataURL("image/png"));//关键一步 —— 设置标签的 poster 属性的值为 base64 编译过后的canvas绘图。
      },
      applink(){
//       console.log("my_video://my_video?list={\"type\":\""+ this.$route.query.type + "\"}");
        window.location = "bcvideo://my_video?list={\"type\":\""+ this.$route.query.type + "\"}"
        var appstore, ua = navigator.userAgent;
//        if ( browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo) ){
//          return  alert( hips );
//        }
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
//          appstore = "https://itunes.apple.com/cn/app/id1433521757?mt=8";
          appstore = 'https://www.pgyer.com/Fqg8';
        }
        var clickedAt = +new Date;
        // During tests on 3g/3gs this timeout fires immediately if less than 500ms.
        setTimeout(function(){
          // To avoid failing on return to MobileSafari, ensure freshness!
          if (+new Date - clickedAt < 2008){
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
        type:this.$route.query.type,
        page:"",
      });
      this.axios({
        method:'post',
        url:this.HOST+'Api/News/index',
        data:userDatas
      }).then((res) => {
       // console.log(res);
        if(res.data.code){
          alert(res.data.msg)
        }else{
          console.log( res);
          this.video_src = res.data.data.news[0].news_video;
          this.news_content = res.data.data.news[0].news_content;
          this.video_img = res.data.data.news[0].video_img;
          this.news_title = res.data.data.news[0].news_title;
        }

      })

    }
  }
</script>
<style scoped>
  .new_title{
    padding: 0.5rem 0.3rem .4rem;
    font-size:0.36rem;
    font-family:FZLTZHK--GBK1-0;
    color:rgba(34,34,34,1);
  }
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
  .vjs-default-skin.vjs-big-play-centered .vjs-big-play-button {
    /* Center it horizontally */
    left: 50%;
    margin-left: -2.1em;
    /* Center it vertically */
    top: 50%;
    margin-top: -1.4000000000000001em;
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
