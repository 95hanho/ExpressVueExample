<template>
  <div id="app">
    <header>
      <div class="titleDiv">
        <img src="123.PNG">
      </div>
    </header>
    <Headmenu v-if="$route.name != 'Login'"/>
    <router-view/>
  </div>
</template>

<script>
import Headmenu from '@/components/Headmenu.vue'

export default {
  components: {
    Headmenu,
  },
  created(){
  },
}
</script>

<style>
body{
  min-width:1200px;
}
header {
  height:60px;
  background-color: rgb(221, 221, 214);
}
.titleDiv{
  text-align: center;
  margin: 0 auto;
  width: 230px;
  height: 100%;
  float: left;
}
.titleDiv>img{
  display: block;
  float: left;
  height: 50px;
}
#inputBtn{
  float:right;
  margin-top:20px;
  width: 80%;
}
#inputBtn>button:nth-child(1){
  margin-left: 5px;
}
#inputBtn>button{
  width:45%;
  float:right;
}
</style>
