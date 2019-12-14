<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="NuserDetailContent" ref="scerllbarH">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="NuserIcan">
                    <div class="d-top">
                        <div class="top-left">
                          <div class="bigImg">
                            <img src="../../../../static/img/system.jpg">
                          </div>
                          <!-- <el-row :gutter="10" class='littleImg'>
                            <el-col :span="6" v-for="(item,index) in imgList" :key="index"><img :src=" item.aturl ? item.aturl : './../../../static/img/bigimg.png' "  :onerror="defaultImg"
                              :class="['appdetail-showimg-littleimg',imgactive == index?'active':'']"  @click="clickPic(index,item.aturl)">
                            </el-col>
                          </el-row> -->
                        </div>
                        <div class="top-right">         
                          <table class="dettab" cellspacing="0px">
                            <!-- 基本参数 -->
                            <tr>
                              <th colspan="2">{{$parent.$parent.systemObj.tit07}}</th>
                            </tr>
                            <tr v-for="(item,n) in versionObj" :key="n">
                              <template>
                                <td class="tabLeft">{{item}}</td>
                                <td class="tabRight">{{ustype[product[n]] || types[product[n]] || states[product[n]]  || product[n]}}</td>
                              </template>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <!-- <div class="cut"></div> -->
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
import { getVersionsById } from "./../../../api/https.js";
import { systemDetail } from "@/init/system"
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.$parent.systemObj.tit04},
                {router: this.$parent.$parent.systemObj.tit06}
            ],
            end: "",
            product:'',
            centerDialogVisible:false,
            windowHeight:'',
            versionObj: {},
            ustype:{},
            types:{},
            states:{}
        }
    },
    created(){
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        systemDetail(this);
        this.getHeight();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        },
        // 进入修改页面
        goxiugai(){
            var arr = updateDetail('/management/systemVersion/custom/VersionChange/')
            this.replaceroute(arr[0],arr[1]);
        },
        // 关闭
        dlexiugai(){
            var arr = delDetail("/management/systemVersion/custom/VersionList", 'versionlist')
            this.$emit(arr[0],arr[1]);
        },
        // 获取数据
        getData(){
            var id = this.end.substring(this.end.indexOf('@')+1)
            var obj = {
                success : res => {  //res是server端响应
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        this.product = res.data.versions.fieldvalues;
                        this.product.fil = res.data.attachList;
                        this.product.savetime = getNowFormatDate(new Date(this.product.savetime.time));
                        sessionStorage.setItem(id,JSON.stringify(this.product));
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                },
                visd : id
            }
            getVersionsById(obj)
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
    .d-top {
        width: 100%;
        margin-bottom: 50px;
        overflow: hidden;
    }
    .top-left {
        width: 45%;
        float: left;
    }
    .top-right {
        float: right;
        width: 55%;
    }
    .bigImg img {
        width: 90%;
        height: auto;
        border: 1px solid rgba(241, 244, 246, 1);
    }
    .dettab {
        width: 100%;
    }
    .dettab th {
        text-align: left;
        height: 60px;
        line-height: 60px;
        background-color: #f1f4f6;
        padding-left: 20px;
        color: #333;
    }
    .dettab td {
        border-left: 1px solid #f1f4f6;
        border-bottom: 1px solid #f1f4f6;
        padding: 12px 0px;
        padding-left: 20px;
        font-size: 14px;
        padding-right: 10px;
    }
    .tabLeft {
        width: 30%;
        color: #333;
    }
    .tabRight {
        width: 70%;
        border-right: 1px solid #f1f4f6;
        color: #666;
    }
    .btn-group{
        margin-top: 30px;
    }
</style>
