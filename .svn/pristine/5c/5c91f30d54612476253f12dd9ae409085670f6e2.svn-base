<template>
  <div>
    <the-head :list="list" :backcolor='colorselects'></the-head>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { getName } from '@/api/methods'
export default {
  data() {
    return {
      docObj: {
        tit01: '广告控制',
        tit02: '文件列表',
        tit03: '输入关键字搜索',
        tit04: '图片资源',
        tit05: '视频资源',
        tit06: '文档资源',
        tit07: '音乐资源',
        tit08: '其他资源',
        tit09: '请上传符合要求的文件',
        tit10: '文件管理',
        tit11: '下载选中',
        tit12: '删除选中'
      },
      // 文件类型
      fileType: {
        image: "bmp,png,gif,jpg,jpeg",
        video: "mp4,rmvb,avi,ts,mvb,flv",
        doc: "txt,doc,xls,ppt,docx,xlsx,pptx",
        music: "wma,mp3",
        others: 'zip',
      },
      list: [
        {
          name: "广告控制",
          route: "/management/documentList/uploadDocumentList"
        },
        {
          name: "图片资源",
          route: "/management/documentList/documentListsFenlei/image"
        },
        {
          name: "视频资源",
          route: "/management/documentList/documentListsFenlei/video"
        }
        // ,
        // {
        //   name: "文档资源",
        //   route: "/management/documentList/documentListsFenlei/doc"
        // },
        // {
        //   name: "音乐资源",
        //   route: "/management/documentList/documentListsFenlei/music"
        // },
        // {
        //   name: "其他资源,
        //   route: "/management/documentList/documentListsFenlei/others"
        // }
      ]
    };
  },
  created(){
    this.docObj = getName('attach',this.docObj);
    for (let index = 0; index < this.list.length; index++) {
      if (index == 0) {
        this.list[index].name = this.docObj.tit01;
      } else {
        this.list[index].name = this.docObj['tit0' + (index + 3)];
      }     
    }
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  }
};
</script>
