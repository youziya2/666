<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute='childroute' :more="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
import { appInit } from '@/init/app'
export default {
    provide(){
        return{
            replaceroute:this.replaceroute,
        }
    },
  data() {
    return {
        appInit: {},
        list: [
            {
            name: "",
            route: "/management/appList/appmanagement",
            ico: "icon-guanliweihu_huaban"
            },
            {
            name: "",
            route: "/management/appList/applists",
            ico: "icon-liebiao"
            }
        ],
        childroute:[],
        more:[],
        self:''
    };
  },
  created(){
    appInit(this);
    if(sessionStorage.getItem('applist') && sessionStorage.getItem('applist').length){
        this.list = JSON.parse(sessionStorage.getItem('applist'));
        this.list[0].name = this.appInit.tit01;
        this.list[1].name = this.appInit.tit03;
    }
  },
  methods:{
    // 在更多路由中点击，或新打开详情页时触发方法，
    addxiugai(cadd){
      if(this.list.find(e => e.name == cadd.name)){
        return false;
      }
      this.list.length >= 9 ?(this.morex(cadd),this.list.splice(2,0,cadd),this.morexiugai(this.list[this.list.length-1])):(this.list.splice(2,0,cadd));
    },
    morexiugai(cadd){
      if(this.more.find(e => e.name == cadd.name)){
        return false;
      }
      this.more.push(cadd);
      this.list.splice((this.list.length-1),1);
    },
    morex(cadd){//查看该页面是否存在更多路由中
      if(this.more.find(e => e.name == cadd.name)){
        this.more.splice(this.more.findIndex(e => e.name == cadd.name),1)
        return false;
      }
    },
    deletxiugai(pas){
      this.list.forEach((e,index) => {
        e.route == pas?this.list.splice(index,1) :'';
      });
    },
    cindex(index){//点击路由关闭图标的事件
        this.self = closeIcon(index,this.list)
    },
    clearmore(){//清除更多路由数组
      this.more.length = 0;
    },
    replaceroute(oldrouter,newrouter){
      this.list.forEach(e => {
        e.route == oldrouter? e.route = newrouter:'';
      })
    }
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  watch:{
    list:{
      deep:true,
      handler:function(n,o){
        if(n.length < 9 && this.more.length){
          this.list.push(this.more[0]);
          this.more.splice(0,1);
        };
        sessionStorage.setItem('applist',JSON.stringify(this.list));
        sessionStorage.setItem('appmore',JSON.stringify(this.more));
      }     
    },
    self:{
      deep:true,
      handler:function(n){
        this.$router.push(n);
        this.self = '';
      }
    }
  }
};
</script>

<style>
    /* 应用列表样式开始 */
    .list-content{
        padding: 40px 50px;
        padding-bottom: 0px;
        background-color: #fff;
        position: relative;
    }
    /* 切换列表器样式 */
    .switcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 120px;
        right: 50px;
    }
    .switcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .switcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .s-left{
        border-right: 1px solid #F1F4F6;
    }
    .search,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .search>div{
        width: 400px;
        margin-left: 40px;
    }
    .search>div .el-input__inner{
        height: 40px;
    }
    .search .el-input-group__append{
        width: 19px;
        /* left: 20px; */
    }
    .search .el-input-group__append button{
        height: 40px;
        padding-top: 9px;
    }
    .search .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .search ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    .filtrate{
        margin-top: 25px;
        margin-bottom: 20px;
    }
    .filtrate .filtrateName{
        width: 860px;
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        color: #666666;
        margin-left: 38px;
    }
    .filtrateName div{
        padding: 4px 20px;
        margin: 4px 0;
        border-radius:5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0);
    }
    .filtrateName div:hover{
        cursor:pointer;
    }
    .app-productListbox .el-col{
        margin-bottom: 15px;
    }
    .app-productLists{
        text-align: center;
        width: 89%;
        padding: 10px;
        /* padding-bottom: 5px; */
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor: pointer;
        position: relative;
        height: 235px;
    }
    .app-productLists:hover{
        background-color: #F1F4F6;
    }
    .app-productLists>.fffback{
        width: 77%;
        /* height: 140px; */
        padding: 20px;
        padding-bottom: 0px;
    }
    .app-productLists .el-checkbox{
        position: absolute;
        right: 10px;
        top: 20px;
    }
    .app-productLists img{
        width: 70%;
        margin-bottom: 5px;
    }
    .list-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .listCheck{
        margin-top: 66px;
        width: 15px;
        height: 20px;
    }
    .el-checkbox span>span{
        border: 1px solid #999;
    }
    /* 分页小div增加边框 */
    .el-pager li:not(.active){
        border: 1px solid #CCCCCC;
    }
    .el-pager li.active+li{
        border-left:1px solid #ccc;
    }
    /* 列表类型样式 */
    .app-productTypeTwo{
        width: 100%;
        overflow: hidden;
    }
    .applist:not(.ischeck):hover{
        background-color: #F1F4F6;
    }
    .appimg{
        width: 16.5%;
        float: left;
        margin-left: 9%;
    }
    .appimg>img{
        width: 100%;
    }
    .appdetails{
        float: left;
        margin-left: 5.5%;
        width: 65%;
    }
    .applist>.el-checkbox{
        position: absolute;
        left: 5%;
        top: 44%;
    }
    .appdetails .appdetailstitle{
        font-size: 20px;
        color: #333;
        margin-bottom: 25px;
        line-height: 20px;
        font-weight: 700;
    }
    .appdetails>div:not(.appdetailstitle){
        font-size: 14px;
        color: #666;
        display: inline-block;
        width: 60%;
        margin-bottom: 7px;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    /* 列表选定样式 */
    .ischeck{
        background-color: #E4E4E4;
    }
    /* 应用列表样式结束 */
    /* 上传样式开始 */
    .app-content{
        padding: 50px;
        padding-bottom: 0px;
        background-color: #fff;
    }
    .app-title{
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
        font-weight: 700;
    }
    .app-input{
        padding-left: 40px;
        overflow: hidden;
    }
    /* 输入框宽度 */
    .app-input .el-input:not(.el-input--suffix),.demo-input-suffix .el-select{
        margin-left: 15px;
        width: 35%;
    }
    /* 输入框高度 */
    .app-input .el-input .el-input__inner{
        height: 36px;
    }
    .app-input>div{
        overflow: hidden;
        width: 100%;
        padding-bottom: 25px;
    }
    .app-input>div>.demo-input-suffix{
        float: left;
        width: 50%;
        position: relative;
        margin-bottom: 40px;
    }
    .app-input>div>.demo-input-suffix .el-button{
        margin-left: 2%;
        padding: 10px 2%;
    }
    /* .app-input>div .demo-input-suffix>span{
        display: inline-block;
        width: 18%;
        text-align: right
    } */
    .app-input>div .theme-right{
        margin-left: 15%;
    }
    /* .app-input>.demo-input-suffix>span{
        display: inline-block;
        width: 6.5%;
        text-align: right;
        vertical-align: top;
    } */
    .app-input>.demo-input-suffix>.el-textarea{
        width: 69.5%;
        /* margin-left: 13px; */
    }
    .theme-minititle{
        font-size: 12px;
        color: #999;
        position: absolute;
        bottom: -20px;
        left: 25%;
    }
    /* 上传样式结束 */
    .app-uploadclass{
        /* width: 13.2% !important; */
        display: inline-block;
    }
    .app-uploadshuoming{
        width: 148px;
        text-align: center;
        margin-top: 10px;
        color: #666;
        font-size: 14px;
        line-height: 14px;
    }
    /* 下载删除图标样式 */
    .app-caozuo{
        width: 100%;
        overflow: hidden;
        margin-top: 20px;
    }
    .app-delet{
        float: left;
        padding-left: 8px; 
    }
    .app-download{
        float: right;
        padding-right: 8px; 
    }
    .app-delet,.app-download{
        width: 20%;
    }
</style>