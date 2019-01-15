<template>
    <div>
        <div v-if="this.orderInfo.order_status == 10 && this.orderInfo.pay_type == '4'" style="background:rgba(255,241,241,1);">
            <p style="font-size:.22rem;
            font-family:PingFangSC-Light;
            color:rgba(243,14,4,1);
            padding:.15rem .44rem .21rem .29rem">
            温馨提示：请您在72小时内完成转账，我们将在1个工作日内完成审核，转账后请备注说明您的订单号。
            </p>
        </div>
        <header>
            <img v-if='this.orderInfo.order_status == 10' style="width:100%;height:2rem" src="../img/daifukuan.png" alt="">
            <img v-else-if='this.orderInfo.order_status == 20' style="width:100%;height:2rem" src="../img/daifukuan.png" alt="">
            <img v-else-if='this.orderInfo.order_status == 30' style="width:100%;height:2rem" src="../img/daishouhuo.png" alt="">
            <img v-else-if='this.orderInfo.order_status == 40 || this.orderInfo.order_status == 50' style="width:100%;height:2rem" src="../img/jiaoyichenggong.png" alt="">
            <img v-else-if='this.orderInfo.order_status == 90' style="width:100%;height:2rem" src="../img/jiaoyiguanbi.png" alt="">
            <div :class='this.flag ? "hint" : ""' class="head_text">
                <p v-if='this.orderInfo.order_status == 10'>等待买家付款</p>
                <p style="padding-left: .31rem;
                position: relative;
                top: -.65rem;" v-else-if='this.orderInfo.order_status == 20'>等待发货</p>
                <!--<p v-else-if='this.orderInfo.order_status == 20 && this.orderInfo.order_type == 1 && this.orderInfo.activity_status ==20'>拼团中</p>-->
                <p v-else-if='this.orderInfo.order_status == 24 && this.orderInfo.order_type == 1'>拼团中</p>
                <p style="padding-left: .31rem;
                position: relative;
                top: -.65rem;" v-else-if='this.orderInfo.order_status == 30'>待收货</p>
                <p style="padding-left: .31rem;
                position: relative;
                top: -.65rem;" v-else-if='this.orderInfo.order_status == 40 || this.orderInfo.order_status == 50 '>交易完成</p>
                <p v-else-if='this.orderInfo.order_status == 90'>交易关闭</p>

                <span v-if='this.orderInfo.order_status == 10'>剩余{{this.end_time_arr[0]}}小时{{this.end_time_arr[1]}}分自动关闭</span>
                <span v-else-if='this.orderInfo.order_status == 20 && this.orderInfo.order_type == 1 && this.orderInfo.activity_status ==20'>
                   请耐心等待</span>
                <span v-else-if='this.orderInfo.order_status == 90'>
                   超时关闭</span>
            </div>
        </header>
        <div class="consignee">
            <img style="width:.34rem;height:.42rem;padding:0 .2rem 0 .28rem" src="../img/dizhi123.png" alt="">
            <div>
                <div style="display: flex;justify-content: space-between;padding-bottom:.17rem">
                    <label>收货人：{{this.address_info.name}}</label>
                    <span>{{this.address_info.mobile}}</span>
                </div>
                <p>
                    收货地址：{{this.address_info.province_name}} {{this.address_info.city_name}}
                    {{this.address_info.area_name}} {{this.address_info.address}}
                </p>
            </div>
        </div>
        <div class="commodity">
            <p style="padding:.24rem 0 .2rem .23rem;color:#A2A2A2;font-size:.24rem">订单编号：
                <span style="color:#222"> {{this.orderInfo.order_no}}</span></p>
            <div v-for='(item,index) in this.orderInfo.order_goods'  class="commodity_content" @click='confirm_details(index)'>

                <img style="width:2rem;height:1.6rem;padding:0 .19rem 0 .21rem" :src="item.goods_main_pic" alt="">
                <div style="width:4.79rem">
                    <h3 style="font-size:.26rem;font-family:FZLTHK--GBK1-0;color:rgba(34,34,34,1);">{{item.goods_name}}</h3>
                    <span class="introduce" v-for='(items,index) in item.list_range' >{{items}}</span>

                    <div style="display: flex;color:#E61414;align-items: center;">
                        <label v-if='item.goods_type == "1"' style="font-size:.2rem;padding-right:.08rem">拼团价</label>
                        <label v-else-if='item.goods_type == "2"' style="font-size:.2rem;padding-right:.08rem">抢购价</label>
                        <label v-else-if='item.goods_type == "3"' style="font-size:.2rem;padding-right:.08rem">预付价</label>
                        <label v-else-if='item.goods_type == "6"' style="font-size:.2rem;padding-right:.08rem">竞拍价</label>
                        <p style="flex-grow: 1;font-size:.3rem;font-weight:700">￥{{item.goods_unit_price}}/{{item.goods_unit_weight}}kg</p>
                        <span v-if='item.goods_type != "6"' style="font-size:.3rem;font-weight:700;font-family:PingFangSC-Medium;color:rgba(91,91,91,1);">x {{item.goods_num}}</span>
                    </div>
                  <div style="display: flex;color:#E61414;align-items: center;" v-if='item.goods_type == "6"'>
                    <label style="font-size:.16rem;padding-right:.08rem">起拍价</label>
                    <p style="flex-grow: 1;font-size:.22rem;display: block">￥{{item.object_property.start_price}}/{{item.goods_unit_weight}}kg</p>
                  </div>
                    <p  style="font-size:.2rem;font-family:PingFangSC-Regular;color:rgba(174,174,174,1);text-decoration:line-through"
                    v-if='item.goods_type == "1" || item.goods_type == "2" || item.goods_type == "3"'>单买价￥{{item.goods_unit_price_o}}/{{item.goods_unit_weight_o}}kg</p>
                </div>
            </div>
            <div class="total">
                <span>{{this.create_time}}</span>
                <p style="font-size:.24rem;
                    font-family:PingFangSC-Regular;
                    color:rgba(128,128,128,1);">小计：
                    <label style="font-size:.3rem;font-family:PingFangSC-Semibold;
                    color:rgba(230,20,20,1);">￥{{this.orderInfo.order_money}}</label>
                </p>
            </div>
        </div>
      <div v-if="this.orderInfo.pay_type != '0'" style="padding-bottom: .2rem;border-bottom: .02rem solid #eee;">
        <p v-if="this.orderInfo.pay_type == '1'" class="delivery">支付方式：<span style="color:#222;">微信</span></p>
        <p v-if="this.orderInfo.pay_type == '2'" class="delivery">支付方式：<span style="color:#222;">支付宝</span></p>
        <p v-if="this.orderInfo.pay_type == '3'" class="delivery">支付方式：<span style="color:#222;">银联</span></p>
        <p v-if="this.orderInfo.pay_type == '4'" class="delivery">支付方式：<span style="color:#222;">线下支付</span></p>
        <p v-if="this.orderInfo.pay_type == '4'" class="delivery">开户行：<span style="color:#222;">{{this.orderInfo.company_account.bank_branch}}</span></p>
        <p v-if="this.orderInfo.pay_type == '4'" class="delivery">收款人：<span style="color:#222;">{{this.orderInfo.company_account.bank_branch_no}}</span></p>
        <p v-if="this.orderInfo.pay_type == '4'" style="" class="delivery">银行账号：<span style="color:#222;">{{this.orderInfo.company_account.bank_account}}</span></p>
      </div>
      <div v-if="this.orderInfo.order_type == '3'" style="padding-bottom: .2rem;border-bottom: .02rem solid #eee;">
        <p class="delivery">预计发货时间：<span>{{this.delivery_time}}</span></p>
      </div>

        <div >
            <p class="delivery">配送方式：<span style="color:#222;">物流</span></p>
            <p style="padding-bottom: .2rem;border-bottom: .02rem solid #eee;" class="delivery">运费：
                <span v-if="this.orderInfo.order_type != 5" style="color:#222;">免费</span>
                <span v-if="this.orderInfo.order_type == 5" style="color:#222;">到付</span>
            </p>
            <div style="width:7.05rem;display: flex;
            justify-content: space-between;
            padding: .27rem 0 .27rem .2rem;
            font-size:.26rem">
                <label style="color:#222;">优惠券</label>
                <span style="color:#7E7E7E" v-if="this.orderInfo.order_type != 6">优惠{{this.orderInfo.coupon_money}}元</span>
                <span style="color:#7E7E7E" v-if="this.orderInfo.order_type == 6">竞拍不可用</span>
            </div>
        </div>
        <div v-if='this.orderInfo.has_invoice == 1' style=" border-top: .1rem solid #eee;">
            <p style="font-size:.28rem;
            font-family:PingFangSC-Regular;
            color:rgba(34,34,34,1);
            padding:.26rem 0 .26rem .21rem;
            border-bottom: .02rem solid #eee;
           ">开具发票<span style="font-size:.22rem;
            font-family:PingFangSC-Light;
            color:rgba(135,135,135,1);">(仅支持电子发票)</span></p>
            <div style="padding:.27rem .41rem .26rem .24rem">
                <ul class="bill">
                    <li>
                        <span>发票类型</span>
                        <label>电子发票</label>
                    </li>
                    <li style="padding:.19rem 0">
                        <span>发票内容</span>
                        <label>{{this.order_invoice.invoice_content}}</label>
                    </li>
                    <li>
                        <span>发票抬头</span>
                        <label v-if="this.order_invoice.title_type == 1">个人</label>
                        <label v-else-if="this.order_invoice.title_type == 2">公司</label>
                    </li>
                </ul>
            </div>
        </div>
        <div style="border-top: .02rem solid #eee;padding:.26rem .41rem .23rem .24rem">
            <ul class="bill">
                <li>
                    <span>订单金额：</span>
                    <label>￥{{this.orderInfo.order_money}}</label>
                </li>
                <li style="padding:.19rem 0;border-bottom: .02rem solid #eee;">
                    <span>运费：</span>
                    <label>+￥0.00</label>
                </li>
                <li style="padding: 0.19rem 0px; ">
                    <span>优惠券：</span>
                    <label>-￥{{this.orderInfo.coupon_money}}</label>
                </li>
                <p style="text-align: right;
                font-size: .24rem;
                color: #808080;">
                    合计：<span style="font-size:.3rem;
                    font-family:PingFangSC-Semibold;
                    color:rgba(230,20,20,1);">￥{{this.orderInfo.pay_money}}</span>
                </p>
            </ul>
        </div>
        <div style="height:.96rem;background-color: #fff;"></div>
        <footer v-if='this.orderInfo.order_status == 10'>
            <p style="margin: 0 auto;">实付金额：<span>￥{{this.orderInfo.pay_money}}</span> </p>
            <button @click='cancel_order' class="qx">取消订单</button>
            <button @click='go_to_pay' class="fk">去付款</button>
        </footer>
      <!--<footer v-else-if='this.orderInfo.order_status == 25 && this.orderInfo.order_type == 1'>-->
        <!--<p style="padding: 0 2rem 0 0;">已退款：<span>￥{{this.orderInfo.pay_money}}</span> </p>-->
        <!--<button @click='delete_order' class="qx">删除订单</button>-->
      <!--</footer>-->
        <footer v-else-if='this.orderInfo.order_status == 26 && this.orderInfo.order_type == 1'>
            <p style="padding: 0 2rem 0 0;">待退款：<span>￥{{this.orderInfo.pay_money}}</span> </p>
            <button v-if="this.orderInfo.show_return == '1' && this.orderInfo.is_return != '1'" @click='apply_for_after_sale' class="sh">申请售后</button>
            <button v-if="this.orderInfo.is_return == '1'"  @click='return_click' class="qx">已申请售后</button>
            <button @click='delete_order' class="qx">删除订单</button>
        </footer>
      <footer v-else-if='this.orderInfo.order_status == 25 && this.orderInfo.order_type == 1'>
        <p style="padding: 0 2rem 0 0;">待退款：<span>￥{{this.orderInfo.pay_money}}</span> </p>

        <button @click='delete_order' class="qx">删除订单</button>
      </footer>
        <footer v-else-if='this.orderInfo.order_status == 30'>
          <button v-if="this.orderInfo.show_return == '1' && this.orderInfo.is_return != '1'" @click='apply_for_after_sale' class="sh">申请售后</button>
          <button v-if="this.orderInfo.is_return == '1'" @click='return_click' class="qx">已申请售后</button>
            <button @click='confirm_receipt' class="fk">确认签收</button>
        </footer>
        <footer v-else-if='this.orderInfo.order_status == 40'>
            <button @click='delete_order' class="qx">删除订单</button>
          <button v-if="this.orderInfo.show_return == '1' && this.orderInfo.is_return != '1'" @click='apply_for_after_sale' class="sh">申请售后</button>
          <button v-if="this.orderInfo.is_return == '1'" @click='return_click' class="qx">已申请售后</button>
            <button @click='evaluate' class="fk">评价</button>
        </footer>
        <footer v-else-if='this.orderInfo.order_status == 50'>
          <button v-if="this.orderInfo.show_return == '1' && this.orderInfo.is_return != '1'" @click='apply_for_after_sale' class="sh">申请售后</button>
          <button v-if="this.orderInfo.is_return == '1'" @click='return_click' class="qx">已申请售后</button>
            <button @click='delete_order' class="qx">删除订单</button>
        </footer>
        <footer v-else-if='this.orderInfo.order_status == 90'>
          <p v-if="this.orderInfo.order_type == 1 && this.orderInfo.close_by_return == 1" style="padding: 0 2rem 0 0;">已退款：<span>￥{{this.orderInfo.pay_money}}</span> </p>
            <button @click='delete_order' class="qx">删除订单</button>
        </footer>
    </div>
</template>

<script>
  import { Dialog } from 'vant';
var dateformat = require('dateformat-util');
export default {
    data () {
        return {
            flag:true,
            orderInfo:{},
            pay_end_time_int:0,
            end_time_arr:['00','00','00'],
            address_info:{},
            order_invoice:{},
            create_time:'',
            pay_money:"",
          delivery_time:""
        }
    },
    methods:{
        go_to_pay(){
            if(this.end_time_arr[0] == "00" && this.end_time_arr[1] == "00"){
              //倒计时为0时，事件不执行
              Dialog.alert({
                message: "已超时"
              }).then(() => {
                // on close
              });
            }else{
//            var _temp = this.address_info.province_name + this.address_info.city_name+ this.address_info.area_name+this.address_info.address
//            console.log(this.orderInfo)
              var  _temp = JSON.stringify(this.orderInfo);   //将对象转换为json格式
              _temp = encodeURIComponent(_temp)
//            console.log(_temp)
             window.location.href = 'go_to_pay://list=' + _temp;
            }
        },
        delete_order(){
            window.location.href = 'delete_order://'
        },
        return_click(){
//        var jsonString = JSON.stringify(this.orderInfo.return_id);   //将对象转换为json格式
//        jsonString = encodeURIComponent(jsonString)
//        console.log('bc_return://list=' + jsonString);
        window.location.href = 'bc_return://list=' + this.orderInfo.return_id;
      },
        cancel_order(){
            window.location.href = 'cancel_order://'
        },
        confirm_receipt(){
            window.location.href = 'confirm_receipt://'
        },
        confirm_details(index){  //点击订单中某个商品 触发
//          var _list = {"goods_type":type,"object_id":index};
//          _list = JSON.stringify(_list);
          var jsonString = JSON.stringify(this.orderInfo.order_goods[index]);   //将对象转换为json格式
          //console.log('confirm_details://list'+ _list)
          jsonString = encodeURIComponent(jsonString)
          window.location.href = 'confirm_details://list='+ jsonString;
        },
        evaluate(){

          var jsonString = JSON.stringify(this.orderInfo.order_goods);   //将对象转换为json格式
          jsonString = encodeURIComponent(jsonString)
         //  console.log('evaluate://list=' + jsonString);
            window.location.href = 'evaluate://list=' + jsonString;
        },
        apply_for_after_sale(){
          var jsonString = JSON.stringify(this.orderInfo);   //将对象转换为json格式
          jsonString = encodeURIComponent(jsonString)
            window.location.href = 'apply_for_after_sale://list=' + jsonString;

        }
    },
    beforeMount() {

        //设置定时器，每3秒刷新一次


    },
    created(){
        this.axios.get(this.HOST+'Api/order/orderInfo',{
            params:{
                order_id:this.$route.query.order_id,
                token:this.$route.query.bc_id,
//                token: window.localStorage.getItem('Token')
//                order_id:133,
//               token: 'token_26'
            }
        }).then((res) => {
            if(res.data.code){
                alert(res.data.msg)
            }else{

              this.orderInfo = res.data.data
              if(this.orderInfo.order_status == 90 || this.orderInfo.order_status == 10){
                  this.flag = false
              }
                this.pay_end_time_int = this.orderInfo.pay_end_time;
                this.address_info = this.orderInfo.address_info
                this.order_invoice = this.orderInfo.order_invoice
                this.pay_money = this.orderInfo.pay_money
                this.create_time = dateformat.format(new Date(this.orderInfo.create_time*1000),'yyyy-MM-dd hh:mm:ss')
              if( this.orderInfo.expect_delivery_time != 0){
                this.delivery_time = dateformat.format(new Date(this.orderInfo.expect_delivery_time*1000),'yyyy年MM月dd日')
              }
                //console.log(this.orderInfo)
              const self = this;

              function get_last_time(){
                 if(self.orderInfo.hasOwnProperty('pay_end_time')){
                let date = Date.parse(new Date())/1000;
                let last_time = (self.pay_end_time_int + 60) - date;
//                console.log(date)
                console.log(self.end_time_arr)
                if(last_time<=59){
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
.head_text{
    position: absolute;
    top: .4rem;
    left: .6rem;
    font-family:PingFangSC-Medium;
    color:rgba(255,255,255,1);
}
.sh{
    color: #fff;
    background-color: #FF9C03;
}
.qx{

    color: #A6A6A6;
    border-left: 1px solid #eee;
}
.fk{

    background-image: linear-gradient(-109deg, #F10200 0%, #FF4D18 100%);
    color: #fff;
}
footer{
    height: .96rem;
    background-color: #fff;
    position: fixed;
    bottom:0;
    width: 100%;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
footer p{
    font-size:.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(62,62,62,1);
    display: flex;
    padding-right: .1rem;
}
footer span{
    font-size:.30rem;
    font-family:PingFangSC-Semibold;
    color:rgba(230,20,20,1);
    font-weight: 550;
}
footer button{
    width: 2rem;
    outline: none;
    border: none;
    font-size: .32rem;
    padding: 0;
    height: 100%;
    background-color: transparent;
}
.hint{
    top: 1.4rem;
}
.bill li{
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    color: #878787;
}
.bill li label{
    color: #222;
    font-weight: 700;
}
.delivery{
    padding: .2rem 0 0 .22rem;
    font-size:.24rem;
    font-family:PingFangSC-Regular;
    color:rgba(167,167,167,1);

}
.total{
    display: flex;width: 6.98rem;
    margin-left:.22rem;
    justify-content: space-between;
    padding: .13rem 0 .23rem 0;
    font-size:.22rem;
    font-family:PingFangSC-Regular;
    align-items: center;
    color:rgba(167,167,167,1);
}
.head_text p{
    font-size:.36rem;
    padding-bottom: .3rem;
}
.head_text span{
    font-size:.3rem;
}
.consignee{
    display: flex;
    width: 100%;
    height: 1.6rem;
    align-items: center;
    font-size: .24rem;
    color: #5B5B5B;
    border-bottom: .1rem solid #eee;
}
.commodity{
    border-bottom: .1rem solid #eee;
}
.consignee>div{
    width: 6.16rem;
}
.commodity_content{
    height: 1.88rem;
    background-color: #f7f7f7;
    width: 100%;
    align-items: center;
    display: flex;
    margin-bottom: .1rem;
}
.introduce{
    font-size:.2rem;
    display: inline-block;
    font-family:PingFangSC-Light;
    color:rgba(91,91,91,1);
    padding:.1rem .19rem .1rem 0;
}
</style>
