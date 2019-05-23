const state = {
    $db: null
}

const getters = {
}

const mutations = {
    db: (state, db) => {
        state.$db = db
    }        
}

const actions = {
    bindDb: ({ commit }, db) => {
        commit('db', db)
    },
    saveTask: ({ state }, payload) => {
        console.log('task save ..')
        console.log(state);
        console.info(payload);
    }
}

export default {
    state, getters, mutations, actions
}