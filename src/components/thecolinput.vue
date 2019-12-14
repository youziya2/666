<template>
    <el-col :span="6">
        <div class="input-group">
            {{name}}
            <el-input class="elinput"
                :disabled="disab||false"
                v-model="val">
            </el-input>
        </div>
    </el-col>
</template>

<script>
export default {
    name:'theColinput',
    props:["name","val","disab"]
}
</script>