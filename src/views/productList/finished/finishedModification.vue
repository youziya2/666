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
                    v-model="item.val"
                    style="width:100%"
                    :placeholder="$parent.finishedObj.tit08"
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
          <!-- 保 存 -->
             <el-button type="warning" style="padding: 14px 60px;font-size: 16px;" @click.native="sendInfo">{{$buttonObj.save}}</el-button>
              <!-- 刷 机  -->
              <el-button type="danger" style="padding: 14px 60px;font-size: 16px;" @click.native="root">{{rooy}}</el-button>
             <!-- 取消 -->
             <el-button :style="{ backgroundColor:colorselects,color:'#fff', padding: '14px 60px', fontSize: '16px'}" @click="cancel()">{{$buttonObj.cancel}}</el-button>
          </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { updateFinished,getTemplate,delPictrue,uploadMoreattach,getGoodsitemCount,rooTsty } from "../../../api/https.js";
import { getNowFormatDate,updateDetail,checkNull } from "../../../api/methods.js";
import { finishedDetailInit } from "@/init/product.js";
export default {
  inject:["replaceroute"],
  data() {
    return {
      isGdiname: false,
      isMac: false,
      list: [{ router: this.$parent.finishedObj.tit07 }],
      end: "",
      finishedParvalObj: {},
      optons: {},
      windowHeight: "",
      rooy:"刷机"
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    this.getTemplate();
    // this.changecontent();
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
    // 取消修改
    cancel(){
      var arr =  updateDetail('/management/productList/finishedDetail/')
      this.replaceroute(arr[0],arr[1]);
      },
    // 获取标准
    getTemplate(){
      var obj = {
          success:response => {
            if (response.data.message.indexOf("getSuccess") > -1) {
              var arr = response.data.goodsList ,obj = {}, options = [];
              for (let index = 0; index < arr.length; index++) {
                obj = {}
                obj.label = arr[index].fieldvalues.gdcname;
                obj.value = arr[index].fieldvalues.gdid;
                options.push(obj)
              }
              this.optons = {
                gdid : options
              }
              this.getInfo()
            } else {
              this.$message.error(this.$promptObj.searchfail);
            }
          }
        }
      getTemplate(obj)
    },
    // 校验单品编号/mac唯一性
    getGoodsitemCount(str){
      var boo = str == 'gdiname' ? "isGdiname" : "isMac"
      var object = JSON.parse(sessionStorage.getItem(this.gditid)).finishedObj;
      if ( this.finishedParvalObj[str].val == object[str]) return this[boo] = false;
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
    // 发送修改信息
    sendInfo() {
      if(this.isMac) return this.$message.error( this.$parent.finishedObj.tit12 );
      if(this.isGdiname) return this.$message.error(  this.$parent.finishedObj.tit11 );
      if(checkNull(this.finishedParvalObj)){
        var obj = {
          self:this,
          success:response => {
            if (response.data.message.indexOf("editSuccess") > -1) {
              this.cancel()
            } else {
              this.$message.error(this.$promptObj.updatefail);
            }
          }
        }
        updateFinished(obj)  
      }
    },
    //刷机
    root(){
      if(checkNull(this.finishedParvalObj)){
        this.$confirm('刷机将会丢失历史数据，请慎重使用，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '刷机成功!'
          });
          var obj = {
          self:this,
          success:response => {
            if (response.data.message.indexOf("editSuccess") > -1) {
              this.cancel()
            } else {
              this.$message.error(this.$promptObj.updatefail);
            }
          }
        }
        rooTsty(obj) }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消刷机'
          });          
        });    
      }
    },
    //获取信息
    getInfo(){
      this.end  = this.$route.params.id;
      this.gditid = this.end.substring(this.end.indexOf('@')+1)
      var obj = JSON.parse(sessionStorage.getItem(this.gditid)).finishedObj
      finishedDetailInit(this, this.optons, obj)
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
    height: 430px;
    border-bottom: 1px solid gainsboro;
}
.btn_group{
  text-align: right;
  /* margin-right: 50px; */
}
</style>