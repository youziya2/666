//会议室列表
<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="list-content">
            <div class="conferenceSearch">
                <!-- 会议室搜索 -->
                会议室搜索
                <el-input :placeholder="$buttonObj.keyWord"  v-model="scct" class="input-with-select" style="vertical-align: middle;">
                    <el-button slot="append" icon="el-icon-search" @click.native="doSearch" :style="{backgroundColor:colorselects}"></el-button>
                </el-input>
            </div>
            <div style="height: 30px;border-bottom: 1px solid #F1F4F6;margin-bottom: 10px;">
                <div class="conferenceSwitcher">
                    <div class="s-left" @click="remenbconferencetype(1)"><i class="iconfont icon-jiugongge" :style="{color:conferencetype==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbconferencetype(2)"><i class="iconfont icon-liebiao1" :style="{color:conferencetype==2?colorselects:''}"></i></div>
                </div>
                <!-- 全选 -->
                <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                <!-- 暂无数据 -->
                <div v-else class="content-null"> {{$buttonObj.noData}} </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="conferencebox">
                    <el-row :gutter="10" v-if="conferencetype == 1">
                        <el-col :span="5" v-for="(item,index) in product" :key="index">
                            <div class="conference-fffback" :class="item.listCheck?'conferenceActive':''" @mouseenter="conferenceActive = index" @mouseleave="conferenceActive = ''">
                                <template v-if="item.mtrname">
                                        <el-checkbox name="checkcolor" v-model="item.listCheck" @change="getChoice(totalChoice,index,item)" v-show="conferenceActive === index||item.listCheck">
                                        </el-checkbox>
                                </template>
                                <div class="conferenceLists" :title='item.mtrname'>
                                    <img src="./../../../static/img/meetingRoom.jpg" @click="goxiugai(item.mtrname,item,'mtrid')">
                                    <div class="txt-hidden">{{item.mtrname}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="conferenceTypeTwo" v-if="conferencetype == 2">
                        <li v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck" v-if="item.status">
                                <el-checkbox v-model="item.listCheck"  @change="getChoice(totalChoice,index,item)" v-show="listActive === index||item.listCheck"></el-checkbox>
                            </div>
                            <div class="listImg">
                                <img src="./../../../static/img/meetingRoom.jpg">
                            </div>
                            <div class="particulars" @click="goxiugai(item.mtrname,item,'mtrid')">
                                <div class="conferenceParticularsList">{{detialList.idNmber}}：{{item.mtrnum}}</div>
                                <div class="conferenceParticularsList">{{detialList.name}}：{{item.mtrname}}</div>
                                <div class="conferenceParticularsList">{{detialList.remark}}：{{item.remark}}</div>
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
import { batchDelete,getMtroomListBySearch,checkMtroombingMetting } from "./../../api/https.js";
import { meetingListInit } from "@/init/meeting.js";
import child from "./../../components/page.vue";
import { getNowFormatDate, getChoice, doChoice, goDetail, getScct, setScct, clearScct } from "./../../api/methods.js";
export default {
    data(){
        return{
            centerDialogVisible:false,
            list:[
                {router: '会议室管理'}
            ],
            end: '会议室列表',
            product:[],
            thisPage: 1, //当前页码(必填)
            perPage: 20, //每页记录数(必填)
            sumRecord:1,//记录条数
            scct:'', //搜索内容(英文Search Content的缩写)
            detialList: {
                idNmber: '编号',
                name: '名称',
                remark: '备注'
            },
            allCheck: '',//全选
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组  
            active:'0',
            hover:'0',
            conferenceActive:"",
            conferencetype:1,
            deletshow: false,
            listActive:'',
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
        if(sessionStorage.getItem('conferencetype') && sessionStorage.getItem('conferencetype').length){
            this.conferencetype = sessionStorage.getItem('conferencetype');
        };
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getScct();
        this.getData();
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
        conferencetype:function(){
            this.allCheck = false;
            this.product.forEach(e => {
                e.listCheck = false;
            });
        }
    },
    methods:{      
        // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //获取导航列表传过来的值
        initData(){
            this.scct = '';
            this.getData();
            clearScct('meetingRoomScct');
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(250);
        },
        // 详情跳转
        goxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/meetingRoom/roomDetail/',"./static/img/smallyy.png",gdid);
            this.$emit('addxiugai',add);
        },
        remenbconferencetype(index){
            this.totalChoice = [];//点击数组
            this.totalChecked = [];//选择数组
            this.conferencetype = index;
            sessionStorage.setItem('conferencetype',index);
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                scct: '',
                states: '',
                active: ''
            }
            this.thisPage = 1;
            getScct('meetingRoomScct',obj,this);
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct,
                active: this.active,
                states: this.states
            }
            setScct('meetingRoomScct',obj)
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
                    if(element.mtrnum){
                        element.listCheck = true;
                        this.totalChoice.push(element.mtid);
                    }
                } else {
                    if(element.listCheck){
                        element.listCheck = false;
                        this.totalChoice = [];
                    }
                }
            });
        },
        // 点击激活提示按钮
        getChoice(arr,num,item){
            getChoice(arr,num,item.listCheck,item.mtrid)
        },
        // 点击删除
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2);
            this.$bus.emit('deleteArr',this[arr2],'mtrid');
        },
         // 删除
        delOne(){
            var obj = {
                success:res => {  //res是server端响应
                var res = JSON.parse(res)
                console.log(res)
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
            batchDelete('BHMeetingServiceInfc.batchRemoveMtroom','mtroom',obj)
        },
        // 获取会议室列表
        getData(){
            var obj = {
                self: this,
                success:res => {
                    console.log(res.data)
                    if (res.data.code == '200') {
                        var array = res.data.data.mtroomList;
                        this.product = [];
                        for (let index = 0; index < array.length; index++) {
                            array[index].listCheck = false;
                            this.product.push(array[index]);
                        }
                        this.$bus.emit('doPage',res.data.data.sumRecord,this.perPage,this.thisPage)
                    } else {
                        this.$message.error(this.$promptObj.searchfail)
                    }
                }
            }
            getMtroomListBySearch(obj);
        }
    }
}
</script>

<style scoped>
    .list-content{
        padding: 20px 50px;
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
        top: 15px;
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
        min-height: 620px;
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
        overflow: hidden;
        width: 98%;
        padding: 20px 15px;
        margin-bottom: 10px;
    }
    .conferenceTypeTwo li>div{
        float: left;
    }
    .conferenceTypeTwo li:not(.listBack):hover{
        background-color: #F1F4F6;
    }
    .listCheck{
        margin-top: 66px;
        width: 15px;
        height: 20px;
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
        width: 70%;
    }
    .particulars:hover{
        cursor: pointer;
    }
    .conferenceParticularsList{
        margin-bottom: 22px;
        text-align: left;
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
        padding:2px;
        font-size:12px;
        color:#fff;
        width:16%;text-align:center;
        line-height: 16px;
        border-radius: 3px;
        position: absolute;
        top: 26px;
        z-index: 9;
        left: 30px;
    }
    .zhuangtai.lis{
        top: 5px;
        left: 35px;
    }
    .conferenceSearch,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
        position: absolute;
        top: -95px;
        left: 50px;
        z-index: 999;
    }
    .conferenceSearch>div{
        width: 400px;
        margin-left: 40px;
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