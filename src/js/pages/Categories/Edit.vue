<template>
  <div>
    <app-category-edit
      :access="access"
      :disabled="loading ? true : false"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :update-category-name="updateCategoryName"
      @handleUpdate="handleUpdate"
      @updateValue="updateValue"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      category: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getInfo', id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    handleUpdate() {
      if (this.loading) return;
      this.$store.dispatch('categories/putUpdateCategory');
    },
  },
};
</script>
