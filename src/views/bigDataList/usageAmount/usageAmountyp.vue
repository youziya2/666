// 注册量分析
<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar :style="{height:windowHeight}">
            <div class="bigdataTop">
                <div>
                    {{ searchObj.starttime.name }}
                    <el-date-picker
                    v-model="searchObj.starttime.val"
                    :placeholder="bigdataObj.tit25"
                    type="date">
                    </el-date-picker>
                </div>
                <div>
                    {{ searchObj.endtime.name }}
                    <el-date-picker
                    v-model="searchObj.endtime.val"
                    type="date"
                    :placeholder="bigdataObj.tit25">
                    </el-date-picker>
                </div>
                <div>
                    {{ searchObj.province.name }}
                    <el-select v-model="searchObj.province.val" :placeholder="bigdataObj.tit23" @change="((val)=>{provinceChanged(val, 'cities')})">
                        <el-option
                            :label="bigdataObj.tit23"
                            :value="''">
                        </el-option>
                        <el-option
                            v-for="(val,k) in provinces"
                            :key="k"
                            :label="val"
                            :value="k">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    {{ searchObj.city.name }}
                    <el-select v-model="searchObj.city.val" :placeholder="bigdataObj.tit23" @change="((val)=>{provinceChanged(val, 'counties')})">
                        <el-option
                            :label="bigdataObj.tit23"
                            :value="''">
                        </el-option>
                        <el-option
                            v-for="(val,k) in cities"
                            :key="k"
                            :label="val"
                            :value="k">
                        </el-option>
                    </el-select>
                </div>
                <el-button size="mini" class="ReQuery" icon="el-icon-search" :style="{backgroundColor:colorselects,color:'#fff',border:'0px'}" @click.native="getData()"></el-button>
            </div>
            <div class="bigdataBtm">
                <div class="bigdatatBtmLeft">
                    <!-- 时间维度示意图 -->
                    <div class="bigdatatBtmLeftTop">
                        <div class="bigdatatBtmLeftTopTitle">
                            <div class="bigdatatBtmLeftTopTitleRight">
                                {{ address + ucObj.tit16 }}
                            </div>
                            <div style="float:right;">
                                <!-- 年月日按钮 -->
                               <el-button-group>
                                    <el-button size="mini" @click="drawLine('year')" :style="{backgroundColor:tiaojian == 'year'?colorselects:'',color:tiaojian == 'year'?'#fff':''}">{{yjObj.year}}</el-button>
                                    <el-button size="mini" @click="drawLine('month')" :style="{backgroundColor:tiaojian == 'month'?colorselects:'',color:tiaojian == 'month'?'#fff':''}">{{yjObj.month}}</el-button>
                                    <el-button size="mini" @click="drawLine('day')" :style="{backgroundColor:tiaojian == 'day'?colorselects:'',color:tiaojian == 'day'?'#fff':''}">{{yjObj.day}}</el-button>
                                </el-button-group>
                            </div>
                        </div>
                        <div id="oneecharts"></div>
                    </div>
                    <div class="bigdatatBtmLeftBtm">
                        <div class="batics">
                            <!-- 全国数据 -->
                            <div class="bigdatatBtmLeftTopTitleRight">{{ bigdataObj.tit18 }}</div>
                            <div class="bigdatatBtmLeftBtmContent">
                                <span class="font14size999">{{ ucObj.tit47 }}: </span><span style="font-size:20px;color:#437BF5;font-weight:bold;">{{total}}</span>
                            </div>
                        </div>
                        <div class="yearOnYear">
                            <!-- 同比数据 -->
                            <div class="bigdatatBtmLeftTopTitleRight">{{ bigdataObj.tit19 }}</div>
                            <div class="bigdatatBtmLeftBtmContent">
                                <div class="yearOnYearXian">
                                    <div class="font14size999" style="margin-top: 16px;width:100px;">{{ bigdataObj.tit35 }}</div>
                                    <template v-if = 'recent > 0'>
                                        <div style="width:49%;text-align: right;margin-left: 2%;margin-right: 2%;">
                                            {{recent}}
                                            <div class="xiantiao" :style="{backgroundColor:colorselects}"></div>
                                        </div>
                                        <div style="font-size:20px;color:#333;"><i class="iconfont" 
                                            :class = " recent > lastTerm ? 'icon-jiantou sjiantou' : (recent == lastTerm ? '' : 'icon-jiantou1 xjiantou') "></i></div>
                                    </template>
                                    <template v-else>
                                        <div style = 'margin-top: 15px;margin-right: 2%;'>
                                            {{ bigdataObj.tit34 }}
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="bigdatatBtmLeftBtmContent">
                                <div class="yearOnYearXian">
                                    <div class="font14size999" style="margin-top: 16px;width:100px;">{{ bigdataObj.tit36 }}</div>
                                    <div v-if = 'lastTerm != 0' style="width:49%;text-align: right;margin-left: 2%;margin-right: 10%;">
                                        {{ lastTerm }}
                                        <div class="xiantiao" :style="{backgroundColor:colorselects}"></div>
                                    </div>
                                    <div v-else style = 'margin-top: 15px;margin-right: 2%;'>
                                        {{ bigdataObj.tit34 }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 地区维度示意图 -->
                <div class="bigdatatBtmRight">
                    <div class="bigdatatBtmLeftTopTitle">
                        <div class="bigdatatBtmLeftTopTitleRight">
                           {{ address + ucObj.tit17 }}
                        </div>
                        <!-- <div style="float:right;">
                            <el-button-group>
                                <el-button size="mini">默认排序</el-button>
                                <el-button size="mini">按注册量</el-button>
                            </el-button-group>
                        </div> -->
                    </div>
                    <div id="towecharts"></div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { panInit } from '@/init/bigdata'
import { panCount,getAddress } from '@/api/https'
import { doRespone,drawBar,drawLine,addressRespone } from '@/api/methods'
// import provinceCity from '../../../api/provinceCity.json'
export default {
    data(){
        return{
            list:[
                {router:"大数据分析"},{router:""}
            ],
            end:"注册量分析",
            nationality: "12345-12345-12345-12345-12345-12345e",//国籍中国
            searchObj: {},//搜索条件
            bigdataObj: {},//公共部分
            starttime: {},
            endtime: {},
            ucObj: {},//自己部分
            provinces: {},//省份对象
            provinceObj:[],
            cities: {},//城市对象
            counties: {},//城镇对象
            tiaojian:'year',
            yjObj:{},//年月日
            address:'',
            total: '',//全国数据
            recent: '',//近期数据
            lastTerm: '',//上一期
            // 左边示意图数据
            timedata:{},
            isShow: true,
            numberdata:{},
            // 右边示意图数据
            columnarData:[],
            columnarDataObj:[], 
            windowHeight:''
        }
    },
    created() { 
        panInit(this);
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    mounted(){
        this.getAddress(this.nationality, 'provinces',true);//12345-12345-12345-12345-12345-12345e代表中国
    },
    methods: {
        // 获取数据
        getData(){
            panCount(doRespone(this));
        },
        // 获取地方
        getAddress(str, object, boo){
            getAddress(addressRespone(this, object, boo),str);
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        // 获取地区
        provinceChanged(value, str){
            if ( str == 'cities') { this.searchObj.city.val = '';}
            if (value) {
                this.getAddress(value, str)
            }
            if (!this.searchObj.province.val) {
                this.cities = [];
                this.searchObj.city.val = '';
            }
        },
        // 绘制折线图表
        drawLine(str){
           drawLine(str,this);
        },
        // 绘制柱状图表
        drawBar(){
            drawBar(this);
        }
    },
    computed:{
        colorselects(){
            return this.$parent.$router.options.routes[1].meta.colorselect;
        }
    }
}
</script>

<style scoped>
    .bigdataTop{
        width: 100%;
        height: 105px;
        background-color: #fff;
        margin-bottom: 15px;
        box-sizing: border-box;
        padding: 0px 50px;
    }
    .bigdataTop>div{
        float: left;
        width: 22%;
        margin-top: 40px;
        font-size: 14px;
        color: #333;
    }
    .bigdataTop>div .el-date-editor.el-input,.bigdataTop>div .el-select{
        width: 58%;
        margin-left: 4%;
    }
    .bigdataBtm{
        width: 100%;
        overflow: hidden;
    }
    .bigdataBtm>div{
        float: left;
        height: 767px;
        box-sizing: border-box;
    }
    .bigdatatBtmLeft{
        width: 66%;
        margin-right: 1.2%;
    }
    .bigdatatBtmLeft>div{
        background-color: #fff;
        width: 100%;
        overflow: hidden;
    }
    .bigdatatBtmLeftTop{
        margin-bottom: 20px;
        height: 555px;
        padding: 15px 20px;
        box-sizing: border-box;
    }
    .bigdatatBtmLeftTopTitle{
        width: 100%;
        overflow: hidden;
    }
    .bigdatatBtmLeftTopTitleRight{
        float: left;
        font-size: 18px;
        font-weight: 900;
        line-height: 28px;
    }
    .bigdatatBtmLeftBtm{
        height: 192px;
        box-sizing: border-box;
        padding: 20px;
        overflow: hidden;
    }
    .bigdatatBtmLeftBtm>div{
        width: 50%;
        float: left;
        overflow: hidden;
        box-sizing: border-box;
        height: 100%;
    }
    .yearOnYear{
        padding-left: 20px;
        border-left: 1px solid #F1F4F6;
    }
    .yearOnYearXian{
        overflow: hidden;
        width: 100%;
    }
    .yearOnYearXian>div{
        float: left;
        vertical-align: bottom;
    }
    .bigdatatBtmLeftBtmContent{
        padding-top: 18px;
        box-sizing: border-box;
        padding-left: 20px;
        clear: both;
    }
    .xiantiao{
        height: 10px;
        width: 100%;
        border-radius: 5px;
    }
    .font14size999{
        font-size: 14px;
        color: #999;
    }
    .sjiantou{
        font-size: 20px;
        margin-left: 4%;
        color: #4FA1FD;
    }
    .xjiantou{
        font-size: 20px;
        margin-left: 4%;
        color: #EB4141;
    }
    .bigdatatBtmRight{
        width: 32.7%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 15px 20px;
    }
    .ReQuery{
        box-sizing: border-box;
        width: 100px;
        height: 36px;
        margin-top: 40px;
    }

    #oneecharts{
        width: 100%;
        height: 90%;
        margin-top: 2%;
    }
    #towecharts{
        width: 100%;
        height: 80%;
        margin-top: 2%;
    }
</style>
