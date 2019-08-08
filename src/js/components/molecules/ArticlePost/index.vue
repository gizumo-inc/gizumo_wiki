<template lang="html">
  <div class="article-post">
    <section class="article-input">
      <div
        v-if="doneMessage"
        class="article-edit__notice--update"
      >
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
      <app-heading>記事の新規作成</app-heading>
      <app-heading
        :level="2"
      >
        カテゴリーの選択
      </app-heading>
      <app-select
        v-validate="'required'"
        data-vv-as="カテゴリー"
        name="category"
        :error-messages="errors.collect('category')"
        :value="currentCategoryName"
        @updateValue="$emit('selectedArticleCategory', $event)"
      >
        <option value="" disabled selected> --- </option>
        <option
          v-for="category in categoryList"
          :key="category.id"
          :value="category.name"
          :selected="category.name === currentCategoryName"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading
        :level="2"
      >
        タイトル・本文
      </app-heading>
      <app-input
        v-validate="'required'"
        data-vv-as="記事のタイトル"
        name="title"
        :error-messages="errors.collect('title')"
        type="text"
        placeholder="記事のタイトルを入力してください。"
        :value="articleTitle"
        @updateValue="$emit('editedTitle', $event)"
      />
      <app-textarea
        v-validate="'required'"
        data-vv-as="記事の本文"
        name="content"
        :error-messages="errors.collect('content')"
        :value="articleContent"
        @updateValue="$emit('editedContent', $event)"
      />
      <app-button
        round
        button-type="submit"
        :disabled="!disabled"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </app-button>
    </section>

    <article class="article-detail">
      <app-markdown-preview
        :markdown-content="markdownContent"
      />
    </article>
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, MarkdownPreview, Button, Select, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appButton: Button,
    appSelect: Select,
    appText: Text,
  },
  props: {
    categoryList: {
      type: Array,
      // 書き方注意
      default: () => [],
    },
    currentCategoryName: {
      type: String,
      default: '',
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    markdownContent: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    doneMessage: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '更新中...' : '更新';
    },
    disabled() {
      return this.access.edit && !this.loading;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};

</script>

<style lang="postcss" scoped>
  .article-post{
    display: flex;
  }
  .article-input{
    width: 50%;
    border-right: 1px solid skyblue;
    padding-right: 20px;
  }
  .article-detail{
    width: 50%;
  }

</style>
