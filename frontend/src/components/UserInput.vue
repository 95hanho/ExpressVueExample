<template>
    <div class="userInput">

        <div class="main-content">
            <div class="page-content">
                <div class="row">
                <div class="widget-header widget-header-small">
                    <h5 class="lighter"><span class="callDiv">유저 추가</span></h5>
                </div>
                <div class="widget-body">
                    <div class="widget-main">
                        <div class="row">
                            <div class="input-group col-xs-4" >
                                <label>유저 아이디</label>
                                <div class="input-group bootstrap-timepicker">
                                    <span class="input-group-addon">
                                        <i class="icon-user bigger-110"></i>
                                    </span>
                                    <input class="form-control" v-model="User.id" @keyup.enter="userInput" ref="id">
                                </div>
                            </div>
                            <div class="input-group col-xs-4" >
                                <label>유저 비밀번호</label>
                                <div class="input-group bootstrap-timepicker">
                                    <span class="input-group-addon">
                                        <i class="icon-lock"></i>
                                    </span>
                                    <input type="password" class="form-control" v-model="User.password" @keyup.enter="userInput" ref="password">
                                </div>
                            </div>
                        </div>

                    
                    <div class="row">
                        <div class="input-group pull-right col-xs-4">
                            <div class="input-group" id="inputBtn">
                                <button type="button" class="btn btn-primary btn-sm callDiv" @click="reset">
                                    리셋<i class="icon-download icon-on-right bigger-110"></i>
                                </button>
                                <button type="button" class="btn btn-success btn-sm callDiv" @click="userInput">
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
    data(){
        return{
            User:{
                id:"",
                password:"",
            }
        }
    },
    methods:{
        reset(){
            this.User.id = "";
            this.User.password = "";
        },
        userInput(){
            if(this.User.id.length == 0){
                alert('유저 아이디를 입력해주세요.');
                this.$refs.id.focus();
            } else if(this.User.password.length == 0){
                alert('유저 비밀번호를 입력해주세요.');
                this.$refs.password.focus();
            } else {
                this.$http.post('/api/users/userInput', this.User)
                .then((res) =>{
                    alert(res.data.message);
                }).catch((err) => {
                    alert(err);
                });
            }
        },
    }
}
</script>