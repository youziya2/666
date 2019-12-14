<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="structure-content">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="file-checkin">
                    <form enctype="multipart/form-data" class="uploadForm file-checkin-chl">
                        <div class="file-imgs">
                            <input  type="file" ref="img01" accept=".zip" id="img01" :title="$buttonObj.clickFile" name="img01" multiple="multiple" @change="uploadMoreattach('img01')">
                            <div class="show-imgs">
                                <img v-if=" imgList.img01.imgpath " :src="imgList.img01.imgpath">
                            </div>
                        </div> 
                    </form>
                    <div class="file-checkin-chl">
                        <div class="text-prompt" v-for="(item,k) in textPrompt" :key="k">{{item}}</div>
                    </div>
                </div>
                <template v-if="infoList.length > 0">
                    <div class="img-list" v-for='(item,index) in infoList' :key="index">
                        <img class="img" :src="baseUrl + item.path + randonNum" :alt="item.filename" :title="item.filename" :onerror="defaultImg"/>
                        <div>{{item.filename}}</div>
                    </div>
                </template>
                <template v-else>
                    <p style="text-align: center;line-height: 400px;font-size: 16px;">{{$buttonObj.noData}}</p>
                </template>   
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { uploadSignImgs,getSignImgList } from "./../../api/https.js";
export default {
    data(){
        return{
            list:[],
            end: '上传签到头像',
            randonNum: 123456,
            defaultImg: 'this.src="' + require('../../../static/img/mantoux.png') + '"',
            textPrompt:[
                "注意：",
                "1、每张图片均要以真实姓名命名，如张三.jpg，必须是真实姓名和jpg格式。",
                "2、建议所有图片统一尺寸，建议尺寸大小为400*300，必须包含人脸且正面清晰可见。",
                "3、将所有图片整体打包成压缩包，图片外层不能包含文件夹，压缩包必须是zip格式。"
            ],
            infoList: [],//头像列表对象
            imgList:{//图片列表
                img01:{imgid:'',imgpath:''}
            }
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getList();
        this.randonNum = '?_' + (new Date()).getTime();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(210);
        },
        // 附件上传
        uploadMoreattach(str) {
            var obj = {
                isAttach : 'attach',
                types : '',
                tbname : "",
                imgIndex : this.imgList[str],
                dom : document.getElementById(str),
                pkid : this.mtid,
                fn : this.getList,
                subtypes : '0'
            }
            uploadSignImgs(obj)
        },
        // 获取头像列表
        getList(){
            var obj = {
                success:res => {
                    if (res.data.code == '200') {
                        console.log(res.data)
                        this.infoList = res.data.data || [];
                    } else {
                        this.$message.error(this.$promptObj.searchfail)
                    }
                }
            }
            getSignImgList(obj);
        }
    }
}
</script>

<style scoped>
    .structure-content{
        padding: 0px 20px 20px 70px;
        background-color: #fff;
        position: relative;
        color: #9e9e9e;
        font-size: 14px;
    }
    .file-checkin{
        overflow: hidden;
        margin-top: 50px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3e8e8;
    }
    .file-checkin-chl{
        display: inline-block;
        vertical-align: bottom;
    }
    .text-prompt{
        color: #e27a4d;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        margin-left: 60px;
    }
    .img-list{
        display: inline-block;
        width: 10%;
        height: 188px;
        margin: 20px 1% 20px 0;
        text-align: center;
    }
    .img{
        width: 100%;
        height: 168px;
    }
</style>
