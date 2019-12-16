<template lang="html">
  <div>
    <app-article-list-author
      :title="title"
      :author-list="authorList"
    />
  </div>
</template>

<script>
import { ArticleListAuthor } from '@Components/molecules';

export default {
  components: {
    appArticleListAuthor: ArticleListAuthor,
  },
  data() {
    return {
      title: '作者別記事',
    };
  },
  computed: {
    authorList() {
      return this.$store.state.articles.authorList;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticles');
    this.$store.dispatch('articles/getArticleAuthorList');
  },
};
</script>
