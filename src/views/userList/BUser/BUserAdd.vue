<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="background-color: #fff;" :style="{height:windowHeight}">
            <div class="Nuser-content">
                <!-- 用户信息填写 -->
                <div class="title">{{$parent.$parent.userObj.tit03}}</div>
                <div class="input">
                    <el-row :gutter="20">
                        <el-col :span="6" class="info-unit" v-for="(item,index) in userInfo" :key="index">
                            <div class="grid-content bg-purple">{{item.name}}</div>
                            <div class="discrible must">
                                <template v-if="item.select">
                                    <el-select
                                        :placeholder="$buttonObj.select"
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
                                    <template v-if ="index == 'realname'">
                                        <input class="enter-input" v-model="item.val" @keyup = 'getCompanyCount'>
                                    </template>
                                    <template v-else>
                                        <input class="enter-input" v-model="item.val" :type=" index == 'password' ? 'password' : 'text' ">
                                    </template>
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="Nuser-xz-content">
                <!-- 更多信息 -->
                <div class="title">{{$parent.$parent.userObj.tit04}}</div>
                <div class="input">
                    <el-row :gutter="20">
                       <el-col :span="6" v-for="(item,index) in moreInfo"  class="info-unit"  :key="index">
                            <div class="grid-content bg-purple">{{item.name}}</div>
                            <div :class=" item.must ?  'discrible must' : 'discrible'">
                                <template v-if="item.select">
                                    <el-select
                                        v-model="item.val"
                                        :placeholder="$buttonObj.select"
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
                                     <input class="enter-input" v-model="item.val" :type=" index == 'password' ? 'password' : 'text' ">
                                </template>
                                <span class="units"></span>
                            </div>
                        </el-col>
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
            <div class="Nuser-content-btm">
                <div class="btn-group">
                    <el-row>
                        <!-- 保存 -->
                        <el-button type="warning" @click.native="addUser">{{$buttonObj.save}}</el-button>
                        <!-- 取消 -->
                        <el-button :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.cancel}}</el-button>
                    </el-row>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
import { addBackstageUser,getCompanyCount } from './../../../api/https'
import { checkNull } from '@/api/methods'
import { companyEnterInit } from '@/init/user'
import sliderm from "./../../../components/slider"
export default {
    data(){
        return{
            list:[
                {router: this.$parent.$parent.userObj.tit08}
            ],
            end: this.$parent.$parent.userObj.tit02,
            realname:'', 
            userInfo:{},
            moreInfo:{},
            clouddisk:'',//云盘空间大小
            cdlimit:'',//云盘有效期
            windowHeight:'',
            fatherArr:[
                {id:'01',isShow:true,spaceNum:0,timeNum:0},
                // {id:'02',isShow:true},
                // {id:'03',isShow:false},
                // {id:'04',isShow:false},
                // {id:'05',isShow:false},
                // {id:'06',isShow:false},
                // {id:'07',isShow:false},
                // {id:'08',isShow:false},
                // {id:'09',isShow:false},
                // {id:'10',isShow:false}
            ]
        }
    },
    created(){
        companyEnterInit(this);
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    components:{
        sliderm
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
        // 检验名称
        getCompanyCount(){
            if(this.userInfo.realname.val == '') return false;
            var obj = {
                realname: this.userInfo.realname.val,
                success: response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        if (response.data.flag) {
                        this.isHave = true;
                        this.$message.error( this.$parent.$parent.userObj.tit33 );
                        } else {
                        this.isHave = false;
                        }
                    } else {
                        // '网络繁忙'
                        this.$message.error(this.$buttonObj.busy);
                    }
                }
            }
            getCompanyCount(obj)
        },
        addUser(){
            if(this.isHave) return this.$message.error( this.$parent.$parent.userObj.tit33 );
            if(checkNull(this.userInfo, this.moreInfo)){
                var password = hex_md5(this.userInfo.password.val);
                var obj = {
                    self : this ,
                    success : res => {  //res是server端响应
                        if (res.data.message.indexOf("addSuccess") > -1) {
                            this.$router.push('/management/userList/BUser/BUserList')
                        } else {
                            this.$message.error(this.$promptObj.savefail);
                        }
                    },
                    password : password
                }
                addBackstageUser(obj)
            }
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    }
}
</script>

<style scoped>
    .Nuser-content{
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
        padding: 20px 30px;
        width: 98%;
        overflow: hidden;
    }
</style>

