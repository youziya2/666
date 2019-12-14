<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="list-content">
            <div class="conferenceTime">
                <!-- 开始时间 -->
                开始时间
                <el-date-picker class="input-with-select" v-model="starttime" type="datetime" placeholder="开始时间"></el-date-picker>
                <!-- 结束时间 -->
                结束时间
                <el-date-picker class="input-with-select" v-model="endtime" type="datetime" placeholder="开始时间"></el-date-picker>
            </div>
            <div class="conferenceSearch">
                <!-- 会议搜索 -->
                {{$parent.meetingObj.tit03}}
                <el-input :placeholder="$parent.meetingObj.tit12"  v-model="scct" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click.native="doSearch" :style="{backgroundColor:colorselects}"></el-button>
                </el-input>
            </div>
            <div>
                <div class="filtrate">
                    <!-- 条件筛选 -->
                    <span style="display:inline-block;">{{$parent.meetingObj.tit04}}</span> 
                    <div class="filtrateName">
                        <div v-for="(item,index) in filname" :key="index" :style="{border:(active == index ?'1px solid'+colorselects:''),color:(active == index||hover == index?colorselects:'')}"
                         @mouseenter="hover = index" @mouseleave="hover = ''" @click="getInfos(index)">{{item}}</div>
                    </div>
                </div>
                <!-- <div class="conferenceSwitcher">
                    <div class="s-left" @click="remenbconferencetype(1)"><i class="iconfont icon-jiugongge" :style="{color:conferencetype==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbconferencetype(2)"><i class="iconfont icon-liebiao1" :style="{color:conferencetype==2?colorselects:''}"></i></div>
                </div> -->
                <div class="cut">
                        <!-- 全选 -->
                    <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                    <!-- 暂无数据 -->
                    <div v-else class="content-null"> {{$buttonObj.noData}} </div>
                </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="conferencebox">
                    <el-row :gutter="10" v-if="conferencetype == 1">
                        <el-col :span="5" v-for="(item,index) in product" :key="index">
                            <div class="conference-fffback" :class="item.listCheck?'conferenceActive':''" @mouseenter="conferenceActive = index" @mouseleave="conferenceActive = ''">
                                <el-checkbox name="checkcolor" v-model="item.listCheck" @change="getChoice(totalChoice,index,item.listCheck,item.mtid)" v-show="conferenceActive === index||item.listCheck"></el-checkbox>
                                <div class="zhuangtai" :style=" { backgroundColor : filnameColor[item.states]}">{{filname[item.states/1 + 1]}}</div>
                                <div class="conferenceLists" :title='item.mttile'>
                                    <img src="../../../static/img/conference.png" @click="goxiugai(item.mttile,item,'mtid')">
                                    <div class="txt-hidden">{{item.mttile}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="conferenceTypeTwo" v-if="conferencetype == 2">
                        <li v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck"  @change="getChoice(totalChoice,index,item.listCheck,item.mtid)" v-show="listActive === index||item.listCheck"></el-checkbox>
                            </div>
                            <!-- <div class="listImg">
                                <div class="zhuangtai" :style=" { backgroundColor : filnameColor[item.states]}">{{filname[item.states/1 + 1]}}</div>
                                <img src="../../../static/img/conference.png">
                            </div> -->
                            <div class="particulars">
                                <div class="zhuangtai" :style=" { backgroundColor : filnameColor[item.states]}">{{filname[item.states/1 + 1]}}</div>
                                <div class="txt-hidden" style="display: inline-block;vertical-align: middle;font-size: 18px;">
                                    {{item.mttile}} 
                                    <span @click="goxiugai(item.mttile,item,'mtid')" style="display: inline-block; margin-left: 15px; color: blue;font-size: 14px;
                                    cursor: pointer;">详情</span>
                                </div>
                                <div class="conferenceParticularsList">
                                    <div>{{detialList.keyspea}}：{{item.keyspea}}</div>
                                    <div style="width:25%;">{{detialList.starttime}}：{{item.starttime}}</div>
                                    <div style="width:25%;">{{detialList.endtime}}：{{item.endtime}}</div>
                                    <div style="width:30%;">{{detialList.address}}：{{item.mtrname}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 删除提示框 -->
                    <el-dialog
                    :title="$promptObj.warn"
                    :visible.sync="centerDialogVisible"
                    width="330px"
                    center>
                    <span>{{$promptObj.delwarn}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="delOne">{{$buttonObj.sure}}</el-button>
                    </span>
                    </el-dialog>
                    <!-- 删除按钮 -->
                    <el-button conferencetype="danger" @click="doChoice(totalChoice,'totalChecked')"  class="show-delet-btn" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { batchDelete,getMeetingList } from "./../../api/https.js";
import { meetingListInit } from "@/init/meeting.js";
import child from "./../../components/page.vue";
import { getNowFormatDate, getChoice, doChoice, goDetail, getScct, setScct, clearScct } from "./../../api/methods.js";
export default {
    data(){
        return{
            centerDialogVisible:false,
            list:[
                {router: this.$parent.meetingObj.tit09}
            ],
            end: this.$parent.meetingObj.tit02,
            product:[],
            thisPage: 1, //当前页码(必填)
            perPage: 20, //每页记录数(必填)
            states:'', //会议状态0/1/2
            sumRecord:1,//记录条数
            starttime: '',
            endtime: '',
            scct:'', //搜索内容(英文Search Content的缩写)
            options: {},
            detialList: {},
            allCheck: '',//全选
            selectNum:0,//选中的数量
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组  
            active:'0',
            hover:'0',
            conferenceActive:"",
            conferencetype: 2,
            deletshow: false,
            add:{},
            numcolor:[],
            listActive:'',
            filname:{},//会议状态
            filnameColor: {
                "0" : '#4377EE',
                "1" : '#EF8641',
                "2" : '#999999'
            },
            windowHeight:''
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
     components:{
        child
    },
    created(){
        // if(sessionStorage.getItem('conferencetype') && sessionStorage.getItem('conferencetype').length){
        //     this.conferencetype = sessionStorage.getItem('conferencetype');
        // };
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        meetingListInit(this);
        this.getScct();
        this.getData();
        window.addEventListener('beforeunload', e => {
            sessionStorage.formInfoPage = false;
        });
    },
    watch:{
        product:{
            deep:true,
            handler:function(n){
                this.deletshow = false;
                this.allCheck = true;
                n.forEach(e => {
                    e.listCheck ? this.deletshow = true : '';
                    e.listCheck ? '' : this.allCheck = false;
                });
            }
        },
        // conferencetype:function(){
        //     this.allCheck = false;
        //     this.product.forEach(e => {
        //         e.listCheck = false;
        //     });
        // }
    },
    methods:{
        // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //获取导航列表传过来的值
        initData(){
            this.starttime = '';
            this.endtime = '';
            this.scct = '';
            this.getInfos(0,1);
            clearScct('meeting');
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(457);
        },
        // 详情跳转
        goxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/conferenceList/conferenceDetail/',"./static/img/smallyy.png",gdid)
            this.$emit('addxiugai',add);
        },
         // 获取某一系列
        getInfos(num,str){
            if (this.active == num && !str) return true;
            this.active = num
            if (num == '0') {
                this.scct = ''
                this.states = ''
            } else {
                this.states = num - 1
            }
            this.thisPage = 1
            this.setScct();
            this.getData()
        },
        remenbconferencetype(index){
            this.totalChoice = [];//点击数组
            this.totalChecked = [];//选择数组
            // this.conferencetype = index;
            // sessionStorage.setItem('conferencetype',index)
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                starttime: '',
                endtime: '',
                scct: '',
                states: '',
                active: ''
            }
            this.thisPage = 1
            getScct('meeting',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                starttime: this.starttime,
                endtime: this.endtime,
                scct: this.scct,
                active: this.active,
                states: this.states
            }
            setScct('meeting',obj)
        },
         // 按内容搜索
        doSearch(){
            this.thisPage = 1;
            this.setScct();
            this.getData();
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.mtid);
                } else {
                    element.listCheck = false;
                    this.totalChoice = [];
                }
            });
        },
        // 点击激活提示按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        // 点击删除
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'mtid')
        },
         // 删除商品
        delOne(){
            var obj = {
                success:res => {  //res是server端响应
                var res = JSON.parse(res)
                    if (res.message.indexOf("removeSuccess") > -1) {
                        this.$message.success(this.$promptObj.removesuccess);
                        this.centerDialogVisible = false;
                        this.$bus.emit('removeTab',this.totalChecked)
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHMeetingServiceInfc.batchRemoveMeeting','meeting',obj)
        },
        // 数据请求
        getData(){
            var st = this.starttime,et = this.endtime;
            if( st && et && !(new Date(st) < new Date(et)))  return this.$message.error("开始时间必须小于结束时间");  
            var obj = {
                st: getNowFormatDate(st),
                et: getNowFormatDate(et),
                success: response => {
                    if (response.data.code == 200) {
                        var arr =  response.data.data.meetingList , obj = {};
                        this.product.length = 0;//清空数组
                        for (let index = 0; index < arr.length; index++) {
                            arr[index].listCheck = false; 
                            this.product.push(arr[index]);
                        }
                        this.$bus.emit('doPage',response.data.data.page.sumRecord,this.perPage,this.thisPage);
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                self:this
            }
            getMeetingList(obj);
        }
    }
}
</script>

<style scoped>
    .list-content{
        padding: 40px 50px;
        padding-bottom: 0px;
        background-color: #fff;
        position: relative;
    }
    .cuttitle{
        color: #333;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 28px;
        margin-top: 25px;
    }
    /* 切换列表器样式 */
    .conferenceSwitcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 125px;
        right: 50px;
    }
    .conferenceSwitcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .conferenceSwitcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .s-left{
        border-right: 1px solid #F1F4F6;
    }
    /* end */
    .conferencebox{
        min-height: 470px;
        position: relative;
    }
    .conferencebox .el-col{
        margin:  0 1% 15px 0;
        width: 19%;
    }
    .conferenceLists{
        color: #666;
        text-align: center;
        width: 82%;
        padding: 15px 10px;
        padding-bottom: 5px;
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor:pointer;
        position: relative;
        padding: 10px;
    }
    .conference-fffback .el-checkbox{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .conferenceLists img{
        width: 100%;
    }
    .list-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .conferenceTypeTwo li{
        /* height: 180px; */
        width: 98%;
        overflow: hidden;
        margin-bottom: 15px;
    }
    .conferenceTypeTwo li>div{
        float: left;
    }
    .conferenceTypeTwo li:not(.listBack):hover{
        background-color: #F1F4F6;
    }
    .listCheck{
        margin-top: 22px;
        width: 15px;
        height: 20px;
        padding: 0px 20px 0px 10px;
    }
    .listImg img{
        width: 100%;
    }
    .listImg{
        width: 15.5%;
        padding-left: 33px;
        padding-right: 40px;
        position: relative;
    }
    .particulars{
        /* height: 160px; */
        width: 95%;
        padding-top: 20px;
        border-bottom: 1px solid #E4E4E4;
    }
    /* .particulars:hover{
        cursor: pointer;
    } */
    .conferenceParticularsList{
        padding: 15px 0 5px;
        overflow: hidden;
    }
    .conferenceParticularsList>div{
        width: 20%;
        /* margin-bottom: 22px; */
        float: left;
        color: #666;
        font-size: 14px
    }
    .listBack{
        background-color: #E4E4E4;
    }
    .el-checkbox span>span{
        border: 1px solid #999;
    }
    /* 九宫格背景颜色 */
    .conference-fffback{
        width: 94%;
        padding: 10px;
        position: relative;
    }
    .conference-fffback.conferenceActive{
        background-color: #E4E4E4;
    }
    .conference-fffback:not(.conferenceActive):hover{
        background-color: #F1F4F6;
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
    .zhuangtai .lis{
        top: 5px;
        left: 35px;
    }
    .conferenceSearch,.filtrate,.conferenceTime{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .conferenceSearch>div{
        width: 400px;
        margin-left: 40px;
    }
    .conferenceTime{
        margin-bottom: 25px;
    }
    .conferenceTime>div{
        width: 200px;
        margin: 0px 40px;
    }
    .conferenceSearch>div .el-input__inner{
        height: 36px;
    }
    .conferenceSearch .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .conferenceSearch .el-input-group__append button{
        height: 40px;
        padding-top: 9px;
    }
    .conferenceSearch .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .conferenceSearch ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    .filtrate{
        margin-top: 25px;
        margin-bottom: 20px;
    }
    .filtrate .filtrateName{
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        color: #666666;
        margin-left: 40px;
    }
    .filtrateName div{
        margin-right: 40px;
        padding: 8px 19px;
        border-radius:5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0);
    }
    .filtrateName div:hover{
        cursor:pointer;
    }
</style>