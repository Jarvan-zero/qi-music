<template>
  <div class="song-list">

    <div class="header" :style="{backgroundColor: 'rgba(0,0,0,'+headerOpacity+')'}">
      <p class="go-back iconfont icon-back" @click="goBack"></p>
      <p class="title ellipsis">
        <span class="ellipsis">歌单</span>
        <span class="ellipsis">{{$route.params.copyWriter}}</span>
      </p>
      <p class="search iconfont icon-search"></p>
      <p class="action iconfont icon-dian"></p>
    </div>
    <!--歌单信息-->
    <div class="wrap" ref="wrap">
      <div class="inner" :style="{height: h+200+'px'}">
        <div class="info-wrap">
          <div class="bg" :style="{backgroundImage:'url('+($route.params.picUrl ? $route.params.picUrl : listInfo.coverImgUrl)+')'}"></div>
          <div class="content" ref="infoContent" :style="{opacity: infoOpacity}">
            <div class="row">
              <div class="cd">
                <div class="img-wrap">
                  <img :src="($route.params.picUrl ? $route.params.picUrl : listInfo.coverImgUrl)">
                </div>
                <p class="cdbg">
                  <span class="tran"></span>
                  <span class="s-black"></span>
                  <span class="b-black"></span>
                </p>
              </div>
              <div class="song-info">
                <p class="title">{{$route.params.name}}</p>
                <p class="singer">歌手：奇奇</p>
                <p class="time">发行日期：{{listInfo.createTime}}</p>
              </div>
            </div>
            <ul class="operation">
                <li class="item">
                  <p class="iconfont icon-folderadd"></p>
                  <p class="count">{{listInfo.subscribedCount}}</p>
                </li>
                <li class="item">
                  <p class="iconfont icon-pinglun"></p>
                  <p class="count">{{listInfo.commentCount}}</p>
                </li>
                <li class="item">
                  <p class="iconfont icon-fenxiang"></p>
                  <p class="count">{{listInfo.shareCount}}</p>
                </li>
                <li class="item">
                  <p class="iconfont icon-xiazai"></p>
                  <p class="count">下载</p>
                </li>
              </ul>
          </div>
        </div>
        <div class="loading" v-show="!listContent.length">
          <loading-circle></loading-circle>
        </div>
        <!--歌曲列表-->
        <div class="list-wrap" ref="list" :style="{height: h-60+'px'}">
          <ul class="list-inner" ref="listContent">
            <li v-show="listContent.length">
              <p class="play-all"><i class="iconfont"></i>播放全部<span class="all-count">(共{{listContent.length}}首)</span></p>
              <p class="multi-select"><i class="iconfont"></i>多选</p>
            </li>

            <li class="list-item" v-for="(item, index) in listContent" :key="item.id">
              <span class="num" v-if="listInfo.ordered">{{index+1}}</span>
              <router-link :to="{name:'Playboard',params:{ids:item.id}}" class="name ellipsis">
                <p class="song-name ellipsis">{{item.name}}</p>
                <p class="singer ellipsis">{{item.ar[0].name}}<span v-if="item.al.name"> - </span>{{item.al.name}}</p>
              </router-link>
              <span class="option iconfont icon-dian"></span>
            </li>
          </ul>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {BASEURL} from '@/js/config'
  import {formatDate} from '@/js/utils'
  import LoadingCircle from '@/components/common/LoadingCircle'
  export default {
    data() {
      return {
        headerOpacity: .01,
        infoOpacity: 1,
        bscrollOut: null,
        bscrollInner: null,
        listInfo: {},
        listContent: [],
        h: 0, // 屏幕高度
        outY: 0,
        innerY: 0
      }
    },
    created() {
      // 外层的BScroll高度是固定的，放在created里面
      this.h = window.outerHeight;
      let that = this;
      this.$nextTick(() => {
        this.outY = this.$refs.infoContent.getBoundingClientRect().height
        this.initWrapBScroll()
        this.bscrollOut.on('scroll', (pos) => {
          // 小于200（info content的高度），表示外层可以滚动，禁止歌单列表滚动
          if(Math.abs(pos.y) < 200) {
            // 设置header和info content的透明度
            that.headerOpacity = Math.abs(pos.y) / 600
            that.infoOpacity = 1 - Math.abs(pos.y) / 200
            if(!that.bscrollInner) return
            that.bscrollInner.disable()
          } else {
            if(!that.bscrollInner) return
            that.bscrollInner.enable()
          }
        })
      })
    },
    activated() {
      this.listContent = []
      var that = this;
      axios.get(BASEURL+'/playlist/detail?id='+this.$route.params.id)
      .then((res) => {
        that.listInfo = res.data.playlist
        // 格式化时间
        that.listInfo.createTime = formatDate(that.listInfo.createTime,'yyyy.MM.dd')
        that.listContent = that.listInfo.tracks
        // 初始化bscroll
        that.$nextTick(() => {
          // that.outY = that.$refs.infoContent.getBoundingClientRect().height
          that.innerY = that.$refs.listContent.getBoundingClientRect().height
          // this.initWrapBScroll()
          this.initListBScroll()
          // that.bscrollOut.on('scroll', (pos) => {
          //   // 小于200（info content的高度），表示外层可以滚动，禁止歌单列表滚动
          //   if(Math.abs(pos.y) < 200) {
          //     that.bscrollInner.disable()
          //     // 设置header和info content的透明度
          //     that.headerOpacity = Math.abs(pos.y) / 600
          //     that.infoOpacity = 1 - Math.abs(pos.y) / 200
          //   } else {
          //     that.bscrollInner.enable()
          //   }
          // })
          that.bscrollInner.on('scroll', (pos) => {
            if(0<Math.abs(pos.y) && Math.abs(pos.y)<= that.innerY - that.h + 60) {
              that.bscrollOut.disable()
            } else {
              that.bscrollOut.enable()
            }
          })
        })
      })
    },
    methods: {
      initWrapBScroll() { // 初始化外层的 BScroll
        this.bscrollOut = new BScroll(this.$refs.wrap,{
          probeType: 3,
          click: true,
          bounce: false  // 是否回弹
        })
      },
      initListBScroll() { // 初始化里层的 BScroll
        this.bscrollInner = new BScroll(this.$refs.list,{
          probeType: 3,
          click: true,
          bounce: false
        })
      },
      goBack() {
        this.$router.go(-1)
      }
    },
    components: {
      LoadingCircle
    }
  }
</script>

<style lang="stylus" scoped>
@import '../../stylus/mixin'
.song-list
  position absolute
  left 0
  top 0
  right 0
  bottom 0
.wrap
  position relative
  overflow hidden
  height 100%
.header
  position fixed
  top 0
  left 0
  display flex
  align-items center
  width 100%
  height 60px
  padding 0 18px
  background-color rgba(0,0,0,.4)
  color #fff
  z-index 999
  .iconfont
    height 60px
    line-height 60px
    font-size 24px
  .go-back
    padding 0
  .title
    flex 1
    padding 0 18px
    &>span
      display block
      width 100%
      &:first-child
        font-size 18px
        line-height 20px
      &:nth-child(2)
        font-size 10px
        color rgba(255,255,255,.5)
.info-wrap
  position relative
  height 260px
  overflow hidden
  background-color #fff
  z-index 4
  &>div
    width 100%
    position absolute
    left 0
    bottom 0
  .bg
    height 100%
    background-size cover
    background-color #000
    filter blur(100px)
    z-index 1
  .content
    height 200px
    z-index 2
    .row
      display flex
      margin 0 25px 25px
      .cd
        position relative
        padding-right 34px
        .img-wrap
          width 130px
          height 130px
          background-color #fff
          position relative
          z-index 2
          img
            center()
            width 130px
            height auto
            max-height 130px
        .cdbg
          position absolute
          right 0
          top 0
          width 34px
          height 130px
          z-index 1
          .tran
            position absolute
            left 0
            top 3px
            width 5px
            height 125px
            box-shadow 0 0 2px 0 rgba(0,0,0,.3)
            background-color rgba(255,255,255,.2)
            z-index 2
          .s-black
            position absolute
            left -3px
            top 57px
            width 16px
            height 16px
            border-radius 50%
            background-color #000
            z-index 2
          .b-black
            position absolute
            left -110px
            top 0
            width 130px
            height 130px
            border-radius 50%
            background-color #000
            z-index 1
      .song-info
        flex 1
        .title
          font-size 14px
          line-height 22px
          margin-bottom 5px
          color #fff
        .singer,.time
          font-size 12px
          line-height 24px
          color rgba(255,255,255,.5)
  .operation
    display flex
    .item
      flex 1
      text-align center
      color #fff
      font-size 16px
      .iconfont
        line-height 16px
        margin-bottom 5px
      .count
        font-size 14px
        line-height 14px
.list-wrap
  position relative
  padding 0 15px
  overflow hidden
  background-color #fff
  z-index 3
  li:first-child
    display flex
    align-items center
    .play-all
      flex 1
  .list-item
    display flex
    align-items center
    .num
      display block
      width 30px
      height 54px
      line-height 54px
      font-size 14px
      text-align center
      color #8f9190
    .name
      flex 1
      padding 11px 0 10px
      box-shadow 0 1px 0 0 rgba(200,200,200,.3)
      .song-name
        margin-bottom 7px
        font-size 14px
        line-height 15px
      .singer
        font-size 12px
        line-height 13px
        color #8f9190
    .option
      display block
      width 30px
      height 55px
      text-align center
      line-height 55px
      color #8f9190
      box-shadow 0 1px 0 0 rgba(200,200,200,.3)
.loading
  height 300px
  position relative
</style>
