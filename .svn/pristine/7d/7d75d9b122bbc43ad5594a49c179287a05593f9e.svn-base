<template>
  <div id="app" style="min-width:1280px;">
    <!-- form为批量删除时用到的 -->
      <form action="" style="display:none" id="theForm" name="theForm" enctype="multipart/form-data"  method="post">
        <input type="text" v-for="(item,index) in totalChecked" :key='index' v-model="totalChecked[index]" :id="inputId" :name="inputId">
      </form>
    <router-view v-if="onloadpd"/>
  </div>
</template>

<script>
export default{
  name: 'App',
  provide(){
    return{
      onload:this.onload
    }
  },
  data(){
    return{
      onloadpd:true,
      totalChecked:[],
    }
  },
  methods:{
    onload(){
      this.onloadpd = false;
      this.$nextTick(function(){
        this.onloadpd = true;
      })
    },
    getData(data,id){
      this.totalChecked = null;
      this.totalChecked = data;
      this.inputId = id
    }
  },
  created(){
    // var lgObj = JSON.parse(localStorage.languageObj),name,obj = {};
    // var num = 0;
    // for (const key in lgObj) {
    //   if(name == key.split('_')[0]){
    //     num ++;
    //   }else{
    //     name = key.split('_')[0];
    //     obj[name] = num;
    //     num = 0;
    //   }
    // }
    if(!window.Promise) {
				window.Promise = Promise;
				window.Promise = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a();
      }
    this.$bus.on('deleteArr',this.getData)
  },
   beforeDestroy(){
    this.$bus.off('deleteArr',this.getData)
  },
  
}
</script>

<style>
.el-dialog--center .el-dialog__body{
  text-align: center;
}
.el-loading-spinner .el-loading-text{
  /* color: #4377EE; */
  font-size: 18px;
}
.el-loading-spinner{
  z-index: 9999
}
.el-icon-search{
    font-size: 20px;
    color: #fff;
}
/* .el-dialog:nth-of-type(1) {
     background-color: blue ;
 } */
</style>

