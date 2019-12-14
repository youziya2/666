//会议室详情
<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar class="room-detail" style="width:100%;background:#fff;" :style="{height:windowHeight}">
            <div class="NuserIcan">
                <div class="BuserDetailTitle">会议室详情</div>
                <div class="BuserDetailTable">
                    <table spellcheck="0" style="border-collapse:collapse;">
                        <tr>
                            <!-- 基本信息 -->
                            <th colspan="4">基本信息</th>
                        </tr>
                        <template v-for="(val,k) in detialList">
                            <tr :key="k">
                                <td>{{val}}</td>
                                <td class="tab-right Buser-tab-title">{{ allContent[k] }}</td>
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
                    <el-button @click="quxiao()" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
                </el-row>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>

import { getMtroomDetail,getMeetingAttach } from "./../../api/https.js";
import { meetingDetailInit } from "@/init/meeting.js";
import { delDetail,updateDetail } from "./../../api/methods.js";
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: '会议室管理'},
                {router: '会议室详情'}
            ],
            end:"",
            allContent:{},
            detialList: {
                mtrnum: '编号',
                mtrname: '名称',
                remark: '备注'
            },
            windowHeight:''
        }
    },
    created(){
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        loadsx(){
            this.end = this.$route.params.id;
            this.getData();
        },
        // 关闭详情页面
        quxiao(path){
            var arr = delDetail('/management/meetingRoom/roomList', 'meetingRoom')
            this.$emit(arr[0],arr[1]);
        },
        // 进入修改页面
        goxiugai(path){
            var arr = updateDetail('/management/meetingRoom/changeRoom/')
            this.replaceroute(arr[0],arr[1]);
        },
        // 数据请求
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj = {
                success: response => {
                    if (response.data.code == 200) {
                        this.allContent = response.data.data;
                        sessionStorage.setItem(id,JSON.stringify(this.allContent))
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                mtrid: id
            }
            getMtroomDetail(obj)
        },
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>

<style scoped>
    .room-detail{
        box-sizing: border-box;
        width: 100%;
        padding: 50px 0px 0px 50px;
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
    .btn-group{
        margin-right: 80px;
    }
</style>
