<template>
  <div>
    <the-head :list="list" :backcolor='colorselects' :childroute='childroute'></the-head>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { bigInit } from "@/init/bigdata"
export default {
  data() {
    return {
      list: [
        {
          name: "用户习惯分析",
          route: "/management/bigDataList/userHabit",
          ico: "icon-yonghu"
        },
        {
          name: "产品使用分析",
          route: "/management/bigDataList/usageAmount",
          ico: "icon-chanpinguanli"
        }
      ],
      childroute:[],
      liang:[
        {
          name: "文件统计",
          route: "/management/bigDataList/usageAmount/usageAmountwj",
          ico: "icon-wenjian"
        },
        {
          name: "云盘统计",
          route: "/management/bigDataList/usageAmount/usageAmountyp",
          ico: "icon-chuangyiyunpan"
        },
        {
          name: "应用统计",
          route: "/management/bigDataList/usageAmount/usageAmountyy",
          ico: "icon-yingyong"
        }
      ],
      habit:[
        {
          name: "注册统计",
          route: "/management/bigDataList/userHabit/Registrations",
          ico: "icon-fenxiyanpan"
        },
        { 
          name: "开机统计",
          route: "/management/bigDataList/userHabit/userUsing",
          ico: "icon-dianying_"
        },
        {
          name: "会议频率",
          route: "/management/bigDataList/userHabit/usageAmounthy",
          ico: "icon-huiyi"
        },
      ]
    };
  },
  created(){
    bigInit(this);
    this.qhroute();
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods:{
    qhroute(){
      if(this.$route.meta.name == '/management/bigDataList/usageAmount'){
        this.childroute = this.liang;
      }else{
        this.childroute = this.habit;
      }
    }
  },
  watch:{
    "$route":"qhroute"
  }
};
</script>
