<template lang="html">
  <app-article-edit
    :article-id="articleId"
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { ArticleEdit } from '@Components/molecules';

export default {
  components: {
    appArticleEdit: ArticleEdit,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    articleId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getCategory');
    this.$store.dispatch('articles/getArticleDetail', parseInt(this.articleId, 10));
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/updateArticle');
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
