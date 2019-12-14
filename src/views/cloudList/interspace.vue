// 空间管理
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