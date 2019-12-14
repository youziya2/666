<template>
  <div style="width:100%;">
    <div id="title">
      <img src="./../../../static/img/title.png">
    </div>
    <div id="content" :style="{backgroundColor:colorselects, height:windowHeight}">
      <span class="content-title">{{loginObj.tit01}}</span>
      <img src="./../../../static/img/back2.png" class="back2">
      <div class="login">
        <div class="login-title" :style="{color:colorselects}">{{loginObj.tit02}}</div>
        <div class="hint">USER lOGIN</div>
        <el-select
          v-model="value"
          @change="cutoverMachine"
          class="selec"
          prefix-icon="iconfont icon-iconfontyonghu"
        >
          <el-option
            v-for="item in machine"
            :key="item.pdename"
            :label=" lg == 'chinese' ? item.pdcname : item.pdename"
            :value="item.pdename"
          ></el-option>
        </el-select>
        <!-- 用户名 -->
        <p>
          <input type="text" class="user-input" v-model="name" :placeholder="loginObj.tit03"/>
        </p>
        <!-- 密码 -->
        <p style="height: 40px;margin-top: 20px;">
            <passwordTransformation @getPassword='formPassword' :initPawssword='initPawssword' :isSwitch='isSwitch'></passwordTransformation>
        </p>
        <!-- <p style="position: relative;">
          <input type="text" class="user-input" v-model="passwordHidden" :placeholder="loginObj.tit04" @keyup="handleKey"/>
          <i class="el-icon-view" @click='changeShowType'></i>
        </p> -->
        <!-- <el-input v-model="name" :placeholder="loginObj.tit03" prefix-icon="iconfont icon-iconfontyonghu"></el-input>
          <input v-model="password" type="text" :placeholder="loginObj.tit04" prefix-icon="iconfont icon-key" ref="passwordInput" @keyup="getKey"/> -->
        <div class="yzm">
          <el-input :placeholder="loginObj.tit05" v-model="iden"></el-input>
          <div class="code">
            <!-- <s-identify :identifyCode="identifyCode" :contentWidth="80" :contentHeight="38"></s-identify> -->
            <img :src="imgUrl" alt=" " :title = 'loginObj.tit05'>
          </div>
          <div class="changeiden"
            :style="{color:colorselects}"
            @click="refreshCode"
            onselectstart="return false"
          >{{loginObj.tit06}}</div>
        </div>
        <el-checkbox v-model="remenber">{{loginObj.tit07}}</el-checkbox>
        <el-button
          @click="login()"
          :style="{backgroundColor:colorselects,color:'#fff',border:'0px'}"
        >{{loginObj.tit08}}</el-button>
        <span class="password">{{loginObj.tit09}}？
          <router-link to="/logins/changePssword" :style="{color:colorselects}">{{ loginObj.tit10 }}</router-link>
        </span>
      </div>
    </div>
    <div class="affiliation">Copyright © 2004-2018 {{loginObj.tit11}}</div>
  </div>
</template>
<script>
import { login,getMune,getIp,getImgCode,getGoodsSelect } from "./../../api/https.js";
import { getRouters } from "./../../api/addRouter.js";
import { loginInit } from "@/init/login.js";
import { getSonobjByOnefield } from "./../../api/dtreeUtil.js";
import { testUser, testPwd, testPic } from "./../../api/methods.js";
import { Message } from 'element-ui';
import passwordTransformation from '@/components/Password';
export default {
  data() {
    return {
      test: '',
      isSwitch: true,//密码可见不可见模式切换按钮是否显示
      loginObj: {},
      machine: [],
      lg: localStorage.lgtype || "chinese",
      colorselects:localStorage.slecole ? localStorage.slecole : "#4377EE",
      value: "BHPanelMeeting",
      name: "",
      password: "",
      initPawssword: "",
      remenber: false,
      iden: "",
      windowHeight: '',
      imgUrl: ''
    };
  },
  components:{
    passwordTransformation
  },
  created() {
    sessionStorage.clear();
    loginInit(this);
    if(!localStorage.lgtype) getIp();
    this.imgUrl = getImgCode();
    this.getInfo();
    this.getGoodsSelect();
    window.addEventListener("resize", this.getHeight);
    this.getHeight()
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function(e) {  
      history.pushState(null, null, document.URL);
    });
  },
  mounted() {
    document.addEventListener('keydown', this.getKeyCode);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.getKeyCode); 
  },
  methods: {
    getHeight() {
      this.windowHeight = this.$config.getHeight(250);
    },
    // 获取子组件过来的值
    formPassword(data){
      this.password = data;
    },
    // 获取键盘值
    getKeyCode(e){
        if (e.keyCode == 13) {
          this.login();
        }
    },
    clearBoo(){
      this.boo = false;
    },
    getInfo(){
      // 获取本地用户名和密码
      var lsun = localStorage.getItem("userName");
      var lspwd = localStorage.getItem("pwd");
      if ( lsun && lspwd) {
        this.remenber = true;
        this.name = lsun;
        this.password = lspwd;
        this.initPawssword = lspwd;
        // this.passwordHidden = this.regFn(this.password);
      }
    },
    // 获取机型
    getGoodsSelect(response,boo){
      var obj = {
        sysid: response ? response.data.system.sysid : '',
        rlename: response ? response.data.role.rlename : '',
        userid: response ? response.data.userid : '',
        success : res => {  //res是server端响应
          if (res.data.message.indexOf("getSuccess") > -1) {
            this.machine = res.data.goodsSelect;
             // 判断上次选择的机型
            this.value = localStorage.machine || this.machine[0].pdename;
            localStorage.machine = this.value;
            if(boo) {
              this.getMune(response);
              this.value = this.machine[0].pdename;
              localStorage.machine = this.value;
            }
          }else{
            // '网络繁忙'
            this.$message.error(this.$buttonObj.busy);
          }
        }
      }
      getGoodsSelect(obj)
    },
    // 获取菜单权限
    getMune(response){
      var obj = {
        pwd: hex_md5(this.password),
        userid : response.data.userid,
        orgid : response.data.org.orgid,
        sysid : response.data.system.sysid,
        success : res => {  //res是server端响应
                  if (res.data.message.indexOf("getSuccess") > -1) {
                      var popedomList = res.data.popedomList
                      sessionStorage.setItem('popedomList',JSON.stringify(popedomList))
                      var menuList = getSonobjByOnefield(popedomList, "parentpdid", "pdmid", "pdename", this.value) 
                      sessionStorage.setItem('menuList',JSON.stringify(menuList))
                      getRouters(menuList);
                      sessionStorage.setItem("userid",response.data.userid);
                      sessionStorage.setItem("mrlename",response.data.role.rlename);
                      sessionStorage.setItem("rlcname",response.data.role.rlcname);
                      sessionStorage.setItem("orgid",response.data.org.orgid);
                      sessionStorage.setItem("sysid",response.data.system.sysid);
                      var companyObj = JSON.stringify(response.data.company) ,
                      orgObj = JSON.stringify(response.data.org) ,
                      systemObj = JSON.stringify(response.data.system) ,
                      userObj = JSON.stringify(response.data.user) ,
                      languageObj = response.data.language , obj = {} ;
                      for (const key in languageObj) {
                        obj[key.toLowerCase()] = languageObj[key]
                      }
                      sessionStorage.setItem("uuidtk", response.data.loginToken);
                      localStorage.setItem("languageObj", JSON.stringify(obj));
                      sessionStorage.setItem("companyObj", companyObj);
                      sessionStorage.setItem("orgObj", orgObj);
                      sessionStorage.setItem("systemObj", systemObj);
                      sessionStorage.setItem("userObj", userObj);
                      this.$router.push({ path: "/management" });
                  } else {
                    Message.error(this.$buttonObj.busy);
                  }
          },
      }
      getMune(obj)
    },
    // 点击进行登陆跳转
    login() {
      // 进行字段验证
      if (testUser(this.name ,this.loginObj.msg01, this.loginObj.msg07) && testPwd(this.password, this.loginObj.msg02, this.loginObj.msg08) && 
        testPic(this.iden ,this.loginObj.msg03, this.loginObj.msg09)) {
        var password = this.password, name = this.name;//获取本页面的用户名字段值
        this.password = '';
        var obj = {
          name: name,
          pwd : hex_md5(password),
          self : this,
          success : response => {
                    if (response.data.message.indexOf("loginSuccess") > -1) {
                      if(this.remenber){
                        localStorage.setItem("userName", name);
                        localStorage.setItem("pwd", password);
                      }else{
                        localStorage.removeItem('userName');
                        localStorage.removeItem('pwd');
                      }
                      this.getGoodsSelect(response,true);  
                    }
                    if(response.data.message.indexOf("msg06") > -1){
                      this.name = name;
                      this.password = password;
                      return Message.error(this.loginObj.msg06);
                    }
                    if(response.data.message.indexOf("msg05") > -1){
                      this.name = name;
                      this.password = password;
                      return Message.error(this.loginObj.msg05);
                    }
                    if(response.data.message.indexOf("msg04") > -1){
                      this.name = name;
                      this.password = password;
                      return Message.error(this.loginObj.msg04);
                    } 
                    if(response.data.message.indexOf("loginFail") > -1){
                      this.name = name;
                      this.password = password;
                      return Message.error(this.loginObj.msg10);
                    }
                  }
          
        }
          login(obj)
        }
        
    },
    // 切换机型
    cutoverMachine(type){
      localStorage.machine = type
      this.value = type
    },
    // 图文验证码
    refreshCode() {
      this.imgUrl = getImgCode();
    }
  },
};
</script>
<style scoped>
#title {
  margin-left: 360px;
  margin-top: 80px;
}
#title img {
  width: 345px;
  height: 45px;
}
#content {
  margin-top: 20px;
  width: 100%;
  min-width: 1600px;
  height: 700px;
  position: relative;
  background-size: 100% 700px;
}
.user-input{
    width: 95%;
    height: 40px;
    line-height: 40px;
    padding-left: 15px; 
    margin-top: 20px;
    background-color: #F8F8F8;
    border-radius: 4px;
    border: 1px solid #DCDFE6;   
}
.content-title {
  height: 54px;
  font-size: 24px;
  color: #ffffff;
  line-height: 90px;
  margin-left: 360px;
  display: block;
}
.back2 {
  width: 35%;
  float: left;
  margin-left: 337px;
}
.login {
  float: left;
  margin-left: 202px;
  padding: 40px 35px;
  background-color: #ffffff;
  margin-top: 84px;
}
.login-title {
  font-size: 20px;
}
.hint {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.selec,
.login .el-input {
  width: 100%;
  margin-top: 20px;
  display: block;
}
.login .el-input--suffix input {
  background: url("./../../../static/img/identity.png") 14px 8px no-repeat;
  background-size: 20px 22px;
}
.login .el-input__inner {
  background-color: #fff !important;
  padding-left: 50px;
}
.login .el-input__prefix {
  color: #818181;
}
.login .iconfont {
  font-size: 21px;
  padding-left: 10px;
}
.login .el-checkbox {
  margin-top: 20px;
  color: #999;
}
.login .el-button {
  display: block;
  width: 280px;
  font-size: 20px;
  margin-top: 20px;
  height: 40px;
  line-height: 14px;
}
.login .password {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
  display: block;
}
.login .password a {
  text-decoration: none;
}
.affiliation {
  margin-top: 60px;
  font-size: 10px;
  text-align: center;
  color: #666666;
  min-width: 1600px;
}
.yzm {
  width: 100%;
}
.yzm .el-input__inner {
  padding: 10px;
}
.yzm .el-input {
  width: 50%;
  display: inline-block;
}
.code {
  display: inline-block;
  width: 80px;
  height: 40px;
  vertical-align: middle;
  margin-left: 4%;
}
.code img{
    height: 100%;
    width: 100%;
}
.changeiden {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  vertical-align: middle;
  /* margin-left: 5%; */
}
</style>
