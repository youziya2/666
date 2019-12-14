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
                    <input class="enter-input" v-model="item.val" @keyup = "getMbitemCount(index == 'series' ? 'isSeries':'isMac')">
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
            <!-- 保存 -->
             <el-button :style="{backgroundColor:colorselects,color:'#fff',padding:'12px 40px'}" @click.native="sendInfo">{{$buttonObj.save}}</el-button>
          </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { getMainboardType,updateMbitem,getMbitemCount } from "../../../api/https.js";
import { checkNull } from '@/api/methods'
import { mbitemInit } from "@/init/mainboard.js";
export default {
  data() {
    return {
      list: [{ router: this.$parent.mbitemObj.tit07 }],
      end: this.$parent.mbitemObj.tit01,
      isSeries: false,
      isMac: false,
      finishedParvalObj: {},
      windowHeight: ""
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    mbitemInit(this);
    this.getMainboardType();
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    },
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
    // 校验主板名/型号唯一性
    getMbitemCount(boo){
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
    // 发送录入信息
    sendInfo() {
        if(this.isSeries) return this.$message.error( this.$parent.mbitemObj.tit12 );
        if(this.isMac) return this.$message.error( this.$parent.mbitemObj.tit13 );
        if(checkNull(this.finishedParvalObj)){
          var obj = {
            self:this,
            success:response => {
              if (response.data.message.indexOf("addSuccess") > -1) {
                this.$router.push({ path: "/management/motherboardProducts/finishedList" });
              } else {
                this.$message.error(this.$promptObj.savefail);
              }
            }
          }
          updateMbitem(obj)
        } 
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
    height: 400px;
    border-bottom: 1px solid gainsboro;
}
.btn_group{
  text-align: right;
  margin-right: 50px;
}
</style>