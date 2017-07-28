<template>
    <div class="player-mini">
        <p class="img"><img src="" alt=""></p>
        <p class="song">
            <span class="song-name"></span>
            <span class="singer"></span>
        </p>
        <p class="btn iconfont icon-play"></p>
        <p class="list iconfont icon-listview"></p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin"
.player-mini
    position fixed
    bottom:0
    left:0
    width 100%
    height:rem(100)
    display: flex
    background-color #fff
    p
        height 100%
        &.iconfont
            fz(40)

</style>
