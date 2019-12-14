<template>
  <div class="flex">
    <div class="left" :style="'background-color:'+colorselects">
      <div class="ident" :style="'width:'+siz">
        <span v-show="!isCollapse" style="margin-top:20px;display:inline-block;">{{mach}}</span>
        <div class="v1" :class="isCollapse?'v2':''">v1.0</div>
      </div>
      <div class="size" :style="'width:'+siz">
        <a href="javascript:;" @click="kzsize()">
          <i class="iconfont" :class="isCollapse?'icon-214':'icon-suoxiao'"></i>
        </a>
      </div>
      <div class="admin" :style="'width:'+siz">
        <img src="./../../static/img/admin.png" :class="isCollapse?'adminImg':''">
        <div class="adminName" v-show="!isCollapse">
          <div>{{userName}}</div>
          <div>{{userRole}}</div>
          <div id="tabs" style="margin-top:10px;width:170px;padding:0px 15px;overflow:hidden;">
            <el-popover
              placement="bottom"
              width="240"
              v-model="qiehuan"
              popper-class="qiehuan"
              :visible-arrow="false"
            >
              <div class="qhuser"  v-for="(item,index) in machine" @click="cutover(item.pdename,index)" :key="index">
                {{ lg == 'chinese' ?  item.pdcname : item.pdename}}</div>
              <div class="adminBack" slot="reference">
                <img src="./../../static/img/switch.png">{{ management.tit02 }}
              </div>
            </el-popover>
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="management.tit04"
            >
              <div class="adminBack" @click="loginOut" slot="reference" style='float:right'>
                <img src="./../../static/img/exit.png">{{ management.tit03 }}
              </div>
            </el-popover>
            
          </div>
        </div>
      </div>
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#fff"
        :background-color="colorselects"
        @select="getIt"
        active-text-color="#fff"
        :collapse-transition="false"
      >
        <!-- <span class="router-lists-hidden" v-if='topArr.length > 0' @click='showLists(topArr)'>
            <i class="iconfont icon-DBArrow_D"></i>
        </span> -->
        <span :class="{'router-link-handle' : nm == clickNum}" v-for="item,nm in routerArr" :key="nm" @click='goRouter(item.path,nm)' @mouseenter="getHidden(nm)">
          <el-menu-item :index="nm+1+''" :style = " lg == 'chinese' ? 'padding: 0px 0px 0px 22px' : 'padding: 0px 0px 0px 10px' " v-if="item.isHidden">
            <i :class="item.icon"></i>
            <!-- <span>{{nm < 0}}</span> -->
            <span slot="title" style="display: inline-block;width: 140px;text-align:left;" :style=" lg == 'chinese' ? 'margin-left: 18px' : 'margin-left: 5px'">
              {{item.title}}</span>
          </el-menu-item>
        </span>
        <!-- <span class="router-lists-hidden" v-if='bottomArr.length > 0' @click='showLists(bottomArr)'>
            <i class="iconfont icon-DBArrow_U"></i>
        </span> -->
      </el-menu>
    </div>
    <div class="right" :style="{'margin-left':marginLeft+'px'}">
      <el-popover
        placement="bottom"
        width="150"
        class="skinPeelerlg"
        v-model="lgqiehuan"
        popper-class="skinPeelerslg"
      >
        <div class="colorselect" @click="lgqh('chinese')">{{ lgObj.chinese }}</div>
        <div class="colorselect" @click="lgqh('english')">{{ lgObj.english }}</div>
        <span slot="reference">{{ lgObj[lg] }}</span>
      </el-popover>
      <el-popover
        placement="bottom"
        width="240"
        class="skinPeeler"
        v-model="skinPeeler"
        popper-class="skinPeelers"
      >
        <div class="colorselect" style="background-color: #4377EE" @click="selcol('#4377EE')"></div>
        <div class="colorselect" style="background-color: #754D91" @click="selcol('#754D91')"></div>
        <div class="colorselect" style="background-color: #E04B33" @click="selcol('#E04B33')"></div>
        <div class="colorselect" style="background-color: #0EC929" @click="selcol('#0EC929')"></div>
        <div class="pickcolor">
          <el-color-picker v-model="livecolor"></el-color-picker>
        </div>
        <img src="./../../static/img/skinPeeler.png" slot="reference">
      </el-popover>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { loginOut,language,getGoodsSelect } from "../api/https";
import { getRouters } from "./../api/addRouter.js";
import { managementInit } from "@/init/public.js";
import { getSonobjByOnefield } from "./../api/dtreeUtil.js";
import fetch from "@/api/axios.js";
export default {
  inject: ["onload"],
  data() {
    return {
      siz: "200px",
      clickNum: 0,//记录点击的位置
      isTop: false,
      isBottom: true,
      isCollapse: false,
      marginLeft: 200,
      skinPeeler: false,
      colorselect: [],
      qiehuan: false,
      lgqiehuan: false,
      lgObj: {
        chinese: '中文', 
        english : 'English'
      },
      lg: '',
      livecolor: "",
      centerDialogVisible: false,
      mach:'',//机子类型
      // 用户名称
      userName:'',
      userRole: '',
      machine: [],
      management:{},
      routerArr:[]
    };
  },
  created() {
    managementInit(this)
    if (localStorage.getItem("slecole")) {
      this.$route.matched[0].meta.colorselect = localStorage.getItem("slecole");
    }
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
    this.getGoodsSelect();
    this.getRouterList();
  },
  mounted() {
    window.onresize = ()=>{ // 定义窗口大小变更通知事件
      this.showLast = this.getLists();
      for (let index = 0; index < this.routerArr.length; index++) {
        this.routerArr[index].isHidden = true;
      }
      this.isBottom = true;
    };
  },
  beforeDestroy(){
    sessionStorage.handlerResh = 'handler'//与main.js中手动刷新区别开来
    location.reload()
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    },
  },
  watch: {
    livecolor: {
      handler(n) {
        n != null && n != undefined ? this.selcol(n) : "";
      }
    },
     // 如果路由有变化，会再次执行该方法
    "$route": "loadsx"
  },
  methods: {
    loadsx(){
      var str = this.$route.query.selectStr;
      if (str) {
        // 遍历找出路由的数组下标
        for (let index = 0; index < this.routerArr.length; index++) {
          if (this.routerArr[index].path.indexOf(str) > -1) return this.clickNum = index;
        }
      }
    },
    // 确定左边列表的可视高度,height为列表上方的高度
    getHeight(height){
      return window.innerHeight-height;
    },
    // 左边列表的可视高度内可显示的行数,48为列表的行高
    getLists(){
      var innerHeight = this.getHeight(260), num;
      num = (innerHeight/48).toFixed(0);
      return num;
    },
    //鼠标悬浮可视窗口的最后或者最前面一个选项
    getHidden(hoverNum){
      // 获取记录数
      this.showLast = this.getLists();
      //plus是底下看不到的记录数
      var startNum = 0, endNum = this.routerArr.length, plus = this.routerArr.length - this.showLast, topBoo, bottomBoo;
      // 底下悬浮生效
      bottomBoo = hoverNum == this.showLast-1  && this.isBottom;
      // 顶上悬浮生效
      topBoo =  hoverNum == plus && this.isTop;
      if (bottomBoo || topBoo) {
        if (hoverNum == this.showLast - 1) {
          // 当前隐藏的是上半部分
          startNum = plus;
          this.isTop = true;
          this.isBottom = false;
        } else {
          endNum = this.showLast;
          this.isTop = false;
          this.isBottom = true;
        }
        for (let index = 0; index < this.routerArr.length; index++) {
          if ( index > startNum-1 && index < endNum) {
            this.routerArr[index].isHidden = true;
          } else {
            this.routerArr[index].isHidden = false;
          } 
        }
      }
    },
    getIt(){
      sessionStorage.setItem('_firstNvb_remove','yes')
    },
    kzsize() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.siz = "64px";
        this.marginLeft = 64;
      } else {
        this.siz = "200px";
        this.marginLeft = 200;
      }
    },
    // 获取路由列表
    getRouterList(){
      var routerArr = JSON.parse(sessionStorage.arrRouter);
      this.getLage(routerArr);
    },
    // 判断当前位于哪一个路由
    getLage(list){
      var url = location.href.split("#")[1], obj = {}, showList;
      this.routerArr = [];
      showList = this.getLists()
      for (let index = 0; index < list.length; index++) {
        list[index].isHidden = true;
        obj = list[index];
        this.routerArr.push(obj);
        if(url.indexOf(list[index].path) > -1) this.clickNum = index;
      }
    },
    //路由跳转
    goRouter(path,num){
      if(this.clickNum == num) return false;
      this.clickNum = num;
      this.$router.push(path);
    },
    // 获取机型列表
    getGoodsSelect(){
      var obj = {
        sysid: sessionStorage.sysid,
        rlename: sessionStorage.mrlename,
        userid: sessionStorage.userid,
        success : res => {  //res是server端响应
          if (res.data.message.indexOf("getSuccess") > -1) {
            this.machine = res.data.goodsSelect;
            this.getInfo();
          }else{
            // '网络繁忙'
            this.$message.error(this.$buttonObj.busy);
          }
        }
      }
      getGoodsSelect(obj)
    },
    // 获取机型和用户名
    getInfo(){
      // 获取语言
      this.lg = localStorage.lgtype || 'chinese'
      this.userRole = sessionStorage.rlcname;
      // 获取机型
      for (let index = 0; index < this.machine.length; index++) {
        if (this.machine[index].pdename ==  localStorage.machine) {
          this.mach = this.lg == 'chinese'? this.machine[index].pdcname : this.machine[index].pdename;
        }
      }
      var userName = JSON.parse(sessionStorage.userObj).username
      this.userName = userName || 'admin'
    },
    // 类型切换
    cutover(type){
      if(localStorage.machine == type) return
      this.qiehuan = false
      var popedomList = JSON.parse(sessionStorage.getItem('popedomList')), menuList = getSonobjByOnefield(popedomList, "parentpdid", "pdmid", "pdename", type);
      if (this.decideMachine(menuList)) return this.$message.error('该机型暂未激活!')
      localStorage.machine = type;
      sessionStorage.setItem('menuList',JSON.stringify(menuList))
      sessionStorage.handlerResh = 'handler'//与main.js中手动刷新区别开来
      getRouters(menuList)
      location.href = this.decideRouter()
      window.location.reload();
      sessionStorage.removeItem('handlerResh')
    },
    // 判断机型是否激活
    decideMachine(arr){
      var boo = true
      for (let index = 0; index < arr.length; index++) {
        if(arr[index].intourl) return boo = false
      }
      return boo
    },
    // 判断路由的跳转
    decideRouter(){
      var machine = localStorage.machine , str = '404', baseURL = fetch.baseURL , url =  location.href.split("#")[0]; 
      if ( fetch.isLoachost > -1 ) baseURL = url;
      switch (machine) {
        case 'BHPanelMeeting':
          str = '/management/productList'
          break;
        
        case 'BHMainboard':
          str = '/management/motherboardNorm'
          break;

        default:
          break;
      }
      return baseURL + '#' + str
    },
    // 退出登陆
    loginOut() {
      var obj = {
        success : response => {
          if (response.data.message.indexOf("logoutSuccess") > -1) {
            // sessionStorage.handlerResh = 'handler'//与main.js中手动刷新区别开来
            // location.reload()
            sessionStorage.clear();
            this.$router.push({ path: "/logins" });
          }
          if (response.data.message.indexOf("logoutFail") > -1) {
            // '网络繁忙'
            this.$message.error(this.$buttonObj.busy);
          }
        }
      }
      loginOut(obj)
      // this.$router.push({ path: "/logins" });
    },
    // 颜色切换
    selcol(col) {
      this.skinPeeler = false;
      this.$route.matched[0].meta.colorselect = col;
      localStorage.setItem("slecole", col);
      this.onload();
    },
    //语言切换方法
    lgqh(lg) {
      if(this.lg == lg) return false;
      this.lg = lg;
      localStorage.lgtype = lg;
      this.lgqiehuan = false;
      language();
    }
  }
};
</script>

<style>
  .router-lists-hidden{
    display: inline-block;
    width: 200px;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
    color: white;
  }
  .el-menu-vertical-demo .iconfont {
    font-size: 16px !important;
}
.router-lists-hidden:hover{
  background: rgba(255, 255, 255, 0.4);
}
a {
  text-decoration: none;
}
.v1 {
  font-size: 10px;
  padding-top: 10px;
  display: inline-block;
}
.v2 {
  text-align: center;
  font-size: 16px;
}
.flex {
  display: flex;
}
#tabs .el-popover {
  background: #f1a9a9 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 600px; */
}
.router-link-handle .el-menu-item {
  background-color: rgba(255, 255, 255, 0.4) !important;
  border-left: solid 10px #fff;
}
.el-menu-item {
  border-left: solid 10px rgba(255, 255, 255, 0);
  color: #fff !important;
}
.el-menu {
  border: 0px;
}
.el-menu-item i {
  color: #fff;
}
.el-menu-item,
.el-submenu__title {
  height: 48px;
  line-height: 48px;
}
.el-menu-vertical-demo .iconfont {
  font-size: 20px;
  /* width: 50px;
  text-align: left;
  display: inline-block; */
}
.left {
  height: 1080px;
  flex-grow: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}
.right {
  flex-grow: 1;
  min-width: 1280px;
  position: relative;
}
.ident {
  height: 60px;
  font-size: 16px;
  color: #fff;
  text-align: center;
}
.size {
  height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  line-height: 30px;
  text-align: right;
}
.size .iconfont {
  font-size: 20px;
  margin-right: 20px;
  color: #fff;
}
.admin {
  height: 170px;
}
.admin > img {
  display: block;
  margin: 0px auto;
  margin-top: 10px;
  width: 90px;
  height: 85px;
}
.adminName {
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}
.adminBack {
  float: left;
  font-size: 14px;
  text-align: left;
}
.adminBack img {
  width: 14px;
  height: 14px;
  float: left;
  margin:3px 5px 0 0;
}
.admin .adminImg {
  width: 45px;
  height: 45px;
}
.adminBack:hover {
  cursor: pointer;
}
/* 换肤图标样式 */
.skinPeeler {
  width: 24px;
  height: 20px;
  position: absolute;
  z-index: 9999;
  top: 20px;
  right: 10px;
}
.skinPeeler img {
  width: 100%;
  height: 100%;
}
.skinPeeler:hover {
  cursor: pointer;
}
.skinPeelers {
  z-index: 99999999 !important;
  display: flex;
  justify-content: space-between;
}
.colorselect {
  width: 32px;
  height: 32px;
}
.colorselect:hover {
  cursor: pointer;
}
.qiehuan {
  border: 1px solid #cccccc;
  border-bottom: 0px;
  background-color: #ffffff;
  padding: 0px;
  max-width: 200px;
  border-radius: 0px;
}
.qiehuan .qhuser {
  width: 160px;
  height: 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #cccccc;
  line-height: 20px;
  font-size: #ccc;
  cursor: pointer;
}
.qiehuan .qhuser:hover {
  background-color: #cccccc;
}
/* 切换中英文样式 */
.skinPeelerlg {
  height: 20px;
  position: absolute;
  z-index: 9999;
  top: 20px;
  right: 60px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.skinPeelerslg {
  z-index: 999999 !important;
  text-align: center;
  padding: 0px;
  min-width: 50px !important;
  width: 50px !important;
}
.skinPeelerslg .colorselect {
  border-bottom: 1px solid #e4e4e4;
  width: 100%;
  line-height: 32px;
}
/* 颜色选择器样式 */
.pickcolor > div > div {
  height: 34px;
  width: 34px;
  background: url("./../../static/img/color.png") no-repeat 0px 0px;
  background-size: 32px;
  border: 0px;
  border-radius: 0px;
}
.pickcolor > div > div > span {
  display: none;
}
.el-color-dropdown.el-color-picker__panel {
  z-index: 99999999 !important;
}
/* 录入产品页面颜色选择器样式 */
.mycolor > div > div {
  margin-top: 4px;
  background: url("./../../static/img/selectColor.png") no-repeat 0px 0px;
  background-size: 32px;
  border: 0px;
  border-radius: 0px;
}
.mycolor > div > div > span {
    display: none;
}
.structure-content .el-table--scrollable-x .el-table__body-wrapper {
  min-height: 530px;
}
.structure-content .el-main{
        padding-top: 0px;
    }
    .el-table::before{
      height: 0;
    }
    .add-user thead{
        display: none;
    }

</style>
