<template>
  <div
    class="w-full bg-cover mt-10"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/images/footer-shape.png') + ')',
    }"
  >
    <div class="mx-auto my-10 lg:my-20 relative w-full lg:h-[480px] h-[295px]">
      <div
        class="
          w-[240px]
          h-[240px]
          lg:w-[380px] lg:h-[380px]
          rounded-full
          absolute
          z-0
          bg-cover
          top-[18px]
          lg:top-[32px]
          left-[calc((100%-248px)/2)]
          lg:left-[calc((100%-395px)/2)]
          flex
          justify-center
          items-center
        "
        alt="save_the_date"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/save-the-date.jpeg') + ')',
        }"
      >
        <div class="text-white text-4xl lg:text-5xl font-greatevibes tracking-widest">Save the date</div>
      </div>
      <div
        class="
          w-[320px]
          h-[295px]
          lg:w-[520px] lg:h-[480px]
          bg-cover
          absolute
          z-10
          left-[calc((100%-320px)/2)]
          lg:left-[calc((100%-520px)/2)]
        "
        :style="{
          backgroundImage:
            'url(' +
            require('@/assets/images/footer-couple-pic-frame.png') +
            ')',
        }"
      ></div>
    </div>

    <div class="font-greatevibes lg:text-7xl text-4xl text-center">
      Thank you!
    </div>
    <div
      class="w-full h-[32px] lg:h-[48px] bg-contain lg:mt-20 mt-10"
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/flower.png') + ')',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style>
</style>