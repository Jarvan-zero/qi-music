import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const Index = r => require.ensure([], () => r(require('@/components/index/Index')), 'Index')
const Home = r => require.ensure([], () => r(require('@/components/index/children/Home')), 'Home')
const Topic = r => require.ensure([], () => r(require('@/components/index/children/Topic')), 'Topic')
const Mine = r => require.ensure([], () => r(require('@/components/index/children/Mine')), 'Mine')
const Login = r => require.ensure([], () => r(require('@/components/tools/Login')), 'Login')
const Reco = r => require.ensure([], () => r(require('@/components/index/children/Reco')), 'Reco')
const SongList = r => require.ensure([], () => r(require('@/components/index/children/SongList')), 'SongList')
const Radio = r => require.ensure([], () => r(require('@/components/index/children/Radio')), 'Radio')
const Rank = r => require.ensure([], () => r(require('@/components/index/children/Rank')), 'Rank')
const Playboard = r => require.ensure([], () => r(require('@/components/tools/Playboard')), 'Playboard')
const Search = r => require.ensure([], () => r(require('@/components/tools/Search')), 'Search')
const SongListDetail = r => require.ensure([], () => r(require('@/components/detail/SongListDetail')), 'SongListDetail')

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
        path: '/',
        component: App,
        redirect: 'index/home/reco',
        saveScrollPosition: true,
        children: [
            {
                path: 'index',
                component: Index,
                children: [
                    {   
                        path: 'home', // 首页
                        component: Home,
                        children: [
                            {
                                path: 'reco', // 推荐
                                component: Reco
                            },
                            {
                                path: 'songlist', // 推荐
                                component: SongList
                            },
                            {
                                path: 'radio', // 推荐
                                component: Radio
                            },
                            {
                                path: 'rank', // 推荐
                                component: Rank
                            }
                        ]
                    },
                    {
                        path: 'mine', // 本地
                        component: Mine
                    },
                    {
                        path: 'topic', // 话题
                        component: Topic
                    }
                ]
            },
            {
                path: 'search', // 搜索
                component: Search
            },
            {
                path: 'login', // 登录
                component: Login
            },
            {
                path: 'songld/:id', // 歌曲列表详情
                name: 'SongListDetail',
                component: SongListDetail
            },
            {
                path: 'playboard/:ids', // 播放面板
                name: 'Playboard',
                component: Playboard
            }]
    }/*,{
        path: '*',
        redirect: '/'
    }*/]
})
