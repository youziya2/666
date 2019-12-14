<template>
  <div>
    <div class="steps" :style="{backgroundColor:colorselects,color:'#fff'}">
        <!-- 账号验证 -->
      <div>{{ $parent.modifyObj.msg03 }}</div>
    </div>
    <div class="stepform" style="margin-right:310px">
        <!-- 输入用户名 -->
      <div class="input-box">{{ $parent.modifyObj.msg08 }}
        <el-input v-model="passname"></el-input>
      </div>
      <!-- 输入绑定手机号 -->
      <div class="input-box">{{ $parent.modifyObj.msg09 }}
        <el-input v-model="number"></el-input>
      </div>
      <!-- 输入验证码 -->
      <div class="input-box box-three" style="position: relative">{{ $parent.modifyObj.msg10 }}
        <el-input v-model="verificationCode"></el-input>
        <div style="position: absolute;right: 5px;top: 8px;">
            <template v-if='isGo'>
                <a style="cursor: pointer" :style="{color:colorselects}" @click='getCode'>{{getcode[num]}}</a>
              </template>
              <template v-else>
                <span>
                  {{count}} S
                </span>
              </template>
        </div>
      </div>
    </div>
    <!-- 提交 -->
    <el-button :style="{backgroundColor:colorselects,color:'#fff'}" class="submit" @click="submits()">{{ $parent.modifyObj.msg11 }}</el-button>
  </div>
</template>
<script>
  import { getMobilecode,checkMobilecode } from '@/api/https' 
export default {
  data() {
    return {
      passname: "",
      number: "",
      verificationCode: "",
      count: '',
      second: 120,
      isGo: true,
      countMinite: null,
      getcode: [
        this.$parent.modifyObj.msg12,//获取验证码
        this.$parent.modifyObj.msg13//重新获取
      ],
      num: 0
    };
  },
  created(){
      if(localStorage.getItem('slecole')){
          this.$parent.$router.options.routes[1].meta.colorselect = localStorage.getItem('slecole');
      }
      history.pushState(null, null, document.URL);
      console.log(this.$parent.modifyObj)
      window.addEventListener('popstate', function () {
          history.pushState(null, null, document.URL);
      });
  },
  beforeDestroy() {
    clearInterval(this.countMinite);
  },
  methods:{
    // 读秒
    timer(){
      if(this.count > 0) this.count--;
      else {
        clearInterval(this.countMinite)
        this.isGo = true;
        this.num = 1;
      }
    },
    // 发送短信
    getMobilecode(){
      var obj = {
        mobile: this.number,
        success:res => {
          if (res.data.message == "sendSuccess") {
            this.$message.success(this.$parent.modifyObj.msg14)//短信发送成功
          } else {
            this.$message.error(this.$parent.modifyObj.msg15)//短信发送失败
          }
          clearInterval(this.countMinite);
          this.isGo = true;
          this.num = 1;
        }
      }
      getMobilecode(obj);
    },
    // 点击获取验证码
    getCode(){
      if (!this.number) return this.$message.error(this.$parent.modifyObj.msg16);//手机号码不能为空
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if(!reg.test(this.number)) return this.$message.error(this.$parent.modifyObj.msg17);//手机号码不正确
      this.count = this.second;
      this.countMinite = setInterval(this.timer,1000);
      this.isGo = false;
      this.getMobilecode();
    },
    // 提交
    submits(){
      if (!this.number) return this.$message.error(this.$parent.modifyObj.msg16);//手机号码不能为空
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if(!reg.test(this.number)) return this.$message.error(this.$parent.modifyObj.msg17);//手机号码不正确
      if (!this.verificationCode) return this.$message.error(this.$parent.modifyObj.msg18);//验证码不能为空
      var obj = {
        mobile: this.number,
        mobilecode: this.verificationCode,
        success:res => {
          if (res.data.message == "checkSuccess") {
            this.$router.push({ name: "steptwo" , params:{myc: this.verificationCode, myp: this.number}});
          } else {
            this.$message.error(this.$parent.modifyObj.msg19)//提交失败,请稍后再试
          }
        }
      }
      checkMobilecode(obj);
      
    },
  },
  computed:{
    colorselects(){
        return this.$parent.$router.options.routes[1].meta.colorselect;
      }
    }
};
</script>
<style scoped>
.input-box {
  /* max-width: 495px;
  margin: 0px auto; */
  text-align: right;
  margin-top: 25px;
}
.input-box .el-input__inner {
  background-color: #fff;
}
.input-box .el-input {
  width: 350px;
  margin-left: 20px;
}
.input-box a {
  text-decoration: none;
  font-size: 14px;
  margin-right: 5px;
}
.submit {
  background-color: #4377ee;
  width: 120px;
  margin: 0px auto;
  display: block;
  margin-top: 40px;
  font-size: 16px;
  height: 38px;
  line-height: 12px;
}
.steps div{
  width: 33%;
  text-align: center;
  height: 100%;
  line-height: 40px;
}
.steps{
  background: url('./../../../../static/img/bigbackground.png') no-repeat 100% 0px;
  background-size: 66% 100%;
  margin-bottom: 60px;
  height: 40px;
  width: 100%;
}
</style>
