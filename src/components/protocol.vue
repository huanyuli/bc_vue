<template>
  <div>
    <div class="imgs_content" style="padding:.1rem .3rem 1.52rem .3rem" v-html='this.content'>
      {{this.content}}
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        content:"",
      }
    },
    methods:{


    },
    mounted (){

    },
    created () {
      let userDatas = this.$qs.stringify({
        mark:this.$route.query.mark,   //1=关于我们  2=用户协议说明  3=发票说明  4=优惠券说明 5=竞拍规则
      });
      this.axios({
        method:'get',
        url:this.HOST+'Api/About/index?' + userDatas,
//        data:userDatas
      }).then((res) => {
        if(res.data.code){
          alert(res.data.msg)
        }else{
//          console.log(res.data);
          this.content = res.data.data.content;

        }

      })

    }
  }
</script>
<style scoped>
  .imgs_content{
    font-size: 0.38rem;
    font-family:PingFangSC-Regular;
    color:#111111;
    line-height: 0.6rem;
  }
</style>
