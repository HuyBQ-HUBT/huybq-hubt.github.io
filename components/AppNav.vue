<template>
  <nav id="navbar" class="top-0 w-full bg-white z-50">
    <!-- Mobile -->
    <div class="flex justify-between p-4 items-center lg:hidden shadow-sm">
      <div>
        <HeartIcon />
      </div>
      <button class="p-2 bg-red-300 rounded">
        <MenuIcon class="text-white" />
      </button>
    </div>
    <!-- End Mobile -->

    <!-- Desktop -->
    <div class="hidden lg:flex py-4 items-center justify-center shadow-md">
      <a
        v-for="(e, i) in menus"
        :key="'nav_' + i"
        class="font-dosis text-black font-semibold px-4 hover:underline hover:text-red-300"
        :href="e.href"
        >{{ e.title }}</a
      >
    </div>
    <!-- End Desktop -->
  </nav>
</template>

<script>
import { HeartIcon, MenuIcon } from '@vue-hero-icons/outline'

export default {
  name: 'AppNav',
  components: {
    HeartIcon,
    MenuIcon,
  },
  data() {
    return {
      menus: [
        {
          href: '#couple',
          title: 'Cặp đôi',
        },
        {
          href: '#story',
          title: 'Chuyện tình yêu',
        },
        {
          href: '#album',
          title: 'Album cưới',
        },
        {
          href: '#event',
          title: 'Sự kiện',
        },
        {
          href: '#wish',
          title: 'Lời chúc',
        },
        {
          href: '#couple',
          title: 'Mừng cưới',
        },
      ],
    }
  },
  mounted() {
    const navbar = document.getElementById('navbar')
    const navBottom = document.getElementById('navBottom')
    const sticky = navbar.offsetTop

    window.onscroll = onScrollHandle

    function onScrollHandle() {
      if (window.pageYOffset >= sticky) {
        navBottom.style.height = navbar.clientHeight + 'px'
        navbar.classList.add('fixed')
      } else {
        navBottom.style.height = 0
        navbar.classList.remove('fixed')
      }
    }
  },
}
</script>

<style>
</style>