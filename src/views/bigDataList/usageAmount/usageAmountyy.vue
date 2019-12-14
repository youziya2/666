<template>
    <div>
        <the-breadcrumb :end="end" :list="list" @initData='initData'></the-breadcrumb>
        <div class="yyContent">
            <!-- 产品搜索 -->
            <div class="search">
                {{ upObj.tit21 }}
                <el-input :placeholder="upObj.tit24" class="input-with-select" v-model='scct'>
                    <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}" @click="getData"></el-button>
                </el-input>
            </div>
            <!-- 条件筛选 -->
            <div class="filtrate">
                <span style="display: inline-block;margin-top: 8px;">{{ upObj.tit22 }}</span>    
                <div class="filtrateName">
                    <div v-for="(item,index) in subtypes" :key="index" @click="choice(index)"
                    :style="{border:(active === index?'1px solid'+colorselects:''),color:(active === index||hover === index?colorselects:'')}" @mouseenter="hover = index" @mouseleave="hover = ''">{{item}}</div>
                </div>
            </div>
            <!-- 列表 -->
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:getheight}">
                <div class="yyTableDiv">
                    <table spellcheck="0">
                        <tr class="yyTableTh">
                            <!-- 应用 -->
                            <th>{{ upObj.tit48 }}</th>
                            <!-- 排名 -->
                            <th>{{ upObj.tit49 }}</th>
                            <!-- 类别 -->
                            <th>{{ upObj.tit50 }}</th>
                            <!-- 最后更新 -->
                            <th>{{ upObj.tit51 }}</th>
                            <!-- 使用次数 -->
                            <th>{{ upObj.tit52 }}</th>
                            <!-- 版权公司 -->
                            <th>{{ upObj.tit53 }}</th>
                        </tr>
                        <tr v-for="(item,index) in ranking" :key="index">
                            <td>{{ item.appcname }}</td>
                            <td>{{ index+1 }}</td>
                            <td>{{ subtypes[item.subtypes] }}</td>
                            <td>{{ item.savetime }}</td>
                            <td>{{ item.num }}</td>
                            <td>{{ item.copyright }}</td>
                        </tr>
                    </table>
                </div>
                <!--分页-->
                <child @current='getCurrent'></child>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { compareArr } from '@/api/methods'
import { appCount } from '@/api/https'
import { subtypesInit } from '@/init/app'
import { appInit } from '@/init/bigdata'
import child from "@/components/page.vue";
export default {
    data(){
        return{
            list:[
                {router:"大数据分析"},
                {router:""}
            ],
            end:"应用统计",
            upObj: {},
            subtypes: '',
            active: "all",
            hover:"",
            ranking:[],
            getheight:'',
            apptypes: '',
            scct: '',
            thisPage: 1, //当前页码
            perPage: 10, //每页记录数
            sumRecord : 1,// 总纪录条数(默认1是让图标刚开始能加载选择的主题颜色)
        }
    },
    created(){
        subtypesInit(this);
        appInit(this);
        this.getData();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
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
            this.getData()
        },
        getHeight(){
            this.getheight = this.$config.getHeight(350);
        },
        // 点击选项
        choice(str){
            this.active = str;
            this.getData()
        },
        // 获取数据
        getData(){
            if(this.active == 'all') this.apptypes = '';
            else this.apptypes = this.active;
            var obj = {
                self: this,
                success: response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        var rdg =  response.data.appsList , obj = {}
                        this.ranking = []
                        for (let index = 0; index < rdg.length; index++) {
                            obj = rdg[index].fieldvalues 
                            this.ranking.push(obj)
                        }
                        compareArr('num',this.ranking);
                        this.$bus.emit('doPage',response.data.page.sumRecord,this.perPage,this.thisPage)
                    } else {
                        this.sumRecord = this.product.length
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            appCount(obj);
        }
    },
    components:{
        child
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    }
}
</script>
<style scoped>

    .yyContent{
        box-sizing: border-box;
        padding: 40px 50px;
        background-color: #fff;
        padding-bottom: 0px;
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
        padding-top: 5px;
        padding-bottom: 10px;
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
        vertical-align: top;
        font-size: 16px;
        color: #666666;
        margin-left: 40px;
        width: 1010px;
    }
    .filtrateName div{
        /* margin-right: 40px; */
        padding: 8px 15px; 
        border-radius:5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0);
    }
    .filtrateName div:hover{
        cursor:pointer;
    }
    .yyTableDiv{
        width: 100%;
        min-height: 520px;
    }
    .yyTableDiv table{
        text-align: center;
        width: 100%;
        color: #333;
        border-collapse:collapse;
    }
    .yyTableDiv table th{
        background-color: #F1F4F6;
        padding: 10px;
    }
    .yyTableTh{
        border: 1px solid #CCC;
    }
    .yyTableDiv table td{
        font-size: 14px;
        padding: 20px;
        border-bottom: 1px solid #F1F4F6;
    }
    .yyTableDiv table td img{
        width: 17%;
    }
    .yyTableDiv table tr:not(.yyTableTh):hover{
        background-color: #F1F4F6;
    }
    .yyNomoer{
        padding: 50px;
        text-align: center;
        font-size: 14px;
        color: #333;
    }
</style>
