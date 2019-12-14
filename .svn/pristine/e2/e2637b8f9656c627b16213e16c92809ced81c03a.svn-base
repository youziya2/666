<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute='childroute'  @cindex="cindex"  @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
import { productInit } from '@/init/product'
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      list: [
        {
          name: '产品标准',
          route: "/management/productList/lists",
          ico: "icon-moban"
        },
        {
          name: "单品管理",
          route: "/management/productList/finishedList",
          ico: "icon-chengpin"
        }
      ],
      childroute:[],
      inters:[
        {
          name: "标准录入",
          route: "/management/productList/entering",
          ico: "icon-bi"
        },
        {
          name: "标准列表",
          route: "/management/productList/lists",
          ico: "icon-liebiao"
        }
      ],
      space:[
       {
          name: "单品录入",
          route: "/management/productList/finishedEntering",
          ico: "icon-bi"
        },
        {
          name: "单品列表",
          route: "/management/productList/finishedList",
          ico: "icon-liebiao"
        }
      ],
  
      more:-1,
      danqian:'',
      self:''
    };
  },
  created(){
    productInit(this);
    this.jcroute();
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods:{
    jcroute(){
      if(this.$route.meta.name == '/management/productList/lists'){
        this.danqian = this.$route.meta.name;
        var inters1 =  this.inters[0].name,
        inters2 =  this.inters[1].name
        if(sessionStorage.getItem('templatelist') && sessionStorage.getItem('templatelist').length){
          this.inters = JSON.parse(sessionStorage.getItem('templatelist'));
        };
        if(sessionStorage.getItem('templatemore') && sessionStorage.getItem('templatemore').length){
          this.more = JSON.parse(sessionStorage.getItem('templatemore'));
        };
        this.inters[0].name = inters1;
        this.inters[1].name = inters2;
        this.childroute = this.inters;
      }else if(this.$route.meta.name == '/management/productList/finishedList'){
        this.danqian = this.$route.meta.name;
        var inters1 =  this.space[0].name,
        inters2 =  this.space[1].name
        if(sessionStorage.getItem('finishedlist') && sessionStorage.getItem('finishedlist').length){
          this.space = JSON.parse(sessionStorage.getItem('finishedlist'));
        };
        if(sessionStorage.getItem('finishedmore') && sessionStorage.getItem('finishedmore').length){
          this.more = JSON.parse(sessionStorage.getItem('finishedmore'));
        };
        this.space[0].name = inters1;
        this.space[1].name = inters2;
        this.childroute = this.space;
      }else if(this.$route.meta.name == '/management/productList/test1'){
        this.danqian = this.$route.meta.name;
        var inters1 =  this.test[0].name,
        inters2 =  this.test[1].name
        if(sessionStorage.getItem('finishedlist') && sessionStorage.getItem('finishedlist').length){
          this.test2 = JSON.parse(sessionStorage.getItem('test2'));
        };
        if(sessionStorage.getItem('finishedmore') && sessionStorage.getItem('finishedmore').length){
          this.test3 = JSON.parse(sessionStorage.getItem('test3'));
        };
        this.test[0].name = inters1;
        this.test[1].name = inters2;
        this.childroute = this.test;
      }
    },
    qiehuanrute(){
      if(this.danqian != this.$route.meta.name){
        this.jcroute();
      }
    },
    addxiugai(cadd){
      if(this.$route.meta.name == '/management/productList/lists'){
        var flag = -1 ,path = '';
        for (let index = 0; index < this.inters.length; index++) {
          if(this.inters[index].id == cadd.id) {
            path = cadd.route
            flag = index
          }
        }
        if( flag == -1) {
          this.inters.push(cadd);
          sessionStorage.setItem('templatelist',JSON.stringify(this.inters));
        }
        else this.$router.push(path)
      }else if(this.$route.meta.name == '/management/productList/finishedList'){
        var flag = -1 ,path = '';
        for (let index = 0; index < this.space.length; index++) {
          if(this.space[index].id == cadd.id) {
            path = cadd.route
            flag = index
          }
        }
        if( flag == -1) {
          this.space.push(cadd);
          sessionStorage.setItem('finishedlist',JSON.stringify(this.space));
        }
        else this.$router.push(path)
      }
    },
    deletxiugai(pas){
      if(this.$route.meta.name == '/management/productList/lists'){
        this.inters.forEach((e,index) => {
          e.route == pas?this.inters.splice(index,1) :'';
        });
      }else if(this.$route.meta.name == '/management/productList/finishedList'){
        this.space.forEach((e,index) => {
          e.route == pas?this.space.splice(index,1) :'';
        });
      }
    },
    cindex(index){//点击路由关闭图标的事件
      this.self = closeIcon(index,this.childroute)
      sessionStorage.setItem('templatelist',JSON.stringify(this.inters));
      sessionStorage.setItem('finishedlist',JSON.stringify(this.space));
    },
    replaceroute(oldrouter,newrouter){
      if(this.$route.meta.name == '/management/productList/lists'){
        this.inters.forEach(e => {
          e.route == oldrouter? e.route = newrouter:'';
        })
      }else if(this.$route.meta.name == '/management/productList/finishedList'){
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
        sessionStorage.setItem('templatelist',JSON.stringify(this.inters));
      }     
    },
    space:{
      deep:true,
      handler:function(n,o){
        sessionStorage.setItem('finishedlist',JSON.stringify(this.space));
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
