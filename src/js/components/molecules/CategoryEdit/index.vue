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
      v-validate="'required'"
      class="category-management-edit__input"
      name="updateCategory"
      type="text"
      placeholder="カテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :value="categoryName"
      @updateValue="$emit('editName', $event)"
      :error-messages="errors.collect('updateCategory')"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div v-if="doneMessage" class="category-management-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
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
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
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
        if (valid) this.$emit('updateCategory');
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
