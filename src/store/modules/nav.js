// store/modules/nav.js

const state = {
    isNavOpen: true
};

const getters = {
    isNavOpen: (state) => state.isNavOpen
};

const mutations = {
    TOGGLE_NAV_MENU(state) {
        state.isNavOpen = !state.isNavOpen;
    },
    SET_NAV_MENU_OPEN(state, value) {
        state.isNavOpen = value;
    },
};

const actions = {
    toggleNavMenu({ commit }) {
        commit('TOGGLE_NAV_MENU');
    },
    setNavMenuOpen({ commit }, value) {
        commit('SET_NAV_MENU_OPEN', value);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
