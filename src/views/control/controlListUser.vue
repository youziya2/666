<template>
        <div>
            <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
            <div class="controlListSearch">
                <el-input :placeholder="$buttonObj.keyWord" class="input-with-select" v-model='scct'>
                    <el-button slot="append" icon="el-icon-search" @click.native="doSearch()" :style="{backgroundColor:colorselects}"></el-button>
                </el-input>
            </div>
            <div class="controlContent">
                <div class="cut" style="background-color:#F1F4F6;margin:0px;"></div>
                <el-scrollbar style="width:100%;overflow-x: hidden;min-width: 1280px;" :style="{height:windowHeight}">
                    <div class="controlLeft">
                        <div class="controlList" :style="" v-for="(item,index) in controlList" :key="index"  @click="clickProduct(index)"
                         :style="listActive == index?'background-color:#fff':''">
                            <div class="controlListImg"><img src="./../../../static/img/mantoux.png"></div>
                            <div class="controlListDetail">
                                    <!-- 用户名称 -->
                                <div>{{ $parent.controlObj.tit16 }}：{{ item.realname }}</div>
                                <!-- 联系方式 -->
                                <div>{{ $parent.controlObj.tit17 }}：{{ item.phone || item.mobile }}</div>
                                <!-- 用户ID -->
                                <div>{{ $parent.controlObj.tit18 }}：{{ item.cpuserid }}</div>
                                <!-- <div>联系方式：<span>{{item.phone}}</span></div> -->
                            </div>
                        </div>
                       <!--分页-->
                       <div class='page-cut'></div>
                        <child @current='getCurrent'></child> 
                    </div>
                    <div class="controlRight">
                        <div class="inner-container">
                            <div class="controlRightsmall" v-for="(itemsp,index) in sonPopedom" :key="index">
                                <template v-if = 'itemsp.pdcname'>
                                    <div class="controlRightsmallTitle">
                                        {{itemsp.pdcname}}
                                        <!--按钮-->
                                        <div @click="clickBtn(itemsp,'checked')" style="display: inline-block;margin-left: 46px;cursor: pointer;">
                                            <!-- 关闭 -->
                                            <span style="font-size: 14px;" :style=' !itemsp.checked ? "color: #409EFF;" : "color: gray;"'>{{ $parent.controlObj.tit04 }}</span>
                                            <div :class="itemsp.checked?'selected':'default'">
                                                <div class="btns">
                                                    <span v-if="itemsp.checked" class="cir_right"></span>
                                                    <span v-else class="cir_left"></span>
                                                </div>            
                                            </div>
                                            <!-- 开启 -->
                                            <span style="font-size: 14px" :style=' itemsp.checked ? "color: #409EFF;" : "color: gray;"'>{{ $parent.controlObj.tit05 }}</span>
                                        </div>
                                    </div>
                                    <div class="controlRightsmallSmall">
                                        <div>
                                                <!-- 试用 -->
                                            <div style="width:20%;">
                                                <div>{{ $parent.controlObj.tit06 }}：</div>
                                            </div>
                                            <!-- 一周 -->
                                            <div style="width:80%" class="checheche">
                                                <div>
                                                    <span class="checkbox-class" @click='checkBox(itemsp,"weekCheck","week")' :class=" itemsp.weekCheck ? 'isChoice' : 'notChoice'"
                                                    :style="!itemsp.checked ? 'cursor: not-allowed;' : ''">
                                                        <i v-if='itemsp.weekCheck' class="el-icon-check" style="color: white"></i>
                                                    </span>
                                                    <span style="color: black;margin-right: 5px">{{ $parent.controlObj.tit08 }}</span>    
                                                    <span>{{ itemsp.checkStatus == 'week' ? itemsp.usstarttime : itemsp.date}} - {{itemsp.week || ''}}</span>
                                                </div>
                                                <!-- 半个月 -->
                                                <div>
                                                    <span class="checkbox-class" @click='checkBox(itemsp,"halfMonthCheck","halfMonth")' :class=" itemsp.halfMonthCheck ? 'isChoice' : 'notChoice'"
                                                    :style="!itemsp.checked ? 'cursor: not-allowed;' : ''">
                                                        <i v-if='itemsp.halfMonthCheck' class="el-icon-check" style="color: white"></i>
                                                    </span>
                                                    <span style="color: black;margin-right: 5px">{{ $parent.controlObj.tit09 }}</span>
                                                    <span>{{ itemsp.checkStatus == 'halfMonth' ? itemsp.usstarttime : itemsp.date}} - {{itemsp.halfMonth || ''}}</span>
                                                </div>
                                                <!-- 一个月 -->
                                                <div>
                                                    <span class="checkbox-class" @click='checkBox(itemsp,"monthCheck","month")' :class=" itemsp.monthCheck ? 'isChoice' : 'notChoice'"
                                                    :style="!itemsp.checked ? 'cursor: not-allowed;' : ''">
                                                        <i v-if='itemsp.monthCheck' class="el-icon-check" style="color: white"></i>
                                                    </span>
                                                    <span style="color: black;margin-right: 5px">{{ $parent.controlObj.tit10 }}</span>
                                                    <span>{{ itemsp.checkStatus == 'month' ? itemsp.usstarttime : itemsp.date}} - {{itemsp.month || ''}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                                <!-- 购买 -->
                                            <div style="width:20%;">{{ $parent.controlObj.tit07 }}：</div>
                                            <div style="width:80%" class="checheche">
                                                    <!-- 年 -->
                                                <div style="line-height: 26px">
                                                    <span class="checkbox-class" @click='checkBox(itemsp,"yearCheck","year")' :class=" itemsp.yearCheck ? 'isChoice' : 'notChoice'" style="margin-top: 6px;"
                                                    :style="!itemsp.checked ? 'cursor: not-allowed;' : ''">
                                                        <i v-if='itemsp.yearCheck' class="el-icon-check" style="color: white"></i>
                                                    </span>
                                                    <span>
                                                        <input class="year-input" v-model="itemsp.numData" @change='inputYear(itemsp)' @keyup='inputYear(itemsp)' type="number" @blur='imputZero(itemsp)'
                                                        :style="!itemsp.checked ? 'cursor: not-allowed;' : ''" :disabled='!itemsp.checked' step="1"  :min="minN" :max="maxN"/>
                                                    </span> 
                                                    <span style="color: black;margin-right: 5px">{{ $parent.controlObj.tit11 }}</span>
                                                    <span>{{ itemsp.checkStatus == 'year' ? itemsp.usstarttime : itemsp.date}} - {{ itemsp.year }}</span>
                                                </div>
                                                <!-- 长期 -->
                                                <div>
                                                    <span class="checkbox-class" @click='checkBox(itemsp,"noEndDateCheck","noEndDate")' :class=" itemsp.noEndDateCheck ? 'isChoice' : 'notChoice'"
                                                    :style="!itemsp.checked ? 'cursor: not-allowed;' : ''">
                                                        <i v-if='itemsp.noEndDateCheck' class="el-icon-check" style="color: white"></i>
                                                    </span>
                                                    <span style="color: black;margin-right: 5px">{{ $parent.controlObj.tit12 }}</span>
                                                    <span>{{ itemsp.checkStatus == 'noEndDate' ? itemsp.usstarttime : itemsp.date}} - {{itemsp.noEndDate || ''}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </template>
    
    <script>
    import { getScct,setScct,clearScct } from "@/api/methods"
    import { getTpopedomList,getBackstageList,getLimittimeList,saveGoodsppd } from "@/api/https"
    import child from "./../../components/page.vue";
    export default {
        data(){
            return{
                list:[{router: this.$parent.controlObj.tit03}],
                end: this.$parent.controlObj.tit02,
                windowHeight:'',
                controlList:[],
                sonPopedom: [],
                // 复选框
                checkArr:['halfMonthCheck',
                        'monthCheck',
                        'weekCheck',
                        'yearCheck',
                        'noEndDateCheck'
                ],
                minN: 1,
                maxN: 9,
                checkNum: -1,
                listActive:0,
                scct: '',
                thisPage: 1, //当前页码
                perPage: 6, //每页记录数
                sumRecord : 0,// 总纪录条数
            }
        },
        created(){
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
            this.getScct();
            this.getBackstageList();
        },
        components:{
            child
        },
        computed:{
            colorselects(){
                return this.$route.matched[0].meta.colorselect;
            }
        },
        methods:{
            getHeight(){
                this.windowHeight = this.$config.getHeight(240);
            },
            //获取导航列表传过来的值
            initData(){
                this.thisPage = 1
                this.listActive = 0
                this.scct = ''
                this.gdid = ''
                clearScct('ctlu');
                this.getBackstageList()
            },
            // 获取搜索条件
            getScct(){
                var obj = {
                    scct: '',
                    gdid: ''
                }
                this.thisPage = 1
                getScct('ctlu',obj,this)
            },
            // 记录搜索条件
            setScct(){
                var obj = {
                    scct: this.scct,
                    gdid: this.gdid
                }
                setScct('ctlu',obj)
            },
            // 点击搜索
            doSearch(){
                this.setScct();
                this.thisPage = 1;
                this.listActive = 0;
                this.getBackstageList();
            },
             // 获取分页组件传过来的值
             getCurrent(data){
                this.thisPage = data;
                this.listActive = 0;
                this.getBackstageList();
            },
            // 获取单品列表
            getBackstageList(){
                var obj = {
                    self: this,
                    success:res => {  //res是server端响应
                        if (res.data.message.indexOf("getSuccess") > -1) {
                            this.controlList = [];
                            var array = res.data.companyList;
                            array.forEach(element => {
                                this.controlList.push(element.fieldvalues)
                            });
                            this.$bus.emit('doPage',res.data.page.sumRecord,this.perPage,this.thisPage);
                            if(this.controlList.length > 0) this.getTpopedomList();
                        } else {
                            this.$message.error(this.$promptObj.searchfail);
                        }
                    }
                }
                getBackstageList(obj)
            },
            // 点击选择某一单品
            clickProduct(num){
                if (num == this.listActive) return false;
                this.listActive = num
                this.getTpopedomList();
            },
            //获取控制中心时间选项
            getLimittimeList(types,tbid,pdmid,object){
                var obj = {
                    types: types,
                    tbid: tbid,
                    pdmid: pdmid,
                    success:res => {  //res是server端响应
                        if (res.data.message.indexOf("getSuccess") > -1){
                            object.date = res.data.date;
                            object.usstarttime = res.data.usstarttime;
                            object.halfMonth = res.data.halfMonth;
                            object.month = res.data.month;
                            object.week = res.data.week;
                            object.year = res.data.year;
                            object.noEndDate = res.data.noEndDate;
                            object.numData = 1;
                            object.checkStatus = res.data.checkStatus;
                            this.checkArr.forEach(element => {
                                if (res.data.checkStatus && res.data.checkStatus + "Check"  == element) {
                                    object[element] = true;
                                    object[res.data.checkStatus] = res.data.usendtime;
                                    if(res.data.checkStatus == 'year'){
                                        object.numData =  object.year.substring(0,4) - res.data.usstarttime.substring(0,4)
                                    }
                                } else {
                                    object[element] = false;
                                }
                            });
                            object.checked = res.data.checkStatus ? true : false
                            this.sonPopedom.splice(this.sonPopedom.length-1, 1, 10);
                        } else {
                            this.$message.error(this.$promptObj.searchfail);
                        }
                    }
                }
                getLimittimeList(obj);
            },
            // 获取权限
            getTpopedomList(){
                var obj = {
                    success:res => {  //res是server端响应
                        if (res.data.message.indexOf("getSuccess") > -1) {
                            this.sonPopedom = res.data.sonPopedom;
                            this.sonPopedom[this.sonPopedom.length] = []
                            for (let index = 0; index < this.sonPopedom.length; index++) {
                                const element = this.sonPopedom[index];
                                this.getLimittimeList('user',this.controlList[this.listActive].cpuserid,element.pdmid,element)
                            }
                        } else {
                            this.$message.error(this.$promptObj.searchfail);
                        }
                    }
                }
                getTpopedomList(obj);
            },
            // 填写年限
            inputYear(obj){
                if (obj.numData != "") obj.numData = Math.floor(obj.numData);
                if (obj.numData > 9) obj.numData = this.maxN;
                var fn = function(year){
                    var str = year.substring(0,4)/1 + obj.numData/1;
                    str = str + year.substring(4);
                    return str;
                }
                obj.year = fn(obj.date);
                obj.usstarttime = obj.date;
                this.sonPopedom.splice(this.sonPopedom.length-1, 1, 100);
                if(obj.yearCheck) this.saveGoodsppd(obj,'yearCheck','year')
            },
             //失去焦点事件
            imputZero(obj){
                if (!obj.numData) {
                    obj.numData = this.minN;
                    this.inputYear(obj);
                }
            },
            //保存权限关系
            saveGoodsppd(item,time,flag){
                var object = {
                    'halfMonth':'halfMonthCheck',
                    'month':'monthCheck',
                    'week':'weekCheck',
                    'year':'yearCheck',
                    'noEndDate':'noEndDateCheck'
                }
                var str =  object[time] || time,
                obj = {
                    types: 'user',
                    tbid: this.controlList[this.listActive].cpuserid,
                    pdmid: item.pdmid,
                    states: !item.checked ? '-2' : (item[str] ? '0' : '-2'),//打开开关/勾选----status=0          关闭开关/取消勾选----status=-2
                    mac: this.controlList[this.listActive].mac,
                    usstarttime: item.date,
                    usendtime: item[flag] || '',
                    success:res => {  //res是server端响应
                        console.log(res)
                    }
                }
                saveGoodsppd(obj)
            },
            // 点击开关按钮
            clickBtn(obj,str){
                obj[str] = !obj[str]
                if (!obj[str]) {
                    this.checkArr.forEach(element => {
                        obj[element] = false;
                    }); 
                }
                var time = (new Date()).getTime()+''
                time = time.substring(time.length-5)
                this.sonPopedom.splice(this.sonPopedom.length-1, 1, time);
                this.saveGoodsppd(obj,str,'flag')
            },
            // 点击复选框
            checkBox(obj,str,timeCheck){
                if(!obj.checked) return false;
                this.checkArr.forEach(element => {
                    if (str == element) {
                        obj[element] = !obj[element]
                    } else {
                        obj[element] = false;
                    }
                });
                var time = (new Date()).getTime()+''
                time = time.substring(time.length-5)
                this.sonPopedom.splice(this.sonPopedom.length-1, 1, time);
                this.saveGoodsppd(obj,str,timeCheck)
            }
        }
    }
    </script>
    
    <style scoped>
        .controlContent{
            width: 100%;
            box-sizing: border-box;
            padding: 30px 50px 20px;
            background-color: #fff;
            overflow: hidden;
        }
        .controlLeft{
            width: 550px;
            float: left;
        }
        .controlRight{
            width: 725px;
            box-sizing: border-box;
            padding: 10px 40px 20px;
            /* position: relative; */
            overflow: hidden;
            float: left;
            height: 650px;
        }
        .inner-container{
            overflow-x: hidden;
            overflow-y: scroll;
            width: 700px;
            height: 650px;
        }
        .page-cut{
            width: 100%;
            height: 1px;
            background-color: #CCCCCC;
            margin: 10px 0px 24px;
            box-shadow: 0px 4px 28px rgba(153,153,153,0.4);
            }
        .inner-container::-webkit-scrollbar {
            display: none;
        }
        .controlList{
            overflow: hidden;
            box-sizing: border-box;
            width: 100%;
            margin-bottom: 5px;
            background-color: #F1F4F6;
            padding: 5px 10px;
            cursor: pointer;
        }
        .controlLeft .el-pagination{
            text-align: center;
            margin-top: 40px;
        }
        .controlList>div{
            float: left;
        }
        .controlListImg{
            width: 16%;
            margin-right: 4.8%;
        }
        .controlListDetail{
            margin-top: 5px;
            width: 72%;
            overflow: hidden;
            font-size: 14px;
            color: #666;
        }
        .controlListDetail>div{
            width: 100%;
            float: left;
            line-height: 14px;
            /* margin-top: 15px; */
            margin-bottom: 10px;
        }
        .controlListDetail>div span{
            color: #333;
        }
        .controlList img{
            width: 100%;
        }
    
        .controlRightTitle{
            font-size: 20px;
            line-height: 20px;
            color: #333;
            font-weight: 900;
        }
        .controlRightsmall{
            box-sizing: border-box;
            width: 100%;
            margin: 10px 0 25px;
            padding-left: 40px;
            overflow: hidden;
        }
        .controlRightsmallTitle{
            color: #333;
            line-height: 16px;
            font-weight: 900;
        }
        .controlRightsmallSmall{
            box-sizing: border-box;
            padding-top: 40px;
            padding-left: 100px;
            border-bottom: 1px solid #F1F4F6;
            font-size: 14px;
            font-weight: 900;
            overflow: hidden;
            /* padding-bottom: 20px; */
        }
        .controlRightsmallSmall>div>div{
            float: left;
        }
        .checkbox-class{
            line-height: 12px;
            height: 12px;
            width: 12px;
            border-radius: 2px;
            margin-right: 2%;
            cursor: pointer;
        }
        .isChoice{
            background-color: #409EFF;
            border: 1px solid #409EFF;
        }
        .notChoice{
            border: 1px solid gainsboro;
        }
        .year-input{
            width: 36px;
            padding: 5px 0px 5px 5px;
            margin-right: 5px;
            border-radius: 5px;
            outline: none;
            border: 1px solid gainsboro;
        }
        /* 按钮 */
        /*按钮间距*/
        .btns {
            overflow: hidden;
        }
        
        /*左边圆*/
        .cir_left {
            float: left;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: white;
            margin: 1px;
        }
        
        /*右边圆*/
        .cir_right {
            float: right;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: white;
            margin: 1px;
        }
        /*选择*/
        .selected {
            display: inline-block;
            vertical-align: middle;
            width: 40px;
            line-height: 20px;
            border-radius: 10px;
            background-color: #409EFF;
        }
        
        /*未选中*/
        .default {
            display: inline-block;
            vertical-align: middle;
            width: 40px;
            line-height: 20px;
            border-radius: 10px;
            background-color: #A7B6C2;
        }
        .checheche>div{
            margin-bottom: 24px;
            line-height: 14px;
            width: 100%;
            overflow: hidden;
        }
        .checheche>div span{
            color: #999;
            float: left;
            /* display: inline-block;
            vertical-align: middle; */
            /* margin-left: 2%; */
        }
        .checheche .el-input{
            width: 5%;
            margin-right: 1%;
        }
        .checheche .el-input input{
            height: 30px;
            padding: 0px;
            padding-left: 5px;
        }
        .controlListSearch{
            position: fixed;
            top: 80px;
            right: 40px;
            z-index: 2000;
        }
        .controlListSearch,.filtrate{
            color: #333;
            font-weight: 700;
            font-size: 20px;
        }
        .controlListSearch>div{
            width: 400px;
            margin-left: 40px;
        }
        .controlListSearch>div .el-input__inner{
            height: 36px;
        }
        .controlListSearch .el-input-group__append{
            width: 19px;
            left: 20px;
        }
        .controlListSearch .el-input-group__append button{
            height: 40px;
            padding-top: 10px;
        }
        .controlListSearch .el-input-group__append i{
            font-size: 20px;;
            color: #fff;
        }
        .controlListSearch ::-webkit-input-placeholder { /* WebKit browsers */
            color: #999;
            font-size: 16px;
            font-weight: 700;
        }
    </style>