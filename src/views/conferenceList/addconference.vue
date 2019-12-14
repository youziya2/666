// 新增会议
<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
            <div class="conference-add" :style="{backgroundColor:colorselects}">
                <div class="conference-title">
                    <!-- 会议基本信息 -->
                    <el-row>
                        <template v-for="(item,k) in allContent">
                            <el-col :span="item.span" :key="k" v-if="item.span != 0" :style="item.span == 24 ? 'renyuan' : ''">
                                <div class="demo-input-suffix">
                                    <span class="conference-name">{{item.name}}</span>
                                    <template v-if="k == 'address'">
                                        <template v-if="Object.keys(item.select).length > 0">
                                            <el-select v-model="item.val" style="width: 80%"
                                                class="conference-left" :class = '{ must : item.must }'
                                                :placeholder="$parent.meetingObj.tit14"
                                                :disabled="isReadOnly"
                                            >
                                                <el-option
                                                v-for="(val,it) in item.select"
                                                :key="it"
                                                :label="val"
                                                :value="it">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <template v-else>
                                            <div class="not-room" @click='goSetting()'>你的产品还没有绑定会议室,请先去绑定(点击进行产品设置)!</div>
                                        </template>
                                    </template>
                                    <template v-else-if="item.select"> 
                                        <el-select v-model="item.val"
                                            class="conference-left" :class = '{ must : item.must }'
                                            :placeholder="$parent.meetingObj.tit14"
                                            :disabled="isReadOnly"
                                        >
                                            <el-option
                                            v-for="(val,it) in item.select"
                                            :key="it"
                                            :label="val"
                                            :value="it">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-else-if="k == 'starttime' || k == 'endtime'">   
                                        <el-date-picker
                                            class="conference-left"
                                            :class = '{ must : item.must }'
                                            v-model="item.val"
                                            type="datetime"
                                            :placeholder="$parent.meetingObj.tit14"
                                            :disabled="isReadOnly"
                                        ></el-date-picker>
                                    </template>
                                    <template v-else-if=" k == 'value5'">   
                                            <div class="conference-left" :class = '{ must : item.must }' style="position:relate;display: inline-block;width: 90%">
                                                <div class="peoples" @click="showDialog" :style = "isReadOnly ? 'cursor:not-allowed': ''">
                                                    <span style="float:right;">
                                                        <i :class=" dialogTableVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down' " style="color: #c0c4cc;font-size: 14px;"></i>
                                                    </span>
                                                    <template v-if="choiceArr.length < 1 ">{{$parent.meetingObj.tit14}}</template>
                                                    <template v-else>
                                                        <el-tag
                                                            v-for="tag in choiceArr"
                                                            :key="tag.userid"
                                                            closable
                                                            @close="handleClose(tag.userid)"
                                                            :type="tag.type">
                                                            {{tag.realname}}&lt;{{tag.username}}&gt;
                                                        </el-tag>
                                                    </template>
                                                   
                                                </div>
                                            </div> 
                                    </template>
                                    <template v-else>
                                        <el-input class="conference-left" :class = '{ must : item.must }' :disabled="isReadOnly" v-model="item.val"></el-input>
                                    </template> 
                                </div>
                            </el-col>
                        </template>
                    </el-row>
                    <!-- 选择部门人员 -->
                    <el-dialog :title="allContent.value5.name" :visible.sync="dialogTableVisible" style="padding:30px 30px 0">
                        <div style="position:absolute;top:50px;right:30px;margin-right:20px">
                            <el-checkbox @change="allChoice(ppDetail)" v-show = 'ppDetail.length' v-model="allChecked" :label="$parent.meetingObj.tit15"></el-checkbox>
                        </div>
                        <el-container style="margin:0 30px">
                            <el-container style="height:480px;border-top:1px solid #E9EEF3;border-bottom:1px solid #E9EEF3;">
                                <el-aside width="23%">
                                    <ul>
                                        <li :class=" deparmentChoice == item.orgid ? 'aside-li-active' : 'aside-li' " v-for="item,index in departmentList " :key= 'index'
                                         @click="getJion(item.orgid)">{{ item.orgcname }}</li>
                                    </ul>
                                </el-aside>
                                <el-main>
                                    <template v-if='ppDetail.length > 0'>
                                        <div :class="index%2 == 0 ? 'aside-li-left border-right' : 'aside-li-left'" :style=" item.isChecked ? 'background-color: #E9EEF3' : ''" 
                                            v-for="(item,index) in ppDetail" :key = 'index' >
                                            <div class="all-img">
                                                <img src="../../../static/img/ones.jpg" alt="" srcset="">
                                            </div>
                                            <div class="all-content">
                                                <div>{{$parent.meetingObj.tit16}} {{item.realname}}
                                                    <el-checkbox style="float:right;margin-right:20px" @change="pushArr(item.isChecked,item.userid)" v-model="item.isChecked"></el-checkbox>
                                                </div>
                                                <div>{{$parent.meetingObj.tit17}} {{item.nickname}}</div>
                                                <div>{{$parent.meetingObj.tit18}} {{item.username}}</div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p style="line-height: 200px;text-align: center;">{{ $buttonObj.noData }}</p>
                                    </template>
                                </el-main>
                            </el-container>
                            <el-footer>
                                <div>
                                    <el-row>
                                        <el-button type="warning" @click.native="allJoin">{{$buttonObj.sure}}</el-button>
                                        <el-button @click.native="sayHello" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.cancel}}</el-button>
                                    </el-row>  
                                </div>
                            </el-footer>
                        </el-container>
                    </el-dialog>
                </div>
                <!-- 会议内容 -->
                <div class="conference-content">
                    <el-row>
                        <el-col :span='24'>
                            <div class="conference-content-textarea">
                                <span class="conference-name">{{allContent.content.name}}</span>
                                <el-input
                                type="textarea"
                                resize="none"
                                class="conference-left must"
                                :autosize="{ minRows: 23, maxRows: 23}"
                                :disabled="isReadOnly"
                                style="background-position-y: top;"
                                v-model="allContent.content.val">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    
                </div>
                <!-- 会议附件 -->
                <div class="" style="height: 230px;">
                    <el-row>
                        <el-col :span='24'>
                            <div class="conference-content-textarea conference-left">
                                <p v-if = 'isReadOnly' style="color: red;margin: -20px -20px 20px 112px;">
                                    温馨提示：上传附件只支持doc、docx、xlsx、xls、ppt、pptx、pdf、gif、jpg、jpeg、png、zip格式，其他格式请先压缩再上传！
                                </p>
                                <span class="conference-name">附件</span>
                                <div style="display: inline-block;width: 90%;vertical-align: top;color:red;">
                                    <template v-if = 'isReadOnly'>
                                        <form enctype="multipart/form-data" class="uploadForm" style="float: left;">
                                            <div class="file-imgs" style="width: 136px;height: 136px;">
                                                <input  type="file" ref="img01" id="img01" :title="$buttonObj.clickFile" name="img01" multiple="multiple" @change="uploadMoreattach('img01')" 
                                                accept=".doc,.docx,.xlsx,.xls,.ppt,.pptx,.pdf,.gif,.jpg,.jpeg,.png,.zip">
                                                <div class="show-imgs">
                                                    <img v-if=" imgList.img01.imgpath " :src="imgList.img01.imgpath">
                                                </div>
                                            </div> 
                                        </form>
                                        <div class="show-file" :class = "showId == index ? 'file-mask' : '' " v-for = "(item,index) in fileList" @mouseenter = 'showId=index' @mouseleave = 'showId=-1'>
                                                <div style="position: relative;width: 80px;height: 80px;">
                                                        <template v-if="item.suffix=='gif' || item.suffix=='jpg' || item.suffix=='png' || item.suffix=='jpeg'">
                                                            <img :src="baseUrl + item.aturl">
                                                        </template>
                                                        <template v-else>
                                                            <img :src="fileType[item.suffix] || '../../../static/img/yasuo.png'" :title = 'item.atcname'>
                                                        </template>
                                                        <div v-show="showId == index" class="show-file-opearting" :title = 'item.atcname'>
                                                            <div style="position: absolute;
                                                            top: 12px;
                                                            left: 22px;
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
                                                        <span @click="downLoad(baseUrl + item.aturl) " style="position: absolute;bottom: 3px;left: 8px;" title = '下载'>
                                                            <img src="./../../../static/img/downloaddoc.png">
                                                        </span>
                                                        <span style="position: absolute;bottom: 3px;right: 8px;cursor: pointer;"  @click="isDelect(item.atid)" title="删除">
                                                            <img src="./../../../static/img/deletdoc.png">
                                                        </span>
                                                        </div>
                                                     </div>
                                                    <div style="font-size: 14px;
                                                        text-align: center;word-wrap: break-word;word-break: normal;">{{ item.atcname | capitalize }}
                                                    </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        温馨提示：<br><br>
                                        1、点击下一步按钮成功预约会议后，你才可以上传会议相关附件！<br>
                                        2、上传附件只支持doc、docx、xlsx、xls、ppt、pptx、pdf、gif、jpg、jpeg、png、zip格式，其他格式的附件请先压缩再上传！
                                    </template>
                                    <!-- 删除提示 -->
                                    <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
                                        <span>{{$promptObj.delwarn}}</span>
                                        <span slot="footer" class="dialog-footer" style="color: white">
                                            <el-button type="info" @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                                            <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
                                        </span>
                                    </el-dialog>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- 图片展示 -->
                <img v-show='showImg' class="meeting-img" :src="baseUrl + showImg" alt="图片无法查看">
                <!-- 图片关闭按钮 -->
                <i v-show='showImg' class="iconfont icon-guanbianniu meeting-img-close" @click='showImg=""'></i>
                <!-- 保存会议 -->
                <template v-if="isReadOnly">
                    <el-button style="background-color: #EFF5FB;" @click.native = "goNext">{{$buttonObj.complete}}</el-button>
                </template>
                <template v-else>
                    <el-button style="background-color: #EFF5FB;" @click.native = "sendInfo">{{$buttonObj.next}}</el-button>
                </template>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getDepartmentList,getDepartmentDetail,updateMeting,getMtroomList,uploadMoreattach,getMeetingAttach,delPictrue,getCompanyPersonList } from "./../../api/https.js";
import { getNowFormatDate,checkNull } from "./../../api/methods.js";
import { addConferenceInit } from '@/init/meeting.js'
export default {
    data(){
        return{
            isReadOnly: false,//只读状态
            replaceObj: {},
            ppObj: {},//对象详情
            departmentList: [],//部门
            departmentClick: {},
            deparmentChoice: '',//点击选择部门
            ppDetail: {},
            useridArr: [],//记录userid数组
            choiceArr: [],
            allChecked: false,//全选全不选按钮
            list: [
                { router: this.$parent.meetingObj.tit09}
            ],
            end: this.$parent.meetingObj.tit01,
            dialogTableVisible: false,
            allContent: {},
            windowHeight: '',
            mtid: "",//会议ID
            imgList: {//图片列表
                img01:{imgid:'',imgpath:''}
            },
            imgNum: 'img01',//附件ID
            fileList: [
                // {atcname: "dist(8).zip",
                // aturl: "/uploadfile/attach/20191116/20191116164910_725.zip",
                // suffix: "zip"},
                // {atcname: "dist(8).png",
                // aturl: "/uploadfile/attach/20191116/20191116164910_725.png",
                // suffix: "png"}
            ],//附件列表
            // 悬浮显示
            showId: -1,
            showImgUrl: '',//图片路径
            centerDialogVisible: false,//显示删除提示框
            atid: '',//要删除的附件
            showImg: '',
            fileType:{
                doc: '../../../static/img/doc.png',
                docx: '../../../static/img/doc.png',
                xls: '../../../static/img/xls.png',
                xlsx: '../../../static/img/xls.png',
                ppt: '../../../static/img/ppt.png',
                pptx: '../../../static/img/ppt.png',
                pdf: '../../../static/img/pdf.png'
            }
        }
    },
    created(){ 
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        addConferenceInit(this);
        this.getMtroomList();
        this.allContent.address.select = {};
    },
    mounted(){
        this.getDeparmentInfo()
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
        // 深拷贝
        copyLight(object){
            var obj = {};
            obj = JSON.parse(JSON.stringify(object));
            return obj
        },
        // 关闭按钮
        sayHello(){
            
            this.dialogTableVisible = false;
            this.ppObj = this.copyLight(this.replaceObj);
        },
        //跳转设置页面
        goSetting(){
            this.$router.push({
                path:'/management/systemeinstellungen',
                query:{selectStr:'systemeinstellungen'}
            })
        },
        // 弹出dialog
        showDialog(){
            if(this.isReadOnly) return false;
            this.dialogTableVisible = true;
            this.replaceObj = this.copyLight(this.ppObj);
            document.getElementsByClassName('el-dialog__headerbtn')[0].style.display = 'none';
            this.getJion(this.deparmentChoice);
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        // 获取会议室列表
        getMtroomList(){
            var obj = {
                success:res => {
                    if (res.data.code == '200') {
                        var array = res.data.data, obj = {};
                        for (let index = 0; index < array.length; index++) {
                            obj[array[index].mtrid] = array[index].mtrname + "(" + array[index].mtrnum + ")";
                        }
                        this.allContent.address.select = obj;
                    } else {
                        this.$message.error(this.$promptObj.searchfail)
                    }
                }
            }
            getMtroomList(obj);
        },
        // 点击展示部门人员
        getJion(str){
            this.deparmentChoice = str;
            this.ppDetail = [];       
            if (this.departmentClick[str]) {
                this.ppDetail = this.ppObj[str];
                this.allChecked = true;
                for (const key in this.ppDetail) {       
                    if( !this.ppDetail[key].isChecked) return this.allChecked = false;
                }   
            } else {
                this.getDeparmentInfoDetail()
            }
        },
        // 参会人员的全选与全不选
        allChoice(arr){
            if (this.allChecked) {
                for (const key in arr) {
                    arr[key].isChecked = true;
                    if(this.useridArr.indexOf(arr[key].userid) < 0) this.useridArr.push(arr[key].userid);
                }
            } else {
                for (const key in arr) {
                    arr[key].isChecked = false;
                    var index = this.useridArr.indexOf(arr[key].userid)
                    if (index > -1) this.useridArr.splice(index, 1);
                }
            }
        },
        // 是否选择人员参会
        pushArr(boo,id){
            if (boo) {
                if(this.useridArr.indexOf(id) < 0) this.useridArr.push(id)
                this.allChecked = true;
                for (let index = 0; index < this.ppDetail.length; index++) {
                    if(this.useridArr.indexOf(this.ppDetail[index].userid) < 0) this.allChecked = false;   
                }
            } else {
                var index = this.useridArr.indexOf(id)
                if (index > -1) this.useridArr.splice(index, 1);
                this.allChecked = false;
            }
            
        },
        // 确定选择的参会人员
        allJoin(){
            var arr = [] , element = [], obj = {};
            for (const key in this.ppObj) {
                element = this.ppObj[key]
                for (let index = 0; index < element.length; index++) {
                   if (element[index].isChecked) {
                       element[index].department = key;
                       element[index].dpNum = index;
                       arr.push(element[index]);
                   }    
               }
            }
            arr = arr.reduce(function(item, next) {
               obj[next.userid] ? '' : obj[next.userid] = true && item.push(next);
               return item;
            }, []);
            this.choiceArr = arr;
            this.dialogTableVisible = false;
        },
        // 点击小按钮去掉某一个参会人员
        handleClose(tag) {
            var obj = {}
            for (let index = 0; index < this.choiceArr.length; index++) {
                obj = this.choiceArr[index]
                if ( tag == obj.userid)  {
                    this.ppObj[obj.department][obj.dpNum].isChecked = false
                    this.choiceArr.splice(index, 1);
                }
            }
        },
         // 非空判断
        notNull(){
            for (const key in this.allContent) {
                if( key ==  "compere") continue;
                if( !this.allContent[key].val || this.allContent[key].val.length < 1) return key;
            }
        },
        // 获取部门列表
        getDeparmentInfo(){
            var obj = {
                success:res => {
                    if(res.data.code == 200){
                        var array = res.data.data;
                        for (let index = 0; index < array.length; index++) {
                            if (array[index].orgid == sessionStorage.orgid) continue;
                            this.departmentList.push(array[index]);
                            this.departmentClick[array[index].orgid] = false;
                            // if (array[index].orgid == sessionStorage.orgid) {
                            //     this.departmentList.unshift( array[index] );
                            // } else {
                            //     this.departmentList.push(array[index]);
                            // }
                            // this.departmentClick[array[index].orgid] = false;
                        }
                        this.deparmentChoice = this.departmentList[0].orgid;
                    }else{
                        this.$message.error(this.$parent.meetingObj.tit10)
                    }
                }
            }
            getDepartmentList(obj)
        },
        // 获取某一部门人员列表
        getDeparmentInfoDetail(){
            var obj = {
                deparmentChoice: this.deparmentChoice,
                success:res => {
                    if(res.data.message.indexOf("getSuccess") > -1){
                        var array = [], arr = [] ,object = {}, boo = this.deparmentChoice !== sessionStorage.orgid;
                        array = boo ?  res.data.userList: res.data.data;
                        for (let index = 0; index < array.length; index++) {
                            object = {}
                            object.realname = array[index].realname
                            object.isChecked = false
                            object.userid = boo ? array[index].userid : array[index].psuserid
                            object.nickname = array[index].nickname || '无'
                            object.username = boo ? array[index].username : array[index].mobile
                            object.orgid = this.deparmentChoice
                            arr.push(object)
                        }
                        this.ppObj[this.deparmentChoice] = arr 
                        this.ppDetail = this.ppObj[this.deparmentChoice];
                        this.departmentClick[this.deparmentChoice] = true
                        this.replaceObj = this.copyLight(this.ppObj);
                    }else{
                        this.$message.error(this.$parent.meetingObj.tit10)
                    }
                }
            }
            this.deparmentChoice !== sessionStorage.orgid ? getDepartmentDetail(obj) : getCompanyPersonList(obj);
        },
        // 发送记录
        sendInfo(){
            var str = ''
            for (let index = 0; index < this.choiceArr.length; index++) {
                str +=  this.choiceArr[index].department + '@' + this.choiceArr[index].userid  + "||"
            }
            str = str.length > 3 ? str.substring(0,str.length-2) : ''
            this.allContent.value5.val = str
            if(checkNull(this.allContent)){
                var st = this.allContent.starttime.val,et = this.allContent.endtime.val
                if( !(new Date(st) < new Date(et)))  return this.$message.error(this.$parent.meetingObj.tit11)  
                var obj = {
                    st: getNowFormatDate(st),
                    et: getNowFormatDate(et),
                    str: str,
                    self: this,
                    success:res => {
                        if (res.data.message=="msg01") {
                            return this.$message.error('开会时间与别的会议有冲突，请重新选择');
                        }
                        if(res.data.code == 200){
                            this.isReadOnly = true;
                            this.mtid = res.data.data;
                        }else{
                            this.$message.error(this.$promptObj.savefail);
                        }
                    }
                }    
                updateMeting(obj); 
            } 
        },
        // 点击完成
        goNext(){
            this.$router.push({ path: "/management/conferenceList/conference" });
        },
        // 附件上传
        uploadMoreattach(str) {
            var obj = {
                isAttach : 'attach',
                types : 'meeting',
                tbname : "meeting",
                imgIndex : this.imgList[str],
                dom : document.getElementById(str),
                pkid : this.mtid,
                fn : this.getList,
                subtypes : '0'
            }
            uploadMoreattach(obj)
        },
        // 获取附件列表
        getList(){
            var obj = {
                pkid: this.mtid,
                success:res => {
                    if(res.data.message.indexOf("getSuccess") > -1){
                        var arr1 = res.data.attachList || [],
                        arr2 = res.data.notationList || [],
                        arr3 = res.data.screenshotList || [];
                        this.fileList = arr1.concat(arr2,arr3);
                    }else{
                        this.$message.error(this.$promptObj.updatefail)
                    }
                }
            }    
            getMeetingAttach(obj);
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
    },
    computed:{
        colorselects(){
            return this.$parent.$router.options.routes[1].meta.colorselect;
        }
    }
}
</script>

<style scoped>
    .el-dialog{
        background-color: #fff !important;
        height: 654px !important;
    }
    .app-input .el-input:not(.el-input--suffix), .demo-input-suffix .el-select{
        margin-left: 0px !important;
    }
    .actived{
        background: red
    }
    .not-room{
        display: inline-block;
        color: red;
        cursor: pointer;
    }
    .conference-add{
        width: 98.5%;
        /* height: 930px; */
        padding: 10px;
    }
    .conference-add>div{
        background-color: #EFF5FB;
        width: 100%;
    }
    .conference-title{
        height: 245px;
        margin-bottom: 10px;
    }
    .conference-left{
        padding-left: 15px;
    }
    .conference-content{
        height: 566px;
        border-bottom: 10px solid rgb(67, 119, 238);
    }
    .conference-title .el-row{
        margin: 0px 40px;
    }
    .conference-title .el-col{
        margin-top: 25px;
        color: #333;
    }
    .conference-title .el-input{
        width: 80.5%;
        /* margin-left: 20px; */
    }
   .conference-name{
       display: inline-block;
       width: 110px;
   }
    .conference-title .el-col-6 .el-input{
        width: 60.5%;
    }
    .conference-title .el-col-6 .el-select{
        /* margin-left: 20px; */
        width: 60.5%
    }
    .conference-title .el-col-6 .el-select .el-input{
        width: 100%;
        margin: 0px;
    }
    .conference-title .el-col.renyuan .el-input{
        width: 100%;
        margin: 0px;
    }
    .peoples{
        cursor: pointer;
        width: 100%;
        max-height: 165px;
        overflow: auto;
        line-height: 40px;
        margin-bottom: 10px;
        padding: 0 15px;  
        background-color: #F8F8F8;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        vertical-align: middle;
        font-size: inherit;
        outline: 0;
        
    }
    /* 会议内容样式 */
    .conference-content-textarea{
        margin: 40px 40px 0;
    }
    .conference-content .el-textarea{
        width: 90%;
        /* margin-left: 20px; */
        vertical-align: top;
    }
    .conference-add .el-button{
        margin-top: 20px; 
        color: #333;
        border: 0px;
    }
    .el-menu-item{
        color: #606266 !important;
    }
   .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: right;
    line-height: 60px;
  }
  
  .el-aside {
    /* background-color: #D3DCE6; */
    color: #333;  
    text-align: center;
    line-height: 60px;
    font-size: 18px;
  }
  .aside-li{
      background-color: #c4c2c2;
      margin: 0px 5px 2px 0px;
  }
  .aside-li-active{
      background-color: #fff;
      border-bottom: 1px solid  #c4c2c2;
      margin: 0px 5px 2px 0px;
  }
  .aside-li:hover{
      cursor: pointer;
      background-color: #fff;
      border-bottom: 1px solid  #E9EEF3;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    padding: 0 10px;
    text-align: center;
  }
  .aside-li-left {
      float:left;
      width:49%;
      padding: 11px 0;
      border-bottom:1px solid #E9EEF3;
  }
  .border-right{
      border-right:1px solid #E9EEF3;
  }
  .aside-li-left:hover{
        background-color: #E9EEF3
  }
  .all-img{
      height: 70px;
      width: 30%;
      display: inline-block;
      vertical-align: middle;
  }
  .all-img img{
      height: 70px;
      width: 70px;
  }
  .all-content{
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      width: 66%;
      text-align: left;
      line-height: 24px;
  }
  .show-file{
    float: left;
    position: relative;
    padding: 0px 5px;
    height: 90px;
    width: 80px;
  }
  .show-file img{
      height: 80px;
      width: 80px;
  }
  .fil-imgs{
    background-color: rgb(248, 248, 248);
  }
  .file-mask{
    background-color: #E4E4E4
  }
  .show-file-opearting{
    position: absolute;
    background-color: rgba(228,228,228,0.8);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0;
  }
  .show-file-opearting img{
      height: 20px;
      width: auto;
  }      
</style>
