<template>
  <div>
    <the-head :backcolor='colorselects' :list="list" :more="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
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
    data(){
        return{
          list: [
            {
              name: "反馈列表",
              route: "/management/feedBack/feedBackList",
              ico: "icon-huihua-copy"
            }
          ],
          self:'',
          more:[]
        }
    },
    created(){
      var obj = JSON.parse(localStorage.languageObj)
      this.list[0].name = obj.feedback_fblist
      if(sessionStorage.getItem('feedBacklist') && sessionStorage.getItem('feedBacklist').length){
        this.list = JSON.parse(sessionStorage.getItem('feedBacklist'));
        this.list[0].name = obj.feedback_fblist
      }
  },
  methods:{
    // 在更多路由中点击，或新打开详情页时触发方法，
    addxiugai(cadd){
      if(this.list.find(e => e.name == cadd.name)){
        return false;
      }
      this.list.length >= 9 ?(this.morex(cadd),this.list.splice(1,0,cadd),this.morexiugai(this.list[this.list.length-1])):(this.list.splice(1,0,cadd));
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
        sessionStorage.setItem('feedBacklist',JSON.stringify(this.list));
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
}
</script>
