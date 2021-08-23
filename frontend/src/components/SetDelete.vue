<template lang="html">
  <div class="setdelete">

    <div class="main-content">

      <div class="page-content">
        <div class="row" style="width:400px">
          <div class="widget-header widget-header-small">
            <h5 class="lighter">데이터 삭제</h5>
          </div>
          <div class="widget-body">
            <div class="widget-main">


              <div class="row">
                <div class="input-group col-xs-8">
                  <label>가상 번호</label>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="icon-phone bigger-110"></i>
                    </span>
                    <input class="form-control"  ref="vnumText" v-model="vnumber" v-on:keyup.enter="vnumDelete">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-group pull-right col-xs-8">
                  <div class="input-group" id="inputBtn">
                    <button type="button" class="btn btn-primary btn-sm callDiv" v-on:click="vnumDelete">
                      삭제하기<i class="icon-download icon-on-right bigger-110"></i>
                    </button>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="input-group col-xs-8">
                  <label>멘트 경로</label>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="icon-cog bigger-110"></i>
                    </span>
                    <input class="form-control"  ref="pathText" v-model="path" v-on:keyup.enter="pathDelete">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-group pull-right col-xs-8">
                  <div class="input-group" id="inputBtn">
                    <button type="button" class="btn btn-primary btn-sm callDiv" v-on:click="pathDelete">
                      삭제하기<i class="icon-download icon-on-right bigger-110"></i>
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
  data() {
    return {
      path: "/ment/",
      vnumber: ""
    }
  },
  methods: {
    vnumDelete: function(){
      this.$http.post('/api/virtual/vnumdelete', {vnumber: this.vnumber}).then((res) => {
        if(res.data.success == true){
          alert('삭제완료');
          this.vnumber = "";
        }
        if(res.data.success == false){
          alert(res.data.message);
          this.$refs.vnumText.focus();
        }
      })
    },
    pathDelete: function(){
      this.$http.post('/api/virtual/pathdelete', {
        path: this.path,
      }).then((res) => {
        if(res.data.success == true){
          alert('삭제완료');
          this.path = "/ment/";
        }
        if(res.data.success == false){
          alert(res.data.message);
          this.$refs.pathText.focus();
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
