<!-- 组织机构 -->
<template>
  <div id="organization">
    <the-head :list="list" :backcolor='colorselects'></the-head>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { userInit } from '@/init/user'
export default {
  provide(){
    return{
      replaceroute: this.replaceroute
    }
  },
  data() {
    return {
      userObj: {},
      list: [
        {
          name: "基础设置",
          route: "/management/systemeinstellungen/Setting",
          ico: "icon-guanliweihu_huaban"
        },
        {
          name: "上传签到头像",
          route: "/management/systemeinstellungen/CheckIn",
          ico: "icon-shangchuan"
        }
      ]
    };
  },
  created(){
    // this.$nextTick(()=>
    //   this.list[0].name =  this.$children[1].deparmentList.tit14
    // )
  },
  methods:{
  },
  computed:{
      colorselects(){
        return this.$route.matched[0].meta.colorselect;
      }
  }
};
</script>
<style>
  #organization .el-table td:last-child{
      text-align: center;
  }
  #organization .el-table th:last-child{
    text-align: center;
  }
</style>