<template>
    <div>
        <div class="doSelect">
            <span style="margin-right: 10px">文件筛选</span>
            <el-select v-model = 'fileType'>
                <el-option v-for="(item,index) in fileTypeObj" 
                :key = "index"
                :label = "item"
                :value = "index"
                >
                </el-option>
            </el-select>
        </div>
        <div class="docSearch">
            <el-input :placeholder="$parent.docObj.tit03" class="input-with-select" v-model="scct"> 
                <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}" @click.native="doSearch()"></el-button>
            </el-input>
        </div>
        <!-- 删除提示 -->
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
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="documentContent">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <!-- 暂无数据 -->
                <div v-if='product.length < 1' class="content-null" style="clear: both"> {{$buttonObj.noData}} </div>
                <div v-else style="position: relative;">
                    <div style="margin-bottom: 10px;">
                            <!-- 全选 -->
                        <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                        <!-- 视图切换 -->
                        <div class="meeting-file-list-right" @click="remenbtype(1)"><i class="iconfont icon-liebiao1" :style="{color:type==1?colorselects:''}"></i></div>
                        <div class="meeting-file-list-right" style="border-right-width: 0px" @click="remenbtype(2)"><i class="iconfont icon-jiugongge" :style="{color:type==2?colorselects:''}"></i></div>
                    </div>
                    <!-- 文件列表 -->
                    <template v-if='type==2'>
                        <el-row :gutter="20">
                            <el-col :span="4" v-for="(item,index) in product" :key="index">
                                <div class="documentLists" :class="item.listCheck?'documentListsActive':''" @mouseenter="productActive = index" @mouseleave="productActive = ''">
                                    <el-checkbox name="checkcolor" @change="getChoice(totalChoice,index,item.listCheck,item.atid + '@@' + baseUrl + item.aturl)"
                                    v-model="item.listCheck" v-show="productActive === index||item.listCheck"></el-checkbox>
                                    <div class="docImg">
                                        <img src="./../../../static/img/file.jpg" :title = "item.atcname">
                                    </div>
                                    <div class="docTitle">{{item.atcname | capitalize }}</div>
                                    <div class="uplodownlo">
                                        <span @click="downLoad(baseUrl + item.aturl)"><img src="./../../../static/img/downloaddoc.png" style="float:left" v-show="productActive === index"></span>
                                        <span style="float:right" v-show="productActive === index && !item.listCheck" @click="isDelect(1,'img01',item.atid)"><img src="./../../../static/img/deletdoc.png" ></span>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                    <div style="min-height: 640px;" v-else>
                        <div v-for="(item,index) in product" :key="index" style="margin-bottom: 10px;">
                            <div class="documentLists-detail" :class = "{ active: item.listCheck }" @mouseenter="productActive = index" @mouseleave="productActive = ''">
                                <el-checkbox name="checkcolor" @change="getChoice(totalChoice,index,item.listCheck,item.atid + '@@' + baseUrl + item.aturl)" v-model="item.listCheck"></el-checkbox>
                                <div class="documentLists-img" style="width: 20%;">
                                    <img src="./../../../static/img/file.jpg" :title = 'item.atcname'>
                                </div>
                                <div class="documentLists-title">{{ item.atcname }}</span> </div>
                            </div>
                        </div>
                    </div>
                    <div class="doc-btn-group" v-if="deletshow">
                            <!-- 下载选中 -->
                            <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click.native="allDownload()">{{$parent.docObj.tit11}}</el-button>
                            <!-- 删除选中 -->
                            <el-button type="danger" @click.native="doChoice(totalChoice,'totalChecked',2)">{{$parent.docObj.tit12}}</el-button>
                        </div>   
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>  
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import child from "./../../components/page.vue";
import { getChoice,doChoice,getScct,setScct,clearScct } from "./../../api/methods.js";
import { batchDelete,getFiles,delPictrue,getMeetingAttachListPage } from "./../../api/https.js";
export default {
    data(){
        return{
            list:[
                {router: this.$parent.docObj.tit13}
            ],
            end: this.$parent.docObj.tit02,
            pkid: '',//会议ID
            type: 2, //视图类型
            subtypes: 0,//文件类型
            allCheck: '',//全选
            totalChoice: [],//点击数组
            totalChecked: [],//选择数组
            imgList: {//图片列表
                img01: {imgid:'',imgpath:''}
            },
            imgNum: '',//附件ID
            productActive: '',
            deletshow: false,
            windowHeight: '',
            centerDialogVisible: false,
            windowHeight: '',
            documentType: 'metingFeilDoc', 
            fileType: '',
            fileTypeObj: {
                'all': '全部',
                'file': '附件',
                'pizhu': '批注',
                'baiban': '白板'
            },   
            flag: 1,
            scct: '',//搜索内容
            thisPage: 1, //当前页码
            perPage: 24, //每页记录数
            sumRecord : 1,// 总纪录条数()
            product: []
        }
    },
    components:{
        child
    },
    created(){
        this.load();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    filters: {
        capitalize: function(value) {
            var str = '' 
            if(value.length > 25) str = value.substring(0,10) + '……' + value.substring(value.length-9)
            else str = value
            return str
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
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
            this.thisPage = 1
            this.scct = ''
            clearScct(this.documentType)
            this.getData()
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(200);
        },
        //展示模式切换
        remenbtype(index){
            this.type = index;
            this.product.forEach(element => {
                element.listCheck = false;         
            });
            this.totalChoice = [] ;//点击数组
            this.totalChecked = [] ;//选择数
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
            // var obj = {
            //     scct: ''
            // }
            // this.thisPage = 1
            // getScct(this.documentType,obj,this)
        },
        // 记录搜索条件
        setScct(){
            // var obj = {
            //     scct: this.scct
            // }
            // setScct(this.documentType,obj)
        },
        // 点击搜索
        doSearch(){
            this.setScct();
            this.thisPage = 1;
            this.getData(true);
        },   
        // 点击激活按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        // 删除附件提示（单个）
        isDelect(num,item,fileId){
            this.centerDialogVisible = true;
            this.flag = num
            this.imgNum = item;
            this.imgList.img01.imgid = fileId;
        },
            // 移除单个附件
        delPictrue(){
            this.thisPage = 1;
            delPictrue(this,'fil','getData')
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
        // 截取@@分割数组
        splitArr(arr,index){
            var arr1 = [] , arr2 = [];
            for (let i = 0; i < arr.length; i++) {
                arr1 = arr[i].split('@@');
                arr2.push(arr1[index]) 
            }
            return arr2
        },
        // 多个下载
        allDownload(){
            this.totalChecked = doChoice(this.totalChoice,'totalChecked')
            this.totalChecked = this.splitArr(this.totalChecked,1)
            for (let index = 0; index < this.totalChecked.length; index++) {
                this.downLoad(this.totalChecked[index]);  
            }
        },
        load(){
            let i = this.$route.params.id;
            this.end = i.substring(0,i.indexOf('@'))
            this.pkid = i.substring(i.indexOf('@')+1);
            this.scct = '';
            this.fileType = '';
            this.getScct();
            this.getData()
        },
        // 获取数据
        getData(){
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.data.attachList , obj = {}
                        this.product = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index];
                            obj.listCheck = false;
                            this.product.push(obj);
                        }
                        this.$bus.emit('doPage',response.data.data.sumRecord,this.perPage,this.thisPage,'meetingFile')
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                        this.sumRecord = this.product.length
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getMeetingAttachListPage(obj)
        },
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
        "$route":"load"
    }
}
</script>

<style scoped>
    .documentContent{
        background-color: #fff;
        padding: 10px 50px 10px;
        padding-bottom: 0px;
    }
    .doc-btn-group{
        position: absolute;
        bottom: -55px;
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
        min-height: 640px;
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
    .active,.documentLists:hover:not(.documentListsActive){
        background-color: #F1F4F6;
    }
    .docImg{
        width: 70%;
        margin-bottom: 10px;
        text-align: center;
        margin: 0px auto;
    }
    .docImg img{
        width: 100%;
    }
    .docTitle{
        font-size: 14px;
        color: #666;
        line-height: 22px;
        height: 44px;
        overflow: hidden;
    }
    .documentShangchuan .el-upload{
        width: 120px !important;
        height: 120px;
        line-height: 120px;
    }
    .documentShangchuan{
        margin-top: 20px;
    }
    .documentLists .el-checkbox{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .documentListsActive{
        background-color: #E4E4E4;
    }
    .uplodownlo{
        margin: 0px auto;
        margin-top: 10px;
        overflow: hidden;
        min-height: 40px;
        width: 74%;
    }
    .uplodownlo img{
        width: 20px;
    }
    .docSearch{
        position: fixed;
        top: 80px;
        right: 40px;
        z-index: 999;
    }
    .doSelect{
        position: absolute;
        top: 80px;
        left: 73px;
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
        /*padding-bottom: 10px; */
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
    /* .el-col .el-col-4{
        padding: 0px 10px 10px 0px;
    } */
    /* .el-row{
        min-height:580px;
    } */
</style>
