<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="NuserDetailContent" ref="scerllbarH">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="NuserIcan">
                    <div class="NuserDetailTitle">{{product.realname}}</div>
                    <div class="NuserDetailTable">
                        <table spellcheck="0" style="border-collapse:collapse;"> 
                            <tr>
                                <!-- 用户信息 -->
                                <th colspan="4">{{$parent.$parent.userObj.tit12}}</th>
                            </tr>
                            <tr>
                                <td>{{companyList.address}}</td><td colspan="3" class="Nuser-tab-title tab-right">{{product.address}}</td>
                            </tr>
                            <tr>
                                <td>{{companyList.mobile}}</td><td class="Nuser-tab-title">{{product.mobile}}</td>
                                <td>{{companyList.cpuserid}}</td><td class="tab-right Nuser-tab-title">{{product.cpuserid}}</td>
                            </tr>
                            <tr>
                                <td>{{companyList.bistype}}</td><td class="Nuser-tab-title">{{bistype[product.bistype] || $parent.$parent.userObj.tit13}}</td>
                                <td>{{companyList.lictype}}</td><td class="tab-right Nuser-tab-title">{{lictype[product.lictype] || $parent.$parent.userObj.tit13}}</td>
                            </tr>
                            <tr>
                                <td>{{companyList.liscnum}}</td><td class="Nuser-tab-title">{{product.liscnum || $parent.$parent.userObj.tit13}}</td>
                                <td>{{companyList.worktype}}</td><td class="tab-right Nuser-tab-title">{{product.worktype || $parent.$parent.userObj.tit13}}</td>
                            </tr>
                            <tr>
                                <td>{{companyList.phone}}</td><td class="tab-right Nuser-tab-title">{{product.phone || $parent.$parent.userObj.tit13}}</td>
                                <td>{{companyList.email}}</td><td class="Nuser-tab-title">{{product.email || $parent.$parent.userObj.tit13}}</td> 
                            </tr>
                            <tr>
                                <td>{{companyList.clouddisk}}</td><td class="Nuser-tab-title tab-right">{{product.clouddisk}}</td>
                                <td>{{companyList.cdlimit}}</td><td class="tab-right Nuser-tab-title">{{product.cdlimit ? product.cdlimit + 'M': ''}}</td>
                            </tr>
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
import { getBackstageDetail } from "./../../../api/https.js";
import { companyListInit } from "@/init/user.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.$parent.userObj.tit08},
                {router: this.$parent.$parent.userObj.tit06}
            ],
            end:"用户详情",
            product:'',
            centerDialogVisible:false,
            windowHeight:'',
            companyList: {},
            bistype: {},//企业类型
            lictype: {}//证件类型
        }
    },
    created(){
        companyListInit(this);
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
            var arr = updateDetail('/management/userList/BUser/BUserChange/')
            this.replaceroute(arr[0],arr[1]);
        },
        // 关闭
        dlexiugai(){
            var arr = delDetail("/management/userList/BUser/BUserList", 'BUserlist')
            this.$emit(arr[0],arr[1]);
        },
        // 获取数据
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj = {
                success : res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        this.product = res.data.company.fieldvalues
                        sessionStorage.setItem(id,JSON.stringify(this.product))
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                psuserid : id
            }
            getBackstageDetail(obj)
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
    .NuserDetailContent{
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
    .NuserDetailTable{
        float: left;
        width: 100%;
        padding-left: 2%;
        margin-top: 40px;
    }
    .NuserDetailTable table{
        width: 97%;
    }
    .NuserDetailTable table th{
        padding: 20px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
    }
    .NuserDetailTable table td{
        color: #666;
        font-size: 14px;
        padding: 13px 20px;
        vertical-align: top;
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 14px;
    }
    .NuserDetailTable table .tab-right{
        color: #666;
        border-right: 1px solid #F1F4F6;
    }
    .NuserDetailTable table .tab-right .el-scrollbar__wrap{
        padding-right: 30px;
        line-height: 28px;
        text-indent: 2rem;
        vertical-align: top;
    }
    .Nuser-tab-title{
        width: 32%;
        color: #333 !important;
    }
    .NuserDetailTitle{
        font-size: 20px;
        font-weight: 900;
        line-height: 20px;
    }
    /* 弹出框样式 */
    .NuserBaoxiu{
        overflow: hidden;
        font-size: 14px;
        margin-bottom: 40px;
    }
    .NuserBaoxiu img{
        width: 26.5%;
        float: left;
    }
    .NuserBaoxiuDetail{
        overflow: hidden;
        float: left;
        width: 62%;
        margin-left: 10%;
        line-height: 45px;
    }
    .NuserBaoxiuDetail>div{
        float: left;
        width: 40%;
    }
    .NuserBaoxiuDetail .NuserBaoxiuDetailLeft{
        border-right: 1px solid #F1F4F6;
        margin-right: 6%;
    }
    .NuserBaoxiuBtm{
        width: 100%;
        margin-bottom: 150px;
    }
    .NuserBaoxiuBtm>div{
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 14px;
        color: #333;
    }
    .NuserBaoxiuBtm .NuserCut{
        width: 100%;
        height: 1px;
        background-color: #F1F4F6;
    }
</style>
