<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute="childroute" :childmore="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { userInit } from '@/init/user'
import { closeIcon } from './../../api/methods'//导入关闭路由事件
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      userObj: {},
      list: [
        {
          name: "个人用户",
          route: "/management/userList/NUser",
          ico: "icon-user"
        }
      ],
      childroute:[
      ],
      NUser:[
        {
          name: "新增用户",
          route: "/management/userList/NUser/NUserAdd",
          ico: "icon-tianjiayonghu"
        },
        {
          name: "用户列表",
          route: "/management/userList/NUser/NUserList",
          ico: "icon-liebiao"
        }
      ],
      BUser:[
        {
          name: "新增用户",
          route: "/management/userList/BUser/BUserAdd",
          ico: "icon-tianjiayonghu"
        },
        {
          name: "用户列表",
          route: "/management/userList/BUser/BUserList",
          ico: "icon-liebiao"
        }
      ],
      more:[],
      danqian:'',
      self:''
    };
  },
  created(){
    if (sessionStorage.mrlename == 'super') {
      this.list[1] =  {
          name: "企业用户",
          route: "/management/userList/BUser",
          ico: "icon-yonghu"
        }
      this.list[2] = {
          name: "组织机构",
          route: "/management/userList/Structure",
          ico: "icon-zuzhijigou"
        }
    } else {
      this.list[1] = {
          name: "组织机构",
          route: "/management/userList/Structure",
          ico: "icon-zuzhijigou"
        }
    }
    userInit(this);
    this.jcroute();
  },
  methods:{
    jcroute(){
      if(this.$route.meta.name == '/management/userList/NUser'){
        this.danqian = this.$route.meta.name;
        if(sessionStorage.getItem('NUserlist') && sessionStorage.getItem('NUserlist').length){
          this.NUser = JSON.parse(sessionStorage.getItem('NUserlist'));
          this.NUser[0].name = this.userObj.tit02;
          this.NUser[1].name = this.userObj.tit06;
        };
        if(sessionStorage.getItem('NUsermore') && sessionStorage.getItem('NUsermore').length){
          this.more = JSON.parse(sessionStorage.getItem('NUsermore'));
        };
        this.childroute = this.NUser;
      }else if(this.$route.meta.name == '/management/userList/BUser'){
        this.danqian = this.$route.meta.name;
        if(sessionStorage.getItem('BUserlist') && sessionStorage.getItem('BUserlist').length){      
          this.BUser = JSON.parse(sessionStorage.getItem('BUserlist'));
          this.BUser[0].name = this.userObj.tit02;
          this.BUser[1].name = this.userObj.tit06;
        };
        if(sessionStorage.getItem('BUsermore') && sessionStorage.getItem('BUsermore').length){
          this.more = JSON.parse(sessionStorage.getItem('BUsermore'));
        };
        this.childroute = this.BUser;
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
      if(this.$route.meta.name == '/management/userList/NUser'){
        sessionStorage.setItem('NUsermore',JSON.stringify(this.more));
      }else if(this.$route.meta.name == '/management/userList/BUser'){
        sessionStorage.setItem('BUsermore',JSON.stringify(this.more));
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
          this.more.splice(0,1);
        };
        if(this.$route.meta.name == '/management/userList/NUser'){
          sessionStorage.setItem('NUserlist',JSON.stringify(this.childroute));
          sessionStorage.setItem('NUsermore',JSON.stringify(this.more));
        }else if(this.$route.meta.name == '/management/userList/BUser'){
          sessionStorage.setItem('BUserlist',JSON.stringify(this.childroute));
          sessionStorage.setItem('BUsermore',JSON.stringify(this.more));
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
