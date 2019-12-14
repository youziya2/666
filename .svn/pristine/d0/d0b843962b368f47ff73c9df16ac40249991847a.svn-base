<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="Nuser-content">
            <div>
                <div class="Nuser-switcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search" style="margin-bottom:26px;">
                    <!-- 版本搜索 -->
                    {{ $parent.$parent.systemObj.tit05 }}
                    <el-input :placeholder="$buttonObj.keyWord" class="input-with-select" v-model="scct" style="vertical-align: middle">
                        <el-button slot="append" icon="el-icon-search" @click.native="doSearch" :style="{backgroundColor:colorselects}"></el-button>
                    </el-input>
                </div>
                <div class="cut">
                        <!-- 全选 -->
                    <el-checkbox v-if='product.length > 0' v-model="allCheck" @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                    <!-- 暂无数据 -->
                    <div v-else class="content-null"> {{$buttonObj.noData}} </div>
                </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="NuserListbox">
                    <el-row :gutter="80" v-if="type == 1">
                        <el-col :span="6" v-for="(item,index) in product" :key="index">
                            <div class="Nuser-productLists" @mouseenter="onhover = index" @mouseleave="onhover = ''" :class="item.listCheck?'BuserActive':''">
                                <template>
                                    <el-checkbox v-model="item.listCheck" name="listCheck" v-show="onhover === index||item.listCheck"
                                    @change="getChoice(totalChoice,index,item.listCheck,item.vsid)"></el-checkbox>
                                </template> 
                                <div class="fffback" @click="goxiugai(item.swename,item,'vsid')" :title='item.swename'>
                                    <img src="./../../../../static/img/system.jpg">
                                    <div class="txt-hidden" style="margin-bottom:15px;margin-top:20px;" v-for='(val,index) in companyList'>
                                        {{val}}：{{item[index]}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="NuserTypeTwo" v-if="type == 2">
                        <li v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" 
                            :style="index%2==0 ? 'margin: 0 2% 20px 0':'margin-bottom: 20px' " :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck" v-show="listActive === index||item.listCheck"
                                 @change="getChoice(totalChoice,index,item.listCheck,item.vsid)"></el-checkbox>
                            </div>
                            <div class="NuserImg">
                                <img src="./../../../../static/img/system.jpg">
                            </div>
                            <div class="particulars" @click="goxiugai(item.swename,item,'vsid')">
                                <div class="NuserList">
                                    <div class="txt-hidden" v-for='(val,index) in companyList'>
                                {{val}}：{{item[index]}}</div>
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
                    <span>{{$promptObj.delwarn}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="delOne">{{$buttonObj.sure}}</el-button>
                    </span>
                    </el-dialog>
                    <!-- 删除按钮 -->
                    <el-button  @click="doChoice(totalChoice,'totalChecked')" class="show-delet-btn" v-show="deletshow">{{$buttonObj.remove}}</el-button>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>  
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import child from "./../../../components/page.vue";
import { getNowFormatDate,goDetail,getChoice,doChoice,getScct,setScct,clearScct } from "./../../../api/methods.js";
import { batchDelete,buildVersionsListPage } from "./../../../api/https.js";
import { systemList } from "@/init/system"
export default {
    data(){
        return{
            list:[
                {router: this.$parent.$parent.systemObj.tit04}
            ],
            end: this.$parent.$parent.systemObj.tit03,
            product:[],
            type:1,
            thisPage: 1, //当前页码
            perPage: 18, //每页记录数
            currs: "", 
            scct:'',//搜索内容
            onhover:'',
            allCheck: '',//全选
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            selectNum:0,//要删除的数量
            centerDialogVisible:false,
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            listActive:'',
            windowHeight:'',
            bistype: {},
            companyList: {}//列表
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        if(sessionStorage.getItem('interstype') && sessionStorage.getItem('interstype').length){
            this.type = sessionStorage.getItem('interstype');
        };
        systemList(this);
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
        interstype:function(){
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
            clearScct('vl')
            this.getData()
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.vsid);
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
            getScct('vl',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct
            }
            setScct('vl',obj)
        },
        // 点击选择
        doSearch(){
            this.thisPage = 1;
            this.setScct();
            this.getData();
        },
         // 点击激活提示按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'vsid')
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
            batchDelete('YKMGBaseServiceInfc.batchRemoveVersions','versions',obj)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(320);
        },
         // 进入详情页面
        goxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/systemVersion/custom/VersionDetail/',"./static/img/smalluser.png",gdid)
            this.$emit('addxiugai',add);
        },
        remenbtype(index){
            this.type = index;
            sessionStorage.setItem('interstype',index)
        },
        // 获取数据
        getData(){
            var obj = {
                self : this,
                success : res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  res.data.versionsList , obj = {}
                        this.product = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            obj.listCheck = false
                            obj.savetime = getNowFormatDate(new Date(obj.savetime.time))
                            this.product.push(obj)
                        }
                        this.$bus.emit('doPage',res.data.page.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
            }
            buildVersionsListPage(obj)
        }
    }
}
</script>

<style scoped>
    .Nuser-content{
        padding: 20px  50px 0px;
        background-color: #fff;
        position: relative;
    }
    /* 切换列表器样式 */
    .Nuser-switcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 50px;
        right: 50px;
    }
    .Nuser-switcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .Nuser-switcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .s-left{
        border-right: 1px solid #F1F4F6;
    }
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
        padding-top: 8px;
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
    .filtrate{
        margin-top: 25px;
        margin-bottom: 20px;
    }
    .filtrate .filtrateName{
        display: inline-block;
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
    .NuserListbox{
        min-height: 560px;
        position: relative;
    }
    .NuserListbox .el-col{
        margin-bottom: 15px;
    }
    .Nuser-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .NuserTypeTwo{
        overflow: hidden;
    }
    .NuserTypeTwo li{
        float: left;
        width: 47%;
        padding: 20px 1%;
    }
    .NuserTypeTwo li>div{
        float: left;
    }
    .NuserTypeTwo li:not(.listBack):hover{
        background-color: #F1F4F6;
    }
    .listCheck{
        margin-top: 66px;
        width: 15px;
        height: 20px;
    }
    .NuserImg img{
        width: 100%;
    }
    .NuserImg{
        width: 45%;
        padding-left: 2%;
        /* padding-right: 40px; */
    }
    .particulars{
        overflow: hidden;
        width: 50%;
        /* padding-top: 20px; */
    }
    .particulars:hover{
        cursor: pointer;
    }
    .NuserList>div{
        width: 90%;
        margin: 0 0 18px 18px;
        font-size: 14px
    }
    .listBack{
        background-color: #E4E4E4;
    }
    .el-checkbox span>span{
        border: 1px solid #999;
    }
    /* 分页小div增加边框 */
    .el-pager li:not(.active){
        border: 1px solid #CCCCCC;
    }
    .el-pager li.active+li{
        border-left:1px solid #ccc;
    }
    
    .Nuser-productLists{
        text-align: left;
        width: 89%;
        padding: 10px;
        padding-bottom: 0px;
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor: pointer;
        position: relative;
    }
    .Nuser-productLists:not(.BuserActive):hover{
        background-color: #F1F4F6;
    }
    .Nuser-productLists>.fffback{
        width: 77%;
    }
    .Nuser-productLists>.fffback>div{
        font-size: 14px;
        line-height: 14px;
    }
    .Nuser-productLists .el-checkbox{
        position: absolute;
        right: 10px;
    }
    .Nuser-productLists img{
        width: 100%;
    }
    .Nuser-productLists:not(.BuserActive):hover{
        background-color: #F1F4F6;
    }
    .BuserActive{
        background-color: #E4E4E4;
    }
    .Nuser-productLists>.fffback{
        width: 77%;
    }
    .Nuser-productLists>.fffback>div{ 
        font-size: 14px;
        line-height: 14px;
    }
    .Nuser-productLists>.fffback>div:last-child{
        height: 28px;
    }
    .el-row{
        margin: 0px !important;
    }
</style>