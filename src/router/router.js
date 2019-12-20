const routerObj = {
  'motherboardNorm':{path:'/management/motherboardNorm',flag:'icon-liebiao',pdename:"BHMainboardManage"},//主板标准
  'motherboardProducts':{path:'/management/motherboardProducts',flag:'icon-liebiao',pdename:"BHMbitemManage"},//主板单品
  'product':{path:'/management/productList',flag:'icon-moban',pdename:"BHGoodsManage"},//产品管理
  'desktopList':{path:'/management/desktopList',flag:'icon-dianying_',pdename:"BHDesktopManage"},//桌面管理
  'appList':{path:'/management/appList',flag:'icon-liebiao',pdename:"BHAppsManage"},//应用管理
  'meetingRoom':{path:'/management/meetingRoom',flag:'icon-liebiao',pdename:"BHMtroomManage"},//会议室管理
  'conferenceList':{path:'/management/conferenceList',flag:'icon-liebiao',pdename:"BHMeetingManage"},//会议管理
  'documentList':{path:'/management/documentList',flag:'icon-liebiao',pdename:"BHAttachManage"},//文件管理
  'meetingFile':{path:'/management/meetingFile',flag:'icon-liebiao',pdename:"BHMtfileManage"},//会议文件
  'userList':{path:'/management/userList',flag:'icon-user',pdename:"BHUserManage"},//用户管理
  'organization':{path:'/management/organization',flag:'icon-zuzhijigou',pdename:"BHOrgManage"},//组织机构
  'systemeinstellungen':{path:'/management/systemeinstellungen',flag:'icon-guanliweihu_huaban',pdename:"BHGoodspptManage"},//用户设置
  'bigDataList':{path:'/management/bigDataList',flag:'icon-yonghu',pdename:"BHBigdataManage"},//大数据
  'feedBack':{path:'/management/feedBack',flag:'icon-huihua-copy',pdename:"BHFeedbackManage"},//用户反馈
  'control':{path:'/management/control',flag:'icon-diannao-',pdename:"BHControlCenterManage"},//控制中心
  'version':{path:'/management/systemVersion',flag:'icon-bbdz',pdename:"BHVersionsManage"},//系统版本
}
export const dynamicRouter = [
  {//会室议管理 
    path: routerObj.meetingRoom.path,
    component: () => import('@/views/navigation/meetingRoom'),
    redirect:'/management/meetingRoom/roomList',
    meta:{pdename:routerObj.meetingRoom.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
      {
        path:'/management/meetingRoom/roomList',
        component: () => import('@/views/meetingRoom/roomList'),
        meta:{boo:true,flag: routerObj.meetingRoom.flag}
      },
      {
        path:'/management/meetingRoom/addRoom',
        component: () => import('@/views/meetingRoom/addRoom')
      },
      {
        path:'/management/meetingRoom/changeRoom/:id',
        component: () => import('@/views/meetingRoom/changeRoom')
      },
      {
        path:'/management/meetingRoom/roomDetail/:id',
        component: () => import('@/views/meetingRoom/roomDetail')
      }
    ]
  },
  {//会议文件
    path: routerObj.meetingFile.path,
    component: () => import('@/views/navigation/meetingFile'),
    redirect:'/management/meetingFile/uploadDocumentList',
    meta:{pdename: routerObj.meetingFile.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
      {
        path:'/management/meetingFile/uploadDocumentList',
        component: () => import('@/views/meetingFile/uploadDocumentList'),
        meta:{boo:true,flag: routerObj.meetingFile.flag}
      },
      {
        path:'/management/meetingFile/documentListsFenlei/:id',
        component: () => import('@/views/meetingFile/documentListsFenlei')
      }
    ]
  },
  {//组织机构
    path: routerObj.organization.path,
    component: () => import('@/views/navigation/organization'),
    redirect:'/management/organization/Structure',
    meta:{pdename:routerObj.organization.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
      {//组织结构
        path:'/management/organization/Structure',
        component: () => import('@/views/organization/Structure'),
        meta:{name:'/management/organization/Structure',boo:true,flag: routerObj.organization.flag}
      }
    ]
  },
  {//用户设置
    path: routerObj.systemeinstellungen.path,
    component: () => import('@/views/navigation/Systemeinstellungen'),
    redirect:'/management/systemeinstellungen/Setting',
    meta:{pdename:routerObj.systemeinstellungen.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
      {//基础设置
        path:'/management/systemeinstellungen/Setting',
        component: () => import('@/views/systemeinstellungen/Setting'),
        meta:{name:'/management/systemeinstellungen/Setting',boo:true,flag: routerObj.systemeinstellungen.flag}
      },
      {//签到头像录入
        path:'/management/systemeinstellungen/CheckIn',
        component: () => import('@/views/systemeinstellungen/CheckIn'),
        // meta:{name:'/management/systemeinstellungen/CheckIn',boo:true,flag: routerObj.systemeinstellungen.flag}
      }
    ]
  },
  {//主板规格管理 
    path: routerObj.motherboardNorm.path,
    redirect: '/management/motherboardNorm/lists',
    component: () => import('@/views/navigation/motherboardNorm'),
    meta:{pdename:routerObj.motherboardNorm.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
          {
            path:'/management/motherboardNorm/entering',
            component: () => import('@/views/motherboardNorm/template/entering'),
            meta:{name:'/management/motherboardNorm/lists'}
          },
          {
            path:'/management/motherboardNorm/lists',
            name:'mm_lists',
            component: () => import('@/views/motherboardNorm/template/lists'),
            meta:{name:'/management/motherboardNorm/lists',boo:true,flag:routerObj.motherboardNorm.flag}
          },
          {
            path:'/management/motherboardNorm/productDetails/:id',
            component: () => import('@/views/motherboardNorm/template/productDetails'),
            meta:{name:'/management/motherboardNorm/lists'}
          },
          {
            path:'/management/motherboardNorm/productModification/:id',
            component: () => import('@/views/motherboardNorm/template/productModification'),
            meta:{name:'/management/motherboardNorm/lists'}
          }
    ] 
  },
  {//主板单品管理 
    path: routerObj.motherboardProducts.path,
    redirect: '/management/motherboardProducts/finishedList',
    component: () => import('@/views/navigation/motherboardProducts'),
    meta:{pdename:routerObj.motherboardProducts.pdename},
    beforeEnter(to, from, next) {
      if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
      next()
    },
    children:[
          {
            path:'/management/motherboardProducts/finishedEntering',
            component: () => import('@/views/motherboardProducts/finished/finishedEntering'),
            meta:{name:'/management/motherboardProducts/finishedList'} 
          },
          {
            path:'/management/motherboardProducts/finishedList',
            name:'mmf_lists',
            component: () => import('@/views/motherboardProducts/finished/finishedList'),
            meta:{name:'/management/motherboardProducts/finishedList',boo:true,flag: routerObj.motherboardProducts.flag}
          },
          {
            path:'/management/motherboardProducts/finishedDetail/:id',
            component: () => import('@/views/motherboardProducts/finished/finishedDetail'),
            meta:{name:'/management/motherboardProducts/finishedList'}
          },
          {
            path:'/management/motherboardProducts/finishedModification/:id',
            component: () => import('@/views/motherboardProducts/finished/finishedModification'),
            meta:{name:'/management/motherboardProducts/finishedList'}
          }
    ]
  },
          {//产品管理 
            path: routerObj.product.path,
            redirect: '/management/productList/lists',
            component: () => import('@/views/navigation/productList'),
            meta:{pdename: routerObj.product.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/productList/template',
                component: () => import('@/views/productList/productTemplate'),
                redirect:'/management/productList/lists',
                children:[
                  {
                    path:'/management/productList/entering',
                    component: () => import('@/views/productList/template/entering'),
                    meta:{name:'/management/productList/lists'}
                  },
                  {
                    path:'/management/productList/lists',
                    name:'mp_lists',
                    component: () => import('@/views/productList/template/lists'),
                    meta:{name:'/management/productList/lists',boo:true,flag:routerObj.product.flag}
                  },
                  {
                    path:'/management/productList/productDetails/:id',
                    component: () => import('@/views/productList/template/productDetails'),
                    meta:{name:'/management/productList/lists'}
                  },
                  {
                    path:'/management/productList/productModification/:id',
                    component: () => import('@/views/productList/template/productModification'),
                    meta:{name:'/management/productList/lists'}
                  }
                ]
              },
              {
                path:'/management/productList/finished',
                component: () => import('@/views/productList/productFinished'),
                redirect:'/management/productList/finishedList',
                children:[
                  {
                    path:'/management/productList/finishedEntering',
                    component: () => import('@/views/productList/finished/finishedEntering'),
                    meta:{name:'/management/productList/finishedList'}
                  },
                  {
                    path:'/management/productList/finishedList',
                    name:'finishedList',
                    component: () => import('@/views/productList/finished/finishedList'),
                    meta:{name:'/management/productList/finishedList',boo:true}
                  },
                  {
                    path:'/management/productList/finishedDetail/:id',
                    component: () => import('@/views/productList/finished/finishedDetail'),
                    meta:{name:'/management/productList/finishedList'}
                  },
                  {
                    path:'/management/productList/finishedModification/:id',
                    component: () => import('@/views/productList/finished/finishedModification'),
                    meta:{name:'/management/productList/finishedList'}
                  }
                ]
              }
            ]
          },
          {//桌面管理 
            path: routerObj.desktopList.path,
            component: () => import('@/views/navigation/desktopList'),
            redirect: '/management/desktopList/animationList/animationList',
            meta:{pdename: routerObj.desktopList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/desktopList/animationList',
                component: () => import('@/views/desktopList/animationList'),
                redirect: '/management/desktopList/animationList/animationList',
                children:[
                  {
                    path:'/management/desktopList/animationList/animationList',
                    component: () => import('@/views/desktopList/animationList/animationList'),
                    meta:{name:'/management/desktopList/animationList',boo:true, flag: routerObj.desktopList.flag}
                  },
                  {
                    path:'/management/desktopList/animationList/animationListupload',
                    component: () => import('@/views/desktopList/animationList/animationListupload'),
                    meta:{name:'/management/desktopList/animationList'}
                  }
                ]
              },
              {
                path:'/management/desktopList/themeList',
                redirect: '/management/desktopList/themeList/themeList',
                component: () => import('@/views/desktopList/themeList'),
                meta :{},
                children:[
                  {
                    path:'/management/desktopList/themeList/themeList',
                    component: () => import('@/views/desktopList/themeList/themeList'),
                    meta:{name:'/management/desktopList/themeList',boo: true}
                  },
                  {
                    path:'/management/desktopList/themeList/themeListupload',
                    component: () => import('@/views/desktopList/themeList/themeListupload'),
                    meta:{name:'/management/desktopList/themeList'}
                  }
                ]
              },
              {
                path:'/management/desktopList/fontList',
                component: () => import('@/views/desktopList/fontList'),
                redirect: '/management/desktopList/fontList/fontList',
                children:[
                  {
                    path:'/management/desktopList/fontList/fontList',
                    component: () => import('@/views/desktopList/fontList/fontList'),
                    meta:{name:'/management/desktopList/fontList',boo:true}
                  },
                  {
                    path:'/management/desktopList/fontList/fontListupload',
                    component: () => import('@/views/desktopList/fontList/fontListupload'),
                    meta:{name:'/management/desktopList/fontList'}
                  }
                ]
              }
            ]
          },
          {//应用管理
            path: routerObj.appList.pdename,
            component: () => import('@/views/navigation/appList'),
            redirect:'/management/appList/applists',
            meta:{pdename:routerObj.appList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/appList/applists',
                component: () => import('@/views/appList/applists'),
                meta:{boo:true,flag: routerObj.appList.flag}
              },
              {
                path:'/management/appList/appmanagement',
                component: () => import('@/views/appList/appmanagement'),
                redirect:'/management/appList/appmanagement/appupload',
                children:[
                  {
                    path:'/management/appList/appmanagement/appupload',
                    component: () => import('@/views/appList/appmanagement/appupload'),
                    meta:{name:'/management/appList/appmanagement',boo:true}
                  }
                ]
              },
              {
                path:'/management/appList/appchange/:id',
                component: () => import('@/views/appList/appchange')
              },
              {
                path:'/management/appList/appdetail/:id',
                component: () => import('@/views/appList/appdetail')
              }
            ]
          },
          {//会议管理 
            path: routerObj.conferenceList.path,
            component: () => import('@/views/navigation/conferenceList'),
            redirect:'/management/conferenceList/conference',
            meta:{pdename:routerObj.conferenceList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/conferenceList/conference',
                component: () => import('@/views/conferenceList/conference'),
                meta:{boo:true,flag: routerObj.conferenceList.flag}
              },
              {
                path:'/management/conferenceList/addconference',
                component: () => import('@/views/conferenceList/addconference')
              },
              {
                path:'/management/conferenceList/changeconference/:id',
                component: () => import('@/views/conferenceList/changeconference')
              },
              {
                path:'/management/conferenceList/conferenceDetail/:id',
                component: () => import('@/views/conferenceList/conferenceDetail')
              }
            ]
          },
          {//文件管理
            path: routerObj.documentList.path,
            component: () => import('@/views/navigation/documentList'),
            redirect:'/management/documentList/documentListsFenlei/image',
            meta:{pdename:routerObj.documentList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/documentList/uploadDocumentList',
                component: () => import('@/views/documentList/uploadDocumentList'),
                // meta:{boo:true,flag: routerObj.documentList.flag}
              },
              {
                path:'/management/documentList/documentListsFenlei/:id',
                component: () => import('@/views/documentList/documentListsFenlei'),
                meta:{boo:true,flag: routerObj.documentList.flag}
              }
            ]
          },
          {//用户管理 
            path: routerObj.userList.path,
            component: () => import('@/views/navigation/userList'),
            redirect:'/management/userList/NUser',
            meta:{pdename:routerObj.userList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {//普通用户
                path:'/management/userList/NUser',
                component: () => import('@/views/userList/NUser'),
                redirect:'/management/userList/NUser/NUserList',
                children:[
                  {
                    path:'/management/userList/NUser/NUserList',
                    component: () => import('@/views/userList/NUser/NUserList'),
                    meta:{name:'/management/userList/NUser',boo:true,flag: routerObj.userList.flag}
                  },
                  {
                    path:'/management/userList/NUser/NUserAdd',
                    component: () => import('@/views/userList/NUser/NUserAdd'),
                    meta:{name:'/management/userList/NUser'}
                  },
                  {
                    path:'/management/userList/NUser/NUserDetail/:id',
                    component: () => import('@/views/userList/NUser/NUserDetail'),
                    meta:{name:'/management/userList/NUser'}
                  },
                  {
                    path:'/management/userList/NUser/NUserChange/:id',
                    component: () => import('@/views/userList/NUser/NUserChange'),
                    meta:{name:'/management/userList/NUser'}
                  }
                ]
              },
              {//后台用户
                path:'/management/userList/BUser',
                component: () => import('@/views/userList/BUser'),
                redirect:'/management/userList/BUser/BUserList',
                children:[
                  {
                    path:'/management/userList/BUser/BUserList',
                    component: () => import('@/views/userList/BUser/BUserList'),
                    meta:{name:'/management/userList/BUser',boo:true}
                  },
                  {
                    path:'/management/userList/BUser/BUserAdd',
                    component: () => import('@/views/userList/BUser/BUserAdd'),
                    meta:{name:'/management/userList/BUser'}
                  },
                  {
                    path:'/management/userList/BUser/BUserDetail/:id',
                    component: () => import('@/views/userList/BUser/BUserDetail'),
                    meta:{name:'/management/userList/BUser'}
                  },
                  {
                    path:'/management/userList/BUser/BUserChange/:id',
                    component: () => import('@/views/userList/BUser/BUserChange'),
                    meta:{name:'/management/userList/BUser'}
                  }
                ]
              },
              {//组织结构
                path:'/management/userList/Structure',
                component: () => import('@/views/userList/Structure')
              }
            ]
          },
          {//大数据管理 
            path: routerObj.bigDataList.path,
            component: () => import('@/views/navigation/bigDataList'),
            redirect:'/management/bigDataList/userHabit',
            meta:{pdename:routerObj.bigDataList.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/bigDataList/userHabit',
                component: () => import('@/views/bigDataList/userHabit'),
                redirect:'/management/bigDataList/userHabit/Registrations',
                children:[
                  {
                    path:'/management/bigDataList/userHabit/Registrations',
                    component: () => import('@/views/bigDataList/userHabit/Registrations'),
                    meta:{name:'/management/bigDataList/userHabit',boo:true,flag: routerObj.bigDataList.flag}
                  },
                  {
                    path:'/management/bigDataList/userHabit/userUsing',
                    component: () => import('@/views/bigDataList/userHabit/userUsing'),
                    meta:{name:'/management/bigDataList/userHabit'}
                  },
                  {
                    path:'/management/bigDataList/userHabit/usageAmounthy',
                    component: () => import('@/views/bigDataList/userHabit/usageAmounthy'),
                  },
                ]
              },
              {
                path:'/management/bigDataList/usageAmount',
                component: () => import('@/views/bigDataList/usageAmount'),
                redirect:'/management/bigDataList/usageAmount/usageAmountwj',
                children:[
                  // {
                  //   path:'/management/bigDataList/usageAmount/usageAmounthy',
                  //   component: () => import('@/views/bigDataList/usageAmount/usageAmounthy'),
                  //   meta:{name:'/management/bigDataList/usageAmount',boo:true}
                  // },
                  {
                    path:'/management/bigDataList/usageAmount/usageAmountyy',
                    component: () => import('@/views/bigDataList/usageAmount/usageAmountyy'),
                    meta:{name:'/management/bigDataList/usageAmount'}
                  },
                  {
                    path:'/management/bigDataList/usageAmount/usageAmountwj',
                    component: () => import('@/views/bigDataList/usageAmount/usageAmountwj'),
                    meta:{name:'/management/bigDataList/usageAmount',boo:true}
                  },
                  {
                    path:'/management/bigDataList/usageAmount/usageAmountyp',
                    component: () => import('@/views/bigDataList/usageAmount/usageAmountyp'),
                    meta:{name:'/management/bigDataList/usageAmount'}
                  }
                ]
              }
            ]
          },
          {//用户反馈 
            path: routerObj.feedBack.path,
            component: () => import('@/views/navigation/feedBack'),
            redirect:'/management/feedBack/feedBackList',
            meta:{pdename:routerObj.feedBack.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/feedBack/feedBackList',
                component: () => import('@/views/feedBack/feedBackList'),
                meta:{flag: routerObj.feedBack.flag}
              },
              {
                path:'/management/feedBack/feedBackDetail/:id',
                component: () => import('@/views/feedBack/feedBackDetail')
              }
            ]
          },
          {//控制中心 
            path: routerObj.control.path,
            component: () => import('@/views/navigation/control'),
            redirect:'/management/control/controlList',
            meta:{pdename:routerObj.control.pdename},
            beforeEnter(to, from, next) {
              if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
              next()
            },
            children:[
              {
                path:'/management/control/controlList',
                component: () => import('@/views/control/controlList'),
                meta:{flag: routerObj.control.flag}
              },
              {
                path:'/management/control/controlListUser',
                component: () => import('@/views/control/controlListUser')
              }
            ]
          },
                    {//系统版本 
                      path: routerObj.version.path,
                      component: () => import('@/views/navigation/systemVersion'),
                      redirect:'/management/systemVersion/Custom',
                      meta:{pdename:routerObj.version.pdename},
                      beforeEnter(to, from, next) {
                        if(sessionStorage._firstNvb_remove == 'yes') sessionStorage.removeItem('_firstNvb')
                        next()
                      },
                      children:[
                        {
                          path:'/management/systemVersion/Custom',
                          component: () => import('@/views/systemVersion/Custom'),
                          redirect:'/management/systemVersion/custom/VersionList',
                          children:[
                            {
                              path:'/management/systemVersion/custom/VersionList',
                              component: () => import('@/views/systemVersion/custom/VersionList'),
                              meta:{name:'/management/systemVersion/Custom',boo: true,flag: routerObj.version.flag}
                            },
                            {
                              path:'/management/systemVersion/custom/VersionAdd',
                              component: () => import('@/views/systemVersion/custom/VersionAdd'),
                              meta:{name:'/management/systemVersion/Custom'}
                            },
                            {
                              path:'/management/systemVersion/custom/VersionDetail/:id',
                              component: () => import('@/views/systemVersion/custom/VersionDetail'),
                              meta:{name:'/management/systemVersion/Custom'}
                            },
                            {
                              path:'/management/systemVersion/custom/VersionChange/:id',
                              component: () => import('@/views/systemVersion/custom/VersionChange'),
                              meta:{name:'/management/systemVersion/Custom'}
                            }
                          ]
                        },
                        // {//标准版本
                        //   path:'/management/systemVersion/Standard',
                        //   component: () => import('@/views/systemVersion/Standard'),
                        //   meta:{name:'/management/systemVersion/Standard',boo:true,flag: routerObj.version.flag}
                        // }
                      ]
                    },
         
      
]