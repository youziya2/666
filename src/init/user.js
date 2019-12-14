// 用户管理模块

import { getNameVal,getName } from "@/api/methods.js";



// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位
var person = "person",company = 'company',
lgObj = JSON.parse(localStorage.languageObj),
// 个人用户
userInfo = {
    realname:{name:'客户名称',val:'',select:false,must:true, notNull: '客户名称不能为空', disable: true}, //客户名称(必填)
    mobile:{name:'手机号码',val:'',select:false,must:true, notNull: '手机号码不能为空'}, //手机号码（必填）
    password:{name:'密码',val:'',select:false,must:true, notNull: '密码不能为空'},//密码（必填）
    rlename:{name:'用户角色',val:'',select:true,must:true, notNull: '用户角色不能为空'}//用户角色(下拉框)
},
moreInfo = {
    sex:{name:'性别',val:'',must:false,select:true}, //性别(下拉框)
    lictype:{name:'证件类型',val:'',must:false,select:true}, //证件类型(下拉框)
    liscnum:{name:'证件号码',val:'',must:false,select:false}, //证件号码
    birthday:{name:'生日',val:'',must:false,select:false}, //生日
    linkman:{name:'联系人',val:'',must:false,select:false}, //联系人
    email:{name:'邮箱',val:'',must:true, notNull: '邮箱不能为空',select:false}, //邮箱
    qq:{name:'QQ',val:'',must:false,select:false}, //QQ
    weixin:{name:'微信',val:'',must:false,select:false}, //微信
    dttid:{name:'所属地区',val:'',must:true, notNull: '所属地区不能为空',select:false}, //所属地区（必填）
    address:{name:'联系地址',val:'',must:true, notNull: '联系地址不能为空',select:false}, //联系地址（必填）
    remark:{name:'备注',val:'',must:false,select:false}, //备注
    sectorid:{name:'所属部门',val:'',must:true, notNull: '所属部门不能为空', select:true} //所属部门（必填）
},

// 企业用户
userInfo01 = {
    realname:{name:'公司名称',val:'',select:false,must:true, notNull: '公司名称不能为空',disable: true}, //公司名称(必填)
    mobile:{name:'手机号码',val:'',select:false,must:true, notNull: '手机号码不能为空'}, //联系电话（必填）
    password:{name:'密码',val:'',select:false,must:true, notNull: '密码不能为空'},//密码（必填）
    bistype:{name:'企业类型',val:'',select:true,must:true, notNull: '企业类型不能为空'}//企业类型(下拉框)
},
moreInfo01 = { 
    lictype:{name:'证件类型',val:'',must:false, select:true}, //证件类型(下拉框)
    liscnum:{name:'营业执照',val:'',must:false, select:false}, //法定代表人
    corporate:{name:'注册时间',val:'',must:false, select:false}, //成立（注册时间）
    bankacc:{name:'银行账户',val:'',must:false, select:false}, //银行账户
    depbank:{name:'开户银行',val:'',must:false, select:false}, //开户银行
    recapital:{name:'注册资本',val:'',must:false, select:false}, //注册资本
    operlimit:{name:'营业期限',val:'',must:false, select:false}, //营业期限
    apprdate:{name:'核准日期',val:'',must:false, select:false}, //核准日期
    address:{name:'公司地址',val:'',must:true, notNull: '公司地址不能为空',select:false}, //公司地址
    phone:{name:'公司联系电话',val:'',must:false, select:false}, //公司联系电话
    dttid:{name:'所属区域',val:'',must:true, notNull: '所属区域不能为空',select:false}, //所属区域
    salesman:{name:'业务员',val:'',must:false, select:false}, //业务员
    qualifica:{name:'资格',val:'',must:false, select:false}, //资格
    states:{name:'对象状态',val:'',must:false, select:false}, //对象状态
    worktype:{name:'经营类别',val:'',must:false, select:false}, //经营类别
    busscope:{name:'经营范围',val:'',must:false, select:false}, //经营范围
    licattach:{name:'营业执照附件名称',val:'', must:false, select:false}, //营业执照附件名称
    remark:{name:'备注',val:'',must:false, select:false}, //备注
},


// 下拉框数组
arrObj = {
    rlename: sessionStorage.mrlename == 'super' ? {
        'member': lgObj.select_member || '平板机用户',
        'manager': lgObj.select_manager || '管理员'
    } : {'member': lgObj.select_member || '平板机用户'},
    sex: {
        'man': lgObj.select_man || '男',
        'woman': lgObj.select_woman || '女'
    },
    lictype: {
        '1': lgObj.select_user1 || '身份证', 
        '2': lgObj.select_user2 || '户口本',
        '3': lgObj.select_user3 || '驾驶证',
        '4': lgObj.select_user4 || '军人证',
        '5': lgObj.select_user5 || '学生证'
    },
    bistype: {
        'soleProprietor': lgObj.select_soleproprietor || '个人独资', 
        'proprietor': lgObj.select_proprietor || '独资', 
        'beNationaliz': lgObj.select_benationaliz || '国有', 
        'privatelyOwn': lgObj.select_privatelyown || '私营',
        'publicOwner': lgObj.select_publicowner || '全民所有制', 
        'colleOwner': lgObj.select_colleowner || '集体所有制', 
        'limited': lgObj.select_limited || '有限责任', 
        'shareholding': lgObj.select_shareholding || '股份制'
    }
},
personList = {
    realname:'用户名称', //用户名称
    mobile:'手机号码',//手机号码
    rlename:'用户角色',//用户角色m,n 
    userName:'用户账号',//用户账号
    dttid:'所属地区',//所属地区
    address:'联系地址'//联系地址
},
orgPersonList = {
    realname:'用户名称', //用户名称
    mobile:'手机号码',//手机号码
    username:'用户账号',//用户账号
    sectorid:'所属部门',//用户账号
    email:'邮箱',//邮箱
    address:'联系地址'//联系地址
},
companyList = {
    realname:'公司名称', //公司名称
    address:'联系地址',//联系地址
    mobile:'用户名称',//用户名称即手机号码
    cpuserid:'用户ID',//用户ID
    bistype:'企业类型',//企业类型
    lictype:'证件类型',//证件类型
    liscnum:'营业执照',//营业执照
    worktype:'经营类别',//经营类别
    phone:'联系电话',//联系电话
    email:'联系邮箱',//联系邮箱
    clouddisk:'云盘大小',//联系方式
    cdlimit:'云盘有效期',//联系地址
},
userObj = {
    tit01: '个人用户',
    tit02: '新增用户',
    tit03: '用户基本信息',
    tit04: '更多信息',
    tit05: '增值空间',
    tit06: '用户列表',
    tit07: '用户搜索',
    tit08: '企业用户',
    tit09: '输入关键字搜索',
    tit10: '用户列表',
    tit11: '修改用户',
    tit12: '用户信息',
    tit14: '组织机构',
    tit13: '暂无',
    tit32: '该用户名称已存在',
    tit33: '该企业名称已存在'
},


// 组织机构
deparmentList = {
    tit14: '组织机构',
    tit15: '公司组织机构',
    tit16: '添加成员',
    tit18: '在职',
    tit19: '未激活',
    tit20: '离职',
    orgename:'英文名称',
    orgcname:'中文名称',
    phone:'联系电话',
    mobile:'联系手机',
    remark:'备注',
    tit21: '添加部门',
    tit22: '编辑部门',
    tit23: '删除部门',
    tit24: '成员',
    tit25: '昵称',    
    tit26: '真实姓名',
    tit27: '电话号码',
    tit28: '邮箱',
    tit29: '部门',
    tit30: '职位',
    tit31: '状态',
    tit34: '操作'
},
statesObj = {
    "-2": lgObj.user_deleted || "已删除",// 已删除：-2
    "-1": lgObj.user_tit19 || "未激活",// 未激活：-1
    "0": lgObj.user_tit18 || "在职",// 已激活（在职）：0
    "1": lgObj.user_tit20 || "离职"// 已停用（离职）：1
};

//组织机构
export function deparmentInit(self){
    self.deparmentList = getName('user', deparmentList);
    self.statesObj = statesObj;
    self.end = self.deparmentList.tit14;
}

//用户对象
export function userInit(self,str){
    self.userObj = getName('user', userObj);
    if(str) return false;
    self.list[0].name = self.userObj.tit01;
    if (sessionStorage.mrlename == 'super') {
        self.list[1].name = self.userObj.tit08;
        self.list[2].name = self.userObj.tit14;
    } else {
        self.list[1].name = self.userObj.tit14;
    }
    self.NUser[0].name = self.userObj.tit02;
    self.NUser[1].name = self.userObj.tit06;
    self.BUser[0].name = self.userObj.tit08;
    self.BUser[1].name = self.userObj.tit06;
}

// 个人用户录入
export function personEnterInit(self){
    self.userInfo = getNameVal(person, userInfo, arrObj);
    self.moreInfo = getNameVal(person, moreInfo, arrObj);
    delete self.moreInfo.orgid;
}
// 组织机构添加人员
export function addPersonInit(self){
    self.userInfo = getNameVal(person, userInfo, arrObj);
    delete self.userInfo.rlename;
    self.moreInfo = getNameVal(person, moreInfo, arrObj);
    delete self.moreInfo.dttid;
}

// 个人用户列表,个人用户详情
export function personListInit(self){
    self.personList = getName(person, personList);
    self.rlename = getName(person, arrObj.rlename);
}
// 组织机构个人用户详情
export function orgPersonListInit(self){
    self.personList = getName(person, orgPersonList);
}

// 企业用户录入
export function companyEnterInit(self){
    self.userInfo = getNameVal(company, userInfo01, arrObj);
    self.moreInfo = getNameVal(company, moreInfo01, arrObj);
}


// 企业用户列表,企业用户详情
export function companyListInit(self){
    self.companyList = getName(company, companyList);
    self.bistype = getName(company, arrObj.bistype);
    self.lictype = getName(company, arrObj.lictype);
}