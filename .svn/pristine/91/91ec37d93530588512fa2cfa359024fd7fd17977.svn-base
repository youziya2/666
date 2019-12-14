<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="feedBackDetailContent">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="feedBackIcan">
                    <div class="feedBackDetailTitle">{{personInfo.realname}}</div>
                    <div class="feedBackDetailTable">
                        <!-- 用户信息 -->
                        <table spellcheck="0" style="border-collapse:collapse;">
                            <tr>
                                <th colspan="4">{{fbList.info}}</th>
                            </tr>
                            <tr>
                                <td>{{fbList.introid}}</td>
                                <td class="feedBack-tab-title">
                                    {{personInfo.introid}}
                                </td>
                                <td>{{fbList.phone}}</td>
                                <td class="tab-right feedBack-tab-title">
                                    {{personInfo.phone}}
                                </td>
                            </tr>
                            <tr>
                                <td>{{fbList.savetime}}</td>
                                <td class="feedBack-tab-title">
                                    {{questionObj.savetime}}
                                </td>
                                <td>{{fbList.levels}}</td>
                                <td class="tab-right feedBack-tab-title">
                                    <img style="ver" :src="imgs[questionObj.levels]" alt="">
                                    <span>{{levels[questionObj.levels/1 + 1]}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>{{fbList.states}}</td>
                                <td class="tab-right feedBack-tab-title">
                                    <div class="ListCode" :style=" { backgroundColor:backGroundColor[questionObj.states] }">{{states[questionObj.states/1 + 1]}}</div>
                                </td>
                                <td></td>
                                <td class="tab-right feedBack-tab-title"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- 反馈内容 -->
                <div style="background-color: #F1F4F6;margin: 40px 15px 0px 2%;overflow: hidden;padding: 20px;">
                    <div class="feedBackStep" :style="{backgroundColor:colorselects,backgroundSize:stepsize}">
                        <div>{{states['1']}}</div>
                        <div>{{states['2']}}</div>
                        <div>{{states['3']}}</div>
                    </div>
                    <div class="feedbigImg">
                        <div class="feedBackDetailTitle" style="margin:20px 0px;">{{fbList.answers}}</div>
                        <img :src="bigimg">
                    </div>
                    <div class="feedsmallImg">
                        <img v-for="(item,index) in smallimg" :key="index" :src="item.img" @click="qhImg(index)">
                    </div>
                    <div class="feedBackComment">
                        {{questionObj.content}}
                        <div class="dataTime">{{questionObj.savetime}}</div>
                    </div>
                </div>
                <div class="reply" :class="item[0] == 'server' ? 'replyRight' : 'replyLeft' " v-for="(item,index) in contentArr" :key="index">
                    <img :src="item[0] == 'server' ? './../../../static/img/admin.png' : './../../../static/img/admin.png'">
                    <div>
                        <div class="replyHuida">
                            {{item[0] == 'server' ? userName : personInfo.realname}}：
                            {{item[2]}}</div>
                        <div class="replyDataTime">{{item[1]}}</div>
                    </div>
                </div>
                <div class="replyTxet" v-if="questionObj.states != 2">
                    <el-input
                        resize="none"
                        type="textarea"
                        :autosize="{minRows:9}"
                        v-model="answers">
                    </el-input>
                    <div><el-checkbox v-model="checked">{{fbList.solved}}</el-checkbox></div>
                    <!-- 保存 -->
                    <el-button style="float:right" @click="editFeedback()">{{$buttonObj.save}}</el-button>
                </div>
                <div class="btn-group">
                    <el-row>
                        <!-- 关闭 -->
                        <el-button @click="dlexiugai()" :style="{backgroundColor:colorselects,color:'#fff'}">{{$buttonObj.close}}</el-button>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import { delDetail,updateDetail,getNowFormatDate } from "./../../api/methods.js";
import { getFeedbackDetail,editFeedback } from "./../../api/https.js";
import { fbDetailInit } from "@/init/feedback.js";
export default {
    data(){
        return{
            userName: localStorage.userName,
            fbid: '',
            answers: '',
            list:[
                {router:"用户反馈"}
            ],
            end:"反馈详情",
            smallimg:[
                {img:"./static/img/bigimg.png"},
                {img:"./static/img/littleimg.png"},
                {img:"./static/img/bigimg.png"},
                {img:"./static/img/bigimg.png"},
                {img:"./static/img/bigimg.png"},
                {img:"./static/img/bigimg.png"}
            ],
            imgs:{
                '0': './static/img/fb_nomarl.png',
                '1': './static/img/fb_important.png',
                '2': './static/img/fb_urgent.png',
                '3': './static/img/fb_critical.png'
            },
            backGroundColor:{
                '0': "#D81919",
                '1': "#D98C1E",
                '2': "#0FBD50"
            },
            personInfo: {},
            questionObj: {},
            fbList: {},
            levels: {},//问题级别 
            states: {},
            bigimg:"",
            contentArr: [],
            step:0,
            checked:'',
            windowHeight:''
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "getData"
    },
    created(){
        fbDetailInit(this);
        this.list[0].router = this.fbList.ctfb;
        this.end = this.fbList.fbDetail;
        this.qhImg();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.getData();
    },
    methods:{
        qhImg(index = 0){
            this.bigimg = this.smallimg[index].img;
        },
        dlexiugai(){
            var arr = delDetail("/management/feedBack/feedBackList", 'feedBacklist')
            this.$emit(arr[0],arr[1]);
        },
        jindu(){
            this.step >=2 ? this.step = 0 : this.step++;
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        },
        // 反馈问答内容
        getContent(str){
            this.contentArr = []
            var arr = str.split("#") , arr01 = [];
            for (let index = 0; index < arr.length; index++) {
                if(!arr[index]) continue;
                arr01 = arr[index].split('~');
                arr01[1] = getNowFormatDate(new Date(arr01[1] * 1000));
                this.contentArr.push(arr01);
            }
        },
        // 获取详情
        getData(){
            this.fbid  = this.$route.params.id;
            this.fbid = this.fbid.substring(this.fbid.indexOf('@')+1)
            var obj = {
                id : this.fbid,
                success:response => {
                    if (response.data.message.indexOf("getSuccess") > -1) {
                        this.personInfo = response.data.tuser
                        this.questionObj = response.data.feedback.fieldvalues
                        this.getContent(this.questionObj.answers)
                        this.questionObj.savetime = getNowFormatDate(new Date(this.questionObj.savetime.time))
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getFeedbackDetail(obj)
        },
        // 发送修改信息
        editFeedback(){
            if (this.answers == '') return this.$message.error('发送内容不能为空！')
            this.answers = this.answers.replace(/~/g,'-')// ~替换成-
            this.answers = this.answers.replace(/#/g,'-')// #替换成-
            var content = "server~savetime~" + this.answers , num =''
            if (this.checked) num = 2
            else num = this.questionObj.states
            var obj = {
                self : this,
                states: num,
                content : content,
                success:response => {
                    if (response.data.message.indexOf("editSuccess") > -1) {
                        this.questionObj = response.data.feedback.fieldvalues
                        this.getContent(this.questionObj.answers)
                        this.questionObj.savetime = getNowFormatDate(new Date(this.questionObj.savetime.time))
                        this.answers = ''
                    } else {
                        this.$message.error(this.$promptObj.savefail);
                    }
                }
            }
            editFeedback(obj)
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        },
        stepsize(){
            if(this.questionObj.states == 0){
                return "66% 100%";
            }else if(this.questionObj.states == 1){
                return "33% 100%";
            }else if(this.questionObj.states == 2){
                return "0% 100%";
            }
        }
    }
}
</script>

<style scoped>
    .ListCode{
        padding: 0px 3px;
        height: 24px;
        font-size: 14px;
        color: #fff;
        line-height: 24px;
        display: inline-block;
        text-align: center;
        cursor: default;
    }
    .feedBackDetailContent{
        padding: 50px;
        background-color: #fff;
        max-width: 100%;
        box-sizing: border-box;
        padding-bottom: 0px;
    }
    .feedBackIcan{
        width: 100%;
        overflow: hidden;
    }
    .feedBackIcan .el-progress{
        margin: 0px auto;
        margin-top: 20px;
    }
    .feedBackDetailTable{
        float: left;
        width: 100%;
        padding-left: 2%;
        margin-top: 20px;
    }
    .feedBackDetailTable table{
        width: 97%;
    }
    .feedBackDetailTable table th{
        padding: 20px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
    }
    .feedBackDetailTable table td{
        color: #666;
        font-size: 14px;
        padding: 0px 20px;
        /* vertical-align: top; */
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 46px;
    }
    .feedBackDetailTable table .tab-right{
        color: #666;
        border-right: 1px solid #F1F4F6;
    }
    .feedBackDetailTable table .tab-right .el-scrollbar__wrap{
        padding-right: 30px;
        line-height: 28px;
        text-indent: 2rem;
        vertical-align: top;
    }
    .feedBack-tab-title{
        width: 32%;
        color: #333 !important;
    }
    .feedBackDetailTitle{
        font-size: 20px;
        font-weight: 900;
        line-height: 20px;
    }
    .feedsmallImg{
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 12px;
    }
    .feedsmallImg img{
        width: 9.2%;
        float: left;
        margin-right: 12px;
        border: 1px solid #F1F4F6;
    }
    .feedbigImg{
        box-sizing: border-box;
        width: 100%;
    }
    .feedbigImg img{
        width: 32%;
        border: 1px solid #F1F4F6;
    }
    .feedBackComment{
        box-sizing: border-box;
        width: 100%;
        font-size: 14px;
        color: #666;
        text-indent: 2rem;
        margin-top: 20px;
    }
    .dataTime{
        width: 100%;
        text-align: right;
    }
    .replyTxet{
        margin: 0px 18px 0px 2%;
        padding-bottom: 40px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
    }
    .replyTxet .el-textarea{
        width: 100%;
        margin-top: 40px;
    }
    .replyTxet button{
        box-sizing: border-box;
        width: 100px;
        height: 36px;
        line-height: 10px;
        background-color: #ffffff !important;
        border: 1px solid rgb(220, 223, 230) !important;
        color: #666 !important;
    }
    .reply{
        overflow: hidden;
        border-bottom: 1px solid #CCC;
        padding: 40px 0px;
        margin: 0px 18px 0px 2%;
    }
    .reply img{
        width: 3%;
    }
    .reply .replyHuida{
        font-size: 14px;
        color: #666;
        line-height: 14px;
        font-weight: 900;
    }
    .replyLeft>div,.replyLeft img{
        float: left;
    }
    .replyLeft img{
        margin-right: 1.3%;
    }
    .replyRight>div,.replyRight img{
        float: right;
        text-align: right;
    }
    .replyRight img{
        margin-left: 1.3%;
    }
    .reply .replyDataTime{
        color: #999;
        margin-top: 10px;
        font-size: 14px;
        line-height: 14px;
    }
    .feedBackStep{
        width: 100%;
        color: #fff;
        font-weight: 900;
        font-size: 20px;
        overflow: hidden;
        height: 40px;
        background: url(./../../../static/img/smallbackground.png) no-repeat 100% 0px;
    }
    .feedBackStep>div{
        width: 33%;
        float: left;
        text-align: center;
        line-height: 40px;
    }
</style>
