<template lang="html">
  <div class="authorarticle">
    <app-heading :lavel="1">{{ articleTitle }}</app-heading>
    <app-list-item
      v-for="article in authorList"
      :key="article.id"
      flex
      beetween
      align-items
      bg-white
      large
      border-bottom-gray
    >
      <app-accordion>
        <div class="authorarticle__authorname">
          {{ article.account_name }}
        </div>
        <template #article>
          <div
            v-for="contentlist in article.article"
            :key="contentlist.index"
            class="azuthorarticle__content"
          >
            <app-text
              class="authorarticle__content__title"
            >
              {{ contentlist.title | filterText }}
            </app-text>
            <!-- <app-text
              class="authorarticle__content__text"
            >
              {{ contentlist.content | filterText }}
            </app-text> -->
          </div>
        </template>
      </app-accordion>
    </app-list-item>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  Text,
  Accordion,
} from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appHeading: Heading,
    appText: Text,
    appAccordion: Accordion,
  },
  filters: {
    filterText(val) {
      if (val.length < 30) return val;
      return `${val.substr(0, 30)}...`;
    },
  },
  props: {
    authorList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },

  },
  computed: {
    articleTitle() {
      return `${this.title}`;
    },

  },
};
</script>

<style lang="postcss" scoped>
  .authorarticle {
    &__authorname {
      color: #4682b4;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
    }
    &__content {
      &__title {
        font-size: 20px;
      }
    }
  }
</style>
