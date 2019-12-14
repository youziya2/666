<template>
  <div>
    <the-head :list="list" :backcolor='colorselects'  @cindex="cindex"  @addxiugai="addxiugai"></the-head>
    <div class="content">
      <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { closeIcon } from './../../api/methods'//导入关闭路由事件
import { mbitemPublc } from '@/init/mainboard'
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      mbitemObj: {},
      list: [
        {
          name: "主板录入",
          route: "/management/motherboardProducts/finishedEntering",
          ico: "icon-bi"
        },
        {
          name: "主板列表",
          route: "/management/motherboardProducts/finishedList",
          ico: "icon-liebiao"
        }
      ],
      more:-1,
      danqian:'',
      self:''
    };
  },
  created(){
    mbitemPublc(this);
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
        this.list[0].name = this.mbitemObj.tit01;
        this.list[1].name = this.mbitemObj.tit03;
        if(sessionStorage.getItem('motherboardProducts') && sessionStorage.getItem('motherboardProducts').length){
          this.list = JSON.parse(sessionStorage.getItem('motherboardProducts'));
          this.list[0].name = this.mbitemObj.tit01;
          this.list[1].name = this.mbitemObj.tit03;
        };
    },
    qiehuanrute(){
      if(this.danqian != this.$route.meta.name){
        this.jcroute();
      }
    },
    addxiugai(cadd){
        var flag = -1 ,path = '';
        for (let index = 0; index < this.list.length; index++) {
          if(this.list[index].id == cadd.id) {
            path = cadd.route
            flag = index
          }
        }
        if( flag == -1) {
          this.list.push(cadd);
          sessionStorage.setItem('motherboardProducts',JSON.stringify(this.list));
        }
        else this.$router.push(path)
    },
    deletxiugai(pas){
        this.list.forEach((e,index) => {
          e.route == pas?this.list.splice(index,1) :'';
        });
    },
    cindex(index){//点击路由关闭图标的事件
      this.self = closeIcon(index,this.list)
      sessionStorage.setItem('motherboardProducts',JSON.stringify(this.list));
    },
    replaceroute(oldrouter,newrouter){
        this.list.forEach(e => {
          e.route == oldrouter? e.route = newrouter:'';
        })
    }
  },
  watch:{
    "$route":"qiehuanrute",
    list:{
      deep:true,
      handler:function(n,o){
        sessionStorage.setItem('motherboardProducts',JSON.stringify(this.list));
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
