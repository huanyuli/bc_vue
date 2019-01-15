<template>
    <div>
        <div class="imgs_content" style="padding:.46rem .3rem 1.52rem .3rem" v-html='this.commodity.goods_content'>
            {{this.commodity.goods_content}}
        </div>
 
    </div>
</template>
    
<script>
export default {
    data () {
        return {
            commodity:{},
        }
    },
    methods:{
       
        
    },
    mounted (){
        
	},
    created () {    
        let userDatas = this.$qs.stringify({
            goods_id:this.$route.query.goods_id,
        });
        this.axios({
            method:'post',
            url:this.HOST+'Api/Goods/goodsIntro',
            data:userDatas
        }).then((res) => {
            if(res.data.code){
                alert(res.data.msg)
            }else{
                this.commodity = res.data.data
                console.log(this.commodity)
            }
            
        })
        
    }
}
</script>
<style scoped>

</style>
    