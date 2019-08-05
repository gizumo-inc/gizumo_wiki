import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    targetArticle: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
      user: {
        account_name: '',
        created_at: '',
        email: '',
        full_name: '',
        id: '',
        password_reset_flg: null,
        role: '',
        updated_at: '',
      },
    },
    articleList: [],
    deleteArticleId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    transformedArticles(state) {
      return state.articleList.map(article => ({
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
    tenNewArticleList(state) {
      let count = 0;
      return state.articleList.filter(() => {
        count += 1;
        return count <= 10;
      });
    },
    targetArticle: state => state.targetArticle,
    deleteArticleId: state => state.deleteArticleId,
  },
  mutations: {
    initPostArticle(state) {
      state.targetArticle = Object.assign({}, {
        id: null,
        title: '',
        content: '',
        category: {
          id: null,
          name: '',
        },
        user: {
          account_name: '',
          created_at: '',
          email: '',
          full_name: '',
          id: '',
          password_reset_flg: null,
          role: '',
          updated_at: '',
        },
      });
    },
    doneGetArticle(state, payload) {
      state.targetArticle = Object.assign({}, state.targetArticle, payload.article);
    },
    editedTitle(state, payload) {
      state.targetArticle = Object.assign({}, { ...state.targetArticle }, {
        title: payload.title,
      });
    },
    editedContent(state, payload) {
      state.targetArticle = Object.assign({}, { ...state.targetArticle }, {
        content: payload.content,
      });
    },
    doneFilteredArticles(state, payload) {
      const filteredArticles = payload.articles.filter(
        article => article.category && article.category.name === payload.category,
      );
      state.articleList = [...filteredArticles];
    },
    doneGetAllArticles(state, payload) {
      state.articleList = [...payload.articles];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    selectedArticleCategory(state, payload) {
      state.targetArticle.category = Object.assign(
        {},
        { ...state.targetArticle.category },
        { ...payload.category },
      );
    },
    updateArticle(state, { article }) {
      state.targetArticle = Object.assign({}, state.targetArticle, { ...article });
    },
    confirmDeleteArticle(state, { articleId }) {
      state.deleteArticleId = articleId;
    },
    doneDeleteArticle(state) {
      state.deleteArticleId = null;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    initPostArticle({ commit }) {
      commit('initPostArticle');
    },
    getAllArticles({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/article',
      }).then((res) => {
        const payload = {
          articles: res.data.articles,
        };
        commit('doneGetAllArticles', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    getArticleDetail({ commit, rootGetters }, articleId) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/article/${articleId}`,
        }).then((res) => {
          const category = res.data.article.category
            ? res.data.article.category
            : { id: null, name: '' };
          const payload = {
            article: {
              id: res.data.article.id,
              title: res.data.article.title,
              content: res.data.article.content,
              updated_at: res.data.article.updated_at,
              created_at: res.data.article.created_at,
              user: res.data.article.user,
              category,
            },
          };
          commit('doneGetArticle', payload);
          resolve();
        }).catch((err) => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    editedTitle({ commit }, title) {
      commit({
        type: 'editedTitle',
        title,
      });
    },
    editedContent({ commit }, content) {
      commit({
        type: 'editedContent',
        content,
      });
    },
    filteredArticles({ commit, rootGetters }, category) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/article',
        }).then((res) => {
          const payload = {
            category,
            articles: res.data.articles,
          };
          commit('doneFilteredArticles', payload);
          resolve();
        }).catch((err) => {
          console.log(err);
          commit('failRequest', { message: err.message });
          reject(new Error('エラーが発生しました'));
        });
      });
    },
    selectedArticleCategory({ commit, rootGetters }, categoryName) {
      const categoryList = rootGetters['categories/categoryList'];
      let matches = categoryList.find(category => category.name === categoryName);
      // カテゴリーが空のときのidとnameは下記をセット
      if (!matches) {
        matches = {
          id: null,
          name: '',
        };
      }
      const payload = {
        category: matches,
      };
      commit('selectedArticleCategory', payload);
    },
    updateArticle({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['articles/targetArticle'].id);
      data.append('title', rootGetters['articles/targetArticle'].title);
      data.append('content', rootGetters['articles/targetArticle'].content);
      data.append('user_id', rootGetters['articles/targetArticle'].user.id);
      data.append('category_id', rootGetters['articles/targetArticle'].category.id);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/article/${rootGetters['articles/targetArticle'].id}`,
        data,
      }).then((res) => {
        const payload = {
          article: {
            id: res.data.article.id,
            title: res.data.article.title,
            content: res.data.article.content,
            updated_at: res.data.article.updated_at,
            created_at: res.data.article.created_at,
            user: res.data.article.user,
            category: res.data.article.category,
          },
        };
        commit('updateArticle', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    confirmDeleteArticle({ commit }, articleId) {
      commit('confirmDeleteArticle', { articleId });
    },
    deleteArticle({ commit, rootGetters }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('id', rootGetters['articles/deleteArticleId']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/article/${rootGetters['articles/deleteArticleId']}`,
        data,
      }).then(() => {
        commit('doneDeleteArticle');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    postArticle({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('title', rootGetters['articles/targetArticle'].title);
        data.append('content', rootGetters['articles/targetArticle'].content);
        data.append('user_id', rootGetters['auth/user'].id);
        if (rootGetters['articles/targetArticle'].category.id !== null) {
          data.append('category_id', rootGetters['articles/targetArticle'].category.id);
        }
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/article',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
