<template>
  <div class="widget">
    <slot class="widget__title" name="title" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.widget {
  display: inline-block;
  padding: 20px;
  background: $color-bg-gradient;
  border-radius: 10px;
  -webkit-box-shadow: 4px 4px 14px 1px rgba($color-black, 0.2);
  -moz-box-shadow: 4px 4px 14px 1px rgba($color-black, 0.2);
  box-shadow: 4px 4px 14px 1px rgba($color-black, 0.2);

  &__title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
