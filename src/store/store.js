import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo:{},
    PlayingSong:{
        name: '',
        artist: '',
        picUrl: '',
        url:'',
        isPlaying: false,
        list: []
    }
}

const mutations = {
    updatePlaying(state,newSong) {
        state.PlayingSong = newSong;
    }
}
const actions = {
    updatePlayingAction({commi}) {
        commit('updatePlaying')
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})
