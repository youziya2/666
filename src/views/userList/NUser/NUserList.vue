<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="Buser-content">
            <div>
                <div class="Buserswitcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search" style="margin-bottom:26px;">
                    <!-- 用户搜索 -->
                    {{$parent.$parent.userObj.tit07}}
                    <el-input :placeholder="$parent.$parent.userObj.tit09" class="input-with-select" v-model="scct">
                        <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}" @click.native="doSearch"></el-button>
                    </el-input>
                </div>
                <div class="cut">
                        <!-- 全选 -->
                    <el-checkbox v-model="allCheck" v-if='product.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                    <!-- 暂无数据 -->
                    <div v-else class="content-null"> {{$buttonObj.noData}} </div>
                </div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="Buser-productListbox">
                    <el-row :gutter="80" v-if="type == 1">
                        <el-col :span="4" v-for="(item,index) in product" :key="index">
                            <div class="Buser-productLists" @mouseenter="onhover = index" @mouseleave="onhover = ''" :class="item.listCheck?'BuserActive':''">
                                <template v-if="item.rlename != 'manager'">
                                    <el-checkbox v-model="item.listCheck" @change="getChoice(totalChoice,index,item.listCheck,item.psuserid)" 
                                    v-show="onhover === index||item.listCheck"></el-checkbox>
                                </template>
                                <div class="fffback" :title='item.realname' @click="goxiugai(item.realname,item,'psuserid')">
                                    <img src="./../../../../static/img/zcrimg.png">
                                    <div class="txt-hidden" style="margin-bottom:15px;margin-top:20px;">{{personList.realname}}：{{item.realname}}</div>
                                    <div class="txt-hidden">{{personList.userName}}：{{item.mobile}}</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="Buser-productTypeTwo" v-if="type == 2">
                        <div class="Buserlist" v-for="(item,index) in product" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'ischeck':''">
                            <template v-if="item.rlename != 'manager'">
                                <el-checkbox v-model="item.listCheck" v-show="listActive === index||item.listCheck" 
                                @change="getChoice(totalChoice,index,item.listCheck,item.psuserid)"></el-checkbox>
                            </template>
                            <div class="Buserimg">
                                <img src="./../../../../static/img/zcrimg.png" @click="goxiugai(item.realname,item,'psuserid')">
                            </div>
                            <div class="Buserdetails" @click="goxiugai(item.realname,item,'psuserid')">
                                <div class="Buserdetailstitle"></div>
                                <div>{{personList.realname}}：{{item.realname}}</div>
                                <div style="width:40%;">{{personList.mobile}}：{{item.mobile}}</div>
                                <div>{{personList.rlename}}：{{rlename[item.rlename]}}</div>
                                <div style="width:40%;">{{personList.userName}}：{{item.mobile}}</div>
                            </div>
                        </div>
                    </div>
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
import { getGeneralList,batchDelete } from "./../../../api/https.js";
import { personListInit } from "@/init/user.js";
import child from "./../../../components/page.vue";
import { getNowFormatDate,goDetail,getChoice,doChoice,closeIcon,setScct,getScct,clearScct } from "./../../../api/methods.js";
export default {
    data(){
        return{
            list:[
                {router: this.$parent.$parent.userObj.tit01}
            ],
            end: this.$parent.$parent.userObj.tit10,
            product:[],
            thisPage: 1, //当前页码
            perPage: 18, //每页记录数
            scct:'',//搜索内容
            personList: {},
            rlename: {},//用户角色
            hover:'',
            type:1,
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
            windowHeight:''
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    components:{
        child
    },
    created(){
        if(sessionStorage.getItem('Busertype') && sessionStorage.getItem('Busertype').length){
            this.type = sessionStorage.getItem('Busertype');
        };
        window.addEventListener('resize', this.getHeight);
        personListInit(this);
        this.getHeight();
        this.getScct();
        this.getData();
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
         // 获取页面组件传过来的值
        getCurrent(data){
            this.thisPage = data;
            this.getData();
        },
        //获取导航列表传过来的值
        initData(){
            this.thisPage = 1
            this.scct = ''
            clearScct("nl");
            this.getData()
        },
        //点击全选
        allChoice(){
            this.product.forEach(element => {
                if (this.allCheck) {
                    element.listCheck = true;
                    this.totalChoice.push(element.psuserid);
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
            getScct('nl',obj,this)
        },
        // 记录搜索条件
        setScct(){
            var obj = {
                scct: this.scct
            }
            setScct('nl',obj)
        },
        // 点击选择
        doSearch(){
            this.setScct();
            this.thisPage = 1;
            this.getData(true);
        },
         // 点击激活提示按钮
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'psuserid')
        },
        // 点击删除
        delOne(){
            var obj = {
                success:res => {  //res是server端响应
                    var res = JSON.parse(res)
                    if (res.message.indexOf("removeSuccess") > -1) {
                        this.$message.success(this.$promptObj.removesuccess);
                        this.centerDialogVisible = false;
                        this.$bus.emit('removeTab',this.totalChecked);
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            batchDelete('BHUserServiceInfc.batchRemovePerson','person',obj)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(350);
        },
        remenbtype(index){
            this.type = index;
            sessionStorage.setItem('Busertype',index)
        },
         // 进入详情页面
        goxiugai(name,obj,gdid){
            var add = goDetail(name,obj,'/management/userList/NUser/NUserDetail/',"./static/img/smalluser.png",gdid)
            this.$emit('addxiugai',add);
        },
        // 获取数据
        getData(){
             var obj = {
                self:this,
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  res.data.personList , obj = {}
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
            getGeneralList(obj)
        }
    }
}
</script>

<style scoped>
    /* 应用列表样式开始 */
    .Buser-content{
        padding: 50px;
        padding-bottom: 0px;
        background-color: #fff;
        position: relative;
    }
    /* 切换列表器样式 */
    .Buserswitcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 60px;
        right: 50px;
    }
    .Buserswitcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .Buserswitcher>div i{
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
        padding-top: 10px
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
    .Buser-productListbox{
        min-height: 530px;
        position: relative;
    }
    .Buser-productListbox .el-col{
        padding: 0px 10px 10px 0px !important;
        position: relative;
    }
    .Buser-productLists{
        text-align: left;
        width: 89%;
        padding: 10px;
        /* padding-bottom: 5px; */
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor: pointer;
        position: relative;
    }
    .Buser-productLists:not(.BuserActive):hover{
        background-color: #F1F4F6;
    }
    .BuserActive{
        background-color: #E4E4E4;
    }
    .Buser-productLists>.fffback{
        width: 77%;
    }
    .Buser-productLists>.fffback>div{
        font-size: 14px;
        line-height: 14px;
    }
    .Buser-productLists>.fffback>div:last-child{
        height: 28px;
    }
    .Buser-productLists .el-checkbox{
        position: absolute;
        right: 10px;
    }
    .Buser-productLists img{
        width: 100%;
    }
    .Buser-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .listCheck{
        margin-top: 66px;
        width: 15px;
        height: 20px;
    }
    .el-checkbox span>span{
        border: 1px solid #999;
    }
    /* 列表类型样式 */
    .Buser-productTypeTwo{
        width: 100%;
        overflow: hidden;
    }
    .Buserlist{
        padding: 20px 15px;
        width: 46%;
        overflow: hidden;
        float: left;
        margin-bottom: 20px;
        margin-right: 1%;
        position: relative;
    }
    .Buserlist:not(.ischeck):hover{
        background-color: #F1F4F6;
    }
    .Buserimg{
        width: 16.5%;
        float: left;
        margin-left: 9%;
    }
    .Buserimg>img{
        width: 100%;
    }
    .Buserdetails{
        float: left;
        margin-left: 5.5%;
        width: 65%;
    }
    .Buserlist>.el-checkbox{
        position: absolute;
        left: 5%;
        top: 44%;
    }
    .Buserdetails .Buserdetailstitle{
        font-size: 20px;
        color: #333;
        margin-bottom: 25px;
        line-height: 20px;
        font-weight: 700;
    }
    .Buserdetails>div:not(.Buserdetailstitle){
        font-size: 14px;
        color: #666;
        display: inline-block;
        width: 57%;
        margin-bottom: 25px;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    /* 列表选定样式 */
    .ischeck{
        background-color: #E4E4E4;
    }
    /* 应用列表样式结束 */
    .el-row{
        margin: 0px !important;
    }
</style>
