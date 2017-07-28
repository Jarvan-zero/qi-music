<template>
    <div class="loading-circle iconfont icon-loading" :style="{fontSize:fz,lineHeight:fz,height: fz}"></div>
</template>

<script type="javascript">
    export default {
        props:['fz']
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin"
.loading-circle
    center()
    height rem(150)
    color mc
    fz(150)
    line-height: rem(150)
    animation rotate 1s 0s linear infinite
</style>
