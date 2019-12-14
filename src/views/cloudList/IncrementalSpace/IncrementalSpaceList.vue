<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="space-content">
            <div>
                <div class="spaceSwitcher">
                    <div class="space-s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="space-s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search">
                    用户搜索
                    <el-input placeholder="输入关键字搜索" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="cloudspacecut"></div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="spacetListbox">
                    <el-row :gutter="20" v-if="type == 1">
                        <el-col :span="6" v-for="(item,index) in product" :key="index" class="spaceListsImg">
                            <div class="space-fffback" :class="item.listCheck?'spaceActive':''" @mouseenter="spaceActive = index" @mouseleave="spaceActive = ''">
                                <el-checkbox name="checkcolor" v-model="item.listCheck" v-show="spaceActive === index||item.listCheck"></el-checkbox>
                                <div class="spaceLists">
                                    <img src="./../../../../static/img/cloudimg.png" @click="goxiugai(item.title)">
                                    {{item.title}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="spaceTypeTwo" v-if="type == 2">
                        <li v-for="(item,index) in parval" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck" v-show="listActive === index||item.listCheck"></el-checkbox>
                            </div>
                            <div class="listImg">
                                <img src="./../../../../static/img/cloudimg.png">
                            </div>
                            <div class="particulars" @click="goxiugai(item.name)">
                                <div>{{item.name}}</div>
                                <div class="spaceList">
                                    <div>产品型号：{{item.models}}</div>
                                    <div>产品版本：{{item.version}}</div>
                                    <div>产品颜色：{{item.color}}</div>
                                    <div>产品尺寸：{{item.size}}</div>
                                    <div>产品ID：{{item.id}}</div>
                                    <div>手机号码：{{item.num}}</div>
                                    <div>增值空间：{{item.zengzhi}}</div>
                                    <div>激活时间：{{item.datetime}}</div>
                                    <div>到期时间日期：{{item.daoqi}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <el-button type="danger" class="show-delet-btn" v-show="deletshow">删除</el-button>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="changenum"
                    :page-count="10">
                </el-pagination>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {router:"云盘管理"},
                {router:"用户增值空间"}
            ],
            end:"增值空间列表",
            product:[
                {title:"刘晓梅1",listCheck:false},
                {title:"刘晓梅2",listCheck:false},
                {title:"刘晓梅3",listCheck:false},
                {title:"刘晓梅4",listCheck:false},
                {title:"刘晓梅5",listCheck:false},
                {title:"刘晓梅6",listCheck:false},
                {title:"刘晓梅7",listCheck:false},
                {title:"刘晓梅8",listCheck:false},
                {title:"刘晓梅9",listCheck:false},
                {title:"刘晓梅0",listCheck:false},
                {title:"刘晓梅11",listCheck:false},
                {title:"刘晓梅12",listCheck:false},
                {title:"刘晓梅13",listCheck:false},
                {title:"刘晓梅14",listCheck:false},
                {title:"刘晓梅15",listCheck:false}
            ],
            parval:[
                {
                    name:"刘晓梅1",
                    models:"D550HOD18",
                    id:"8888888",
                    version:"2.1.1",
                    color:"红色",
                    size:"65英寸",
                    num:'1354682246',
                    zengzhi:'20G',
                    datetime:"2018-1-12",
                    daoqi:'2019-1-12',
                    listCheck:false
                },
                {
                    name:"刘晓梅2",
                    models:"D550HOD18",
                    id:"8888888",
                    version:"2.1.1",
                    color:"红色",
                    size:"65英寸",
                    num:'1354682246',
                    zengzhi:'20G',
                    datetime:"2018-1-12",
                    daoqi:'2019-1-12',
                    listCheck:false
                },
                {
                    name:"刘晓梅3",
                    models:"D550HOD18",
                    id:"8888888",
                    version:"2.1.1",
                    color:"红色",
                    size:"65英寸",
                    num:'1354682246',
                    zengzhi:'20G',
                    datetime:"2018-1-12",
                    daoqi:'2019-1-12',
                    listCheck:false
                },
                {
                    name:"刘晓梅4",
                    models:"D550HOD18",
                    id:"8888888",
                    version:"2.1.1",
                    color:"红色",
                    size:"65英寸",
                    num:'1354682246',
                    zengzhi:'20G',
                    datetime:"2018-1-12",
                    daoqi:'2019-1-12',
                    listCheck:false
                }
            ],
            active:0,
            hover:'',
            spaceActive:"",
            type:1,
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            add:{},
            numcolor:[],
            listActive:'',
            windowHeight:''
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        if(sessionStorage.getItem('spacetype') && sessionStorage.getItem('spacetype').length){
            this.type = sessionStorage.getItem('spacetype');
        };
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
    },
    mounted(){
        this.changenum()
    },
    watch:{
        parval:{
            deep:true,
            handler:function(n){
                this.deletshow = false;
                n.forEach(element => {
                    element.listCheck?this.deletshow = true:'';
                });
            }
        },
        product:{
            deep:true,
            handler:function(n){
                this.deletshow = false;
                n.forEach(element => {
                    element.listCheck?this.deletshow = true:'';
                });
            }
        },
        spacetype:function(){
            this.parval.forEach(e => {
                e.listCheck = false;
            });
            this.product.forEach(e => {
                e.listCheck = false;
            });
        }
    },
    methods:{
        goxiugai(name){
            this.add={
                name,
                route: "/management/cloudList/IncrementalSpace/IncrementalSpaceDetail/"+name,
                ico: "",
                imgs:"./static/img/smallyun.png"
            }
            this.$emit('addxiugai',this.add);
            this.$router.push({path: '/management/cloudList/IncrementalSpace/IncrementalSpaceDetail/'+name});
        },
        changenum(){//修改分页背景颜色
            this.numcolor =  document.getElementsByClassName("number");
            for(let i =0;i<this.numcolor.length;i++){
                this.numcolor[i].style.backgroundColor = '#f4f4f5';
            }
            document.getElementsByClassName("number active")[0].style.backgroundColor = this.colorselects;
        },
        remenbtype(index){
            this.type = index;
            sessionStorage.setItem('spacetype',index)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(355);
        }
    }
}
</script>

<style scoped>
    .space-content{
        padding: 40px 50px;
        padding-bottom: 0px;
        background-color: #fff;
        position: relative;
    }
    /* 切换列表器样式 */
    .spaceSwitcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 70px;
        right: 50px;
    }
    .spaceSwitcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .spaceSwitcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .space-s-left{
        border-right: 1px solid #F1F4F6;
    }
    .search>div{
        width: 400px;
        margin-left: 40px;
    }
    .search>div .el-input__inner{
        height: 36px;
    }
    .search .el-input-group__append{
        width: 19px;
        left: 20px;
    }
    .search .el-input-group__append button{
        height: 34px;
        padding-top: 5px;
        padding-bottom: 10px;
    }
    .search .el-input-group__append i{
        font-size: 20px;;
        color: #fff;
    }
    .search ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 16px;
        font-weight: 700;
    }
    /* 输入框搜索记录 */
    .record{
        display: inline-block;
        vertical-align: middle;
    }
    .record>div{
        width: 82px;
        height: 30px;
        background-color: #E4E4E4;
        font-size: 12px;
        color: #999;
        line-height: 30px;
        text-align: center;
        float: left;
    }
    /* end */
    .spacetListbox{
        min-height: 510px;
        position: relative;
    }
    .spacetListbox .el-col{
        margin-bottom: 15px;
    }
    .spaceLists{
        text-align: center;
        width: 76%;
        padding: 15px 10px;
        padding-bottom: 5px;
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor:pointer;
        position: relative;
        padding: 10px;
    }
    .space-fffback .el-checkbox{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .spaceLists img{
        width: 100%;
    }
    .space-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .spaceTypeTwo li{
        height: 180px;
        width: 98%;
        padding: 20px 15px;
    }
    .spaceTypeTwo li>div{
        float: left;
    }
    .spaceTypeTwo li:not(.listBack):hover{
        background-color: #F1F4F6;
    }
    .listCheck{
        margin-top: 66px;
        width: 15px;
        height: 20px;
    }
    .listImg img{
        width: 100%;
    }
    .listImg{
        width: 15.5%;
        padding-left: 33px;
        padding-right: 40px;
    }
    .particulars{
        height: 160px;
        width: 70%;
        padding-top: 20px;
    }
    .particulars:hover{
        cursor: pointer;
    }
    .spaceList{
        margin-top: 28PX;
    }
    .spaceList>div{
        width: 24%;
        margin-bottom: 22px;
        float: left;
        color: #666;
        font-size: 14px
    }
    .listBack{
        background-color: #E4E4E4;
    }
    .el-checkbox span>span{
        border: 1px solid #999;
    }
    .el-pager li.active+li{
        border-left:1px solid #ccc;
    }
    /* 九宫格背景颜色 */
    .space-fffback{
        width: 94%;
        padding: 10px;
        position: relative;
    }
    .space-fffback.spaceActive{
        background-color: #F1F4F6;
        background-color: #E4E4E4;
    }
    .space-fffback:not(.spaceActive):hover{
        background-color: #F1F4F6;
    }
    .cloudspacecut{
        width: 100%;
        height: 1px;
        background-color: #CCCCCC;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .spaceListsImg{
        width: 20% !important;
    }
    .el-row{
        margin: 0px !important;
    }
</style>