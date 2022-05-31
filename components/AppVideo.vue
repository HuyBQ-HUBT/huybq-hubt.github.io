<template>
  <section class="w-full h-[500px]">
    <div
      class="
        w-full
        h-full
        bg-cover
        flex
        flex-col
        gap-2
        relative
      "
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/video-bg.jpg') + ')',
      }"
    >
      <div class="absolute z-0 top-0 left-0 bg-black opacity-20 w-full h-full">

      </div>
      <div class="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h2 class="font-greatevibes lg:text-5xl text-4xl text-white lg:mb-8 mb-4">
          Xem video cưới của chúng tôi
        </h2>

        <button>
          <PlayIcon class="transition ease-in-out text-white duration-300 hover:scale-110 lg:w-24 lg:h-24 w-20 h-20" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { PlayIcon } from '@vue-hero-icons/outline'

export default {
  name: 'AppVideo',
  components: {
    PlayIcon,
  },
}
</script>

<style>
</style>