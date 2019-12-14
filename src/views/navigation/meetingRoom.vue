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
          name: "添加会议室",
          route: "/management/meetingRoom/addRoom",
          ico: "icon-add"
        },
        {
          name: "会议室列表",
          route: "/management/meetingRoom/roomList",
          ico: "icon-liebiao"
        }
      ],
      more:[],
      self:''
    };
  },
  created(){
    if(sessionStorage.getItem('meetingRoom') && sessionStorage.getItem('meetingRoom').length){
      this.list = JSON.parse(sessionStorage.getItem('meetingRoom'));
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
        sessionStorage.setItem('meetingRoom',JSON.stringify(this.list));
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
.el-dialog__wrapper .el-dialog{
      width: 55%;
      /* min-width: 840px; */
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
</style>
