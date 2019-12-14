
import router  from '../router/index.js'
import {dynamicRouter}  from '../router/router.js'
import { Message } from 'element-ui'
function message(str) {
    Message({
        showClose: true,
        message: str,
        type: 'error',//error,
        duration: 3000
    })
}
export function getRouters(menuList){
    var arr = [] ,arrRouter = [], lg = localStorage.lgtype;
    // 开发环境时，下面的模块后台还没有添加权限
    // if(process.env.NODE_ENV == 'development'){
    //     dynamicRouter[0].path = '/management/meetingRoom';
    //     dynamicRouter[0].title = '会议室管理';
    //     dynamicRouter[0].icon = 'iconfont icon-huiyishi';
    //     arrRouter.push(dynamicRouter[0])
    //     dynamicRouter[1].path = '/management/meetingFile';
    //     dynamicRouter[1].title = '会议文件';
    //     dynamicRouter[1].icon = 'iconfont icon-huiyiwenjian';
    //     arrRouter.push(dynamicRouter[1])
    //     dynamicRouter[2].path = '/management/organization';
    //     dynamicRouter[2].title = '组织机构';
    //     dynamicRouter[2].icon = 'iconfont icon-zuzhijigou';
    //     arrRouter.push(dynamicRouter[2])
    //     dynamicRouter[3].path = '/management/systemeinstellungen';
    //     dynamicRouter[3].title = '产品设置';
    //     dynamicRouter[3].icon = 'iconfont icon-guanliweihu_huaban';
    //     arrRouter.push(dynamicRouter[3])
    // }


    for (let index = 0; index < menuList.length; index++) {
        if(!menuList[index].intourl) continue
        for (let num = 0; num < dynamicRouter.length; num++) { //要把本地路由数组放在最里面，这样子顺序才不会乱，测试时后台还没有加前面的权限，所以不从0开始
            if (dynamicRouter[num].meta.pdename == menuList[index].pdename) {
                arr = menuList[index].intourl.split('?icon=');
                dynamicRouter[num].path = arr[0];
                dynamicRouter[num].title = lg == "chinese" ? menuList[index].pdcname : menuList[index].pdename;
                dynamicRouter[num].icon = "iconfont icon-" + arr[1];
                arrRouter.push(dynamicRouter[num]);
            } 
        } 
        
    }

    if (arrRouter.length>0) {
        arr = [{
            path: '/management',
            meta:{
              colorselect: '#4377EE'
            },
            redirect: arrRouter[0].path,
            component: () => import('@/views/management'),
            children: arrRouter
        },{//404
            path: '/404',
            component: () => import('@/views/notfind')
        }]
        sessionStorage.arrRouter = JSON.stringify(arrRouter);
        console.log(arr)
        // router.addRoutes(arr);
        router.addRoutes(arr.concat([{ //这里调用addRoutes方法，动态添加符合条件的路由
            path: '*',
            redirect: '/404' //所有不匹配路径(*)都重定向到404
        }]));
    }else{
        var url = router.history.current.fullPath
        if(url.indexOf("login") > -1 ) message("该机型暂未激活！")
        router.addRoutes([{ //这里调用addRoutes方法，动态添加符合条件的路由
            path: '*',
            redirect: '/logins' //所有不匹配路径(*)都重定向到login
        }]);
    }
}