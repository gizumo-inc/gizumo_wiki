<template>
  <div class="category-list">
    <table class="category-list__table">
      <thead class="category-list__table__head">
        <tr>
          <th
            v-for="(thead, index) in theads"
            :key="index"
          >
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="category-list__table__body">
        <tr v-for="category in categories" :key="category.id">
          <td>
            <app-text tag="span">
              {{ category.name }}
            </app-text>
          </td>
          <td>
            <app-router-link
              underline
              small
              hover-opacity
              :to="`/articles?category=${category.name}`"
            >
              このカテゴリーの記事
            </app-router-link>
          </td>
          <td>
            <app-router-link
              theme-color
              underline
              hover-opacity
              :to="`/categories/${category.id}`"
            >
              更新
            </app-router-link>
          </td>
          <td>
            <app-button
              bg-danger
              small
              round
              :disabled="!access.delete"
              @click="openModal(`${category.id}`, `${category.name}`)"
            >
              削除
            </app-button>
          </td>
        </tr>
      </transition-group>
    </table>
    <app-modal>
      <div class="category-list__modal">
        <app-text
          class="category-list__modal__title"
          ex-large
          tag="p"
        >
          下記のカテゴリーを削除しますか?
        </app-text>
        <app-text
          class="category-list__modal__name"
          theme-color
          tag="p"
        >
          {{ deleteCategoryName }}
        </app-text>
        <app-button
          class="category-list__modal__button"
          bg-danger
          round
          @click="handleClick"
        >
          削除する
        </app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import {
  RouterLink, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default() {
        return [];
      },
    },
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    deleteCategoryName: {
      type: String,
      default: '',
    },
  },
  methods: {
    openModal(categoryid, categoryname) {
      if (!this.access.delete) return;
      this.$emit('openModal', categoryid, categoryname);
    },
    handleClick() {
      if (!this.access.delete) return;
      this.$emit('handleClick');
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-list {
  padding: 10px 0 20px;
  height: 100%;
  overflow: scroll;
  &__table {
    width: 100%;
    text-align: left;
    tr {
      border-bottom: 1px solid var(--separatorColor);
    }
    &__head {
      th {
        padding: 5px 10px;
        vertical-align: middle;
      }
    }
    &__body {
      td {
        padding: 10px;
        vertical-align: middle;
        &.is-disabled {
          color: var(--disabledColor);
          font-size: 12px;
        }
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
    }
  }
}

.category-list__modal {
  text-align: center;
  &__name {
    margin-top: 16px;
    font-size: 16px;
    color: var(--themeColor);
  }
  &__button {
    margin-top: 48px;
  }
}
</style>
