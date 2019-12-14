<template>
    <div id="add-people">
            <div class="Nuser-content">
                <!-- 用户信息填写 -->
                <div class="title">{{$parent.userObj.tit03}}</div>
                <div class="input">
                    <el-row :gutter="20">
                        <el-col :span="6" class="info-unit" v-for="(item,index) in userInfo" :key="index">
                            <template v-if ="index != 'password'">
                                <div class="grid-content bg-purple">{{item.name}}</div>
                                <div class="discrible must">
                                    <template v-if="item.select">
                                        <el-select
                                            v-model="item.val"
                                            style="width:100%"
                                            @change="select_status"
                                            >
                                            <el-option
                                                v-for="(val,k) in item.select"
                                                :key="k+''"
                                                :label="val+''"
                                                :value="k+''"
                                            ></el-option>
                                            </el-select>
                                    </template>
                                    <template v-else>
                                        <input class="enter-input" v-model="item.val" type="text" @blur='doCheck(index)'>
                                    </template>
                                </div>
                            </template>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="Nuser-xz-content">
                <!-- 更多信息 -->
                <div class="title">{{$parent.userObj.tit04}}</div>
                <div class="input">
                    <el-row :gutter="20">
                       <el-col :span="6" v-for="(item,index) in moreInfo"  class="info-unit"  :key="index">
                            <div class="grid-content bg-purple">{{item.name}}</div>
                            <div :class=" item.must ?  'discrible must' : 'discrible'">
                                <template v-if="item.select">
                                    <el-select
                                        v-model="item.val"
                                        style="width:100%"
                                        :placeholder="$buttonObj.select"
                                        >
                                        <el-option
                                            v-for="(val,k) in item.select"
                                            :key="k+''"
                                            :label="val+''"
                                            :value="k+''"
                                        ></el-option>
                                    </el-select>
                                </template>
                                <template v-else>
                                     <input class="enter-input" v-model="item.val" >
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="Nuser-content-btm" style=" overflow: hidden;">
                <div class="btn-group">
                    <el-row>
                        <!-- 保存 -->
                        <el-button type="warning" @click.native="addUser()">{{$buttonObj.save}}</el-button>
                        <!-- 取消 -->
                        <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click.native="giveFather(-1)">{{$buttonObj.close}}</el-button>
                    </el-row>
                </div>
            </div>
    </div>
</template>
<script>
import { addPersonInit } from '@/init/user.js'
import { checkNull } from '@/api/methods'
import { getCompanyOrgList,addGeneralUser,chekPersonRealname,chekPersonMobile } from '@/api/https.js'
export default {
    name:'add-people',
    data() {
        return {
            nameData: '',//原来的用户名
            phoneData: '',//原来的手机号
            isName: false,
            isPhone: false,
            isEmail: false,
            userInfo: {},
            moreInfo: {},
            orgList: {}
        }
    },
    created(){
        addPersonInit(this);
        this.getData();
        this.givVal();
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    methods: {
        // 赋值
        givVal(){
            var psuserobj = this.$parent.psuserobj;
            for (const key in this.userInfo) {
                if( psuserobj[key] ) this.userInfo[key].val = psuserobj[key];
            };
            for (const key in this.moreInfo) {
                if( psuserobj[key] ) this.moreInfo[key].val = psuserobj[key];
            };
            this.nameData = this.userInfo.realname.val;
            this.phoneData = this.userInfo.mobile.val;
        },
        //向父组件传值
        giveFather(num){
            this.$emit('giveFather',num)
        },
        // 获取部门
        getData(){
            var obj = {
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var array = res.data.data;
                        this.orgList = {};
                        for (let index = 0; index < array.length; index++) {
                            if(array[index].orgid == sessionStorage.orgid) continue;
                            this.orgList[array[index].orgid] = localStorage.lgtype == 'chinese' ? array[index].orgcname : array[index].orgename;
                        }
                        this.moreInfo.sectorid.select = this.orgList;
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getCompanyOrgList(obj)
        },
         // 输入检查
         doCheck(val){
            if (val == 'realname') {
                this.chekPersonRealname();
            } else {
                this.chekPersonMobile();
            }
        },
        // 名字检查
        chekPersonRealname(){
            if(this.userInfo.realname.val == '' || this.userInfo.realname.val == this.nameData) return  this.isName = false;
            var obj = {
                realname: this.userInfo.realname.val,
                success: response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        if (response.data.flag) {
                            this.isName = true;
                            this.$message.error("该用户名已经存在");
                        } else {
                            this.isName = false;
                        }
                    } else {
                        // '网络繁忙'
                        this.$message.error(this.$buttonObj.busy);
                    }
                }
            }
            chekPersonRealname(obj);
        },
        // 手机检查
        chekPersonMobile(){
            if(this.userInfo.mobile.val == ''  || this.userInfo.mobile.val == this.phoneData) return  this.isPhone = false;
            var myreg = /^1[3-9]\d{9}$/;
            if(!myreg.test(this.userInfo.mobile.val)){
                return this.$message.error('请输入正确的11位手机号');
            }
            var obj = {
                mobile: this.userInfo.mobile.val,
                success: response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        if (response.data.flag) {
                            this.isPhone = true;
                            this.$message.error("该手机号码已经存在");
                        } else {
                            this.isPhone = false;
                        }
                    } else {
                        // '网络繁忙'
                        this.$message.error(this.$buttonObj.busy);
                    }
                }
            }
            chekPersonMobile(obj);
        },
         // 邮箱验证
         checkEmail(){
            var myreg = /^([a-zA-Z0-9]+[-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(this.moreInfo.email.val)){
                this.$message.error('请输入正确的邮箱号！');
                this.isEmail = true;
            }else{
                this.isEmail = false;
            }
        },    
        // 修改用户信息
        addUser(){
            if(this.isName) return this.$message.error("该用户名已经存在");
            if(this.isPhone) return this.$message.error("该手机号码已经存在");
            var myreg = /^1[3-9]\d{9}$/;
            if(!myreg.test(this.userInfo.mobile.val)){
                return this.$message.error('请输入正确的11位手机号');
            }
            if(checkNull(this.userInfo, this.moreInfo)){
                if (this.isEmail) return this.$message.error('请输入正确的邮箱号！');
                var obj = {
                    psuserid: this.$parent.psuserid,
                    self : this ,
                    success : res => {  //res是server端响应
                        if (res.data.message.indexOf("editSuccess") > -1) {
                            this.$message.success(res.data.desc);
                            this.giveFather(2)
                        } else {
                            this.$message.error(this.$promptObj.savefail);
                        }
                    }
                }
                addGeneralUser(obj,true)
            }
        }
    },
}
</script>
<style scoped>
    #add-people{
        background: #fff;
        width: 80%;
        margin: 8% 0 0 8%;
        padding: 20px 2%;
        border-radius: 10px;
    }
</style>