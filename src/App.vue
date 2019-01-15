<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: NotoSansSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
::-webkit-input-placeholder { /* WebKit browsers */
  font-size: .28rem;
  color: rgba(0,0,0,0.30);
}
#main_div img{
  max-width: 100%;
  height: auto;
}
td,th{
  border: 1px solid #eee;
}
table{border-collapse:collapse;}
.imgs_content img{
  max-width: 100%;
  height: auto;
}
.van-popup{
  width: 90%;
  border-radius:0.2rem;
}
</style>
