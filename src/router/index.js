import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
import Product from '@/components/product'
import OrderDetails from '@/components/orderDetails'
import Product_details from '@/components/product_details'
import Sale_details from '@/components/sale_details'
import consult_details from '@/components/consult_details'
import protocol from '@/components/protocol'
import my_video from '@/components/my_video'
import log from '@/components/log'
import auction from '@/components/auction'

Vue.use(Router)

export default new Router({
  // mode:'history',
	routes: [
        // {
        //   path: '/',
        //   component: Index
		// },
		{  //商品分享页面（可以分享）
			path: '/product',
			component: Product
		},{  //订单详情
			path: '/orderDetails',
			component: OrderDetails
		},{  //商品详情
			path: '/product_details',
			component: Product_details
		},{ //售后详情
			path: '/sale_details',
			component: Sale_details
		},{  //资讯详情（可以分享）
      path: '/consult_details',
      component: consult_details
    },{  //协议
      path: '/protocol',
      component: protocol
    },{  //我的宝辰（视频）（可以分享）
      path: '/my_video',
      component: my_video
    },{  //登录
      path: '/log',
      component: log
    },
    {  //竞拍，商品分享
      path: '/auction',
      component: auction
    }
	]

})

