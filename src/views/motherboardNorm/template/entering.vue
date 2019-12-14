<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar :style="{height:windowHeight}">
      <div class="btm-content">
        <!-- 产品参数 -->
        <div class="title">{{$parent.mainboardObj.tit04}}</div>
        <div class="input">
          <el-row :gutter="20" style="padding:0">
            <el-col :span="6" v-for="(item,index) in parvalObj" :key="index" style="margin-bottom: 24px;">
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible" :class="{'must':item.must, 'mycolor': index == 'colors'}">
                <template v-if="index == 'savetime'">
                  <el-date-picker
                    v-model="item.val"
                    style="width:100%"
                    type="datetime"
                    default-time="12:00:00"
                  ></el-date-picker>
                </template>
                <template v-else-if="item.select">
                  <el-select
                  @change = "changeType"
                  :disabled="isShow"
                    v-model="item.val"
                    style="width:100%"
                    :placeholder="$buttonObj.select"
                  >
                    <el-option
                      v-for="(n,val) in item.select"
                      :key="val"
                      :label="n"
                      :value="val"
                    ></el-option>
                </el-select>
                </template>
                <template v-else>
                  <template v-if ="index == 'mbname' || index == 'modnum'">
                    <input class="enter-input" v-model="item.val" @keyup = "getMainboardCount(index == 'mbname' ? 'isMbname':'isModnum')">
                  </template>
                  <template v-else>
                    <input class="enter-input" v-model="item.val" >
                  </template>  
                </template>               
                <span class="units" v-if="item.units">{{item.units}}</span>
              </div>
            </el-col>
          </el-row>     
        </div>
      </div>
      <div class="btm-content-btm">
        <!-- 产品描述(必填) -->
        <div class="title">{{$parent.mainboardObj.tit09}}</div>
        <div class="input">
          <textarea class="enter-textare" rows="5" cols="160" resize="none" :disabled="isShow" v-model="content"/>
        </div>
      </div>
      <div class="btm-content-btm">
        <!-- 产品图片 -->
        <template v-if="isShow">
            <div class="title">{{$parent.mainboardObj.tit05}}</div>
        </template>
        <div class="upload">
          <template v-if="isShow">
          <div class="demo-input-suffix" style="padding-bottom: 30px;">
            <div class="enteringimgupload">   
              <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
                <div class="file-imgs" v-for="( item,index)  in imgArr" :key = 'index'>
                        <input  type="file" :id="item" :name="item" accept="image/jpeg,image/png,image/gif,image/jpg" multiple="multiple"
                        @change="uploadMoreattach(item,pkid)">
                        <div class="show-imgs">
                          <img v-if=" imgList[item].imgpath " :src="imgList[item].imgpath" @mouseenter = "isClear=index">
                          <!-- 删除 -->
                          <div :class=" isClear == index ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                            <span class="del-file-imgs" v-if=" imgList[item].imgpath  && imgList[item].imgpath != '../../../static/img/timg.gif'" @click="deletshow(item)">
                              <i class="el-icon-delete fil-clear-icon"></i>
                            </span>
                          </div>
                        </div>
                      </div> 
              </form>
            </div>
          </div>
          </template>
          <!-- 删除提示 -->
          <el-dialog
                    :title="$promptObj.warn"
                    :visible.sync="centerDialogVisible"
                    width="330px"
                    center>
                    <span>{{$promptObj.delwarn}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="delPictrue('picid')">{{$buttonObj.sure}}</el-button>
                    </span>
                    </el-dialog>
          <div class="btn-group">
            <el-row>
              <!-- 下一步 -->
              <template v-if="!isShow">
                <el-button type="warning" @click.native="sendInfo">{{$buttonObj.next}}</el-button>
                <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click="clearContent">{{$buttonObj.reset}}</el-button>
              </template>
              <!-- 完成 -->
              <template v-else>
                <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click.native="carryOut">{{$buttonObj.complete}}</el-button>
              </template>
            </el-row>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { updateMainboard,delPictrue,uploadMoreattach,getMainboardCount } from "../../../api/https.js";
import { checkNull } from "../../../api/methods.js";
import { mainboardInit } from "@/init/mainboard.js";
export default {
  data() {
    return {
      isClear: -1,
      isShow: false,
      isMbname: false,
      isModnum: false,
      centerDialogVisible:false,//删除图片的警示框
      imgNum:'',
      imgList:{//图片列表
        img01:{imgid:'',imgpath:''},
        img02:{imgid:'',imgpath:''},
        img03:{imgid:'',imgpath:''},
        img04:{imgid:'',imgpath:''}
      },
      pkid:'',//商品ID
      imgArr:["img01","img02","img03","img04"],
      list: [ { router: this.$parent.mainboardObj.tit01 }],
      end: this.$parent.mainboardObj.tit06,
      dialogVisible: false,
      parvalObj: {},//产品基本信息
      typesObj:{},
      subtypesObj:{},
      content: "", //商品描述
      windowHeight: "",
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    mainboardInit(this);
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    }
  },
  methods: {
    //点击选择大类
        changeType(val){
          if(val == 'tvmb' || val == 'seniormb'){
            this.parvalObj.subtypes.val = '';
            this.parvalObj.subtypes.select = this.subtypesObj[this.parvalObj.types.val];
          }
        },
    // 删除图片
      deletshow(item){
        this.centerDialogVisible = true;
        this.imgNum = item;
      },
      // 移除照片
      delPictrue(type){
        delPictrue(this,type)
      },
        // 图片上传
        uploadMoreattach(str,pkid) {
          var obj = {
            isAttach : 'pictrue',
            types : 'mainImg',
            tbname : 'mainboard',
            imgIndex : this.imgList[str],
            dom : document.getElementById(str),
            pkid : pkid
          }
          uploadMoreattach(obj)
        },      
    // 点击完成
      carryOut(){
        this.$router.push({ path: "/management/motherboardNorm/lists" });
      },
      // 校验主板名/型号唯一性
    getMainboardCount(boo){
      var obj = {
            mbname: this.parvalObj.mbname.val,
            modnum: this.parvalObj.modnum.val,
            success: response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                if (response.data.flag) {
                  this[boo] = true;
                  var err = boo == 'isMbname' ? this.$parent.mainboardObj.tit13 : this.$parent.mainboardObj.tit14
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
      getMainboardCount(obj,boo)
    },
    // 发送录入信息
    sendInfo() {
        if(this.isMbname) return this.$message.error( this.$parent.mainboardObj.tit13 );
        if(this.isModnum) return this.$message.error( this.$parent.mainboardObj.tit14 );
        if(checkNull(this.parvalObj)){
          // if(this.content == '') return this.$message.error( '描述不能为空');
          var obj = {
            self:this,
            success:response => {
              if (response.data.message.indexOf("addSuccess") > -1) {
                this.pkid = response.data.mbid[0]
                this.isShow = true;
              } else {
                this.$message.error(this.$promptObj.savefail);
              }
            }
          }
          updateMainboard(obj)
        }  
    },
    // 重置字段
    clearContent() {
      for (const key in this.parvalObj) {
        if( key == "types" ) continue
        this.parvalObj[key].val = "";
      }
      this.content = "";
    },
    getHeight() {
      this.windowHeight = this.$config.getHeight(190);
    },
  }
};
</script>

<style scoped>
.btm-content {
  /* min-width: 1000px; */
  background-color: #ffffff;
  padding: 50px;
  padding-bottom: 0px;
  height: 350px;
}
/* 颜色选择器样式 */
.mycolor > div > div {
  height: 34px;
  width: 34px;
  background: url("../../../../static/img/color.png") no-repeat 0px 0px;
  background-size: 32px;
  border: 0px;
  border-radius: 0px;
}
.mycolor > div > div > span {
  display: none;
}
.el-color-dropdown.el-color-picker__panel {
  z-index: 99999999 !important;
}
.btn-group{
  margin-top: 0px;
}
.btm-content-btm{
  padding-bottom: 0px;
}
</style>