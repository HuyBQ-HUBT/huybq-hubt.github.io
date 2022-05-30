<template>
  <section
    class="flex lg:flex-row flex-col py-10 items-center justify-center gap-8"
    :style="{
      backgroundImage: 'url(' + require('@/assets/images/paper.png') + ')',
    }"
  >
    <div
      id="invitationBox_1"
      class="bg-white p-4 mx-4 lg:mx-0 lg:p-8 lg:w-[520px]"
    >
      <div
        class="
          flex flex-col
          border-[3px]
          lg:border-4
          border-yellow-800
          px-4
          py-6
          lg:p-10
          items-center
          h-full
        "
      >
        <div class="font-greatevibes text-3xl lg:text-5xl mb-8 lg:mb-10">
          Save the Date
        </div>
        <div class="text-base font-dosis mb-4 lg:mb-5">For the wedding of</div>
        <div
          class="
            font-greatevibes
            text-lg
            lg:text-3xl
            font-semibold
            tracking-wide
            mb-10
          "
        >
          Quang Huy & Ngọc Thoa
        </div>
        <div class="font-dosis text-xs lg:text-lg text-[#444444] text-center">
          Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi có
          thêm một niềm hạnh phúc!
        </div>

        <button
          class="
            lg:mt-10 lg:px-4 lg:py-3
            mt-5
            px-2
            py-1
            lg:text-base
            text-sm
            bg-red-300
            rounded-sm
            text-white
            flex
            lg:gap-2
            gap-1
            items-center
          "
        >
          <span>Gửi lời chúc</span>
          <ArrowNarrowRightIcon />
        </button>
      </div>
    </div>
    <div
      id="invitationBox_2"
      class="bg-white p-4 mx-4 lg:mx-0 lg:p-8 lg:w-[520px]"
    >
      <div
        class="
          flex flex-col
          border-[3px]
          lg:border-4
          border-yellow-800
          px-4
          py-6
          lg:p-10
          items-center
        "
      >
        <div class="font-dosis text-lg font-bold mb-4">Jun 2022</div>
        <div
          class="
            grid grid-cols-7
            w-full
            border-t-[1px] border-b-[1px] border-gray-400
          "
        >
          <div
            v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
            :key="'day_' + day"
            class="font-dosis text-base text-[#484848] text-center"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 w-full">
          <div></div>
          <div></div>
          <div
            v-for="i in 30"
            :key="'date' + i"
            :class="`font-dosis text-base text-center py-2 relative ${
              i === 30 ? 'bg-red-300 rounded-full text-white' : 'text-[#484848]'
            }`"
          >
            {{ i }}
          </div>
        </div>

        <div class="w-full flex justify-between lg:mt-10 mt-5">
          <div
            v-for="time in times"
            :key="'time_' + time.title"
            class="
              lg:w-[52px]
              text-center
              lg:text-5xl
              text-3xl
              font-greatevibes
              text-red-300
              flex flex-col
              items-center
            "
          >
            <span>{{ pad(time.value) }}</span>
            <span class="text-base font-dosis font-bold">{{ time.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ArrowNarrowRightIcon } from '@vue-hero-icons/outline'

export default {
  name: 'AppInvitation',
  components: {
    ArrowNarrowRightIcon,
  },
  data() {
    return {
      seconds: parseInt(
        (new Date(
          'Thu Jun 30 2022 11:00:00 GMT+0700 (Indochina Time)'
        ).getTime() -
          Date.now()) /
          1000
      ),
      countDownInterval: null,
    }
  },
  computed: {
    days() {
      return Math.floor(this.seconds / 24 / 60 / 60)
    },
    hoursLeft() {
      return Math.floor(this.seconds - this.days * 86400)
    },
    hours() {
      return Math.floor(this.hoursLeft / 3600)
    },
    minutesLeft() {
      return Math.floor(this.hoursLeft - this.hours * 3600)
    },
    minutes() {
      return Math.floor(this.minutesLeft / 60)
    },
    remainingSeconds() {
      return this.seconds % 60
    },
    times() {
      return [
        { title: 'Ngày', value: this.days },
        { title: 'Giờ', value: this.hours },
        { title: 'Phút', value: this.minutes },
        { title: 'Giây', value: this.remainingSeconds },
      ]
    },
  },
  mounted() {
    const handle = () => {
      const isMobile = window.innerWidth < 1024
      const el1 = document.getElementById('invitationBox_1')
      const el2 = document.getElementById('invitationBox_2')
      if (isMobile) {
        const maxWidth = `${
          el1.clientWidth > el2.clientWidth ? el1.clientWidth : el2.clientWidth
        }px`
        el1.style.width = maxWidth
        el1.style.height = 'auto'
        el2.style.width = maxWidth
        el2.style.height = 'auto'
      } else {
        const maxHeight = `${
          el1.clientHeight > el2.clientHeight
            ? el1.clientHeight
            : el2.clientHeight
        }px`
        el1.style.height = maxHeight
        // el1.style.width = 'auto'
        el2.style.height = maxHeight
        // el2.style.width = 'auto'
      }
    }
    handle()

    window.onresize = () => {
      handle()
    }

    this.countDownInterval = setInterval(timer.bind(this), 1000)
    function timer() {
      if (this.seconds === 0) {
        clearInterval(this.countDownInterval)
      } else {
        this.seconds--
      }
    }
  },
  methods: {
    pad: (n) => {
      return n < 10 ? '0' + n : n
    },
  },
}
</script>

<style>
</style>