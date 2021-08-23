<template lang="html">
  <div class="setinput">

    <div class="main-content">
      <div class="page-content">
        <div class="row">
          <div class="widget-header widget-header-small">
            <h5 class="lighter"><span class="callDiv">데이터 입력</span></h5>
          </div>
          <div class="widget-body">
            <div class="widget-main">
              <div class="row">
                  <div class="input-group col-xs-3" >
                    <label>가상 번호</label>
                    <div class="input-group bootstrap-timepicker">
                      <span class="input-group-addon">
                        <i class="icon-phone bigger-110"></i>
                      </span>
                      <input class="form-control" v-model="virtualnum.vnumber" v-on:keyup.enter="virtualInput">
                    </div>
                  </div>
                  <div class="input-group col-xs-3" >
                    <label>유저 아이디</label>
                    <div class="input-group bootstrap-timepicker">
                      <span class="input-group-addon">
                        <i class="icon-user"></i>
                      </span>
                      <input class="form-control" v-model="virtualnum.userId" v-on:keyup.enter="virtualInput">
                    </div>
                  </div>
                  <div class="input-group col-xs-3" >
                    <label>사용 여부</label>
                    <div class="input-group bootstrap-timepicker">
                      <span class="input-group-addon">
                        <i class="icon-font bigger-110"></i>
                      </span>
                      <select class="form-control" v-model="virtualnum.useCheck">
                        <option value="N">N</option>
                        <option value="Y" selected>Y</option>
                      </select>
                    </div>
                  </div>
                  <div class="input-group col-xs-3" >
                    <label>멘트 경로</label>
                    <div class="input-group bootstrap-timepicker">
                      <span class="input-group-addon">
                        <i class="icon-cog bigger-110"></i>
                      </span>
                      <input class="form-control" v-model="virtualnum.path" v-on:keyup.enter="virtualInput">
                    </div>
                  </div>

              </div>

              
              <div class="row">
                <div class="input-group pull-right col-xs-4">
                  <div class="input-group" id="inputBtn">
                    <button type="button" class="btn btn-primary btn-sm callDiv" v-on:click="virtualReset">
                      리셋<i class="icon-download icon-on-right bigger-110"></i>
                    </button>
                    <button type="button" class="btn btn-success btn-sm callDiv" v-on:click="virtualInput">
                      입력<i class="icon-search icon-on-right bigger-110"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    


  </div>
</template>

<script>
export default {
  data: function() {
    return {
      virtualnum: {
        vnumber: "",
        userId: "",
        path: "/ment/",
        useCheck: "Y"
      }
    }
  },
  methods: {
    virtualInput: function() {
      this.$http.post('/api/virtual/virtualinput', {
        virtualnum: this.virtualnum,
      }).then((res) => {
        if(res.data.success == true){
          alert(res.data.message);
          this.virtualReset();
        }
        if(res.data.success == false){
          alert(res.data.message);
        }
      })
    },
    virtualReset: function(){
      this.virtualnum.vnumber = "";
      this.virtualnum.userId = "";
      this.virtualnum.path = "/ment/";
      this.virtualnum.useCheck = "Y";
    }
  }
}
</script>

<style lang="css" scoped>
#inputBtn{
  float: right;
  margin-top: 20px;
  width: 80%;
}
#inputBtn>button{
  width: 45%;
  float: right;
}

</style>
