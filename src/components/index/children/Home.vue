<template>
    <div class="reco">
        <ul class="nav">
            <li @click="moveLine($event)"><router-link to="/index/home/reco" :class="url[0] == curPage ? 'active':''" class="ripple-effect">个性推荐</router-link></li>
            <li @click="moveLine($event)"><router-link to="/index/home/songlist" :class="url[1] == curPage ? 'active':''" class="ripple-effect">歌单</router-link></li>
            <li @click="moveLine($event)"><router-link to="/index/home/radio" :class="url[2] == curPage ? 'active':''" class="ripple-effect">主播电台</router-link></li>
            <li @click="moveLine($event)"><router-link to="/index/home/rank" :class="url[3] == curPage ? 'active':''" class="ripple-effect">排行榜</router-link></li>
            <span class="line" :style="{transform: 'translateX('+line.x+')',width:line.w}"></span>
        </ul>
        <div class="router-wrap">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
          return {
              line: {
                x: 0,
                w: '25%'
              },
              url:['per-reco','song-list','radio','rank'],
              curPage: 'per-reco'
          }
        },
        methods: {
            moveLine(e) {
                console.log()
                this.line.x = e.target.offsetLeft + 'px'
                this.line.w = e.target.clientWidth + 'px'
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../stylus/mixin"
.nav
    width: 100%
    display: flex
    position absolute
    top 0
    left 0
    li
        flex 1
        color: #666
        text-align center
        font-size rem(30)
        height: rem(80)
        line-height: rem(80)
        &.active
            color: mc
        &>a
            display block
            height 100%
    .line
        width: 25%
        height rem(5)
        background-color: mc
        position: absolute
        left 0
        bottom: 0
        transition all .3s ease-out
.router-wrap
    position: absolute
    width 100%
    left:0
    top: rem(80)
    right:0
    bottom: 0
    overflow-x hidden
</style>
