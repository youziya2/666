<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="background-color: #fff;" :style="{height:windowHeight}">
                <!-- 版本信息 -->
                <div class="version-input">
                     <div class='version-input-active' :class="{'version-input-half':item.units}" v-for="(item,index) in versionObj" :key="index" 
                        style="margin-bottom:50px;" :style=" index=='content' ? 'width:100%' : 'height: 42px;' ">
                                <span class="version-input-title" :class="{'version-input-must':item.must}">{{item.name}}</span>
                                <template v-if="item.select"> 
                                    <el-select v-model="item.val" style="width: 60%" :disabled="isShow" :placeholder="$buttonObj.select">
                                        <el-option
                                        v-for="(val,it) in item.select"
                                        :key="it"
                                        :label="val"
                                        :value="it">
                                        </el-option>
                                    </el-select>
                                </template>
                                <template v-else-if="index=='savetime'">   
                                    <el-date-picker
                                        :disabled="isShow"
                                        style="width:35%"
                                        v-model="item.val"
                                        type="datetime"
                                        :placeholder="item.name"
                                    ></el-date-picker>
                                </template>
                                <template v-else-if="index=='content'">   
                                    <el-input style="vertical-align: top" resize="none" :disabled="isShow" class="textarea" type="textarea" :autosize="{minRows:8}" v-model="item.val"></el-input>
                                </template>
                                <template v-else>
                                    <template v-if ="index == 'appcname'">
                                      <el-input :disabled="isShow" v-model="item.val" @keyup.native = 'getAppsCount'></el-input>
                                    </template>
                                    <template v-else>
                                      <el-input :disabled="isShow" v-model="item.val" ></el-input>
                                    </template>
                                </template> 
                            </div>
                </div>
              <template v-if='isShow'>
                <div class="version-pack">
                  <!-- 应用安装包 -->
                  <div class="version-pack-title">{{$parent.$parent.systemObj.tit09}}</div>
                  <div>
                    <form enctype="multipart/form-data" class="uploadForm" style="position: relative;padding-left: 120px;">
                      <div class="file-imgs">
                        <input
                          type="file"
                          id="img01"
                          name="img01"
                          accept=".zip"
                          multiple="multiple"
                          @change="uploadMoreattach('img01',pkid)"
                        >
                        <div class="show-imgs">
                          <img v-if="imgList.img01.imgpath" :src="imgList.img01.imgpath" @mouseenter = "isClear=1">
                          <!-- 删除 -->
                          <div :class=" isClear == 1 ? 'fil-btn-hover' : ''" @mouseleave = "isClear=-1">
                            <span
                                class="del-file-imgs"
                                v-if=" imgList.img01.imgpath  && imgList.img01.imgpath != '../../../static/img/timg.gif'"
                                @click="deletshow('img01','fil')"
                            ><i class="el-icon-delete fil-clear-icon"></i></span>
                        </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- 删除警告框 -->
                <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
                  <span>{{$promptObj.delwarn}}</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                    <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
                  </span>
                </el-dialog>
              </template>
              <div class="btn-group">
                <el-row>
                  <!-- 下一步 -->
                  <template v-if="!isShow">
                    <el-button type="warning" @click.native="addVersions">{{this.$buttonObj.next}}</el-button>
                    <el-button :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.cancel}}</el-button>
                  </template>
                  <!-- 完成 -->
                  <template v-else>
                    <el-button
                      :style="{backgroundColor:colorselects,color:'#fff'}"
                      @click.native="carryOut"
                    >{{$buttonObj.complete}}</el-button>
                  </template>
                </el-row>
              </div>
        </el-scrollbar>
    </div>
</template>
<script>
import { addVersions,delPictrue,uploadMoreattach } from './../../../api/https'
import { checkNull,getNowFormatDate } from '@/api/methods'
import { systemAdd } from '@/init/system'
export default {
    data(){
        return{
            isClear: -1,
            isShow: false,
            list:[
                {router: this.$parent.$parent.systemObj.tit04}
            ],
            end: this.$parent.$parent.systemObj.tit02,
            versionObj: {},
            imgList:{
                img01: { imgid: "", imgpath: "" },
            },
            pkid: '',
            imgNum: '',
            centerDialogVisible: false,
            realname:'', 
            userInfo:{},
            moreInfo:{},
            windowHeight:'',
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        systemAdd(this);
        this.versionObj.savetime.val  = getNowFormatDate(new Date())
        this.getHeight();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(190);
        },
       // 删除附件的提示
       deletshow(item, str) {
            this.centerDialogVisible = true;
            this.imgNum = item;
        },
        // 移除附件
        delPictrue() {
            delPictrue(this, 'fil', 'system');
        },
        // 附件上传
        uploadMoreattach(str,pkid) {
            var obj = {
                isAttach : 'attach',
                types : "attach",
                tbname : "versions",
                imgIndex : this.imgList[str],
                dom : document.getElementById(str),
                pkid : pkid
            }
            uploadMoreattach(obj,true)
        },
        // 检验名称
        // getCompanyCount(){
        //     if(this.userInfo.realname.val == '') return false;
        //     var obj = {
        //         realname: this.userInfo.realname.val,
        //         success: response => {
        //             if (response.data.message.indexOf("getSuccess") > -1) {
        //                 if (response.data.flag) {
        //                     this.isHave = true;
        //                     this.$message.error('该企业名称已存在');
        //                 } else {
        //                     this.isHave = false;
        //                 }
        //             } else {
        //                 // 网络繁忙'
        //                 this.$message.error(this.$buttonObj.busy);
        //             }
        //         }
        //     }
        //     getCompanyCount(obj)
        // },
         // 点击下一步
        addVersions(){
            if(checkNull(this.versionObj)){
                this.versionObj.savetime.val = getNowFormatDate(this.versionObj.savetime.val);
                var obj = {
                    self : this,
                    success : res => {  //res是server端响应
                        if (res.data.message.indexOf("addSuccess") > -1) {
                            this.isShow = true;
                            this.pkid = res.data.vsid[0]
                        } else {
                            this.$message.error(this.$promptObj.savefail);
                        }
                    }
                }
                addVersions(obj)
            }
        },
        // 点击完成
        carryOut(){
            this.$router.push("/management/systemVersion/custom/VersionList")
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
        padding: 50px 200px 50px 50px;
        padding-bottom: 0px;
    }
    .version-input{
        overflow: hidden;
        margin: 50px 100px 0px 50px;
    }
    .version-input-active{
        float: left;
        width: 25%;
    }
    .version-input-half{
        float: left;
        width: 50%;
    }
    .version-input-title{
        display: inline-block;
        vertical-align: middle;
        width: 120px;
    }
    .version-input-must{
        background: url('../../../../static/img/must.png') no-repeat 100px center;
        background-size: 8px;
    }
    .el-input {
        width: 60% !important;
    }
    .el-input__inner{
        height: 44px !important;
    }
    .version-input-half .el-input {
        width: 80% !important;
    }
    .el-textarea {
        width: 80%;
    }
    .btn-group{
        margin-top: 20px;
        margin-right: 100px;
    }
    .version-pack{
        margin-left: 50px;
    }
    .version-pack-title{
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 20px;
    }
</style>

