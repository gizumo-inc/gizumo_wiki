<template>
  <app-article-post
    :category-list="categoryList"
    :article-id="articleId"
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="categoryName"
    :access="access"
    :loading="loading"
    :done-message="doneMessage"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    categoryName() {
      // 分割代入注意
      return this.$store.state.articles.targetArticle.category.name;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
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
    loading() {
      return this.$store.state.articles.loading;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('articles/loadArticle');
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle');
    },
  },
};
</script>
