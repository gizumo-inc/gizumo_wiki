<template lang="html">
  <form @submit.prevent="">
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
      name="updateCategoryName"
      type="text"
      placeholder="カテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('updateCategory')"
      :value="updateCategoryName"
      @updateValue="$emit('updateValue', $event)"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.create"
      @click="updateCategory"
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
    updateCategoryName: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    updateCategory() {
      if (!this.access.create) return;
      this.$emit('handleUpdate');
      // this.$validator.validate()
      //   .then((valid) => {
      //     if (valid) this.$emit('handleUpdate');
      //   });
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
