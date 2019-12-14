<template>
    <div id="detail-people">
        <div class="NuserIcan">
            <div class="BuserDetailTitle">{{product.realname || '用户名'}}</div>
                <div class="BuserDetailTable">
                    <table spellcheck="0" style="border-collapse:collapse;">
                        <tr>
                            <!-- 基本信息 -->
                            <th colspan="4">{{$parent.userObj.tit03}}</th>
                        </tr>
                        <template v-for="(val,k) in personList">
                            <tr :key="k" v-if=" k != 'realname' ">
                                <td>{{val}}</td>
                                <td class="tab-right Buser-tab-title">{{ orgList[product[k]] || product[k]}}</td>
                            </tr>
                        </template>
                    </table>
                </div>
            
        </div>
        <div class="btn-group" style="overflow: hidden;">
            <el-row>
                <!-- 修改 -->
                <el-button type="warning" @click="giveFather(3,product)">{{$buttonObj.update}}</el-button>
                <!-- 关闭 -->
                <el-button @click="giveFather(-1)" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
            </el-row>
        </div>
    </div>
</template>
<script>
import { orgPersonListInit  } from '@/init/user.js'
import { getGeneralDetail,getCompanyOrgList  } from '@/api/https.js'
export default {
    name:'detail-people',
    data() {
        return {
            personList: {},
            orgList: {},
            product: []
        }
    },
    created(){
        orgPersonListInit(this);
        this.getData();
        this.getCompanyOrgList();
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    methods: {
        //传值到父组件
        giveFather(data,obj){
            this.$emit('giveFather',data, obj || '')
        },
        // 获取部门
        getCompanyOrgList(){
            var obj = {
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var array = res.data.data;
                        this.orgList = {};
                        for (let index = 0; index < array.length; index++) {
                            this.orgList[array[index].orgid] = localStorage.lgtype == 'chinese' ? array[index].orgcname : array[index].orgename;
                        }
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getCompanyOrgList(obj)
        },
         // 获取数据
        getData(){
            var obj = {
                success : res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        this.product = res.data.person;
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                psuserid : this.$parent.psuserid
            }
            getGeneralDetail(obj)
        },
    },
}
</script>
<style scoped>
    #detail-people{
        overflow: hidden;
        background: #fff;
        width: 70%;
        margin: 8% 0 0 15%;
        padding: 20px 2%;
        border-radius: 10px;
    }
    .NuserIcan{
        margin: 2%;
        overflow: hidden;
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