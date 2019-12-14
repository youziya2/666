//登录模块


import { getName } from "@/api/methods.js";

var entity = 'login',
login = {
    tit01: '深圳虹菱电器有限公司',
    tit02: '用户登录',
    tit03: '用户名',
    tit04: '密码',
    tit05: '验证码',
    tit06: '换一张',
    tit07: '记住用户名和密码',
    tit08: '登录',
    tit09: '忘记密码',
    tit10: '密码修改',
    tit11: '虹菱版权所有',
    msg01: '用户名不能为空',
    msg02: '密码不能为空',
    msg03: '验证码不能为空',
    msg04: '用户名不存在',
    msg05: '用户名或者密码错误',
    msg06: '验证码错误',
    msg07: '用户名为手机号码',
    msg08: '密码长度为6到20位的数字或者大小写字母',
    msg09: '图文验证码为4-6位的数字或者字母',
    msg10: '登陆失败,请重新登陆'
},
modify = {
    msg01: '密码修改',
    msg02: '首页',
    msg03: '账号验证',
    msg04: '密码重置',
    msg05: '修改成功',
    msg06: '验证码错误',
    msg07: '密码修改成功',
    msg08: '输入用户名',
    msg09: '输入绑定手机号',
    msg10: '输入验证码',
    msg11: '提交',
    msg12: '获取验证码',
    msg13: '重新获取',
    msg14: '短信发送成功',
    msg15: '短信发送失败',
    msg16: '手机号码不能为空',
    msg17: '手机号码不正确',
    msg18: '验证码不能为空',
    msg19: '提交失败,请稍后再试',
    msg20: '输入新密码',
    msg21: '再次输入',
    msg22: '确定修改',
    msg23: '密码不能为空',
    msg24: '两次密码不一致',
    msg25: '修改失败,请稍后再试',
    msg26: '恭喜您，成功修改密码',
    msg27: '跳转到登录页面倒计时',
    msg28: '立即登陆'
}

export function loginInit(self){
    self.loginObj = getName(entity, login);
}

export function modifyInit(self){
    self.modifyObj = getName('modify', modify);
}