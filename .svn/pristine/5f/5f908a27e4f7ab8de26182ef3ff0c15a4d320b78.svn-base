<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="intersDetaiContent">
            <el-scrollbar style="background-color: #fff;" :style="{height:windowHeight}">
                <div style="overflow: hidden;padding-bottom:10px;">
                    <div class="intersZcrimg">
                        <img src="./../../../../static/img/bigimg.png">
                    </div>
                    <div class="intersDetailTable">
                        <table spellcheck="0">
                            <tr>
                                <th colspan="2">基本参数</th>
                            </tr>
                            <tr>
                                <td>产品名称</td>
                                <td class="tab-right">虹菱平板电视机</td>
                            </tr>
                            <tr>
                                <td>产品型号</td>
                                <td class="tab-right">D550HOD18-888856</td>
                            </tr>
                            <tr>
                                <td>云盘大小</td>
                                <td class="tab-right">12345678</td>
                            </tr>
                            <tr>
                                <td>产品版本</td>
                                <td class="tab-right">中国版</td>
                            </tr>
                            <tr>
                                <td>产品颜色</td>
                                <td class="tab-right">
                                        黑、白
                                </td>
                            </tr>
                            <tr>
                                <td>产品尺寸</td>
                                <td class="tab-right">
                                        42寸
                                </td>
                            </tr>
                            <tr>
                                <td>产品重量</td>
                                <td class="tab-right">
                                        10KG
                                </td>
                            </tr>
                            <tr>
                                <td>产品功率</td>
                                <td class="tab-right">
                                        500W
                                </td>
                            </tr>
                            <tr>
                                <td>产品空间</td>
                                <td class="tab-right">
                                        20G
                                </td>
                            </tr>
                            <tr>
                                <td>到期时间</td>
                                <td class="tab-right">
                                        2018-02-20
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="btn-group">
                    <el-row>
                        <el-button  type="warning" @click="goxiugai()">保存</el-button>
                        <el-button @click="dlexiugai()" :style="{backgroundColor:colorselects,color:'#fff'}">关闭</el-button>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    // inject:["replaceroute"],
    data(){
        return{
            list:[
                {router:"云盘管理"},
                {router:"空间配置"},
                {router:"管理列表"}
            ],
            end:"虹菱D550HOD18",
            windowHeight:''
        }
    },
    created(){
        this.loadsx();
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    methods:{
        goxiugai(){
            // this.replaceroute(this.$route.path,'/management/cloudList/interspace/interspaceChange/'+this.$route.params.id);
            // this.$router.push({
            //     path:"/management/cloudList/interspace/interspaceChange/"+this.$route.params.id,
            //     query: {
            //         id: this.$route.path
            //     }
            // });
        },
        loadsx(){
            this.end = this.$route.params.id;
        },
        dlexiugai(){
            this.$emit('deletexiugai',this.$route.path);
            this.$router.push({ path: "/management/cloudList/interspace/interspaceList" });
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(240);
        }
    },
    watch:{
        "$route": "loadsx"
    }
}
</script>

<style scoped>
    .intersDetaiContent{
        width: 100%;
        padding: 50px;
        padding-bottom: 0px;
        box-sizing: border-box;
        background-color: #fff;
        height: 100%;
        overflow: hidden;
    }
    .intersZcrimg{
        float: left;
        width: 38%;
        text-align: center;
    }
    .intersZcrimg img{
        width: 100%;
    }
    .intersDetailTable{
        float: left;
        width: 59%;
        margin-left: 2.5%;
    }
    .intersDetailTable table{
        width: 100%;
    }
    .intersDetailTable table th{
        padding: 20px;
        font-size: 20px;
        color: #333;
        line-height: 20px;
        background-color: #F1F4F6;
        text-align: left;
    }
    .intersDetailTable table td{
        color: #333;
        font-size: 14px;
        padding: 10px 20px;
        vertical-align: top;
        border-left: 1px solid #F1F4F6;
        border-bottom: 1px solid #F1F4F6;
        line-height: 14px;
    }
    .intersDetailTable table .tab-right{
        color: #666;
        width: 70%;
        border-right: 1px solid #F1F4F6;
    }
    .intersDetaichange{
        width: 42%;
        margin-top: 22px;
    }
    .intersElinput{
        width: 50%;
        height: 32px;
        margin-left: 3%;
        margin-right: 3%;
    }
    .intersElinput>input{
        height: 32px;
    }
    .intersDetailCut{
        height: 1px;
        width: 100%;
        background-color: #CCC;
        margin-top: 40px;
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
</style>
