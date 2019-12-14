<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
            <div class="changeconference-add" :style="{backgroundColor:colorselects}">
                <div class="changeconference-title">
                    <!-- 会议基本信息 -->
                    <el-row>
                        <template v-for="(item,k) in allContent">
                            <el-col :span="item.span" :key="k" v-if="item.span != 0" :style="item.span == 24 ? 'renyuan' : ''">
                                <div class="demo-input-suffix">
                                    <span class="conference-name">{{item.name}}</span>
                                    <template v-if="item.select"> 
                                        <el-select v-model="item.val" :style="k == 'address' ? 'width: 80%' : '' "
                                            class="conference-left" :class = '{ must : item.must }'
                                            :placeholder="$parent.meetingObj.tit14"
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
                                        ></el-date-picker>
                                    </template>
                                    <template v-else-if=" k == 'value5'">   
                                            <div class="conference-left":class = '{ must : item.must }'  style="position:relate;display: inline-block;width: 90%">
                                                <div class="peoples" @click="showDialog">
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
                                        <el-input class="conference-left" :class = '{ must : item.must }' v-model="item.val"></el-input>
                                    </template> 
                                </div>
                            </el-col>
                        </template>
                    </el-row>
                    <!-- 部门人员选择 -->
                    <el-dialog :title="allContent.value5.name" :visible.sync="dialogTableVisible" style="padding:30px 30px 0" >
                        <div style="position:absolute;top:50px;right:30px;margin-right:20px">
                            <el-checkbox @change="allChoice(ppDetail)" v-show = 'ppDetail.length' v-model="allChecked" :label="$parent.meetingObj.tit15"></el-checkbox>
                        </div>
                        <el-container style="margin:0 30px">
                            <el-container style="height:480px;border-top:1px solid #E9EEF3;border-bottom:1px solid #E9EEF3;">
                                <el-aside width="23%">
                                    <ul>
                                        <!-- <li :class=" deparmentChoice == index ? 'aside-li-active' : 'aside-li' " v-for="( item,index ) in departmentObj " :key= 'index'
                                         @click="getJion(index)">{{departmentObj[index]}}</li> -->
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
                <div class="changeconference-content">
                    <el-row>
                        <el-col :span='24'>
                            <div class="conference-content-textarea">
                                <span class="conference-name">{{allContent.content.name}}</span>
                                <el-input
                                type="textarea"
                                resize="none"
                                class="conference-left must"
                                style="background-position-y: top;"
                                :autosize="{ minRows: 23, maxRows:23}"
                                v-model="allContent.content.val">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="" style="height: 230px;">
                    <el-row>
                        <el-col :span='24'>
                            <div class="conference-content-textarea conference-left" style="margin-right: 0px;">
                                <span class="conference-name">附件</span>
                                <div style="display: inline-block;
                                width: 90%;
                                margin-right: 0px;
                                vertical-align: top">
                                <form enctype="multipart/form-data" class="uploadForm" style="float: left;">
                                    <div class="file-imgs" style="width: 136px;height: 136px;">
                                        <input  type="file" ref="img01" id="img01" :title="$buttonObj.clickFile" name="img01" multiple="multiple" @change="uploadMoreattach('img01')">
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
                                    <!-- 图片展示 -->
                                    <img v-show='showImg' class="meeting-img" :src="baseUrl + showImg" alt="图片无法查看">
                                    <!-- 图片关闭按钮 -->
                                    <i  v-show='showImg' class="iconfont icon-guanbianniu meeting-img-close" @click='showImg=""'></i>
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
                <el-button  style="background-color: #EFF5FB;" @click.native = "sendInfo">{{$buttonObj.save}}</el-button>
                <el-button @click="cancel('/management/conferenceList/conferenceDetail/')">{{$buttonObj.cancel}}</el-button>
                <!-- 确认修改将会重新通知参会人员 -->
                <div class="changeconference-tishi">{{$parent.meetingObj.tit19}}</div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { getDepartmentList,getDepartmentDetail,updateMeting,uploadMoreattach,getMeetingAttach,delPictrue,getMtroomList,getCompanyPersonList } from "./../../api/https.js";
import { getNowFormatDate,updateDetail,checkNull } from "./../../api/methods.js";
import { addConferenceInit } from '@/init/meeting.js'
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[{router: this.$parent.meetingObj.tit09},{router: this.$parent.meetingObj.tit02}],
            end: this.$parent.meetingObj.tit13,
            mtid:'',//会议ID
            dialogTableVisible: false,
            replaceObj:{},
            ppObj:{},
            deparmentChoice:'',//点击选择部门
            // departmentClick:{},
            isClickClose:true,//标记是否点击取消按钮退出选择
            ppDetail:{},
            useridArr:[],//记录userid数组
            choiceArr:[],
            allChecked:false,//全选全不选按钮
            departmentList:[],
            imgList:{//图片列表
                img01:{imgid:'',imgpath:''}
            },
            imgNum:'',//附件ID
            fileList: [],//附件列表
            // 悬浮显示
            showId: -1,
            centerDialogVisible: false,//显示删除提示框
            atid: '',//要删除的附件
            allContent:{},
            options: {},
            windowHeight:"",
            fileList: [],//附件列表
            showImg: '',
            showImgUrl: '',//图片路径
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
        addConferenceInit(this);
        this.getMtroomList();
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
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
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        loadsx(){
            this.getInfo();
            this.getList();
            this.fileList = [];
        },
        // 深拷贝
        copyLight(object){
            var obj = {};
            obj = JSON.parse(JSON.stringify(object));
            return obj;
        },
       // 关闭按钮
        sayHello(){
            this.dialogTableVisible = false;
            this.ppObj = this.copyLight(this.replaceObj);
        },
        // 弹出dialog
        showDialog(){
            this.dialogTableVisible = true;
            this.replaceObj = this.copyLight(this.ppObj);
            document.getElementsByClassName('el-dialog__headerbtn')[0].style.display = 'none'
            this.getJion(this.deparmentChoice)
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
            this.ppDetail = this.ppObj[str] || {};
            this.allChecked = true;
            for (const key in this.ppDetail) {       
                if( !this.ppDetail[key].isChecked) return this.allChecked = false;
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
                    var index = this.useridArr.indexOf(arr[key].userid);
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
                if (index > -1) {
                    this.useridArr.splice(index, 1);
                }
                this.allChecked = false;
            }
            
        },
        // 确定选择的参会人员
        allJoin(){
            var arr = [] , element = [], obj = {};
            for (const key in this.ppObj) {
                element = this.ppObj[key];
                for (let index = 0; index < element.length; index++) {
                    if (element[index].isChecked) {
                       element[index].department = key
                       element[index].dpNum = index
                       arr.push(element[index])
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
                obj = this.choiceArr[index];
                if ( tag == obj.userid)  {
                    this.ppObj[obj.department][obj.dpNum].isChecked = false;
                    this.choiceArr.splice(index, 1);
                }
            }
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
                        this.$message.error(this.$promptObj.updatefail);
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
            delPictrue(this,'fil','getList');
        },
        // 取消修改
        cancel(path){
            var arr =  updateDetail(path);
            this.replaceroute(arr[0],arr[1]);
        },
        // 数据获取
        getInfo() {
            this.mtid = this.$route.params.id;
            this.mtid = this.mtid.substring(this.mtid.indexOf('@')+1);
            var obj = JSON.parse(sessionStorage.getItem(this.mtid));
            for (const key in this.allContent) {
               this.allContent[key].val = obj.meeting[key];
            }
            this.choiceArr = obj.userList || [];
        },
        // 获取部门列表
        getDeparmentInfo(){
            var obj = {
                success:res => {
                    if(res.data.message.indexOf("getSuccess") > -1){
                        var array = res.data.data;
                        for (let index = 0; index < array.length; index++) {
                            if (array[index].orgid == sessionStorage.orgid) continue;
                            this.departmentList.push(array[index]);
                            // if (array[index].orgid == sessionStorage.orgid) {
                            //     this.departmentList.unshift( array[index] );
                            // } else {
                            //     this.departmentList.push(array[index]);
                            // }
                        }
                        this.deparmentChoice = this.departmentList[0].orgid;
                        // 遍历请求部门人员
                        this.departmentList.forEach(element => {
                            this.getDeparmentInfoDetail(element.orgid);
                        });
                    }else{
                        this.$message.error(this.$parent.meetingObj.tit10)
                    }
                }
            }
            getDepartmentList(obj)

        },
        // 获取某一部门人员列表
        getDeparmentInfoDetail(deparmentChoice){
            var obj = {
                deparmentChoice: deparmentChoice,
                success:res => {
                    if(res.data.message.indexOf("getSuccess") > -1){
                        var array = [], arr = [] ,object = {}, boo = deparmentChoice !== sessionStorage.orgid;
                        array = boo ?  res.data.userList: res.data.data;
                        for (let index = 0; index < array.length; index++) {
                            object = {};
                            object.realname = array[index].realname;
                            object.isChecked = false;
                            object.userid = boo ? array[index].userid : array[index].psuserid;
                            object.nickname = array[index].nickname ? array[index].nickname : '无';
                            object.username = boo ? array[index].username : array[index].mobile;
                            object.orgid = deparmentChoice;
                            for (let n = 0; n < this.choiceArr.length; n++) {
                                if(this.choiceArr[n].userid == object.userid){
                                    this.choiceArr[n].department = deparmentChoice;
                                    this.choiceArr[n].dpNum = index;
                                    object.isChecked = true;
                                } 
                            }
                            arr.push(object);                        
                        }
                        this.ppObj[deparmentChoice] = arr; 
                        this.ppDetail = this.ppObj[deparmentChoice];
                        this.replaceObj = this.copyLight(this.ppObj);
                    }else{
                        this.$message.error(this.$parent.meetingObj.tit10);
                    }
                }
            }
            deparmentChoice !== sessionStorage.orgid ? getDepartmentDetail(obj) : getCompanyPersonList(obj);
        },
        // 修改保存
        sendInfo(){
            var str = ''
            for (let index = 0; index < this.choiceArr.length; index++) {
                str +=  this.choiceArr[index].department + '@' + this.choiceArr[index].userid  + "||";
            }
            str = str.length > 3 ? str.substring(0,str.length-2) : '';
            this.allContent.value5.val = str;
            if(checkNull(this.allContent)){
                var st = this.allContent.starttime.val,et = this.allContent.endtime.val;
                if( !(new Date(st) < new Date(et)))  return this.$message.error(this.$parent.meetingObj.tit11); 
                var obj = {
                    st:getNowFormatDate(st),
                    et:getNowFormatDate(et),
                    str:str,
                    self:this,
                    success:res => {
                        if (res.data.message=="msg01") {
                            return this.$message.error('开会时间与别的会议有冲突，请重新选择');
                        }
                        if(res.data.message.indexOf("editSuccess") > -1){
                            this.cancel('/management/conferenceList/conferenceDetail/');
                        }else{
                            this.$message.error(this.$promptObj.updatefail);
                        }
                    }
                }    
                updateMeting(obj,true)
            } 
        }
    },
    computed:{
        colorselects(){
            return this.$parent.$router.options.routes[1].meta.colorselect;
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>

<style scoped>
    .demo-input-suffix .el-select{
        margin-left: 0px !important;
    }
    .changeconference-add{
        width: 98.5%;
        height: 1140px;
        padding: 10px;
    }
    .changeconference-add>div:not(.changeconference-tishi){
        background-color: #EFF5FB;
        width: 100%;
    }
    .changeconference-title{
        height: 245px;
        margin-bottom: 10px;
    }
    .conference-left{
        padding-left: 15px;
    }
    .changeconference-content{
        height: 560px;
        border-bottom: 10px solid #4377EE;
    }
    .changeconference-title .el-row{
        margin: 0 40px;
    }
    .changeconference-title .el-col{
        margin-top: 25px;
        color: #333;
    }
    .changeconference-title .el-input{
        width: 80.5%;
        /* margin-left: 20px; */
    }
    .conference-name{
       display: inline-block;
       width: 110px;
   }
    .changeconference-title .el-col.padding40{
        padding-left: 40px;
    }
    .changeconference-title .el-col-6 .el-input{
        width: 60.5%;
    }
    .changeconference-title .el-col-6 .el-select{
        width: 60.5%
    }
    .changeconference-title .el-col-6 .el-select .el-input{
        width: 100%;
        margin: 0px;
    }
    .changeconference-title .el-col.renyuan .el-input{
        width: 90%;
    }
    .changeconference-title .el-col.renyuan .el-input{
        width: 100%;
        margin: 0px;
    }
    .changeconference-title .el-col.renyuan .el-select{
        width: 90%;
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
    .changeconference-content .el-textarea{
        width: 90%;
        vertical-align: top;
    }
    .changeconference-add .el-button{
        margin-top: 20px;
        color: #333;
        border: 0px;
    }
    .changeconference-tishi{
        display: inline-block;
        margin-left: 20px;
        color:#ccc;
        font-size:14px;
    }
    /* 弹出框样式 */
    .el-footer {
        color: #333;
        text-align: right;
        line-height: 60px;
    }
  
  .el-aside {
    color: #333;  
    text-align: center;
    line-height: 60px;
    font-size: 18px;
  }
  .aside-li{
      background-color: #c4c2c2;
      margin: 0px 5px 2px 0px;
      border-bottom: 1px solid  #c4c2c2;
  }
  .aside-li-active{
      background-color: #fff;
      border-bottom: 1px solid  #E9EEF3;
      margin: 0px 5px 2px 0px;
  }
  .aside-li:hover{
      cursor: pointer;
      background-color: #fff;
      border-bottom: 1px solid  #E9EEF3;
  }
  .el-main {
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
      cursor: pointer;
  }                                
</style>
