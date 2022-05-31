<template>
  <nav id="navbar" class="top-0 w-full bg-white z-50">
    <!-- Mobile -->
    <div class="flex justify-between p-4 items-center lg:hidden shadow-sm">
      <div>
        <h1
          id="navHeaderLeft"
          class="
            font-greatevibes
            w-full
            flex
            justify-center
            items-center
            text-lg
            tracking-wide
            ease-in
            duration-500
            opacity-0
            transition-opacity
          "
        >
          Quang Huy
          <HeartIcon class="mx-2 text-red-300" size="20"></HeartIcon>
          Ngọc Thoa
        </h1>
      </div>
      <button class="p-2 bg-red-300 rounded" @click="toggleMenu">
        <MenuIcon class="text-white" />
      </button>
    </div>

    <div
      class="
        transform
        top-0
        -right-full
        w-full
        fixed
        h-full
        overflow-auto
        transition-all
        duration-300
        z-30
        ease-in
      "
      :class="showMenu ? '-translate-x-full' : '-translate-x-0'"
    >
      <div
        class="
          h-full
          bg-white
          w-64
          absolute
          top-0
          right-0
          flex flex-col
          p-4
          z-10
          border-solid border-[1px] border-[#efefef]
        "
      >
        <a
          v-for="(e, i) in menus"
          :key="'nav_' + i"
          class="
            font-dosis
            text-black
            hover:underline hover:text-red-300
            border-b-[1px] border-[#f2f2f2]
            py-4
          "
          :href="e.href"
          >{{ e.title }}</a
        >
      </div>

      <div
        class="h-full bg-black w-full absolute top-0 right-0 z-0"
        :class="
          showMenu
            ? 'transition-opacity delay-300 duration-100 ease-in-out opacity-0'
            : 'opacity-0'
        "
        @click.stop="toggleMenu"
      ></div>
    </div>
    <!-- End Mobile -->

    <!-- Desktop -->
    <div class="hidden lg:flex py-4 items-center justify-center shadow-md">
      <a
        v-for="(e, i) in menus"
        :key="'nav_' + i"
        class="
          font-dosis
          text-black
          font-semibold
          px-4
          hover:underline hover:text-red-300
        "
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
      showMenu: false,
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
  watch: {
    showMenu(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
  },
  mounted() {
    const navbar = document.getElementById('navbar')
    const navBottom = document.getElementById('navBottom')
    const navHeaderLeft = document.getElementById('navHeaderLeft')
    const sticky = navbar.offsetTop

    window.onscroll = onScrollHandle

    function onScrollHandle() {
      if (window.pageYOffset >= sticky) {
        navBottom.style.height = navbar.clientHeight + 'px'
        navbar.classList.add('fixed')
        navHeaderLeft.classList.remove('opacity-0')
        navHeaderLeft.classList.add('opacity-100')
      } else {
        navBottom.style.height = 0
        navbar.classList.remove('fixed')
        navHeaderLeft.classList.remove('opacity-100')
        navHeaderLeft.classList.add('opacity-0')
      }
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>

<style>
</style>