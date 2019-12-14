<template>
    <div>
        <the-breadcrumb :list="list" :end='end'></the-breadcrumb>
        <div class="list-content">
            <div class="appdetail">
                <div class="appdetail-head">
                    <img src="./../../../static/img/apps.png">
                    <div class="appdetail-title">
                        <div class="apptitle-t">{{producDetail.title}}</div>
                        <div class="apptitle-m"><div>{{detailList.savetime}}：{{producDetail.savetime}}</div>
                        <div>{{detailList.size}}：{{ producDetail.size ? producDetail.size : "10MB"}}</div>
                        <div>{{detailList.version}}：{{producDetail.version}}</div>
                        <div class="last">{{detailList.subtypes}}：{{applications[producDetail.subtypes]}}</div>
                    </div>
                        <div class="apptitle-b">
                            <img :src="'./../../../static/img/'+ (producDetail.isfree == 'yes'? 'mianfei.png' : 'shoufei.png')">
                        </div>
                    </div>
                </div>
                <div style="font-size:15px;text-align:right;color:#666;">{{producDetail.company}}</div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <!-- 显示图片 -->
                <div class="appdetail-showimg">
                    <div class="bigPic">
                        <img :src=" bigimg ? bigimg : './../../../static/img/jiemian.png' " :onerror="defaultImg">
                    </div>
                    <el-row :gutter="10">
                        <el-col :span="4" v-for="(item,index) in littleimg" :key="index"><img :src=" item.aturl ? item.aturl : './../../../static/img/jiemian.png' "  :onerror="defaultImg"
                            :class="['appdetail-showimg-littleimg',imgactive == index?'active':'']"  @click="clickPic(index,item.aturl)">
                        </el-col>
                    </el-row>
                </div>
                <div class="appdetail-imgdetail">
                    <div class="appdetail-imgdetail-title">{{detailList.remark}}</div>
                    <el-scrollbar style="width:100%;height:368px;overflow-x: hidden;">
                        <div style="width:100%;text-indent:2rem;font-size:14px;color:#666;line-height:30px;">
                            {{producDetail.remark}}
                        </div>
                    </el-scrollbar>
                </div>
                <div class="btn-group">
                    <el-row>
                        <!-- 修改 -->
                        <el-button type="warning" @click="goappxiugai('/management/appList/appchange/')">{{$buttonObj.update}}</el-button>
                        <!-- 关闭 -->
                        <el-button @click="dleappxiugai('/management/appList/applists')" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { getAppDetail } from "./../../api/https.js";
import { detailInit } from "@/init/app.js";
import { delDetail,updateDetail,getNowFormatDate } from "./../../api/methods.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.appInit.tit10},
                {router: this.$parent.appInit.tit03}
            ],
            end:"",
            applications: {},
            bigimg:'',
            producDetail:{
                // savetime: "", //发布时间
                // size: "", //软件大小
                // version: "", //版本号
                // subtypes: "", //应用分类
                // remark: "", //软件介绍
                // isfree: "", //是否收费
            },
            detailList:{},
            littleimg:[],
            imgactive:0,
            defaultImg: 'this.src="' + require('../../../static/img/jiemian.png') + '"',
            windowHeight:''
        }
    },
    created(){
        detailInit(this);
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    methods:{
        // 点击展示大图
        clickPic(index,url){
            this.imgactive = index;
            this.bigimg = url ? url : './../../../static/img/jiemian.png';
        },
        // 获取数据
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj  = {
                id : id,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {  
                        var obj = response.data.apps.fieldvalues
                        obj.savetime = getNowFormatDate(new Date(obj.savetime.time),true)
                        var imgs = response.data.picturesList ,imgObj = {},len = 7, iconObj = {};
                        len = imgs.length < len ? imgs.length : len;
                        this.littleimg = [];
                        for (let index = 0; index < len; index++) {
                            if (imgs[index].fieldvalues.types == 'appImg') {
                                iconObj = {};
                                iconObj.atid = imgs[index].fieldvalues.picid;
                                iconObj.aturl = this.baseUrl +  imgs[index].fieldvalues.picurl; 
                            } else {
                                if (this.littleimg.length > 5 ) continue;
                                imgObj = {};
                                imgObj.atid = imgs[index].fieldvalues.picid;
                                imgObj.aturl = this.baseUrl +  imgs[index].fieldvalues.picurl;
                                this.littleimg.push(imgObj)
                            } 
                        }
                        obj.iconObj = iconObj;
                        obj.imgLsit = this.littleimg;
                        var appList = response.data.attachList[0]
                        obj.appList = appList ? appList.fieldvalues : ''
                        this.bigimg = this.littleimg[0] ? this.littleimg[0].aturl: ''
                        this.producDetail = obj;
                        sessionStorage.setItem(response.data.appid[0],JSON.stringify(obj))
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getAppDetail(obj)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(360);
        },
        // 进入修改页面
        goappxiugai(path){
            var arr = updateDetail(path)
            this.replaceroute(arr[0],arr[1]);
        },
        // 关闭
        dleappxiugai(path){
            var arr = delDetail(path, 'applist')
            this.$emit(arr[0],arr[1]);
        },
        loadsx(){
            this.end = this.$route.params.id;
            this.getData()
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>

<style>
    .list-content .appdetail{
        padding: 0px 30px;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .appdetail-head{
        width: 100%;
        overflow: hidden;
    }
    .appdetail-head>img{
        width: 110px;
        float: left;
    }
    .appdetail-title{
        margin-left: 30px;
        float: left;
    }
    .appdetail-title .apptitle-t{
        line-height: 28px;
        font-size: 28px;
        color: #333333;
    }
    .appdetail-title .apptitle-m{
        margin-left: -20px;
        margin-top: 17px;
        margin-bottom: 12px;
    }
    .appdetail-title .apptitle-m>div{
        font-size: 14px;
        color: #666;
        padding: 0px 20px;
        line-height: 20px;
        display: inline-block;
    }
    .appdetail-title .apptitle-m>div:not(.last){
        border-right: 1px solid #E4E4E4;
    }
    .appdetail-title .apptitle-b>img{
        width: 65px;
        margin-right: 20px;
    }
    /* 下部分图片样式 */
    .appdetail-showimg{
        /* width: 38%; */
        float: left;
    }
    .bigPic{
        border: 1px solid #E9EEF3;
        margin-bottom: 8px;
    }
    .bigPic>img{
        width: 600px;
        height: 450px;
    }
    .appdetail-showimg .el-col-4 img{
        /* margin-right: 10px; */
        width: 92px;
        height: 68px;
    }
    /* 产品介绍 */
    .appdetail-imgdetail{
        float: left;
        width: 42%;
        overflow: hidden;
        margin-left: 40px;
    }
    .appdetail-imgdetail-title{
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
        line-height: 20px;
    }
    .appdetail-showimg-littleimg.active{
        border-bottom: 3px solid #FFAE00;
    }
</style>
