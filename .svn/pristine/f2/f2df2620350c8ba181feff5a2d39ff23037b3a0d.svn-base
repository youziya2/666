<template>
    <div class="breadcrumb" style="position: fixed;top: 130px;width: 100%;z-index: 99;background-color: #F1F4F6;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="one">{{$buttonObj.backstage}}</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in list" :key="index">{{item.router}}</el-breadcrumb-item>
            <span class="end"  @click='initData()'>{{end.indexOf('@')> -1 ? end.substring(0,end.indexOf('@')) : end}}</span>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name:'theBreadcremb',
    props:["list","end","endgoto"],
    methods:{
        initData(){
            this.$emit('initData')
        }
    }

}
</script>

<style scoped>
    .end{
        cursor: pointer;
        display: inline-block;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

