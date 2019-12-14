<template>
  <div>
    <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
    <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
      <div class="details">
        <div class="btm-content">
          <!-- 产品信息 -->
        <div class="title">{{$parent.finishedObj.tit05}}</div>
        <div class="input" style="padding-bottom:40px">
          <el-row :gutter="20" style="padding:0;">
            <el-col :span="6" v-for="(item,index,num) in finishedParvalObj" :key="num">
              <div class="grid-content bg-purple">{{item.name}}</div>
              <div class="discrible">
                <template v-if="item.select">
                  <el-select
                    disabled
                    v-model="item.val"
                    style="width:100%;cursor:not-allowed"
                    :placeholder="templateObj.tit18"
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
                  <input class="enter-input"  style="cursor:not-allowed" disabled v-model="item.val">
                </template>
                <template v-if=" num == Object.keys(finishedParvalObj).length -1">
                  <div class="product-standard" @click="isStandard=!isStandard">
                    <i class="el-icon-d-arrow-right" style="width:20px;"></i>
                    <!-- 产品标准 -->
                    {{templateObj.tit01}}
                    <i :class="isStandard ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                  </div>
                </template>               
              </div>
            </el-col>
          </el-row>
        </div>
        </div>
        <div v-if="isStandard">
          <div class="d-top">
            <div class="top-left">
              <div class="bigImg">
                <img :src=" bigimg ? bigimg : './../../../static/img/bigimg.png' " :onerror="defaultImg">
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
                  <th colspan="2">{{templateObj.tit11}}</th>
                </tr>
                <tr v-for="(item,n,num) in parvalObj" :key="num">
                  <template v-if="num < 12">
                    <td class="tabLeft">{{item.name}}</td>
                    <td class="tabRight">{{item.val}} {{item.units || ''}}</td>
                  </template>
                </tr>
                <tr>
                  <!-- 产品描述 -->
                  <td class="tabLeft">{{templateObj.tit22}}</td>
                  <td class="tabRight">{{content}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="ican">
            <!-- 云盘使用统计，存储使用统计 -->
            <div v-for="(val,n) in userArr" :key="n" :class="val.yunpan">
              <div class="ican-title">{{ val.name }}</div>
              <div style="text-align: center;">
                <el-progress
                  :stroke-width="15"
                  type="circle"
                  :percentage="Math.floor((val.used/val.total)*100)"
                  :width="217"
                  :color="colorselects"
                >
                  <div class="neibu">
                    <div class="neibu-top">{{ val.total }}GB</div>
                    <!-- 总容量 -->
                    <div class="neibu-btm">{{templateObj.tit23}}</div>
                  </div>
                </el-progress>
                <div class="jdtxm">
                  <div :style="{backgroundColor:colorselects}" class="diyige"></div>
                  <!-- 在用空间 -->
                  <div style="color:#999999;">{{templateObj.tit24}}</div>
                  <div style="float:right;color:#333;">{{ val.used }}GB</div>
                </div>
                <div class="jdtxm2 jdtxm">
                  <div style="backgroundColor:#EAEEF8" class="diyige"></div>
                  <!-- 剩余空间 -->
                  <div style="color:#999999;">{{templateObj.tit25}}</div>
                  <div style="float:right;color:#333;">{{ val.total - val.used }}GB</div>
                </div>
              </div>
            </div>
            <div class="chuli">
              <img src="../../../../static/img/inter.png" class="xinzeng-inter">
              <!-- 处理器信息 -->
              <div class="ican-title">{{templateObj.tit14}}</div>
              <div v-for="(val,n) in cpuObj" :key="'cpuname'+n">
                <span class="chuli-left">{{val.name}}</span>
                <span class="chuli-right">{{ n == 'cpubits' ? options01[val.val] : val.val}} {{val.units || ''}}</span>
              </div>
            </div>
            <div class="neicun">
              <!-- 内存信息 -->
              <div class="ican-title">{{templateObj.tit15}}</div>
              <img src="../../../../static/img/geensten.png" class="xinzeng-geensten">
              <div v-for="(val,n) in memeryObj" :key="'mmname'+n">
                <span class="chuli-left">{{ val.name }}</span>
                <span class="chuli-right">{{ val.val }} {{val.units || ''}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else style="min-height:290px"></div>
        <div class="cut"></div>
        <div class="btn-group">
          <el-row>
            <!-- 修改 -->
            <el-button type="warning" @click="goxiugai('/management/productList/finishedModification/')">{{$buttonObj.update}}</el-button>
            <!-- 关闭 -->
            <el-button @click="dlexiugai('/management/productList/finishedList')" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
          </el-row>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { getFinishedDetail } from "../../../api/https.js";
import { delDetail,updateDetail,getNowFormatDate } from "../../../api/methods.js";
import { detailInit,finishedEnterInit,templateInit } from "@/init/product.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            text: '',
            isStandard:false,
            imgList: [],
            imgactive: 0,
            defaultImg: 'this.src="' + require('../../../../static/img/bigimg.png') + '"',
            list:[{router: this.$parent.finishedObj.tit06}],
            end:"",
            bigimg: '',
            userArr:[
                {name: "",total:1000,used:31,cla:'yunpan'},
                {name: '',total:29,used:17,cla:'chucun'}
            ],
            templateObj: {},
            finishedParvalObj: {},
            parvalObj: {},
            cpuObj: {},
            memeryObj: {},
            content: '',
            windowHeight:'',
            options01: {
                'yes': "是",
                'no': "否"
              },
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        templateInit(this);
        detailInit(this);
        finishedEnterInit(this,{});
        this.userArr[0].name = this.templateObj.tit12;
        this.userArr[1].name = this.templateObj.tit13;
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
            var arr = delDetail(path, 'finishedlist')
            this.$emit(arr[0],arr[1]);
        },
         // 数据请求
        getData(){
          var id = this.end.substring(this.end.indexOf('@')+1)
          var obj = {
            id : id,
            success:response => {
              if (response.data.message.indexOf("getSuccess") > -1) {
                var obj = response.data.goods.fieldvalues, imgs = response.data.picturesList || '' ,imgObj = {},len = 4;
                len = imgs.length < len ? imgs.length : len;
                this.imgList = []
                for (let index = 0; index < len; index++) {
                  imgObj = {}
                  imgObj.atid = imgs[index].fieldvalues.picid;
                  imgObj.aturl = this.baseUrl +  imgs[index].fieldvalues.picurl;
                  this.imgList.push(imgObj)
                }
                obj.imgLsit = this.imgList
                obj.finishedObj = response.data.goodsitem.fieldvalues
                for (const key in this.finishedParvalObj) {
                  if (key == 'gdid') {
                    this.finishedParvalObj[key].val = obj.gdcname
                  } else {
                    this.finishedParvalObj[key].val = obj.finishedObj[key]
                  }
                }
                var clouddisk = obj.clouddisk
                this.userArr[0].used = clouddisk.substring(0,clouddisk.length-1)
                obj.savetime = getNowFormatDate(new Date(obj.savetime.time))
                sessionStorage.setItem(response.data.gditid[0],JSON.stringify(obj))
                for (const key in this.parvalObj) {
                  this.parvalObj[key].val = obj[key]
                }
                for (const key in this.cpuObj) {
                  this.cpuObj[key].val = obj[key]
                }
                for (const key in this.memeryObj) {
                  this.memeryObj[key].val = obj[key]
                }
                this.content = obj.content
              } else {
                this.$message.error(this.$promptObj.searchfail);
              }
            }
          }
          getFinishedDetail(obj)
           
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
    top: 60px;
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
  width: 240px;
  height: 20px;
  text-align: left;
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
