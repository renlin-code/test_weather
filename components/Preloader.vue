<template>
  <div class="preloader">
    <div class="preloader__spinner"></div>
  </div>
</template>

<style scoped lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  &__spinner {
    border: 8px solid $color-white;
    border-top: 8px solid $color-primary;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 0.5s linear infinite;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
