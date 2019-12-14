// 修改会议室
<template>
    <div class="add-room">
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
            <div class="demo-input-suffix add-room-line">
                <span class="grid-content">会议室编号</span>
                <el-input
                  placeholder="请输入会议室编号"
                  v-model="allContent.mtrnum">
                </el-input>
            </div>
            <div class="demo-input-suffix add-room-line">
                <span class="grid-content">会议室名称</span>
                <el-input
                    placeholder="请输入会议室名称"
                    v-model="allContent.mtrname">
                </el-input>
            </div>
            <div class="demo-input-textarea add-room-line">
                <span class="grid-content">备注</span>
                <el-input
                    type='textarea'
                    placeholder="请输入备注"
                    rows='8'
                    v-model="allContent.remark">
                </el-input>
            </div>
            <div class="btn-group">
                <el-row>
                  <!-- 保存 -->
                    <el-button type="warning" @click.native="sendInfo">{{this.$buttonObj.save}}</el-button>
                    <el-button :style="{backgroundColor:colorselects,color:'#fff'}" @click.native="cancel">{{$buttonObj.cancel}}</el-button>
                </el-row>
              </div>
        </el-scrollbar>
    </div>
</template>

<script>
import { editMtroom } from "./../../api/https.js";
import { getNowFormatDate,checkNull,updateDetail } from "./../../api/methods.js";
import { addConferenceInit } from '@/init/meeting.js'
export default {
    inject: ["replaceroute"],
    data(){
        return{
            list: [
                { router: '会议室管理'}
            ],
            end: '修改会议室',
            allContent: {
                mtrnum: '',
                mtrname: '',
                remark: ''
            },
            valueEmpty: {
                mtrnum: '会议室编号不能为空',
                mtrname: '会议室名称不能为空'
            },
            windowHeight: '',
            mtrid: ''
        }
    },
    created(){ 
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        this.loadsx();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(210);
        },
        // 进入到详情页面
        cancel() {
            var arr = updateDetail('/management/meetingRoom/roomDetail/');
            this.replaceroute(arr[0], arr[1]);
        },
         // 非空判断
         notNull(){
            var boo = ''
            for (const key in this.allContent) {
                if( key == 'remark' ) continue;
                if( this.allContent[key] == '' ) return boo = key;
            }
            return boo;
        },
        // 发送记录
        sendInfo(){
            var str = this.notNull();
            if(str) return this.$message.error(this.valueEmpty[str])
            var obj = {
                self: this,
                success:res => {
                    if(res.data.code == 200){
                        this.$message.success(res.data.desc);
                        this.cancel();
                    }else{
                        this.$message.error(this.$promptObj.savefail)
                    }
                }
            }    
            editMtroom(obj) 
        },
        loadsx(){
            var str = this.$route.params.id;
            this.mtrid = str.substring(str.indexOf('@')+1)
            this.allContent = JSON.parse(sessionStorage.getItem(this.mtrid))
        }
    },
    computed:{
        colorselects(){
            return this.$parent.$router.options.routes[1].meta.colorselect;
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>

<style scoped>
    .add-room{
        padding: 20px 50px 0px 0px;
        background-color: #fff;
        position: relative;
    }
    .demo-input-suffix{
        width: 40%;
    }
    .el-input{
        width: 70%;
    }
    .el-textarea{
        width: 70%;
        vertical-align: top;
    }
    .add-room-line{
        padding: 25px 50px;
    }
    .btn-group{
        margin: 200px 140px 0px;
    }
</style>