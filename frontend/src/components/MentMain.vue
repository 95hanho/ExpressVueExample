<template lang="html">
  <div class="mentMain">


    <div class="main-container">
      <div class="main-container-inner">

    
        <div class="sidebar">
          <ul class="nav nav-list">
            <li>
              <a @click="menuNum = 1">
                <i class="icon-bar-chart"></i>
                <span class="menu-text">멘트 데이터 조회</span>
              </a>
            </li>
            <li>
              <a @click="menuNum = 2">
                <i class="icon-pencil"></i>
                <span class="menu-text">멘트 데이터 입력</span>
              </a>
            </li>
            <li>
              <a @click="menuNum = 3">
                <i class="icon-remove-circle"></i>
                <span class="menu-text">멘트 데이터 삭제</span>
              </a>
            </li>
          </ul>
        </div>


        <SetSearch v-if="menuNum == 1"/>
        <SetInput v-if="menuNum == 2"/>
        <SetDelete v-if="menuNum == 3"/>


      </div>
    </div>
  </div>
</template>

<script>
import SetSearch from '@/components/SetSearch.vue'
import SetInput from '@/components/SetInput.vue'
import SetDelete from '@/components/SetDelete.vue'

export default {
  data(){
    return{
        menuNum:"1"
    }
  },
  components: {
    SetSearch,
    SetInput,
    SetDelete,
  }
}
</script>

<style lang="css" scoped>
#naviSubMenu>li{
  width:100%;
}
</style>
