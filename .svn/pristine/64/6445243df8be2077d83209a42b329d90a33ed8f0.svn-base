<template>
    <div>
        <the-head :list="list" :backcolor='colorselects'></the-head>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import { controlInit } from "@/init/public"
export default {
    data() {
        return {
            controlObj: '',
            list: [
                {
                    name: "产品查找",
                    route: "/management/control/controlList",
                    ico: "icon-diannao-"
                },
                {
                    name: "用户查找",
                    route: "/management/control/controlListUser",
                    ico: "icon-yonghu1"
                }
            ]
        };
    },
    computed:{
        colorselects(){
            return this.$route.matched[0].meta.colorselect;
        }
    },
    created() {
        controlInit(this);
        this.list[0].name = this.controlObj.tit01;
        this.list[1].name = this.controlObj.tit02;
    },
}
</script>

<style scoped>

</style>
