<template>
    <div>

        <header v-if="this.commodity.goods_status == 2">
          <div class="head_div">该商品已下架，快下载APP查看其它商品吧</div>
        </header>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in this.commodity.goods_detail_pic" :key="index">
              <img style="width:100%;height:5rem" :src="image" />
            </van-swipe-item>
        </van-swipe>
      <div class="trade" v-if="this.marks != 2 && this.marks != 3">
          <div class="hd_nav" v-if="this.marks == 4">
            <label>预付活动</label>
            <img src="../img/dongxiao1.png" alt="">
          </div>
            <p class="pl" v-if="this.marks == 4">￥{{this.yg_price}} <span>/{{this.yg_weight}}kg</span> <label>原价¥{{this.commodity.goods_price}}/{{this.commodity.goods_unit_weight}}kg</label></p>
            <p class="pl" v-else-if="this.marks != 4">￥{{this.commodity.goods_price}} <span>/{{this.commodity.goods_unit_weight}}kg</span></p>
            <p class="p2">{{this.commodity.goods_name}}</p>
        </div>
      <div class="hd_div" v-if="this.marks == 2 || this.marks == 3">
        <div class="hd_nav">
          <label v-if="this.marks == 2">拼团活动</label>
          <label v-if="this.marks == 3">抢购活动</label>
          <img src="../img/dongxiao1.png" alt="">
        </div>
        <div class="hd_title">活动开始时间：{{this.commodity.start_time}}</div>
        <div class="ha_cont">
          <div class="cont_left">
            <div class="cont_left_top">
              <div class="left">¥<span>{{this.commodity.activity_price}}</span>/{{this.commodity.activity_goods_unit_weight}}kg</div>
              <div class="right">{{this.commodity.activity_total - this.commodity.sell_total}}kg/{{this.commodity.activity_total}}kg</div>
            </div>
            <div class="cont_left_bottom">
              <div class="left">单买价 ¥{{this.commodity.goods_price}}/{{this.commodity.goods_unit_weight}}kg</div>
              <div class="right">
                <div class="progress">
                  <!--进度条-->
                  <div class="loader-container" :style="'width:'+ this.loader_cont +'%;'"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="cont_right">
            <div class="cont_right_title">距结束还剩：</div>
            <div class="cont_right_time">
              <div class="time_div">{{this.end_time_arr[0]}}</div>
              <div class="time_span">:</div>
              <div class="time_div">{{this.end_time_arr[1]}}</div>
              <div class="time_span">:</div>
              <div class="time_div">{{this.end_time_arr[2]}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="trade" v-if="this.marks == 2 || this.marks == 3">
        <p class="p2" style="padding-top: 0.36rem">{{this.commodity.goods_name}}</p>
      </div>
      <div style="display: flex;padding:.3rem 0 .09rem .3rem;border-top: .1px solid #eee;">
        <label style="font-size:.26rem;font-family:PingFangSC-Regular;color:rgba(34,34,34,1);padding-right:.16rem;line-height: .5rem;">应用领域</label>
        <div style="display: flex;width: 5.9rem;flex-wrap: wrap;">
          <p class="range_names" v-for='(item,index) in this.commodity.range_names'>{{item}}</p>
        </div>
      </div>
        <img style="width:100%;height:1.2rem" src="../img/pingpaibaozhang.png" alt="">
      <div class="yg_main" style="border-bottom: 0.1rem solid rgb(238, 238, 238);" v-if="this.marks == 4">
        <p>预购档次<span>请根据需求选择预购档次</span></p>
        <div class="yg_div"  >
          <span  v-for="(item, index) in this.commodity.activity_property" @click="yg(item,index)"  :class="{yg_click:index==yg_flag}">{{item.advance_day}}天预购</span>
        </div>
        <div class="yg_time" >预计发货时间：{{this.yg_fhtime}}</div>
      </div>
      <div class="pt_list" style="border-bottom: .1rem solid #eee;" v-if="this.commodity.collage_num != 0 && this.marks == 2">
        <div class="pt_list_title">{{this.commodity.collage_num}}人在拼团，可直接参与</div>
        <div class="pt_list_li" v-for='(item,index) in this.commodity.collage_users' >
          <div class="list_li_left">
            <img v-if="item.avatar != ''"  :src="item.avatar" alt="用户头像" title="用户头像">
            <img v-else="" src="../img/morentouxiang.png" alt="头像" title="头像">
            <span>{{item.user_nicename}}</span>
          </div>
          <div class="list_li_right">
            <span>拼单数量：</span>
            <label>{{item.record_amount}}kg</label>
          </div>
        </div>
      </div>
        <!--<div v-if="this.marks != 2" style="display: flex;padding:.3rem 0 .09rem .3rem;border-bottom: .1rem solid #eee;">-->
            <!--<label style="font-size:.26rem;font-family:PingFangSC-Regular;color:rgba(34,34,34,1);padding-right:.16rem;line-height: .5rem;">应用领域</label>-->
            <!--<div style="display: flex;width: 5.9rem;flex-wrap: wrap;">-->
                <!--<p class="range_names" v-for='(item,index) in this.commodity.range_names'>{{item}}</p>-->
            <!--</div>-->
        <!--</div>-->
        <div class="imgs_content" style="padding:.46rem .3rem 1.52rem .3rem" v-html='this.commodity.goods_content'>
            {{this.commodity.goods_content}}
        </div>
        <footer class="pt_footer" v-if="this.marks == 2">
            <div @click="pt()">去拼团</div>
        </footer>
      <footer class="dj_footer" v-if="this.marks != 2">
        <div @click="applink()">立即打开</div>
      </footer>

    </div>
</template>

<script>

import { Swipe, SwipeItem  } from 'vant';
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
          commodity:{},
          marks:"",
          loader_cont:0,
          pay_end_time_int:0,
          end_time_arr:['00','00','00'],
          yg_price:0,
          yg_weight:0,
          yg_flag:0,
          yg_fhtime:0,
          dl_token:"",
          user_id:"",
          activity_id:"",
          goods_id:""

        }
    },
    methods:{
      yg(item,index){
        this.yg_price = item.advance_price;
        this.yg_weight = item.advance_unit_weight;
        this.yg_flag = index;
        this.yg_fhtime = getMyDates(this.commodity.current_time + (item.advance_day * 86400))
        function getMyDates(str){
          var oDate = new Date(str * 1000),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日 ';//最后拼接时间
          return oTime;

        };
        //补0操作
        function getzf(num){
          if(parseInt(num) < 10){
            num = '0'+num;
          }
          return num;
        }
      },
      pt(){
        if(this.dl_token == undefined){
          this.dl_token = ""
        }
        if(this.dl_token == ""){
          this.$router.push({path:'/log',query:{user_id:this.user_id,activity_id:this.activity_id,mark:this.marks}});
        }else{
         this.applink()
        }
      },
      applink(){
       // console.log("dddplp://product?list={\"mark\":\""+ this.marks +"\",\"goods_id\":\""+ this.goods_id +"\",\"activity_id\":\""+ this.activity_id + "\"}");
        window.location = "bcproduct://product?list={\"mark\":\""+ this.marks +"\",\"goods_id\":\""+ this.goods_id +"\",\"activity_id\":\""+ this.activity_id + "\"}"
        var appstore, ua = navigator.userAgent;

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
    beforeMount() {

    },
    created () {
      this.dl_token = this.$route.query.log_userID;
      console.log(":"+ this.dl_token);
        let userDatas = this.$qs.stringify({
            mark:this.$route.query.mark,
            goods_id:this.$route.query.goods_id,
            activity_id:this.$route.query.activity_id,
            user_id:this.$route.query.user_id,
            hstatus:1,
//          mark:3,
////          goods_id:"",
//         activity_id:27,
//          user_id:"159",
        });
        this.axios({
            method:'post',
            url:this.HOST+'Api/Goods/index',
            data:userDatas
        }).then((res) => {
            if(res.data.code){
                alert(res.data.msg)
            }else{
                this.commodity = res.data.data
             this.marks =this.$qs.parse(userDatas).mark
              if(this.marks == 2){
                this.user_id =this.$qs.parse(userDatas).user_id
              }else if(this.marks == 1){
                this.goods_id =this.$qs.parse(userDatas).goods_id
              }
              if(this.marks != 1){
                this.activity_id =this.$qs.parse(userDatas).activity_id

              }
              this.pay_end_time_int = this.commodity.end_time;
              this.commodity.start_time = getMyDate(this.commodity.start_time)
              this.loader_cont =(this.commodity.sell_total / this.commodity.activity_total)  * 100
             if(this.marks == 4){
               this.yg_price = this.commodity.activity_property[0].advance_price;
               this.yg_weight = this.commodity.activity_property[0].advance_unit_weight;
               this.yg_fhtime = getMyDates(this.commodity.current_time + (this.commodity.activity_property[0].advance_day * 86400))
             }
              function getMyDate(str){

                var oDate = new Date(str * 1000),
                  oYear = oDate.getFullYear(),
                  oMonth = oDate.getMonth()+1,
                  oDay = oDate.getDate(),
                  oHour = oDate.getHours(),
                  oMin = oDate.getMinutes(),
                  oSen = oDate.getSeconds(),
                  oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日 '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
                return oTime;

              };
              function getMyDates(str){
                var oDate = new Date(str * 1000),
                  oYear = oDate.getFullYear(),
                  oMonth = oDate.getMonth()+1,
                  oDay = oDate.getDate(),
                  oHour = oDate.getHours(),
                  oMin = oDate.getMinutes(),
                  oSen = oDate.getSeconds(),
                  oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay) +'日 ';//最后拼接时间
                return oTime;

              };
              //补0操作
              function getzf(num){
                if(parseInt(num) < 10){
                  num = '0'+num;
                }
                return num;
              }


              //设置定时器，每3秒刷新一次
              const self = this;
//
              function get_last_time(){
                if(self.commodity.hasOwnProperty('end_time')){
//                  let date = self.commodity.current_time;
                  let date = Date.parse(new Date())/1000;
                  let last_time = self.pay_end_time_int - date;
                  console.log();
                  if(last_time<=0){
                    self.end_time_arr   = ['00','00','00'];
                    clearInterval(timer);
                  }else{
                    self.end_time_arr = [parseInt(last_time/3600),parseInt((last_time%3600)/60),last_time%60];
                    if(self.end_time_arr[2]<10){
                      self.end_time_arr[2] = '0' + self.end_time_arr[2]
                    }
                    if(self.end_time_arr[1]<10){
                      self.end_time_arr[1] = '0' + self.end_time_arr[1]
                    }
                    if(self.end_time_arr[0]<10){
                      self.end_time_arr[0] = '0' + self.end_time_arr[0]
                    }
                    console.log(self.end_time_arr);
                  }
                }
              }
              get_last_time();
              let timer = setInterval(get_last_time,1000);
            }

        })

    }
}
</script>
<style scoped>

  header{
    height:0.8rem;
    width: 100%;
    background:rgba(255,241,241,1);
    display: flex;
    align-items: center;
  }
  .head_div{
    font-size:0.32rem;
    font-family:PingFangSC-Light;
    color:rgba(243,14,4,1);
    line-height:0.32rem;
    margin-left: 0.21rem;
  }
  .yg_main{
    width: 100%;
    height: 2.3rem;
  }
  .yg_main p{
    width: 100%;
    height:0.29rem;
    font-size:0.3rem;
    font-family:PingFangSC-Medium;
    color:rgba(34,34,34,1);
    line-height: 0.29rem;
    margin-top: 0.4rem;
    margin-left: 0.23rem;
  }
  .yg_main p span{
    height:0.26rem;
    font-size:0.28rem;
    font-family:PingFangSC-Light;
    color:rgba(162,162,162,1);
    line-height:0.26rem;
    margin-top: 0.42rem;
    margin-left: 0.29rem;
  }

  .yg_div{
    width: 100%;
    margin-top: 0.36rem;
  }
  .yg_div span{
    display: inline-block;
    background:rgba(246,246,246,1);
    border-radius:6px;
    padding: 0.17rem 0.32rem;
    font-size:0.28rem;
    color:rgba(34,34,34,1);
    line-height:0.26rem;
  }
  .yg_click{
    background:rgba(254,244,243,1)!important;
    border-radius:6px;
    color:rgba(230,20,20,1)!important;
    border: 1px solid #E83434!important;
  }
  .yg_div span:nth-child(1){
    margin-left: 0.24rem;
  }
  .yg_div span:nth-child(2){
   margin: 0 0.3rem;
  }
  .yg_time{
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(97,97,97,1);
    margin-top: 0.35rem;
    margin-left: 0.23rem;
  }
.swipslider .sw-slide > img{
    height: 5rem;
}
.trade{
    margin-left:.3rem;
  position: relative;
}
.trade .pl{
    padding:.23rem 0 .20rem 0;
    color:#E61414;
    font-family:PingFangSC-Semibold;
    font-size: .48rem;
}
.trade .pl span{
    font-size: .24rem;
    color: #999;
  margin-right: 0.35rem;
}
  .trade .pl label{
    font-size:0.24rem;
    font-family:PingFangSC-Regular;
    color:rgba(173,173,173,1);
    text-decoration:line-through;
  }
.trade .p2{
    padding-bottom: .39rem;
    color: #222;
    font-size: .36rem;
    font-family:PingFangSC-Medium;
}
.pt_list{
  width: calc(100% - 0.38rem);
  /*height: 3.7rem;*/
  padding: 0rem 0.13rem 0  0.25rem;
}
.pt_list_title{
  width: 100%;
  height: 0.67rem;
  text-align: left;
  font-size:0.24rem;
  font-family:PingFangSC-Medium;
  color:rgba(34,34,34,1);
  line-height:0.67rem;
}
.pt_list_li{
  width: 100%;
  height:0.6rem;
  padding: 0.2rem 0 0.2rem 0;
  border-top:1px solid rgba(238,238,238,1);
}
.list_li_left{
  width: 70%;
  float: left;
}
  .list_li_left img{
    width: 0.6rem;
    height: 0.6rem;
    object-fit: cover;
    border-radius: 50%;
    float: left;
  }
  .list_li_left span{
    line-height: 0.6rem;
    font-size:0.22rem;
    display: inline-block;
    margin-left: 0.19rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
  }
  .list_li_right{
      width: 30%;
      float: right;
  }
  .list_li_right span{
    font-size:0.22rem;
    display: inline-block;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    line-height:0.6rem;
  }
  .list_li_right label{
    font-size:0.26rem;
    font-family:PingFangSC-Regular;
    color:rgba(254,75,0,1);
    line-height:0.6rem;
  }


  .hd_div{
    width: 100%;
    height: 1.4rem;
    position: relative;
    background:rgba(255,241,241,1);
  }
   .hd_title{
    width: calc(100% - 1.71rem);
    float: right;
    height:0.4rem;
    text-align: right;
    padding-right: 0.21rem;

    font-size:0.22rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,57,0,1);
    line-height:0.4rem;
  }
  .trade .hd_nav{
    position: absolute;
    top:-0.5rem;
    left: -0.3rem;
  }
  .hd_nav{
    float: left;
    width: 1.6rem;
    height: 0.5rem;
    background: url('../img/yufuhuodongbiao.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top:-0.14rem;
  }
  .hd_nav label{
    font-size:0.22rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    line-height:0.5rem;
    vertical-align: middle;
    margin: 0.14rem 0 0.14rem 0.10rem;
  }
  .hd_nav img{
    width: 0.26rem;
    height: 0.24rem;
    vertical-align: middle;
    margin: 0.13rem 0.09rem 0.13rem 0.05rem;

  }

  .ha_cont{
    width: 100%;
    height: 1rem;
  }
  .ha_cont .cont_left{
    width: 5rem;
    height: 1rem;
    float: left;
    background:rgba(254,75,0,1);
  }
  .ha_cont .cont_right{
    width: 2.5rem;
    height: 1rem;
    float: right;
    background:rgba(255,194,30,1);
  }

  .cont_left_top{
    width: 100%;
  }
  .cont_left_top .left{
    width: calc(60% - 0.2rem);
    float: left;
    height: 0.42rem;
    font-size:0.3rem;
    font-family:PingFangSC-Semibold;
    color:rgba(255,255,255,1);
    line-height:0.42rem;
    margin-top: 0.15rem;
    padding-left: 0.2rem;
  }
  .cont_left_top .left span{
    font-size:0.48rem;
  }
  .cont_left_top .right{
    width: calc(40% - 0.12rem);
    float: right;
    height: 0.22rem;
    font-size:0.2rem;
    font-family:PingFangSC-Regular;
    color:rgba(229,229,229,1);
    line-height:0.22rem;
    margin-top: 0.35rem;
    margin-right: 0.12rem;
    text-align: right;

  }
  .cont_left_bottom{
    width: 100%;
  }
  .cont_left_bottom .left{
    width:calc(100% - 2.5rem);
    float: left;
    height: 0.24rem;
    font-size:0.22rem;
    font-family:PingFangSC-Regular;
    color:rgba(229,229,229,1);
    line-height:0.24rem;
    text-decoration:line-through;
    margin-top: 0.1rem;
    padding-left: 0.2rem;
  }
  .cont_left_bottom .right{
    width: 2.15rem;
    float: left;
    margin-right: 0.12rem;
    margin-top: 0.09rem;
  }

  .cont_right_title{
    width: 100%;
    height:0.21rem;
    text-align: center;
    font-size:0.22rem;
    font-family:PingFangSC-Regular;
    color:rgba(254,75,0,1);
    line-height:0.22rem;
    margin-top: 0.1rem;
  }
  .cont_right_time{
    width: 100%;
    height: 0.5rem;
    margin-top: 0.11rem;
  }
  .time_div{
    padding: 0 0.05rem;
    height:0.5rem;
    float: left;
    background:rgba(254,75,0,1);
    border-radius:0.08rem;
    font-size:0.3rem;
    font-family:PingFangSC-Semibold;
    color:rgba(255,255,255,1);
    line-height: 0.5rem;
    text-align: center;
  }
  .time_div:nth-child(1){
    margin-left: 0.15rem;
  }
  .time_span{
    width:0.06rem;
    height:0.5rem;
    font-size:0.3rem;
    display: inline-block;
    float: left;
    font-family:PingFangSC-Semibold;
    color:rgba(254,75,0,1);
    line-height:0.5rem;
    margin: 0 0.1rem;
  }

  .loader-container {
    height: 100%;
    width:70%;
    background: url("../img/wangchengjindu.png") no-repeat;
    background-size: 100% 100%;
    border-radius:7px;
    box-shadow: inset 0 -2px 2px rgba(0, 0, 0, 0.2);
    animation: loader 1s linear;
  }
  .progress{
    width: 2.15rem;
    height: 0.2rem;
    border-radius:0.1rem;
    margin-top: 0.09rem;
    background-color: #D94000;
    /*background: -webkit-linear-gradient(left,#D94000,#D94000);*/
    /*background: -moz-linear-gradient(left,#D94000,#D94000);*/
    /*background: -o-linear-gradient(left,#D94000,#D94000);*/
    /*background: -ms-linear-gradient(left,#D94000,#D94000);*/
    /*background: linear-gradient(left,#D94000,#D94000);*/
  }
  @keyframes loader {
    0% {
      width: 0%;
    }
    100% {
      width: 2.15rem;
    }
  }

.range_names{
    font-size:.2rem;
    font-family:PingFangSC-Regular;
    color:rgba(254,75,0,1);
    padding:.1rem .2rem;
    background:rgba(255,241,241,1);
    border-radius:6px;margin:0 .2rem .18rem 0
}




.pt_footer{
    /*background: url('../img/fenxiangbeijing.png') no-repeat;*/
    width: 100%;
    height: 1.27rem;
   background-color: #F10200;
    position: fixed;
    bottom: -.31rem;

}
.pt_footer div{
  width: 100%;
  height: 0.96rem;
  line-height: 0.96rem;
  font-size:0.32rem;
  font-family:PingFangSC-Light;
  color:rgba(255,255,255,1);
 text-align: center;
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
