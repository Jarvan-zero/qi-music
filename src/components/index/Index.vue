<template>
    <div class="index">
        <!--头部-->
        <header>
            <span class="iconfont icon-menu menu"></span>
            <div class="nav">
                <router-link @click.native="changePage('mine')" to="/index/mine" class="iconfont icon-yinfu2" :class="{active: curPage == 'mine'}"></router-link>
                <router-link :to="'/index/home/'+'reco'" class="iconfont icon-yinfu1" :class="{active: curPage == 'home'}" @click.native="changePage('home')"></router-link>
                <router-link to="/index/topic" class="iconfont icon-19" :class="{active: curPage == 'topic'}" @click.native="changePage('topic')"></router-link>
            </div>
            <span class="iconfont icon-search search"></span>
        </header>
        <div class="router-wrap">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            
        </div>
        <!-- 底部小播放面板 -->
        <player-mini></player-mini>
    </div>
</template>

<script type="text/javascript">
    import PlayerMini from "@/components/common/PlayerMini"
    export default {
        data() {
          return {
              line: {
                x: 0,
                w: '25%'
              },
              curPage: 'home'
          }
        },
        components: {
            PlayerMini
        },
        methods: {
            moveLine(e) {
                this.line.x = e.target.offsetLeft + 'px'
                this.line.w = e.target.clientWidth + 'px'
            },
            changePage(curPage) {
                this.curPage = curPage
            }
        },
        mounted() {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin"
header
    display: flex
    width 100%
    padding: rem(30) 0
    background-color mc
    .iconfont
        font-size rem(50)
        color: rgba(255,255,255,.6)
    .menu
        width 2rem
        text-align right
        color: rgba(255,255,255,1)
    .search
        width 2rem
        text-align left
        color: rgba(255,255,255,1)
    .nav
        flex: 1
        text-align center
        a
            padding 0 rem(30)
            display: inline-block
            &.active
                color: rgba(255,255,255,1)
.router-wrap
    position: absolute
    width 100%
    left:0
    top: rem(116)
    right:0
    bottom: rem(100)
    overflow-x hidden
</style>
