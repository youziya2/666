<template>
    <div>
        <div class="steps3" :style="{backgroundColor:colorselects,color:'#fff'}">
            <!-- 账号验证 -->
            <div>{{ $parent.modifyObj.msg03 }}</div>
            <!-- 输入新密码 -->
            <div>{{ $parent.modifyObj.msg20 }}</div>
            <!-- 密码修改成功 -->
            <div>{{ $parent.modifyObj.msg07 }}</div>
        </div>
        <div class="succeed-content">
                <!-- 成功修改 -->
            <div class="succeed"><img src="./../../../../static/img/succeed.png">{{ $parent.modifyObj.msg26 }}</div>
            <!-- 倒计时 -->
            <div class="succeed-titel">{{ $parent.modifyObj.msg27 }}：{{time}}S</div>
            <!-- 立即登陆 -->
            <el-button :style="{backgroundColor:colorselects,color:'#fff'}" class="link-login" @click="gologin()">{{ $parent.modifyObj.msg28 }}</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            time: 8,
            timer:null
        }
    },
    created(){
        this.timer = setInterval(() => {
            this.ftime();
        }, 1000);
        if(localStorage.getItem('slecole')){
            this.$parent.$router.options.routes[1].meta.colorselect = localStorage.getItem('slecole');
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods:{
        ftime(){
            if(this.time-- <= 1){
               clearInterval(this.timer);
               this.gologin();
            }
        },
        gologin(){
            clearInterval(this.timer);
            this.$router.push({ path: "/logins/login" });
        }
    },
    computed:{
        colorselects(){
            return this.$parent.$router.options.routes[1].meta.colorselect;
        }
    }
}
</script>

<style scoped>
    .succeed-content{
        width: 100%;
        text-align: center;
        margin-top: 250px;
    }
    .succeed{
        font-size: 18px;
    }
    .succeed img{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 20px;
    }
    .succeed-titel{
        text-align: center;
        font-size: 14px;
        color: #999;
        margin-top: 20px;
    }
    .link-login{
        margin-top: 40px;
        font-size: 16px;
    }
    .steps3{
        height: 40px;
        width: 100%;
        margin-bottom: 60px;
    }
    .steps3 div{
        width: 33%;
        float: left;
        text-align: center;
        height: 100%;
        line-height: 40px;
    }
</style>
