// 产品模板
<template>
    <div>
        <router-view @addxiugai="addxiugai" @deletexiugai="dlexiugai"/>
        <!-- <router-view/> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            mainboardObj:{}
        }
    },
    methods:{
        addxiugai(add){
            this.$emit('addxiugai',add);
        },
        dlexiugai(pa){
            this.$emit('deletexiugai',pa);
        }
    }
}
</script>