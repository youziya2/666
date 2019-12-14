<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar :style="{height:windowHeight}">
      <div class="btm-content">
        <!-- 产品信息 -->
        <div class="title">{{$parent.mbitemObj.tit02}}</div>
        <div class="input">
          <el-row :gutter="20" style="padding:0">
            <el-col :span="6" v-for="(item,index) in finishedParvalObj" :key="index">
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible">
                <template v-if="item.select">
                  <el-select
                    v-model="item.val"
                    style="width:100%"
                    :placeholder="$buttonObj.select"
                  >
                    <el-option
                      v-for="(val,n) in item.select"
                      :key="n"
                      :label="val"
                      :value="n"
                    ></el-option>
                </el-select>
                </template>
                <template v-else>
                  <template v-if ="index == 'series' || index == 'mac'">
                    <input class="enter-input" v-model="item.val" @keyup = "getMbitemCount(index == 'series' ? 'isSeries':'isMac',index)">
                  </template>
                  <template v-else>
                    <input class="enter-input" v-model="item.val" >
                  </template>
                </template>               
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="btn_group">
          <!-- 保 存 -->
             <el-button type="warning" style="padding: 14px 60px;font-size: 16px;" @click.native="sendInfo">{{$buttonObj.save}}</el-button>
             <!-- 取消 -->
             <el-button :style="{ backgroundColor:colorselects,color:'#fff', padding: '14px 60px', fontSize: '16px'}" @click="cancel()">{{$buttonObj.cancel}}</el-button>
          </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { getMainboardType,delPictrue,updateMbitem,getMbitemCount } from "../../../api/https.js";
import { getNowFormatDate,updateDetail,checkNull } from "../../../api/methods.js";
import { mbitemInit } from "@/init/mainboard.js";
export default {
  inject:["replaceroute"],
  data() {
    return {
      list: [{ router: this.$parent.mbitemObj.tit07 }, { router: this.$parent.mbitemObj.tit11 }],
      end: "",
      finishedParvalObj: {},
      gditid: '',
      optons: {},
      windowHeight: ""
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    mbitemInit(this);
    this.getHeight();
    this.getMainboardType();
    this.changecontent();
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    },
  },
  watch:{
    "$route":"changecontent"
  },
  methods: {
    getMainboardType(){
      var obj = {
          success:response => {
            if (response.data.message.indexOf("getSuccess") > -1) {
              var arr = response.data.mbtypeList ,obj = {};
              for (let index = 0; index < arr.length; index++) {
                obj[arr[index].fieldvalues.mbid] = arr[index].fieldvalues.mbname; 
              }
              this.finishedParvalObj.mbid.select = obj;
            } else {
              this.$message.error(this.$promptObj.searchfail);
            }
          }
        }
      getMainboardType(obj)
    },
    // 取消修改
    cancel(){
      var arr =  updateDetail('/management/motherboardProducts/finishedDetail/')
      this.replaceroute(arr[0],arr[1]);
      },
    //获取信息
    getInfo(){
      this.end  = this.$route.params.id;
      this.gditid = this.end.substring(this.end.indexOf('@')+1)
      var obj = JSON.parse(sessionStorage.getItem(this.gditid)).finishedObj
      this.finishedParvalObj.mbid.val = obj.mbid;
      this.finishedParvalObj.series.val = obj.series;
      this.finishedParvalObj.mac.val = obj.mac;

    },
    // 校验主板名/型号唯一性
    getMbitemCount(boo,str){
      var object = JSON.parse(sessionStorage.getItem(this.gditid)).finishedObj;
      if ( this.finishedParvalObj[str].val == object[str]) return this[boo] = false;
      var obj = {
            series: this.finishedParvalObj.series.val,
            mac: this.finishedParvalObj.mac.val,
            success: response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                if (response.data.flag) {
                  this[boo] = true;
                  var err = boo == 'isSeries' ? this.$parent.mbitemObj.tit12 : this.$parent.mbitemObj.tit13
                  this.$message.error(err);
                } else {
                  this[boo] = false;
                }
              } else {
                // '网络繁忙'
                this.$message.error(this.$buttonObj.busy);
              }
            }
          }
      getMbitemCount(obj,boo)
    },
    // 发送修改信息
    sendInfo() {
        if(this.isSeries) return this.$message.error( this.$parent.mbitemObj.tit12 );
        if(this.isMac) return this.$message.error( this.$parent.mbitemObj.tit13 );
        if(checkNull(this.finishedParvalObj)){
          var obj = {
            self:this,
            success:response => {
              if (response.data.message.indexOf("editSuccess") > -1) {
                this.cancel();
              } else {
                this.$message.error(this.$promptObj.savefail);
              }
            }
          }
          updateMbitem(obj, true)
        } 
    },
    changecontent(){
      this.getInfo();
    },
    getHeight() {
      this.windowHeight = this.$config.getHeight(190);
    },
  }
};
</script>
 
<style scoped>
.btm-content,.btn_group {
  /* width: 100%; */
  background-color: #ffffff;
  padding: 50px;
}
.input{
    height: 420px;
    border-bottom: 1px solid gainsboro;
}
.btn_group{
  text-align: right;
  /* margin-right: 50px; */
}
</style>