<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute='childroute' :childmore="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      list: [
        // {
        //   name: "产品默认空间",
        //   route: "/management/cloudList/interspace",
        //   ico: "icon-chanpinguanli"
        // },
        {
          name: "用户增值空间",
          route: "/management/cloudList/IncrementalSpace",
          ico: "icon-chanpinguanli"
        }
      ],
      childroute:[],
      inters:[
        // {
        //   name: "新空间配置",
        //   route: "/management/cloudList/interspace/newinterspace",
        //   ico: "icon-shangchuanwenjian-"
        // },
        // {
        //   name: "默认空间列表",
        //   route: "/management/cloudList/interspace/interspaceList",
        //   ico: "icon-liebiao"
        // }
      ],
      space:[
        // {
        //   name: "新空间配置",
        //   route: "/management/cloudList/IncrementalSpace/newIncrementalSpace",
        //   ico: "icon-shangchuanwenjian-"
        // },
        {
          name: "增值空间列表",
          route: "/management/cloudList/IncrementalSpace/IncrementalSpaceList",
          ico: "icon-liebiao"
        }
      ],
      more:[],
      danqian:'',
      self:''
    };
  },
  created(){
    this.jcroute();
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods:{
    jcroute(){
      this.danqian = this.$route.meta.name;
        if(sessionStorage.getItem('spacelist') && sessionStorage.getItem('spacelist').length){
          this.space = JSON.parse(sessionStorage.getItem('spacelist'));
        };
        if(sessionStorage.getItem('spacemore') && sessionStorage.getItem('spacemore').length){
          this.more = JSON.parse(sessionStorage.getItem('spacemore'));
        };
        this.childroute = this.space;
      // if(this.$route.meta.name == '/management/cloudList/interspace'){
      //   this.danqian = this.$route.meta.name;
      //   if(sessionStorage.getItem('interslist') && sessionStorage.getItem('interslist').length){
      //     this.inters = JSON.parse(sessionStorage.getItem('interslist'));
      //   };
      //   if(sessionStorage.getItem('intersmore') && sessionStorage.getItem('intersmore').length){
      //     this.more = JSON.parse(sessionStorage.getItem('intersmore'));
      //   };
      //   this.childroute = this.inters;
      // }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
      //   this.danqian = this.$route.meta.name;
      //   if(sessionStorage.getItem('spacelist') && sessionStorage.getItem('spacelist').length){
      //     this.space = JSON.parse(sessionStorage.getItem('spacelist'));
      //   };
      //   if(sessionStorage.getItem('spacemore') && sessionStorage.getItem('spacemore').length){
      //     this.more = JSON.parse(sessionStorage.getItem('spacemore'));
      //   };
      //   this.childroute = this.space;
      // }
    },
    qiehuanrute(){
      if(this.danqian != this.$route.meta.name){
        this.jcroute();
      }
    },
    addxiugai(cadd){
      if(this.$route.meta.name == '/management/cloudList/interspace'){
        if(this.inters.find(e => e.name == cadd.name)){
          return false;
        }
        this.inters.length >= 7 ?(this.morex(cadd),this.inters.splice(2,0,cadd),this.morexiugai(this.inters[this.inters.length-1])):(this.inters.splice(2,0,cadd));
      }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
        if(this.space.find(e => e.name == cadd.name)){
          return false;
        }
        this.space.length >= 7 ?(this.morex(cadd),this.space.splice(2,0,cadd),this.morexiugai(this.space[this.space.length-1])):(this.space.splice(2,0,cadd));
      }
    },
    morexiugai(cadd){
      if(this.more.find(e => e.name == cadd.name)){
        return false;
      }
      this.more.push(cadd);
      if(this.$route.meta.name == '/management/cloudList/interspace'){
        this.inters.splice((this.inters.length-1),1);
      }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
        this.space.splice((this.space.length-1),1);
      }
    },
    morex(cadd){//查看该页面是否存在更多路由中
      if(this.more.find(e => e.name == cadd.name)){
        this.more.splice(this.more.findIndex(e => e.name == cadd.name),1)
        return false;
      }
    },
    deletxiugai(pas){
      if(this.$route.meta.name == '/management/cloudList/interspace'){
        this.inters.forEach((e,index) => {
          e.route == pas?this.inters.splice(index,1) :'';
        });
      }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
        this.space.forEach((e,index) => {
          e.route == pas?this.space.splice(index,1) :'';
        });
      }
    },
    cindex(index){//点击路由关闭图标的事件
      this.self = closeIcon(index,this.childroute)
      // if(this.$route.meta.name == '/management/cloudList/interspace'){
      //   this.$route.path == this.inters[index].route?(this.self = this.inters[index-1].route):'';
      //   this.inters.splice(index,1);
      // }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
      //   this.$route.path == this.space[index].route?(this.self = this.space[index-1].route):'';
      //   this.space.splice(index,1);
      // }
    },
    clearmore(){//清除更多路由数组
      this.more.length = 0;
      if(this.$route.meta.name == '/management/cloudList/interspace'){
        sessionStorage.setItem('intersmore',JSON.stringify(this.more));
      }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
        sessionStorage.setItem('spacemore',JSON.stringify(this.more));
      }
    },
    replaceroute(oldrouter,newrouter){
      if(this.$route.meta.name == '/management/cloudList/interspace'){
        this.inters.forEach(e => {
          e.route == oldrouter? e.route = newrouter:'';
        })
      }else if(this.$route.meta.name == '/management/cloudList/IncrementalSpace'){
        this.space.forEach(e => {
          e.route == oldrouter? e.route = newrouter:'';
        })
      }
    }
  },
  watch:{
    "$route":"qiehuanrute",
    inters:{
      deep:true,
      handler:function(n,o){
        if(n.length < 7 && this.more.length){
          this.inters.push(this.more[0]);
          this.more.splice(0,1);
        };
        sessionStorage.setItem('interslist',JSON.stringify(this.inters));
        sessionStorage.setItem('intersmore',JSON.stringify(this.more));
      }     
    },
    space:{
      deep:true,
      handler:function(n,o){
        if(n.length < 7 && this.more.length){
          this.space.push(this.more[0]);
          this.more.splice(0,1);
        };
        sessionStorage.setItem('spacelist',JSON.stringify(this.space));
        sessionStorage.setItem('spacemore',JSON.stringify(this.more));
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
