<template lang="html">
  <form @submit.prevent="handleSubmit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-edit__link"
      block
      underline
      key-color
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <app-input
      class="category-management-edit__input"
      name="updateCategory"
      type="text"
      placeholder="カテゴリー名を入力してください"
      data-vv-as=""
       :value="categoryName"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
    >
      {{ buttonText }}
    </app-button>

    <div class="category-management-edit__notice">
      <app-text bg-error>ここにエラー時のメッセージが入ります</app-text>
    </div>

    <div class="category-management-edit__notice">
      <app-text bg-success>ここに更新成功時のメッセージが入ります</app-text>
    </div>
  </form>
</template>
<script>
import {
  Heading, Input, Button, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    categoryName: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('エミットするイベント名が入ります');
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
.category-management-edit {
  &__title {
    margin-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__link {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
