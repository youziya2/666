<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="width:100%;overflow-x: hidden;background:#fff;" :style="{height:windowHeight}" id="add">
            <div class="conferenceDetailContent">
                <div style="overflow: hidden;">
                    <div class="zcrimg">
                        <img src="../../../static/img/current.png">
                        <div class="zcrname">{{allContent.keyspea.name}}：{{allContent.keyspea.val}}</div>
                       <div style="  text-align: center; margin-top: 30px;height: 35px;">
                       <div style="width: 35%;float:left;height: 47px; text-align:right">  <img src="../../../static/img/shexiangtou.png" style="width: 40px; height: 35px;margin-top: 0px;line-height: 47px;"> </div>
                       <div style="width: 64%;float:right; text-align:left;margin-left: 1%;">    <span style="cursor: pointer; border-bottom:1px solid #4377EE;line-height: 35px; font-size: 20px;" @click="meetings()" showConfirmButton=false>观看会议现场</span> </div>
                        </div>
                        <!-- <div><el-dialog                                                                         
                            :visible.sync="dialogVisible"
                            width="800px"                          
                            :modal=false
                            top=30vh                          
                            >                           
                          </el-dialog> 
                          </div> -->
                    </div>
                    <div class="confereceDetailTable">
                        <table spellcheck="0">
                            <tr>
                                <th colspan="2">{{allContent.mttile.val}}
                                    <span class="zhuangtai" :style=" { backgroundColor : filnameColor[meetingStates]}">{{filname[meetingStates/1 + 1]}}</span>
                                </th>
                            </tr>
                            <tr>
                                <td>{{allContent.types.name}}</td>
                                <td class="tab-right">{{options[allContent.types.val]}}</td>
                            </tr>
                            <tr>
                                <td>{{allContent.starttime.name}}</td>
                                <td class="tab-right">{{allContent.starttime.val}}</td>
                            </tr>
                            <tr>
                                <td>{{allContent.endtime.name}}</td>
                                <td class="tab-right">{{allContent.endtime.val}}</td>
                            </tr>
                            <tr>
                                <td>{{allContent.address.name}}</td>
                                <td class="tab-right">{{allContent.address.val}}</td>
                            </tr>
                            <tr>
                                <td>{{allContent.content.name}}</td>
                                <td class="tab-right">
                                    <el-scrollbar style="width:100%;min-height:150px;overflow-x: hidden;">
                                       {{allContent.content.val}}
                                    </el-scrollbar>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="conferenceTitle">{{allContent.compere.name}}</div>
                <div class="conferenceFenge"></div>
                <div class="zcjimgList">
                    <template v-if="allContent.compere.val">
                        <el-scrollbar style="width:100%;height:200px;">
                            <div style="white-space: nowrap;">
                                <div class="zcjimg">
                                    <img  src="../../../static/img/current.png">
                                    <span>{{allContent.compere.val}}</span>
                                </div>
                            </div>
                        </el-scrollbar>
                    </template>
                    <!-- 暂无 -->
                    <template v-else>
                        <span>{{$buttonObj.noData}}</span>
                    </template>                  
                </div>
                <div class="conferenceTitle">{{allContent.value5.name}}</div>
                <div class="conferenceFenge"></div>
                <div class="canhuiList">
                    <el-row :gutter="30">
                        <el-col style="margin-right:15px" :span="2" v-for="(item,index) in canhui" :key="index">
                            <div class="canhui" style="font-size: 12px;">
                                <img :src="item.urls ? baseUrl + item.urls : '../../../static/img/current.png' ">
                                <span>{{item.realname}}</span>
                                <span class="canhui-normal" v-if='item.status == true'>
                                    已签到
                                </span>
                                <span class="canhui-absence" v-else>
                                    未签到
                                </span>                               
                            </div>
                        </el-col>
                        <div style="margin-top: 151px;">注：参会人员{{sum}}</div>
                    </el-row>
                </div>
                <div class="conferenceTitle">会议预约附件</div>
                <div class="conferenceFenge"></div>
                <div class="canhuiList" style="min-height: 180px;overflow: hidden;" v-if='fileList.length > 0'>
                        <div class="show-file" v-for = "(item,index) in fileList " :key = 'index' @mouseenter = 'showId=index' @mouseleave = 'showId=-1'>
                            <div style="position: relative;width: 140px;height: 130px;">
                                <template v-if="item.suffix=='gif' || item.suffix=='jpg' || item.suffix=='png' || item.suffix=='jpeg'">
                                    <img :src="baseUrl + item.aturl"  onerror = "this.onerror = ''; this.src = './../../../static/img/jiazai.png'">
                                </template>
                                <template v-else>
                                    <img :src="fileType[item.suffix] || '../../../static/img/yasuo.png'" :title = 'item.atcname'>
                                </template>
                                <div v-show="showId == index" class="show-file-opearting" :title = 'item.atcname'>
                                    <div style="position: absolute;
                                    top: 50px;
                                    left: 50px;
                                    color: rgb(84, 29, 16);
                                    cursor: pointer;" v-if="item.suffix=='gif' || item.suffix=='jpg' || item.suffix=='png' || item.suffix=='jpeg'"
                                     @mouseenter = 'showImgUrl = item.aturl'>
                                    <template v-if='showImg'>
                                        <span @click='showImg=""'>关闭</span> 
                                    </template>
                                    <template v-else>
                                        <span @click='showImg=showImgUrl'>查看</span>
                                    </template> 
                                    </div>
                                    <span @click="downLoad(baseUrl + item.aturl) " style="position: absolute;bottom: 5px;left: 10px;" title = '下载'>
                                        <img src="./../../../static/img/downloaddoc.png">
                                    </span>
                                    <span style="position: absolute;bottom: 5px;right: 10px;cursor: pointer;"  @click="isDelect(item.atid)" title="删除">
                                        <img src="./../../../static/img/deletdoc.png">
                                    </span>
                                </div>
                             </div>
                            <div style="font-size: 14px;
                                text-align: center;word-wrap: break-word;word-break: normal;">{{ item.atcname | capitalize }}
                            </div>
                        </div>
                </div>
                <div class="canhuiList" v-else>
                    <span>{{$buttonObj.noData}}</span>
                </div>
                <div class="conferenceTitle">会议批注文件</div>
                <div class="conferenceFenge"></div>
                <div class="canhuiList" style="min-height: 180px;overflow: hidden;" v-if='notationList.length > 0'>
                        <div class="show-file" v-for = "(item,index) in notationList " :key = 'index' @mouseenter = 'notationId=index' @mouseleave = 'notationId=-1'>
                            <div style="position: relative;width: 140px;height: 130px;">
                                <img :src="baseUrl + item.aturl">
                                <div v-show="notationId == index" class="show-file-opearting" :title = 'item.atcname'>
                                    <div style="position: absolute;
                                    top: 50px;
                                    left: 50px;
                                    color: rgb(84, 29, 16);
                                    cursor: pointer;" @mouseenter = 'showImgUrl = item.aturl'>
                                    <template v-if='showImg'>
                                        <span @click='showImg=""'>关闭</span> 
                                    </template>
                                    <template v-else>
                                        <span @click='showImg=showImgUrl'>查看</span>
                                    </template>    
                                </div>
                                    <span @click="downLoad(baseUrl + item.aturl) " title = '下载' style="position: absolute;bottom: 5px;left: 10px;">
                                        <img src="./../../../static/img/downloaddoc.png">
                                    </span>
                                    <span style="position: absolute;bottom: 5px;right: 10px;cursor: pointer;"  @click="isDelect(item.atid)" title="删除">
                                        <img src="./../../../static/img/deletdoc.png">
                                    </span>
                                </div>
                             </div>
                            <div style="font-size: 14px;
                                text-align: center;word-wrap: break-word;word-break: normal;">{{ item.atcname | capitalize }}
                            </div>
                        </div>
                </div>
                <div class="canhuiList" v-else>
                    <span>{{$buttonObj.noData}}</span>
                </div>
                <div class="conferenceTitle">会议白板文件</div>
                <div class="conferenceFenge"></div>
                <div class="canhuiList" style="min-height: 180px;overflow: hidden;" v-if='screenshotList.length > 0'>
                        <div class="show-file" v-for = "(item,index) in screenshotList " :key = 'index' @mouseenter = 'screenshotId=index' @mouseleave = 'screenshotId=-1'>
                            <div style="position: relative;width: 140px;height: 130px;">
                                <img :src="baseUrl + item.aturl">
                                <div v-show="screenshotId == index" class="show-file-opearting" :title = 'item.atcname'>
                                    <div style="position: absolute;
                                    top: 50px;
                                    left: 50px;
                                    color: rgb(84, 29, 16);
                                    cursor: pointer;" @mouseenter = 'showImgUrl = item.aturl'>
                                    <template v-if='showImg'>
                                        <span @click='showImg=""'>关闭</span> 
                                    </template>
                                    <template v-else>
                                        <span @click='showImg=showImgUrl'>查看</span>
                                    </template>
                                </div>
                                    <span @click="downLoad(baseUrl + item.aturl) " title = '下载' style="position: absolute;bottom: 5px;left: 10px;">
                                        <img src="./../../../static/img/downloaddoc.png">
                                    </span>
                                    <span style="position: absolute;bottom: 5px;right: 10px;cursor: pointer;"  @click="isDelect(item.atid)" title="删除">
                                        <img src="./../../../static/img/deletdoc.png">
                                    </span>
                                </div>
                             </div>
                            <div style="font-size: 14px;
                                text-align: center;word-wrap: break-word;word-break: normal;">{{ item.atcname | capitalize }}
                            </div>
                        </div>
                </div>
                <div class="canhuiList" v-else>
                    <span>{{$buttonObj.noData}}</span>
                </div>
                <div class="conferenceFenge"></div>
                <!-- 图片展示 -->
                <img v-show='showImg' class="meeting-img" :src="baseUrl + showImg" alt="图片无法查看">
                <!-- 图片关闭按钮 -->
                <i  v-show='showImg' class="iconfont icon-guanbianniu meeting-img-close" @click='showImg=""'></i>
                <div class="btn-group" style="margin-bottom: 40px">
                    <el-row>
                        <el-button type="warning" @click="goxiugai('/management/conferenceList/changeconference/')">{{$buttonObj.update}}</el-button>
                        <el-button :style="{backgroundColor:colorselects,color:'#fff'}"  @click="quxiao('/management/conferenceList/conference')">{{$buttonObj.close}}</el-button>
                    </el-row>
                </div>
                <!-- 删除提示 -->
                
                <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center style="height: 400px;">
                        
                    <span>{{$promptObj.delwarn}}</span>
                    
                    <span slot="footer" class="dialog-footer" style="color: white">
                        <el-button type="info" @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
                    </span>
               
                </el-dialog>
         
            </div>
        </el-scrollbar>
    </div>
</template>

<script>

import { getMeetingDetail,getMeetingAttach,delPictrue } from "./../../api/https.js";
import { meetingDetailInit } from "@/init/meeting.js";
import { delDetail,updateDetail } from "./../../api/methods.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.meetingObj.tit09},
                {router: this.$parent.meetingObj.tit02}
            ],
            sum:"", //参加会议总人数
            end:"",
            showImgUrl: '',//图片路径
            showImg: '',//图片展示
            showId: -1,
            notationId:-1,
            screenshotId:-1,
            allContent:{},
            options: {},
            canhui:[],
            fileList: [],//附件列表
            notationList: [],//批注列表
            screenshotList: [],
            dialogVisible: false,//弹框状态
            meetingStates: '0',
            filname: {
                '0': "全部",
                '1': "未召开",
                '2': "正进行",
                '3': "已结束"
            },//实际为0未召开",1正进行",2已结束"
            filnameColor: {
                "0" : '#4377EE',
                "1" : '#EF8641',
                "2" : '#999999'
            },
            fileType:{
                doc: '../../../static/img/doc.png',
                docx: '../../../static/img/doc.png',
                xls: '../../../static/img/xls.png',
                xlsx: '../../../static/img/xls.png',
                ppt: '../../../static/img/ppt.png',
                pptx: '../../../static/img/ppt.png',
                pdf: '../../../static/img/pdf.png'
            },
            centerDialogVisible: false,//显示删除提示框
            atid: '',//要删除的附件
            windowHeight:''
        }
    },
    created(){
        meetingDetailInit(this);
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    filters: {
        capitalize: function(value) {
            var str = '' 
            if(value.length > 20) str = value.substring(0,7) + '…' + value.substring(value.length-9)
            else str = value
            return str
        }
    },
    methods:{
        meetings(){
            this.$alert('', {
                showConfirmButton:false,
                modal:false 
        }).catch(() => {

        })
        },
       
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        loadsx(){
            this.end = this.$route.params.id;
            this.getData();
            this.getList();
            this.fileList = [];
            this.notationList = [];
            this.screenshotList = [];
        },
        // 删除附件提示（单个）
        isDelect(num){
            this.centerDialogVisible = true;
            this.atid = num;
        },
            // 移除单个附件
        delPictrue(){
            delPictrue(this,'fil','getList')
        },
        // 关闭详情页面
        quxiao(path){
            var arr = delDetail(path, 'conferencelist');
            this.$emit(arr[0],arr[1]);
        },
        // 进入修改页面
        goxiugai(path){
            var arr = updateDetail(path)
            this.replaceroute(arr[0],arr[1]);
        },
        // 获取附件列表
        getList(){
            var obj = {
                pkid: this.end.substring(this.end.indexOf('@')+1),
                success:res => {
                    if(res.data.message.indexOf("getSuccess") > -1){
                        console.log(res.data)
                        this.fileList = res.data.attachList || [];
                        this.notationList = res.data.notationList || [];
                        this.screenshotList = res.data.screenshotList || [];
                    }else{
                        this.$message.error(this.$promptObj.updatefail);
                    }
                }
            }    
            getMeetingAttach(obj);
        },
        // 数据请求
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj = {
                success: response => {
                    console.log(response.data.data)
                    console.log(response.data.data.meeting.signinfo)
                    if (response.data.code == 200) {
                        this.sum = response.data.data.meeting.signinfo
                        if(this.sum == undefined){
                            this.sum = "都未签到"
                        }
                        var obj = {} , arr = [];
                        arr = response.data.data.meeting.orguserids.split('||')
                        this.canhui = response.data.data.userList;
                        console.log(this.canhui)
                        for (const key in this.canhui) {
                            for (let index = 0; index < arr.length; index++) {
                                if (arr[index].indexOf(this.canhui[key].userid)) 
                                this.canhui[key].department = arr[index].split('@')[0] || ''
                            }
                        }
                        obj.userList = this.canhui;
                        obj.meeting = response.data.data.meeting; 
                        this.meetingStates = obj.meeting.states;
                        sessionStorage.setItem(obj.meeting.mtid,JSON.stringify(obj))
                        for (const key in this.allContent) {
                            if ( key == 'address' ) {
                                this.allContent[key].val = obj.meeting.mtrname
                            } else {
                                this.allContent[key].val = obj.meeting[key]
                            }
                        }
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                id:id
            }
            getMeetingDetail(obj)
        },
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>

<style scoped>

  /* .el-message-box{
    background-color:black;
    width: 800px;
    height: 500px;
  } */
    .conferenceDetailContent{
        box-sizing: border-box;
        width: 100%;
        padding: 50px;
    }
    .zcrimg{
        float: left;
        width: 20%;
        text-align: center;
    }
    .zcrimg img{
        width: 65%;
        margin-top: 50px;
    }
    .confereceDetailTable{
        float: left;
        width: 80%;
    }
    .confereceDetailTable table{
        width: 100%;
    }
    .confereceDetailTable table th{
        padding: 15px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
    }
    .confereceDetailTable table td{
        color: #333;
        font-size: 14px;
        padding: 8px 15px;
        vertical-align: top;
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 14px;
    }
    .confereceDetailTable table .tab-right{
        color: #666;
        width: 78%;
        border-right: 1px solid #F1F4F6;
    }
    .confereceDetailTable table .tab-right .el-scrollbar__wrap{
        padding-right: 30px;
        line-height: 28px;
        text-indent: 2rem;
        vertical-align: top;
    }
    .conferenceFenge{
        width: 100%;
        height: 1px;
        background-color: #CCCCCC;
        margin-top: 10px;
    }
    .conferenceTitle{
        color: #333;
        line-height: 16px;
        margin-top: 40px;
        font-weight:bold;
    }
    .zcjimgList{
        margin-top: 20px;
        width: 100%;
        overflow: hidden;
    }
    .zcjimg{
        display: inline-block;
        width: 132px;
        text-align: center;
        font-weight:bold;
        color: #333;
        line-height: 16px;
        margin-right: 60px;
        white-space: normal;
    }
    .zcjimg img{
        margin-bottom: 10px;
        width: 150px;
        height: auto;
    }
    .canhuiList{
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
    }
    .canhui>img{
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
    }
    .canhui>span{
        color: #666;
    }
    .canhui{
        font-size: 14px;
        text-align: center;
        margin-bottom: 20px;
        line-height: 16px;
        width: 100%;
    }
    .el-col-2 {
        width: 94px !important;
    }
    .zhuangtai{
        display: inline-block;
        vertical-align: middle;
        padding:2px 8px;
        margin-right: 10px;
        font-size:12px;
        color:#fff;
        text-align:center;
        line-height: 16px;
        border-radius: 3px;
    }
    .canhui>div{
        position: relative;
        width: 100% !important;
    }
    .canhui>div>img{
        position: absolute;
        right: 5px;
        top: 0px;
        width: 13.5%;
    }
    .canhui-absence{
        display: inline-block;
        border: 1px solid red;
        color: red !important;
        /* font-size: 12px; */
    }
    .canhui-normal{
        display: inline-block;
        border: 1px solid green;
        color: green !important;
        /* font-size: 12px; */
    }
    .zcrname{
        margin-top: 20px;
    }
    .conferenceDetailSearch,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .conferenceDetailSearch>div{
        width: 400px;
        margin-left: 40px;
    }
    .conferenceDetailSearch>div .el-input__inner{
        height: 36px;
    }
    .conferenceDetailSearch .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .conferenceDetailSearch .el-input-group__append button{
        height: 34px;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .conferenceDetailSearch .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .conferenceDetailSearch ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    .el-row{
        margin: 0px !important;
    }
    .show-file{
        float: left;
        margin-right: 15px;
        height: 160px;
        width: 140px
    }
    .show-file img{
        height: 100%;
        width: 100%;
        /* margin-bottom: 8px; */
    }
    .fil-imgs{
        background-color: rgb(248, 248, 248);
    }
    .show-file-opearting{
        position: absolute;
        background-color: rgba(228,228,228,0.8);
        height: 112%;
        width: 100%;
        top: 0px;
        left: 0;
    }
    .show-file-opearting img{
        height: 20px;
        width: auto;
        cursor: pointer;
    } 
   
</style>
