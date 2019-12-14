// 主板管理模块

import { getNameVal,getName } from "@/api/methods.js";


//主板录入参数
// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位

var mainboard = 'mainboard',mbitem = 'mbitem',
lgObj = JSON.parse(localStorage.languageObj),
parvalObj = {
    types: {name: "主板大类", val: 'tvmb', select: true, must: true, notNull: '主板大类不能为空', units: ''}, //主板大类 
    subtypes: {name: "主板子类", val: '', select: true, must: true, notNull: '主板子类不能为空', units: ''}, //主板子类
    mbname: {name: "主板名称", val: '', select: false, must: true, notNull: '主板名称不能为空', units: ''}, //主板名称 
    modnum: {name: "主板型号", val: '', select: false, must: true, notNull: '主板型号不能为空', units: ''},//主板型号
    gpu: {name: "GPU", val: '', select: false, must: true, notNull: 'GPU不能为空', units: ''}, //GPU
    ram: {name: "RAM", val: '', select: false, must: true, notNull: 'RAM不能为空', units: ''}, //RAM
    flash: {name: "Flash", val: '', select: false, must: true, notNull: 'Flash不能为空', units: ''}, //Flash 
    sdcard: {name: "SDCard", val: '', select: false, must: false, units: ''}, //SDCard
    cpu: {name: "CPU", val: '', select: false, must: false, units: ''}, //CPU
    arvs: {name: "Android Version", val: '', select: false, must: false, units: ''}, //Android Version
    resolution: {name: "分辨率", val: '', select: false, must: false, units: ''}, //分辨率 
    cmos: {name: "芯片", val: '', select: false, must: false, units: ''}, //芯片
    atv: {name: "ATV", val: '', select: false, must: false, units: ''}, //ATV
    dtv: {name: "DTV", val: '', select: false, must: false, units: ''} //DTV 
  },//主板规则基本信息
listList = {
    types: "主板大类", //主板大类 
    subtypes: "主板子类", //主板子类
    modnum: "主板型号",//主板型号
    gpu: "GPU", //GPU
    ram: "RAM", //RAM
    flash: "Flash" //Flash               
},
// 规则详情列表
parvalList = {
  mbname: '主板名称',
  types: "主板大类", //主板大类 
  subtypes: "主板子类", //主板子类
  modnum: "主板型号",//主板型号
  gpu: "GPU", //GPU
  ram: "RAM", //RAM
  flash: "Flash", //Flash
  sdcard: "SDCard", //SDCard
  cpu: "CPU", //CPU
  arvs: "Android Version", //Android Version
  resolution:"分辨率", //分辨率 
  cmos: "芯片", //芯片
  atv: "ATV", //ATV
  dtv: "DTV" //DTV 
},
  // 下拉框数组
arrObj = {
  typesObj :{
    'tvmb': lgObj.select_tvmb || 'TV主板',
    'seniormb': lgObj.select_seniormb || '高级主板'
  },
  subtypesObj : {
    tvmb:{
      'veneer': lgObj.select_veneer || '单板', 
      'trinity': lgObj.select_trinity || '三合一板'
    },
    seniormb:{
      'veneer': lgObj.select_veneer || '单板', 
      'fiveinone': lgObj.select_fiveinone || '五合一板', 
      'subcard': lgObj.select_subcard || '子卡'
    }
  },
}, 
// 主板录入
finishedParvalObj = {
  mbid: {name: "主板规则", val: '', select: true, must: true, notNull: '主板规则不能为空', units: ''}, //主板规则 
  series: {name: "主板序列号", val: '', select: false, must: true, notNull: '主板序列号不能为空', units: ''}, //主板序列号
  mac: {name: "MAC地址", val: '', select: false, must: true, notNull: 'MAC地址不能为空', units: ''},//MAC地址
},
  mainboardObj = {
    tit01: '主板规格',
    tit02: '规格列表',
    tit03: '主板搜索',
    tit04: '主板参数',
    tit05: '主板图片',
    tit06: '规格录入',
    tit07: '基本参数',
    tit09: '描述',
    tit08: '规格修改',
    tit10: '主板大类',
    tit12: '主板型号',
    tit11: '主板子类',
    tit13: '该主板名已存在',
    tit14: '该主板型号已存在'
  },
  mbitemObj = {
    tit01: '主板录入',
    tit02: '主板信息',
    tit03: '主板列表',
    tit04: '主板大类',
    tit05: '主板子类',
    tit06: '主板规则',
    tit07: '主板单品',
    tit08: '主板搜索',
    tit09: '基本参数',
    tit10: '描述',
    tit11: '单品修改',
    tit12: '该序列号已存在',
    tit13: '该mac地址已存在'
  }
//规格参数
export function mainboardPublc(self){
  self.mainboardObj = getName(mainboard , mainboardObj);
}
//规格录入
export function mainboardInit(self){
    self.parvalObj = getNameVal(mainboard , parvalObj, arrObj);
    self.typesObj = arrObj.typesObj;
    self.subtypesObj = arrObj.subtypesObj;
    self.parvalObj.types.select = self.typesObj;
    self.parvalObj.subtypes.select = self.subtypesObj[self.parvalObj.types.val];
}
//规格列表//主板列表
export function templateList(self){
  self.typesObj = arrObj.typesObj;
  self.subtypesObj = arrObj.subtypesObj;
  self.listList = getName(mainboard, listList);
}
//规格详情//主板详情
export function templateDetail(self){
  self.typesObj = arrObj.typesObj;
  self.subtypesObj = arrObj.subtypesObj;
  self.parvalList = getName(mainboard, parvalList);
}
//规格修改
export function templateUpdate(self){
  self.parvalObj = getNameVal(mainboard , parvalObj, arrObj);
  self.typesObj = arrObj.typesObj;
  self.subtypesObj = arrObj.subtypesObj;
}


//主板参数
export function mbitemPublc(self){
  self.mbitemObj = getName(mbitem , mbitemObj);
}
//主板录入
export function mbitemInit(self){
  self.finishedParvalObj = getNameVal(mbitem , finishedParvalObj, arrObj);
}
//主板修改
export function mbitemUpdate(self){
  self.finishedParvalObj = getNameVal(mainboard , parvalObj, arrObj);
}