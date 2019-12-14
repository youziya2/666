// 会议管理模块


import { getNameVal,getName } from "@/api/methods.js";

// name为国际化用，val为传值用，select表示是否下拉框，must表示是否必填,span代表所占长度

var entity = 'meeting',
lgObj = JSON.parse(localStorage.languageObj),
allContent = {
    mttile: {name: "会议名称", val: '', select: false, must: true, notNull: '会议名称不能为空', span: 6},//会议名称
    keyspea: {name: "会议主讲人", val: '', select: false, must: true, notNull: '会议主讲人不能为空', span: 6}, //会议主讲人
    compere: {name: "会议主持人", val: '', select: false, must: false, span: 6}, //会议主持人
    types: {name: "会议类型", val: '', select: true, must: true, notNull: '会议类型不能为空', span: 6}, //会议类型 
    address: {name: "会议地点", val: '', select: true, must: true, notNull: '会议地点不能为空', span: 12}, //会议地点
    starttime: {name: "开始时间", val: '', select: false, must: true, notNull: '开始时间不能为空', span: 6}, //开始时间
    endtime: {name: "结束时间", val: '', select: false, must: true, notNull: '结束时间不能为空', span: 6}, //结束时间 
    value5: {name: "参会人员", val: '', select: false, must: true, notNull: '参会人员不能为空', span: 24}, //参会人员
    content: {name: "会议内容", val: '', select: false, must: true, notNull: '会议内容不能为空', span: 0} //会议内容    
},
// 下拉框数组
arrObj = {
    types : {
        briefMeeting: lgObj.select_briefmeeting || '碰头会',
        morningMeeting: lgObj.select_morningmeeting || '早例会',
        noonMeeting: lgObj.select_noonmeeting || '午例会',
        nightMeeting: lgObj.select_nightmeeting || '晚例会',
        dayMeeting: lgObj.select_daymeeting || '天例会',
        weekMeeting: lgObj.select_weekmeeting || '周例会',
        partMonthMeeting: lgObj.select_partmonthmeeting || '旬例会',
        monthMeeting: lgObj.select_monthmeeting || '月例会',
        quarterMeeting: lgObj.select_quartermeeting || '季度例会',
        halfYearMeeting: lgObj.select_halfyearmeeting || '半年例会',
        yearMeeting: lgObj.select_yearmeeting || '年度例会',
        projectMeeting: lgObj.select_projectmeeting || '项目立项会',
        needMeeting: lgObj.select_needmeeting || '需求风暴会',
        techEstiMeeting: lgObj.select_techestimeeting || '技术评估会',
        riskEstiMeeting: lgObj.select_riskrstimeeting || '风险评估会',
        workMeeting: lgObj.select_workmeeting || '工作布置会',
        sumupMeeting: lgObj.select_sumupmeeting || '工作总结会',
        appraisalMeeting: lgObj.select_appraisalmeeting || '工作评审会',
        cmdtMeeting: lgObj.select_cmdtmeeting || '工作表彰会',
        discussMeeting: lgObj.select_discussmeeting || '主题讨论会',
        mootMeeting: lgObj.select_mootmeeting || '主题辩论会',
        prorecoMeeting: lgObj.select_prorecomeeting || '产品发布会',
        newsMeeting: lgObj.select_newsmeeting || '新闻发布会',
        affidavitMeeting: lgObj.select_affidavitmeeting || '组织宣誓会',
        activityMeeting: lgObj.select_activitymeeting || '组织活动会',
        lectureMeeting: lgObj.select_lecturemeeting || '讲座会',
        competiMeeting: lgObj.select_competimeeting || '比赛会',
        vocoMeeting: lgObj.select_vocomeeting || '演唱会',
        othersMeeting: lgObj.select_othersmeeting || '其他会'
    }
},
detialList = {
    mttile:  "会议名称",//会议名称
    keyspea: "会议主讲人", //会议主讲人
    compere: "会议主持人", //会议主持人
    types: "会议类型", //会议类型 
    address: "会议地点", //会议地点
    starttime: "开始时间", //开始时间
    endtime: "结束时间", //结束时间 
    value5: "参会人员", //参会人员
    content: "会议内容"//会议内容    
},
filname = {
    '0': lgObj.select_all || "全部",
    '1': lgObj.select_mt1 || "未召开",
    '2': lgObj.select_mt2 || "正进行",
    '3': lgObj.select_mt3 || "已结束"
},//实际为0未召开",1正进行",2已结束"
meetingObj = {
    tit01: '新增会议',
    tit02: '会议列表',
    tit03: '会议搜索',
    tit04: '条件筛选',
    tit05: '全部',
    tit06: '未召开',
    tit07: '正进行',
    tit08: '已结束',
    tit09: '会议管理',
    tit10: '获取部门数据失败',
    tit11: '结束时间必须大于开始时间',
    tit12: '输入会议关键字',
    tit13: '修改会议',
    tit14: '请选择',
    tit15: '全选',
    tit16: '姓名',
    tit17: '昵称',
    tit18: '账号',
    tit19: '确认修改将会重新通知参会人员'
};


//
export function meetingInit(self){
    self.meetingObj = getName(entity, meetingObj);
}

//会议录入
export function addConferenceInit(self){
    self.allContent = getNameVal(entity, allContent, arrObj);
}

//会议列表
export function meetingListInit(self){
    self.options = arrObj.types;
    var obj = JSON.parse(localStorage.languageObj);
    for ( var key in filname ) {
        filname[key] = obj[entity + '_tit0' + (key/1 + 5)] || meetingObj['tit0' + (key/1 + 5)]
    }
    self.filname = getName(entity, filname);
    self.detialList = getName(entity, detialList);
}

//会议详情
export function meetingDetailInit(self){
    self.options = arrObj.types;
    self.allContent = getNameVal(entity, allContent, arrObj);
}
