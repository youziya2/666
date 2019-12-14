<template>
    <div>
        <the-breadcrumb :end="end" :list="list"  @initData='initData'></the-breadcrumb>
        <div class="list-content">
            <div>
                <div class="switcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search">
                    <!-- 产品搜索 -->
                    {{$parent.appInit.tit04}}
                    <el-input :placeholder="$parent.appInit.tit11" class="input-with-select" v-model="scct">
                        <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}" @click.native="doSearch()"></el-button>
                    </el-input>
                    <div class="record">
                        
                    </div>
                </div>
                <div class="filtrate">
                    <!-- 条件筛选 -->
                    <span style="display:inline-block;margin-top:8px">{{$parent.appInit.tit05}}</span>       
                    <div class="filtrateName">
                        <div v-for="(item,index) in applicationObj" :key="index" :style="{border:(active === index?'1px solid'+colorselects:''),color:(active === index||hover === index?colorselects:'')}" 
                         @mouseenter="hover = index" @mouseleave="hover = ''" @click="getInfos(index)">{{item}}</div>
                    </div>
                </div>
                <div class="cut">
                    <template v-if='product.length == 0' >
                            <!-- 暂无数据 -->
                        <div class="content-null"> {{$buttonObj.noData}} </div>
                    </template>
                    <template v-else>
                            <!-- 全选 -->
                        <el-checkbox v-model="allCheck" v-if = 'this.type == 2'  @change="allChoice" >
                            {{$buttonObj.allCheck}}
                        </el-checkbox>
                    </template>      
                </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="app-productListbox">
                    <el-row :gutter="80" v-if="type == 1">
                        <el-col :span="4" v-for="(item,index) in product" :key="index">
                            <div class="app-productLists" @mouseenter="onhover = index" @mouseleave="onhover = ''">
                                <div class="fffback" @click="goappxiugai(item.appcname,item,'appid')" :title='item.appcname'>
                                    <img src="./../../../static/img/apps.png">
                                    <div class="txt-hidden">{{item.appcname}}</div>
                                    <span style="font-size:12px;color:#999;">{{ item.size || " "}}</span>
                                </div>
                                <div class="app-caozuo" v-if="onhover === index">
                                    <div class="app-delet" @click="oneChoice(item.appid)" ><img src="./../../../static/img/appdelet.png"></div>
                                    <div class="app-download">
                                        <span @click="downLoad(baseUrl + item.aturl,item.url) ">
                                            <img src="./../../../static/img/download.png">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="app-productTypeTwo" v-if="type == 2">
                        <div class="applist" v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'ischeck':''">
                            <el-checkbox v-model="item.listCheck" name="listCheck" @change="getChoice(totalChoice,index,item.listCheck,item.appid)" v-show="listActive === index||item.listCheck"></el-checkbox>
                            <div class="appimg">
                                <img src="./../../../static/img/apps.png" @click="goappxiugai(item.appcname,item,'appid')">
                            </div>
                            <div class="appdetails" @click="goappxiugai(item.appcname,item,'appid')">
                                <div class="appdetailstitle txt-hidden">{{item.appcname}}</div>
                                <div>{{listList.subtypes}}：{{applicationObj[item.subtypes]}}</div>
                                <div style="width:32%;">{{listList.version}}：{{item.version}}</div>
                                <div>{{listList.savetime}}：{{item.savetime}}</div>
                                <div style="width:32%;">{{listList.isfree}}：{{feeMethodObj[item.isfree]}}</div>
                                <div style="width:100%;">{{listList.copyright}}：{{item.copyright}}</div>
                            </div>
                        </div>
                    </div>
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
                    <!-- 删除 -->
                    <el-button  @click="doChoice(totalChoice,'totalChecked')" class="show-delet-btn" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>  
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import child from "./../../components/page.vue";
import { batchDelete,getAppList } from "./../../api/https.js";
import { getNowFormatDate,goDetail,getChoice,doChoice,setScct,getScct,clearScct } from "./../../api/methods.js";
import { listInit } from "@/init/app.js";
export default {
    data(){
        return{
            selectNum:0,//要删除的数量
            centerDialogVisible: false,
            list:[
                {router: this.$parent.appInit.tit10}
            ],
            end: this.$parent.appInit.tit03,
            product:[],
            products:[],
            listList: {},
             // 应用类型
            application:'all',
            applicationObj: {},
            // 收费方式
            feeMethodObj: {},
                // 发布时间
            releaseDate:'',
            active:'all',
            hover:'',
            type:1,
            onhover:'',
            scct:'',
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            allCheck: '',//全选
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            add:{},
            listActive:'',
            windowHeight:'',
            thisPage: 1, //当前页码
            perPage: 18, //每页记录数
            sumRecord : 1,// 总纪录条数(默认1是让图标刚开始能加载选择的主题颜色)
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        if(sessionStorage.getItem('apptype') && sessionStorage.getItem('apptype').length){
            this.type = sessionStorage.getItem('apptype');
        };
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        listInit(this);
        this.getScct();
        if(this.application) this.getData(true)
        else this.getData()
    },
    watch:{
        product:{
            deep:true,
            handler:function(n){
                this.deletshow = false;
                this.allCheck = true;
                n.forEach(e => {
                    e.listCheck?this.deletshow = true:'';
                    e.listCheck?'' : this.allCheck = false;
                });
            }
        },
        type:function(){
            this.product.forEach(e => {
                e.listCheck = false;
            });
        }
    },
    components:{
        child
    },
    methods:{   
    // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.scct = ''
            this.active = 'all'
            this.application = 'all'
            clearScct('app');
            this.getData()
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.appid);
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
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'appid')
        },
        // 点击单个的删除按钮
        oneChoice(id){
            this.selectNum = 1;
            this.totalChecked = [];
            this.totalChecked[0] = id;
            this.centerDialogVisible = true;
            this.$bus.emit('deleteArr',this.totalChecked,'appid')
        },
        // 点击删除
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
            batchDelete('BHAppsServiceInfc.batchRemoveApps','apps',obj)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(390);
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                scct: '',
                application: '',
                active: "",
                subtypes: ''
            }
            this.thisPage = 1
            getScct('app',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct,
                application: this.application,
                active: this.active,
                subtypes: this.subtypes
            }
            setScct('app',obj)
        },
         // 按内容搜索
        doSearch(){
            this.setScct();
            this.thisPage = 1;
            this.getData(true); 
        },
        // 获取某一系列
        getInfos(str){
            if (this.active == str) return true
            this.active = str
            this.application = str 
            this.thisPage = 1
            this.setScct();
            this.getData(str)
        },
        // 获取数据
        getData(str){
            if (this.application == 'all')  {
                this.application = "" 
                str = false
            }
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.appsList , obj = {}
                        this.product = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            obj.savetime = this.scct ? obj.savetime : getNowFormatDate(new Date(obj.savetime.time),true)
                            obj.listCheck = false
                            this.product.push(obj)
                        }
                        this.$bus.emit('doPage',response.data.page.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                        this.sumRecord = this.product.length
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getAppList(obj,str)
        },
        remenbtype(index){
            this.type = index;
            this.totalChoice = [] ;//点击数组
            this.totalChecked = [] ;//选择数组
            sessionStorage.setItem('apptype',index)
        },
        // 进入详情页面
        goappxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/appList/appdetail/',"./static/img/smallyy.png",gdid)
            this.$emit('addxiugai',add);
        }
    }
}
</script>

<style scoped>
    .app-productListbox{
        min-height: 485px;
        position: relative;
    }
     .applist{
        padding: 20px 15px;
        width: 46%;
        /* margin: 0px -40px; */
        overflow: hidden;
        height: 130px;
        float: left;
        margin-bottom: 20px;
        margin-right: 1%;
        position: relative;
    }
    .el-row{
        margin: 0px !important;
    }
</style>
