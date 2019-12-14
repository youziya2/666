<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar :style="{height:windowHeight}">
      <div class="btm-content">
        <!-- 产品参数 -->
        <div class="title">{{$parent.templateObj.tit04}}</div>
        <div class="input">
          <el-row :gutter="20" style="padding:0">
            <el-col
              :span="6"
              v-for="(item,index) in parvalObj"
              :key="index"
              style="margin-bottom: 24px;"
            >
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible" :class="{'must':item.must, 'mycolor': index == 'colors'}">
                <template v-if="index == 'colors'">
                  <el-color-picker
                    :style="'text-align:right;cursor:auto;background-color:'+item.val"
                    class="enter-input"
                    v-model="item.val"
                  ></el-color-picker>
                </template>
                <template v-else-if="index == 'savetime'">
                  <el-date-picker
                    v-model="item.val"
                    style="width:100%"
                    type="datetime"
                    default-time="12:00:00"
                  ></el-date-picker>
                </template>
                <template v-else-if="item.select">
                  <el-select v-model="item.val" style="width:100%" :placeholder="$parent.templateObj.tit18">
                    <el-option
                      v-for="(n,val) in item.select"
                      :key="val"
                      :label="n"
                      :value="val"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <template v-if ="index == 'gdcname'">
                    <input class="enter-input" v-model="item.val" @keyup = 'getGoodsCount'>
                  </template>
                  <template v-else>
                    <input class="enter-input"  v-model="item.val" >
                  </template>       
                </template>
                <span class="units" v-if="item.units">{{item.units}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="xz-content">
         <!-- CPU -->
        <div class="title">CPU</div>
        <div class="input">
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="(item,index) in cpuObj"
              :key="index"
              style="margin-bottom: 24px;"
            >
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible" :class="{'must':item.must}">
                <template v-if="item.select">
                  <el-select v-model="item.val" style="width:100%" :placeholder="$parent.templateObj.tit18">
                    <el-option
                     v-for="(n,val) in item.select"
                      :key="val"
                      :label="n"
                      :value="val"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <input class="enter-input" v-model="item.val">
                </template>
                <span class="units" v-if="item.units">{{item.units}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="xz-content">
        <!-- 内存 -->
        <div class="title">{{$parent.templateObj.tit05}}</div>
        <div class="input">
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="(item,index) in memeryObj"
              :key="index"
              style="margin-bottom: 24px;"
            >
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible" :class="{'must':item.must}">
                <template v-if="item.select">
                  <el-select v-model="item.val" style="width:100%" :placeholder="$parent.templateObj.tit18">
                    <el-option
                      v-for="(n,val) in item.select"
                      :key="val"
                      :label="n"
                      :value="val"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <input class="enter-input" v-model="item.val">
                </template>
                <span class="units" v-if="item.units">{{item.units}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="btm-content-btm">
        <!-- 产品描述(必填) -->
        <div class="title">{{$parent.templateObj.tit16}}</div>
        <div class="input">
          <textarea class="enter-textare" rows="5" cols="160" resize="none" v-model="content"/>
        </div>
      </div>
      <div class="btm-content-btm">
        <!-- 默认空间配置 -->
        <div class="title">{{$parent.templateObj.tit06}}</div>
        <div>
          <sliderm :fatherObj="fatherObj" @fromSpace="getSpace"></sliderm>
        </div>
      </div>
      <div class="btm-content-btm">
        <!-- 产品图片 -->
        <template>
            <div class="title">{{$parent.templateObj.tit17}}</div>
        </template>
        <div class="upload">
          <div class="demo-input-suffix" style="padding-top: 15px;">
            <div class="enteringimgupload">
              <form
                data-v-316d5d8e
                enctype="multipart/form-data"
                class="uploadForm"
                style="position: relative;"
              >
                <div class="demo-input-suffix" style="padding-top: 15px;">
                  <div class="enteringimgupload">
                    <form
                      enctype="multipart/form-data"
                      class="uploadForm"
                      style="position: relative;"
                    >
                      <div class="file-imgs" v-for="( item,index)  in imgArr" :key="index">
                        <input
                          type="file"
                          :id="item"
                          :name="item"
                          accept="image/jpeg, image/png, image/gif, image/jpg"
                          multiple="multiple"
                          @change="uploadMoreattach(item,gdid)"
                        >
                        <div class="show-imgs">
                          <img v-if=" imgList[item].imgpath " :src="imgList[item].imgpath" @mouseenter = "isClear=index">
                          <!-- 删除 -->
                          <div :class=" isClear == index ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                              <span
                                class="del-file-imgs"
                                v-if=" imgList[item].imgpath  && imgList[item].imgpath != '../../../static/img/timg.gif'"
                                @click="deletshow(item)"
                              ><i class="el-icon-delete fil-clear-icon"></i>
                              </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- 删除提示 -->
          <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
            <span>{{$promptObj.delwarn}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
              <el-button type="primary" @click="delPictrue('pic')">{{$buttonObj.sure}}</el-button>
            </span>
          </el-dialog>
          <div class="btn-group">
            <el-row>
              <el-button type="warning" @click="sendInfo">{{$buttonObj.save}}</el-button>
              <el-button
                :style="{backgroundColor:colorselects,color:'#fff'}"
                @click="cancel('/management/productList/productDetails/')"
              >{{$buttonObj.cancel}}</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { addProduct,delPictrue,uploadMoreattach,getGoodsCount } from "../../../api/https.js";
import { getNowFormatDate, updateDetail, checkNull } from "../../../api/methods.js";
import sliderm from "./../../../components/slider";
import { changeInit } from "@/init/product.js";
export default {
  inject: ["replaceroute"],
  data() {
    return {
      centerDialogVisible: false, //删除图片的警示框
      pkidList: {
        //图片ID
        img01: "",
        img02: "",
        img03: "",
        img04: ""
      },
      picid: "", //图片
      imgNum: "", //标记删除的图片
      isClear:-1,
      imgList: {
        //图片列表
        img01: { imgid: "", imgpath: "" },
        img02: { imgid: "", imgpath: "" },
        img03: { imgid: "", imgpath: "" },
        img04: { imgid: "", imgpath: "" }
      },
      imgArr: ["img01", "img02", "img03", "img04"],
      gdid: "", //商品UUid
      sTime: "", //日期
      list: [{ router:this.$parent.templateObj.tit01 }],
      end: this.$parent.templateObj.tit20,
      input2: "",
      textarea2: "",
      radio: true,
      dialogImageUrl: "",
      parvalObj: {},
      cpuObj: {},
      memeryObj: {},
      clouddisk: "", //云盘大小
      content: "", //商品描述
      windowHeight: "",
      fatherObj: {
        id: "01",
        isShow: true,
        spaceNum: 0,
        timeNum: -1,
        removeTime: true
      }
    };
  },
  components: {
    sliderm
  },
  created() {
    this.getInfo();
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    // enterSure(this.sendInfo); //添加键盘回车事件
  },
  computed: {
    colorselects() {
      return this.$route.matched[0].meta.colorselect;
    }
  },
  methods: {
    // 获取子页面传过来的值
    getSpace(data) {
      this.clouddisk = data;
    },
    getTime(data) {
      this.cdlimit = data;
    },
    // 是否删除图片
    deletshow(item) {
      this.centerDialogVisible = true;
      this.imgNum = item;
    },
    // 移除照片
    delPictrue(type) {
      delPictrue(this, type);
    },
    // 图片上传
    uploadMoreattach(str, pkid) {
      var obj = {
        isAttach: "pictrue",
        types: "mainImg",
        tbname: "goods",
        imgIndex: this.imgList[str],
        dom: document.getElementById(str),
        pkid: pkid
      };
      uploadMoreattach(obj);
    },
    getInfo() {
      this.gdid = this.$route.params.id;
      this.gdid = this.gdid.substring(this.gdid.indexOf("@") + 1);
      var obj = JSON.parse(sessionStorage.getItem(this.gdid));
      var arr = obj.imgList || [], str = "img0";
      for (let index = 0; index < arr.length; index++) {
        this.imgList[str + (index + 1)].imgid = arr[index].atid;
        this.imgList[str + (index + 1)].imgpath = arr[index].aturl;
      }
      var setVal = object => {
        for (const key in object) {
          this[key] = obj[key] ? obj[key] : "";
        }
      };
      this.content = obj.content;
      this.clouddisk = obj.clouddisk;
      this.fatherObj.spaceNum = obj.clouddisk;
      changeInit(this, obj);
    },
      // 检验成品名称
    getGoodsCount(){
      var object = JSON.parse(sessionStorage.getItem(this.gdid));
      if ( this.parvalObj.gdcname.val == object.gdcname) return this.isHave = false;
      var obj = {
            gdcname: this.parvalObj.gdcname.val,
            success: response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                if (response.data.flag) {
                  this.isHave = true;
                  this.$message.error( this.$parent.templateObj.tit27 );
                } else {
                  this.isHave = false;
                }
              } else {
                // '网络繁忙'
                this.$message.error(this.$buttonObj.busy);
              }
            }
          }
      getGoodsCount(obj)
    },
    // 发送修改信息
    sendInfo() {
      if(this.isHave) return this.$message.error( this.$parent.templateObj.tit27 );
      if (checkNull(this.parvalObj, this.cpuObj, this.memeryObj)) {
        if (this.content == "")  return this.$message.error( this.$parent.templateObj.tit26 );
        this.parvalObj.savetime.val = getNowFormatDate(this.parvalObj.savetime.val);
        var obj = {
          self: this,
          success: response => {
            if (response.data.message.indexOf("editSuccess") > -1) {
              this.cancel("/management/productList/productDetails/");
            } else {
              this.$message.error(this.$promptObj.savefail);
            }
          }
        };
        addProduct(obj, true);
      }
    },
    // 取消修改
    cancel(path) {
      var arr = updateDetail(path);
      this.replaceroute(arr[0], arr[1]);
    },
    getHeight() {
      this.windowHeight = this.$config.getHeight(190);
    },
    changecontent() {
      this.getInfo();
    }
  },
  watch: {
    $route: "changecontent"
  }
};
</script>

<style scoped>
.btm-content {
  /* min-width: 1000px; */
  background-color: #ffffff;
  padding: 50px;
  padding-bottom: 0px;
  height: 300px;
}
.discrible {
  display: inline-block;
  width: 55%;
  padding-left: 15px;
  position: relative;
}
.must {
  background: url("../../../../static/img/must.png") no-repeat center left;
  background-size: 8px;
}
.enter-input {
  width: 100%;
  font-size: inherit;
  vertical-align: middle;
  height: 40px;
  line-height: 40px;
  outline: 0;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: rgb(248, 248, 248);
  text-indent: 5px;
  cursor: pointer;
}
.el-input__prefix {
  display: none !important;
}
.enter-textare:focus,
.enter-input:focus {
  border-color: rgba(82, 168, 236, 0.8);
  outline: 0;
  outline: thin dotted \9;
  -webkit-box-shadow: inset 0 1px 1px rgba(187, 97, 97, 0.075),
    0 0 8px rgba(67, 119, 238, 0.6);
  -moz-box-shadow: inset 0 1px 1px rgba(187, 97, 97, 0.075),
    0 0 8px rgba(67, 119, 238, 0.6);
  box-shadow: inset 0 1px 1px rgba(187, 97, 97, 0.075),
    0 0 8px rgba(67, 119, 238, 0.6);
}
.enter-textare {
  padding: 0 5px;
  line-height: 30px;
  font-size: inherit;
  outline: 0;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: rgb(248, 248, 248);
  text-indent: 5px;
  cursor: pointer;
}
.el-col {
  padding: 0px !important;
}
.units {
  position: absolute;
  font-size: 14px;
  color: #999;
  right: 10px;
  top: 0px;
}
.xz-content {
  /* min-width: 1000px; */
  background-color: #ffffff;
  padding: 50px;
  padding-bottom: 0px;
  height: 190px;
}
.title {
  font-size: 20px;
  font-weight: 600;
}
.elinput {
  margin-right: 15% !important;
  width: 55% !important;
}
.input {
  line-height: 40px;
  padding: 20px 30px;
  width: 98%;
  overflow: hidden;
}
.el-textarea {
  width: 60%;
}
.btm-content-btm {
  padding: 50px;
  padding-top: 0px;
  padding-bottom: 20px;
  background-color: #ffffff;
}
.upload {
  overflow: hidden;
  padding: 20px 30px;
}
.el-upload {
  margin-top: 30px;
  margin-right: 20px;
}
.enteringimgupload > div {
  display: inline-block;
  margin-bottom: 25px;
  margin-right: 20px;
}
.entering-uploadshuoming {
  width: 148px;
  text-align: center;
  margin-top: 10px;
  color: #666;
  font-size: 14px;
  line-height: 14px;
}
.el-upload {
  margin-top: 30px;
  margin-right: 20px;
}
.el-upload-list {
  display: none;
}
/* 文件选择框 */
.file {
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 4px;
  /* padding: 4px 12px; */
  overflow: hidden;
  border: 1px dashed #dcdfe6;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  background: url("../../../../static/img/add.png") 50% no-repeat;
  background-size: 50px;
  width: 180px;
  height: 180px;
}
.file input {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0;
}
.img {
  width: 180px;
  position: absolute;
  top: 0;
}
.img img {
  width: 100%;
  height: 180px;
  /* height: auto;
    max-height: 180px; */
}
.del-img {
  position: absolute;
  right: 15px;
  top: 8px;
  color: rgb(173, 58, 58);
  font-weight: 700;
  cursor: pointer;
}
</style>