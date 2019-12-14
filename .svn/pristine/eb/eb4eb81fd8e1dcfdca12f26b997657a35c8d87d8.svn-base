// 用户反馈模块

import { getNameVal,getName } from "@/api/methods.js";



// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填，units表示单位
var entity = "feedback",
lgObj = JSON.parse(localStorage.languageObj),
// 
fbInfo = {
    scct:{name:'关键字',val:'',select:false,must:true, disable: true}, //关键字
    starttime:{name:'开始时间',val:'',select:false,must:true}, //开始时间
    endtime:{name:'结束时间',val:'',select:false,must:true},//结束时间
    subtypes:{name:'消息类型',val:'',select:true,must:true},//消息类型
    levels:{name:'优先级',val:'',select:false,must:true},//优先级
    states:{name:'问题状态',val:'',select:true,must:true}//问题状态
},
fbList = {
    savetime: '反馈时间',//反馈时间
    states: '问题状态',//问题状态
    levels: '优先级',//优先级
    answers: '反馈内容',//反馈内容
    introid: '用户ID',//用户ID
    phone: '联系方式',//联系方式
    name: "用户姓名",
    account: "用户账号",
    operating: "操作",
    handl: "处理",
    solved: "已解决",
    solve: '待解决',
    solving: '解决中',
    ctfb:"用户反馈",
    fbList: "反馈列表",
    fbDetail: "反馈详情",
    info: "用户信息",
    choose: "请选择",
    search: "输入关键字搜索",
    all:"全部",
    hardware: "软件问题",
    general: "一般",
    important: "重要",
    urgent: "紧急",
    importantEmergency: "重要紧急"
},
arrObj = {
    subtypes: {
        'all': lgObj.select_all || '全部', 
        'hardware': lgObj.select_hardware || '硬件问题', 
        'software': lgObj.select_software || '软件问题'
    },
    levels: {
        '0': lgObj.select_all || '全部',
        '1': lgObj.select_levels1 || '一般', 
        '2': lgObj.select_levels2 || '重要',
        '3': lgObj.select_levels3 || '紧急',
        '4': lgObj.select_levels4 || '重要紧急'
    }, 
    states: {
        '0': lgObj.select_all || '全部', 
        '1': lgObj.select_states1 || '待解决', 
        '2': lgObj.select_states2 || '解决中', 
        '3': lgObj.select_states3 || '已解决'
    }
};

// 反馈列表
export function fbListInit(self){
    self.fbInfo = getNameVal(entity, fbInfo, arrObj);
    self.subtypes = getName(entity, arrObj.subtypes);
    self.levels = getName(entity, arrObj.levels);
    self.states = getName(entity, arrObj.states);
    self.fbList = getName(entity, fbList);
}

// 反馈详情
export function fbDetailInit(self){
    self.fbList = getName(entity, fbList);
    self.levels = getName(entity, arrObj.levels);
    self.states = getName(entity, arrObj.states);
}