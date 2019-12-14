<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <div class="structure-content">
            <el-scrollbar style="width:100%;overflow-x: hidden;" :style="{height:windowHeight}">
                <el-container style="height: 100%; border: 1px solid #eee" :style="{height:windowHeight}">
                    <el-aside width="230px" height='100%'>
                            <!-- 公司组织机构 -->
                        <p class="txt-narp">{{deparmentList.tit15}}</p>
                        <!-- 公司 -->
                        <!-- <p class="txt-narp"><i class="el-icon-caret-bottom"></i>深汕合作区虹菱电器深圳分公司</p> -->
                        <div style="padding-left: 20px;cursor: pointer;">
                            <div class="show-dpt" v-for = '(item,k) in orgList' :class = "showIndex == k ? 'active-dpt' : ''"  @click = 'getOrgPersonList(k)'
                                @mouseenter = "showChild = k" @mouseleave = "showChild = -1">
                                <!-- 部门 -->
                                <div>
                                    <span class="txt-narp" style="float: left;width: 140px;">{{item.orgcname}}</span>
                                    <i class="el-icon-caret-bottom eicb" v-if='showIndex == k && showChild == k' @mouseenter = "showBox = true" @mouseleave = "showBox = false">
                                    </i>
                                </div>
                                <div v-if='showIndex == k && showBox' class="edit-content" :style=" 'top:' + (74 + k*36 + 'px')"
                                     @mouseenter = "showBox = true" @mouseleave = "showBox = false">
                                     <!-- 添加部门 -->
                                    <div class="edit-option" @click="editClick('addDeparment')" v-if='k===0'>{{deparmentList.tit21}}</div>
                                    <!-- 编辑部门 -->
                                    <div class="edit-option" @click="editClick('editDeparment')" v-if='k!==0'>{{deparmentList.tit22}}</div>
                                    <!-- 删除部门 -->
                                    <div class="edit-option" @click="editClick('centerDialogVisible')" v-if='k!==0'>{{deparmentList.tit23}}</div>
                                </div>
                            </div>
                        </div>
                    </el-aside>
                    <el-container>
                        <el-header style="text-align: left;line-height: 40px;height: 120px;">
                            <div style='font-weight: 600;font-size:20px'>{{orgList[showIndex] ? orgList[showIndex].orgcname : ''}}</div>
                            <div style="border-bottom: 1px solid #E2E2E2;padding: 10px 0 20px;height: 40px;">
                                <input type="button"  class='btn-fl' :style="{ backgroundColor: isAdd ? '#2557A8' : '#487FD9' } " :value="deparmentList.tit16" @click='getCompanyPersonList'>
                                <!-- 离职 -->
                                <span class='ck-fr' style='margin-right:4px'><el-checkbox v-model="isLeave" @change='getStates'>{{deparmentList.tit20}}</el-checkbox></span>
                                <!-- 未激活 -->
                                <span class='ck-fr'><el-checkbox v-model="isActivation" @change='getStates'>{{deparmentList.tit19}}</el-checkbox></span>
                                <!-- 在职 -->
                                <span class='ck-fr'><el-checkbox v-model="isHear" @change='getStates'>{{deparmentList.tit18}}</el-checkbox></span>
                                <!-- 成员 -->
                                <span class='ck-fr' style='color:#ccc'>({{tableData.length}} {{deparmentList.tit24}})</span>
                            </div>
                        </el-header>
                        <el-main>
                            <el-table :data="tableData">
                                <el-table-column type="selection" width="60">
                                </el-table-column>
                                <el-table-column :label="deparmentList.tit25" width="140">
                                    <template slot-scope="scope">
                                        <i class="iconfont icon-yonghu2" style="color: rgb(133, 172, 239);vertical-align: middle;display: inline-block;font-size: 28px"></i>
                                        <span>{{ scope.row.nickname }}</span>
                                    </template>
                                </el-table-column>
                                <!-- 真实姓名 -->
                                <el-table-column prop="realname" :label="deparmentList.tit26" width="180">
                                </el-table-column>
                                <!-- 电话号码 -->
                                <el-table-column prop="phone" :label="deparmentList.tit27" width="160">
                                </el-table-column>
                                <!-- 邮箱 -->
                                <el-table-column prop="email" :label="deparmentList.tit28" width="370">
                                </el-table-column>
                                <!-- 部门 -->
                                <el-table-column prop="deparment" :label="deparmentList.tit29" width="170">
                                </el-table-column>
                                <!-- 职位 -->
                                <el-table-column prop="poscname" :label="deparmentList.tit30" width="210">
                                </el-table-column>
                                <!-- 状态 -->
                                <el-table-column prop="states" :label="deparmentList.tit31">
                                </el-table-column>
                            </el-table>
                        </el-main>
                    </el-container>
                
                </el-container>
                <!-- 添加部门 -->
                <el-dialog
                    :title="deparmentList.tit21"
                    :visible.sync="addDeparment"
                    width="35%">
                    <div>
                        <!-- 英文名称 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.orgename}}</span>
                            <input class="add-department-btn" v-model="deparment.orgename" :placeholder="deparmentList.orgename">
                        </div>
                        <!-- 中文名称 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.orgcname}}</span>
                            <input class="add-department-btn" v-model="deparment.orgcname" :placeholder="deparmentList.orgcname">
                        </div>
                        <!-- 联系电话 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.mobile}}</span>
                            <input class="add-department-btn" v-model="deparment.mobile" :placeholder="deparmentList.mobile">
                        </div>
                        <!-- 联系手机 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.phone}}</span>
                            <input class="add-department-btn" v-model="deparment.phone" :placeholder="deparmentList.phone">
                        </div>
                        <!-- 备注 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.remark}}</span>
                            <textarea v-model="deparment.remark"
                            style="vertical-align: top"
                            class="add-department-btn"
                            rows="3"
                            :placeholder="deparmentList.remark">
                            </textarea>
                        </div>   
                    </div>
                    <!-- 保存 -->
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" style="padding: 12px 38px;" @click="addOrg">{{$buttonObj.save}}</el-button>
                    </span>
                </el-dialog>
                <!-- 编辑部门 -->
                <el-dialog
                    :title="deparmentList.tit22"
                    :visible.sync="editDeparment"
                    width="35%">
                    <div>
                        <!-- 英文名称 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.orgename}}</span>
                            <input class="add-department-btn" v-model="deparment.orgename" :placeholder="deparmentList.orgename">
                        </div>
                        <!-- 中文名称 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.orgcname}}</span>
                            <input class="add-department-btn" v-model="deparment.orgcname" :placeholder="deparmentList.orgcname">
                        </div>
                        <!-- 联系电话 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.mobile}}</span>
                            <input class="add-department-btn" v-model="deparment.mobile" :placeholder="deparmentList.mobile">
                        </div>
                        <!-- 联系手机 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.phone}}</span>
                            <input class="add-department-btn" v-model="deparment.phone" :placeholder="deparmentList.phone">
                        </div>
                        <!-- 备注 -->
                        <div class="_dialog">
                            <span class="grid-content">{{deparmentList.remark}}</span>
                            <textarea v-model="deparment.remark"
                            style="vertical-align: top"
                            class="add-department-btn"
                            rows="3"
                            :placeholder="deparmentList.remark">
                            </textarea>
                        </div>   
                    </div>
                    <!-- 保存 -->
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" style="padding: 12px 38px;" @click="editOrgById">{{$buttonObj.save}}</el-button>
                    </span>
                </el-dialog>
                <!-- 删除部门 -->
                <el-dialog
                    :title="$promptObj.warn"
                    :visible.sync="centerDialogVisible"
                    width="330px"
                    center>
                    <span>{{$promptObj.delwarn}}</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{$buttonObj.cancel}}</el-button>
                        <el-button type="primary" @click="removeOrgById">{{$buttonObj.sure}}</el-button>
                    </span>
                </el-dialog>
                <!-- 添加成员 -->
                <el-dialog
                    :title="deparmentList.tit16"
                    :visible.sync="isAdd"
                    width="35%">
                    <div class="add-user">
                        <el-table :data="allPersonList" ref="multipleTable" @select = 'addPerple'>
                            <el-table-column  type="selection" prop='checked' width="60">
                            </el-table-column>
                            <!-- 昵称 -->
                            <el-table-column :label="deparmentList.tit25" width="200">
                                <template slot-scope="scope">
                                    <i class="iconfont icon-yonghu2" style="color: rgb(133, 172, 239);vertical-align: middle;display: inline-block;font-size: 28px"></i>
                                    <span>{{ scope.row.nickname }}</span>
                                </template>
                            </el-table-column>
                            <!-- 真实姓名 -->
                            <el-table-column prop="realname" :label="deparmentList.tit26">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-dialog>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { batchDelete,getCompanyOrgList,getInfo,getCompanyPersonList,removeOrgById,editOrgposusr,addOrg,editOrgById } from "./../../api/https.js";
import { deparmentInit } from "@/init/user.js";
import { getNowFormatDate,goDetail,getChoice,doChoice,closeIcon } from "./../../api/methods.js";
export default {
    data(){
        return{
            input: false,
            list:[],
            end: '组织机构',
            tableData: [],
            isAdd: false,
            showIndex: 0,
            checked: false,
            allPersonList: [],//公司人员列表
            orgList: [],//部门列表
            deparment: {
                orgename:'',//英文名称
                orgcname:'',//中文名称
                phone:'',//联系电话
                mobile:'',//联系手机
                remark:''//备注
            },//部门对象
            formArr: [],
            product:[],
            isCollapse: true,
            allCheck: '',//全选
            statesObj: {},
            deparmentList: {},//国际化
            isLeave: false,//是否离职
            isActivation: false,//是否激活
            isHear: false,//是否在职
            totalChoice:[],//点击数组
            totalChecked:[],//选择数组
            showChild: -1,//悬浮显示
            showBox: false,
            centerDialogVisible:false,//显示删除提示
            addDeparment: false,//显示添加部门
            editDeparment: false,//显示编辑部门
            deletshow:false,
            bordercolor:{
                color:'1px solid'+this.colorselects
            },
            windowHeight:''
        }
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        deparmentInit(this);
        this.getHeight();
        this.getData()
    },
    watch:{
        allPersonList:function(){
            this.allPersonList.forEach(e => {
                this.$nextTick( ()=> {
                    for (let num = 0; num < this.tableData.length; num++) {
                        if (e.psuserid == this.tableData[num].psuserid) {
                            this.$refs.multipleTable.toggleRowSelection(e,true);
                        }
                            
                    }
                })
            });
        }
    },
    methods:{
        getHeight(){
            this.windowHeight = this.$config.getHeight(220);
        },
        // 部门的点击操作
        editClick(str){
            for (const key in this.deparment) {
                this.deparment[key] = str == 'addDeparment' ?'' :  this.orgList[this.showIndex][key]
            }
            this.showBox = false;
            this[str] = true;
            this.showChild = -1;
        },
        // 非空验证
        checkDepartment(){
            if (this.deparment.orgename=='') {
                this.$message.error('英文名称不能为空');
                return false;
            } 
            if (this.deparment.orgcname=='') {
                this.$message.error('中文名称不能为空');
                return false;
            }
            return true;
        },
        //获取公司全体员工
        getCompanyPersonList(){
            this.isAdd = true;
            var obj = {
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        this.allPersonList = res.data.data;
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }

                }
            }
            getCompanyPersonList(obj)
        },
        //添加子机构
        addOrg(){
            var boo = this.checkDepartment(),
            obj = {
                self: this,
                success : res => {
                    if (res.data.message.indexOf("addSuccess") > -1) {
                        this.addDeparment = false;
                        this.getData();
                    } else {
                        this.$message.error(this.$promptObj.savefail);
                    }
                }
            }
            if(boo) addOrg(obj);
        },
        // 删除机构
        removeOrgById(){
            var obj = {
                orgid: this.orgList[this.showIndex].orgid,
                success : res => {
                    if (res.data.message.indexOf("removeSuccess") > -1) {
                        this.$message.success(this.$promptObj.removesuccess);
                        this.centerDialogVisible = false;
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.removefail);
                    }
                }
            }
            removeOrgById(obj)
        },
         // 编辑机构
         editOrgById(){
            var boo = this.checkDepartment(),
            obj = {
                self: this,
                success : res => {
                    if (res.data.message.indexOf("editSuccess") > -1) {
                        this.editDeparment = false;
                        this.getData()
                    } else {
                        this.$message.error(this.$promptObj.updatefail);
                    }
                }
            }
            if(boo) editOrgById(obj)
        },
        //添加/取消成员
        addPerple(rows,row){
            let selected = rows.length && rows.indexOf(row) !== -1
            var obj = {
                orgid: this.orgList[this.showIndex].orgid,
                data: row.psuserid + '@' + selected,
                success : respone => {
                    if (respone.data.message.indexOf("editSuccess") > -1) {
                        this.getOrgPersonList(this.showIndex)
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            editOrgposusr(obj)
        },
        //判断员工状态
        getStates(){
            // 已删除：-2
            // 未激活：-1
            // 已激活（在职）：0
            // 已停用（离职）：1
            this.formArr = [];
            if (this.isLeave) this.formArr.push(1);
            if (this.isActivation) this.formArr.push(-1);
            if (this.isHear) this.formArr.push(0);
            this.getOrgPersonList(this.showIndex)
        },
        // 获取部门员工
        getOrgPersonList(num){
            this.showIndex = num;
            var data = '',orgid;
            if (this.formArr.length > 0) {
                for (let index = 0; index < this.formArr.length; index++) {
                    data += 'states=' + this.formArr[index] + '&'
                }
                data = data.substring(0,data.length-1)
            }
            var obj = {
                infcMethod: "BHUserServiceInfc.getOrgPersonList",
                orgid: this.orgList[this.showIndex].orgid,
                data: data,
                success : res => {
                    var respone = JSON.parse(res)
                    if (respone.message.indexOf("getSuccess") > -1) {
                        this.tableData = respone.data;
                        for (let index = 0; index < this.tableData.length; index++) {
                            this.tableData[index].states = this.statesObj[this.tableData[index].states]
                        }
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getInfo(obj)
        },
        // 获取部门
        getData(){
            var obj = {
                success : res => {
                    if (res.data.message.indexOf("getSuccess") > -1) {
                        var array = res.data.data;
                        this.orgList = [];
                        for (let index = 0; index < array.length; index++) {
                            if( array[index].orgid != sessionStorage.orgid ) this.orgList.push(array[index])
                            else this.orgList.unshift(array[index])
                        }
                        this.getOrgPersonList(0)
                    } else {
                        this.$message.error(this.$promptObj.searchfail);
                    }
                }
            }
            getCompanyOrgList(obj)
        },
        delOne(){

        }
    }
}
</script>

<style scoped>
    .structure-content{
        padding: 20px;
        /* padding-bottom: 30px; */
        background-color: #fff;
        position: relative;
    }
    .el-aside{
        background-color: #f3f5f7;
        border-right: 1px solid #E2E2E2;
        padding: 10px 0 0 20px;
        line-height: 36px;
    }
    .eicb{
        position: relative;
        color: gray;
        border: 1px solid;
        float: right;
        margin: 10px 22px 0 0;
    }
    .show-dpt{
        padding-left: 8px;
        overflow: hidden;
    }
    .active-dpt{
        background: #d8d8d8;
    }
    .edit-content{
        position: absolute;
        left: 189px;
        padding: 10px 0px 20px;
        font-size: 14px;
        z-index: 99999;
        line-height: 20px;
        box-shadow: 2px 1px 5px #888888;
        background-color: #fbf7f7;
    }
    .edit-option{
        padding: 0px 10px;
        margin: 5px 0;
        color: black;
    }
    .edit-option:hover{
        background: #B6CCF0
    }
    ._dialog{
        font-size: 16px;
        padding: 8px 0;
    }
    .add-department-btn{
        width: 65%;
        border-radius: 3px;
        outline: none;
        border: 1px solid #E2E2E2;
        margin-left: 15px;
        line-height: 30px;
        text-indent: 1em;
        cursor: pointer;
    }
    .grid-content{
        text-align: right;
    }
    section{
        border: none !important;
    }
    ::-webkit-scrollbar {display: none;}
    .btn-fl{
        float:left;
        padding: 8px 20px;
        border: 0;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .ck-fr{
        float:right;
        margin-right:18px;
    }
    .txt-narp{
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
    .add-user{
        border-top: 1px solid #EDF7FF;
        min-height: 180px;
    }
</style>
