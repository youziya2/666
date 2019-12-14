<template>
  <div class="app-content">
    <el-scrollbar :style="{height:windowHeight}">
      <template v-if="!isShow">
        <!-- 应用信息 -->
        <div class="app-title" style="margin-bottom: 40px;">{{ $parent.$parent.appInit.tit02 }}</div>
        <div class="app-input">
          <div>
             <div :class=" (index=='remark' || index=='content') ? 'demo-textatea-suffix' : 'demo-input-suffix' " v-for="(item,index) in appObj" :key="index" style="margin-bottom:30px">
                        <span :class="{ 'demo-textatea-title' : (index=='remark' || index=='content') , 'dis-title' : !(index=='remark' || index=='content')}">{{item.name}}</span>
                        <template v-if="item.select"> 
                            <el-select v-model="item.val" :placeholder="$buttonObj.select">
                                <el-option
                                v-for="(val,it) in item.select"
                                :key="it"
                                :label="val"
                                :value="it">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-else-if="index=='savetime'">   
                            <el-date-picker
                                style="margin-left: 15px;width:35%"
                                v-model="item.val"
                                type="date"
                                :placeholder="item.name"
                            ></el-date-picker>
                        </template>
                        <template v-else-if="index=='content' || index=='remark'">   
                          <textarea style="width: 67.5%;padding: 5px 15px;
                          line-height: 1.5;
                          -webkit-box-sizing: border-box;
                          box-sizing: border-box;
                          font-size: 14px;
                          color: #606266;
                          background-color: #F8F8F8;
                          border: 1px solid #DCDFE6;
                          border-radius: 4px;
                          outline-color: rgb(67, 119, 238);" :rows="index=='remark'? 6: 4" v-model = "item.val"></textarea>
                      </template>
                        <template v-else>
                            <template v-if ="index == 'appcname' || index == 'appename'">
                              <el-input :disabled="isShow" v-model="item.val" @keyup.native = 'getAppsCount(index)'></el-input>
                            </template>
                            <template v-else-if ="index == 'urls' ">
                              <el-input :disabled="isShow" v-model="item.val" style="width: 70%" @keyup.native = 'getAppsCount(index)'></el-input>
                            </template>
                            <template v-else>
                              <el-input :disabled="isShow" v-model="item.val" ></el-input>
                            </template>
                        </template> 
                        <span v-if = "index == 'appename'" style="color: red">({{ $parent.$parent.appInit.tit13 }})</span>
                    </div>

          </div>
        </div>
      </template>
      <template v-else>
        <div style="display:inline-block;margin-right: 137px;">
          <!-- 应用安装包 -->
          <div class="app-title">{{ $parent.$parent.appInit.tit07 }}</div>
          <div class="app-input" style="margin-bottom: 40px;">
            <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
              <div class="file-imgs">
                <input
                  type="file"
                  id="img07"
                  name="img07"
                  accept=".zip"
                  multiple="multiple"
                  @change="uploadMoreattach('img07',pkid)"
                >
                <div class="show-imgs">
                  <img v-if=" imgList.img07.imgpath " :src="imgList.img07.imgpath" @mouseenter = "isClear=6">
                  <!-- 删除 -->
                  <div :class=" isClear == 6 ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                    <span
                      class="del-file-imgs"
                      v-if=" imgList.img07.imgpath  && imgList.img07.imgpath != '../../../static/img/timg.gif'"
                      @click="deletshow('img07','fil')"
                    ><i class="el-icon-delete fil-clear-icon"></i></span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style="display:inline-block;width:30%">
          <!-- 应用图标 -->
          <div class="app-title">{{ $parent.$parent.appInit.tit08 }}</div>
          <div class="app-input" style="margin-bottom: 40px;">
            <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
              <div class="file-imgs">
                <input
                  type="file"
                  id="img08"
                  name="img08"
                  accept="image/jpeg, image/png, image/gif, image/jpg"
                  multiple="multiple"
                  @change="uploadMoreattach('img08',pkid)"
                >
                <div class="show-imgs">
                  <img v-if=" imgList.img08.imgpath " :src="imgList.img08.imgpath" @mouseenter = "isClear=7">
                  <!-- 删除 -->
                  <div :class=" isClear == 7 ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                    <span
                      class="del-file-imgs"
                      v-if=" imgList.img08.imgpath  && imgList.img08.imgpath != '../../../static/img/timg.gif'"
                      @click="deletshow('img08')"
                    ><i class="el-icon-delete fil-clear-icon"></i></span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- 应用图片 -->
        <div class="app-title">{{ $parent.$parent.appInit.tit09 }}</div>
        <div class="app-input">
          <div class="demo-input-suffix" style="padding-top: 15px;">
            <div class="appimgupload">
              <div class="app-uploadclass">
                <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
                  <div
                    class="file-imgs"
                    v-for="( item,index)  in imgArr"
                    :key="index"
                    v-show=" index < 6 "
                  >
                    <input
                      type="file"
                      :id="item"
                      :name="item"
                      accept="image/jpeg, image/png, image/gif, image/jpg"
                      multiple="multiple"
                      @change="uploadMoreattach(item,pkid)"
                    >
                    <div class="show-imgs">
                      <img v-if=" imgList[item].imgpath " :src="imgList[item].imgpath" @mouseenter = "isClear=index">
                      <!-- 删除 -->
                      <div :class=" isClear == index ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                        <span
                          class="del-file-imgs"
                          v-if=" imgList[item].imgpath  && imgList[item].imgpath != '../../../static/img/timg.gif'"
                          @click="deletshow(item)"
                        ><i class="el-icon-delete fil-clear-icon"></i></span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- 删除警告框 -->
        <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
          <span>{{ $promptObj.delwarn }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
            <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
          </span>
        </el-dialog>
      </template>
      <div class="btn-group">
        <el-row>
          <!-- 下一步 -->
          <template v-if="!isShow">
            <el-button type="warning" @click.native="sendInfo">{{this.$buttonObj.next}}</el-button>
            <el-button :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.cancel}}</el-button>
          </template>
          <!-- 完成 -->
          <template v-else>
            <el-button
              :style="{backgroundColor:colorselects,color:'#fff'}"
              @click.native="carryOut"
            >{{$buttonObj.complete}}</el-button>
          </template>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { updateApp,delPictrue,uploadMoreattach,getAppsCount } from "./../../../api/https.js";
import {  getNowFormatDate,checkNull } from "./../../../api/methods.js";
import {  enterApp } from "@/init/app.js";
export default {
  data() {
    return {
      isShow: false,
      isHave: false,//中文名称是否存在
      isEAPP: false,//英文名称是否存在
      isClear: -1,
      filType: "pic", //文件类型
      appObj: {},
      centerDialogVisible: false, //删除图片的警示框
      imgNum: "",
      imgList: {
        //图片列表
        img01: { imgid: "", imgpath: "" },
        img02: { imgid: "", imgpath: "" },
        img03: { imgid: "", imgpath: "" },
        img04: { imgid: "", imgpath: "" },
        img05: { imgid: "", imgpath: "" },
        img06: { imgid: "", imgpath: "" },
        img07: { imgid: "", imgpath: "" },
        img08: { imgid: "", imgpath: "" }
      },
      imgArr: [
        "img01",
        "img02",
        "img03",
        "img04",
        "img05",
        "img06",
        "img07",
        "img08"
      ],
      pkid: "", //商品ID
      windowHeight: ""
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    enterApp(this)
    this.appObj.savetime.val = getNowFormatDate(new Date(), true);
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    }
  },
  methods: {
    // 删除图片
    deletshow(item, str) {
      if (str == "fil") this.filType = "fil";
      else this.filType = "pic";
      this.centerDialogVisible = true;
      this.imgNum = item;
    },
    // 移除附件/图片
    delPictrue() {
      delPictrue(this, this.filType);
    },
    // 附件/图片上传
    uploadMoreattach(str,pkid) {
      var obj = {
            isAttach : str == 'img07' ? 'attach' : "pictrue",
            types : str == 'img07' ? 'apps' : (str == 'img08' ? 'appImg' : "mainImg"),
            tbname : "apps",
            imgIndex : this.imgList[str],
            dom : document.getElementById(str),
            pkid : pkid
          }
          uploadMoreattach(obj)
    },
    // 点击完成
    carryOut() {
      this.$router.push({ path: "/management/appList/applists" });
    },
    // 检验名称
    getAppsCount(str){
      var obj = {
            appcname: str == 'appcname' ? this.appObj.appcname.val : '',
            appename: str == 'appename' ? this.appObj.appename.val : '',
            success: response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                if (response.data.flag) {
                  str == 'appcname' ? this.isHave = true : this.isEAPP = true;
                  this.$message.error(str == 'appcname' ?  this.$parent.$parent.appInit.tit14 : this.$parent.$parent.appInit.tit15 );
                } else {
                  str == 'appcname' ? this.isHave = false : this.isEAPP = false;
                }
              } else {
                // '网络繁忙'
                this.$message.error(this.$buttonObj.busy);
              }
            }
          }
      getAppsCount(obj)
    },
    // 发送录入数据
    sendInfo() {
      if(this.isHave) return this.$message.error( this.$parent.$parent.appInit.tit14 );
      if(this.isEAPP) return this.$message.error( this.$parent.$parent.appInit.tit15 );
      if ( checkNull(this.appObj)) {
        this.appObj.savetime.val = getNowFormatDate(this.appObj.savetime.val, true);
        var obj = {
          self:this,
          success:response => {
            if (response.data.message.indexOf("addSuccess") > -1) {
              this.pkid = response.data.apps.fieldvalues.appid
              this.isShow = true;
            } else {
              this.$message.error(this.$promptObj.savefail);
            }
          }
        }
        updateApp(obj)
      }
    },
    getHeight() {
      this.windowHeight = this.$config.getHeight(240);
    }
  }
};
</script>


<style scoped>
.appimgupload {
  overflow: hidden;
  width: 100%;
  margin-bottom: 15px;
}
.appimgupload > div {
  display: inline-block;
  margin-bottom: 25px;
}
.appimgupload > div > .el-input {
  width: 65% !important;
  margin: 0px !important;
}
.appimgupload > div > .el-button {
  margin-left: 2%;
  padding: 10px 2%;
}
.el-upload-list {
  display: none;
}
.dis-title {
  display: inline-block;
  width: 18%;
}
.content-title {
  display: inline-block;
  width: 8.5%;
  text-align: left;
  vertical-align: top;
}
/* .el-textarea{
  width: 69.5%;
} */
</style>
