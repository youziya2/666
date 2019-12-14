<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="background-color: #fff;" :style="{height:windowHeight}">
            <div class="Buser-content">
                <!-- 用户信息填写 -->
                <div class="title">{{$parent.$parent.userObj.tit03}}</div>
                <div class="input">
                    <el-row :gutter="20">
                        <template v-for="(item,index) in userInfo">
                            <el-col :span="6" class="info-unit" :key="index" v-if=" index != 'password'">
                                <div class="grid-content bg-purple">{{item.name}}</div>
                                <div class="discrible must">
                                    <template v-if="item.select">
                                        <el-select
                                            :disabled = 'item.disable'
                                            v-model="item.val"
                                            style="width:100%"
                                            >
                                            <el-option
                                                v-for="(val,k) in item.select"
                                                :key="k"
                                                :label="val"
                                                :value="k"
                                            ></el-option>
                                            </el-select>
                                    </template>
                                    <template v-else>
                                        <input class="enter-input" v-model="item.val" :disabled = 'item.disable'>
                                    </template>
                                    <span class="units"></span>
                                </div>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </div>
            <div class="Nuser-xz-content">
                <!-- 更多信息 -->
                <div class="title">{{$parent.$parent.userObj.tit04}}</div>
                <div class="input">
                    <el-row :gutter="20">
                        <template v-for="(item,index) in moreInfo">
                            <el-col :span="6"  class="info-unit"  :key="index" v-if=" index != 'password'">
                                <div class="grid-content bg-purple">{{item.name}}</div>
                                <div :class=" item.must ?  'discrible must' : 'discrible'">
                                    <template v-if="item.select">
                                        <el-select
                                            v-model="item.val"
                                            style="width:100%"
                                            >
                                            <el-option
                                                v-for="(val,k) in item.select"
                                                :key="k"
                                                :label="val"
                                                :value="k"
                                            ></el-option>
                                            </el-select>
                                    </template>
                                    <template v-else>
                                        <input class="enter-input" v-model="item.val">
                                    </template>
                                    <span class="units"></span>
                                </div>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </div>
            <div class="Nuser-xz-content">
                <!-- 增值空间配置 -->
                <div class="title">{{$parent.$parent.userObj.tit05}}</div>
                <template v-for="(item,index) in fatherArr">
                    <div :key="index" v-if="item.isShow"> 
                        <sliderm :fatherObj='item' @fromTime='getTime' @fromSpace='getSpace'></sliderm>
                            <!-- <div style="display:inline-block;display: inline-block;vertical-align: middle;margin-top: 20px;font-size:14px">
                                <span class="add-space" v-if="spaceLength == index" @click="addSpace(index)">添加</span>
                                <span class="plus-space" @click="plusSpace(index)" :style="spaceLength != index ? 'margin-left: 120px;' : ''">删除</span>
                            </div>    -->
                    </div>
                </template>
            </div>
            <div class="Buser-content-btm">
                <div class="cut"></div>
                <div class="btn-group">
                    <el-row>
                        <!-- 保存 -->
                        <el-button type="warning" @click.native="editUser">{{$buttonObj.save}}</el-button>
                        <!-- 取消 -->
                        <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click="cancel()">{{$buttonObj.cancel}}</el-button>
                    </el-row>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
import { getNowFormatDate,updateDetail,checkNull } from "./../../../api/methods.js";
import { addBackstageUser } from "./../../../api/https.js";
import { companyEnterInit } from '@/init/user'
import sliderm from "./../../../components/slider"
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router: this.$parent.$parent.userObj.tit08},
                {router: this.$parent.$parent.userObj.tit06}
            ],
            end: this.$parent.$parent.userObj.tit11,
            userInfo:{},
            moreInfo:{},
            cdlimit:'',
            clouddisk:'',
            windowHeight:'',
            fatherArr:[
                {id:'01',isShow:true,spaceNum:'',timeNum:''},
                // {id:'02',isShow:true,spaceNum:'',timeNum:''},
                // {id:'03',isShow:false,spaceNum:'',timeNum:''},
                // {id:'04',isShow:false,spaceNum:'',timeNum:''},
                // {id:'05',isShow:false,spaceNum:'',timeNum:''},
                // {id:'06',isShow:false,spaceNum:'',timeNum:''},
                // {id:'07',isShow:false,spaceNum:'',timeNum:''},
                // {id:'08',isShow:false,spaceNum:'',timeNum:''},
                // {id:'09',isShow:false,spaceNum:'',timeNum:''},
                // {id:'10',isShow:false,spaceNum:'',timeNum:''}
            ]
        }
    },
    components:{
        sliderm
    },
    created(){
        companyEnterInit(this)
        delete this.userInfo.password
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
        // 获取子页面传过来的值
        getSpace(data){
            this.clouddisk = data
        },
        getTime(data){
            this.cdlimit = data
        },
         // 进入到详情页面
        cancel(){
            var arr = updateDetail('/management/userList/BUser/BUserDetail/')
            this.replaceroute(arr[0],arr[1]);
        },
        // 获取数据
        getData(){
            var id = this.$route.params.id
            this.cpuserid = id.substring(id.indexOf('@')+1)
            this.product = JSON.parse(sessionStorage.getItem(this.cpuserid))
            for (const key in this.userInfo) {
                this.userInfo[key].val = this.product[key] || ""
            }
            for (const key in this.moreInfo) {
                this.moreInfo[key].val = this.product[key] || ""
            }
            var clouddisk = this.product.clouddisk
            this.fatherArr[0].spaceNum = this.product.clouddisk
            this.cdlimit = this.product.cdlimit
            this.fatherArr[0].timeNum = this.product.cdlimit
        },
        // 发送修改数据
        editUser(){
            if(checkNull(this.userInfo, this.moreInfo)){
                var obj = {
                    self : this ,
                    success : res => {  //res是server端响应
                        if (res.data.message.indexOf("editSuccess") > -1) {
                            this.cancel()
                        } else {
                            this.$message.error(this.$promptObj.updatefail);
                        }
                    },
                    // password : password
                }
                addBackstageUser(obj,true)
            }
        },
        loadsx(){
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
    .Buser-content{
        /* min-width: 1000px; */
        background-color: #ffffff;
        padding: 50px;
        padding-bottom: 0px;
    }
    .Nuser-xz-content{
        /* min-width: 1000px; */
        background-color: #ffffff;
        padding: 50px;
        padding-bottom: 0px;
        padding-top: 0px;
    }
    .title{
        font-size:20px;
        font-weight: 600;
    }
    .input{
        line-height: 40px;
        padding: 20px 30px;
        width: 98%;
        overflow: hidden;
    }
    .el-textarea{
        width: 60%;
    }
    .Buser-content-btm{
        padding: 50px;
        padding-top: 0px;
        padding-bottom: 20px;
        background-color: #ffffff;
        overflow: hidden;
    }
    .upload{
        overflow: hidden;
        padding: 20px 30px;
    }
    .el-upload{
        margin-top: 30px;
        margin-right: 20px;
    }
    .enteringimgupload>div{
        display: inline-block;
        margin-bottom: 25px;
        margin-right: 20px;
    }
    .entering-uploadshuoming {
        width: 148px;
        text-align: center;
        margin-top: 10px;
        color: #666;
        font-size: 14px;
        line-height: 14px;
    }
    .el-upload {
        margin-top: 30px;
        margin-right: 20px;
    }
    .el-upload-list{
      display: none;
    }
    .BuserMore{
        margin-bottom: 25px;
    }
</style>
