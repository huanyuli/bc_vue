<template>
  <div>
    <div class="main_log"><img src="../img/huaxuelogo.png" alt=""></div>
    <div class="main_input">
      <div class="input_div">
        <input id="E_Mobile" class="min-input" oninput="if(value.length>11)value=value.slice(0,11)" type="number" placeholder="请输入手机号">
        <div class="btn_yz" v-if="!this.sendMsgDisabled" @click="send()">获取验证码</div>
        <div class="btn_yz btn_yzs" v-else-if="this.sendMsgDisabled">{{this.time}}s后获取</div>
      </div>
      <div class="input_div">
        <input id="E_code" type="number"  oninput="if(value.length>6)value=value.slice(0,6)" class="max-input" placeholder="请输入短信验证码">
      </div>
      <p class="log_hint">未注册手机验证后自动登录</p>
      <div class="log_btn" @click="logBtn()">注册</div>
      <p class="log_agm"><input type="checkbox" class="i-checks" id="checkbox-id"> 我阅读并同意《用户协议说明》</p>
      <a @click='applink()' class="btn-download" id="btn-download">立即下载宝辰APP</a>
      <div class="dj_footer">新用户注册成功后，下载app参与拼团可获得一张优惠券</div>
    </div>

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
        commodity:{},
        log_userID:"",
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false
      }
    },
    methods:{
      send() {
        let me = this;
        if(me.time == 60){
          var mobile = $("#E_Mobile").val();
          me.sendMsgDisabled = true;
          let interval = window.setInterval(function() {
            if ((me.time--) <= 0) {
              me.time = 60;
              me.sendMsgDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
          if(mobile!="" ){
            let userDatas = this.$qs.stringify({
              mobile:mobile,
            });
            this.axios({
              method:'post',
              url:this.HOST+'Api/Login/sendSms',
              data:userDatas
            }).then((res) => {
              if(res.data.code){
                alert(res.data.msg)
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }else{
                console.log( res);
              }
            })
          }else{
            $("#E_Mobile").focus();
            alert("手机号不能为空")
            return false;
          }


        }
      },
      applink(){
//       console.log("my_video://my_video?list={\"type\":\""+ this.$route.query.type + "\"}");
        window.location = "bclog://my_log"
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
          appstore = "https://www.pgyer.com/Fqg8";
          // appstore = "https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4";
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
      logBtn(){
        var E_Mobile = $("#E_Mobile").val();
        var E_code = $("#E_code").val();
        if(E_Mobile == "" || E_Mobile == null){
          alert("请输入手机号")
        }else if(E_code == ""){
          alert("请输入验证码")
        }else if(!$('#checkbox-id').is(':checked')) {
          alert("请确认用户协议")
        }else{
          let userDatas = this.$qs.stringify({
            register_type:1,
            parent_id:this.$route.query.user_id,
            mobile:E_Mobile,
            code:E_code,
          });
          this.axios({
            method:'post',
            url:this.HOST+'/Api/login/index',
            data:userDatas
          }).then((res) => {
            if(res.data.code){
              alert(res.data.msg)
            }else{
//              console.log( res);
              this.commodity = res.data.data
              this.log_userID = this.commodity.token
//              console.log("token:" + this.log_userID)
              this.$router.push({path:'/product',query:{log_userID:this.log_userID ,activity_id:this.$route.query.activity_id,mark:this.$route.query.mark,user_id:res.data.data.user_id}});

            }
          })
        }
      }
    },
    mounted (){

    },
    created () {
//      let userDatas = this.$qs.stringify({
//       ID:this.$route.query.ID,
//      });
//      this.axios({
//        method:'post',
//        url:this.HOST+'Api/News/newsDetail',
//        data:userDatas
//      }).then((res) => {
//
//        if(res.data.code){
//          alert(res.data.msg)
//        }else{
//          this.news_content = res.data.data.news_content;
//          this.news_title = res.data.data.news_title;
//
//        }
//
//      })

    }
  }
</script>
<style scoped>
  .main_log{
    width: 100%;
    height: 1.5rem;
    margin-top: 0.9rem;
    margin-bottom: 1rem;
  }
  .main_log img{
    width: 1.5rem;
    height: 1.5rem;
   margin: 0 auto;
    display: table-cell;
    text-align: center;
  }
  .input_div{
    width: calc(100% - 0.8rem);
    height: 0.9rem;
    margin: 0 auto;
    border-bottom: 1px solid rgba(238,238,238,1);
    border-radius:1px;
  }
  .input_div input{
    float: left;
    color:rgba(191,191,191,1);
    font-size: 0.34rem;
    border: 0px;
    padding: 0.2rem 0.1rem;
  }
.input_div .min-input{
  width: calc(100% - 2rem);
}
  .input_div .max-input{
    width: calc(100% - 0.2rem);
  }
  .input_div .btn_yz{
    width: 1.8rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    float: right;
    background:rgba(255,156,3,1);
    border-radius:0.08rem;
    font-size:0.28rem;
    color:rgba(255,255,255,1);
  }
  .btn_yzs{
    background: rgb(193, 193, 193)!important;
  }
  .log_hint{
    width: 100%;
    height: 0.27rem;
    font-size:0.26rem;
    text-align: center;
    margin-top: 0.8rem;
    margin-bottom: 0.24rem;
    color:rgba(197,197,197,1);
  }
  .log_btn{
    width: 6.7rem;
    height: 0.9rem;
    margin: 0 auto;
    border-radius:0.45rem;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 0.9rem;
    font-size:0.34rem;
    background: linear-gradient(to right,#F10200, #FF4D18)
  }
  .log_agm{
    width: 100%;
    vertical-align: middle;
    text-align: center;
    color:rgba(126,126,126,1);
    font-size: 0.3rem;
    margin-top: 0.23rem;
    margin-bottom: 0.98rem;
  }
  input[type="checkbox"]{
    background-color: #fff;
    vertical-align: middle;
    text-align: center;
    margin: 0.23rem auto;

  }

  .btn-download{
    display:block;
    font-size:0.26rem;
    text-align: center;
    color:rgba(75,134,255,1);
    margin: 0 auto;
  }

  .dj_footer{
    width: 100%;
    color: red;
    font-size:0.26rem;
    text-align: center;
    margin-top: 0.5rem;
  }
</style>
