<template>
  <div class="desktop">
    <the-head :list="list" :backcolor='colorselects' :childroute='childroute'></the-head>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { desktopInit } from '@/init/desktop'
export default {
  data() {
    return {
      desktop: {},
      list: [
        {
          name: "开机动画管理",
          route: "/management/desktopList/animationList",
          ico: "icon-dianying_"
        },
        {
          name: "主题管理",
          route: "/management/desktopList/themeList",
          ico: "icon-iconfonttheme"
        },
        {
          name: "字体管理",
          route: "/management/desktopList/fontList",
          ico: "icon-woff2"
        }
      ],
      childroute:[]
    };
  },
  created(){
    desktopInit(this);
    this.list[0].name = this.desktop.tit01;
    this.list[1].name = this.desktop.tit05;
    this.list[2].name = this.desktop.tit13;
    this.jcroute();
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods:{
    jcroute(){
      if(this.$route.meta.name == '/management/desktopList/themeList'){
        this.childroute = [
          // 主题
          {
            name: this.desktop.tit06,
            route: "/management/desktopList/themeList/themeListupload",
            ico: "icon-shangchuanwenjian-"
          },
          {
            name: this.desktop.tit07,
            route: "/management/desktopList/themeList/themeList",
            ico: "icon-liebiao"
          }
        ]
      }else if(this.$route.meta.name == '/management/desktopList/fontList'){
        this.childroute = [
          // 字体
          {
            name: this.desktop.tit14,
            route: "/management/desktopList/fontList/fontListupload",
            ico: "icon-shangchuanwenjian-"
          },
          {
            name: this.desktop.tit15,
            route: "/management/desktopList/fontList/fontList",
            ico: "icon-liebiao"
          }
        ]
      }else if(this.$route.meta.name == '/management/desktopList/animationList'){
        this.childroute = [
          // 动画
          {
            name: this.desktop.tit02,
            route: "/management/desktopList/animationList/animationListupload",
            ico: "icon-shangchuanwenjian-"
          },
          {
            name: this.desktop.tit04,
            route: "/management/desktopList/animationList/animationList",
            ico: "icon-liebiao"
          }
        ]
      }
    }
  },
  watch:{
    "$route":function(){
      this.jcroute();
    }
  }
};
</script>

<style>
    /* 上传样式开始 */
    .theme-content{
        padding: 50px;
        padding-bottom: 0px;
        background-color: #fff;
    }
    .theme-title{
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
        font-weight: 700;
    }
    .theme-input{
        padding-left: 40px;
        overflow: hidden;
    }
    /* 输入框宽度 */
    .theme-input .el-input:not(.el-input--suffix),.demo-input-suffix .el-select{
        margin-left: 15px;
        width: 35%;
    }
    /* 输入框高度 */
    .theme-input .el-input .el-input__inner{
        height: 36px;
    }
    .theme-input>div>.demo-input-suffix{
        float: left;
        width: 50%;
        position: relative;
        margin-bottom: 40px;
    }
    .theme-input>div>.demo-input-suffix .el-button{
        margin-left: 2%;
        padding: 10px 2%;
    }
    .theme-input>div .demo-input-suffix>span{
        display: inline-block;
        width: 18%;
        /* text-align: left; */
    }
    .theme-input>.demo-input-suffix>span{
        display: inline-block;
        width: 10%;
        /* text-align: right; */
        vertical-align: top;
    }
    .theme-minititle{
        font-size: 12px;
        color: #999;
        position: absolute;
        bottom: -20px;
        left: 25%;
    }
    /* 上传样式结束 */
    /* 列表样式开始 */
    .theme-filtrate{
      color: #333;
      font-weight: 700;
      font-size: 20px;
    }
    .theme-filtrate .filtrateName{
        display: inline-block;
        font-size: 16px;
        color: #666666;
        margin: 0 0 40px 40px;
    }
    .theme-filtrate .filtrateName div{
        margin-right: 40px;
        padding: 8px 19px;
        border-radius:5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0);
        cursor: pointer;
    }
    .theme-fenge{
      width: 100%;
      height: 1px;
      background-color: #CCCCCC;
      margin-top: 30px;
      margin-bottom: 40px;
    }
    .themeLists img{
      width: 100%;
      margin-bottom: 7px;
    }
    .font-fffback .themeLists img{
      width: 100%;
      margin-bottom: 15px;
    }
    .themeLists{
      text-align: center;
      color: #666;
      width: 86%;
      padding: 10px;
      cursor: pointer;
    }
    .theme-content .el-row{
      margin-bottom: 0px;
    }
    .theme-content .themepage{
      text-align: center;
      margin-bottom: 40px;
      margin-top: 30px;
    }
    /* 删除按钮样式 */
    .theme-delet{
      position: absolute;
      bottom: -65px;
      left: 65px;
      width: 100px;
      height: 36px;
      line-height: 10px;
      background-color: red;
      z-index: 999;
    }
    /* 背景样式 */
    .theme-fffback{
      width: 94.5%;
      padding: 10px;
      position: relative;
    }
    .theme-fffback:hover{
      background-color: #F1F4F6;
    }
    .theme-fffback.active{
      background-color: #E4E4E4;
    }
    .theme-fffback .el-checkbox{
      position: absolute;
      right: 10px;
      top: 10px;
    }
    /* 字体界面背景颜色 */
    .font-fffback{
      width: 94.5%;
      padding: 10px;
      position: relative;
    }
    .font-fffback:hover{
      background-color: #F1F4F6;
    }
    .font-fffback.active{
      background-color: #E4E4E4;
    }
    .font-fffback>.el-checkbox{
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .el-upload-list{
      display: none;
    }
    .theme-uploadshuoming{
      width: 148px;
      text-align: center;
      margin-top: 10px;
      color: #666;
      font-size: 14px;
      line-height: 14px;
    }
    .desktopListImg{
      width: 19% !important;
      margin: 0px 1% 1% 0px;
    }
</style>