<template lang="html">
  <tr>
    <td>
      <input type="text" name="" v-model="virtualnum.vnumber" v-on:keyup.enter="vtmodify" v-bind:disabled="xbox" >
    </td>
    <td>
      <input type="text" name="" v-model="virtualnum.userid" v-on:keyup.enter="vtmodify" v-bind:disabled="xbox">
    </td>
    <td>
      <input type="text" name="" v-model="virtualnum.path" v-on:keyup.enter="vtmodify" v-bind:disabled="xbox">
    </td>
    <td>
      <select class="" name="" v-model="virtualnum.usecheck" v-bind:disabled="xbox">
        <option value="Y">Y</option>
        <option value="N">N</option>
      </select>
    </td>
    <td>
      <button v-on:click="vtmodify">{{ modifytext }}</button>
      <button v-on:click="vtdelete">삭제</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['propsdata'],
  data() {
    return {
      virtualnum: {
        vtNum: "",
        vnumber: "",
        userid: "",
        path: "",
        usecheck: "",
      },
      xbox: true,
      modifytext: "수정"
    }
  },
  created() {
    this.virtualnum.vtNum = this.propsdata.vtnum;
    this.virtualnum.vnumber = this.propsdata.vnumber;
    this.virtualnum.userid = this.propsdata.userid;
    this.virtualnum.path = this.propsdata.path;
    this.virtualnum.usecheck = this.propsdata.usecheck;
  },
  methods: {
    vtmodify: function() {
      if(this.modifytext == "수정"){
        this.modifytext = "완료"
        this.xbox = false
      } else {
        this.$http.post('/api/virtual/virtualupdate', {
          virtualnum: this.virtualnum,
        }).then((res) => {
          if(res.data.success == true){
            alert(res.data.message);
            this.modifytext = "수정"
            this.xbox = true
          }
          if(res.data.success == false){
            alert(res.data.message);
          }
        })
      }
    },
    vtdelete: function() {
      var check = confirm('정말 삭제할까요?');
      if(check){
        this.$http.post('/api/virtual/virtualdelete', {
          virtualnum: this.virtualnum,
        }).then((res) => {
          if(res.data.success == true){
            this.$emit('vtdelete');
          }
          if(res.data.success == false){
            alert('삭제 실패')
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
button {
  width:45%;
  height:100%;
  margin-left: 5px;
  box-shadow:inset 0px 0px 33px 0px #91b8b3;
	background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
	background-color:#768d87;
	border-radius:5px;
	border:1px solid #566963;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:14px;
	font-weight:bold;
	text-decoration:none;
	text-shadow:0px 0px 0px #2b665e;
}
button:hover{
  background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
  background-color:#6c7c7c;
}
button:active{
  position:relative;
	top:1px;
}
tbody:nth-of-type(odd)>tr>td{
  background-color: white;
}
input{
  width:100%;
  height:100%;
  font-size: 15px;
}
select{
  width:100%;
  height:100%;
  font-size: 15px;
}
</style>
