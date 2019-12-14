

// 公用类

import { getName } from "@/api/methods.js";

// 主页面
var management = {
    tit01: '管理系统',
    tit02: '切换',
    tit03: '退出',
    tit04: '警告：点击此按钮将退出系统'
},
// 按钮
button = {
    next: "下一步",
    reset: "重置",
    complete: "完成",
    remove: "删除",
    update: "修改",
    close: "关闭",
    save: "保存",
    cancel: "取消",
    send: "发送",
    sure: "确定",
    reset: "重置",
    backstage: "虹菱后台管理系统",
    select: '请选择',
    keyWord: '请输入关键字',
    all: "全部",
    space: '设置空间',
    time: '到期时间',
    noData: '暂无数据',
    allCheck: '全选',
    busy: '网络繁忙',
    clickFile: '点击选择文件',
    clickImg: '点击选择图片'
},
//按钮提示
info = {
    removesuccess: '删除成功',
    removefail: '删除失败',
    savefail: '保存失败',
    updatefail: '修改失败',
    loginfail: '登陆失败',
    warn: '警告',
    delwarn: '你正在进行删除操作',
    searchfail: '查询失败',
},

// 控制中心
controlObj ={
    tit01: '产品查找',
    tit02: '用户查找',
    tit03: '控制中心',
    tit04: '关闭',
    tit05: '开启',
    tit06: '试用',
    tit07: '购买',
    tit08: '一周',
    tit09: '半个月',
    tit10: '一个月',
    tit11: '年',
    tit12: '长期',
    tit13: '产品名称',
    tit14: '产品类型',
    tit15: '产品ID',
    tit16: '用户名称',
    tit17: '联系方式',
    tit18: '用户ID'
}


// 主页面
export function managementInit(self){
    self.management = getName('main', management);
}

// 按钮
export function buttonObj(Vue){
    var buttonObj = getName('button', button);
    Vue.prototype.$buttonObj = buttonObj
}

// 提示信息
export function promptInfoObj(Vue){
    var promptInfoObj = getName('button', info);
    Vue.prototype.$promptObj = promptInfoObj;
}


// 控制中心
export function controlInit(self){
    self.controlObj = getName('control', controlObj);
}