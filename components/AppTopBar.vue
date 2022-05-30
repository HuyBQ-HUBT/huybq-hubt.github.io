<template>
  <div class=" p-4 lg:p-10 border-b-[1px] border-[#efefef]">
    <h1 class="font-greatevibes w-full flex justify-center items-center mb-4 lg:text-3xl text-xl tracking-wide">
      Quang Huy
      <HeartIcon class="mx-2 text-red-300" size="20"></HeartIcon>
      Ngọc Thoa
    </h1>

    <div class="flex items-center justify-center">
      <div class="h-[1px] w-8 bg-[#e9e9e9] self-end"></div>
      <div class="text-xs text-[#797979] mx-1 tracking-wide font-dosis">Just Married</div>
      <div class="h-[1px] w-8 bg-[#e9e9e9] self-end"></div>
    </div>
  </div>
</template>

<script>
import { HeartIcon } from '@vue-hero-icons/outline'

export default {
  name: 'AppTopBar',
  components: {
    HeartIcon,
  },
}
</script>

<style>
</style>