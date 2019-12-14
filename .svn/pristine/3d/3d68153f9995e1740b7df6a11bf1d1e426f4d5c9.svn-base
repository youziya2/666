// 增值空间管理
<template>
    <div>
        <router-view @addxiugai="addxiugai" @deletexiugai="dlexiugai"/>
        <!-- <router-view/> -->
    </div>
</template>

<script>
export default {
    inject:["replaceroute"],
    // provide(){
    //     return{
    //         creplaceroute:this.creplaceroute
    //     }
    // },
    data(){
        return{
        }
    },
    methods:{
        addxiugai(add){
            this.$emit('addxiugai',add);
        },
        // creplaceroute(oldrouter,newrouter){
        //     this.replaceroute(oldrouter,newrouter);
        // },
        dlexiugai(pa){
            this.$emit('deletexiugai',pa);
        }
    }
}
</script>
