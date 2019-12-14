<template>
    <div class="theme-content">
        <el-scrollbar :style="{height:windowHeight}">
            <!-- 主题信息 -->
            <div class="theme-title">{{$parent.$parent.desktop.tit26}}</div>
            <div class="theme-input">
                <div>
                    <div :class=" index=='remark' ? 'demo-textatea-suffix' : 'demo-input-suffix' " v-for="(item,index) in desktopObj" :key="index">
                        <span class="dis-title" :class="{ 'demo-textatea-title' : index=='remark'}">{{item.name}}</span>
                        <template v-if="item.select"> 
                            <el-select v-model="item.val" :disabled="isShow" :placeholder="$buttonObj.select">
                                <el-option
                                v-for="(n,val) in item.select"
                                :key="val"
                                :label="n"
                                :value="val">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-else-if="index=='savetime'">   
                            <el-date-picker
                                :disabled="isShow"
                                style="margin-left: 15px;width:35%"
                                v-model="item.val"
                                type="date"
                                :placeholder="$parent.$parent.desktop.tit22"
                            ></el-date-picker>
                        </template>
                        <template v-else-if="index=='remark'">   
                            <el-input :disabled="isShow" resize="none" style="width: 67.5%;" type="textarea" :autosize="{minRows:6}" v-model="item.val"></el-input>
                        </template>
                        <template v-else>
                            <template v-if ="index == 'dpcname'">
                                <el-input :disabled="isShow" v-model="item.val" @keyup.native = 'getDesktopCount'></el-input>
                            </template>
                            <template v-else>
                                <el-input :disabled="isShow" v-model="item.val" ></el-input>
                            </template> 
                        </template> 
                    </div>
                </div>
            </div>
            <div v-if="isShow">
                <!-- 主题文件 -->
                <div class="theme-title">{{$parent.$parent.desktop.tit27}}</div>
                <div class="theme-input" style="display: inline-block;">
                    <div>
                        <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
                            <div class="file-imgs">
                                <input type="file" id="img01" name="img01" accept=".zip" multiple="multiple" :title="$buttonObj.clickFile"
                                @change="uploadMoreattach('img01',pkid)">
                                <div class="show-imgs">
                                <img v-if=" imgList.img01.imgpath " :src="imgList.img01.imgpath">
                                <!-- 删除 -->
                                <span
                                    class="del-file-imgs"
                                    v-if=" imgList.img01.imgpath  && imgList.img01.imgpath != '../../../static/img/timg.gif'"
                                    @click="deletshow('img01','fil')"
                                >{{$buttonObj.remove}}</span>
                                </div>
                            </div>
                        </form>
                        <!-- 文件 -->
                        <div class="theme-uploadshuoming">{{$parent.$parent.desktop.tit24}}</div>
                    </div>
                </div>
                <div class="theme-input" style="display: inline-block;">
                    <div>
                        <form enctype="multipart/form-data" class="uploadForm" style="position: relative;">
                            <div class="file-imgs">
                                <input type="file" id="img02" name="img02" accept="image/jpeg, image/png, image/gif, image/jpg" multiple="multiple"  :title="$buttonObj.clickImg"
                                @change="uploadMoreattach('img02',pkid)">
                                <div class="show-imgs">
                                <img v-if=" imgList.img02.imgpath " :src="imgList.img02.imgpath">
                                <!-- 删除 -->
                                <span
                                    class="del-file-imgs"
                                    v-if=" imgList.img02.imgpath  && imgList.img02.imgpath != '../../../static/img/timg.gif'"
                                    @click="deletshow('img02')"
                                >{{$buttonObj.remove}}</span>
                                </div>
                            </div>
                        </form>
                        <!-- 图片 -->
                        <div class="theme-uploadshuoming">{{$parent.$parent.desktop.tit25}}</div>
                    </div>
                </div>
            </div>
            <!-- 删除提示框 -->
            <el-dialog :title="$promptObj.warn" :visible.sync="centerDialogVisible" width="330px" center>
                <span>{{$promptObj.delwarn}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                    <el-button type="primary" @click="delPictrue">{{$buttonObj.sure}}</el-button>
                </span>
            </el-dialog>
            <div class="btn-group">
                <el-row>
                    <!-- 下一步 -->
                    <template v-if="!isShow">
                        <el-button type="warning" @click.native="addDesktop">{{$buttonObj.next}}</el-button>
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
            <div style="height:40px;width:100%;clear: both;"></div>
        </el-scrollbar>
    </div>
</template>

<script>
import { delPictrue,addDesktop,updateApp,uploadMoreattach,getDesktopCount } from "./../../../api/https.js"
import {  getNowFormatDate,checkNull } from "./../../../api/methods.js";
import {  enterTheme } from "@/init/desktop.js";
export default {
    data(){
        return{
            types: "motifs",
            idHave: false,
            isShow: false,
            desktopObj: {},
            windowHeight:'',
            centerDialogVisible: false, //删除图片的警示框
            imgNum: "",
            filType: "pic",
            pkid:'',
            imgList: {
                //图片列表
                img01: { imgid: "", imgpath: "" },
                img02: { imgid: "", imgpath: "" },
            }
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        enterTheme(this)
        this.desktopObj.savetime.val = getNowFormatDate(new Date(), true);
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    methods: {
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        },
        // 点击完成
        carryOut() {
            this.$router.push({ path: "/management/desktopList/themeList/themeList" });
        },
        // 删除图片的提示
        deletshow(item, str) {
            if (str == "fil") this.filType = "fil";
            else this.filType = "pic";
            this.centerDialogVisible = true;
            this.imgNum = item;
        },
        // 移除附件/图片
        delPictrue() {
            delPictrue(this, this.filType);
        },
        // 附件/图片上传
        uploadMoreattach(str,pkid) {
            var obj = {
                isAttach : str == 'img01' ? 'attach' : "pictrue",
                types : str == 'img01' ? 'desktop' : "mainImg",
                tbname : "desktop",
                imgIndex : this.imgList[str],
                dom : document.getElementById(str),
                pkid : pkid
            }
            uploadMoreattach(obj)
        },
        // 检验名称
        getDesktopCount(){
            var obj = {
                self: this,
                success: response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        if (response.data.flag) {
                        this.isHave = true;
                        this.$message.error( this.$parent.$parent.desktop.tit32 );
                        } else {
                        this.isHave = false;
                        }
                    } else {
                        // '网络繁忙'
                        this.$message.error(this.$buttonObj.busy);
                    }
                }
            }
            getDesktopCount(obj)
        },
        // 点击发送请求
        addDesktop(){
            if(this.isHave) return this.$message.error( this.$parent.$parent.desktop.tit32 );
            if ( checkNull(this.desktopObj)) {
                this.desktopObj.savetime.val = getNowFormatDate(this.desktopObj.savetime.val, true);
                var obj = {
                    self : this,
                    success : response => {
                        if (response.data.message.indexOf("addSuccess") > -1) {
                            this.pkid = response.data.dpid[0];
                            this.isShow = true;
                        } else {
                            this.$message.error(this.$promptObj.savefail);
                        }
                    }
                }
                addDesktop(obj)
            }  
        }
    }
}
</script>
