<template>
    <div class="userMain">
        <div class="main-container">
            <div class="main-container-inner">
            
                <div class="sidebar">
                    <ul class="nav nav-list">
                        <li>
                            <a>
                                <i class="icon-pencil"></i>
                                <span class="menu-text">유저 추가</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <UserInput/>

            </div>
        </div>
    </div>
</template>

<script>
import UserInput from '@/components/UserInput.vue'

export default {
    data(){
        return{

        }
    },
    components:{
        UserInput
    },
}
</script>