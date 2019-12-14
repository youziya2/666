<template>
  <div>
    <the-head :backcolor='colorselects' :list="list" :more="more" @cindex="cindex" @clearmore="clearmore" @addxiugai="addxiugai"></the-head>
    <div class="content">
        <router-view @addxiugai="addxiugai" @deletexiugai="deletxiugai"/>
    </div>
  </div>
</template>

<script>
import { getName,closeIcon } from '@/api/methods'
export default {
  provide(){
      return{
          replaceroute:this.replaceroute
      }
    },
  data() {
    return {
      docObj: {
        tit01: '全部文件',
        tit02: '文件列表',
        tit03: '输入关键字搜索',
        tit04: '图片',
        tit05: '视频',
        tit06: '文档',
        tit07: '音乐',
        tit08: '其他',
        tit09: '请上传符合要求的文件',
        tit13: '会议文件',
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
          name: "会议文件",
          route: "/management/meetingFile/uploadDocumentList",
          ico: "icon-liebiao"
        }
      ],
      self:'',
      more:[]
    };
  },
  created(){
    this.docObj = getName('attach',this.docObj)
    if(sessionStorage.getItem('meetingFile') && sessionStorage.getItem('meetingFile').length){
        this.list = JSON.parse(sessionStorage.getItem('meetingFile'));
      }
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  methods: {
    // 在更多路由中点击，或新打开详情页时触发方法，
    addxiugai(cadd){
      if(this.list.find(e => e.name == cadd.name)){
        return false;
      }
      this.list.length >= 9 ?(this.morex(cadd),this.list.splice(1,0,cadd),this.morexiugai(this.list[this.list.length-1])):(this.list.splice(1,0,cadd));
    },
    morexiugai(cadd){
      if(this.more.find(e => e.name == cadd.name)){
        return false;
      }
      this.more.push(cadd);
      this.list.splice((this.list.length-1),1);
    },
    morex(cadd){//查看该页面是否存在更多路由中
      if(this.more.find(e => e.name == cadd.name)){
        this.more.splice(this.more.findIndex(e => e.name == cadd.name),1)
        return false;
      }
    },
    deletxiugai(pas){
      this.list.forEach((e,index) => {
        e.route == pas?this.list.splice(index,1) :'';
      });
    },
    cindex(index){//点击路由关闭图标的事件
      this.self = closeIcon(index,this.list)
    },
    clearmore(){//清除更多路由数组
      this.more.length = 0;
    },
    replaceroute(oldrouter,newrouter){
      this.list.forEach(e => {
        e.route == oldrouter? e.route = newrouter:'';
      })
    }
  },
  computed:{
      colorselects(){
          return this.$route.matched[0].meta.colorselect;
      }
  },
  watch:{
    list:{
      deep:true,
      handler:function(n,o){
        if(n.length < 9 && this.more.length){
          this.list.push(this.more[0]);
          this.more.splice(0,1);
        };
        sessionStorage.setItem('meetingFile',JSON.stringify(this.list));
      }     
    },
    self:{
      deep:true,
      handler:function(n){
        this.$router.push(n);
        this.self = '';
      }
    }
  },
};
</script>
<style>
  .meeting-file-list{
    overflow: hidden;
    text-align: right;
    margin-bottom: 10px;
    padding-bottom:10px;
    border-bottom:  1px solid #F1F4F6;
  }
  .meeting-file-list-left{
    float: right;
  }
  .meeting-file-list-right{
    float: right;
    cursor: pointer;
    width: 16px;
    height: 14px;
    padding: 4px;
    display: flex;
    border: 1px solid #F1F4F6;
  }
  .meeting-file-list-right i{
    font-size: 12px;
    margin: auto;
  }
  .documentLists-detail{
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        position: relative;
        padding-bottom: 0px;
        cursor: pointer;
    }
    .documentLists-img{
        width: 15%;
        display: inline-block;
        vertical-align: middle;
    }
    .documentLists-title{
        width: 60%;
        display: inline-block;
        vertical-align: middle;
    }
    .documentLists-time{
        margin-left: 20px;
    }
    .documentLists-detail img{
        width: 70%;
        margin-left: 10%;
        height: auto;
    }
    .documentLists-detail:hover:not(.documentListsActive){
        background-color: #F1F4F6;
    }
</style>