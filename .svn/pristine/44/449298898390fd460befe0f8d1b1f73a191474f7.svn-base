
const install = (Vue) => {
    const Bus = new Vue({
        methods:{
            emit (event,...args){//发送数据
                this.$emit(event,...args)
            },
            on (event,callback){//绑定
                this.$on(event,callback)
            },
            off (event,callback){//解绑
                this.$off(event,callback)
            },
        }
    })

    Vue.prototype.$bus = Bus
} 
export default install
