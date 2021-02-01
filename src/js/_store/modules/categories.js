import axios from '@Helpers/axiosDefault';
// import { date } from '@storybook/addon-knobs';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    targetCategory: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  getters: {
    categoryList: state => state.categoryList,
    targetCategory: state => state.targetCategory,
    updateCategoryName: state => state.updateCategoryName,
    // getterの書き方を確認しておく。
  },
  actions: {
    getCategoryName({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then((res) => {
        commit('getCategoryName', res.data.category);
      });
    },
    targetCategory({ commit }, name) {
      commit({
        type: 'targetCategory',
        name,
      });
    },
    addCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then((res) => {
          const payload = res.data.categories;
          commit('doneGetAllCategories', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
      // const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      // commit('doneGetAllCategories', payload);
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    editCategoryName({ commit }, name) {
      commit({
        type: 'editCategoryName',
        name,
      });
    },
    updateCategory({ commit, rootGetters }, { id }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', id);
      // data.append('name', this.state.categories.updateCategoryName);
      data.append('name', rootGetters['categories/updateCategoryName']);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${id}`,
        data,
      }).then((res) => {
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
        commit('doneUpdateCategory', res.data);
      }).catch(() => {
        commit('toggleLoading');
        commit('failFetchCategory', { message: 'カテゴリーの更新ができませんでした' });
      });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
  },
  mutations: {
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneUpdateCategory(state, category) {
      state.updateCategoryId = category.id;
      state.updateCategoryId = category.name;
    },
    getCategoryName(state, category) {
      state.updateCategoryName = category.name;
    },
    editCategoryName(state, { name }) {
      state.updateCategoryName = name;
    },
    targetCategory(state, { name }) {
      state.targetCategory = name;
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = payload;
    },
    failFetchCategory(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
  },
};
