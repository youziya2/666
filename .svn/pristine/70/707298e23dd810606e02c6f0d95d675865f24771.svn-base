import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: 'logins'},//设置默认路由路径
    {//登陆路由
      path:'/logins',
      component: () => import('@/views/login'),
      meta:{
        colorselect: '#4377EE'
      },
      children:[
        {path: '/', redirect: 'login'},
        {
          path:'/logins/login',
          component: () => import('@/views/logins/login')
        },
        {
          path:'/logins/changePssword',
          component: () => import('@/views/logins/changePssword'),
          children:[
            {path: '/', redirect: 'stepone'},
            {
              path:'/logins/changePssword/stepone',
              component: () => import('@/views/logins/step/stepone')
            },
            {
              path:'/logins/changePssword/steptwo',
              name: 'steptwo',
              component: () => import('@/views/logins/step/steptwo')
            },
            {
              path:'/logins/changePssword/stepthree',
              component: () => import('@/views/logins/step/stepthree')
            }
          ]
        }
      ]
    },
    // 主页面路由
    // {
    //   path: '/management',
    //   meta:{
    //     colorselect: '#4377EE'
    //   },
    //   redirect: '/management/productList/lists',
    //   component: () => import('@/views/management'),
    //   children:[]}
    // 主页面路由
    // {
    //   path: '/management',
    //   meta:{
    //     colorselect: '#4377EE'
    //   },
    //   redirect: '/management/productList/lists',
    //   component: () => import('@/views/management'),
    //   children:[
    //     {//产品管理 
    //       path: '/management/productList',
    //       redirect: '/management/productList/lists',
    //       component: () => import('@/views/navigation/productList'),
    //       meta:{name:'产品管理'},
    //       children:[
    //         {
    //           path:'/management/productList/entering',
    //           component: () => import('@/views/productList/entering')
    //         },
    //         {
    //           path:'/management/productList/lists',
    //           name:'mp_lists',
    //           component: () => import('@/views/productList/lists')
    //         },
    //         {
    //           path:'/management/productList/productDetails/:id',
    //           component: () => import('@/views/productList/productDetails')
    //         },
    //         {
    //           path:'/management/productList/productModification/:id',
    //           component: () => import('@/views/productList/productModification')
    //         }
    //       ]
    //     },
    //     {//桌面管理 
    //       path: '/management/desktopList',
    //       component: () => import('@/views/navigation/desktopList'),
    //       redirect: '/management/desktopList/themeList/themeList',
    //       meta:{name:"桌面管理"},
    //       children:[
    //         {
    //           path:'/management/desktopList/themeList',
    //           redirect: '/management/desktopList/themeList/themeList',
    //           component: () => import('@/views/desktopList/themeList'),
    //           children:[
    //             {
    //               path:'/management/desktopList/themeList/themeList',
    //               component: () => import('@/views/desktopList/themeList/themeList'),
    //               meta:{name:'/management/desktopList/themeList'}
    //             },
    //             {
    //               path:'/management/desktopList/themeList/themeListupload',
    //               component: () => import('@/views/desktopList/themeList/themeListupload'),
    //               meta:{name:'/management/desktopList/themeList'}
    //             }
    //           ]
    //         },
    //         {
    //           path:'/management/desktopList/fontList',
    //           component: () => import('@/views/desktopList/fontList'),
    //           redirect: '/management/desktopList/fontList/fontList',
    //           children:[
    //             {
    //               path:'/management/desktopList/fontList/fontList',
    //               component: () => import('@/views/desktopList/fontList/fontList'),
    //               meta:{name:'/management/desktopList/fontList'}
    //             },
    //             {
    //               path:'/management/desktopList/fontList/fontListupload',
    //               component: () => import('@/views/desktopList/fontList/fontListupload'),
    //               meta:{name:'/management/desktopList/fontList'}
    //             }
    //           ]
    //         },
    //         {
    //           path:'/management/desktopList/animationList',
    //           component: () => import('@/views/desktopList/animationList'),
    //           redirect: '/management/desktopList/animationList/animationList',
    //           children:[
    //             {
    //               path:'/management/desktopList/animationList/animationList',
    //               component: () => import('@/views/desktopList/animationList/animationList'),
    //               meta:{name:'/management/desktopList/animationList'}
    //             },
    //             {
    //               path:'/management/desktopList/animationList/animationListupload',
    //               component: () => import('@/views/desktopList/animationList/animationListupload'),
    //               meta:{name:'/management/desktopList/animationList'}
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {//应用管理
    //       path: '/management/appList',
    //       component: () => import('@/views/navigation/appList'),
    //       redirect:'/management/appList/applists',
    //       meta:{name:"应用管理"},
    //       children:[
    //         {
    //           path:'/management/appList/applists',
    //           component: () => import('@/views/appList/applists')
    //         },
    //         {
    //           path:'/management/appList/appmanagement',
    //           component: () => import('@/views/appList/appmanagement'),
    //           redirect:'/management/appList/appmanagement/appupload',
    //           children:[
    //             {
    //               path:'/management/appList/appmanagement/appupload',
    //               component: () => import('@/views/appList/appmanagement/appupload'),
    //               meta:{name:'/management/appList/appmanagement'}
    //             }
    //           ]
    //         },
    //         {
    //           path:'/management/appList/appchange/:id',
    //           component: () => import('@/views/appList/appchange')
    //         },
    //         {
    //           path:'/management/appList/appdetail/:id',
    //           component: () => import('@/views/appList/appdetail')
    //         }
    //       ]
    //     },
    //     {//会议管理 
    //       path: '/management/conferenceList',
    //       component: () => import('@/views/navigation/conferenceList'),
    //       redirect:'/management/conferenceList/conference',
    //       meta:{name:"会议管理"},
    //       children:[
    //         {
    //           path:'/management/conferenceList/conference',
    //           component: () => import('@/views/conferenceList/conference')
    //         },
    //         {
    //           path:'/management/conferenceList/addconference',
    //           component: () => import('@/views/conferenceList/addconference')
    //         },
    //         {
    //           path:'/management/conferenceList/changeconference/:id',
    //           component: () => import('@/views/conferenceList/changeconference')
    //         },
    //         {
    //           path:'/management/conferenceList/conferenceDetail/:id',
    //           component: () => import('@/views/conferenceList/conferenceDetail')
    //         }
    //       ]
    //     },
    //     {//文件管理
    //       path: '/management/documentList',
    //       component: () => import('@/views/navigation/documentList'),
    //       redirect:'/management/documentList/uploadDocumentList',
    //       meta:{name:"文件管理"},
    //       children:[
    //         {
    //           path:'/management/documentList/documentLists/:id',
    //           component: () => import('@/views/documentList/documentLists'),
    //           meta:{name:'/management/documentList/uploadDocumentList'}
    //         },
    //         {
    //           path:'/management/documentList/uploadDocumentList',
    //           component: () => import('@/views/documentList/uploadDocumentList')
    //         },
    //         {
    //           path:'/management/documentList/documentListsFenlei/:id',
    //           component: () => import('@/views/documentList/documentListsFenlei')
    //         }
    //       ]
    //     },
    //     {//云盘管理 
    //       path: '/management/cloudList',
    //       component: () => import('@/views/navigation/cloudList'),
    //       redirect:'/management/cloudList/interspace',
    //       meta:{name:"云盘管理"},
    //       children:[
    //         {
    //           path:'/management/cloudList/interspace',
    //           component: () => import('@/views/cloudList/interspace'),
    //           redirect:'/management/cloudList/interspace/interspaceList',
    //           children:[
    //             {
    //               path:'/management/cloudList/interspace/interspaceList',
    //               component: () => import('@/views/cloudList/interspace/interspaceList'),
    //               meta:{name:'/management/cloudList/interspace'}
    //             },
    //             {
    //               path:'/management/cloudList/interspace/newinterspace',
    //               component: () => import('@/views/cloudList/interspace/newinterspace'),
    //               meta:{name:'/management/cloudList/interspace'}
    //             },
    //             {
    //               path:'/management/cloudList/interspace/interspaceDetail/:id',
    //               component: () => import('@/views/cloudList/interspace/interspaceDetail'),
    //               meta:{name:'/management/cloudList/interspace'}
    //             },
    //             {
    //               path:'/management/cloudList/interspace/interspaceChange/:id',
    //               component: () => import('@/views/cloudList/interspace/interspaceChange'),
    //               meta:{name:'/management/cloudList/interspace'}
    //             }
    //           ]
    //         },
    //         {
    //           path:'/management/cloudList/IncrementalSpace',
    //           component: () => import('@/views/cloudList/IncrementalSpace'),
    //           redirect:'/management/cloudList/IncrementalSpace/IncrementalSpaceList',
    //           children:[
    //             {
    //               path:'/management/cloudList/IncrementalSpace/IncrementalSpaceList',
    //               component: () => import('@/views/cloudList/IncrementalSpace/IncrementalSpaceList'),
    //               meta:{name:'/management/cloudList/IncrementalSpace'}
    //             },
    //             {
    //               path:'/management/cloudList/IncrementalSpace/newIncrementalSpace',
    //               component: () => import('@/views/cloudList/IncrementalSpace/newIncrementalSpace'),
    //               meta:{name:'/management/cloudList/IncrementalSpace'}
    //             },
    //             {
    //               path:'/management/cloudList/IncrementalSpace/IncrementalSpaceDetail/:id',
    //               component: () => import('@/views/cloudList/IncrementalSpace/IncrementalSpaceDetail'),
    //               meta:{name:'/management/cloudList/IncrementalSpace'}
    //             },
    //             {
    //               path:'/management/cloudList/IncrementalSpace/IncrementalSpaceChange/:id',
    //               component: () => import('@/views/cloudList/IncrementalSpace/IncrementalSpaceChange'),
    //               meta:{name:'/management/cloudList/IncrementalSpace'}
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {//用户管理 
    //       path: '/management/userList',
    //       component: () => import('@/views/navigation/userList'),
    //       redirect:'/management/userList/NUser',
    //       meta:{name:"用户管理"},
    //       children:[
    //         {//普通用户
    //           path:'/management/userList/NUser',
    //           component: () => import('@/views/userList/NUser'),
    //           redirect:'/management/userList/NUser/NUserList',
    //           children:[
    //             {
    //               path:'/management/userList/NUser/NUserList',
    //               component: () => import('@/views/userList/NUser/NUserList'),
    //               meta:{name:'/management/userList/NUser'}
    //             },
    //             {
    //               path:'/management/userList/NUser/NUserAdd',
    //               component: () => import('@/views/userList/NUser/NUserAdd'),
    //               meta:{name:'/management/userList/NUser'}
    //             },
    //             {
    //               path:'/management/userList/NUser/NUserDetail/:id',
    //               component: () => import('@/views/userList/NUser/NUserDetail'),
    //               meta:{name:'/management/userList/NUser'}
    //             },
    //             {
    //               path:'/management/userList/NUser/NUserChange/:id',
    //               component: () => import('@/views/userList/NUser/NUserChange'),
    //               meta:{name:'/management/userList/NUser'}
    //             }
    //           ]
    //         },
    //         {//后台用户
    //           path:'/management/userList/BUser',
    //           component: () => import('@/views/userList/BUser'),
    //           redirect:'/management/userList/BUser/BUserList',
    //           children:[
    //             {
    //               path:'/management/userList/BUser/BUserList',
    //               component: () => import('@/views/userList/BUser/BUserList'),
    //               meta:{name:'/management/userList/BUser'}
    //             },
    //             {
    //               path:'/management/userList/BUser/BUserAdd',
    //               component: () => import('@/views/userList/BUser/BUserAdd'),
    //               meta:{name:'/management/userList/BUser'}
    //             },
    //             {
    //               path:'/management/userList/BUser/BUserDetail/:id',
    //               component: () => import('@/views/userList/BUser/BUserDetail'),
    //               meta:{name:'/management/userList/BUser'}
    //             },
    //             {
    //               path:'/management/userList/BUser/BUserChange/:id',
    //               component: () => import('@/views/userList/BUser/BUserChange'),
    //               meta:{name:'/management/userList/BUser'}
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {//大数据管理 
    //       path: '/management/bigDataList',
    //       component: () => import('@/views/navigation/bigDataList'),
    //       redirect:'/management/bigDataList/Registrations',
    //       meta:{name:"大数据分析"},
    //       children:[
    //         {
    //           path:'/management/bigDataList/Registrations',
    //           component: () => import('@/views/bigDataList/Registrations')
    //         },
    //         {
    //           path:'/management/bigDataList/userHabit',
    //           component: () => import('@/views/bigDataList/userHabit')
    //         },
    //         {
    //           path:'/management/bigDataList/usageAmount',
    //           component: () => import('@/views/bigDataList/usageAmount'),
    //           redirect:'/management/bigDataList/usageAmount/usageAmounthy',
    //           children:[
    //             {
    //               path:'/management/bigDataList/usageAmount/usageAmounthy',
    //               component: () => import('@/views/bigDataList/usageAmount/usageAmounthy'),
    //               meta:{name:'/management/bigDataList/usageAmount'}
    //             },
    //             {
    //               path:'/management/bigDataList/usageAmount/usageAmountyy',
    //               component: () => import('@/views/bigDataList/usageAmount/usageAmountyy'),
    //               meta:{name:'/management/bigDataList/usageAmount'}
    //             },
    //             {
    //               path:'/management/bigDataList/usageAmount/usageAmountwj',
    //               component: () => import('@/views/bigDataList/usageAmount/usageAmountwj'),
    //               meta:{name:'/management/bigDataList/usageAmount'}
    //             },
    //             {
    //               path:'/management/bigDataList/usageAmount/usageAmountyp',
    //               component: () => import('@/views/bigDataList/usageAmount/usageAmountyp'),
    //               meta:{name:'/management/bigDataList/usageAmount'}
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {//用户反馈 
    //       path: '/management/feedBack',
    //       component: () => import('@/views/navigation/feedBack'),
    //       redirect:'/management/feedBack/feedBackList',
    //       meta:{name:"用户反馈"},
    //       children:[
    //         {
    //           path:'/management/feedBack/feedBackList',
    //           component: () => import('@/views/feedBack/feedBackList')
    //         },
    //         {
    //           path:'/management/feedBack/feedBackDetail/:id',
    //           component: () => import('@/views/feedBack/feedBackDetail')
    //         }
    //       ]
    //     },
    //     {//控制中心 
    //       path: '/management/control',
    //       component: () => import('@/views/navigation/control'),
    //       redirect:'/management/control/controlList',
    //       meta:{name:"控制中心"},
    //       children:[
    //         {
    //           path:'/management/control/controlList',
    //           component: () => import('@/views/control/controlList')
    //         },
    //         {
    //           path:'/management/control/controlListUser',
    //           component: () => import('@/views/control/controlListUser')
    //         }
    //       ]
    //     }
    //   ]
    // },
    
  ]
})
