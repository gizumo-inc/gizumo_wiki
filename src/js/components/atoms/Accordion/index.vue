<template>
  <div
    class="accordion"
  >
    <div
      class="accordion__arrow"
      :class="{ 'accordion__arrow_opened': isOpened}"
      @click="accordionToggle"
    >
      <slot />
    </div>
    <transition name="slide">
      <div v-if="isOpened">
        <div>
          <slot name="article" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    accordionToggle() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="postcss" scoped>
.accordion {
  width: 100%;
  &__arrow{
    position: relative;
    &::after {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    transform: rotate(135deg);
    transform: transrate(-50%, -50%);
    transition: .5s;
    content: '';
    }
    &_opened {
    &::after {
    transform: rotate(45deg);
    transition: .5s;
    }
    }
  }
}
.slide-enter-active {
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 5000px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

</style>
