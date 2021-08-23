<template lang="html">
  <div class="loginview">

    <div class="main-container">
      <div class="main-content">
        <div class="row">
          <div class="col-sm-10 col-sm-offset-1">
            <div class="login-container">
              <div class="center">
                <h1>
                  <span class="blue">세종 가상번호 조회서비스</span>
                </h1>
                <h4 class="red">세종텔레콤</h4>
              </div>
              <div class="space-6"></div>
              <div class="position-relative">
                <div id="login-box" class="login-box visible widget-box no-border">
                  <div class="widget-body">
                    <div class="widget-main">
                      <h4 class="header blue lighter bigger">
                        <i class="icon-coffee green"></i>
                        가입자 정보를 입력하세요.
                      </h4>
                      <div class="space-6"></div>
                      <div id="user">
                        <fieldset>
                          <label class="block clearfix">
                            <span class="block input-icon input-icon-right">
                              <input class="form-control" placeholder="User ID" v-model="user.id" @keyup.enter="login">
                              <i class="icon-user"></i>
                            </span>
                          </label>

                          <label class="block clearfix">
                            <span class="block input-icon input-icon-right">
                              <input type="password" class="form-control" placeholder="Password" v-model="user.password" @keyup.enter="login">
                              <i class="icon-lock"></i>
                            </span>
                          </label>
                          <div id="lower">
                            <span class="red">{{ loginResult }}</span>
                          </div>

                          <div class="space"></div>

                          <div class="clearfix">
                            <button class="width-35 pull-right btn btn-sm btn-primary" v-on:click="login">
                              <i class="icon-key"></i>
                              Login
                            </button>
                          </div>
                          <div class="space-4"></div>
                        </fieldset>
                      </div>
                    </div>
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
      user: {
        id: "123",
        password: "123",
      },
      loginResult: "",
    }
  },
  methods: {
    login: function(){
      this.$http.post("/api/users/login", {
        user: this.user,
      }).then((res) => {
        //로그인 성공
        if(res.data.success == true) {
          alert(res.data.message);
          this.$router.push("/ment");
        } else {
          this.loginResult = res.data.message;
        }
      }).catch((err) => {
        alert(err);
      });
    }
  }
}
</script>

<style lang="css" scoped>
#loginLayout{background-color:#FFFFFF}
.position-relative{
  position: relative;
  border: 3px solid black;
  background: black;
}
</style>
