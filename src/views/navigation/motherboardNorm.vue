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
import { mainboardPublc } from '@/init/mainboard'
export default {
  provide(){
    return{
      replaceroute:this.replaceroute
    }
  },
  data() {
    return {
      mainboardObj:{},
      list: [
       {
          name: "规格录入",
          route: "/management/motherboardNorm/entering",
          ico: "icon-bi"
        },
        {
          name: "规格列表",
          route: "/management/motherboardNorm/lists",
          ico: "icon-liebiao"
        }
      ],
      childroute: [],
      space:[],
      more:-1,
      danqian:'',
      self:''
    };
  },
  created(){
    mainboardPublc(this);
    this.jcroute();
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods:{
    jcroute(){
        this.list[0].name = this.mainboardObj.tit01;
        this.list[1].name = this.mainboardObj.tit02;
        if(sessionStorage.getItem('motherboardNorm') && sessionStorage.getItem('motherboardNorm').length){
          this.list = JSON.parse(sessionStorage.getItem('motherboardNorm'));
          this.list[0].name = this.mainboardObj.tit01;
          this.list[1].name = this.mainboardObj.tit02;
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
          sessionStorage.setItem('motherboardNorm',JSON.stringify(this.list));
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
      sessionStorage.setItem('motherboardNorm',JSON.stringify(this.list));
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
        sessionStorage.setItem('motherboardNorm',JSON.stringify(this.list));
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
