// 通用方法
import { Message } from 'element-ui'
import $ from 'jquery'
import fetch from './axios'


function message(str,type) {
    Message({
        showClose: true,
        message: str,
        type: type ? 'success' : 'error',//error,
        duration: 3000
    })
}

//语言切换
export function language(){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'TparamServiceInfc.getTitleAndMessage', //接口地址(默认)
    language: localStorage.lgtype, //语言类型(默认)
    partype: '5' //语言参数类型(默认)
    })
    .then(res => {
      if (res && res.data) {
        var languageObj = res.data.language ,obj = {};
        for (const key in languageObj) {
          obj[key.toLowerCase()] = languageObj[key]
        }
        localStorage.setItem("languageObj", JSON.stringify(obj));
        location.reload();
      } else {
        message('切换失败')
      }
    })
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 获取国籍
export function getIp(){
  //步骤一:创建异步对象
  var ajax = new XMLHttpRequest();
  //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
  ajax.open('get','https://ipapi.co/json/');
  //步骤三:发送请求
  ajax.send();
  //步骤四:注册事件 onreadystatechange 状态改变就会调用
  ajax.onreadystatechange = function () {
    if (ajax.readyState==4 && ajax.status==200) {
      //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
      var str = ajax.responseText ? JSON.parse(ajax.responseText).country_name : ''
      if(str == 'China') {
        // localStorage.lg = 'chinese';
        localStorage.lgtype = 'chinese';
      } else {
        // localStorage.lg = 'english';
        localStorage.lgtype = 'english'
      }
    }
  },
  ajax.onload =  (event) => {
    if (ajax.status === 200) {
        //处理数据
    } else {
      localStorage.lgtype = 'chinese'
    }
}
}

// 图文验证码
export function getImgCode(){
  return fetch.baseURL + '/VerifyCodeServlet.do?infcMethod=getVerifyCode&a=' + (new Date()).getTime()
}

// 获取短信验证码
export function getMobilecode(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getMobilecode', //接口地址(默认)
      tempCode: 'SMS_165325114',//短信模板识别码（用户注册：SMS_165325115；修改密码：SMS_165325114）
      mobile: obj.mobile //手机号码
    },
    true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 验证码是否正确
export function checkMobilecode(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.checkMobilecode', //接口地址(默认)
      mobile: obj.mobile, //手机号码
      mobilecode: obj.mobilecode, //手机收到的验证码
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 修改密码
export function editTuserPwd(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.editTuserPwd', //接口地址(默认)
      username: obj.phone, //手机号码
      password: obj.pwd, //密码(前端需要一次加密再提交到后台)
      mobilecode: obj.code //手机收到的验证码
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 登录界面/主界面左菜单获取产品下拉列表
export function getGoodsSelect(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getGoodsSelect', //接口名称(使用默认)
      sysid: obj.sysid || '',//系统uuid(使用默认)
      systype:'behind',//系统类型(使用默认)
      rlename: obj.rlename || '',//角色名称
      userid: obj.userid || '',//用户uuid
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 登陆
export function login(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: "CSLoginServiceInfc.login", //接口路径名称(使用默认值)
      userid: "", //用户uuid(为空即可)
      username: obj.name, //用户登录账号(手动输入)
      verifyCode: self.iden,//验证码(手动输入)
      password: obj.pwd, //经过一次加密的密码(手动输入)
      sysename: "screenBehind", //终端名称(使用默认值)
      systype: "behind", //终端类型(使用默认值)
      rlename: "member", //登录角色(使用默认值)
      language: localStorage.lgtype ? localStorage.lgtype : 'chinese', //默认中文
      partype: "5", //语言参数类型(默认)
      openid: "" //微信openid(为空即可)
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 获取权限菜单
export function getMune(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getTpopedomListForLeftMenu', //接口名称(使用默认)
    types: 'behind',//平台类型
    sysid: obj.sysid, //（默认值）
    orgid: obj.orgid, //从org对象获取
    userid: obj.userid,//从user对象获取
    rlename: 'manager',//角色类型（默认值）
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 退出登陆
export function loginOut(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: "CSLoginServiceInfc.logout", //接口路径名称(使用默认值)
    loginToken: sessionStorage.uuidtk
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 图片/附件上传
export function uploadMoreattach(obj,boo) {
  var urls = '',
   object = {
      infcMethod: obj.isAttach == 'attach' ? (boo ? "BHAttachServiceInfc.uploadAttach" : "BHAttachServiceInfc.uploadAttach") : 'BHPicturesServiceInfc.uploadImg',
      fileType: obj.isAttach == 'attach' ? "attach" : 'img', //文件类型attch为附件，其他为图片
      types: obj.types,//类型apps/attach/mainImg
      userid: sessionStorage.userid,//操作人（从本地缓存user对象获取）
      orgid: sessionStorage.orgid,//组织机构（从本地缓存org对象获取）
      sysid: sessionStorage.sysid,//终端ID（使用默认）
      entity: obj.isAttach == 'attach' ? "attach" : 'pictures',
      sorts: '0',//序号（使用默认）
      tbname: obj.tbname,//图片所属对象（使用默认）
      subtypes: obj.subtypes//附件类型
    }
    if(obj.pkid)  object.pkid = obj.pkid //商品ID
        for (const key in object) {
            urls = urls + key + '=' + object[key] + '&';
        }
        urls = urls.substring(0,urls.length-1)
        obj.imgIndex.imgpath = '../../../static/img/timg.gif'
        // 获取上传附件框
        var file = obj.dom.files;
        var formData = new FormData();
        for (var i = 0; i < file.length; i++) {
          formData.append("file[" + i + "]", file[i]);
        }
        // 第一步：建立请求
        var xhr = new XMLHttpRequest();
        // 第二步骤：post方式
        xhr.open("POST", fetch.baseURL + "/BSBaseAction.do?" + urls);
        // 第三步骤:发送请求
        xhr.send(formData);
        // 第四步:ajax返回
        xhr.onreadystatechange =  () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var objs = JSON.parse(xhr.responseText)
                console.log(objs)
                if ( objs.message.indexOf('uploadSuccess') > -1 ) {
                  obj.imgIndex.imgpath =  obj.isAttach == 'attach' ? "../../../static/img/yasuo.png" : fetch.baseUrl + objs.filePath
                  obj.imgIndex.imgid = obj.isAttach == 'attach' ? objs.atid[0] : objs.picid[0]
                  message("上传成功!",'success');
                } else {
                  obj.imgIndex.imgpath = ''
                  message("上传失败，请稍后再试！");
                  obj.dom.value = null;
                }
                if (obj.fn) {
                  obj.imgIndex.imgpath = ''
                  obj.dom.value = null;
                  obj.fn() 
                }
            }
        };
        xhr.onload =  (event) => {
            if (xhr.status === 200) {
                //处理数据
            } else {
              obj.imgIndex.imgpath = ''
              obj.dom.value = null;
              message("网络繁忙，请稍后再试！");
            }
        }
        xhr.onerror = function(event) {
            console.log(event);
        }
        // 设置超时时间
        xhr.timeout = 100000;
        xhr.ontimeout = function (event) {
            console.log(event)
        }
}

// 上传头像压缩包
export function uploadSignImgs(obj) {
  var urls = '',
   object = {
      infcMethod: 'BHAttachServiceInfc.uploadSignImgs',
      fileType: "attach", //文件类型attch为附件，其他为图片
      types: obj.types,//类型apps/attach/mainImg
      userid: sessionStorage.userid,//操作人（从本地缓存user对象获取）
      orgid: sessionStorage.orgid,//组织机构（从本地缓存org对象获取）
      sysid: sessionStorage.sysid,//终端ID（使用默认）
      entity: "attach",
      sorts: '0',//序号（使用默认）
      tbname: obj.tbname,//图片所属对象（使用默认）
      subtypes: obj.subtypes ? obj.subtypes : '',//附件类型
    }
    if(obj.pkid)  object.pkid = obj.pkid //商品ID
        for (const key in object) {
            urls = urls + key + '=' + object[key] + '&';
        }
        urls = urls.substring(0,urls.length-1)
        obj.imgIndex.imgpath = '../../../static/img/timg.gif'
        // 获取上传附件框
        var file = obj.dom.files;
        var formData = new FormData();
        for (var i = 0; i < file.length; i++) {
          formData.append("file[" + i + "]", file[i]);
        }
        // 第一步：建立请求
        var xhr = new XMLHttpRequest();
        // 第二步骤：post方式
        xhr.open("POST", fetch.baseURL + "/BSBaseAction.do?" + urls);
        // 第三步骤:发送请求
        xhr.send(formData);
        // 第四步:ajax返回
        xhr.onreadystatechange =  () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                obj.imgIndex.imgpath = ''
                obj.dom.value = null;
                var objs = JSON.parse(xhr.responseText)
                if ( objs.message.indexOf('uploadSuccess') > -1 ) {  
                  obj.fn();
                  message("上传成功!",'success');
                } else {
                  message(objs.desc);
                }
            }
        };
        xhr.onload =  (event) => {
            if (xhr.status === 200) {
                //处理数据
            } else {
              obj.imgIndex.imgpath = ''
              obj.dom.value = null;
              message("网络繁忙，请稍后再试！");
            }
        }
        xhr.onerror = function(event) {
            console.log(event);
        }
        // 设置超时时间
        xhr.timeout = 100000;
        xhr.ontimeout = function (event) {
            console.log(event)
        }
}

// 附件下载
export function downLoad(url01,url02){
  var url = url02 ? urs02 : url01;
  if (window.navigator.msSaveBlob) {
    //IE浏览器
    window.open(url)
  }
    // 谷歌浏览器 创建a标签 添加download属性下载
  else {
    if (typeof url == 'object' && url instanceof Blob) {
       url = URL.createObjectURL(url); // 创建blob地址
    }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = 'saveName' || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) {
          event = new MouseEvent('click');
        }
        else {
          event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);  
    }
}
// 移除照片/附件
export function delPictrue(self,type,fn){//fn是传进来的函数
  self.centerDialogVisible = false;
  var id = type == 'fil' ? "atid" : "picid" //fil为文件否则为照片
  var obj = {
        infcMethod: type == 'fil' ? (fn=='system' ? "BHAttachServiceInfc.removeAttach" : "BHAttachServiceInfc.removeAttach") : 'BHPicturesServiceInfc.removeImg', //接口名称(使用默认)
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        entity: type == 'fil' ? 'attach' : 'pictures', //操作对象(使用默认)
      }
  obj[id] = self.imgNum ? self.imgList[self.imgNum].imgid : self[id]//图片UUID(不能为空)
  fetch.postAxios("/CSBaseAction.do", obj)
  .then(response => {
    if (response.data.message.indexOf("removeSuccess") > -1) {
      message("删除成功！",'success');
      if (fn && fn !='system') {
          self[fn]();
      }else{
          self.imgList[self.imgNum].imgpath = ''
          document.getElementById(self.imgNum).value = null
      }
    } else {
      message("删除失败，请稍后再试！");
    }
  })
  .catch(function(error) {
    console.log("error:" + error);
  });
 }

 export function delPictrueForVersion(self,type,fn){//fn是传进来的函数
  self.centerDialogVisible = false;
  var id = type == 'fil' ? "atid" : "picid" //fil为文件否则为照片
  var obj = {
        infcMethod: type == 'fil' ? (fn=='system' ? "BHAttachServiceInfc.removeAttach" : "BHAttachServiceInfc.removeAttach") : 'BHPicturesServiceInfc.removeImg', //接口名称(使用默认)
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        dbname:'yoking',
        entity:'attach' //操作对象(使用默认)
      }
  obj[id] = self.imgNum ? self.imgList[self.imgNum].imgid : self[id]//图片UUID(不能为空)
  fetch.postAxios("/CSBaseAction.do", obj)
  .then(response => {
    console.log(response.data)
    // if (response.data.message.indexOf("removeSuccess") > -1) {
    //   message("删除成功！",'success');
    //   if (fn && fn !='system') {
    //       self[fn]();
    //   }else{
    //       self.imgList[self.imgNum].imgpath = ''
    //       document.getElementById(self.imgNum).value = null
    //   }
    // } else {
      message("删除失败，请稍后再试！");
    // }
  })
  .catch(function(error) {
    console.log("error:" + error);
  });
 }

// 批量删除
export function batchDelete(infcMethod,entity,obj){
  console.log($("#theForm").serialize());
    var urls = "infcMethod=" + infcMethod + "&sysid=" + sessionStorage.sysid + "&entity=" + entity
    $.ajax({
        url: fetch.baseURL + "/BSBaseAction.do?" + urls,
        data: $("#theForm").serialize(),
        // traditional:true,//防止深度序列化
        cache: false,                      // 不缓存
        processData: false,                // jQuery不要去处理发送的数据
        contentType: false,                // jQuery不要去设置Content-Type请求头
        success: obj.success,
        error:function(error){
            console.log(error)
        }
    })
}


// 校验产品名称唯一性
export function getGoodsCount(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.getGoodsCount', //接口名称(使用默认)
      gdcname: obj.gdcname//产品中文名
      },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 校验该标准是否绑定有单品
export function checkGoodsitemByGdid(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.checkGoodsitemByGdid', //接口名称(使用默认)
      gdid: obj.gdid//产品中文名
      },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 获取产品标准分页列表
export function getProductList(obj){
    var self = obj.self
    fetch.postAxios("/CSBaseAction.do", {
        infcMethod: self.scct ? 'BHGoodsServiceInfc.searchGoodsListPage' : 'BHGoodsServiceInfc.buildGoodsListPage', //接口名称(使用默认)
        entity: 'goods', //操作对象(使用默认)
        thisPage: self.thisPage, //当前页码(必填)
        perPage: self.perPage, //每页记录数(必填)
        subtypes: self.subtypes, //商品型号
        gdename:'', //商品英文名称
        gdcname: '', //商品中文名称
        gdcode: "", //商品编号
        scct:self.scct //搜索内容(英文Search Content的缩写)
        })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
// 产品标准录入或者修改
export function addProduct(obj,boo){
    var self = obj.self
    fetch.postAxios("/CSBaseAction.do",  {
        infcMethod: boo ? "BHGoodsServiceInfc.editGoods" : "BHGoodsServiceInfc.addGoods", //接口地址(默认)
        gdid: boo ? self.gdid : '', //商品uuid(修改时候不可为空)
        sysid: sessionStorage.sysid, //当前登录系统uuid(不能为空)
        orgid: sessionStorage.orgid, //当前登录机构uuid(不能为空)
        userid: sessionStorage.userid, //当前登录用户uuid(不能为空)
        entity: "goods", //操作表主体(不能为空，使用默认)
        urls: "#", //商品拓展链接(使用默认)
        gdename: "", //商品英文名称
        gdcname: self.parvalObj.gdcname.val, //商品中文名称
        vsid: self.parvalObj.vsid.val,//产品版本号
        sizes:self.parvalObj.sizes.val,//尺寸
        gdstyle: "main", //商品主次款式(不能为空，默认使用main主款)
        parentid: "", //商品主款的uuid(主款可为空，从款不能为空)
        parentidName: "", //商品主款uuid的名称(通过接口加载选择项)
        types: localStorage.machine, //商品类型(通过接口加载选择项)
        subtypes: self.parvalObj.subtypes.val,//产品型号
        brid: "xxx", //品牌uuid(通过接口加载选择项)
        power: self.parvalObj.power.val, //机身功率
        disk: self.parvalObj.disk.val, //机身存储
        unit: "xxx", //计量单位(通过接口加载选择项)
        widths: self.parvalObj.widths.val, //商品宽度(可为空)
        lengths: self.parvalObj.lengths.val, //商品长度(可为空)
        heights: self.parvalObj.heights.val, //商品高度(可为空)
        weights: self.parvalObj.weights.val, //商品重量(可为空)
        colors: self.parvalObj.colors.val, //商品颜色(通过接口加载选择项)
        colorsName: self.parvalObj.colors.val, //颜色名称(通过接口加载选择项)
        beginmac: self.parvalObj.beginmac.val, //开始MAC地址
        endmac: self.parvalObj.endmac.val, //结束MAC地址
        sorts: "", //序号(可为空)
        states: "0", //状态(使用默认)
        shape: "solid", //形态(默认选择固态)
        savetime: self.parvalObj.savetime.val, //录入时间(不能为空)
        sprid: "xxx", //供应商(通过接口加载选择项)
        address: self.parvalObj.address.val, //产地(可为空)
        cpubrid: self.cpuObj.cpubrid.val, //品牌
        cputype: self.cpuObj.cputype.val, //型号
        cpucore: self.cpuObj.cpucore.val, //核心数量
        cpuinfc: self.cpuObj.cpuinfc.val, //接口类型
        cpubfre: self.cpuObj.cpubfre.val, //主频
        cputc: self.cpuObj.cputc.val, //三级缓存
        cpupower: self.cpuObj.cpupower.val, //功率
        cpubits: self.cpuObj.cpubits.val, //64位支持
        remark: "", //备注(可为空)
        mmbrid: self.memeryObj.mmbrid.val, //品牌
        mmtype: self.memeryObj.mmtype.val, //型号
        mmclass: self.memeryObj.mmclass.val, //类型
        mmvol: self.memeryObj.mmvol.val, //容量
        mmspeed: self.memeryObj.mmspeed.val, //速度
        mmclv: self.memeryObj.mmclv.val, //CL值
        mmseque: self.memeryObj.mmseque.val, //时序
        mmvtg: self.memeryObj.mmvtg.val, //工作电压
        content: self.content, //产品描述内容(可为空)
        clouddisk: self.clouddisk//云盘大小
      })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
// 某个产品标准详情
export function getProductDetail(obj){
    fetch.postAxios("/CSBaseAction.do", {
        infcMethod: 'BHGoodsServiceInfc.getGoodsById', //接口名称(使用默认)
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        entity: 'goods', //操作对象(使用默认)
        gdid: obj.id //商品UUID(不能为空)
        })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}

//获取产品标准
export function getTemplate(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.getGoodsList', //接口名称(使用默认)
      entity: 'goods', //操作对象(使用默认)
      types:localStorage.machine, //产品类型(下拉框，产品类型：虹菱平板会议机/虹菱平板普教机/虹菱平板幼教机/虹菱智能电视机)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 校验单品名称/mac唯一性
export function getGoodsitemCount(obj,str){
  var boo = false;
  if (str == 'isGdiname') {
    boo = true;
    if(obj.gdiname == '') return false;
  } else {
    boo = false;
    if(obj.mac == '') return false;
  }
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.getGoodsitemCount', //接口名称(使用默认)
      gdiname: boo ? obj.gdiname : '',//单品编号
      mac: !boo ? obj.mac : ''
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}



//单品录入（修改）
export function updateFinished(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: self.gditid ? 'BHGoodsServiceInfc.editGoodsitem' : 'BHGoodsServiceInfc.addGoodsitem', //接口路径名称(使用默认值)
      sysid: sessionStorage.sysid, //子平台uuid(必填，从system获取)
      orgid: sessionStorage.orgid, //所属机构(必填，从org获取)
      userid: sessionStorage.userid, //操作用户(必填，从user获取)
      entity: 'goodsitem', //操作表主体(不能为空，使用默认)
      gditid: self.gditid, //表主键uuid(为空)
      types: localStorage.machine, //对象类型(使用默认)
      states:'0', //对象状态(使用默认值)
      sorts:'0', //记录序号(使用默认值)
      urls:'', //访问路径(为空)
      savetime:'', //保存时间(为空)
      remark:'', //备注(为空)
      gdiname: self.finishedParvalObj.gdiname.val,
      gdid: self.finishedParvalObj.gdid.val, //产品uuid（选择，带过来）
      gdcode: self.finishedParvalObj.gdcode.val, //产品编号(不能为空)
      mac: self.finishedParvalObj.mac.val //mac地址(不能为空)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//获取单品列表
export function getFinishedList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.getGoodsitemListPage', //接口路径名称(使用默认值)
      sysid: sessionStorage.sysid, //子平台uuid(必填，从system获取)
      orgid: sessionStorage.orgid, //所属机构(必填，从org获取)
      entity: 'goodsitem', //操作表主体(不能为空，使用默认)
      types: localStorage.machine, //对象类型(为空)
      thisPage: self.thisPage, //当前页码(必填)
      perPage: self.perPage,//每页记录数(必填)
      gdid: self.gdid,//搜索内容 (产品标准)
      scct: self.scct //搜索内容(英文Search Content的缩写)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//获取单品列表
export function getFinishedDetail(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHGoodsServiceInfc.getGoodsitemById', //接口路径名称(使用默认值)
      sysid: sessionStorage.sysid, //子平台uuid(必填，从system获取)
      entity: 'goodsitem', //操作表主体(不能为空，使用默认)
      gditid: obj.id, //表主键uuid(为空)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}



// 应用列表
export function getAppList(obj,boo){
  // boo是根据搜索内容和条件查询
    var self = obj.self
    var parames = {
      infcMethod: self.scct ? "BHAppsServiceInfc.searchAppsListPage" : 'BHAppsServiceInfc.buildAppsListPage', //接口名称(使用默认)
      sysid: sessionStorage.sysid, //操作平台(使用默认)
      entity: 'apps', //操作对象(使用默认)
      types: 'app', //应用类型
      thisPage: self.thisPage, //当前页码(必填)
      perPage: self.perPage, //每页记录数(必填)
      gdename:'', //商品英文名称
      gdcname: '', //商品中文名称
      scct: self.scct //搜索内容(英文Search Content的缩写)
    }
    if(boo) parames.subtypes = self.application
    fetch.postAxios("/CSBaseAction.do", parames)
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
// 应用详情
export function getAppDetail(obj){
    fetch.postAxios("/CSBaseAction.do", {
        infcMethod: 'BHAppsServiceInfc.getAppsById', //接口名称(使用默认)
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        entity: 'apps', //操作对象(使用默认)
        appid: obj.id //商品UUID(不能为空)
        })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
//校验应用名唯一性
export function getAppsCount(obj){
  if (obj.appcname =='' && obj.appename =='') return false;
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHAppsServiceInfc.getAppsCount', //接口名称(使用默认)
      appcname: obj.appcname,//app中文名（必填）
      appename: obj.appename//app英文名（必填）
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 应用录入/修改
export function updateApp(obj,boo){
    self = obj.self
    fetch.postAxios("/CSBaseAction.do",  {
        infcMethod: boo ? 'BHAppsServiceInfc.editApps' : "BHAppsServiceInfc.addApps", //接口名称(使用默认)
        entity: 'apps', //操作对象(使用默认)
        appid: boo ? self.urlId.substring(self.urlId.indexOf('@')+1) : '', //应用uuid(不可为空)
        appcname: self.appObj.appcname.val,//应用名称(不能为空)
        appename: self.appObj.appename.val,//应用英文名称(不能为空)
        types:'app',
        subtypes: self.appObj.subtypes.val, //应用类型(选择下拉框)
        version: self.appObj.version.val, //软件版本(不能为空)
        copyright: self.appObj.copyright.val, //版权归属(不能为空)
        savetime: self.appObj.savetime.val, //发布日期(不能为空)
        urls: self.appObj.urls.val, //第三方应用URL(可为空)
        isfree: self.appObj.isfree.val, //是否免费（选择下拉框）
        content: self.appObj.content.val, //版本说明
        remark: self.appObj.remark.val, //应用说明(不能为空)
        states: '0', //对象状态
        orgid: sessionStorage.orgid,//所属机构(从org获取)
        sorts: '0', //记录序号(使用默认)
        sysid: sessionStorage.sysid, //子平台uuid(从system获取)
        userid: sessionStorage.userid //操作用户(从user获取) 
        })
    .then(obj.success)
    .catch(function(error) {
        console.log("error:" + error);
    });
}


// 新增会议室
export function addMtroom(obj){
  var self = obj.self;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.addMtroom', //接口路径名称(默认)
    entity: 'mtroom',//新增实体类(默认)
    userid: '',//操作用户UUID(为空)
    sysid: sessionStorage.sysid, //子平台UUID(默认)
    types: '', //对象类型(为空)
    orgid: sessionStorage.orgid, //组织UUID
    urls: '', //访问地址(为空)
    sorts:'0' , //记录序号(默认)
    states:'0' , //对象状态(默认)(0/未召开,1/正进行,2/已结束)
    savetime: '', // 保存时间
    remark: self.allContent.remark, //描述(为空)
    mtrname: self.allContent.mtrname, //会议室名称(必填)
    mtrnum: self.allContent.mtrnum //会议室编号(必填)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 搜索会议室
export function getMtroomListBySearch(obj){
  var self = obj.self;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.searchMtroomListPage', //接口路径名称(默认)
    // sysid: sessionStorage.sysid, // 子平台UUID(默认)
    orgid: sessionStorage.orgid, //组织UUID
    scct: self.scct, //  搜索条件(模糊查询/选填)
    thisPage: self.thisPage, //  页码(必填)
    perPage: self.perPage // 每页大小(必填)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 检查会议室是否有预约会议
export function checkMtroombingMetting(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHMeetingServiceInfc.checkMtroombingMetting', //接口路径名称(默认)
      mtrid: obj.mtrid//会议室UUID(必填)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 会议室列表
export function getMtroomList(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.getMtroomList', //接口路径名称(默认)
    // sysid: sessionStorage.sysid, //子平台UUID(默认)
    orgid: sessionStorage.orgid //
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 会议室详情
export function getMtroomDetail(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.getMtroomById', //接口路径名称(默认)
    mtrid: obj.mtrid //子平台UUID(默认)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 修改会议室
export function editMtroom(obj){
  var self = obj.self;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.editMtroom', //接口路径名称(默认)
    sysid: sessionStorage.sysid, //子平台UUID(默认)
    // entity: 'mtroom',//新增实体类(默认)
    mtrid: self.mtrid,//会议室UUID(必填)
    // userid: '',//操作用户UUID(为空)
    // sysid: sessionStorage.sysid, //子平台UUID(默认)
    // types: '', //对象类型(为空)
    // orgid: '', //组织UUID(为空)
    // urls: '', //访问地址(为空)
    // sorts:'0' , //记录序号(默认)
    // states:'0' , //对象状态(默认)(0/未召开,1/正进行,2/已结束)
    // savetime: '', // 保存时间
    // remark: self.allContent.remark, //描述(为空)
    mtrname: self.allContent.mtrname, //会议室名称(必填)
    mtrnum: self.allContent.mtrnum //会议室编号(必填)
      })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 会议列表
export function getMeetingList(obj){
    var self = obj.self
    fetch.postAxios("/CSBaseAction.do", {
        // infcMethod: self.scct ? "BHMeetingServiceInfc.searchMeetingListPage" : 'BHMeetingServiceInfc.buildMeetingListPage', //接口名称(使用默认)
        infcMethod: "BHMeetingServiceInfc.searchMeetingListPage",
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        orgid: sessionStorage.orgid, //组织UUID
        entity: 'meeting', //操作对象(使用默认)
        starttime: obj.st, //开始时间
        endtime: obj.et, //结束时间
        thisPage: self.thisPage, //当前页码(必填)
        perPage: self.perPage, //每页记录数(必填)
        states: self.states, //会议状态0/1/2
        scct: self.scct //搜索内容(英文Search Content的缩写)
        })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
// 会议详情
export function getMeetingDetail(obj){
    fetch.postAxios("/CSBaseAction.do", {
        infcMethod: 'BHMeetingServiceInfc.getMeetingById', //接口名称(使用默认)
        sysid: sessionStorage.sysid, //操作平台(使用默认)
        entity: 'meeting', //操作对象(使用默认)
        mtid: obj.id//应用UUID(不能为空)
        })
        .then(obj.success)
        .catch(function(error) {
            console.log("error:" + error);
        });
}
// 会议附件列表
export function getMeetingAttach(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHMeetingServiceInfc.getMeetingAttach', //接口名称(使用默认)
      types:'meeting',//类型（meeting）
      pkid: obj.pkid//操作对象ID（会议ID）
    })
      .then(obj.success)
      .catch(function(error) {
          console.log("error:" + error);
      });
}
// 获取部门列表
export function getDepartmentList(obj){
    fetch.postAxios("/CSBaseAction.do",  {
        infcMethod:'BHUserServiceInfc.getCompanyOrgList',//接口地址(默认)
        morgid: sessionStorage.orgid //所属机构(从org对象获取)
    })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
// 获取部门详情
export function getDepartmentDetail(obj){
    fetch.postAxios("/CSBaseAction.do",  {
        infcMethod:'BHMeetingServiceInfc.getTuserListByOrgid',//接口地址(默认)
        orgid: obj.deparmentChoice //所属机构(从org对象获取)
    })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
      });
}
//会议录入/修改
export function updateMeting(obj,boo){
    var self = obj.self
    fetch.postAxios("/CSBaseAction.do", {
        infcMethod: boo ? 'BHMeetingServiceInfc.editMeeting' : 'BHMeetingServiceInfc.addMeeting', //接口地址(默认)
        mtid: boo ? self.mtid : '', //表主键uuid(为空)
        types: self.allContent.types.val, //对象类型(下拉选择)
        states: '0', //对象状态(使用默认)
        sorts: '0', //记录序号(使用默认)
        entity: 'meeting',
        remark: '', //备注(可为空)
        sysid: sessionStorage.sysid, //子平台uuid(使用默认)
        urls: '', //访问路径(可为空)
        orgid: sessionStorage.orgid, //所属机构(从org对象获取)
        userid: sessionStorage.userid, //操作用户(从user对象获取)
        mttile: self.allContent.mttile.val, //会议名称(不能为空)
        keyspea: self.allContent.keyspea.val, //主讲人(不能为空)
        compere: self.allContent.compere.val, //主持人(可为空)
        address: self.allContent.address.val, //会议地点(不能为空)
        starttime: obj.st, //开始时间(不能为空)
        endtime: obj.et, //结束时间(不能为空)
        content: self.allContent.content.val, //会议内容(不能为空)
        orguserids: obj.str//参会人员(不能为空，注意格式连接:userid@张三||userid@李四||userid@王五)
    })
    .then(obj.success)
    .catch(function(error) {
        console.log("error:" + error);
    });
}


//会议文件管理
// 获取所有会议(文件夹)
export function getMeetingFilesList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do",  {
    infcMethod: "BHMeetingServiceInfc.getMeetingList",  //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid: sessionStorage.orgid, //所属机构(从org对象获取)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    scct: self.scct  //搜索内容(会议主题-模糊查询)
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 条件/分类搜索会议文件列表
export function getMeetingAttachListPage(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do",  {
    infcMethod: "BHAttachServiceInfc.getMeetingAttachListPage",  //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    // orgid: sessionStorage.orgid, //所属机构(从org对象获取)
    pkid: self.pkid,//会议UUID
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    subtypes: self.subtypes, //文件类型(0/附件,1/白板,2/批注)
    scct: self.scct  //搜索内容(模糊查询)
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 获取文件列表
export function getFiles(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do",  {
    infcMethod: self.scct ? "BHAttachServiceInfc.searchAttachListPage" : 'BHAttachServiceInfc.buildAttachListPage',  //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid:  sessionStorage.orgid,         //登录用户orgid(必填)
    userid: sessionStorage.userid,              //登录用户userid(必填)
    entity: 'attach', //操作对象(使用默认)
    types: 'ad',
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    subtypes:self.fileType || '',
    scct: self.scct  //搜索内容(英文Search Content的缩写)
    })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

//校验个人用户唯一性
export function getPersonCount(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getPersonCount', //接口名称(使用默认)
      realname: obj.realname,//用户姓名
      mobile: '' //手机号
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 添加普通用户
export function addGeneralUser(obj,boo){
    var self = obj.self
    fetch.postAxios("/CSBaseAction.do", {
      infcMethod: boo? "BHUserServiceInfc.editPerson" : 'BHUserServiceInfc.addPerson', //接口名称(使用默认)
      sysid: sessionStorage.sysid, //（默认值）
      orgid: sessionStorage.orgid, //org
      sector: self.moreInfo.sectorid.val,
      types: 'person', //用户类型（默认值）
      entity: 'person',//操作实体（默认值）
      psuserid: obj.psuserid || self.psuserid ,//用户uuid（修改时必填）
      introid: sessionStorage.userid, //从user对象获取userid（注意，在客户端存储的时候不要与登录userid冲突了，防止混淆，需要自定义变量名称）
      realname: self.userInfo.realname.val, //客户名称(必填)
      mobile: self.userInfo.mobile.val, //手机号码（必填）
      password: obj.password,//密码（必填）
      rlename: self.userInfo.rlename ? self.userInfo.rlename.val : "",//用户角色(下拉框)
      sex: self.moreInfo.sex.val, //性别(下拉框)
      lictype: self.moreInfo.lictype.val, //证件类型(下拉框)（缺省0、身份证1、户口本2、驾驶证3、军人证4、学生证5）
      liscnum: self.moreInfo.liscnum.val, //证件号码
      birthday: self.moreInfo.birthday.val, //生日
      linkman: self.moreInfo.linkman.val, //联系人
      email: self.moreInfo.email.val, //邮箱
      qq: self.moreInfo.qq.val, //QQ
      weixin: self.moreInfo.weixin.val, //微信
      dttid: self.moreInfo.dttid ? self.moreInfo.dttid.val : '', //所属地区（必填）
      address: self.moreInfo.address.val, //联系地址（必填）
      remark: self.moreInfo.remark.val //备注
    })
      .then(obj.success)
      .catch(function(error) {
        console.log("error:" + error);
    });
} 
//获取普通用户列表
export function getGeneralList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getPersonListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid: sessionStorage.orgid,
    entity: 'person', //操作对象(使用默认)
    mrlename: sessionStorage.mrlename,//当前登录用户的角色英文名
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    scct: self.scct//搜索内容(英文Search Content的缩写)(可为空)
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
  }
//获取普通用户个人详情
export function getGeneralDetail(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getPersonById', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid:sessionStorage.orgid, //机构uuid（从org对象获取,必填）
    entity: 'person', //操作对象(使用默认)
    psuserid: obj.psuserid //用户UUID(不能为空)
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
  }


//获取后台用户列表
export function getBackstageList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do",{
    infcMethod: 'BHUserServiceInfc.getCompanyListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid: sessionStorage.orgid, //机构uuid（从org对象获取,必填）
    entity: 'company', //操作对象(使用默认)
    mrlename: sessionStorage.mrlename,//当前登录用户的角色英文名
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    scct: self.scct //搜索内容(英文Search Content的缩写)(可为空)
}).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//校验后台用户唯一性
export function getCompanyCount(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getCompanyCount', //接口名称(使用默认)
      realname: obj.realname,//用户姓名
      mobile: '' //手机号
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 添加后台用户（boo不为空则是修改）
export function addBackstageUser(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", { 
    infcMethod: boo ? "BHUserServiceInfc.editCompany" : 'BHUserServiceInfc.addCompany', //接口名称(使用默认)
    sysid : sessionStorage.sysid, //（默认值）
    orgid : sessionStorage.orgid, //从org对象获取
    types : 'company', //用户类型（默认值）
    entity : 'company',//操作实体（默认值）
    cpuserid: boo ? self.cpuserid : '',//用户UUID(不能为空)
    // introid : sessionStorage.userid, //从user对象获取userid（注意，在客户端存储的时候不要与登录userid冲突了，防止混淆，需要自定义变量名称）
    realname : self.userInfo.realname.val, //企业名称(必填)
    mobile : self.userInfo.mobile.val, //手机号码（必填）
    password : obj.password,//密码（必填）
    bistype : self.userInfo.bistype.val,//企业类型   
    lictype : self.moreInfo.lictype.val, //证件类型(下拉框)（缺省0）  
    liscnum : self.moreInfo.liscnum.val, //营业执照
    // redate : self.moreInfo.redate.val,//注册时间
    bankacc : self.moreInfo.bankacc.val,//对公账号(银行账户)   
    recapital : self.moreInfo.recapital.val,//注册资本
    operlimit : self.moreInfo.operlimit.val,//营业期限
    apprdate : self.moreInfo.apprdate.val,//核准日期
    address : self.moreInfo.address.val,//公司地址(必填)
    phone : self.moreInfo.phone.val,//公司联系电话
    dttid : self.moreInfo.dttid.val,//所属区域(必填)
    salesman : self.moreInfo.salesman.val,//业务员
    qualifica : self.moreInfo.qualifica.val,//资格
    states : self.moreInfo.states.val,//对象状态(企业状态)
    worktype : self.moreInfo.worktype.val,//经营类别
    busscope : self.moreInfo.busscope.val,//经营范围
    licattach : self.moreInfo.licattach.val,//营业执照附件名称
    remark : self.moreInfo.remark.val,//备注
    clouddisk: self.clouddisk,//云盘空间大小
    cdlimit:self.cdlimit,//云盘有效期
    cdstarttime:'',//云盘有效开始时间
    cdendtime:'' //云盘有效结束时间
 })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 获取后台用户个人详情
export function getBackstageDetail(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getCompanyById', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid: sessionStorage.orgid, //机构uuid（从org对象获取,必填）
    entity: 'company', //操作对象(使用默认)
    cpuserid: obj.psuserid//用户UUID(不能为空)})
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 删除机构
export function removeOrgById(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.removeOrgById', //接口名称(使用默认)
    orgid: obj.orgid,//选中那个组织机构的orgid（hidden，必填）
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 编辑机构
export function editOrgById(obj){
  var self = obj.self;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.editOrgById', //接口名称(使用默认)
    sorts: '0',
    orgid: self.orgList[self.showIndex].orgid,//机构orgid（hidden，必填）
    parentid: self.orgList[self.showIndex].parentid,//父机构orgid（hidden，必填）
    orgename: self.deparment.orgename,//英文名称（必填）
    orgcname: self.deparment.orgcname,//中文名称（必填）
    phone: self.deparment.phone,//联系电话
    mobile: self.deparment.mobile,//联系手机
    remark: self.deparment.remark,//备注
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 添加子机构
export function addOrg(obj){
  var self = obj.self;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.addOrg', //接口名称(使用默认)
    parentid: self.orgList[self.showIndex].orgid,//选中那个组织机构的orgid（hidden，必填）
    orgename: self.deparment.orgename,//英文名称（必填）
    orgcname: self.deparment.orgcname,//中文名称（必填）
    phone: self.deparment.phone,//联系电话
    mobile: self.deparment.mobile,//联系手机
    remark: self.deparment.remark//备注
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 获取企业的全部机构
export function getCompanyOrgList(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getCompanyOrgList', //接口名称(使用默认)
    morgid: sessionStorage.orgid,//登录成功后返回org对象里面封装的那个orgid（hidden，必填）
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
//校验机构用户名唯一性
export function chekPersonRealname(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getPersonCount', //接口名称(使用默认)
      realname: obj.realname,//用户姓名
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//校验个人手机号唯一性
export function chekPersonMobile(obj){
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHUserServiceInfc.getPersonCount', //接口名称(使用默认)
      mobile: obj.mobile //手机号
    },
      true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 获取公司全体员工
export function getCompanyPersonList(obj){
  fetch.getAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.getCompanyPersonList', //接口名称(使用默认)
    morgid: sessionStorage.orgid,//登录成功后返回org对象里面封装的那个orgid（hidden，必填）
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 员工与机构绑定(解除绑定)
export function editOrgposusr(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHUserServiceInfc.editOrgposusr', //接口名称(使用默认)
    orgid: obj.orgid,//选中那个组织机构的orgid（必填）
    psuserid: obj.data,//状态（传值格式：当选中checkbox的时候，向后台传值"psuserid@true"；当取消checkbox的时候，向后台传值"psuserid@false"）
  }).then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
  });
}
// 获取组织机构的员工(包括状态查询)/
export function getInfo(obj){
  var urls = "infcMethod=" + obj.infcMethod + "&" + obj.orgidKey + "=" + obj.orgid
  $.ajax({
      url: fetch.baseURL + "/BSBaseAction.do?" + urls,
      data: obj.data,
      // traditional:true,//防止深度序列化
      cache: false,                      // 不缓存
      processData: false,                // jQuery不要去处理发送的数据
      contentType: false,                // jQuery不要去设置Content-Type请求头
      success: obj.success,
      error:function(error){
          console.log(error)
      }
  })
}



// 校验桌面主题/字体/开机动画名称唯一性
export function getDesktopCount(obj){
  var self = obj.self;
  if (self.desktopObj.dpcname.val == '') return false; 
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHDesktopServiceInfc.getDesktopCount', //接口名称(使用默认)
      types: self.types,//主题/字体/开机动画大类(hidden区分主题、字体、开机)（必填）
      dpcname: self.desktopObj.dpcname.val//主题/字体/开机动画名称（必填）
    },
    true //不需要全屏加载
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 添加桌面主题/字体/开机动画
export function addDesktop(obj){
  self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHDesktopServiceInfc.addDesktop', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    orgid: sessionStorage.orgid, //机构uuid（从org对象获取,必填）
    userid: sessionStorage.userid, //用户uuid（从user对象获取,必填）
    entity: 'desktop', //操作对象(使用默认)
    types: self.types,//'motifs/fonts/cartoons'主题/字体/开机动画大类(hidden区分主题、字体、开机)
    dpcname: self.desktopObj['dpcname'].val,//主题/字体/开机动画名称（必填）
    subtypes: self.desktopObj['subtypes'].val,//主题/字体/开机动画（下拉框）
    vsid:'',//适用版本（下拉框，默认为0）
    isfree: self.desktopObj['isfree'].val,//收费方式
    savetime: self.desktopObj['savetime'].val,//发布日期（必填）
    remark: self.desktopObj['remark'].val//主题/字体/开机动画说明
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//获取桌面列表
export function getDesktopList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", { 
    infcMethod: 'BHDesktopServiceInfc.buildDesktopListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'desktop', //操作对象(使用默认)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    types: self.types,//主题/字体/开机动画大类(hidden区分主题、字体、开机)
    subtypes: self.subtypes,//主题/字体/开机动画
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 获取反馈内容列表
export function getFeedbackList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHFeedbackServiceInfc.getFeedbackListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //(从org对象获取)
    entity: 'feedback', //操作对象(使用默认)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    starttime: self.fbInfo.starttime.val, //开始时间(选填)
    endtime: self.fbInfo.endtime.val, //结束时间(选填)
    types: localStorage.machine, //消息大类(hidden，产品类型：虹菱平板会议机终端/虹菱平板普教机终端/虹菱平板幼教机终端/虹菱智能电视机终端)
    states: self.statesVal, //问题状态
    subtypes: self.subtypesVal, //问题类别
    levels: self.levelsVal, //级别(选填)
    scct: self.fbInfo.scct.val
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 获取反馈内容详情
export function getFeedbackDetail(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHFeedbackServiceInfc.getFeedbackById', //接口名称(使用默认)
    // sysid: sessionStorage.sysid, //(从org对象获取)
    entity: 'feedback', //操作对象(使用默认)
    fbid: obj.id, //表主键uuid(为空)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 修改反馈内容
export function editFeedback(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHFeedbackServiceInfc.editFeedback', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //(从org对象获取)
    orgid: sessionStorage.orgid, //机构uuid（从org对象获取,必填）
    userid: sessionStorage.userid, //操作用户(从user对象获取,必填)
    entity: 'feedback', //操作对象(使用默认)
    fbid: self.fbid, //表主键uuid(为空)
    states: obj.states,
    answers: obj.content, //回答内容(注意：当这个字段内容不为空的时候，content就不能修改了，只能追加answers)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 大数据模块
// 地区获取
export function getAddress(obj,str){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.getSonDistrictsByDttid', //接口名称(使用默认)
    dttid: str//上级地区的uuid
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 注册统计
export function registeredCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statRegedit', //接口名称(使用默认)
    starttime: self.searchObj.starttime.val, //开始时间
    endtime: self.searchObj.endtime.val, //结束时间
    nation: self.nation, //国家
    province: self.searchObj.province.val, //省
    city: self.searchObj.city.val, //市
    county: '',//'县、区
    town: '', //镇、乡
    village: '' //街道办、村委
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 开机统计
export function statOpenCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statOpen', //接口名称(使用默认)
    types: "系统操作",//对象类型
    subtypes: "开机",//事件子类型
    tbname: '',//操作对象
    pkid: '',//操作对象uuid
    evname: '',//事件名称
    starttime: self.searchObj.starttime.val, //开始时间
    endtime: self.searchObj.endtime.val, //结束时间
    nation: self.nation, //国家
    province: self.searchObj.province.val, //省
    city: self.searchObj.city.val, //市
    county: '',//'县、区
    town: '', //镇、乡
    village: '' //街道办、村委
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 会议频率
export function meetingCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statMeeting', //接口名称(使用默认)
    types: "应用操作",//对象类型
    subtypes: "会议",//事件子类型
    tbname: '',//操作对象
    pkid: '',//操作对象uuid
    evname: '',//事件名称
    starttime: self.searchObj.starttime.val, //开始时间
    endtime: self.searchObj.endtime.val, //结束时间
    nation: self.nation, //国家
    province: self.searchObj.province.val, //省
    city: self.searchObj.city.val, //市
    county: '',//'县、区
    town: '', //镇、乡
    village: '' //街道办、村委
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 文件统计
export function fileCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statFile', //接口名称(使用默认)
    types: "应用操作",//对象类型
    subtypes: "文件",//事件子类型
    tbname: '',//操作对象
    pkid: '',//操作对象uuid
    evname: '',//事件名称
    starttime: self.searchObj.starttime.val, //开始时间
    endtime: self.searchObj.endtime.val, //结束时间
    nation: self.nation, //国家
    province: self.searchObj.province.val, //省
    city: self.searchObj.city.val, //市
    county: '',//'县、区
    town: '', //镇、乡
    village: '' //街道办、村委
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 云盘统计
export function panCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statClouddisk', //接口名称(使用默认)
    tbname: '应用操作',//操作对象
    subtypes: "cloud",//事件子类型
    pkid: '',//操作对象uuid
    evname: '',//事件名称
    starttime: self.searchObj.starttime.val, //开始时间
    endtime: self.searchObj.endtime.val, //结束时间
    nation: self.nation, //国家
    province: self.searchObj.province.val, //省
    city: self.searchObj.city.val, //市
    county: '',//'县、区
    town: '', //镇、乡
    village: '' //街道办、村委
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 应用统计
export function appCount(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHBigdataServiceInfc.statApps', //接口名称(使用默认)
    types: '应用操作',//对象类型（必填）
    subtypes: 'app',//事件子类型（必填）
    apptypes: self.apptypes,//应用类型
    scct: self.scct,//搜索条件
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


//校验主板名/型号唯一性
export function getMainboardCount(obj,str){
  var boo = false;
  if (str == 'isMbname') {
    boo = true;
    if(obj.mbname == '') return false;
  } else {
    boo = false;
    if(obj.modnum == '') return false;
  }
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHMainboardServiceInfc.getMainboardCount', //接口名称(使用默认)
      mbname: boo ? obj.mbname : '',//主板名
      modnum: !boo ? obj.modnum : ''//主板型号
    },
      true
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 主板规格入录
export function updateMainboard(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: boo ? 'BHMainboardServiceInfc.editMainboard' : 'BHMainboardServiceInfc.addMainboard', //接口地址(默认)
    entity: 'mainboard', //操作表主体(不能为空，使用默认)
    mbid: self.gdid || '', //主板uuid(可为空)
    types: self.parvalObj.types.val, //主板大类型(通过接口加载选择项)
    subtypes: self.parvalObj.subtypes.val,//主板子类（必填）
    states: '0', //状态(使用默认)
    sorts:'0', //序号(使用默认0)
    savetime: '', //录入时间(不能为空)
    remark: self.content, //备注(可为空)
    sysid: sessionStorage.sysid, //当前登录系统uuid(不能为空)
    urls:'#', //商品拓展链接(使用默认)
    orgid: sessionStorage.orgid, //当前登录机构uuid(不能为空)
    userid: sessionStorage.userid, //当前登录用户uuid(不能为空) 
    cmos: self.parvalObj.cmos.val,//芯片（选填）
    mbname: self.parvalObj.mbname.val, //主板名称（必填）
    modnum: self.parvalObj.modnum.val, //主板型号（必填）
    gpu: self.parvalObj.gpu.val, //Gpu（必填）
    ram: self.parvalObj.ram.val, //（必填）
    flash: self.parvalObj.flash.val, //（必填）
    sdcard: self.parvalObj.sdcard.val, //内存类型（选填）
    cpu: self.parvalObj.cpu.val, //（选填）
    arvs: self.parvalObj.arvs.val, //AndroidVersion（选填）
    resolution: self.parvalObj.resolution.val, //分辨率（选填）
    atv: self.parvalObj.atv.val, //（选填）
    dtv: self.parvalObj.dtv.val //（选填）
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


//主板规格列表
export function mainboardList(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMainboardServiceInfc.buildMainboardListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'mainboard', //操作对象(使用默认)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    types: self.typesObj[self.types], //主板大类
    subtypes: self.subtypesObj[self.types] ? self.subtypesObj[self.types][self.subtypes] : '', //主板小类
    modnum: self.modnum, //主板型号
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 主板规格详情
export function mainboardDetail(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMainboardServiceInfc.getMainboardById', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'mainboard', //操作对象(使用默认)
    mbid: obj.id //主板规格UUID(不能为空)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 获取主板规则
export function getMainboardType(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMainboardServiceInfc.getMainboardType', //接口名称(使用默认)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//校验主板序列号/mac唯一性
export function getMbitemCount(obj, str){
  var boo = false;
  if (str == 'isSeries') {
    boo = true;
    if( obj.series == '' ) return false;
  } else {
    boo = false;
    if( obj.mac == '' ) return false;
  }
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: 'BHMainboardServiceInfc.getMbitemCount', //接口名称(使用默认)
      series: boo ? obj.series : '',//序列号
      mac: !boo ? obj.mac : ''
    },
      true
    )
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 主板单品入录/修改
export function updateMbitem(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: boo ? 'BHMainboardServiceInfc.editMbitem' : 'BHMainboardServiceInfc.addMbitem', //接口地址(默认)
    entity: 'mbitem', //操作表主体(不能为空，使用默认)
    mbitid: self.gditid || '', //主板单品uuid(可为空)
    types:'', //主板单品类型
    states: '0', //状态(使用默认)
    sorts:'0', //序号(使用默认0)
    savetime: '', //录入时间(不能为空)
    remark: '', //备注(可为空)
    sysid: sessionStorage.sysid, //当前登录系统uuid(不能为空)
    urls:'#', //商品拓展链接(使用默认)
    orgid: sessionStorage.orgid, //当前登录机构uuid(不能为空)
    userid: sessionStorage.userid, //当前登录用户uuid(不能为空) 
    mbid: self.finishedParvalObj.mbid.val,//主板规格UUid（必填）
    series: self.finishedParvalObj.series.val, //序列号（必填）
    mac: self.finishedParvalObj.mac.val //mac地址（必填）
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//刷机
export function rooTsty(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
      infcMethod: self.gditid ? 'BHGoodsServiceInfc.refurbishGoodsitem' : 'BHGoodsServiceInfc.addGoodsitem', //接口路径名称(使用默认值)
      sysid: sessionStorage.sysid, //子平台uuid(必填，从system获取)
      orgid: sessionStorage.orgid, //所属机构(必填，从org获取)
      userid: sessionStorage.userid, //操作用户(必填，从user获取)
      entity: 'goodsitem', //操作表主体(不能为空，使用默认)
      gditid: self.gditid, //表主键uuid(为空)
      types: localStorage.machine, //对象类型(使用默认)
      states:'0', //对象状态(使用默认值)
      sorts:'0', //记录序号(使用默认值)
      urls:'', //访问路径(为空)
      savetime:'', //保存时间(为空)
      remark:'', //备注(为空)
      gdiname: self.finishedParvalObj.gdiname.val,
      gdid: self.finishedParvalObj.gdid.val, //产品uuid（选择，带过来）
      gdcode: self.finishedParvalObj.gdcode.val, //产品编号(不能为空)
      mac: self.finishedParvalObj.mac.val //mac地址(不能为空)
      })
      .then(function(res) {
        console.log(res.data)
      })
    .catch(function(error) {
      console.log("error:" + error);
    });
}
// 主板单品列表
export function getMbitemList(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMainboardServiceInfc.getMbitemListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'mbitem', //操作对象(使用默认)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    types: self.types, //主板大类
    subtypes: self.subtypes, //主板小类
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 主板单品详情
export function mbitemDetail(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMainboardServiceInfc.getMbitemById', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'mbitem', //操作对象(使用默认)
    mbitid: obj.id //主板单品UUID(不能为空)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 添加(编辑)版本
export function addVersions(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: boo ? "YKMGBaseServiceInfc.editVersions" : 'YKMGBaseServiceInfc.addVersions', //接口地址(默认)
    entity: 'versions', //操作表主体(不能为空，使用默认)
    vsid: obj.vsid || '', //主板uuid(可为空)
    types: self.versionObj.types.val, //软件类型
    states: self.versionObj.states.val, //状态(使用默认)
    sorts:'0', //序号(使用默认0)
    savetime: self.versionObj.savetime.val, //录入时间(不能为空)
    remark: self.versionObj.remark.val, //备注(可为空)
    sysid: sessionStorage.sysid, //当前登录系统uuid(不能为空)
    urls: self.versionObj.urls.val, //访问路径(使用默认)
    orgid: sessionStorage.orgid, //当前登录机构uuid(不能为空)
    userid: sessionStorage.userid, //当前登录用户uuid(不能为空) 
    swename: self.versionObj.swename.val,//英文名称（必填）
    ustype: self.versionObj.ustype.val, //用户类型（必填）
    curver: self.versionObj.curver.val, //版本号（必填）
    solecode: self.versionObj.solecode.val, //系统唯一识别码（必填）
    mdfive: self.versionObj.mdfive.val, //MD5（必填）
    content: self.versionObj.content.val //说明（必填）
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 版本分页列表
export function buildVersionsListPage(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: self.scct ? 'YKMGBaseServiceInfc.searchVersionsListPage' : 'YKMGBaseServiceInfc.buildVersionsListPage', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'versions', //操作对象(使用默认)
    thisPage: self.thisPage, //当前页码(必填)
    perPage: self.perPage, //每页记录数(必填)
    scct: self.scct, //搜索条件
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 版本详情
export function getVersionsById(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'YKMGBaseServiceInfc.getVersionsById', //接口名称(使用默认)
    sysid: sessionStorage.sysid, //操作平台(使用默认)
    entity: 'versions', //操作对象(使用默认)
    vsid: obj.visd //选中那个版本的id(不能为空)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}


// 控制中心
//获取权限列表
export function getTpopedomList(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHControlServiceInfc.getTpopedomList' //接口名称(使用默认)
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//获取控制中心时间选项
export function getLimittimeList(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHControlServiceInfc.getLimittimeList', //接口名称(使用默认)
    types: obj.types,//操作对象类型（goods/user）（必填）
    tbid: obj.tbid, //操作对象id（产品id/用户id）（必填）
    pdmid: obj.pdmid,//权限ID（必填）
    year:'',//年（选填）
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}
//保存权限关系
export function saveGoodsppd(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHControlServiceInfc.saveGoodsppd', //接口名称(使用默认)
    entity: 'goodsppd', //操作表主体(不能为空，使用默认)
    gpid:'', //权限关系uuid(可为空)
    types: obj.types, //操作对象类型（goods/user）
    states: obj.states, //状态(使用默认)
    sorts:'0', //序号(使用默认0)
    savetime: '', //录入时间(可为空)
    remark: '', //备注(可为空)
    sysid: sessionStorage.sysid, //当前登录系统uuid(不能为空)
    urls:'#', //访问路径(使用默认)
    orgid: sessionStorage.orgid, //当前登录机构uuid(不能为空)
    userid: sessionStorage.userid, //当前登录用户uuid(不能为空) 
    tbid: obj.tbid,//操作对象id（产品id/用户id）（必填）
    pdmid: obj.pdmid, //权限id（必填）
    mac: obj.mac, //mac（必填）
    solecode:'', //系统唯一识别码（可为空）
    usstarttime: obj.usstarttime || '', //开始时间（必填）
    usendtime: obj.usendtime || '', //结束时间（必填）
  },true)
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}



// 设置
//获取产品属性信息
export function getGoodsitemByCustid(obj,subatid){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHGoodsServiceInfc.getGoodsitemByCustid', //接口名称(默认)
    custid: sessionStorage.userid, //购买者UUID（默认）
    orgid: sessionStorage.orgid, //
    atid: subatid
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

//根据orgid获取会议列表
export function getMtroomListByOrgid(obj){
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHMeetingServiceInfc.getMtroomListByOrgid', //接口名称(默认)
    custid: sessionStorage.userid, //购买者UUID（默认）
    orgid: sessionStorage.orgid //
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

//设置产品属性
export function saveGoodsPpt(obj){
  var object = obj.infoObj;
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHGoodsServiceInfc.saveGoodsPpt', //接口名称(默认)
    sysid: sessionStorage.sysid, // （默认）
    orgid: sessionStorage.orgid, //组织机构UUID
    entity:'goodsppt' , //操作实体（默认）
    gditid: object.gditid, //单品UUID
    states:'0' , //状态（默认）
    sorts:'0',// 序号（默认）
    userid: sessionStorage.userid, //操作用户UUID
    remark: '', // 备注
    username: object.goodsppt.username, //企业邮箱
    password: obj.password, //邮箱密码
    mtrid: object.goodsppt.mtrid, //会议室UUID(下拉框)
    smtpadr: object.goodsppt.smtpadr, //SMTP地址
    smtpport: object.goodsppt.smtpport, //SMTP端口
    mac: object.mac //mac地址
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 获取头像列表
export function getSignImgList(obj){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {
    infcMethod: 'BHAttachServiceInfc.getSignImgList', //接口名称(默认)
    orgid: sessionStorage.orgid //组织机构UUID
  })
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 模板
export function model(obj,boo){
  var self = obj.self
  fetch.postAxios("/CSBaseAction.do", {})
    .then(obj.success)
    .catch(function(error) {
      console.log("error:" + error);
    });
}

// 机器绑定投放广告资源接口
export function getAdverTising(obj,index,productList){  
  var self = obj.self;
  var macstr="";
  for(let i=0;i<productList.length;i++){
    var subisckd=productList[i].isckd;
    if(subisckd) {
      macstr = macstr+","+productList[i].mac;
    }
  }
  fetch.postAxios("/CSBaseAction.do",{
    infcMethod: 'BHPlayadServiceInfc.bangdingAdSource', //接口路径名称(默认)
    sysid:sessionStorage.sysid,                       //登录用户sysid（必填）
    userid: sessionStorage.userid,                     //登录用户userid（必填）
    orgid: sessionStorage.orgid,                      // 登录用户orgid（必填）
    atid: self.product[index].atid,                    //资源uuid(必填)
    mac:  macstr                  //数组元素1
})
 .then(function(res) {
      console.log(res.data)
    })
    .catch(function(error) {
      console.log("error:" + error);
    });
}

//投放/停止投放广告资源接口
export function Period(obj,index,states){  
  var self = obj.self;
  console.log(states);
  console.log(self.product[index].atid);
  fetch.postAxios("/CSBaseAction.do",{
    infcMethod: 'BHPlayadServiceInfc.playAdSource', //接口路径名称(默认)
    atid: self.product[index].atid,                    //资源uuid(必填)
    states:  states                  //（播放为1，停止播放为0）
})
 .then(function(res) {
      console.log(res.data)
    })
    .catch(function(error) {
      console.log("error:" + error);
    });
}