<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="BuserDetailContent" ref="scerllbarH">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="NuserIcan">
                    <div class="BuserDetailTitle">{{product.realname}}</div>
                    <div class="BuserDetailTable">
                        <table spellcheck="0" style="border-collapse:collapse;">
                            <tr>
                                <!-- 基本信息 -->
                                <th colspan="4">{{$parent.$parent.userObj.tit03}}</th>
                            </tr>
                            <template v-for="(val,k) in personList">
                                <tr :key="k" v-if=" k != 'realname' ">
                                    <td>{{val}}</td>
                                    <td class="tab-right Buser-tab-title">{{ rlename[product[k]] || product[k] || product.mobile}}</td>
                                </tr>
                            </template>
                        </table>
                    </div>
                </div>
                <div class="btn-group">
                    <el-row>
                        <!-- 修改 -->
                        <el-button type="warning" @click="goxiugai()">{{$buttonObj.update}}</el-button>
                        <!-- 关闭 -->
                        <el-button @click="dlexiugai()" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { delDetail,updateDetail,getNowFormatDate } from "./../../../api/methods.js";
import { getGeneralDetail } from "./../../../api/https.js";
import { personListInit } from "@/init/user.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.$parent.userObj.tit01},
                {router: this.$parent.$parent.userObj.tit10}
            ],
            end:"",
            product:'',
            personList: {},
            rlename: {},
            centerDialogVisible:false,
            windowHeight:''
        }
    },
    created(){
        personListInit(this);
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        },
         // 进入修改页面
        goxiugai(){
            var arr = updateDetail('/management/userList/NUser/NUserChange/')
            this.replaceroute(arr[0],arr[1]);
        },
        // 关闭
        dlexiugai(){
            var arr = delDetail("/management/userList/NUser/NUserList", 'NUserlist')
            this.$emit(arr[0],arr[1]);
        },
         // 获取数据
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj = {
                success : res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        this.product = res.data.person
                        sessionStorage.setItem(id,JSON.stringify(this.product))
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                psuserid : id
            }
            getGeneralDetail(obj)
        },
        loadsx(){
            this.end = this.$route.params.id;
            this.product = ''
            this.getData();
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    watch:{
        "$route": "loadsx"
    }
}
</script>

<style scoped>
    .BuserDetailContent{
        padding: 50px;
        padding-bottom: 0px;
        background:#fff;
    }
    .NuserIcan{
        width: 100%;
        overflow: hidden;
        min-height: 480px;
    }
    .NuserIcan .el-progress{
        margin: 0px auto;
        margin-top: 20px;
    }
    .BuserDetailTable{
        float: left;
        width: 64%;
        padding-left: 2%;
        margin-top: 40px;
    }
    .BuserDetailTable table{
        width: 97%;
    }
    .BuserDetailTable table th{
        padding: 20px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
    }
    .BuserDetailTable table td{
        color: #666;
        font-size: 14px;
        padding: 13px 20px;
        vertical-align: top;
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 14px;
    }
    .BuserDetailTable table .tab-right{
        color: #666;
        border-right: 1px solid #F1F4F6;
    }
    .BuserDetailTable table .tab-right .el-scrollbar__wrap{
        padding-right: 30px;
        line-height: 28px;
        text-indent: 2rem;
        vertical-align: top;
    }
    .Buser-tab-title{
        width: 70%;
        color: #333 !important;
    }
    .BuserDetailTitle{
        font-size: 20px;
        font-weight: 900;
        line-height: 20px;
    }
</style>
