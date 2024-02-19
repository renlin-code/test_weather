<template>
  <div class="no-results">
    <IconSadFace class="no-results__icon" />
    <div class="no-results__message">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSadFace from "./icons/IconSadFace.vue";

const props = defineProps({
  message: String,
});
</script>

<style scoped lang="scss">
.no-results {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  &__icon {
    width: 70px;
    height: 70px;
  }
  &__message {
    color: $color-primary;
    text-align: center;
  }
}
</style>
