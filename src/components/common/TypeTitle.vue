<template>
    <div class="type-title" :style="{ backgroundColor: titleColor}">
        {{typeTitle}}
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ["typeTitle","titleColor"]
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

@import "../../stylus/mixin"
.type-title
    position: absolute
    right: 0
    bottom rem(10)
    height 22px
    padding-left 14px
    padding-right: 7px
    border-top-left-radius 11px
    border-bottom-left-radius 11px
    line-height 22px
    font-size 12px
    color: #fff

</style>
