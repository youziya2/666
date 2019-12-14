// 主题管理
<template>
    <div>
        <the-breadcrumb :end="end" :list="list"></the-breadcrumb>
        <router-view/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[{router: this.$parent.desktop.tit21}],
            end: this.$parent.desktop.tit13
        }
    }
}
</script>
