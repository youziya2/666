// 大数据模块

import { getNameVal,getName } from "@/api/methods.js";
// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位
var entity = 'bigdata',
searchObj = {
    starttime: {name: "开始时间", val: ''}, //开始时间
    endtime: {name: "结束时间", val: ''}, //结束时间
    province: {name: "省份", val: ''}, //省份
    city: {name: "地区", val: ''}, //地区
},
bigdataObj = {
    tit18: '基础数据',
    tit19: '同比数据',
    tit20: '应用统计',
    tit21: '产品搜索',
    tit22: '条件筛选',
    tit23: '全部',
    tit25: '选择日期',
    tit26: '年',
    tit27: '月',
    tit28: '日',
    tit29: '大数据分析',
    tit30: '数据加载失败',
    tit31: '开始时间不能小于结束时间',
    tit32: '查询区间暂无数据',
    tit33: '全国',
    tit34: '暂无数据',
    tit35: '近期',
    tit36: '上一期',
},
// 注册
uhObj = {
    tit01: '用户习惯分析',
    tit02: '注册统计',
    tit03: '注册量示意图(时间维度)',
    tit04: '注册量示意图(地区维度)',
    tit38: '注册量(次)',
    tit39: '用户注册统计总数'
},
// 开机
uuObj = {
    tit01: '用户习惯分析',
    tit05: '开机统计',
    tit06: '开机量示意图(时间维度)',
    tit07: '开机量示意图(地区维度)',
    tit40: '开机量(次)',
    tit41: '开机量统计总数'
},
// 会议
umObj = {
    tit01: '用户习惯分析',
    tit08: '会议频率',
    tit09: '会议量示意图(时间维度)',
    tit10: '会议量示意图(地区维度)',
    tit42: '会议量(次)',
    tit43: '会议量统计总数'
},
// 文件
ufObj = {
    tit11: '产品使用分析',
    tit12: '文件统计',
    tit13: '文件量示意图(时间维度)',
    tit14: '文件量示意图(地区维度)',
    tit44: '文件量(次)',
    tit45: '文件量统计总数'
},
// 云盘
ucObj = {
    tit11: '产品使用分析',
    tit15: '云盘统计',
    tit16: '云盘使用量示意图(时间维度)',
    tit17: '云盘使用量示意图(地区维度)',
    tit46: '云盘使用量(次)',
    tit47: '云盘使用量统计总数'
},
// 应用
upObj = {
    tit11: '产品使用分析',
    tit20: '应用统计',
    tit21: '产品搜索',
    tit22: '条件筛选',
    tit23: '全部',
    tit24: '请输入关键字搜索',
    tit48: '应用',
    tit49: '排名',
    tit50: '类别',
    tit51: '最后更新',
    tit52: '使用次数',
    tit53: '版权公司',
},
// 标题
titleObj = {
    tit01: '用户习惯分析',
    tit11: '产品使用分析',
    tit12: '文件统计',
    tit15: '云盘统计',
    tit20: '应用统计',
    tit02: '注册统计',
    tit05: '开机统计',
    tit08: '会议频率'
}

//注册统计
export function bigInit(self){
    var obj = getName(entity, titleObj);  
    self.list[0].name = obj.tit01;
    self.list[1].name = obj.tit11;
    self.liang[0].name = obj.tit12;
    self.liang[1].name = obj.tit15;
    self.liang[2].name = obj.tit20;
    self.habit[0].name = obj.tit02;
    self.habit[1].name = obj.tit05;
    self.habit[2].name = obj.tit08;
}
    
function total(self){
    self.searchObj = getNameVal(entity, searchObj);
    self.bigdataObj = getName(entity, bigdataObj);
    self.list[0].router = self.bigdataObj.tit29;
    self.yjObj.year = self.bigdataObj.tit26;
    self.yjObj.month = self.bigdataObj.tit27;
    self.yjObj.day = self.bigdataObj.tit28;
}


//注册统计
export function registeredInit(self){
    total(self);
    self.uhObj = getName(entity, uhObj); 
    self.list[1].router = self.uhObj.tit01;
    self.end = self.uhObj.tit02;  
}

//开机统计
export function openInit(self){
    total(self);
    self.uuObj = getName(entity, uuObj); 
    self.list[1].router = self.uuObj.tit01;
    self.end = self.uuObj.tit05;  
}

//会议统计
export function meetingInit(self){
    total(self);
    self.umObj = getName(entity, umObj); 
    self.list[1].router = self.umObj.tit01;
    self.end = self.umObj.tit08;  
}

//文件统计
export function fileInit(self){
    total(self);
    self.ufObj = getName(entity, ufObj); 
    self.list[1].router = self.ufObj.tit11;
    self.end = self.ufObj.tit12;  
}

//云盘统计
export function panInit(self){
    total(self);
    self.ucObj = getName(entity, ucObj); 
    self.list[1].router = self.ucObj.tit11;
    self.end = self.ucObj.tit15;  
}

//应用统计
export function appInit(self){
    var obj = getName(entity, bigdataObj);
    self.list[0].router = obj.tit29;
    self.upObj = getName(entity, upObj); 
    self.list[1].router = self.upObj.tit11;
    self.end = self.upObj.tit20;  
}