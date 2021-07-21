import lodash from 'lodash'
import Setting from '@/models/Setting'

const state = () => ({
  settings: [],
  navCollapsed: false
})

const getters = {
  setting: (state) => (name) => {
    return state.settings.filter((i) => i.name === name)?.[0]?.value ?? null
  }
}

const mutations = {
  set_settings(state, payload) {
    state.settings = payload
  },
  set_nav_collapsed(state, payload) {
    state.navCollapsed = payload
  }
}

const actions = {
  preload({ commit }) {
    return new Promise((resolve, reject) => {
      Setting.fetch()
        .then(({ entities }) => {
          const { settings } = entities
          commit('set_settings', settings)
          resolve(settings)
        })
        .catch((e) => reject(e))
    })
  },
  collapse({ commit, state }) {
    commit('set_nav_collapsed', !state.navCollapsed)
  }
}

export default { namespaced: true, state, getters, mutations, actions }