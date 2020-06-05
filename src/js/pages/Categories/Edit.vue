<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :category-id="categoryId"
      :category-name="categoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @updateCategory="updateCategory"
      @editName="editName"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    categoryName() {
      const name = this.$store.state.categories.updateCategoryName;
      return name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategory', parseInt(this.categoryId, 10));
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    editName($event) {
      this.$store.dispatch('categories/editName', $event.target.value);
    },
  },
};
</script>
