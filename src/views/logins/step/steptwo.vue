<template>
    <div>
        <div class="steps2" :style="{backgroundColor:colorselects,color:'#fff'}">
                <!-- 账号验证 -->
            <div>{{ $parent.modifyObj.msg03 }}</div>
            <!-- 输入新密码 -->
            <div>{{ $parent.modifyObj.msg20 }}</div>
        </div>
        <div class="stepform" style="margin-right:310px">
                <!-- 输入新密码 -->
            <div class="input-box">
                {{ $parent.modifyObj.msg20 }}
                <el-input
                    type='password'
                    v-model="newpassword">
                </el-input>
            </div>
            <!-- 再次输入 -->
            <div class="input-box">
                {{ $parent.modifyObj.msg21 }}
                <el-input
                    type='password'
                    v-model="sure">
                </el-input>
            </div>
            <div class="input-box">
                <div style="display: inline-block;width: 350px;text-align: left;">
                    <!-- 确定修改 -->
                    <el-button :style="{backgroundColor:colorselects,color:'#fff'}" class="suresubmit" @click="confirm()">{{ $parent.modifyObj.msg22 }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { editTuserPwd } from '@/api/https'
export default {
    data(){
        return{
            newpassword:"",
            sure:"",
            code: '', //验证码
            phone: ''
        }
    },
    created(){
        if(localStorage.getItem('slecole')){
            this.$parent.$router.options.routes[1].meta.colorselect = localStorage.getItem('slecole');
        }
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
        this.getInfo()
    },
    watch: {
        "loads":'getInfo'
    },
    methods:{
        // 确定修改
        confirm(){
            // 密码不能为空
            if (!this.newpassword) return this.$message.error( this.$parent.modifyObj.msg23 )
            // 两次密码不一致
            if (this.newpassword != this.sure) return this.$message.error( this.$parent.modifyObj.msg24 )
            var obj = {
                code: this.code,
                phone: this.phone,
                pwd: hex_md5(this.newpassword),
                success:res => {
                    if (res.data.message == "editSuccess") {
                        this.$router.push({ path: "/logins/changePssword/stepthree" });
                    } else {
                        this.$message.error( this.$parent.modifyObj.msg25 )
                    }
                }
            }
            editTuserPwd(obj);
        },
        // 获取验证码和手机号
        getInfo(){
            this.code = this.$route.params.myc;
            this.phone = this.$route.params.myp;
            if (!this.code || !this.phone) {
                this.$router.push({ path: "/logins/changePssword/stepone" });
            }
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
    .input-box{
        /* max-width: 495px;
        margin: 0px auto; */
        text-align: right;
        margin-top: 25px;
    }
    .input-box .el-input__inner{
        background-color: #fff;
    }
    .input-box .el-input{
        width: 350px;
        margin-left: 20px;
    }
    .input-box a{
        text-decoration: none;
        color: #4377EE;
        font-size: 14px;
        margin-right: 5px;
    }
    .suresubmit{
        margin-top: 20px;
        font-size: 16px;
    }
    .steps2{
        height: 40px;
        width: 100%;
        background: url('./../../../../static/img/smallbackground.png') no-repeat 174% 0px;
        background-size: 60% 100%;
        margin-bottom: 60px;
    }
    .steps2 div{
        width: 33%;
        float: left;
        text-align: center;
        height: 100%;
        line-height: 40px;
    }
</style>
