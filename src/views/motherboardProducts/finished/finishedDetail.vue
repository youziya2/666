<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
      <div class="details">
        <div class="btm-content">
          <!-- 产品信息 -->
        <div class="title">{{$parent.mbitemObj.tit02}}</div>
        <div class="input" style="padding-bottom:10px">
          <el-row :gutter="20" style="padding:0">
            <el-col :span="6" v-for="(item,index,num) in finishedParvalObj" :key="index">
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible">
                <input class="enter-input" disabled v-model=" mbidObj[item.val] || item.val"> 
              </div>
            </el-col>
          </el-row>
        </div>
        </div>
        <div style = 'min-height:300px;position: relative;border-top: 1px solid gainsboro;padding-top: 60px;'>
          <div class="product-standard" @click="isStandard=!isStandard">
                    <i class="el-icon-d-arrow-right" style="width:20px;"></i>
                    <!-- 主板规则 -->
                    {{$parent.mbitemObj.tit06}}
                    <i :class="isStandard ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                  </div>
          <template v-if="isStandard">
            <div class="d-top">
              <div class="top-left">
                <div class="bigImg">
                  <img :src=" bigimg ? bigimg : './../../../static/img/zhuban.jpg' " :onerror="defaultImg">
                </div>
                <el-row :gutter="10" class='littleImg'>
                  <el-col :span="6" v-for="(item,index) in imgList" :key="index"><img :src=" item.aturl ? item.aturl : './../../../static/img/bigimg.png' "  :onerror="defaultImg"
                    :class="['appdetail-showimg-littleimg',imgactive == index?'active':'']"  @click="clickPic(index,item.aturl)">
                  </el-col>
                </el-row>
              </div>
              <div class="top-right">
                <table class="dettab" cellspacing="0px">
                  <tr>
                    <!-- 基本参数 -->
                    <th colspan="2">{{$parent.mbitemObj.tit07}}</th>
                  </tr>
                  <tr v-for="(item,n,num) in parvalList" :key="num">
                    <template v-if="num < 10">
                      <td class="tabLeft">{{item}}</td>
                      <td class="tabRight">{{parvalObj[n]}} {{item.units || ''}}</td>
                    </template>
                  </tr>
                  <tr>
                    <!-- 产品描述 -->
                    <td class="tabLeft">{{$parent.mbitemObj.tit10}}</td>
                    <td class="tabRight">{{content}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </template>
        </div>
        <div class="btn-group">
          <el-row>
            <!-- 修改 -->
            <el-button type="warning" @click="goxiugai('/management/motherboardProducts/finishedModification/')">{{$buttonObj.update}}</el-button>
            <!-- 关闭 -->
            <el-button @click="dlexiugai('/management/motherboardProducts/finishedList')" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
          </el-row>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mbitemDetail,getMainboardType } from "../../../api/https.js";
import { delDetail,updateDetail,getNowFormatDate } from "../../../api/methods.js";
import { templateDetail,mbitemInit } from "@/init/mainboard.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            isStandard:false,
            list:[{router: this.$parent.mbitemObj.tit07}],
            end:"",
            bigimg: '',
            finishedParvalObj: {},
            parvalList: {},
            typesObj:{},
            subtypesObj:{},
            imgList: [],
            imgactive: 0,
            defaultImg: 'this.src="' + require('../../../../static/img/zhuban.jpg') + '"',
            parvalObj: {},
            mbidObj: {},
            content: '',
            windowHeight:''
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        templateDetail(this);
        mbitemInit(this);
        this.getMainboardType();
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        // 点击修改
        goxiugai(path){
            var arr = updateDetail(path)
            this.replaceroute(arr[0],arr[1]);
        },
        // 关闭详情
        dlexiugai(path){
            var arr = delDetail(path, 'motherboardProducts');
            this.$emit(arr[0],arr[1]);
        },
        getMainboardType(){
          var obj = {
              success:response => {
                if (response.data.message.indexOf("getSuccess") > -1) {
                  var arr = response.data.mbtypeList;
                  this.mbidObj = {};
                  for (let index = 0; index < arr.length; index++) {
                    this.mbidObj[arr[index].fieldvalues.mbid] = arr[index].fieldvalues.mbname; 
                  }
                } else {
                  this.$message.error(this.$promptObj.searchfail);
                }
              }
            }
          getMainboardType(obj)
        },
         // 数据请求
        getData(){
          var id = this.end.substring(this.end.indexOf('@')+1)
          var obj = {
            id : id,
            success:response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                var obj = response.data.mainboardList[0].fieldvalues, imgs = response.data.picturesList || '' , imgObj = {},len = 4, finishedObj = {};
                this.imgList = [];
                len = imgs.length < len ? imgs.length : len
                for (let index = 0; index < len; index++) {
                  imgObj = {}
                  imgObj.atid = imgs[index].fieldvalues.picid;
                  imgObj.aturl = this.baseUrl +  imgs[index].fieldvalues.picurl;
                  this.imgList.push(imgObj)
                }
                finishedObj = response.data.mbitem.fieldvalues;
                this.finishedParvalObj.mbid.val = finishedObj.mbid;
                this.finishedParvalObj.series.val = finishedObj.series;
                this.finishedParvalObj.mac.val = finishedObj.mac;
                this.parvalObj = obj;
                obj.imgLsit = this.imgList
                obj.finishedObj = finishedObj
                sessionStorage.setItem(response.data.mbitid[0],JSON.stringify(obj))
                obj.subtypes = this.subtypesObj[obj.types][obj.subtypes]
                obj.types = this.typesObj[obj.types]
                this.content = obj.remark
              } else {
                this.$message.error(this.$promptObj.searchfail);
              }
            }
          }
          mbitemDetail(obj)
        },
        cutimg(path){
            this.bigimg = path;
        },
        loadsx(){
            this.end  = this.$route.params.id;
            this.isStandard = false;
            this.getData()
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>
<style scoped>
.details {
  overflow: hidden;
  width: 95%;
  padding: 50px;
  background-color: #fff;
}
.product-standard{
    position: absolute;
    cursor: pointer;
    right: 0px;
    top: 20px;
    z-index: 10000;
}
.d-top {
  width: 100%;
  overflow: hidden;
}
.top-left {
  width: 45%;
  float: left;
}
.top-right {
  float: right;
  width: 55%;
}
.bigImg img {
    width: 90%;
    height: auto;
    border: 1px solid rgba(241, 244, 246, 1);
}
.littleImg {
  width: 92%;
  margin-top: 2%;
}
.littleImg img {  
    width: 95%;
    height: auto;
    border: 1px solid rgba(241, 244, 246, 1);
}
.dettab {
  width: 100%;
}
.dettab th {
  text-align: left;
  height: 60px;
  line-height: 60px;
  background-color: #f1f4f6;
  padding-left: 20px;
  color: #333;
}
.dettab td {
  border-left: 1px solid #f1f4f6;
  border-bottom: 1px solid #f1f4f6;
  padding: 12px 0px;
  padding-left: 20px;
  font-size: 14px;
  padding-right: 10px;
}
.tabLeft {
  width: 30%;
  color: #333;
}
.tabRight {
  width: 70%;
  border-right: 1px solid #f1f4f6;
  color: #666;
}
/* 新增的数据样式 */
.ican {
  margin-top: 80px;
  width: 100%;
  overflow: hidden;
}
.ican > div {
  width: 22%;
  height: 390px;
  padding-left: 30px;
  float: left;
  position: relative;
}
.ican > div:not(.neicun) {
  border-right: 1px solid #f1f4f6;
}
.ican > div .ican-title {
  font-size: 20px;
  color: #333;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: 15%
}
.ican .el-progress {
  margin: 0px auto;
}
.jdtxm {
  width: 217px;
  height: 20px;
  margin: 0px auto;
  margin-top: 30px;
  overflow: hidden;
}
.jdtxm.jdtxm2 {
  margin-top: 15px;
}
.jdtxm > .diyige {
  width: 40px;
  height: 20px;
  display: inline-block;
  margin-right: 20px;
}
.jdtxm div {
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
}
/* 进度条内样式 */
.neibu {
  margin: 0px auto;
  width: 62.5%;
  border-radius: 50%;
  background-color: #f9f9f9;
  height: 136px;
}
.neibu > div {
  text-align: center;
}
.neibu .neibu-top {
  padding-top: 48px;
  color: #333;
  font-size: 27px;
  line-height: 27px;
  margin-bottom: 20px;
}
.neibu .neibu-btm {
  color: #999;
  font-size: 14px;
}
/* 处理器与内存信息样式 */
.chuli-left,
.chuli-right {
  display: inline-block;
  width: 50%
}
.chuli-left {
  color: #999;
  font-size: 14px;
  line-height: 38px;
  text-align: right;
  width: 30%;
  margin: 0 10% 0 5%;
}
.chuli-left > div {
  color: #999;
  font-size: 14px;
  line-height: 38px;
  text-align: right;
}
.chuli-right > div {
  color: #333;
  font-size: 14px;
  line-height: 38px;
  text-align: left;
}
.xinzeng-inter {
  width: 15%;
  position: absolute;
  top: 20px;
  right: 20px;
}
.xinzeng-geensten {
  width: 18%;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
