<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar :style="{height:windowHeight}">
      <div class="btm-content">
        <!-- 产品信息 -->
        <div class="title">{{$parent.finishedObj.tit05}}</div>
        <div class="input">
          <el-row :gutter="20" style="padding:0">
            <el-col :span="6" v-for="(item,index) in finishedParvalObj" :key="index">
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible">
                <template v-if="item.select">
                  <el-select
                    :placeholder="$buttonObj.select"
                    v-model="item.val"
                    style="width:100%"
                  >
                    <el-option
                      v-for="n in item.select"
                      :key="n.value"
                      :label="n.label"
                      :value="n.value"
                    ></el-option>
                </el-select>
                </template>
                <template v-else>
                  <template v-if ="index == 'gdiname' || index == 'mac'">
                    <input class="enter-input" v-model="item.val" @keyup = "getGoodsitemCount(index)">
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
import { updateFinished,getTemplate,getGoodsitemCount } from "../../../api/https.js";
import { checkNull } from '@/api/methods'
import { finishedEnterInit } from "@/init/product.js";
export default {
  data() {
    return {
      isGdiname: false,
      isMac: false,
      list: [{ router: this.$parent.finishedObj.tit01 }],
      end: this.$parent.finishedObj.tit02,
      finishedParvalObj: {},
      windowHeight: ""
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getTemplate();
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    },
  },
  methods: {
    getTemplate(){
      var obj = {
          success:response => {
            if (response.data.message.indexOf("getSuccess") > -1) {
              var arr = response.data.goodsList ,obj = {} ,options = [];
              for (let index = 0; index < arr.length; index++) {
                obj = {}
                obj.label = arr[index].fieldvalues.gdcname;
                obj.value = arr[index].fieldvalues.gdid;
                options.push(obj)
              }
              obj = {
                gdid : options
              }
              finishedEnterInit(this, obj)
            } else {
              this.$message.error(this.$promptObj.searchfail);
            }
          }
        }
      getTemplate(obj)
    },
     // 校验单品名称/mac唯一性
    getGoodsitemCount(value){
      var boo = value == 'gdiname' ? "isGdiname" : "isMac"
      var obj = {
            gdiname: this.finishedParvalObj.gdiname.val,
            mac: this.finishedParvalObj.mac.val,
            success: response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                if (response.data.flag) {
                  this[boo] = true;
                  var err = boo == 'isGdiname' ? this.$parent.finishedObj.tit11 : this.$parent.finishedObj.tit12
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
      getGoodsitemCount(obj,boo)
    },
    // 发送录入信息
    sendInfo() {
        if(this.isMac) return this.$message.error( this.$parent.finishedObj.tit12 );
        if(this.isGdiname) return this.$message.error( this.$parent.finishedObj.tit11 );
        if(checkNull(this.finishedParvalObj)){
          var obj = {
            self:this,
            gdcode: this.finishedParvalObj.gdcode.val,
            mac: this.finishedParvalObj.mac.val,
            success:response => {
              if (response.data.message.indexOf("addSuccess") > -1) {
                this.$router.push({ path: "/management/productList/finishedList" });
              } else {
                this.$message.error(this.$promptObj.savefail);
              }
            }
          }
          updateFinished(obj)
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
    height: 440px;
    border-bottom: 1px solid gainsboro;
}
.btn_group{
  text-align: right;
  margin-right: 50px;
}
</style>