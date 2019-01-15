<template>
    <div>
        <h2>测试文本Two</h2>
        <div>
            <h2>token: </h2><p id="value" content="javascript:window.localStorage.getItem('XX-Token')"></p>
            <p id="value2" content="javascript:window.localStorage.getItem('XX-Token')"></p>
            <p id="value3"></p>
        </div>
        <a href="caskieapp://test/" >立即打开</a>
        <a href="caskieapp://test/" @click='applink' class="btn-download" id="btn-download">立即打开</a>
        <a href="caskieapp://test/" class="btn-download" id="btn-check">检测是否安装了卡斯基APP</a>

    </div>
</template>

<script>
import {HOSTNAME} from '../main.js';
import axios from 'axios';
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

        }
    },
    methods:{
        applink(){
            var appstore, ua = navigator.userAgent;
            var pTag3 = document.getElementById( 'value3' );
            pTag3.innerHTML = '' + ua;
//            if ( browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo) ){
//                return  alert( hips );
//            }
          var u = navigator.userAgent;
          if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            if (browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo)){
              return  alert( hips );
            }
          } else if (u.indexOf('iPhone') > -1) { //苹果手机
            if ( (browser.versions.mobile && (browser.versions.weiXin || browser.versions.weibo)) || (browser.versions.mobile && (browser.versions.QQInBrw || browser.versions.QQbrw) )){
              return  alert( hips );
            }
          }
            if(ua.match(/Android/i)){
              appstore = 'https://www.pgyer.com/Fqg8';
                // appstore = 'file:///android_asset/test_android_appstore.html';
                // appstore = 'market://search?q=com.singtel.travelbuddy.android';
            }
            if(ua.match(/iPhone|iPod|iPad/)){
//                appstore = "https://itunes.apple.com/cn/app/id1433521757?mt=8";
              appstore = 'https://www.pgyer.com/Fqg8';
                // appstore = "https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4";
            }
            var clickedAt = +new Date;
            // During tests on 3g/3gs this timeout fires immediately if less than 500ms.
            setTimeout(function(){
                // To avoid failing on return to MobileSafari, ensure freshness!
                if (+new Date - clickedAt < 2000){
                    window.location = appstore;
                }
            }, 500);
        },
    },
    created(){

    }

}
</script>

<style scoped>


</style>
