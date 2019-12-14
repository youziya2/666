<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="spaceDetailContent" ref="scerllbarH">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="spaceIcan">
                    <div class="spaceChucun">
                        <div class="spaceIcan-title">李晓梅</div>
                        <div style="text-align: center;">
                            <el-progress :stroke-width='15' type="circle" :percentage="80" :width="217" :color="colorselects" status="text">
                                <div class="neibu">
                                    <div class="neibu-top">10GB</div>
                                    <div class="neibu-btm">总容量</div>
                                </div>
                            </el-progress>
                            <div class="spaceJdtxm">
                                <div :style="{backgroundColor:colorselects}" class="diyige"></div>
                                <div style="color:#999999;">已用空间</div>
                                <div style="float:right;color:#333;">8GB</div>
                            </div>
                            <div class="spaceJdtxm2 spaceJdtxm">
                                <div style="backgroundColor:#EAEEF8" class="diyige"></div>
                                <div style="color:#999999;">剩余空间</div>
                                <div style="float:right;color:#333;">2GB</div>
                            </div>
                        </div>
                    </div>
                    <div class="spaceDetailTable">
                        <table spellcheck="0" style="border-collapse:collapse;">
                            <tr>
                                <th colspan="4">{{end}}</th>
                            </tr>
                            <tr>
                                <td>设备ID</td>
                                <td class="tab-title">
                                    88888888
                                </td>
                                <td>产品名称</td>
                                <td class="tab-right tab-title">
                                    虹菱平板会议机
                                </td>
                            </tr>
                            <tr>
                                <td>用户密码</td>
                                <td class="tab-title">
                                    66666666
                                </td>
                                <td>产品型号</td>
                                <td class="tab-right tab-title">
                                    D550HOD18
                                </td>
                            </tr>
                            <tr>
                                <td>激活时间</td>
                                <td class="tab-title">
                                    2018-9-12
                                </td>
                                <td>设备版本</td>
                                <td class="tab-right tab-title">
                                    中国版
                                </td>
                            </tr>
                            <tr>
                                <td>云盘大小</td>
                                <td class="tab-title">
                                    5G
                                </td>
                                <td>设备颜色</td>
                                <td class="tab-right tab-title">
                                    黑色
                                </td>
                            </tr>
                            <tr>
                                <td>增值云盘大小</td>
                                <td class="tab-title">
                                    20G
                                </td>
                                <td>设备尺寸</td>
                                <td class="tab-right tab-title">
                                    65英寸
                                </td>
                            </tr>
                            <tr>
                                <td>增值服务到期时间</td>
                                <td class="tab-title">
                                    2019-8-12
                                </td>
                                <td>设备功率</td>
                                <td class="tab-right tab-title">
                                    600W
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="space-set">
                    <p class="space-set-title">增值空间设置</p>
                    <template v-for="(item,index) in fatherArr">
                        <div :key="index" v-if="item.isShow" style="padding: 10px 0;border-bottom: 1px solid #F1F4F6;"> 
                            <sliderm :fatherObj='item.id'></sliderm>
                            <!-- <div style="display:inline-block;display: inline-block;vertical-align: middle;margin-top: 20px;font-size:14px">
                                <span class="add-space" v-if="spaceLength == index" @click="addSpace(index)">添加</span>
                                <span class="plus-space" @click="plusSpace(index)" :style="spaceLength != index ? 'margin-left: 120px;' : ''">删除</span>
                            </div>    -->
                        </div>
                    </template>
                </div>
                <div class="btn-group">
                    <el-row>
                        <el-button type="warning" @click="goxiugai()">修改</el-button>
                        <el-button @click="dlexiugai()" :style="{backgroundColor:colorselects,color:'#fff'}">关闭</el-button>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import sliderm from "./../../../components/slider"
export default {
    inject:["replaceroute"],
    data(){
        return{
            list:[
                {router:"云盘管理"},
                {router:"用户增值空间"},
            ],
            end:"用户信息",
            windowHeight:'',
            fatherArr:[
                {id:'01',isShow:true},
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
    components:{
        sliderm
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    methods:{
        // 点击删除按钮
        plusSpace(num){
            this.fatherArr[num].isShow = false
        },
        // 点击添加按钮
        addSpace(num){
            if(num < this.fatherArr.length - 1) this.fatherArr[num+1].isShow = true
        },
        goxiugai(){
            // this.replaceroute(this.$route.path,'/management/cloudList/IncrementalSpace/IncrementalSpaceChange/'+this.$route.params.id);
            // this.$router.push({
            //     path:"/management/cloudList/IncrementalSpace/IncrementalSpaceChange/"+this.$route.params.id,
            //     query: {
            //         id: this.$route.path
            //     }
            // });
        },
        dlexiugai(){
            this.$emit('deletexiugai',this.$route.path);
            this.$router.push({ path: "/management/cloudList/IncrementalSpace/IncrementalSpaceList" });
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        },
        spaceLength(){
            var num = 0;
            for (let index = 0; index < this.fatherArr.length; index++) {
                if(this.fatherArr[index].isShow) num  = index
            }
            return num
        }
    }
}
</script>

<style scoped>
    .spaceDetailContent{
        padding: 50px;
        padding-right: 80px;
        padding-bottom: 0px;
        background:#fff;
    }
    .spaceIcan{
        width: 100%;
        overflow: hidden;
        margin-bottom: 30px;
    }
    .spaceChucun{
        width: 14%;
        padding: 0px 18px;
        float: left;
        position: relative;
    }
    .spaceIcan>div .spaceIcan-title{
        font-size: 20px;
        color: #333;
        line-height: 20px;
        font-weight: 700;
    }
    .spaceIcan .el-progress{
        margin: 0px auto;
        margin-top: 20px;
    }
    .spaceJdtxm{
        width:217px;
        height:20px;
        margin: 0px auto;
        margin-top:20px;
        overflow: hidden;
    }
    .spaceJdtxm.spaceJdtxm2{
        margin-top:15px;
    }
    .spaceJdtxm>.diyige{
        width: 40px;
        height: 20px;
        float: left;
    }
    .spaceJdtxm div{
        display: inline-block;
        line-height: 20px;
    }
    .spaceDetailTable{
        float: right;
        width: 72%;
        margin: 30px 12px 0 0;
        /* margin-left: 11.5%; */
    }
    .spaceDetailTable table{
        width: 100%;
    }
    .spaceDetailTable table th{
        padding: 20px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
        text-indent: 25px;
        border-right: 1px solid #F1F4F6;
    }
    .spaceDetailTable table td{
        color: #666;
        font-size: 14px;
        padding: 13px 20px;
        vertical-align: top;
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 14px;
    }
    .spaceDetailTable table .tab-right{
        color: #666;
        border-right: 1px solid #F1F4F6;
    }
    .spaceDetailTable table .tab-right .el-scrollbar__wrap{
        padding-right: 30px;
        line-height: 28px;
        text-indent: 2rem;
        vertical-align: top;
    }
    .tab-title{
        width: 32%;
        color: #333 !important;
    }
    /* 云盘空间 */
    .space-set{
        margin:20px 10px 0 0;
        border:1px solid #F1F4F6;
    }
    .space-set-title{
        padding:10px 0 10px 24px;
        /* border-top:1px solid rgb(194, 203, 239); */
        background-color: #F1F4F6;
    }
    .add-space{
        display: inline-block;
        margin: 0 40px 0 50px;
        color: rgb(67, 119, 238);
        cursor: pointer;
    }
    .plus-space{
        color: red;
        cursor: pointer;
    }
</style>
