// 系统版本模块

import { getNameVal,getName } from "@/api/methods.js";


//版本基本信息
// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位
var version = 'versions',
lgObj = JSON.parse(localStorage.languageObj),
versionObj = {
    swename: {name: "英文名称", val: '', select: false, must: true, notNull: '英文名称不能为空', units: ''}, //英文名称 
    types: {name: "软件类型", val: '', select: true, must: true, notNull: '软件类型不能为空', units: ''}, //软件类型
    ustype: {name: "用户类型", val: '', select: true, must: true, notNull: '用户类型不能为空', units: ''}, //用户类型 
    curver: {name: "版本号", val: '', select: false, must: true, notNull: '版本号不能为空', units: ''},//版本号
    solecode: {name: "识别码", val: '', select: false, must: true, notNull: '识别码不能为空', units: ''}, //识别码
    mdfive: {name: "MD5", val: '', select: false, must: false, units: ''}, //MD5
    urls: {name: "访问路径", val: '', select: false, must: false, units: 1}, //访问路径 
    savetime: {name: "保存时间", val: '', select: false, must: true, notNull: '保存时间不能为空', units: ''}, //保存时间
    states: {name: "状态", val: '', select: true, must: true, notNull: '状态不能为空', units: ''}, //状态
    remark: {name: "备注", val: '', select: false, must: false, units: ''}, //备注
    content: {name: "版本说明", val: '', select: false, must: false, units: ''} //版本说明 
},
// 下拉框数组
arrObj = {
    ustype: {
        standard: lgObj.select_standard || '标准版本',
        custom: lgObj.select_custom || '订制版本'
    },
    types: {
        application: lgObj.select_application || '应用软件(APP)',
        system: lgObj.select_system || '系统平台(SYS)'
    },
    states: {
        '0': lgObj.select_sys0 || '启用',
        '1': lgObj.select_sys1 || '停用'
    }
}, 
systemObj = {
    tit01: '版本管理',
    tit02: '新增版本',
    tit03: '版本列表',
    tit04: '系统版本',
    tit05: '版本搜索',
    tit06: '版本详情',
    tit07: '基本参数',
    tit08: '版本修改',
    tit09: '应用安装包'
},
//列表
companyList = {
    curver: '版本号',
    solecode: '识别码',
    swename: '英文名称'
},
//详情
versionList = {
    swename: "英文名称", //英文名称 
    types: "软件类型", //软件类型
    ustype: "用户类型", //用户类型 
    curver: "版本号",//版本号
    solecode: "识别码", //识别码
    mdfive: "MD5", //MD5
    urls: "访问路径",  //访问路径 
    savetime: "保存时间", //保存时间
    states: "状态", //状态
    remark: "备注", //备注
    content: "版本说明"  //版本说明 
}
//系统参数
export function systemPublc(self){
    self.systemObj = getName(version , systemObj);
}
//系统录入
export function systemAdd(self){
    self.versionObj = getNameVal(version , versionObj, arrObj);
    self.versionObj.ustype.select = arrObj.ustype;
    self.versionObj.types.select = arrObj.types;
    self.versionObj.states.select = arrObj.states;
}
//系统列表
export function systemList(self){
    self.companyList = getName(version , companyList);
}
//系统详情
export function systemDetail(self){
    self.versionObj = getName(version , versionList);
    self.ustype = arrObj.ustype;
    self.types = arrObj.types;
    self.states = arrObj.states;
}