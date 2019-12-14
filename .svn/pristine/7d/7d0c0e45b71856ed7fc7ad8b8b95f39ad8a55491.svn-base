<template>
    <div>
        <div class="doc-btn-group" v-if="deletshow">
            <el-row>
                <!-- 下载选中  -->
                <span></span>
                <!-- 删除选中 -->
                <el-button type="danger" @click.native="doChoice(totalChoice,'totalChecked',2)">{{$parent.docObj.tit12}}</el-button>
            </el-row>
        </div>
        <div class="docSearch">
            <el-input :placeholder="$parent.docObj.tit03" class="input-with-select" v-model="scct">
                <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}"  @click.native="doSearch()"></el-button>
            </el-input>
        </div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
          <span>{{$promptObj.delwarn}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
            <template v-if="flag == 1">
                <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
            </template>
            <template v-if="flag == 2">
                <el-button type="primary" @click="allDelect">{{$buttonObj.sure}}</el-button>
            </template>
          </span>
        </el-dialog>
        <div class="documentContent">
            <el-scrollbar style="width:100%;overflow-x: hidden;margin-top: 20px;" :style="{height:windowHeight}">
                <!-- <div>
                    全选
                <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
            </div>
            <el-row :gutter="20">
                <div v-if='product.length < 1' class="content-null" style="clear: both"> {{$buttonObj.noData}} </div>
                <el-col :span="4" v-for="(item,index) in product" :key="index">
                    <div class="documentLists" :class="item.listCheck?'documentListsActive':''" @mouseenter="productActive = index" @mouseleave="productActive = ''" @click="goappxiugai(item.atcname,item,'atid')">
                        <el-checkbox name="checkcolor" @change="getChoice(totalChoice,index,item.listCheck,item.atid + '@@' + baseUrl + item.aturl)" 
                            v-model="item.listCheck" v-show="productActive === index||item.listCheck"></el-checkbox>
                        <div class="docImg">
                            <img src="./../../../static/img/fiels.jpg" :title = 'item.atcname'>
                        </div>
                        <div class="docTitle">{{ item.atcname | capitalize }}</div>
                    </div>
                </el-col>
            </el-row>   -->
                <!-- 暂无数据 -->
                <div v-if='product.length < 1' class="content-null" style="clear: both"> {{$buttonObj.noData}} </div>
                <!-- 文件列表 -->
                <template v-else>
                    <div class="meeting-file-list">
                        <!-- 视图切换 -->
                        <div class="meeting-file-list-right" @click="remenbtype(1)"><i class="iconfont icon-liebiao1" :style="{color:type==1?colorselects:''}"></i></div>
                        <div class="meeting-file-list-right" style="border-right-width: 0px" @click="remenbtype(2)"><i class="iconfont icon-jiugongge" :style="{color:type==2?colorselects:''}"></i></div>
                    </div>
                    <template v-if='type==2'>
                        <el-row :gutter="20">
                            <el-col :span="4" v-for="(item,index) in product" :key="index">
                                <div class="documentLists"  @mouseenter="productActive = index" @mouseleave="productActive = ''" @click="goappxiugai(item.mttile,item,'mtid')">
                                    <div class="docImg">
                                        <img src="./../../../static/img/fiels.jpg" :title = 'item.mttile'>
                                    </div>
                                    <div class="docTitle">{{ item.mttile | capitalize }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-else>
                        <div style="min-height: 630px;">
                                <div v-for="(item,index) in product" :key="index">
                                        <div class="documentLists-detail"  @mouseenter="productActive = index" @mouseleave="productActive = ''" @click="goappxiugai(item.mttile,item,'mtid')">
                                            <div class="documentLists-img">
                                                <img src="./../../../static/img/fiels.jpg" :title = 'item.mttile'>
                                            </div>
                                             <div class="documentLists-title">{{ item.starttime | sliceTime}}  {{ item.mttile }}</span> </div>
                                        </div>
                                    </div>
                        </div>
                        
                    </template>
                </template>  
                <!--分页-->
                <child @current='getCurrent'></child>   
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { getChoice,doChoice,getScct,setScct,clearScct,goDetail } from "./../../api/methods.js";
import { batchDelete, getMeetingFilesList } from "./../../api/https.js";
import child from "./../../components/page.vue";
export default {
    data(){
        return{
            list:[
                {router: this.$parent.docObj.tit13}
            ],
            end: this.$parent.docObj.tit02,
            flag: '',
            fileType: '',
            setScctVal: 'meetingFiles',
            imgNum:'',//附件ID
            productActive:'',
            deletshow:false,
            centerDialogVisible:false,
            windowHeight:'',
            type: 2,
            allCheck: '',//全选
            thisPage: '1', //当前页码
            perPage: 24, //每页记录数
            currs:'',//总页数              
            scct:'',
            sumRecord:0,
            product:[]
        }
    },
    components:{
        child
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    filters:{
        capitalize: function(value) {
            var str = '' 
            if(value.length > 22) str = value.substring(0,7) + '……' + value.substring(value.length - 9)
            else str = value
            return str
        },
        sliceTime: function(value) {
            var str = '' , num = '',
            str = value.slice(0,value.length-3);
            str = str.replace(/\s/g, "")
            for (let index = 0; index < str.length; index++) {
                if( str[index] > -1 ) num += str[index];
            }
            return num;
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getScct();
        this.getData();
    },
    methods:{
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.scct = ''
            clearScct(this.setScctVal);
            this.getData();
        },
        // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //展示模式切换
        remenbtype(index){
            this.type = index;
            this.totalChoice = [] ;//点击数组
            this.totalChecked = [] ;//选择数
        },
      // 点击批量删除提示
        doChoice(arr1,arr2,num){
            this.centerDialogVisible = true;
            this.flag = num;
            this[arr2] = doChoice(arr1,arr2)
            this[arr2] = this.splitArr(this[arr2],0)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'atid')
        },
      //批量删除 
        allDelect(){
            var obj = {
                success:res => {  //res是server端响应
                var res = JSON.parse(res)
                    if (res.message.indexOf("removeSuccess") > -1) {
                        this.$message.success(this.$promptObj.removesuccess);
                        this.centerDialogVisible = false;
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHAttachServiceInfc.batchRemoveAttach','attach',obj)
        },
         //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.atid);
                } else {
                    element.listCheck = false;
                    this.totalChoice = [];
                }           
            });
        }, 
        // 获取搜索条件
        getScct(){
            var obj = {
                scct: ''
            }
            this.thisPage = 1
            getScct(this.setScctVal,obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct
            }
            setScct(this.setScctVal,obj)
        },
        // 点击搜索
        doSearch(){
            this.thisPage = 1;
            this.setScct();
            this.getData(true);
        },   
       // 点击激活按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        // 详情跳转
        goappxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/meetingFile/documentListsFenlei/',"./static/img/smallyy.png",gdid)
            this.$emit('addxiugai',add);
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(210);
        },
        getData(){
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.data.meetingList || [] , obj = {}
                        this.product = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index]
                            this.product.push(obj)
                        }
                        this.$bus.emit('doPage',response.data.data.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [];//点击数组
                        this.totalChecked = [];//选择数组
                    } else {
                        this.sumRecord = this.product.length
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getMeetingFilesList(obj);
        }
    },
}
</script>

<style scoped>
    .el-row{
        height: 40px !important;
    }
    .documentContent{
        background-color: #fff;
        padding: 10px 50px 0px;
    }
    .doc-btn-group{
        position: fixed;
        overflow: hidden;
        left: 220px;
        top: 80px;
        z-index: 999999;
    }
    .doc-btn-group button{
        width: 100px;
        height: 36px;
        line-height: 10px;
    }
    .documentContent .el-pagination{
        text-align: center;
        margin: 40px 0px;
    }
    .documentContent .el-col{
        text-align: center;
        padding: 0px 10px 10px 0px !important;
    }
    .documentContent .el-row{
        min-height: 610px;
    }
    .documentLists{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        position: relative;
        padding-bottom: 0px;
        cursor: default;
    }
    .documentLists img{
        cursor: pointer;
    }
    .documentLists:hover:not(.documentListsActive){
        background-color: #F1F4F6;
    }
    .docImg{
        width: 70%;
        margin-bottom: 10px;
        text-align: center;
        margin: 0px auto;
    }
    .docImg img{
        width: 90%;
        height: 80%;
    }
    .docTitle{
        font-size: 14px;
        color: #666;
        line-height: 22px;
        height: 44px;
        overflow: hidden;
    }
    .documentListsActive{
        background-color: #E4E4E4;
    }
    /* .documentLists-detail{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        position: relative;
        padding-bottom: 0px;
        cursor: pointer;
    }
    .documentLists-img{
        width: 15%;
        display: inline-block;
        vertical-align: middle;
    }
    .documentLists-title{
        width: 60%;
        display: inline-block;
        vertical-align: middle;
    }
    .documentLists-time{
        margin-left: 20px;
    }
    .documentLists-detail img{
        width: 70%;
        margin-left: 10%;
        height: auto;
    }
    .documentLists-detail:hover:not(.documentListsActive){
        background-color: #F1F4F6;
    } */
    .docSearch{
        position: fixed;
        top: 80px;
        right: 40px;
        z-index: 999;
    }
    .docSearch,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .docSearch>div{
        width: 400px;
        margin-left: 40px;
    }
    .docSearch>div .el-input__inner{
        height: 36px;
    }
    .docSearch .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .docSearch .el-input-group__append button{
        height: 40px;
        padding-top: 9px;
        /* padding-bottom: 10px; */
    }
    .docSearch .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .docSearch ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
</style>
