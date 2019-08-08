import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  getters: {
    categoryList(state) {
      return state.categoryList;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // 追加しました。
    setTimeClearMessage({ commit }) {
      setTimeout(() => {
        commit('clearMessage');
      }, 3000);
    },
    postCategory({ commit, rootGetters }, inputCategoryName) {
      commit('toggleLoading');
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: { name: inputCategoryName },
        }).then(() => {
          commit('toggleLoading');
          commit('doneAddCategory');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        const payload = { categories: [], rootGetters };
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
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
    getInfo({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const gettedInfo = response.data.category;
        commit('gettingInfo', gettedInfo);
      }).catch((err) => {
        commit('failFetchCategory', {
          message: err.message,
        });
      });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
    },
    putUpdateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      // こいつはオブジェクトを返す
      // 新しいURL(クエリ文字列を作る)
      const data = new URLSearchParams();
      data.append('id', this.state.categories.updateCategoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneUpdateCategory', payload);
        commit('toggleLoading');
      }).catch((err) => {
        commit('toggleLoading');
        commit('failFetchCategory', {
          message: err.message,
        });
      });
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories];
    },
    failFetchCategory(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    gettingInfo(state, getCategory) {
      // ここで更新を押したページのIDからidとnameを取得して、stateに代入。その結果pageでvalueとして表示される。
      state.updateCategoryId = getCategory.id;
      state.updateCategoryName = getCategory.name;
    },
    editedCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state) {
      state.updateCategoryId = null;
      state.updateCategoryName = '';
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneAddCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
  },
};
