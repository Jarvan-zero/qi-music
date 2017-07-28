<!-- 个性推荐 -->
<template>
    <div class="reco">
        <div class="banner-wrap" v-if="banner.length">
            <banner :banner="banner"></banner>
        </div>
        <ul class="nav">
            <li><span class="iconfont icon-FM"></span><p class="text">私人FM</p></li>
            <li><span class="iconfont icon-rili"><i>4</i></span><p class="text">每日歌曲推荐</p></li>
            <li><span class="iconfont icon-rank"></span><p class="text">云音乐热歌榜</p></li>
        </ul>
        <!--推荐歌单-->
        <template v-if="recoSongs.length">
            <div class="section-title">
                <span>推荐歌单</span><i class="iconfont icon-jiantou"></i>
            </div>
            <ul class="content-wrap recd-wrap">
                <li v-for="row in recoSongs">
                    <router-link :to="{name:'SongListDetail',params:{id: item.id,name: item.name,picUrl: item.picUrl,copyWriter: item.copywriter}}" v-for="item in row" :key="item.id" class="recd-item">
                        <div class="img-wrap">
                            <img :src="item.picUrl" class="u-img">
                            <span class="mark"><i class="iconfont icon-erji"></i> {{item.playCount}}</span>
                        </div>
                        <p class="text word-limit2">{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </template>
        <!--独家放送-->
        <template v-if="privateContent.length">
            <div class="section-title">
                <span>独家放送</span><i class="iconfont icon-jiantou-right"></i>
            </div>
            <ul class="content-wrap prit-wrap">
                <li class="clearfix">
                    <router-link to="" v-for="item in privateContent" :key="item.id" class="prit-item">
                        <div class="img-wrap">
                            <img :src="item.picUrl" class="u-img">
                            <span class="mark iconfont icon-luxiang2"></span>
                        </div>
                        <p class="text word-limit2">{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </template>
        <!--最新音乐-->
        <template v-if="newSong.length">
            <div class="section-title">
                <span>最新音乐</span><i class="iconfont icon-jiantou"></i>
            </div>
            <ul class="content-wrap recd-wrap">
                <li v-for="row in newSong">
                    <router-link to="" v-for="item in row" :key="item.id" class="recd-item">
                        <div class="img-wrap">
                            <img :src="item.song.album.picUrl" class="u-img">
                        </div>
                        <p class="text">
                            <span class="word-limit2">{{item.name}}</span>
                            <span class="author ellipsis">{{item.song.artists[0].name}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </template>
        <!--MV-->
        <template v-if="mv.length">
            <div class="section-title">
                <span>推荐MV</span><i class="iconfont icon-jiantou"></i>
            </div>
            <ul class="content-wrap mv-wrap">
                <li v-for="row in mv">
                    <router-link to="" v-for="item in row" :key="item.id" class="mv-item">
                        <div class="img-wrap">
                            <img :src="item.picUrl" class="u-img">
                            <span class="mark"><i class="iconfont icon-luxiang2"></i> {{item.playCount}}</span>
                        </div>
                        <p class="text word-limit2">{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </template>
        <!--精选专栏-->
        <template v-if="program.length">
            <div class="section-title">
                <span>精选专栏</span><i class="iconfont icon-jiantou"></i>
            </div>
            <div class="content-wrap program-wrap">
                <router-link to="" v-for="item in program" :key="item.id" class="program-item">
                    <div class="text word-limit3">
                        <span class="tag">专栏</span>
                        {{item.name}}
                        <span class="read-count">阅读1245</span>
                    </div>
                    <div class="img-wrap">
                        <img :src="item.coverUrl" class="u-img">
                    </div>
                </router-link>
            </div>
        </template>
        <!--主播电台-->
        <template v-if="djprogram.length">
            <div class="section-title">
                <span>主播电台</span><i class="iconfont icon-jiantou"></i>
            </div>
            <div class="content-wrap recd-wrap">
            <li v-for="row in djprogram">
                    <router-link to="" v-for="item in row" :key="item.id" class="recd-item">
                        <div class="img-wrap">
                            <img :src="item.picUrl" class="u-img">
                            <span class="ellipsis copywriter">{{item.copywriter}}</span>
                        </div>
                        <p class="text">
                            <span class="word-limit2">{{item.name}}</span>
                        </p>
                    </router-link>
                </li>
            </div>
        </template>
        <div class="loading-circle" v-if="isLoading">
            <loading-circle :fz="'30px'"></loading-circle>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/common/Banner'
    import LoadingCircle from '@/components/common/LoadingCircle'
    import {BASEURL} from '@/js/config'
    import {arrayPart} from '@/js/utils'
    export default {
        data() {
            return {
                bscroll: null,
                banner:[],
                recoSongs: [],
                privateContent:[],
                newSong:[],
                mv: [],
                program:[],
                djprogram:[],
                isLoading: true
            }
        },
        components: {
            Banner,LoadingCircle
        },
        computed: {

        },
        methods: {
            initScroll() {
                this.bscroll = new BScroll(this.$refs.recoWrap,{
                    click: true
                })
            },
            //  轮播图
            getBanner() {
                return axios.get(BASEURL+'/banner');
            },
            // 每日推荐的歌单
            getRecoSongs() {
                return axios.get(BASEURL+'/personalized');
            },
            //  独家放送
            getPrivateContent() {
                 return axios.get(BASEURL+'/personalized/privatecontent');
            },
            //  最新音乐
            getNewSong() {
                 return axios.get(BASEURL+'/personalized/newsong');
            },
            //  最新音乐
            getMv() {
                 return axios.get(BASEURL+'/personalized/mv');
            },
            // 精选专栏
            getProgram() {
                return axios.get(BASEURL+'/program/recommend')
            },
            // 主播电台
            getDjProgram() {
                return axios.get(BASEURL+'/personalized/djprogram')
            }

        },
        created() {
            var that = this;

            //  axios.get(BASEURL+'/banner')  // 逐区加载
            //     .then((res) => {
            //         that.banner = res.data.banners;
            //         return axios.get(BASEURL+'/personalized');
            //     }).then((res) => {
            //         var data = res.data.result;
            //         data.forEach((item, index) => {
            //             if(item.playCount<100000) return;
            //             item.playCount = Math.floor(item.playCount/10000)+'万';
            //         })
            //         that.recoSongs = arrayPart(data);
            //         return axios.get(BASEURL+'/personalized/privatecontent');
            //     }).then((res) => {

            //     })
            axios.all([  // 一起加载
                this.getBanner(),
                this.getRecoSongs(),
                this.getPrivateContent(),
                this.getNewSong(),
                this.getMv(),
                this.getProgram(),
                this.getDjProgram()])
                .then(axios.spread(function (ban, recog, prit,newg,mv,prom,djam) {
                    that.banner = ban.data.banners;
                    var data = recog.data.result;
                    data.forEach((item, index) => {
                        if(item.playCount<100000) return;
                        item.playCount = Math.floor(item.playCount/10000)+'万';
                    })

                    that.recoSongs = arrayPart(data);

                    that.privateContent = prit.data.result;

                    that.newSong = arrayPart(newg.data.result.slice(0,6));

                    var data = mv.data.result;
                    data.forEach((item, index) => {
                        if(item.playCount<100000) return;
                        item.playCount = Math.floor(item.playCount/10000)+'万'
                    })
                    that.mv = arrayPart(data,2)

                    that.program = prom.data.programs

                    that.djprogram = arrayPart(djam.data.result)
                    that.isLoading = false
                }));
        },
        mounted() {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../stylus/mixin'
.reco
    width 100%
    overflow-x hidden
    .banner-wrap
        height rem(292)
    .nav
        display: flex
        padding rem(30)
        border-bottom 1px solid #e3e7e6
        li
            flex 1
            text-align center
            .iconfont
                display inline-block
                text-align center
                width rem(110)
                height rem(110)
                padding rem(25)
                line-height rem(60)
                margin-bottom rem(18)
                border-radius 50%
                box-sizing border-box
                border 1px solid mc
                color mc
                fz(56)
                position relative

            i
                position absolute
                left 50%
                top 50%
                transform translate(-50%,-42%)
                margin auto
                fz(25)
                font-style normal
        .text
            white-space nowrap
            fz(26)
            line-height rem(28)
            color #333
    .section-title
        position relative
        height rem(94)
        padding-left rem(20)
        &::after
            content ''
            position absolute
            left 0
            top 50%
            transform translateY(-50%)
            height rem(34)
            width rem(4)
            background-color mc
        span,.iconfont
            display inline-block
            overflow hidden
            height 100%
            fz(34)
            line-height rem(94)
            overflow hidden
        .iconfont
            color #999
            fz(30)
            margin-left rem(15)
.content-wrap
    li
        padding-bottom 16px
        .mark
            position absolute
            right 5px
            top:3px
            fz(22)
            line-height rem(30)
            color #fff
            z-index:3
            .iconfont
                fz(22)
        .recd-item
            display block
            width 33.33%
            padding-left:1px;
            padding-right 1px
            &:first-child
                padding-left 0
                padding-right 2px
            &:last-child
                padding-left:2px
                padding-right:0
        .text
            padding:6px 2px 0 6px
            fz(26)
            line-height rem(34)
.recd-wrap
    li
        display flex
        .img-wrap::after
            content ''
            position absolute
            top 0
            left 0
            width 100%
            height rem(35)
            background-image linear-gradient(180deg,rgba(0,0,0,.2),transparent)
            z-index 1
.prit-wrap
    li
        .prit-item
            width:50%
            float left
            padding-left:2px
            padding-bottom 10px
            &:first-child
                padding-left 0
                padding-right 2px
            &:last-child
                width 100%
                clear both
                padding 0
            .mark
                width rem(35)
                height rem(35)
                line-height rem(39)
                text-align center
                left 5px
                top 5px
                right auto
                border-radius 50%
                box-shadow 0 0 rem(1) 0 rgba(255,255,255,.5)
                background-color rgba(0,0,0,.2)
.mv-wrap
    li
        display flex
        .mv-item
            width:50%
            &:first-child
                padding-right:1px
            &:last-child
                padding-left:1px
.author
    fz(24)
    color #999
.program-wrap
    .program-item
        display block
        width 100%
        position relative
        overflow hidden
        &::after
            content ''
            position absolute
            left 0
            bottom 0
            width 70%
            border-top 1px solid #ccc
            transform scaleY(.5)
        &+.program-item
            margin-top:3px
        &:first-child
            &::before
                content ''
                position absolute
                left 0
                top 0
                width 70%
                border-top 1px solid #ccc
                transform scaleY(.5)
        .text
            fz(32)
            position absolute
            left:0
            top:0
            right 30%
            bottom:0
            padding 10px
            line-height rem(40)
        .tag
            display inline-block
            padding 1px 3px 0
            fz(20)
            color mc
            box-shadow 0 0 0 rem(1) mc
            line-height rem(24)
            height rem(24)
            margin-right 2px
            vertical-align 2px
        .read-count
            position absolute
            left 10px
            bottom 10px
            display block
            color #999
            fz(28)
        .img-wrap
            width 30%
            float right
.copywriter
    position absolute
    bottom 0
    left 0
    width 100%
    color #fff
    fz(24)
    padding 2px
    background rgba(0,0,0,.4)
.loading-circle
    position relative
    height 40px
</style>
