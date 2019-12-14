<template>
    <div>
        <div class="doc-btn-group" v-if="deletshow">
            <el-row>
                <!-- 下载选中  -->
                <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click.native="allDownload()">下载选中</el-button>
                <!-- 删除选中 -->
                <el-button type="danger" @click.native="doChoice(totalChoice,'totalChecked',2)">删除选中</el-button>
            </el-row>
        </div>
        <div class="docSearch">
            <el-input placeholder="输入关键字搜索" class="input-with-select" v-model="scct">
                <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}"  @click.native="doSearch()"></el-button>
            </el-input>
        </div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
          <!-- <span v-if="flag == 1">是否删除文件？</span>
          <span v-if="flag == 2">删除的文件个数：{{selectNum}}</span> -->
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
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div>
                    <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">全选</el-checkbox>
                </div>
                <el-row :gutter="20">
                    <!-- 文件上传 -->
                    <el-col :span="4">
                        <div class="documentShangchuan">
                            <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
                                <div class="file-imgs">
                                    <input  type="file" ref="img01" id="img01" title="点击选择文件" name="img01" multiple="multiple" @change="uploadMoreattach('img01')">
                                    <div class="show-imgs">
                                        <img v-if=" imgList.img01.imgpath " :src="imgList.img01.imgpath">
                                    </div>
                                </div> 
                            </form>
                        </div>
                    </el-col>
                    <!-- 文件列表 -->
                    <div v-if='product.length < 1' class="content-null" style="clear: both"> 暂无数据 </div>
                    <el-col :span="4" v-for="(item,index) in product" :key="index">
                        <div class="documentLists" :class="item.listCheck?'documentListsActive':''" @mouseenter="productActive = index" @mouseleave="productActive = ''">
                            <el-checkbox name="checkcolor" @change="getChoice(totalChoice,index,item.listCheck,item.atid + '@@' + baseUrl + item.aturl)" 
                                v-model="item.listCheck" v-show="productActive === index||item.listCheck"></el-checkbox>
                            <div class="docImg">
                                <img src="./../../../static/img/doczip.png" :title = 'item.atcname'>
                            </div>
                            <div class="docTitle">{{item.atcname | capitalize}}</div>
                            <div class="uplodownlo">
                                <a :href=" baseUrl + item.aturl " download><img src="./../../../static/img/downloaddoc.png" style="float:left" v-show="productActive === index"></a>
                                <span style="float:right" v-show="productActive === index && !item.listCheck" @click="isDelect(1,'img01',item.atid)"><img src="./../../../static/img/deletdoc.png" ></span>
                            </div>
                        </div>
                    </el-col>
                </el-row>  
                <!--分页-->
                <child @current='getCurrent'></child>   
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { getChoice,doChoice,getScct,setScct,clearScct } from "./../../api/methods.js";
import { batchDelete, getFiles,delPictrue,uploadMoreattach } from "./../../api/https.js";
import child from "./../../components/page.vue";
export default {
    data(){
        return{
            list:[
                {router: '系统版本'}
            ],
            end: '标准版本',
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            selectNum:'',//选择个数
            flag:1,//是否删除多个
            imgList:{//图片列表
            img01:{imgid:'',imgpath:''}},
            imgNum:'',//附件ID
            productActive:'',
            deletshow:false,
            centerDialogVisible:false,
            windowHeight:'',
            allCheck: '',//全选
            thisPage: '1', //当前页码
            perPage: 23, //每页记录数
            currs:'',//总页数              
            scct:'',
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
            if(value.length > 22) str = value.substring(0,7) + '……' + value.substring(value.length-9)
            else str = value
            return str
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
            clearScct(this.fileType);
            this.getData();
        },
        // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
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
        // 附件上传
        uploadMoreattach(str,pkid) {
            var uploadFile = this.$refs.img01.value, types = '', obj = this.$parent.fileType;
            for (const key in obj) {
                types += obj[key] + ','
            }
            if (types.indexOf(uploadFile.substring(uploadFile.lastIndexOf('.') + 1)) < 0) {
                this.$refs.img01.value = '';
                return this.$message.error(this.$parent.docObj.tit09)
            }  
            var obj = {
                isAttach : 'attach',
                types : 'attach',
                tbname : "attach",
                imgIndex : this.imgList[str],
                dom : document.getElementById(str),
                pkid : pkid,
                fn : this.getData
            }
            this.scct = '';
            uploadMoreattach(obj)
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
            getScct(this.fileType,obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct
            }
            setScct(this.fileType,obj)
        },
        // 点击搜索
        doSearch(){
            this.setScct();
            this.getData(true);
        },   
       // 点击激活按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
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
            var download  = (name, href) => {   
                var a = document.createElement("a"), //创建a标签
                e = document.createEvent("MouseEvents"); //创建鼠标事件对象
                e.initEvent("click", false, false); //初始化事件对象
                a.href = href;  //设置下载地址
                a.download = name;  //设置下载文件名
                a.dispatchEvent(e); //给指定的元素，执行事件click事件
            }
            for (let index = 0; index < this.totalChecked.length; index++) {
                download('第'+ index +'个文件', this.totalChecked[index]);  
            }
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(200);
        },
        getData(){
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.attachList , obj = {}
                        this.product = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
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
            getFiles(obj)
        }
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
        }
    }
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
    }
    .documentContent .el-row{
        min-height: 640px;
    }
    .documentLists{
        box-sizing: border-box;
        width: 100%;
        padding: 30px 20px;
        position: relative;
        margin-bottom: 20px;
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
        width: 55%;
        height: 125px;
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
        padding-bottom: 18px;
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
    /* .el-row{
        min-height:580px;
    } */
</style>