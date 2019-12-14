// 应用管理模块

import { getNameVal,getName } from "@/api/methods.js";
// 新增应用
// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填
 //主题
var entity = 'apps', 
lgObj = JSON.parse(localStorage.languageObj),
appObj = {
    appcname: {name: "应用名称", val: '', select: false, must: true, notNull: '应用名称不能为空'},//应用名称
    appename: {name: "应用英文名", val: '', select: false, must: true, notNull: '应用英文名不能为空'},//应用英文名
    subtypes: {name: "应用类型", val: '', select: true, must: true, notNull: '应用类型不能为空'}, //应用类型
    version: {name: "软件版本", val: '', select: false, must: true, notNull: '软件版本不能为空'}, //软件版本
    copyright: {name: "版权公司", val: '', select: false, must: true, notNull: '版权归属不能为空'}, //版权归属 
    savetime: {name: "发布日期", val: '', select: false, must: true, notNull: '发布日期不能为空'}, //发布日期
    urls: {name: "第三方应用URL", val: '', select: false, must: false, notNull: ''}, //第三方应用URL
    isfree: {name: "收费方式", val: '', select: true, must: true, notNull: '收费方式不能为空'}, //收费方式
    content: {name: "版本说明", val: '', select: false, must: true, notNull: '版本说明不能为空'}, //版本说明
    remark: {name: "应用说明", val: '', select: false, must: true, notNull: '应用说明不能为空'} //应用说明   
},
// 下拉框数组
arrObj = {
    subtypes: {
        educa: lgObj.select_educa || '教育',
        tools: lgObj.select_tools || '工具',
        entertain: lgObj.select_entertain || '娱乐',
        'office': lgObj.select_office || '办公' , 
        others: lgObj.select_others || '其他',
        // 'game': lgObj.select_game || '游戏', 
        // 'video': lgObj.select_video || '视频', 
        // 'browser': lgObj.select_browser || '浏览器',
        // 'chat': lgObj.select_chat || '聊天', 
        // 'typewriting': lgObj.select_typewriting || '输入法', 
        // 'music': lgObj.select_music || '音乐',
        // 'download': lgObj.select_download || '下载' , 
        // 'decompression': lgObj.select_decompression || '解压刻录',
        // 'picture': lgObj.select_picture || '图片', 
        // 'systemTool': lgObj.select_systemtool || '系统', 
        // 'safe': lgObj.select_safe || '安全',
        // 'drive': lgObj.select_drive || '驱动', 
        // 'mobile': lgObj.select_mobile || '手机' , 
        // 'programming': lgObj.select_programming ||  '编程',
        // 'shares': lgObj.select_shares || '股票', 
        // 'network': lgObj.select_network || '网络', 
        // 'desktop': lgObj.select_desktop || '桌面'
    },
    isfree:{
        'yes': lgObj.select_free || '免费', 
        'no':  lgObj.select_fee || '收费'
    }
},
allObj =  {'all': lgObj.select_all || '全部'},
listList = {
    subtypes: '应用分类',
    version: '软件版本',
    isfree: '收费方式',
    savetime: '发布日期',
    copyright: '版权公司'
},
detailList = {
    savetime: '发布日期',
    size: '软件大小',
    version: '版本号',
    subtypes: '应用分类',
    remark: '软件介绍'
},
appInit = {
    tit01: '新增应用',
    tit02: '应用信息',
    tit03: '应用列表',
    tit04: '应用搜索',
    tit05: '条件筛选',
    tit06: '全部',
    tit07: '应用安装包',
    tit08: '应用图标',
    tit09: '应用图片',
    tit10: '应用管理',
    tit11: '输入应用类型、名称',
    tit12: '应用修改',
    tit13: '应用包名',
    tit14: '该应用中文名已存在',
    tit15: '该应用英文名已存在'
};


//应用
export function appInit(self){
    self.appInit = getName(entity, appInit);
    var obj = JSON.parse(localStorage.languageObj)
    self.list[0].name = obj.apps_tit01 || appInit.tit01;
    self.list[1].name = obj.apps_tit03 || appInit.tit03;
}

//应用录入
export function enterApp(self){
    self.appObj = getNameVal(entity, appObj, arrObj);
}

// 应用列表
export function listInit(self){
    self.applicationObj = Object.assign({}, allObj, arrObj.subtypes);
    self.feeMethodObj = arrObj.isfree;
    self.listList = getName(entity, listList);
}

// 应用详情
export function detailInit(self){
    self.applications = arrObj.subtypes;
    self.detailList = getName(entity, detailList);
}

//应用修改
export function changeInit(self, obj){
    self.appObj = getNameVal(entity, appObj, arrObj, obj);
}


//应用统计
export function subtypesInit(self, obj){
    self.subtypes = Object.assign({}, allObj, arrObj.subtypes);;
}