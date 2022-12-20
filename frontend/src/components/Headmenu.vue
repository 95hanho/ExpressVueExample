<template lang="html">
  <div class="headmenu">

    <div class="navbar navbar-default">
      <div class="navbar-container">


        <div class="navbar-header pull-left">
          <router-link to="/ment" class="navbar-brand">
            <small>
              <i class="icon-music"></i>
              멘트 관리
            </small>
          </router-link>
          <router-link to="/user" class="navbar-brand">
            <small>
              <i class="icon-user"></i>
              유저 입력
            </small>
          </router-link>
        </div>

        <div class="navbar-header pull-right" role="navigation">
          <ul class="nav ace-nav">
            <li class="light-blue">
              <router-link to="/">
                <i class="icon-external-link"></i>
                logout
              </router-link>
            </li>
          </ul>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
