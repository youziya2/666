<template>
    <div>
        <div class="theme-content">
            <div class="theme-filtrate">
                <!-- 条件筛选 -->
                {{$parent.$parent.desktop.tit08}}
                <div class="filtrateName">
                    <div v-for="(item,index) in filname" :key="index" :style="{border:(active === index?'1px solid'+colorselects:''),color:(active === index||hover === index?colorselects:'')}" 
                    @mouseenter="hover = index" @mouseleave="hover = ''" @click="getScct(index)">{{item}}</div>
                </div>
                <div class="cut">
                        <!-- 全选 -->
                    <el-checkbox v-model="allCheck" v-if='themelist.length > 0' @change="allChoice">{{$buttonObj.allCheck}}</el-checkbox>
                    <!-- 暂无数据 -->
                    <div v-else class="content-null"> {{$buttonObj.noData}} </div>
                </div>
            </div>
            <el-scrollbar :style="{height:windowHeight}">
                <el-row :gutter="20" style="min-height: 520px;">
                    <el-col :span="6" v-for="(item,index) in themelist" :key="index" class="desktopListImg">
                        <div class="theme-fffback" :class="item.themecheck?'active':''" @mouseenter="productActive = index" @mouseleave="productActive = ''">
                            <el-checkbox name="checkcolor" v-model="item.themecheck" v-show="productActive === index||item.themecheck"
                             @change="getChoice(totalChoice,index,item.themecheck,item.dpid)"></el-checkbox>
                            <div class="themeLists" :title='item.dpcname'>
                                <img src="./../../../../static/img/themeimg.png">
                                <div class="txt-hidden">{{item.dpcname}}</div>
                            </div>
                        </div>
                    </el-col>
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
                    <el-button @click="doChoice(totalChoice,'totalChecked')" type="danger" class="show-delet-btn" v-show="theme">{{$buttonObj.remove}}</el-button>
                </el-row>
                 <!--分页-->
                <child @current='getCurrent'></child>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import child from "./../../../components/page.vue";
import { getChoice,doChoice } from "./../../../api/methods.js";
import { batchDelete,getDesktopList  } from "./../../../api/https.js";
import { getFilname  } from "@/init/desktop.js";
export default {
    data(){
        return{
            filname:[],
            subtypes: '',
            thisPage: 1, //当前页码
            perPage: 20, //每页记录数
            types: "motifs",
            active:'all',
            allCheck: '',//全选
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            selectNum:0,//要删除的数量
            centerDialogVisible:false,
            hover:'',
            themelist:[],
            theme:false,
            productActive:'',
            windowHeight:''
        }
    },
    components:{
        child
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        getFilname(this);
        this.getData();
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
        getHeight(){
            this.windowHeight = this.$config.getHeight(360);
        },
        //点击全选
        allChoice(){
            this.themelist.forEach(element => {
                if (this.allCheck) {
                    element.themecheck = true;
                    this.totalChoice.push(element.dpid);
                } else {
                    element.themecheck = false;
                    this.totalChoice = [];
                }
            });
        },
        // 单个选择
        getChoice(arr,num,boo,id){
            getChoice(arr,num,boo,id)
        },
        doChoice(arr1,arr2){
            this.centerDialogVisible = true;
            this[arr2] = doChoice(arr1,arr2)
            this.selectNum = this[arr2].length
            this.$bus.emit('deleteArr',this[arr2],'dpid')
        },
        // 点击删除
        delOne(){
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
            batchDelete('BHDesktopServiceInfc.batchRemoveDesktop','desktop',obj)
        },
         // 点击筛选
        getScct(index){
            this.active = index;
            this.subtypes = index;
            this.getData()
        },
        getData(){
            this.subtypes == 'all' ? this.subtypes = '' : this.subtypes;
            var obj = {
                self : this,
                success : response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.desktopList , obj = {}
                        this.themelist = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            obj.themecheck = false
                            this.themelist.push(obj)
                        }
                        this.$bus.emit('doPage',response.data.page.sumRecord,this.perPage,this.thisPage)
                        this.totalChoice = [] ;//点击数组
                        this.totalChecked = [] ;//选择数组
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getDesktopList(obj)
        }
    },
    watch:{
        themelist:{
            deep:true,
            handler:function(n){
                this.theme = false;
                this.allCheck = true;
                n.forEach(element => {
                    element.themecheck?this.theme = true:'';
                    element.themecheck? '' : this.allCheck = false;
                });
            }
        }
    }
}
</script>

<style  scoped>
.el-row{
        margin: 0px !important;
    }
</style>

