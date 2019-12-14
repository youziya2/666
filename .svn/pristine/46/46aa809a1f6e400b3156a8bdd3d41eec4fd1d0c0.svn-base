<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="list-content">
            <div>
                <div class="switcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search">
                    <!-- 产品搜索 -->
                    {{$parent.templateObj.tit07}}
                    <el-input :placeholder="$parent.templateObj.tit21" v-model="scct" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click.native="doSearch()" :style="{backgroundColor:colorselects}"></el-button>
                    </el-input>   
                </div>
                <div class="filtrate">
                    <!-- 条件筛选 -->
                    {{$parent.templateObj.tit08}}
                    <div class="filtrateName">
                        <div v-for="(item,index) in filname" :key="index" :style="{border:(active === index?'1px solid'+colorselects:''),color:(active === index||hover === index?colorselects:'')}"
                         @mouseenter="hover = index" @mouseleave="hover = ''" @click="getInfos(index,item.name)">{{item.name == "all" ? $parent.templateObj.tit09 : item.name + $parent.templateObj.tit10}}</div>
                    </div>
                </div>
                <div class="cut">
                        <!-- 全选 -->
                    <el-checkbox v-if='product.length > 0' v-model="allCheck" @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                    <!-- 暂无数据 -->
                    <div v-else class="content-null"> {{$buttonObj.noData}} </div>
                </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="productListbox">
                    <el-row :gutter="20" v-if="type == 1">
                        <el-col :span="6" v-for="(item,index) in product" :key="index" class="productListsImg">
                            <div class="product-fffback" :class="item.listCheck?'productActive':''" @mouseenter="productActive = index" @mouseleave="productActive = ''">
                                <el-checkbox name="checkcolor" v-model="item.listCheck"  @change="getChoice(totalChoice,index,item.listCheck,item.gdid)" 
                                v-show="productActive === index||item.listCheck"></el-checkbox>
                                <div class="productLists" :title='item.gdcname'>
                                    <img src="../../../../static/img/computer.png" @click="goxiugai(item.gdcname,item,'gdid')">
                                    <div style="overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;">{{item.gdcname}}</div> 
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="productTypeTwo" v-if="type == 2">
                        <li v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck"  v-show="listActive === index||item.listCheck"  @change="getChoice(totalChoice,index,item.listCheck,item.gdid)"></el-checkbox>
                            </div>
                            <div class="listImg">
                                <img src="../../../../static/img/computer.png">
                            </div>
                            <div class="particulars" @click="goxiugai(item.gdcname,item,'gdid')">
                                <div>{{item.gdcname}}</div>
                                <div class="particularsList">
                                    <div :style="  val == 'savetime' ? 'width:30%' : (val == 'address' ? 'width:100%' : '') " v-for="(i,val) in listList" :key = 'val'>{{i}}：{{item[val]}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 删除提示 -->
                    <el-dialog
                    :title="$promptObj.warn"
                    :visible.sync="centerDialogVisible"
                    width="330px"
                    center>
                    <span v-if = "isBand">删除的标准中有的已绑定单品，是否继续？</span>
                    <span v-else>{{$promptObj.delwarn}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="delOne">{{$buttonObj.sure}}</el-button>
                    </span>
                    </el-dialog>
                    <el-button type="danger" class="show-delet-btn"  @click="doChoice(totalChoice,'totalChecked')" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>  
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { batchDelete,getProductList,checkGoodsitemByGdid } from "../../../api/https.js";
import child from "../../../components/page.vue";
import { getNowFormatDate,getChoice,doChoice,goDetail,setScct,getScct,clearScct } from "../../../api/methods.js";
import { listInit } from "@/init/product.js";
export default {
    data(){
        return{
            isBand:false,
            centerDialogVisible: false,
            list:[{ router: this.$parent.templateObj.tit01}
            ],
            end: this.$parent.templateObj.tit03,
            filname:[
                {name:"all"},
                {name:"L12"},
                {name:"L18"},
                {name:"L0D18"},
                {name:"HOD18"}
            ],
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            scct:'',//搜索内容
            subtypes:'',
            product:[],
            languageObj: {},//语言对象
            listList: {},
            active:0,
            hover:'',
            productActive:"",
            type:1,
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            add:{},
            listActive:'',
            allCheck: '',//全选
            windowHeight:'',
            thisPage: 1, //当前页码
            perPage: 20, //每页记录数
            sumRecord : 0// 总纪录条数
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        },
        
    },
    components:{
        child
    },
    created(){  
        if(sessionStorage.getItem('type') && sessionStorage.getItem('type').length){
            this.type = sessionStorage.getItem('type');
        };
        window.addEventListener('resize', this.getHeight);
        listInit(this);
        this.getScct();
        this.getHeight();
        this.getData()     
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
    methods:{
        // 获取分页组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                scct: '',
                active: '',
                subtypes: ''
            }
            this.thisPage = 1
            getScct('proTem',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct,
                active: this.active,
                subtypes: this.subtypes
            }
            setScct('proTem',obj)
        },
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.scct = ''
            this.active = 0
            this.subtypes = ''
            clearScct('proTem')
            this.getData()
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.gdid);
                } else {
                    element.listCheck = false;
                    this.totalChoice = [];
                }
            });
        },
        // 点击选择框
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        // 点击删除
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2);
            this.$bus.emit('deleteArr',this[arr2],'gdid');
            this.checkGoodsitemByGdid();
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(400);
        },
        // 获取某一系列
        getInfos(num,str){
            if (this.active == num) return true
            this.active = num
            if (str == 'all') {
                this.subtypes = ''
            } else {
                this.subtypes = str
            }
            this.thisPage = 1
            this.setScct();
            this.getData()
        },
        // 点击搜索
        doSearch(){
            this.setScct();
            this.thisPage = 1
            this.getData();
        },
        //点击查看详情
        goxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/productList/productDetails/',"./static/img/smallyy.png",gdid)
            this.$emit('addxiugai',add);
        },
        // 绑定检查
        checkGoodsitemByGdid(){
            var str = '';
            for (let index = 0; index < this.totalChecked.length; index++) {
                str += this.totalChecked[index] + '&';
            }
            str = str.substring(0,str.length-1);
            var obj = {
                gdid: str,
                success:res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        if (res.data.data) {
                            this.isBand = true;
                        } else {
                            this.isBand = false;
                        }
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            checkGoodsitemByGdid(obj);
        },
        // 删除商品
        delOne(){  
            var obj = {
                success:res => {  //res是server端响应
                var res = JSON.parse(res)
                    if (res.message.indexOf("removeSuccess") > -1) {
                        this.$message.success(this.$promptObj.removesuccess);
                        this.centerDialogVisible = false;
                        this.$bus.emit('removeTab',this.totalChecked);
                        this.getData();
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHGoodsServiceInfc.batchRemoveGoods','goods',obj);
        },
        // 数据请求
        getData(){
            this.product = []
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.goodsList , obj = {}
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            obj.savetime = getNowFormatDate(new Date(obj.savetime.time))
                            obj.listCheck = false
                            this.product.push(obj)
                        }             
                        this.$bus.emit('doPage',response.data.page.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                    this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getProductList(obj)
        },
        remenbtype(index){
            this.totalChoice = [];//点击数组
            this.totalChecked = [];//选择数组
            this.type = index;
            sessionStorage.setItem('type',index)
        },
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
    /* 切换列表器样式 */
    .switcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 115px;
        right: 50px;
    }
    .switcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .switcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .s-left{
        border-right: 1px solid #F1F4F6;
    }
    #box>div{
        height: 49px;
        width: 200px;
        line-height: 50px;
        color: #333;
        text-indent: 20px;
        border-bottom: 1px solid #CCCCCC;
    }
    #box>div:hover{
        background: #4377EE;
        color: #fff;
    }
    /* end */
    .search,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    .search>div{
        width: 400px;
        margin-left: 40px;
    }
    .search>div .el-input__inner{
        height: 36px;
    }
    .search .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .search .el-input-group__append button{
        height: 40px;
        padding-top: 9px;
    }
    .search .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .search ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    /* 输入框搜索记录 */
    .record{
        display: inline-block;
        vertical-align: middle;
    }
    .record>div{
        width: 82px;
        height: 30px;
        background-color: #E4E4E4;
        font-size: 12px;
        color: #999;
        line-height: 30px;
        text-align: center;
        float: left;
    }
    /* end */
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
    .productListbox{
        min-height: 480px;
        position: relative;
    }
     .el-row{
        margin: 0px !important;
    }
    .productListbox .el-col{
        margin-bottom: 15px;
    }
    .productLists{
        text-align: center;
        width: 76%;
        padding: 15px 10px;
        padding-bottom: 5px;
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor:pointer;
        position: relative;
        padding: 10px;
    }
    .product-fffback .el-checkbox{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .productLists img{
        width: 100%;
    }
    .list-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .productTypeTwo li{
        height: 180px;
        width: 98%;
        padding: 20px 15px;
        margin-bottom: 10px;
    }
    .productTypeTwo li>div{
        float: left;
    }
    .productTypeTwo li:not(.listBack):hover{
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
    }
    .particulars{
        height: 160px;
        width: 70%;
        /* padding-top: 20px; */
    }
    .particulars:hover{
        cursor: pointer;
    }
    .particularsList{
        margin-top: 28PX;
    }
    .particularsList>div{
        width: 25%;
        margin-bottom: 22px;
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
    .product-fffback{
        width: 94%;
        padding: 10px;
        position: relative;
    }
    .product-fffback.productActive{
        background-color: #F1F4F6;
        background-color: #E4E4E4;
    }
    .product-fffback:not(.productActive):hover{
        background-color: #F1F4F6;
    }
    .productListsImg{
        width: 19% !important;
        margin-right: 1%;
    }
</style>