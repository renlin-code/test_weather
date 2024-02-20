<template>
  <input
    :id="id"
    v-model="inputValue"
    type="text"
    :placeholder="placeholder"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
const inputValue = ref("");
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
};

const props = defineProps({
    placeholder: String,
    id: String,
})
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid $color-primary;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;
  color: $color-black;
  opacity: 0.6;
  &:hover,
  &:focus {
    opacity: 1;
  }
}
</style>
