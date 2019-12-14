<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute="childroute" :childmore="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
import { systemPublc } from "@/init/system"
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      systemObj: {},
      list: [
        {
          name: "版本管理",
          route: "/management/systemVersion/Custom",
          ico: "icon-bbdz"
        }
      ],
      childroute:[
      ],
      NUser:[
        {
          name: "新增版本",
          route: "/management/systemVersion/custom/VersionAdd",
          ico: "icon-add"
        },
        {
          name: "版本列表",
          route: "/management/systemVersion/custom/VersionList",
          ico: "icon-liebiao"
        }
      ],
      more:[],
      danqian:'',
      self:''
    };
  },
  created(){
    systemPublc(this);
    this.list[0].name = this.systemObj.tit01;
    this.jcroute();
  },
  methods:{
    jcroute(){
      this.NUser[0].name = this.systemObj.tit02;
      this.NUser[1].name = this.systemObj.tit03;
      if(this.$route.meta.name == '/management/systemVersion/Custom'){
        this.danqian = this.$route.meta.name;
        if(sessionStorage.getItem('versionlist') && JSON.parse(sessionStorage.getItem('versionlist')).length > 0){
          this.NUser = JSON.parse(sessionStorage.getItem('versionlist'));
          this.NUser[0].name = this.systemObj.tit02;
          this.NUser[1].name = this.systemObj.tit03;
        };
        this.childroute = this.NUser;
      }else{
        this.danqian = this.$route.meta.name;
        this.childroute = []
      }
    },
    qiehuanrute(){
      if(this.danqian != this.$route.meta.name){
        this.jcroute();
      }
    },
    addxiugai(cadd){
      if(this.childroute.find(e => e.name == cadd.name)){
        return false;
      }
      this.childroute.length >= 7 ?(this.morex(cadd),this.childroute.splice(2,0,cadd),this.morexiugai(this.childroute[this.childroute.length-1])):(this.childroute.splice(2,0,cadd));
    },
    morexiugai(cadd){
      if(this.more.find(e => e.name == cadd.name)){
        return false;
      }
      this.more.push(cadd);
      this.childroute.splice((this.childroute.length-1),1);
    },
    morex(cadd){//查看该页面是否存在更多路由中
      if(this.more.find(e => e.name == cadd.name)){
        this.more.splice(this.more.findIndex(e => e.name == cadd.name),1)
        return false;
      }
    },
    deletxiugai(pas){
      this.childroute.forEach((e,index) => {
        e.route == pas?this.childroute.splice(index,1) :'';
      });
    },
    cindex(index){//点击路由关闭图标的事件
      this.self = closeIcon(index,this.childroute)
    },
    clearmore(){//清除更多路由数组
      this.more.length = 0;
      if(this.$route.meta.name){
        sessionStorage.setItem('NUsermore',JSON.stringify(this.more));
      }
    },
    replaceroute(oldrouter,newrouter){
      this.childroute.forEach(e => {
        e.route == oldrouter? e.route = newrouter:'';
      })
    }
  },
  watch:{
    "$route":"qiehuanrute",
    childroute:{
      deep:true,
      handler:function(n,o){
        if(n.length < 7 && this.more.length){
          this.childroute.push(this.more[0]);
        };
        if(this.$route.meta.name == '/management/systemVersion/Custom'){
          sessionStorage.setItem('versionlist',JSON.stringify(this.childroute));
        }
      }     
    },
    self:{
      deep:true,
      handler:function(n){
        this.$router.push(n);
        this.self = '';
      }
    }
  },
  computed:{
      colorselects(){
        return this.$route.matched[0].meta.colorselect;
      }
  }
};
</script>
