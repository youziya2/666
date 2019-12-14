<template>
    <div class="changepassword">
        <img src="./../../../static/img/title.png">
        <div class="passcut"></div>
        <div style="overflow: hidden">
                <!-- 密码修改 -->
            <div class="changepass">
                <span>{{ modifyObj.msg01 }}</span> > {{title}}
            </div>
            <!-- 首页 -->
            <div class="changepass" style="float: right;cursor: pointer;" :style="{color:colorselects}" @click='goIndex'>
                {{ modifyObj.msg02 }}
            </div>
        </div>
        <router-view/>
    </div>
</template>
<script>
    import { modifyInit } from "@/init/login.js";
    export default{
        data() {
            return {
                title: '',
                modifyObj: {}       
            }
        },
        created() {
            modifyInit(this);
            this.testRouter();
            console.log(this.modifyObj)
        },
        computed:{
            colorselects(){
                return this.$parent.$router.options.routes[1].meta.colorselect;
            }
        },
        watch: {
            "$route": 'testRouter'  //监听路由变化
        },
        methods: {
            testRouter(){
                var myRoute = this.$route.path
                myRoute = myRoute.split('/')
                myRoute = myRoute[myRoute.length-1]
                switch (myRoute) {
                    case 'stepone':
                        this.title = this.modifyObj.msg03;//账号验证
                        break;

                    case 'steptwo':
                        this.title = this.modifyObj.msg04;//密码重置
                        break;
                    
                    case 'stepthree':
                        this.title = this.modifyObj.msg05;//修改成功
                        break;

                    default:
                        this.title = '';
                        break;
                }
            },
            goIndex(){
                this.$router.push({ path: "/logins" });
            }
        },
    }
</script>
<style scoped>
    .changepassword{
        width: 1200px;
        margin: 0px auto;
        margin-top: 60px;
    }
    .changepassword img{
        width:345px;
        height:45px;
    }
    .changepassword .passcut{
        width:1200px;
        height:1px;
        background:rgba(241,244,246);
        margin-top: 20px;
    }
    .changepass{
        float: left;
        font-size: 14px;
        line-height: 34px;
    }
    .changepass span{
        color: #999;
    }
</style>
