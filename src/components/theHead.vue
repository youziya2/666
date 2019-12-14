<template>
    <div style="position:fixed;min-width:1280px;top:0px;z-index:999;width:100%;">
            <div class="header" :style="'background-color:'+backcolor">
                <!-- 顶部第一导航行 -->
                <el-tooltip v-for="(item,index) in list" :key="index" popper-class="item" effect="dark" :content="item.name" placement="bottom">
                    <li :style="selectNum == index? 'color:'+backcolor :'color:#fff'" :class="selectNum == index?'router-link-active':''" @click="goPath('selectNum',index,disab||item.route)">
                        <i :class="['iconfont',item.ico]" v-if="item.ico"></i>
                        <img :src="item.imgs" style="width: 16px;vertical-align: middle;margin-left: -8px;" v-if="item.imgs">
                        {{item.name}}
                        <img src="./../../static/img/close.png" class="close" v-if="!item.ico&item.icoif" @click.stop="cindex(index)">
                    </li>
                </el-tooltip>
                <!-- <el-popover
                    placement="bottom"
                    v-model="gmores"
                    popper-class="gmore"
                    width="200"
                    >
                    <router-link v-for="(item,index) in more" :title="item.name" :key="index" @click.native="addxiugai(item)" :to="item.route" class="moreroute">{{1234+item.name}}</router-link>
                    <div class="moreroute" style="color:red;text-align:center;" @click="clearmore">清除</div>
                    <img src="./../../static/img/more.png" class="more" slot="reference" v-show="more&&more.length">
                </el-popover> -->
            </div>
            <div class="separate">
                <!-- 顶部第二导航行 -->
                <el-tooltip v-for="(item,index) in childroute" :key="index" popper-class="item" effect="dark" :content="item.name" placement="bottom">
                    <li :style="secondNum == index? 'backgroundColor:' + backcolor + ';color:#fff' :'backgroundColor:#fff;color:'+backcolor"  @click="goPath('secondNum',index,disab||item.route)">
                        <i :class="['iconfont',item.ico]" v-if="item.ico"></i>
                        <img :src="item.imgs" style="width: 16px;vertical-align: middle;margin-left: -6px;" v-if="item.imgs">
                        {{item.name}}
                        <img src="./../../static/img/close.png" class="close" v-if="!item.ico" @click.stop="cindex(index)">
                    </li>
                </el-tooltip>
                <!-- <el-popover
                    placement="bottom"
                    v-model="cmores"
                    popper-class="gmore"
                    width="200"
                    >
                    <router-link v-for="(item,index) in childmore" :title="item.name" :key="index" @click.native="addxiugai(item)" :to="item.route" class="moreroute">{{item.name}}</router-link>
                    <div class="moreroute" style="color:red;text-align:center;" @click="clearmore">清除</div>
                    <img src="./../../static/img/cccsanjiao.png" class="childmore" slot="reference" v-show="childmore&&childmore.length">
                </el-popover> -->
            </div>
        </div>
</template>

<script>
import { clearRemoveList } from "@/api/methods"
export default {
    name: 'theHead',
    props:["list","backcolor","more","childroute","childmore"],
    data(){
        return{
            gmores: false,
            cmores: false,
            disab: null,
            selectNum: 0,
            secondNum: 0,
            _router: ''
        }
    },
    methods:{
        // 点击导航栏
        goPath(str,index,path){
            this[str] = index
            if( str == 'selectNum') sessionStorage._firstNvb = index
            this.$router.push(path)
        },
        cindex(index){
            this.$emit("cindex",index);
        },
        clearmore(){
            this.$emit("clearmore");
            this.gmores=false;
            this.cmores=false;
        },
        addxiugai(cadd){
            this.$emit("addxiugai",cadd);
            this.gmores=false;
            this.cmores=false;
        },
        // 路由监听
        getSelectNum(n,str){
            var rpm = this.$route.meta, url = location.href;
            if(rpm && !sessionStorage._firstNvb) rpm = rpm.flag;
            else rpm = false ;
            for (let index = 0; index < n.length; index++) {
                if (n[index].route == this.$route.path || rpm === n[index].ico || this.$route.path.indexOf(n[index].id) > -1) {
                    this[str] = index
                    if(rpm) sessionStorage.setItem('_firstNvb',index)
                    if(this.$route.path.indexOf(n[index].id) > -1) sessionStorage.setItem('_firstNvb',index)
                }
            }
            if( url.indexOf('management/productList/lists') > -1 ) sessionStorage.setItem('_firstNvb',0);
            if( url.indexOf('management/motherboardNorm/lists') > -1 ) sessionStorage.setItem('_firstNvb',1);
        },
        getSecondNum(n,str){
            for (let index = 0; index < n.length; index++) {
                if (n[index].route == this.$route.path || this.$route.path.indexOf(n[index].id) > -1) {
                    this[str] = index
                }
            }
        },
        loadsx(){ 
            if(this.childroute) this.getSecondNum(this.childroute,'secondNum');
            if(this.list) this.getSelectNum(this.list,'selectNum');
        },
        clearTab(arr01,arr02){
            for (let index = 0; index < arr01.length; index++) {
                for (let num = 0; num < arr02.length; num++) {
                    if(arr01[index] == arr02[num].id) arr02.splice(num,1);
                }
                
            }
        },
        // 删除列表成功时清除相关信息
        removeTab(arr){
            clearRemoveList(arr)
            if(this.list) this.clearTab(arr,this.list)
            if(this.childroute) this.clearTab(arr,this.childroute)
        }
    },
    created(){
        this.loadsx()
        this.selectNum = sessionStorage._firstNvb
        this.$bus.on('removeTab',this.removeTab)
    },
	beforeDestroy(){
		this.$bus.off('removeTab',this.removeTab)
	},
    watch:{
        // 如果路由有变化，会再次执行该方法
        "$route": "loadsx"
    }
}
</script>
