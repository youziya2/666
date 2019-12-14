// 404页面
<template>
    <div id="not-find">
        <div class="content">
            <p class="content-tip">页面开小差咯, 请稍后再试</p>
            <p class="content-count">{{count}} 秒后返回登陆页面</p>
            <div class="content-btn">
                <el-button type="warning" style="margin-right:40px" @click.native="loginOut">返回首页</el-button>
                <el-button type="primary" @click.native="goback">刷新重试</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'not-find',
    data(){
        return{
            count:20,
            name:''
        }
    },
    methods:{
        timer(){
            if (this.count > 0) {
                this.count --
            } else {
                this.loginOut()
            }
        },
        loginOut(){
            sessionStorage.clear();
            this.$router.push('/logins/login');
        },
        goback(){
            if (this.name && this.name == 'error') {
                this.$router.go(-1)
            } else {
                this.$router.go(-2)
            }    
        }
    },
    created(){
        this.name = this.$route.query.name
    },
    mounted(){
        this._cache_timeout_id_ = setInterval(this.timer,1000)
    },
    beforeDestroy(){
	 	window.clearInterval(this._cache_timeout_id_)
    }
}
</script>

<style scoped>
    #not-find{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('../../static/img/notfind.png') no-repeat center -70px;
        background-size: cover;
        background-color: #EEEDED;
        z-index: 999999;
    }
    .content{
        min-width: 180px;
        min-height: 180px;
        padding: 10px;
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translateX(-50%) translateY(-50%);
    }
    .content-tip{
        line-height: 100px;
        font-size: 30px;
        color: #4377EE;
    }
    .content-count{
        color: #AFAFAF;
    }
    .content-btn{
        margin-top: 40px;
    }
</style>