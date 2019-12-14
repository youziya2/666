<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="feedBackListContent">  
            <!-- 查询条件          -->
            <div class="feedbackInput">
                <div>
                    <span class="grid-content">{{fbInfo.scct.name}}</span>
                    <el-input v-model="fbInfo.scct.val" :placeholder="fbList.search"></el-input>
                </div>
                <div>
                    <span class="grid-content">{{fbInfo.starttime.name}}</span> 
                    <el-date-picker
                        v-model="fbInfo.starttime.val"
                        type="date"
                        :placeholder="fbList.choose">
                    </el-date-picker>
                </div>
                <div>
                    <span class="grid-content">{{fbInfo.endtime.name}}</span>
                    <el-date-picker
                        v-model="fbInfo.endtime.val"
                        type="date"
                        :placeholder="fbList.choose">
                    </el-date-picker>
                </div>
            </div>
            <div class="feedbackInput">
                <div>
                    <span class="grid-content">{{fbInfo.subtypes.name}}</span>
                    <el-select v-model="fbInfo.subtypes.val" :placeholder="fbList.choose">
                        <el-option
                        v-for="(item,k) in subtypes"
                        :key="k"
                        :label="item"
                        :value="k">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="grid-content">{{fbInfo.levels.name}}</span>　
                    <el-select v-model="fbInfo.levels.val" :placeholder="fbList.choose">
                        <el-option
                        v-for="(item,k) in levels"
                        :key="k"
                        :label="item"
                        :value="k">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="grid-content">{{fbInfo.states.name}}</span>
                    <el-select v-model="fbInfo.states.val" :placeholder="fbList.choose">
                        <el-option
                        v-for="(item,k) in states"
                        :key="k"
                        :label="item"
                        :value="k">
                        </el-option>
                    </el-select>
                </div>
                <el-button :style="{backgroundColor:colorselects,color:'#fff'}" class="feedBackQuery" @click.native="doSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <!-- 反馈列表 -->
            <el-scrollbar style="width:100%;overflow-x: hidden;padding-top: 25px;margin-top: 35px;border-top: 1px solid #CCCCCC;" :style="{height:getheight}">
                <div style="min-height: 485px;">
                    <table class="feedBackListTable" spellcheck="0">
                        <tr class="feedth">
                            <th><el-checkbox v-model="checked" @change="quanxuan()"></el-checkbox></th>
                            <!-- 优先级 -->
                            <th>{{ fbList.levels }}</th>
                            <!-- 反馈内容 -->
                            <th>{{ fbList.answers }}</th>
                            <!-- 用户姓名 -->
                            <th>{{fbList.name}}</th>
                            <!-- 用户账号 -->
                            <th>{{fbList.account}}</th>
                            <!-- 反馈时间 -->
                            <th>{{fbList.savetime}}</th>
                            <!-- 问题状态 -->
                            <th>{{fbList.states}}</th>
                            <!-- 操作 -->
                            <th style="border:0px;">{{fbList.operating}}</th>
                        </tr>
                        <tr v-if='feedBackList.length == 0' class="content-null">
                                <!-- 暂无数据 -->
                             <td colspan="8">{{$buttonObj.noData}}</td> 
                        </tr>
                        <tr v-for="(i,index) in feedBackList" :key="index" :class="{feedBackListTableChecked:i.listCheck}">
                            <td><el-checkbox v-model="i.listCheck" @change="getChoice(totalChoice,index,i.listCheck,i.fbid)"></el-checkbox></td>
                            <td>
                                <img :src="imgs[i.levels]">
                                <span>{{levels[i.levels/1 + 1]}}</span>
                            </td>
                            <td class="feedBackTableContent">{{ i.content | capitalize }}</td>
                            <td>{{i.realname}}</td>
                            <td>{{i.username}}</td>
                            <td>{{i.savetime}}</td>
                            <td>
                                <div class="ListCode" :style=" { backgroundColor:backGroundColor[i.states] }">{{states[i.states/1 +1]}}</div>
                            </td>
                            <!-- 处理 -->
                            <td :style="{color:colorselects}"><span style="cursor:pointer;" @click="goappxiugai(i.content,i,'fbid')">{{fbList.handl}}</span></td>
                        </tr>
                        <!-- 删除按钮 -->
                        <el-button type="danger" class="feedBackDelet" @click="doChoice(totalChoice,'totalChecked')" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                    </table>
                </div>
                <!-- 删除按钮 -->
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
                    <!-- <el-button type="danger" class="show-delet-btn"  @click="doChoice(totalChoice,'totalChecked')" v-show="deletshow">删除</el-button> -->
                <!--分页-->
                <child @current='getCurrent'></child> 
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import child from "./../../components/page.vue";
import { getFeedbackList,batchDelete } from '@/api/https'
import { fbListInit } from '@/init/feedback'
import { getNowFormatDate,getChoice,doChoice,goDetail,getScct,setScct,clearScct } from "./../../api/methods.js";
export default {
    data(){
        return{
            list:[
                {router:"用户反馈"}
            ],
            end:"反馈列表",
            imgs:{
                '0': './static/img/fb_nomarl.png',
                '1': './static/img/fb_important.png',
                '2': './static/img/fb_urgent.png',
                '3': './static/img/fb_critical.png'
            },
            backGroundColor:{
                '0': "#D81919",
                '1': "#D98C1E",
                '2': "#0FBD50"
            },
            fbList: {},
            fbInfo: {},
            subtypes: {},
            levels: {}, //问题级别
            states: {},//问题状态
            subtypesVal: '',
            levelsVal: '', 
            statesVal: '',
            thisPage: 1, //当前页码
            perPage: 20, //每页记录数
            sumRecord : 0,// 总纪录条数
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            selectNum:0,//选中的数量
            centerDialogVisible: false,
            currs: '',
            checked:'',
            feedBackList:[],
            deletshow:false,
            getheight:''
        }
    },
    components:{
        child
    },
    filters: {
        capitalize: function(value) {
            var str = '' 
            if(value.length > 25) str = value.substring(0,25) + "……"
            else str = value
            return str
        }
    },
    created(){
        fbListInit(this);
        this.list[0].router = this.fbList.ctfb;
        this.end = this.fbList.fbList;
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getScct();
        this.getData();
    },
    methods:{
        // 获取分页组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.subtypesVal = ''
            this.levelsVal = ''
            this.statesVal = ''
            clearScct('fb')
            fbListInit(this);
            this.getData()
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                starttime: '',
                endtime: '', 
                scct: '',
                subtypes: '',
                levels: '', 
                states: ''
            }
            this.thisPage = 1
            if(!sessionStorage.scctObj) return false;
            var scctObj = JSON.parse(sessionStorage.scctObj).fb || {};
            if(scctObj){
                for (const key in this.fbInfo) {
                    if(scctObj[key]) this.fbInfo[key].val = scctObj[key];
                }
            }
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                starttime: '',
                endtime: '', 
                scct: '',
                subtypes: '',
                levels: '', 
                states: ''
            }
            for (const key in this.fbInfo) {
                if(this.fbInfo[key].val)  obj[key] = this.fbInfo[key].val
            }
            setScct('fb',obj)
        },
        // 点击搜索
        doSearch(){
            this.thisPage = 1;
            this.setScct();
            this.getData();
        },
        // 点击选择框
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        // 点击删除
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'fbid')
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
                        this.quanxuan()
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHFeedbackServiceInfc.batchRemoveFeedback','feedback',obj)
        },
        // 全选
        quanxuan(){
            this.checked ? this.feedBackList.forEach(element => element.listCheck = true):this.feedBackList.forEach(element => element.listCheck = false);
        },
        // 详情跳转
        goappxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/feedBack/feedBackDetail/',"./static/img/smallyy.png",gdid)
            this.$emit('addxiugai',add);
        },
        getHeight(){
            this.getheight = this.$config.getHeight(390);
        },
        // all转化为''
        turnArr(){
            var numargs = arguments.length , str = '';
            for (let index = 0; index < numargs; index++) {
                str = this.fbInfo[arguments[index]].val;
                if (str == 'all' || str == '0') {
                    this[arguments[index] + 'Val'] = '';
                } else {
                    this[arguments[index] + 'Val'] = str - 1 > -1 ? str - 1 : str;
                }
            } 
        },
        //获取反馈列表  
        getData(){
            this.turnArr('subtypes', 'levels', 'states')
            if( (new Date(this.fbInfo.starttime.val) > new Date(this.fbInfo.endtime.val)))  return this.$message.error("结束时间不能小于开始时间")  
            if(this.fbInfo.starttime.val) this.fbInfo.starttime.val = getNowFormatDate(new Date(this.fbInfo.starttime.val),true)
            if(this.fbInfo.endtime.val) this.fbInfo.endtime.val = getNowFormatDate(new Date(this.fbInfo.endtime.val),true)
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.feedbackList , obj = {}
                        this.feedBackList = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            obj.savetime = getNowFormatDate(new Date(obj.savetime))
                            obj.listCheck = false
                            this.feedBackList.push(obj)
                        }             
                        this.$bus.emit('doPage',response.data.page.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                    this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getFeedbackList(obj)
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    watch:{
        feedBackList:{
            deep:true,
            handler:function(n){
                this.deletshow = false;
                this.checked = this.feedBackList.length >0 ? true : false;
                n.forEach(element => {
                    element.listCheck?this.deletshow = true:this.checked = false;
                });
            }
        }
    }
}
</script>

<style scoped>
    .feedBackListSearch{
        position: fixed;
        top: 80px;
        right: 40px;
        z-index: 999999;
    }
    .feedBackListSearch,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .feedBackListSearch>div{
        width: 400px;
        margin-left: 40px;
    }
    .feedBackListSearch>div .el-input__inner{
        height: 36px;
    }
    .feedBackListSearch .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .feedBackListSearch .el-input-group__append button{
        height: 40px;
        padding-top: 6px;
        padding-bottom: 10px;
    }
    .feedBackListSearch .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .feedBackListSearch ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    .feedBackListContent{
        padding: 10px 20px;
        padding-bottom: 0px;
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
    }
    .feedbackInput{
        box-sizing: border-box;
        overflow: hidden;
        margin-top: 25px;
        margin-left: 3.7%;
    }
    .feedbackInput>div{
        width: 24%;
        display: inline-block;
        font-size: 14px;
        color: #333;
    }
    .feedbackInput>div>div{
        width: 53% !important;
    }
    .feedbackInput>div>div>input{
        height: 36px;
    }
    .feedBackQuery{
        box-sizing: border-box;
        height: 40px;
        width: 100px;
        vertical-align: middle;
    }
    .feedBackListTable{
        width: 100%;
        border-spacing: 0;
        position: relative;
    }
    .feedBackListTable th{
        padding: 10px;
        box-sizing: border-box;
        background-color: #F1F4F6;
        font-size: 18px;
        color: #666;
        border-right: 1px solid #CCC;
    }
    .feedBackListTable td{
        font-size: 14px;
        color: #666;
        padding: 10px;
        text-align: center;
        cursor: default;
    }
    .feedBackListTable tr:not(.feedth):not(.content-null):hover{
        background-color: #F1F4F6;
    }
    .feedBackListTableChecked{
        background-color: #E4E4E4 !important;
    }
    .feedBackTableContent{
        width: 32%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .ListCode{
        /* width: 60px; */
        height: 24px;
        padding: 0px 3px;
        font-size: 14px;
        color: #fff;
        line-height: 24px;
        display: inline-block;
    }
    .fenye{
        text-align: center;
        margin-top: 60px;
        margin-bottom: 40px;
    }
    .feedBackDelet{
        width: 100px;
        height: 36px;
        line-height: 10px;
        background-color: red;
        position: absolute;
        bottom: -100px;
        left: 0px;
        z-index: 999;
    }
</style>
