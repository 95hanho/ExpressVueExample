<template>
  <div class="setsearch">

    <div class="main-content">
      <div class="page-content">
        <div class="row">
          <div class="widget-header widget-header-small">
            <h5 class="lighter">데이터 검색</h5>
          </div>
          <div class="widget-body">
            <div class="widget-main">
              <div class="row">

                <div class="input-group col-xs-3">
                  <label>TEXT</label>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="icon-font bigger-110"></i>
                    </span>
                    <input type="text" placeholder="검색어를 입력하세요" style="width:100%" v-model="searchText" v-on:keyup.enter="search"/>
                  </div>
                </div>

                <div class="input-group col-xs-3" >
                  <label>검색종류</label>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="icon-align-left bigger-110"></i>
                    </span>
                    <select class="form-control" style="width:100%" v-model="searchSelect">
                      <option value="1" selected>가상번호</option>
                      <option value="2">유저아이디</option>
                      <option value="3">멘트경로</option>
                    </select>
                  </div>
                </div>

                <div class="input-group  col-xs-3" >
                  <label>사용여부</label>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="icon-font bigger-110"></i>
                    </span>
                    <select class="form-control" style="width:50%" v-model="searchUsecheck">
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="input-group pull-right col-xs-4">
                  <label> </label>
                  <div class="input-group" id="inputBtn">
                    <button type="button" class="btn btn-success btn-sm" v-on:click="search">
                      검색하기<i class="icon-search icon-on-right bigger-110"></i>
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="allSearch">
                      전체조회<i class="icon-save icon-on-right bigger-110"></i>
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="main-content">
      <div class="page-content">
        <div class="row">
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th width="25%">가상번호</th>
                <th width="15%">유저아이디</th>
                <th width="30%">멘트경로</th>
                <th width="10%"><span data-trigger="hover" title="설정의 현재 상태를 의미합니다.">상태</span></th>
                <th width="20%"></th>
              </tr>
            </thead>

            <tbody v-for="virtualnum in virtualnums" :key="virtualnum">
              <VirtualList v-bind:propsdata="virtualnum" @vtdelete="vtdelete"/>
            </tbody>
          </table>
          <input type='hidden' value='1' />
          <div class="modal-footer no-margin-top"></div>
        </div>
      </div>
    </div>


    


  </div>
</template>

<script>
import VirtualList from '@/components/VirtualList.vue'

export default {
  data() {
    return {
      virtualnums: [],
      searchVtnums: [],
      searchSelect: "1",
      searchText: "",
      searchUsecheck:"Y"
    }
  },
  created() {
    this.$http.get("/api/virtual").then((response) => {
      this.virtualnums = response.data;
    });
  },
  components: {
    VirtualList
  },
  methods: {
    allSearch: function(){
      this.$http.get("/api/virtual").then((response) => {
        this.virtualnums = response.data;
        this.searchVtnums = [];
      });
    },
    vtdelete: function(){
      this.$http.get("/api/virtual").then((response) => {
        this.virtualnums = [];
        var virtualnums = response.data;
        var searchnums = this.searchVtnums;
        if(searchnums != ''){
          for(var key in searchnums){
            for(var key2 in virtualnums){
              if(searchnums[key].vtNum == virtualnums[key2].vtNum){
                this.virtualnums.push(searchnums[key]);
              }
            }
          }
        } else{
          this.virtualnums = response.data;
        }
      });
    },
    search: function(){
      this.$http.get("/api/virtual").then((response) => {
        this.virtualnums = response.data;

        this.searchVtnums = [];
        if(this.searchText == ""){
          alert('검색어를 입력해주세요.');
        } else{
          var virtualnums = this.virtualnums;
          for(var key in virtualnums){
            if(virtualnums[key].usecheck == this.searchUsecheck){
              if(this.searchSelect == "1"){
                if(virtualnums[key].vnumber.includes(this.searchText)){
                  this.searchVtnums.push(virtualnums[key]);
                }
              } else if (this.searchSelect == "2") {
                if(virtualnums[key].userid.includes(this.searchText)){
                  this.searchVtnums.push(virtualnums[key]);
                }
              } else if (this.searchSelect == "3") {
                if(virtualnums[key].path.includes(this.searchText)){
                  this.searchVtnums.push(virtualnums[key]);
                }
              }
            }
          }
          this.virtualnums = this.searchVtnums;
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>

</style>
