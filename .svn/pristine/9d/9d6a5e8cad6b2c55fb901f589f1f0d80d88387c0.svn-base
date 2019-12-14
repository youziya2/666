// 成品
<template>
    <div>
        <router-view @addxiugai="addxiugai" @deletexiugai="dlexiugai"/>
        <!-- <router-view/> -->
    </div>
</template>

<script>
finishedInit
import { finishedInit } from '@/init/product'
export default {
    data(){
        return{
          finishedObj: {}  
        }
    },
    created(){
        finishedInit(this);
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