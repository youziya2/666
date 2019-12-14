// 通用方法
import router from './../router/index'
import { Message } from 'element-ui'
import { formatInit } from '@/init/product'

function message(str,type) {
    Message({
        showClose: true,
        message: str,
        type: type ? 'success' : 'error',//error,
        duration: 3000
    })
}

// 获取语言并赋值
export function getNameVal(str, object001, object007, obj001){
    var obj = localStorage.languageObj ? JSON.parse(localStorage.languageObj) : {}, field = '', object = JSON.parse(JSON.stringify(object001));
    for (const key in object) {
        field = str + "_" + key.toLowerCase();
        object[key].name = obj[field] || object[key].name
        if(object[key].select) object[key].select = object007[key]
        if(object[key].must) {
            field = str + "_" + (key + 'notnull').toLowerCase();
            object[key].notNull = obj[field] || object[key].notNull;
        }
        if(obj001) object[key].val = obj001[key]
    }
    return object
}
// 获取语言
export function getName(str, object){
    var obj = localStorage.languageObj ? JSON.parse(localStorage.languageObj) : {}, field = '';
    for (const key in object) {
        field = str + "_" + key.toLowerCase();
        object[key] = obj[field] || object[key]
    }
    return object
}

//格式提示
export function checkType(num,val,str){
    var boo = true, obj = formatInit(),str01 = obj[str + '0' +num];
    if (num == 6) {
        boo = (/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/).test(val);
        if(!boo) message(str01);
    }
    if (num == 1) {
        boo = (/^\d{0,12}$/).test(val);
        if(!boo) message(str01);
    }
    if (num == 2) {
        boo = (/^[1-9]{1}\d{0,9}(([.]\d{1,2}){0,1})$|^0.\d{1,2}$/).test(val)
        if(!boo) message(str01);
    }
    if (num == 3) {
        boo = (/^\S{0,100}$/).test(val)
        if(!boo) message(str01);
    }
    if (num == 4) {
        boo = (/^\S{0,150}$/).test(val)
        if(!boo) message(str01);
    }
    if (num == 5) {
        boo = (/^\S{0,5000}$/).test(val)
        if(!boo) message(str + '为5000位以内的字符串');
    }
    return boo;
}

// 输入内容判断
export function checkNull(){
    var numargs = arguments.length;
    for (let index = 0; index < numargs; index++) {
        if(arguments[index]){
            for (const key in arguments[index]) {
                if( arguments[index][key].must == true && !arguments[index][key].val){
                    message(arguments[index][key].notNull);
                    return false;
                }
                if( arguments[index][key].val && arguments[index][key].num) {
                    var boo = checkType(arguments[index][key].num, arguments[index][key].val, key);
                    if(!boo) return false;
                }
            }
        }
    } 
    return true;
}

// 验证用户名
export function testUser(user, nullInvite, errorInvite) {
    if (user == '') {
        message(nullInvite);
        return false;
    }
    var reg = /^\d{6,12}$/
    if (!(reg.test(user))) {
        message(errorInvite);
        return false;
    } else {
        return true;
    }
}

// 验证密码
export function testPwd(pwd, nullInvite, errorInvite) {
    // boo判断是否是从本地读取的数据
    if (pwd == '') {
        message(nullInvite);
        return false;
    }
    var reg = /^[\da-zA-Z]{6,20}$/
    if (!(reg.test(pwd))) {
        message(errorInvite);
        return false;
    } else {
        return true;
    }
}

// 验证图文验证码
export function testPic(picCode, nullInvite, errorInvite) {
    if (picCode == '') {
        message(nullInvite);
        return false;
    }
    var reg = /^[a-zA-Z0-9]{4,6}$/
    if (!(reg.test(picCode))) {
        message(errorInvite);
        return false;
    } else {
        return true;
    }
}

//进入清空
export function clearTxt(txt) {
    txt = "";
}

// //添加回车键
// export function enterSure(e,fn) {
//     document.addEventListener('keydown', getKeyCode(e,fn))  
// }
// //清除回车键
// export function clearSure(e,fn) {
//     document.removeEventListener('keydown', getKeyCode(e,fn))  
// }
// // 获取键盘值
// export function getKeyCode(e,fn){
//     if (e.keyCode == 13) {
//       fn();
//     }
// }

// 时间格式化
export function getNowFormatDate(date,flag) {//flag判断是否需要时分秒
    var boo = date instanceof Date
    if(!boo) return date
    var fn= function(str){
        if (str < 10) str = "0" + str;
                return str
        }
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = date.getFullYear() + "-" + fn(month) + "-" + fn(strDate)
    if(flag) return currentdate
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();  
    currentdate = currentdate + " " + fn(hours) + ":" + fn(minutes) + ":" + fn(seconds);
    return currentdate
}

//checkbox是否选中
export function getChoice(arr,num,boo,id) {
    if (boo) arr[num] = id
    else arr[num] = 'notCheck'
    // return arr
}

//对所有选中的进行操作
export function doChoice(arr1,arr2){
    arr2 = []
    // 数组去空元素
    for (let index = 0,len = arr1.length; index < len; index++) {
        if (arr1[index] === 0) {
            arr2.push(arr1[index])
            continue
        }
        if (arr1[index] && arr1[index] != 'notCheck') {
            arr2.push(arr1[index]) 
        }    
    }
    arr1 = []
    return arr2
}

// 详情跳转
export function goDetail(name,obj,url,img,gdid){
    var add ={
        id : obj[gdid],
        name,
        route: url + name + "@" + obj[gdid],
        ico: "",
        imgs:img,
        icoif:true
    }
    // sessionStorage.setItem(obj[gdid],JSON.stringify(obj))
    router.push({path: url + name + "@" + obj[gdid]});
    return add
}

// 关闭详情
export function delDetail(path, str){
    var href = router.app._route, id = href.params.id, arr = JSON.parse(sessionStorage.getItem(str));
    id = id.substring(id.indexOf('@')+1);
    sessionStorage.removeItem(id);
    for (let index = 0; index < arr.length; index++) {
        if( arr[index].id && id == arr[index].id) arr.splice(index,1);
    }
    sessionStorage.setItem(str, JSON.stringify(arr));
    router.push({ path: path });
    return ['deletexiugai',href.path]
}

// 进入/退出 修改页面
export function updateDetail(path){
    var href = router.app._route;
    var id = href.params.id;
    id = path + id;
    console.log(href)
    router.push({ path:id });
    return [href.path,id];
}
//点击路由关闭图标的事件
export function closeIcon(index,arr){
    var url = arr[index].route , str = '';
    url = url.substring(url.indexOf('@')+1)
    sessionStorage.removeItem(url)
    router.app._route.path == arr[index].route ? str = arr[index-1].route:'';
    arr.splice(index,1);
    return str;
}


// 删除成功后清除对应的修改/详情页面
export function clearRemoveList(array){
    var id = ''
    for (let index = 0; index < array.length; index++) {
        id = sessionStorage.getItem(array[index])
        if(id) {
            sessionStorage.removeItem(array[index])
        }
    }
}

//排序
export function compareArr(str,arr){
    var compare = function (str){
        return function(a,b){
            var value1 = a[str];
            var value2 = b[str];
            return value2 - value1;
        }
    }
    arr.sort(compare(str))
}

//时间排序
export function getArr(obj01, arr01, arr02){
    var arr = [], obj02 = {}; 
    for (const key in obj01) {
        obj02 = {};
        obj02.time = key;
        obj02.num = obj01[key];
        arr.push(obj02);
    }
    var compare = function (str){
        return function(a,b){
            var value1 = new Date(a[str]);
            var value2 = new Date(b[str]);
            return value1 - value2;
        }
    }
    arr.sort(compare('time'))
    for (let index = 0; index < arr.length; index++) {
        arr01.push(arr[index].time)
        arr02.push(arr[index].num)
    }                     
}

// 地址请求结果处理
export function addressRespone(self,object,boo){
    var obj = {
        success : response => {
            if(response.data.message.indexOf("getSuccess") > -1){
                var arr = response.data.districtList, langu = localStorage.lgtype || 'chinese';
                self[object] = {};
                for (let index = 0; index < arr.length; index++) {
                    self[object][arr[index].dttid] = langu == 'chinese' ? arr[index].dttcname : arr[index].dttename;
                }
                if(boo) self.getData()
            }else{
                self.$message.console.error(JSON.parse(localStorage.languageObj).bigdata_tit30);   
            }
        }
    }
    return obj;       
}

// 大数据请求结果处理
export function doRespone(self){
    if( self.searchObj.starttime.val && self.searchObj.endtime.val && new Date(self.searchObj.starttime.val) >  new Date(self.searchObj.endtime.val)) return self.$message.error("开始时间不能小于结束时间")  
    if(self.searchObj.starttime.val) self.searchObj.starttime.val = getNowFormatDate(self.searchObj.starttime.val,true);
    if(self.searchObj.endtime.val) self.searchObj.endtime.val = getNowFormatDate(self.searchObj.endtime.val,true);
    self.isShow = true;
    var obj = {
        self: self,
        success : response => {
            if(response.data.message.indexOf("getSuccess") > -1){
                self.total = response.data.baseRecord || 0;
                self.recent = 0;
                for (const key in response.data.nationMap) {
                    self.recent = response.data.nationMap[key]
                }
                self.lastTerm = 0;
                for (const key in response.data.yoyNationMap) {
                    self.lastTerm = response.data.yoyNationMap[key]
                }
                var yearObj = response.data.yearMap, monthObj = response.data.monthMap, dayObj = response.data.dayMap;
                self.timedata.year = [];
                self.timedata.month = [];
                self.timedata.day = [];
                self.numberdata.year = [];
                self.numberdata.month = [];
                self.numberdata.day = [];
                // 左边数据
                getArr(yearObj, self.timedata.year, self.numberdata.year);
                getArr(monthObj, self.timedata.month, self.numberdata.month);
                getArr(dayObj, self.timedata.day, self.numberdata.day);
                self.isShow = self.numberdata.day.length > 0 ? true : false;
                // 右边数据
                self.columnarData = [];
                self.columnarDataObj = [];
                var fn = (num,str,object) => {
                    var obj = response.data[str] , pro = '';
                    for (const key in obj) {
                        pro = key.substring(num)
                        self.columnarData.push(object[pro] || '');
                        self.columnarDataObj.push( obj[key] || 1);
                    }
                }
                if(!self.searchObj.province.val) {
                    fn(self.nationality.length, 'provinceMap', self.provinces)
                }else if(!self.searchObj.city.val){
                    fn(self.nationality.length + self.searchObj.province.val.length, 'cityMap', self.cities)
                }else{
                    fn(self.nationality.length + self.searchObj.province.val.length + self.searchObj.city.val.length, 'countyMap', self.counties)
                }
                self.address = self.searchObj.city.val ? self.cities[self.searchObj.city.val] : 
                (self.searchObj.province.val ? self.provinces[self.searchObj.province.val] : JSON.parse(localStorage.languageObj).bigdata_tit33)
                var getNull = id =>{
                    self.$jq(id).html('<div style="line-height: 500px;text-align: center;">'+ JSON.parse(localStorage.languageObj).bigdata_tit32 + '</div>');
                    // 必须手动去掉 echarts 容器上面的 属性 _echarts_instance_ ，否则下次echarts图无法正常显示，具体原理未知
                    self.$jq(id).removeAttr('_echarts_instance_');
                }
                if(self.isShow){
                    self.drawLine(self.tiaojian);
                    self.drawBar();
                }else{
                    getNull('#towecharts');
                    getNull('#oneecharts');
                } 
            }else{
                self.$message.error(JSON.parse(localStorage.languageObj).bigdata_tit30);
                
            }
            
        }
    } 
    return obj;       
}

// 绘制柱状图表
export function drawBar(self){
    // 基于准备好的dom，初始化echarts实例
    let towChart = self.$echarts.init(document.getElementById('towecharts'))
    // 绘制图表
    towChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        tooltip: {},
        xAxis: {
            position:'top',
            splitLine:{
                show:false
            },
            axisTick:{
                inside:true
            },
            axisLine:{
                lineStyle:{
                    color:'#999999', // x坐标轴的轴线颜色
                }
            },
            axisLabel: {
                show: true ,//这行代码控制着坐标轴x轴的文字是否显示
                color: "#999999",
                formatter:function(value){
                    let dw = value.toString().length > 7?(value/10000)+"(万)":value;
                    dw = value.toString().length > 8?(value/100000000)+"(亿)":dw;
                    return dw
                }
            }
        },
        yAxis: {
            type: 'category',
            data: self.columnarData,
            axisLabel: {
                color: "#999999",
                rotate:30,
                fontSize:10,
                formatter:function(value){
                    if(value.indexOf('行政区') > -1 || value.indexOf('自治区') > -1)
                    value = value.substring(0,2)
                    return value
                }
            },
            axisLine:{
                lineStyle:{
                    width: 0
                }
            },
            axisTick:{
                show:false
            },
            splitLine:{
                show:false
            }
        },
        series: [{
            name: self.flag,
            type: 'bar',
            color:self.colorselects,
            data: self.columnarDataObj,
            barWidth : 10,
            itemStyle: {
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[10, 10, 10, 10],
                    color: new self.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: '#66A6FF'
                    }, {
                        offset: 1,
                        color: '#FE7A88'
                    }])
                }
            }
        }]
    });
}

// 绘制折线图表
export function drawLine(str,self){
    self.tiaojian = str; 
    if(!self.isShow) return false; 
    // 基于准备好的dom，初始化echarts实例
    let myChart = self.$echarts.init(document.getElementById('oneecharts')),
    // 超过界限的 月大于12 日大于30
    option01 = {
        xAxis: {
            name: self.yjObj[str],
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            symbol: 'none',
            data: self.numberdata[str],
            type: 'line'
        }]
    },
    option02 = {
        tooltip: {},
        xAxis: {
            name: self.yjObj[str],
            type: 'category',
            boundaryGap: false,
            data: self.timedata[str],
            axisLabel: {
                color: "#999999"
            },
            axisLine:{
                lineStyle:{
                    color:'#999999', // x坐标轴的轴线颜色
                }
            },
            axisTick:{
                inside:true
            }
        },
        yAxis: {
            type : 'value',
            axisLabel: {
                show: true ,//这行代码控制着坐标轴x轴的文字是否显示
                color: "#999999",
                formatter:function(value){
                    let dw = value.toString().length > 7?(value/10000)+"(万)":value;
                    dw = value.toString().length > 8?(value/100000000)+"(亿)":dw;
                    return dw
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#fff', // x坐标轴的轴线颜色
                    width: 0 //这里是坐标轴的宽度,为0就是不显示
                }
            },
            scale: true
        },
        series: [{
            symbol: 'emptyCircle',
            name: self.flag,
            type: 'line',
            symbolSize: 8,
            color: self.colorselects,
            data: self.numberdata[str],
        }]
    }
    // 绘制图表
    if( str == 'day' && self.timedata.day.length > 30)  return myChart.setOption(option01);
    if( str == 'month' && self.timedata.month.length > 12)  return myChart.setOption(option01);
    myChart.setOption(option02);
}

// 记录搜索条件
export function setScct(str,obj) {
    var scctObj = sessionStorage.scctObj ? JSON.parse(sessionStorage.scctObj) : {}, boo = true;
    for (const key in obj) {
        if (obj[key] !== '') {
            boo = false;
        }
    }
    if (boo) {
        scctObj[str] = ''
    } else {
        scctObj[str] = obj;
    }
    sessionStorage.setItem('scctObj',JSON.stringify(scctObj));
}
//获取搜索条件
export function getScct(str,obj,self) {
    if(!sessionStorage.scctObj) return false;
    var scctObj = JSON.parse(sessionStorage.scctObj) || {};
    if(scctObj[str]){
        for (const key in obj) {
            if(scctObj[str][key]) self[key] = scctObj[str][key];
        }
    }
}
//清除搜索条件
export function clearScct(str) {
    if(!sessionStorage.scctObj) return false;
    var scctObj = JSON.parse(sessionStorage.scctObj);
    delete scctObj[str];
    sessionStorage.setItem('scctObj',JSON.stringify(scctObj));
}
// 获取url参数
// export function getParame(str,obj) {
//     str = router.params[id];
//     var ids = str.indexOf('-');
//     obj = JSON.parse(sessionStorage.getItem(ids))
// }

