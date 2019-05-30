const state = {
  user: null,
  $auth: null
};

const getters = {
  displayName: state => {
    if (state.user) {
      return state.user.email;
    } else {
      return "";
    }
  },
  isAuthentificated: state => {
    return state.user !== null;
  }
};

const mutations = {
  user: (state, user) => {
    state.user = user;
  },
  auth: (state, auth) => {
    state.$auth = auth;
  }
};

const actions = {
  signIn: ({ commit, state }, params) => {
    return state.$auth
      .signInWithEmailAndPassword(params.login, params.pass)
      .then(user => {
        commit("user", user);
      });
  },

  signUp({ state }, params) {
    return state.$auth.createUserWithEmailAndPassword(
      params.login,
      params.pass
    );
  },

  signOut: ({ state }, params) => {
    state.$auth.signOut();
    params.callBack();
  },

  bindAuth: ({ commit }, auth) => {
    auth.onAuthStateChanged(user => {
      commit("user", user);
    });
    commit("auth", auth);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
