<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="structure-content">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <template v-if="productList.length > 0">
                    <div class="product-list" v-for="(item,index) in  productList">
                        <div class="product-img">
                            <img src="../../../static/img/sysSeting.png" :alt="item.gdiname">
                        </div>
                        <div class="product-info">
                            <div>产品标准：{{item.gdcname}}</div>
                            <div>产品名称：{{item.gdiname}}</div>
                            <div>MAC地址：{{item.mac}}</div>
                            <div>产品编号(批次)：{{item.gdcode}}</div>
                        </div>
                        <div class="setting-info">
                            <div>SMTP地址<input class="setting-info-input" type="text" v-model="item.goodsppt.smtpadr"></div>
                            <div>SMTP端口<input class="setting-info-input" type="text" v-model="item.goodsppt.smtpport"></div>
                            <div>邮箱用户名<input class="setting-info-input" type="text" v-model="item.goodsppt.username"></div>
                            <div>邮箱密码<input class="setting-info-input" type="password" v-model="item.goodsppt.password"></div>
                        </div>
                        <div class="setting-info">
                            <div>绑定会议室
                                <template v-if='Object.keys(roomList).length > 0'>
                                    <select name="" id="" class="setting-info-input" placeholder='绑定会议室' style="height: 40px;" v-model = 'item.goodsppt.mtrid'>
                                        <option v-for="(val,it) in roomList"
                                        :key="it"
                                        :label="val"
                                        :value="it">
                                        </option>
                                    </select>
                                </template>
                                <template v-else>
                                        <div class="not-room" @click='goRoom()'>你还没有创建会议室,请点击添加!</div>
                                </template>
                                
                            </div>
                        </div>
                        <div class="save-btn" @click='sendInfo(item)'>
                            保存
                        </div>
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
import { getGoodsitemByCustid,getMtroomListByOrgid,saveGoodsPpt } from "./../../api/https.js";
// import { getNowFormatDate,goDetail,getChoice,doChoice,closeIcon } from "./../../api/methods.js";
export default {
    data(){
        return{
            list:[],
            end: '基础设置',
            productList: [],//会议机列表
            roomList: {},//会议室列表对象
            goodsppt:{
                // "mtrname":"",
                "smtpadr":"",
                "smtpport":"",
                "username":"",
                "password":"",
                "mtrid":""
            },//绑定信息
            goodspptNotNull:{
                "mtrid":"请绑定一个会议室",
                "password":"邮箱密码不能为空",
                "smtpport":"SMTP端口不能为空",
                "smtpadr":"SMTP地址不能为空",
                "username":"邮箱用户名不能为空"
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
        this.getGoodsitemByCustid();
        this.getMtroomListByOrgid();
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(210);
        },
        //跳转会议室页面
        goRoom(){
            this.$router.push({
                path:'/management/meetingRoom',
                query:{selectStr:'meetingRoom'}
            });
        },
        // 非空验证
        checkGoodsppt(goodsppt){
            var boo = false;
            for (const key in this.goodsppt) {
                if (key == "mtrname") continue;
                if (goodsppt[key] == '') {
                    return boo = key;
                }
            }
            return boo;
        },
        //邮箱验证
        checkEmail(goodsppt){
            var myreg = /^([a-zA-Z0-9]+[-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(!myreg.test(goodsppt.username)){
                this.$message.error('请输入正确的邮箱地址！');
                return false;
            }else{
                return true;
            }
        }, 
        // 密码处理
        handlePassword(password){
            var str = '', reg = /^[0-9a-fA-F]{32}$/;
            if (password) {
                str = reg.test(password) ? password: hex_md5(password);
            } 
            return str;

        },
        //获取公司全部会议机
        getGoodsitemByCustid(){
            var obj = {
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var array = res.data.data;
                        this.productList = [];
                        for (let index = 0; index < array.length; index++) {
                            if(!array[index].goodsppt){
                                array[index].goodsppt = JSON.parse(JSON.stringify(this.goodsppt))
                            }
                            this.productList.push(array[index]);
                        }
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getGoodsitemByCustid(obj)
        },
        // 获取可以绑定的会议室列表
        getMtroomListByOrgid(){
            var obj = {
                success:res => {
                    if (res.data.code == '200') {
                        var array = res.data.data;
                        this.roomList = {};
                        for (let index = 0; index < array.length; index++) {
                            this.roomList[array[index].mtrid] = array[index].mtrname;
                        }
                    } else {
                        this.$message.error(this.$promptObj.searchfail)
                    }
                }
            }
            getMtroomListByOrgid(obj);
        },
        //保存信息
        sendInfo(object){
            var boo = this.checkGoodsppt(object.goodsppt);
            if (boo) return this.$message.error(this.goodspptNotNull[boo]);
            boo = this.checkEmail(object.goodsppt);
            if(boo){
                // boo = this.handlePassword(object.goodsppt.password);
                var obj = {
                    infoObj: object,
                    password: object.goodsppt.password,
                    success:res => {
                        if(res.data.message == 'msg01') return this.$message.error('该会议室已被绑定，请重新选择未绑定的');
                        if (res.data.code == '200') {
                            this.$message.success(res.data.desc);
                            this.getGoodsitemByCustid();
                        } else {
                            this.$message.error(this.$promptObj.savefail)
                        }
                    }
                }
                saveGoodsPpt(obj)
            } 
        }
    }
}
</script>

<style scoped>
    .structure-content{
        padding: 0px 20px 20px;
        background-color: #fff;
        position: relative;
        color: #9e9e9e;
        font-size: 14px;
    }
    .product-list{
        position: relative;
        overflow: hidden;
        min-height: 160px;
        margin: 70px 0px 0px 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid gainsboro;
        line-height: 26px;
    }
    .product-img{
        float: left;
        width: 16%;
    }
    .product-img img{
        width: 90%;
        height: 170px;
    }
    .product-info{
        float: left;
        width: 18%;
    }
    .not-room{
        display: inline-block;
        color: red;
        margin-left: 15px;
        cursor: pointer;
    }
    .setting-info{
        float: left;
        width: 24%;
        text-align: right;
    }
    .setting-info-input{
        width: 60%;
        border: 1px solid gainsboro;
        background-color: #FAFAFB;
        border-radius: 3px;
        line-height: 40px;
        outline: none;
        cursor: pointer;
        padding:0px 5px 0px 8px;
        margin:0px 0px 10px 10px;
        color: #9e9e9e;
    }
    .save-btn{
        position: absolute;
        bottom: 30px;
        right: 2%;
        width: 100px;
        color: white;
        text-align: center;
        padding: 10px 35px;
        background-color: #E6A23C;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
