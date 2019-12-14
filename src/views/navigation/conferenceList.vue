<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :more="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
import { meetingInit } from '@/init/meeting'
export default {
  provide(){
      return{
          replaceroute:this.replaceroute
      }
  },
  data() {
    return {
      meetingObj: {},
      list: [
        {
          name: "新增会议",
          route: "/management/conferenceList/addconference",
          ico: "icon-add"
        },
        {
          name: "会议列表",
          route: "/management/conferenceList/conference",
          ico: "icon-liebiao"
        }
      ],
      more:[],
      self:''
    };
  },
  created(){
    meetingInit(this);
    this.list[0].name = this.meetingObj.tit01;
    this.list[1].name = this.meetingObj.tit02;
    if(sessionStorage.getItem('conferencelist') && sessionStorage.getItem('conferencelist').length){
      this.list = JSON.parse(sessionStorage.getItem('conferencelist'));
      this.list[0].name = this.meetingObj.tit01;
      this.list[1].name = this.meetingObj.tit02;
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
      // this.$route.path == this.list[index].route?this.self = this.list[index-1].route:'';
      // this.list.splice(index,1);
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
        sessionStorage.setItem('conferencelist',JSON.stringify(this.list));
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
    .el-message-box{
    background-color:black;
    width: 800px;
    height: 500px;
  }
  .el-dialog__headerbtn{
    position: absolute;
    top: 5px;
    right: 5px;
  }

   .el-dialog__header {
        padding: 30px 48px 0 !important;
    }
    .el-tag{
      cursor: default;
      margin-right: 5px;
      padding: 0 5px;
      height: 24px;
      line-height: 24px;
      color:#909399;
      background-color: #f0f2f5;
      border-color: transparent;
    }
    .el-tag .el-icon-close{
      color:#909399;
    }
    .el-tag .el-icon-close:hover{
      background-color: gray
    }
    .meeting-img{
      position: fixed;
      border: 1px solid gainsboro;
      background: lightyellow;
      top:80px;
      right: 50px;
      z-index: 9999;
      height:400px;
      min-width:200px;
    }
    .meeting-img-close{
      position: fixed;
      top: 81px;
      right: 51px; 
      z-index: 10000;
      color:rgb(161, 24, 24);
      background: rgb(196, 226, 134);
      font-size: 18px;cursor: pointer;
    }
</style>
