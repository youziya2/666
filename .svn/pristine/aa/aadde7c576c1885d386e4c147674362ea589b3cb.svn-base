// 桌面管理模块


import { getNameVal,getName } from "@/api/methods.js";

// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填
 //主题
var entity = 'desktop', 
themeObj = {
    dpcname: {name: "主题名称", val: '', select: false, must: true, notNull: '主题名称不能为空'}, //主题名称
    subtypes: {name: "主题类别", val: '', select: true, must: true, notNull: '主题类别不能为空'}, //主题类别
    isfree: {name: "收费方式", val: '', select: true, must: true, notNull: '收费方式不能为空'}, //收费方式
    savetime: {name: "发布日期", val: '', select: false, must: true, notNull: '发布日期不能为空'}, //发布日期
    remark: {name: "主题说明", val: '', select: false, must: true, notNull: '主题说明不能为空'} //主题说明
},
fontObj = {
    dpcname: {name: "字体名称", val: '', select: false, must: true, notNull: '字体名称不能为空'}, //字体名称
    subtypes: {name: "字体类别", val: '', select: true, must: true, notNull: '字体类别不能为空'}, //字体类别
    isfree: {name: "收费方式", val: '', select: true, must: true, notNull: '收费方式不能为空'}, //收费方式
    savetime: {name: "发布日期", val: '', select: false, must: true, notNull: '发布日期不能为空'}, //发布日期
    remark: {name: "字体说明", val: '', select: false, must: true, notNull: '字体说明不能为空'} //字体说明
},
animationObj = {
    dpcname: {name: "视频名称", val: '', select: false, must: true, notNull: '视频名称不能为空'}, //视频名称
    subtypes: {name: "视频类别", val: '', select: true, must: true, notNull: '视频类别不能为空'}, //视频类别
    isfree: {name: "收费方式", val: '', select: true, must: true, notNull: '收费方式不能为空'}, //收费方式
    savetime: {name: "发布日期", val: '', select: false, must: true, notNull: '发布日期不能为空'}, //发布日期
    remark: {name: "视频说明", val: '', select: false, must: true, notNull: '视频说明不能为空'} //视频说明
},
// 下拉框数组
arrObj = {
    subtypes: {'cartoon': '卡通动漫','individuation': '炫酷个性','festival': '节日风景'},
    isfree:{'yes': '免费', 'no': '收费'}
},
arrObj01 = {
    subtypes: {'handwriting': '书法体','boldface': '黑体','cartoon': '卡通体'},
    isfree:{'yes': '免费', 'no': '收费'}
},
allObj =  {'all': JSON.parse(localStorage.languageObj).desktop_tit09},
desktop = {
    tit01: '开机动画管理',
    tit02: '动画上传',
    tit03: '开机动画信息',
    tit04: '动画列表',
    tit05: '主题管理',
    tit06: '主题上传',
    tit07: '主题列表',
    tit08: '条件筛选',
    tit09: '全部',
    tit10: '卡通动漫',
    tit11: '炫酷个性',
    tit12: '节日风情',
    tit13: '字体管理',
    tit14: '字体上传',
    tit15: '字体列表',
    tit16: '书法体',
    tit17: '黑体',
    tit18: '卡通体',
    tit19: '免费',
    tit20: '收费',
    tit21: '桌面管理',
    tit22: '选择日期',
    tit23: '视频文件',
    tit24: '文件',
    tit25: '图片',
    tit26: '主题信息',
    tit27: '主题文件',
    tit28: '字体信息',
    tit29: '字体文件',
    tit30: '请选择',
    tit31: '该视频名称已存在',
    tit32: '该主题名称已存在',
    tit33: '该字体名称已存在'
};
//
export function desktopInit(self){
    self.desktop = getName(entity, desktop);
    arrObj.subtypes.cartoon = self.desktop.tit10;
    arrObj.subtypes.individuation = self.desktop.tit11;
    arrObj.subtypes.festival = self.desktop.tit12;
    arrObj.isfree.no = self.desktop.tit19;
    arrObj.isfree.yes = self.desktop.tit20;  
    arrObj01.subtypes.handwriting = self.desktop.tit16;
    arrObj01.subtypes.boldface = self.desktop.tit17;
    arrObj01.subtypes.cartoon = self.desktop.tit18;
    arrObj01.isfree.no = self.desktop.tit19;
    arrObj01.isfree.yes = self.desktop.tit20; 
}


//主题录入
export function enterTheme(self){
    self.desktopObj = getNameVal(entity + '02', themeObj, arrObj);
}
//主题列表
export function getFilname(self){
    self.filname = Object.assign({},allObj,arrObj.subtypes);
}



//字体录入
export function enterFont(self){
    self.desktopObj = getNameVal(entity + '03', fontObj, arrObj01);
}
//字体列表
export function fontList(self){
    self.filname = Object.assign({},allObj, arrObj01.subtypes);
}


//开机动画录入
export function enterAnimation(self){
    self.desktopObj = getNameVal(entity + '01', animationObj, arrObj);
}

