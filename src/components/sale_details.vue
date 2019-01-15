<template>
    <div>
        <header>
            <span v-if="this.commodity.return_status == 10">审核中</span>
            <span v-else-if="this.commodity.return_status == 20">已审核</span>
            <span v-else-if="this.commodity.return_status == 25">已结束</span>
            <span v-else-if="this.commodity.return_status == 30 || this.commodity.return_status == 40">处理中</span>
            <span v-else-if="this.commodity.return_status == 45 || this.commodity.return_status == 50 || this.commodity.return_status == 55">已结束</span>
            <label v-if="this.commodity.return_status == 45 ">结束时间：{{this.commodity.get_return_time}}</label>
            <label v-if="this.commodity.return_status == 50 || this.commodity.return_status == 55">结束时间：{{this.commodity.pay_back_time}}</label>
        </header>
      <div class="ma_bt" v-if="this.commodity.return_status == 50 || this.commodity.return_status == 55">
        <div class="time">
          <p class="sale" >已退款：¥ {{this.commodity.pay_back_money}}</p>
        </div>
      </div>
      <div class="ma_bt" v-if="this.commodity.return_status == 45">
        <div class="time">
          <p class="sale" >已拒收</p>
        </div>
        <p class="details_s">
          {{this.commodity.get_return_remark}}

        </p>
      </div>
        <div v-if="this.commodity.return_status != 10">
            <div class="time">
                <p class="sale">客服反馈</p>
                <span class="time_color" style="padding-right:.3rem">
                    反馈时间：{{this.commodity.check_time}}
                </span>
            </div>
            <p class="details">
              {{this.commodity.check_remark}}
            </p>
        </div>
        <div class="wl" v-if="this.commodity.return_status == 20">
            <p class="sale fh">发货信息</p>
            <div class="logistics">
                <label>物流公司*：</label>
                <input id="wl_company" type="text" placeholder="请输入物流公司名称">
            </div>
            <div class="logistics">
                <label>运单号*：</label>
                <input id="wl_order" type="text" placeholder="请输入运单号">
            </div>
        </div>
      <div class="wl" v-if="this.commodity.return_status != 20 && this.commodity.return_status != 10 && this.commodity.return_status != 25">
        <p class="sale fh">发货信息</p>
        <div class="logistics">
          <label>物流公司*：{{this.delivery_info.company}}</label>
          <!--<input type="text" placeholder="请输入物流公司名称">-->
        </div>
        <div class="logistics">
          <label>运单号*：{{this.delivery_info.order_no}}</label>
          <!--<input type="text" placeholder="请输入运单号">-->
        </div>
      </div>
        <div>
            <p class="sale sh">售后信息</p>
            <div class="s_ma_bt" v-for='(item,index) in this.order_goods' style="background:rgba(247,247,247,1);display: flex;" @click="order_click(index)">
                <img style="width:2rem;height:1.6rem;padding:.14rem .19rem .14rem .21rem" :src="item.goods_main_pic" alt="">
                <div  class="nr text_space">
                    <p>{{item.goods_name}}</p>
                    <span v-for="(list,num) in item.list_range">{{list}}</span>
                </div>
            </div>
            <div class="xx" style="padding-bottom: .3rem;
            border-bottom: .01rem solid #eee;">
                <p><label>订单金额：</label><span>￥{{this.commodity.pay_money}}</span></p>
                <p><label>申请时间：</label><span>{{this.commodity.create_time}}</span></p>
                <p><label>订单编号：</label><span>{{this.commodity.order_no}}</span></p>
            </div>
            <div style="padding-bottom:1.38rem" class="xx">
                <p><label>联系人：</label><span>{{this.commodity.contact_user}}</span></p>
                <p><label>联系方式：</label><span>{{this.commodity.contact_mobile}}</span></p>
                <p><label>类型：</label><span v-if="this.commodity.return_type == 1">退款退货</span></p>
                <p style="display: flex;"><label>问题描述：</label><span style="display: inline-block;width: 5.69rem;">{{this.commodity.return_info}}</span></p>
                <p><label>图片信息：</label></p>
                <p>
                    <img v-for='(item,index) in this.commodity.return_pics' @click="yl_img(index)" style="width:2rem;height:2rem;padding:0 .2rem 0 0" :src="item" alt="">
                </p>
            </div>
            <footer v-if="this.commodity.return_status == 20">
                <button @click="sale()">提交</button>
            </footer>
        </div>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
  export default {
    data () {
        return {
          commodity:{},  //数据
          delivery_info:{},  //退货发货信息
          order_goods:[], //订单商品
          order_token:"",   //token
          return_id:""   //售后ID
        }
    },
    methods:{

      //获取数据
      getData(){
        let userDatas = this.$qs.stringify({
          return_id:this.$route.query.return_id,
          token:this.$route.query.bc_id,
//          token: window.localStorage.getItem('Token')
//          return_id:15,
//          token: 'token_102'
        });
        this.axios({
          method:'get',
          url:this.HOST+'/Api/Order/returnInfo?' + userDatas,
//             data:userDatas
        }).then((res) => {
          if(res.data.code){
                 alert(res.data.msg)
//            Dialog.alert({
//              message: res.data.msg
//            }).then(() => {
//              // on close
//            });
          }else{

            this.commodity = res.data.data
//               this.commodity.return_status = 50
            this.delivery_info = res.data.data.delivery_info
            this.order_goods = res.data.data.order_goods
            this.commodity.create_time = getMyDate(res.data.data.create_time) //申请时间
            this.commodity.get_return_time = getMyDate(res.data.data.get_return_time); //结束时间
            this.commodity.pay_back_time = getMyDate(res.data.data.pay_back_time); //退款时间
            this.commodity.check_time = getMyDate(res.data.data.check_time); //反馈时间
            this.order_token = this.$qs.parse(userDatas).token
            this.return_id = this.$qs.parse(userDatas).return_id
          }
        })
        //时间转换
        function getMyDate(str){
          var oDate = new Date(str * 1000),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
          return oTime;
        };
        function getzf(num){
          if(parseInt(num) < 10){
            num = '0'+num;
          }
          return num;
        }
      },


      order_click(index){  //点击订单中某个商品 触发
//        var jsonString = JSON.stringify(this.commodity.order_goods[index]);   //将对象转换为json格式
////        console.log(jsonString)
//        jsonString = encodeURIComponent(jsonString)
//        window.location.href = 'sale_details://list='+ jsonString;
      },

      //提交物流信息
      sale(){
       var _company = $.trim($("#wl_company").val());  //物流公司
       var _order =  $.trim($("#wl_order").val()) ;  //物流运单号
        if(_company != undefined & _order != undefined & _order != "" & _company != ""){
//          let returnData = this.$qs.stringify({
//            return_id:this.return_id,
//            order_no:_order,
//            company:_company,
//            token:this.order_token
//          });
//          console.log("saleredraw://sale_details?list={\"order_no\":\""+ _order +"\",\"company\":\""+ _company + "\"}")
          window.location = "saleredraw://sale_details?list={\"order_no\":\""+ _order +"\",\"company\":\""+ _company + "\"}"
//          this.axios({
//            method:'post',
//            url:this.HOST+'/Api/order/returnDelivery/',
//            data:returnData
//          }).then((res) => {
//            if(res.data.code){
////                 alert(res.data.msg)
//              Dialog.alert({
//                message: res.data.msg
//              }).then(() => {
//                // on close
//              });
//            }else{
//              Dialog.alert({
//                message: res.data.msg
//              }).then(() => {
//                // on close
//                this.getData();
//              });
//            }
//          })

        }else{
          Dialog.alert({
            message: '请填写物流信息'
          }).then(() => {
            // on close
          });
        }
//        window.location = "bcsale://sale_details?list={\"return_id\":\""+ this.$route.query.return_id +"\",\"order_no\":\""+ _order +"\",\"company\":\""+ _company + "\"}"
      },

      yl_img(index){
//        console.log(index);
        var _temp = {
          index:index,      // 点击图片的下标（0是第一张）
          imgs:this.commodity.return_pics      //图片的数组
        }
//        console.log(_temp)
        var jsonString = JSON.stringify(_temp);   //将对象转换为json格式
        jsonString = encodeURIComponent(jsonString)
//        console.log(jsonString)
       window.location.href = 'sale_imgs://list='+ jsonString;
      }
    },
    mounted (){

	},
    created () {
      //调用获取数据方法
      this.getData();
    }
}
</script>
<style scoped>
header{
    height:1rem;
    width: 100%;
    background:rgba(255,0,54,1);
    display: flex;
    align-items: center;
}
header span{
    font-size:.36rem;
    font-family:PingFangSC-Medium;
    color:rgba(255,255,255,1);
    flex-grow: 1;
    padding-left: .42rem;
}
header label{
    font-size:.24rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    padding-right: .28rem;
}
footer{
    height: 1.38rem;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
}
footer button{
    width:6.9rem;
    height:.8rem;
    border-radius:.4rem;
    color: #fff;
    font-size: .3rem;
    display:block;
    margin: 0.3rem auto;
    outline: none;
    border: none;
    background-image: linear-gradient(-109deg, #F10200 0%, #FF4D18 100%);
}
.sale{
    font-size:.3rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
    /* padding: .3rem .23rem; */
}
.time_color{
  color: #8D8D8D;
}
.nr p{
    font-size:.26rem;
    font-family:FZLTHK--GBK1-0;
    color:rgba(34,34,34,1);
}
.xx{
    color: #8D8D8D;
    font-size: .24rem;
    padding-left: .23rem;

}
.xx label{
    width: 65px;
    display: inline-block;
}
.nr{
    padding-top: .14rem;
}
.xx p{
    padding-top: .23rem;
}
.text_space{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nr span{
    font-size:.2rem;
    font-family:PingFangSC-Light;
    color:rgba(91,91,91,1);
    padding: .23rem .19rem 0 0;
    display: inline-block;
}
.logistics label{
    font-size:.3rem;
    font-family:PingFangSC-Regular;
    color:rgba(34,34,34,1);
}
.logistics{
    display: flex;
    padding: .20rem 0 0 .23rem;
}
.logistics input{
    width: 4.5rem;
    border: none;
    outline: none;
    font-size: .3rem;
}
.fh{
    margin-left: .23rem;
    padding: .26rem 0;
    border-bottom: .01rem solid #eee;
}
.sh{
    padding: .3rem .23rem;
}
.wl{
    padding-bottom: .34rem;
    border-bottom: .1rem solid #eee;
}
.ma_bt{
  border-bottom: .1rem solid #eee;
}
.s_ma_bt{
  border-bottom: .1rem solid #fff;
}
.details_s{
  font-size:.28rem;
  font-family:PingFangSC-Regular;
  color:rgba(165,165,165,1);
  padding: .26rem .5rem .36rem .5rem;
}
.details{
    font-size:.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(165,165,165,1);
  padding: .20rem .5rem .28rem .5rem;
    border-bottom: .02rem solid #eee;
}
.time{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid #eee;
    margin-left: .23rem;
    padding: .26rem 0;
}
.time span{
  font-size:0.24rem;
  color:rgba(141,141,141,1);
}
</style>
