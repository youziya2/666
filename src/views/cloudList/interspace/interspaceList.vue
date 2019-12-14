<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="inters-content">
            <div>
                <div class="inters-switcher">
                    <div class="s-left" @click="remenbtype(1)"><i class="iconfont icon-jiugongge" :style="{color:type==1?colorselects:''}"></i></div>
                    <div class="s-right" @click="remenbtype(2)"><i class="iconfont icon-liebiao1" :style="{color:type==2?colorselects:''}"></i></div>
                </div>
                <div class="search">
                    产品搜索
                    <el-input placeholder="输入关键字搜索" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" :style="{backgroundColor:colorselects}"></el-button>
                    </el-input>
                </div>
                <div class="filtrate">
                    条件筛选
                    <div class="filtrateName">
                        <div v-for="(item,index) in filname" :key="index" :style="{border:(active === index?'1px solid'+colorselects:''),color:(active === index||hover === index?colorselects:'')}" @mouseenter="hover = index" @mouseleave="hover = ''" @click="active = index">{{item.name}}</div>
                    </div>
                </div>
                <div class="cut"></div>
            </div>
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <div class="intersListbox">
                    <el-row :gutter="20" v-if="type == 1">
                        <el-col :span="6" v-for="(item,index) in product" :key="index" class="intersListsImg">
                            <div class="inters-fffback" :class="item.listCheck?'intersActive':''" @mouseenter="intersActive = index" @mouseleave="intersActive = ''">
                                <el-checkbox name="checkcolor" v-model="item.listCheck" v-show="intersActive === index||item.listCheck"></el-checkbox>
                                <div class="intersLists">
                                    <img src="./../../../../static/img/cloudimg.png" @click="goxiugai(item.title)">
                                    {{item.title}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="intersTypeTwo" v-if="type == 2">
                        <li v-for="(item,index) in parval" :key="index" @mouseenter="listActive = index" @mouseleave="listActive = ''" :class="item.listCheck?'listBack':''">
                            <div class="listCheck">
                                <el-checkbox v-model="item.listCheck" v-show="listActive === index||item.listCheck"></el-checkbox>
                            </div>
                            <div class="listImg">
                                <img src="./../../../../static/img/cloudimg.png">
                            </div>
                            <div class="particulars" @click="goxiugai(item.name)">
                                <div>{{item.name}}</div>
                                <div class="intersList">
                                    <div>产品型号：{{item.models}}</div>
                                    <div>产品版本：{{item.version}}</div>
                                    <div>产品颜色：{{item.color}}</div>
                                    <div>产品尺寸：{{item.size}}</div>
                                    <div>产品重量：{{item.kg}}</div>
                                    <div>产品功率：{{item.power}}</div>
                                    <div>云盘大小：{{item.cloud}}</div>
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
                {router:"默认空间配置"},
            ],
            end:"管理列表",
            filname:[
                {name:"全部"},
                {name:"HOD18系列"},
                {name:"HOD20系列"},
                {name:"HOD25系列"},
                {name:"HOD35系列"}
            ],
            product:[
                {title:"虹菱1D550HOD18-888856",listCheck:false},
                {title:"虹菱2D550HOD18-888856",listCheck:false},
                {title:"虹菱3D550HOD18-888856",listCheck:false},
                {title:"虹菱4D550HOD18-888856",listCheck:false},
                {title:"虹菱5D550HOD18-888856",listCheck:false},
                {title:"虹菱6D550HOD18-888856",listCheck:false},
                {title:"虹菱7D550HOD18-888856",listCheck:false},
                {title:"虹菱8D550HOD18-888856",listCheck:false},
                {title:"虹菱9D550HOD18-888856",listCheck:false},
                {title:"虹菱0D550HOD18-888856",listCheck:false},
                {title:"虹菱11D550HOD18-888856",listCheck:false},
                {title:"虹菱12D550HOD18-888856",listCheck:false},
                {title:"虹菱13D550HOD18-888856",listCheck:false},
                {title:"虹菱14D550HOD18-888856",listCheck:false},
                {title:"虹菱15D550HOD18-888856",listCheck:false}
            ],
            parval:[
                {
                    name:"虹菱平板会议机1",
                    models:"D550HOD18",
                    cloud:"10GB",
                    version:"中国版",
                    color:"黑、白",
                    size:"65英寸",
                    kg:"16KG",
                    power:"1200W",
                    listCheck:false
                },
                {
                    name:"虹菱平板会议机1",
                    models:"D550HOD18",
                    cloud:"10GB",
                    version:"中国版",
                    color:"黑、白",
                    size:"65英寸",
                    kg:"16KG",
                    power:"1200W",
                    listCheck:false
                },
                {
                    name:"虹菱平板会议机1",
                    models:"D550HOD18",
                    cloud:"10GB",
                    version:"中国版",
                    color:"黑、白",
                    size:"65英寸",
                    kg:"16KG",
                    power:"1200W",
                    listCheck:false
                },
                {
                    name:"虹菱平板会议机1",
                    models:"D550HOD18",
                    cloud:"10GB",
                    version:"中国版",
                    color:"黑、白",
                    size:"65英寸",
                    kg:"16KG",
                    power:"1200W",
                    listCheck:false
                }
            ],
            active:0,
            hover:'',
            intersActive:"",
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
        if(sessionStorage.getItem('interstype') && sessionStorage.getItem('interstype').length){
            this.type = sessionStorage.getItem('interstype');
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
        interstype:function(){
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
                route: "/management/cloudList/interspace/interspaceDetail/"+name,
                ico: "",
                imgs:"./static/img/smallyun.png"
            }
            this.$emit('addxiugai',this.add);
            this.$router.push({path: '/management/cloudList/interspace/interspaceDetail/'+name});
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
            sessionStorage.setItem('interstype',index)
        },
        getHeight(){
            this.windowHeight = this.$config.getHeight(370);
        }
    }
}
</script>

<style scoped>
    .inters-content{
        padding: 40px 50px;
        padding-bottom: 0px;
        background-color: #fff;
        position: relative;
    }
    /* 切换列表器样式 */
    .inters-switcher{
        width: 49px;
        height: 22px;
        border: 1px solid #F1F4F6;
        position: absolute;
        top: 115px;
        right: 50px;
    }
    .inters-switcher>div{
        float: left;
        width: 16px;
        height: 14px;
        padding: 4px;
        display: flex;
        cursor: pointer;
    }
    .inters-switcher>div i{
        font-size: 12px;
        margin: auto;
        color: #999;
    }
    .s-left{
        border-right: 1px solid #F1F4F6;
    }
    .search,.filtrate{
        color: #333;
        font-weight: 700;
        font-size: 20px;
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
    .filtrate{
        margin-top: 25px;
        margin-bottom: 20px;
    }
    .filtrate .filtrateName{
        display: inline-block;
        font-size: 16px;
        color: #666666;
        margin-left: 40px;
    }
    .filtrateName div{
        margin-right: 40px;
        padding: 8px 19px;
        border-radius:5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0);
    }
    .filtrateName div:hover{
        cursor:pointer;
    }
    .inters-content .cut{
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .intersListbox{
        min-height: 510px;
        position: relative;
    }
    .intersListbox .el-col{
        margin-bottom: 15px;
    }
    .intersLists{
        text-align: center;
        width: 76%;
        padding: 15px 10px;
        padding-bottom: 5px;
        border: rgba(0, 0, 0, 0) 5px solid;
        cursor:pointer;
        position: relative;
        padding: 10px;
    }
    .inters-fffback .el-checkbox{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .intersLists img{
        width: 100%;
    }
    .inters-content .el-pagination{
        text-align: center;
        margin-top: 40px;
        position: relative;
        margin-bottom: 50px; 
    }
    .intersTypeTwo li{
        height: 180px;
        width: 98%;
        padding: 20px 15px;
    }
    .intersTypeTwo li>div{
        float: left;
    }
    .intersTypeTwo li:not(.listBack):hover{
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
    .intersList{
        margin-top: 28PX;
    }
    .intersList>div{
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
    /* 分页小div增加边框 */
    .el-pager li:not(.active){
        border: 1px solid #CCCCCC;
    }
    .el-pager li.active+li{
        border-left:1px solid #ccc;
    }
    /* 九宫格背景颜色 */
    .inters-fffback{
        width: 94%;
        padding: 10px;
        position: relative;
    }
    .inters-fffback.intersActive{
        background-color: #F1F4F6;
        background-color: #E4E4E4;
    }
    .inters-fffback:not(.intersActive):hover{
        background-color: #F1F4F6;
    }
    .intersListsImg{
        width: 20% !important;
    }
    .el-row{
        margin: 0px !important;
    }
</style>