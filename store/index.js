import Vue from 'vue'

export const state = () => ({
    host: '',
    zone: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        rows: 0,
        columns: 0,
    },
    rows: [[]]
})

export const mutations = {
    set (state, payload) {
        Object.assign(state, payload)
    },

    moveCard (state, { from, to }) {
        if (state.rows[to[0]][to[1]].card) return;

        Vue.set(state.rows[to[0]], to[1], state.rows[from[0]][from[1]])
        Vue.set(state.rows[from[0]], from[1], {})
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        return commit('set', {
            host: `http${process.env.HTTPS ? 's' : ''}://${req.headers.host}`
        })
    }
}