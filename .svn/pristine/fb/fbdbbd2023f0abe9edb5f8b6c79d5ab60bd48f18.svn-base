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
          name: "组织机构",
          route: "/management/organization",
          ico: "icon-zuzhijigou"
        }
      ]
    };
  },
  created(){
    this.$nextTick(()=>
      this.list[0].name =  this.$children[1].deparmentList.tit14
    )
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
  .el-table .cell{
        text-align: center !important;
    }
</style>