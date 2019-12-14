<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="list-content">
            <div>
                <div class="switcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div style="overflow: hidden;line-height: 34px;padding-bottom: 40px;">
                    <!-- 产品搜索 -->
                    <span class="search">{{$parent.mbitemObj.tit08}}</span>
                        <div class="search-condition">
                            <!-- 主板大类 -->
                            <div class="grid-content bg-purple" style="text-align:right">{{$parent.mbitemObj.tit04}}</div>
                            <div class="discrible" style="width:60%">
                                <el-select
                                v-model="types"
                                @change = ' subtypes="" '
                                :placeholder="types ? types : $buttonObj.select "
                                >
                                <el-option
                                    v-for="(item,index) in typesObj"
                                    :key="index"
                                    :label="item"
                                    :value="index"
                                ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="search-condition">
                            <!-- 主板小类 -->
                            <div class="grid-content bg-purple" style="text-align:right">{{$parent.mbitemObj.tit05}}</div>
                            <div class="discrible" style="width:60%">
                                <el-select
                                v-model="subtypes"
                                :placeholder="subtypes ? subtypes : $buttonObj.select "
                                >
                                <el-option
                                    v-for="(item,index) in subtypesObj[types]"
                                    :key="index"
                                    :label="item"
                                    :value="index"
                                ></el-option>
                                </el-select>
                            </div>
                        </div> 
                        <div class="search-condition">
                            <el-button icon="el-icon-search" style="padding:10px 22px" @click.native="doSearch()" :style="{backgroundColor:colorselects}"></el-button>
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
                                <el-checkbox name="checkcolor" v-model="item.listCheck"  @change="getChoice(totalChoice,index,item.listCheck,item.mbitid)" 
                                v-show="productActive === index||item.listCheck"></el-checkbox>
                                <div class="productLists">
                                    <img src="../../../../static/img/zhuban.jpg" @click="goxiugai(item.series,item,'mbitid')" :title='item.series'>
                                    <div class="txt-hidden">{{item.series}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="productTypeTwo" v-if="type == 2">
                        <li v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck"  v-show="listActive === index||item.listCheck"  @change="getChoice(totalChoice,index,item.listCheck,item.mbitid)"></el-checkbox>
                            </div>
                            <div class="listImg">
                                <img src="../../../../static/img/zhuban.jpg">
                            </div>
                            <div class="particulars" @click="goxiugai(item.series,item,'mbitid')">
                                <div>{{item.series}}</div>
                                <div class="particularsList">
                                    <div v-for="(i,val) in listList" :key = 'val'>
                                        {{i}}：{{  val == 'types' ? typesObj[item.types] : ( val == 'subtypes' ? subtypesObj[item.types][item.subtypes] : item[val]) }}
                                    </div>   
                                </div>
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
                    <el-button type="danger" class="show-delet-btn"  @click="doChoice(totalChoice,'totalChecked')" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>  
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { batchDelete, getMbitemList } from "../../../api/https.js";
import child from "../../../components/page.vue";
import { getNowFormatDate, getChoice, doChoice, goDetail, getScct, setScct, clearScct } from "../../../api/methods.js";
import { templateList } from "@/init/mainboard.js";
export default {
    data(){
        return{
            centerDialogVisible: false,
            list: [{ router: this.$parent.mbitemObj.tit07 }],
            end: this.$parent.mbitemObj.tit03,
            selectNum:0,//选中的数量
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            product:[],
            hover:'',
            productActive:"",
            type:1,
            types:'', //主板大类
            subtypes:'', //主板小类
            typesObj:{},
            subtypesObj:{},
            listList: {},
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            add:{},
            listActive:'',
            windowHeight:'',
            allCheck: '',//全选
            thisPage: 1, //当前页码
            perPage: 20, //每页记录数
            sumRecord : 0,// 总纪录条数
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
        templateList(this);
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getScct();
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
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.types = ''
            this.subtypes = ''
            clearScct('mbpTem')
            this.getData()
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.mbitid);
                } else {
                    element.listCheck = false;
                    this.totalChoice = [];
                }
            });
        },
        // 获取搜索条件
        getScct(){
            var obj = {
                types: '',
                subtypes: ''
            }
            this.thisPage = 1
            getScct('mbpTem',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                types: this.types,
                subtypes: this.subtypes
            }
            setScct('mbpTem',obj)
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
            this.$bus.emit('deleteArr',this[arr2],'mbitid')
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(350);
        },
        //点击查看详情
        goxiugai(name,obj,gdid){
            var add = goDetail(name, obj, '/management/motherboardProducts/finishedDetail/', "./static/img/smallyy.png", gdid)
            this.$emit('addxiugai',add);
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
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHMainboardServiceInfc.batchRemoveMbitem','mbitem',obj)
        },
        // 数据请求
        getData(){
            var obj = {
                self:this,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.mbitemList , obj = {}
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
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getMbitemList(obj)
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
        top: 86px;
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
    .search{
        margin-right: 50px;
        float: left;
    }
    .search>div{
        width: 400px;
        margin-left: 60px;
    }
    .search-condition{
        float: left;
        margin-right: 40px;
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
        min-height: 530px;
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
        padding-top: 20px;
    }
    .particulars:hover{
        cursor: pointer;
    }
    .particularsList{
        margin-top: 28PX;
    }
    .particularsList>div{
        width: 30%;
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