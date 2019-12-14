<template>
    <div id="password">
        <!-- 密码框 -->
        <p style="position: relative;height: 100%;">
            <input type="text" class="user-input" v-model="passwordHidden" placeholder="密码" @keyup="handleKey"/>
            <i v-if="isSwitch" class="el-icon-view" @click='changeShowType'></i>
        </p>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                changeType: false,//密码是否遮挡
                passwordHidden:'',//显示出来的内容
                password:''
            }
        },
        created() {
            this.password = this.initPawssword;
            if(this.password) this.passwordHidden = this.regFn(this.password);
        },
        props:{
            initPawssword:String,//密码
            isSwitch:Boolean//密码可见不可见模式切换按钮是否显示
        },
        methods: {
            // 密码是否遮挡
            changeShowType(){
                this.changeType = !this.changeType;
                if (this.changeType){
                    this.passwordHidden = this.password;
                }else{
                    this.passwordHidden = this.regFn(this.password);
                }
            },
            // 正则匹配非*的替换成*
            regFn(val){
                var reg = /[^*]/g, str;
                str = val.replace(reg,'*');
                return str;
            },
            // 监听键盘输入
            handleKey(e){
                // 密码是否遮挡
                if(this.changeType) {
                    this.password = this.passwordHidden;
                }else{
                    //index获取光标位置
                    var index = this.getCursorPosition(),str;
                    // 判断password，如果为空则表示文本框是当前第一个输入，passwordHidden为空则已经删除到最后一个
                    if( !this.password || !this.passwordHidden  || this.passwordHidden == 0)  {
                        this.password = this.passwordHidden;
                    }
                    // 如果password和passwordHidden长度相等则没有进行相应的输入或者删除
                    else if (this.password.length != this.passwordHidden.length) {
                    //删除操作
                        if (this.password.length > this.passwordHidden.length) {
                            var num = this.password.length - this.passwordHidden.length;
                            this.password = this.password.substring(0,index) + this.password.substring(index/1+num);
                        }else{//输入操作
                            var num = this.passwordHidden.length - this.password.length;
                            str = this.passwordHidden.substring(index - num,index);
                            this.password = this.password.substring(0,index-num) +  str + this.password.substring(index-num);
                        }
                    }
                    
                    this.passwordHidden = this.regFn(this.passwordHidden);
                    this.setCaretPosition(event.target,index);
                }
                this.$emit('getPassword',this.password);
            },
            //获取光标位置
            getCursorPosition (){
                var el = event.target;
                var pos = 0;
                if ('selectionStart' in el) {
                    pos = el.selectionStart;
                } else if ('selection' in document) {
                    el.focus();
                    var Sel = document.selection.createRange();
                    var SelLength = document.selection.createRange().text.length;
                    Sel.moveStart('character', -el.value.length);
                    pos = Sel.text.length - SelLength;
                }
                return pos;
            },
            //定位光标
            setCaretPosition(ctrl, pos){
                if(ctrl.setSelectionRange)
                {
                ctrl.focus();
                setTimeout(function(){
                    ctrl.setSelectionRange(pos,pos);
                },1);
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        }
    }
</script>

<style scope>
    #password{
        height: 100%;
    }
    .user-input{
        width: 95%;
        height: 100%;
        padding-left: 15px; 
        background-color: #F8F8F8;
        border-radius: 4px;
        border: 1px solid #DCDFE6;   
    }
    .el-icon-view{
    cursor: pointer;
    position: absolute;
    right: 9px;
    top: 15px;
    }
</style>