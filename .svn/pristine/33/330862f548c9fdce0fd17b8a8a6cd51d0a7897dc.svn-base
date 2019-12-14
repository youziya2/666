// 产品管理模块

import { getNameVal,getName } from "@/api/methods.js";


//产品基本信息
// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位
var lgObj = localStorage.languageObj ? JSON.parse(localStorage.languageObj) : '',
parvalObj = {
    gdcname: {name: "", val: '', select: false, must: true, notNull: '产品名称不能为空', units: '', num: 3}, //产品名称 
    subtypes: {name: "", val: 'L12', select: true, must: true, notNull: '产品型号不能为空', units: '', num: ''}, //产品型号001
    sizes: {name: "", val: '', select: false, must: true, notNull: '尺寸不能为空', units: '', num: 1},//尺寸
    vsid: {name: "", val: '', select: false, must: true, notNull: '产品版本不能为空', units: '', num: 3}, //产品版本001
    disk: {name: "", val: '', select: false, must: true, notNull: '机身存储不能为空', units: 'G', num: 1}, //机身储存001
    savetime: {name: "", val: '', select: false, must: true, notNull: '保存时间不能为空', units: '', num: ''}, //保存时间 
    colors: {name: "", val: '#4377ee', select: false, must: true, notNull: '产品颜色不能为空', units: '', num: ''}, //产品颜色0011
    power: {name: "", val: '', select: false, must: true, notNull: '产品功率不能为空', units: 'W', num: 1}, //产品功率001
    address: {name: "", val: '', select: false, must: false, units: '', num: 4}, //产品产地001
    weights: {name: "", val: '', select: false, must: false, units: '', num: 1}, //产品重量001 
    beginmac: {name: "开始MAC地址", val: '', select: false, must: true, notNull: '开始MAC地址不能为空', units: '', num: 6}, //开始MAC地址
    endmac: {name: "结束MAC地址", val: '', select: false, must: true, notNull: '结束MAC地址不能为空', units: '', num: 6}, //结束MAC地址
    lengths: {name: "", val: '', select: false, must: false, units: 'CM', num: 1}, //长度
    widths: {name: "", val: '', select: false, must: false, units: 'CM', num: 1}, //宽度
    heights: {name: "", val: '', select: false, must: false, units: 'CM', num: 1} //厚度      
  },
  //cpu
cpuObj = {
    cpubrid: {name: "", val: '', select: false, must: true, notNull: '品牌不能为空', units: '', num: 4}, //品牌
    cputype: {name: "", val: '', select: false, must: true, notNull: '型号不能为空', units: '', num: 4}, //型号
    cpucore: {name: "", val: '', select: false, must: true, notNull: '核心数量不能为空', units: '核', num: 1}, //核心数量
    cpuinfc: {name: "", val: '', select: false, must: true, notNull: '接口类型不能为空', units: '', num: 4}, //接口类型
    cpubfre: {name: "", val: '', select: false, must: true, notNull: '主频不能为空', units: 'GHz', num: 2}, //主频
    cputc: {name: "", val: '', select: false, must: true, notNull: '三级缓存不能为空', units: 'MB', num: 1}, //三级缓存
    cpupower: {name: "", val: '', select: false, must: true, notNull: '功率不能为空', units: 'W', num: 1}, //功率
    cpubits: {name: "", val: 'yes', select: true, must: true, notNull: '64位支持不能为空', units: '', num: ''} //64位支持
  },
  //内存
memeryObj = {
    mmbrid: {name: "", val: '', select: false, must: true, notNull: '品牌不能为空', units: '', num: 4}, //品牌
    mmtype: {name: "", val: '', select: false, must: true, notNull: '型号不能为空', units: '', num: 4}, //型号
    mmclass: {name: "", val: '', select: false, must: true, notNull: '类型不能为空', units: '', num: 4}, //类型
    mmvol: {name: "", val: '', select: false, must: true, notNull: '容量不能为空', units: 'GB', num: 2}, //容量
    mmspeed: {name: "", val: '', select: false, must: true, notNull: '速度不能为空', units: 'GB', num: 2}, //速度
    mmclv: {name: "", val: '', select: false, must: true, notNull: 'CL值不能为空', units: '', num: 2}, //CL值
    mmseque: {name: "", val: '', select: false, must: true, notNull: '时序不能为空', units: '', num: 2}, //时序
    mmvtg: {name: "", val: '', select: false, must: true, notNull: '工作电压不能为空', units: 'v', num: 2} //工作电压
},
// 格式提示
formatObj = {
    beginmac06: '开始MAC地址不正确',
    endmac06: '结束MAC地址不正确',
    gdcname03 : '产品名称为100位以内的字符串', 
    sizes01: '尺寸为12位以内的数字',
    vsid03: '产品版本为100位以内的字符串',
    disk01: '机身储存为12位以内的数字',
    power01: '产品功率为12位以内的数字',
    address04: '产品产地为150位以内的字符串',
    weights01: '产品重量为12位以内的数字', 
    // beginmac03: '开始MAC地址为100位以内的字符串',
    // endmac03: '结束MAC地址为100位以内的字符串',
    lengths01: '长度为12位以内的数字',
    widths01: '宽度为12位以内的数字',
    heights01: '厚度为12位以内的数字',
    cpubrid04: '品牌为150位以内的字符串',
    cputype04: '型号为150位以内的字符串',
    cpucore01: '核心数量为12位以内的数字',
    cpuinfc04: '接口类型为150位以内的字符串',
    cpubfre02: '主频为12位以内的数字且最多2位小数',
    cputc01: '三级缓存为12位以内的数字',
    cpupower01: '功率为12位以内的数字',
    mmbrid04: '品牌为150位以内的字符串',
    mmtype04: '型号为150位以内的字符串',
    mmclass04: '类型为150位以内的字符串',
    mmvol02: '容量为12位以内的数字且最多2位小数',
    mmspeed02: '速度为12位以内的数字且最多2位小数',
    mmclv02: 'CL值为12位以内的数字且最多2位小数',
    mmseque02: "时序为12位以内的数字且最多2位小数",
    mmvtg02: '工作电压为12位以内的数字且最多2位小数'
},
// 下拉框数组
arrObj = {
    subtypes: { "L12": "L12", "L18": "L18","L0D18" : "L0D18","HOD18": "HOD18"},
    cpubits : { 
      "yes": lgObj.select_yes || "是",
      "no": lgObj.select_no || "否"
    }
},
// 标准列表模块
listList = {
  subtypes:'产品型号', //产品型号
  vsid:'产品版本', //产品版本
  colors:'产品颜色', //产品颜色
  sizes:'产品尺寸', //产品尺寸
  weights:'产品重量', //产品重量
  power:'产品功率', //产品功率
  savetime:'生产日期', //生产日期
  address:'生产产地', //生产产地
},
// 标准对象
templateObj = {
  tit01: '产品标准',
  tit02: '标准录入',
  tit03: '标准列表',
  tit04: '产品参数',
  tit05: '内存',
  tit06: '默认空间配置',
  tit07: '产品搜索',
  tit08: '条件筛选',
  tit09: '全部',
  tit10: '系列',
  tit11: '基本参数',
  tit12: '云盘使用统计',
  tit13: '存储使用统计',
  tit14: '处理器信息',
  tit15: '内存信息',
  tit16: '产品描述(必填)',
  tit17: '产品图片',
  tit18: '请选择',
  tit19: '标准详情',
  tit20: '标准修改',
  tit21: '输入型号、名称的关键字',
  tit22: '产品描述',
  tit23: '总容量',
  tit24: '在用空间',
  tit25: '剩余空间',
  tit26: '产品描述不能为空',
  tit27: '该商品名称已存在'
},
// 单品对象
finishedObj = {
  tit01: '单品管理',
  tit02: '单品录入',
  tit03: '单品列表',
  tit04: '产品搜索',
  tit05: '产品信息',
  tit06: '单品详情',
  tit07: '单品修改',
  tit08: '请选择',
  tit09: '输入单品型号、名称或编号的关键字',
  tit10: '产品标准',
  tit11: '该单品名称已存在',
  tit12: '该mac地址已存在'
},
// 单品部分
finishedParvalObj = {
  gdid: {name:'产品标准', val:'', select: true, must: true, notNull: '产品标准不能为空'},//产品标准
  gdcode: {name:'单品编码', val:'', select: false, must: true, notNull: '单品编码不能为空'},//单品编码
  mac: {name:'MAC地址', val:'', select: false, must: true, notNull: 'MAC地址不能为空'},//MAC地址
  gdiname: {name:'单品名称',val: '', select: false, must: true, notNull: '单品名称不能为空'}//单品名称
},
// 单品列表模块
finishedList = {
  subtypes: '产品型号', //产品型号
  gdcode: '产品ID', //产品ID
  vsid: '产品版本', //产品版本
  colors: '产品颜色', //产品颜色
  sizes: '产品尺寸', //产品尺寸
  clouddisk: '产品云盘', //产品云盘
  power: '产品功率', //产品功率
  savetime: '生产日期', //生产日期
  address: '生产产地', //生产产地
};

// 标准对象
export function productInit(self){
  var obj = JSON.parse(localStorage.languageObj)
  self.list[0].name = obj.goods_tit01 || templateObj.tit01;
  self.list[1].name = obj.goodsitem_tit01 || finishedObj.tit01;
  self.inters[0].name = obj.goods_tit02 || templateObj.tit02;
  self.inters[1].name = obj.goods_tit03 || templateObj.tit03;
  self.space[0].name = obj.goodsitem_tit02 || finishedObj.tit02;
  self.space[1].name = obj.goodsitem_tit03 || finishedObj.tit03;
}

// 标准对象
export function templateInit(self){
  self.templateObj = getName('goods', templateObj)
}
// 标准对象
export function formatInit(){
  var obj = getName('goods', formatObj)
  return obj
}

// 标准录入
export function enterInit(self){
    self.parvalObj = getNameVal('goods', parvalObj, arrObj)
    self.cpuObj = getNameVal('goods', cpuObj, arrObj)
    self.memeryObj = getNameVal('goods', memeryObj, arrObj)
}
// 标准列表
export function listInit(self){
  self.listList = getName('goods', listList);
}

// 标准详情
export function detailInit(self){
  self.parvalObj = getNameVal('goods', parvalObj, arrObj)
  self.cpuObj = getNameVal('goods', cpuObj, arrObj)
  self.memeryObj = getNameVal('goods', memeryObj, arrObj)
}

//标准修改
export function changeInit(self, obj){
  self.parvalObj = getNameVal('goods', parvalObj, arrObj, obj)
  self.cpuObj = getNameVal('goods', cpuObj, arrObj, obj)
  self.memeryObj = getNameVal('goods', memeryObj, arrObj, obj)
}


// 单品对象
export function finishedInit(self){
  var obj = JSON.parse(localStorage.languageObj);
  self.finishedObj = getName('goodsitem', finishedObj);
}
// 单品录入
export function finishedEnterInit(self,obj){
  self.finishedParvalObj = getNameVal('goodsitem', finishedParvalObj, obj)
}

// 单品列表
export function finishedListInit(self){
  self.listList = getName('goods', finishedList)
}
// 单品详情
export function finishedDetailInit(self, arrObj, obj){
  self.finishedParvalObj = getNameVal('goodsitem', finishedParvalObj, arrObj, obj)
}