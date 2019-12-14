// 产品模板
<template>
    <div>
        <router-view @addxiugai="addxiugai" @deletexiugai="dlexiugai"/>
        <!-- <router-view/> -->
    </div>
</template>

<script>
import { templateInit } from '@/init/product'
export default {
    data(){
        return{
            templateObj:{}
        }
    },
    created(){
        templateInit(this);
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