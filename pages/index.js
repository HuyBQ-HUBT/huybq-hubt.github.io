import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import moment from 'moment';
import NoteIcon from '../public/images/icons/note.svg';
import ArrowUpIcon from '../public/images/icons/arrow-up.svg';
import styles from './Home.module.css';
import clsx from 'clsx';

const MENUS = [
  {
    title: 'Couple',
    href: '#couple',
  },
  {
    title: 'Story',
    href: '#story',
  },
  {
    title: 'Time',
    href: '#time',
  },
  {
    title: 'Detail',
    href: '#detail',
  },
  {
    title: 'Gallery',
    href: '#gallery',
  },
];

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + el.clientHeight ||
        document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToTopFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function calculateTimeLeft(to) {
  const difference = +new Date(to) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

const quotes = [
  {
    en: 'A man falls in love through his eyes, a woman through her ears.',
    vi: 'Con gái yêu bằng tai, con trai yêu bằng mắt.',
  },
  {
    en: 'How can you love another if you don’t love yourself?',
    vi: 'Làm sao bạn có thể yêu người khác nếu bạn không yêu chính mình?',
  },
  {
    en: 'Hate has a reason for everything but love is unreasonable.',
    vi: 'Ghét ai thì có thể nêu lý do nhưng yêu ai thì không thể.',
  },
  {
    en: 'A great love is not one who loves many, but one who loves one woman for life.',
    vi: 'Tình yêu lớn không phải là yêu nhiều người mà yêu một người suốt cả cuộc đời.',
  },

  {
    en: 'Love means you never have to say you’re sorry.',
    vi: 'Yêu nghĩa là không bao giờ phải nói rất tiếc.',
  },
  {
    en: 'I would rather be poor and in love with you, than being rich and not having anyone',
    vi: 'Thà nghèo mà có tình yêu còn hơn giàu có mà đơn độc',
  },
  {
    en: 'No man or woman is worth you tears, and the one who is, won’t make you cry.',
    vi: 'Không có ai xứng đáng với những giọt nước mắt của bạn vì người xứng đáng sẽ không làm bạn phải khóc.',
  },
];

class TailwindColor {
  constructor(options) {
    const {
      colors = [
        'gray',
        'red',
        'yellow',
        'green',
        'blue',
        'indigo',
        'purple',
        'pink',
      ],
      range = [1, 9],
      prefix = 'bg',
    } = options || {};

    this.colors = colors;
    this.range = {
      min: range[0],
      max: range[1],
    };
    this.prefix = prefix;

    this.tempColors = [];
  }

  pick() {
    const number =
      this.constructor.random(this.range.min, this.range.max) * 100;
    const indexColor = this.constructor.random(0, this.colors.length - 1);
    return `${this.prefix}-${this.colors[indexColor]}-${number}`;
  }

  color(colors = '') {
    const isArray = Array.isArray(colors);
    if (!isArray) this.tempColors.push(colors);
    else colors.forEach((color) => this.tempColors.push(color));
    return this;
  }

  add() {
    this.tempColors.forEach((color) => this.colors.push(color));
  }

  remove() {
    this.tempColors.forEach((color) => {
      const index = this.colors.indexOf(color);
      if (index >= 0) this.colors.splice(index, 1);
    });
  }

  static random(min = 1, max = 9) {
    return Math.floor(Math.random() * max) + min;
  }
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

export default function Home() {
  const [isScrollOverNavBar, setIsScrollOverTopBar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  const [date] = useState(1656561600000);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [groomAndBride] = useState({
    groom: { lastName: 'Huy', firstName: 'Bùi Quang', sortName: 'Quang Huy' },
    bride: {
      lastName: 'Thoa',
      firstName: 'Nguyễn Thị Ngọc',
      sortName: 'Ngọc Thoa',
    },
  });
  const [quote, setQuote] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [events] = useState([
    {
      title: 'Lễ vu quy',
      time: '07:25 AM - Thứ 5, ngày 30 tháng 06 năm 2022',
      address: 'Số 158, khu Dân Chủ, Mạo Khê, Đông Triều',
      city: 'Quảng Ninh',
      tel: {
        title: '0379.162.855',
        href: '+84379162855',
      },
      location: {
        link: 'https://goo.gl/maps/t7ntAi5NLmJZdHQe6',
        html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.0911172679566!2d106.59848681493646!3d21.06902269177838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a80e16bf1398b%3A0x32c5d2675552d855!2zMTU4IETDom4gQ2jhu6csIFRULiBN4bqhbyBLaMOqLCB0eC4gxJDDtG5nIFRyaeG7gXUsIFF14bqjbmcgTmluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1654674366735!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      },
    },
    {
      title: 'Tiệc mừng lễ vu quy',
      time: '11:00 AM - Thứ 4, ngày 29 tháng 06 năm 2022',
      address: 'Nhà hàng Hạnh Hưng, Vườn hoa chéo, KĐT Tân Việt Bắc',
      city: 'Quảng Ninh',
      tel: {
        title: '0379.162.855',
        href: '+84379162855',
      },
      location: {
        link: 'https://goo.gl/maps/r86CyMGG1efBuk3W9',
        html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.42259651519!2d106.59572672543798!3d21.055777247417975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a80ebfd1b1acd%3A0x7d818161a8181943!2zTmjDoCBIw6BuZyBI4bqhbmggSMawbmc!5e0!3m2!1svi!2s!4v1654674490652!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      },
    },
    {
      title: 'Lễ thành hôn',
      time: '10:05 AM - Thứ 5, ngày 30 tháng 06 năm 2022',
      address: 'Số 51, đường Phạm Hùng, phường Thanh Bình',
      city: 'Hải Dương',
      tel: {
        title: '098.22.888.68',
        href: '+84982288868',
      },
      location: {
        link: 'https://goo.gl/maps/WwQkv5RRqQMMgnj98',
        html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.4779976936015!2d106.2913131149348!3d20.933310996405794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359ba681f0aeb1%3A0xe7599053dd2c8fd1!2zNTEgUGjhuqFtIEjDuW5nLCBQLiBUaGFuaCBUcnVuZywgVGjDoG5oIHBo4buRIEjhuqNpIETGsMahbmcsIEjhuqNpIETGsMahbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1654674062093!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      },
    },
    {
      title: 'Tiệc mừng lễ thành hôn',
      time: '11:00 AM - Thứ 5, ngày 30 tháng 06 năm 2022',
      address:
        'Nhà hàng Miến Hương, số 61 đường Thống Nhất, phường Lê Thanh Nghị',
      city: 'Hải Dương',
      tel: {
        title: '098.22.888.68',
        href: '+84982288868',
      },
      location: {
        link: 'https://goo.gl/maps/QfuWtuHaZbF9SzDP8',
        html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.5423022605646!2d106.32196131493465!3d20.93072619649364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31359bba8e473bd3%3A0x595deff9bf26fb40!2zTmjDoCBow6BuZyBNaeG6v24gSMawxqFuZw!5e0!3m2!1svi!2s!4v1654674315310!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      },
    },
  ]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const togglePlayMusic = () => {
    const elm = document.getElementById('music');
    if (!elm) return;
    if (!playingMusic) {
      setPlayingMusic(true);
      elm.play();
    } else {
      setPlayingMusic(false);
      elm.pause();
    }
  };

  const goTo = (href) => {
    const id = href.replace('#', '');
    const elm = document.getElementById(id);
    if (!elm) return;

    elm.scrollIntoView({ behavior: 'smooth' });
    toggleMenu();
  };

  const onScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > 0) {
      setIsScrollDown(true);
    } else {
      setIsScrollDown(false);
    }

    const navbar = document.getElementById('navbar');
    [
      {
        id: 'storyGif',
      },
      {
        id: 'footerGif',
      },
      {
        id: 'timeGif',
      },
      {
        id: 'whenWhereGif',
      },
      {
        id: 'justMarriedGif',
      },
      {
        id: 'galleryGif',
      },
    ].forEach((e) => {
      const elm = document.getElementById(e.id);
      if (!elm) return;

      if (isInViewport(elm)) {
        if (!elm.src) {
          elm.src = `/images/${e.id}.gif`;
        }
      } else {
        elm.src = '';
      }
    });

    const sticky = navbar.clientHeight;

    if (window.pageYOffset > sticky) {
      setIsScrollOverTopBar(true);
    } else {
      setIsScrollOverTopBar(false);
    }
  };

  useEffect(() => {
    const _calcTimeLeft = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => {
      clearTimeout(_calcTimeLeft);
    };
  });

  useEffect(() => {
    setQuote(getRandomQuote());
    const _randNewQuote = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10_000);
    setTimeLeft(calculateTimeLeft(date));

    window.addEventListener('scroll', onScroll);

    const links = document.getElementsByTagName('a');

    Array.prototype.forEach.call(links, function (elem, index) {
      //Get the hyperlink target and if it refers to an id go inside condition
      const elemAttr = elem.getAttribute('href');
      if (elemAttr && elemAttr.includes('#')) {
        //Replace the regular action with a scrolling to target on click
        elem.addEventListener('click', function (ev) {
          ev.preventDefault();
          //Scroll to the target element using replace() and regex to find the href's target id
          document.getElementById(elemAttr.replace(/#/g, '')).scrollIntoView({
            behavior: 'smooth',
          });
        });
      }
    });

    return () => {
      clearInterval(_randNewQuote);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openMenu]);

  return (
    <div>
      <Head>
        <title>H&T Wedding</title>
        <meta name='description' content='Huy Thoa Wedding' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header
        id='couple'
        className={`flex w-full h-screen bg-[url('/images/head-bg.jpeg')] bg-cover ${
          isScrollOverNavBar ? 'text-black' : 'text-white'
        }`}
      >
        <nav
          id='navbar'
          className={`fixed z-50 w-full flex items-center justify-between px-4 laptop:px-[128px] transition-all duration-300 shadow-sm ${
            isScrollOverNavBar
              ? `laptop:h-[56px] h-[48px] ${
                  openMenu ? 'bg-white' : 'bg-white/80'
                }`
              : `laptop:h-[84px] h-[56px] shadow-white/20 ${
                  openMenu
                    ? 'bg-white text-black transition-none'
                    : 'bg-transparent '
                }`
          }`}
        >
          <div className='flex items-center'>
            <div
              className={`font-casual tracking-widest mr-8 align-middle transition-all duration-300 font-bold ${
                isScrollOverNavBar
                  ? 'text-base laptop:text-lg'
                  : 'text-2xl laptop:text-4xl'
              }`}
            >
              {`${groomAndBride.groom.lastName.charAt(
                0
              )}<3${groomAndBride.bride.lastName.charAt(0)}`}
            </div>
            <div className='flex laptop:flex-col flex-row'>
              <div
                className={`hidden laptop:flex font-dosis tracking-wide font-bold transition-all duration-300 ${
                  isScrollOverNavBar ? 'text-xl' : 'text-2xl'
                }`}
              >
                {`${groomAndBride.groom.lastName} & ${groomAndBride.bride.lastName}`}
              </div>
              <div
                className={`font-serif italic transition-all duration-300 laptop:block hidden ${
                  isScrollOverNavBar ? 'text-xs' : 'text-sm'
                }`}
              >
                {moment(date).format('DD MMM, YYYY')}
              </div>
            </div>
          </div>
          <div className='laptop:flex items-center hidden'>
            {MENUS.map((e) => (
              <a
                key={`menu_${e.href}`}
                href={e.href}
                className='font-dosis text-lg font-semibold mx-4 hover:underline underline-offset-1 opacity-70 hover:opacity-100'
              >
                {e.title}
              </a>
            ))}
          </div>
          <div className='laptop:hidden flex'>
            <div className='py-6 flex flex-col justify-center sm:py-12'>
              <div className='relative py-3 sm:max-w-xl mx-auto'>
                <nav x-data='{ open: false }'>
                  <button
                    className='w-10 h-10 relative focus:outline-none'
                    onClick={toggleMenu}
                  >
                    <div className='block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2'>
                      <span
                        aria-hidden='true'
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                          openMenu ? 'rotate-45' : '-translate-y-1.5'
                        }`}
                      ></span>
                      <span
                        aria-hidden='true'
                        className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
                          openMenu ? 'opacity-0' : ''
                        }`}
                      ></span>
                      <span
                        aria-hidden='true'
                        className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                          openMenu ? '-rotate-45' : 'translate-y-1.5'
                        }`}
                      ></span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            <div
              className={`fixed flex flex-col z-40 w-screen bg-white right-full ${
                openMenu ? 'right-0' : ''
              } ${
                isScrollDown
                  ? 'top-[48px] h-[calc(100%-48px)]'
                  : 'top-[56px] h-[calc(100%-56px)]'
              }`}
            >
              {MENUS.map((e) => {
                return (
                  <div
                    key={`menu-${e.href}`}
                    className={`text-right  px-8 py-4 font-mono font-bold cursor-pointer shadow-sm hover:bg-black/10 transition-all duration-300 ease-in delay-200 ${
                      openMenu ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => goTo(e.href)}
                  >
                    {e.title}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        <div
          className={`flex-1 relative flex justify-center items-center transition-all duration-300 ${
            isScrollOverNavBar
              ? 'mt-[48px] laptop:mt-[56px]'
              : 'mt-[56px] laptop:mt-[84px]'
          }`}
        >
          <div className='flex laptop:flex-row flex-col gap-4 laptop:gap-10 items-center'>
            <div className='flex flex-col font-casual text-white text-5xl items-center gap-2'>
              {groomAndBride.groom.sortName}
              <b className='hidden laptop:block font-dosis text-xl'>
                Save The Date
              </b>
            </div>
            <div className='w-[200px] h-[200px] laptop:w-[350px] laptop:h-[350px] relative border-2 border-white rounded-full'>
              <Image
                src='/images/couple.png'
                alt='ty_gif'
                layout='fill'
                priority
                className='object-cover'
              />
            </div>
            <div className='flex flex-col font-casual text-white text-5xl items-center gap-2'>
              {groomAndBride.bride.sortName}
              <b className='font-dosis text-xl laptop:hidden block'>
                Save The Date
              </b>
              <b className='font-dosis text-xl'>
                {moment(date).format('DD MMM, YYYY')}
              </b>
            </div>
          </div>

          <a
            href='#story'
            className='absolute left-[calc(50%-13px)] bottom-10 w-[26px] h-[40px] rounded-xl border-2 border-white hover:cursor-pointer'
          >
            <div className='w-[2px] h-[10px] bg-white absolute left-[calc(50%-1px)] top-[8px] animate-bounce'></div>
            <span className='absolute -bottom-8 left-[calc(50%-20px)] text-white'>
              Scroll
            </span>
          </a>
        </div>
      </header>

      <main>
        <section id='story'>
          <div className='flex h-screen flex-col items-center justify-center px-4 laptop:px-0'>
            <div className='flex justify-center'>
              <Image
                id='storyGif'
                src='/images/storyGif.gif'
                alt='story_gif'
                width={350}
                height={150}
              />
            </div>

            <h1 className='font-dosis font-bold text-3xl laptop:text-5xl text-center py-4 laptop:pt-10 laptop:pb-5'>
              Our story
            </h1>
            <h2 className='font-dosis italic font-bold text-xl laptop:text-3xl text-center'>
              7 Aug, 2019
            </h2>
            <p className='text-[#333333] font-sans text-xs laptop:text-sm laptop:w-[600px] mx-auto break-words whitespace-normal laptop:mt-5 mt-4'>
              {`"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              id efficitur erat, eu mattis nulla. Praesent laoreet orci non eros
              laoreet suscipit. Quisque finibus, ipsum vel porta dapibus, ex
              ligula blandit mi, porttitor pulvinar turpis tellus id dui. Nam
              lacus neque, viverra quis varius at, finibus sed erat. Nunc
              venenatis laoreet tellus eu dignissim. Mauris ut diam justo. Duis
              ac lectus vitae quam tempor facilisis. Etiam vel mauris dui.
              Vivamus eget viverra augue, quis finibus eros." — Méo.`}
            </p>
          </div>
        </section>

        <section id='time'>
          <div
            className={clsx(styles.parallax, "bg-[url('/images/std.jpeg')]")}
          >
            <div className='flex-1 bg-black/30 pt-32 laptop:pb-[128px] pb-[64px] px-4 laptop:px-0'>
              <div className='flex justify-center'>
                <Image
                  id='timeGif'
                  src='/images/savethedateGif.gif'
                  alt='time_gif'
                  width={225}
                  height={175}
                />
              </div>

              <h1 className='text-center text-white font-casual text-5xl laptop:text-7xl pt-4 laptop:pb-16 pb-8'>
                {moment(date).format('DD MMM, YYYY')}
              </h1>
              <div className='flex gap-6 laptop:gap-10 justify-center'>
                {Object.entries(timeLeft).map((e) => {
                  const [key, value] = e;

                  return (
                    <div
                      key={`time-${key}`}
                      className='text-white font-dosis font-semibold flex flex-col items-center w-[36px] laptop:w-[64px]'
                    >
                      <div className='text-3xl laptop:text-5xl'>
                        {pad(value)}
                      </div>
                      <div className='text-sm laptop:text-base'>{key}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id='detail'>
          <div
            className={clsx(
              'pt-32 laptop:pb-[128px] pb-[64px] px-4 laptop:px-0'
            )}
          >
            <div className='flex justify-center'>
              <Image
                id='whenWhereGif'
                src='/images/whenWhereGif.gif'
                alt='ww_gif'
                width={350}
                height={150}
              />
            </div>

            <h1 className='font-dosis font-bold text-3xl laptop:text-5xl text-center py-4 laptop:pt-10 laptop:pb-5'>
              Wedding detail
            </h1>
            <h2 className='font-dosis italic font-bold text-xl laptop:text-3xl text-center'>
              When & Where
            </h2>
            <p className='text-[#333333] font-sans text-xs laptop:text-sm laptop:w-[600px] mx-auto break-words whitespace-normal laptop:mt-5 mt-4'>
              {`"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              id efficitur erat, eu mattis nulla. Praesent laoreet orci non eros
              laoreet suscipit. Quisque finibus, ipsum vel porta dapibus, ex
              ligula blandit mi, porttitor pulvinar turpis tellus id dui. Nam
              lacus neque, viverra quis varius at, finibus sed erat."`}
            </p>

            <div className='flex laptop:flex-row flex-col gap-2 mt-6 laptop:mt-10 justify-evenly px-4'>
              {events.map((e, i) => {
                return (
                  <div
                    key={`event-${i}`}
                    className='flex flex-col text-black w-[calc(100%-16px)] laptop:w-[325px] shadow-sm laptop:shadow-md py-4 rounded'
                  >
                    <div className='text-center text-xl laptop:text-3xl font-bold font-dosis pb-10'>
                      {e.title}
                    </div>
                    <div className='text-xs laptop:text-sm font-opensans pb-4 text-center text-[#333333]'>
                      {e.time}
                    </div>
                    <div className='text-xs laptop:text-sm font-opensans pb-4 text-center text-[#333333]'>
                      {e.address}
                    </div>
                    <div className='text-xs laptop:text-sm font-opensans pb-4 text-center text-[#333333]'>
                      {`Thành phố ${e.city}`}
                    </div>
                    <a
                      href={`tel:${e.tel.href}`}
                      className='w-fit mx-auto text-xs laptop:text-sm font-opensans mb-5 laptop:mb-10 text-center text-[#333333] hover:underline underline-offset-1'
                    >
                      {e.tel.title}
                    </a>
                    <a
                      href={e.location.link}
                      target='_blank'
                      className='w-fit mx-auto text-center mt-auto py-3 px-8 laptop:py-4 laptop:px-10 bg-black/10 hover:bg-black/20 rounded-full cursor-pointer text-black/60'
                      rel='noreferrer'
                    >
                      View map
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id='justMarried'>
          <div
            className={clsx(
              styles.parallax,
              "bg-[url('/images/decor.jpeg')] flex"
            )}
          >
            <div className='flex-1 bg-black/30 py-32 px-4 laptop:px-0 '>
              <div className='flex justify-center'>
                <Image
                  id='justMarriedGif'
                  src='/images/jmr.gif'
                  alt='rsvp_gif'
                  width={340}
                  height={200}
                />
              </div>

              <div className='flex flex-col text-white w-full transition-all duration-300'>
                <div className='text-center h-[52px] laptop:h-[64px] mt-6 laptop:mt-10 text-base laptop:text-lg font-serif italic'>{`${
                  quote?.en ? `"${quote.en}"` : ''
                }`}</div>
                <div className='text-center h-[36px] laptop:h-[44px] mt-2 laptop:text-sm text-xs'>{`${
                  quote?.vi ? `- ${quote.vi}` : ''
                }`}</div>
              </div>
            </div>
          </div>
        </section>

        <section id='gallery'>
          <div
            className={clsx(
              'pt-32 laptop:pb-[128px] pb-[64px] px-4 laptop:px-0'
            )}
          >
            <div className='flex justify-center'>
              <Image
                id='galleryGif'
                src='/images/galleryGif.gif'
                alt='ww_gif'
                width={390}
                height={110}
              />
            </div>

            <h1 className='font-dosis font-bold text-3xl laptop:text-5xl text-center py-4 laptop:pt-10 laptop:pb-5'>
              Gallery
            </h1>
            <h2 className='font-dosis italic font-bold text-xl laptop:text-3xl text-center'>
              The Day They Got Engaged
            </h2>
            <p className='text-[#333333] font-sans text-xs laptop:text-sm laptop:w-[600px] mx-auto break-words whitespace-normal laptop:mt-5 mt-4 text-center'>
              {`"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              id efficitur erat, eu mattis nulla." — Méo.`}
            </p>

            {/* <div className='flex flex-col w-full tablet:grid grid-flow-col tablet:grid-flow-row tablet:w-[520px]  laptop:w-[900px] desktop:w-[1200px] laptop:h-[1800px] mx-auto row-auto grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 tablet:px-auto gap-5 break-inside-avoid mt-4 laptop:mt-10'> */}
            <div className='flex flex-col items-center gap-2 laptop:gap-4 mt-4 laptop:mt-10 relative'>
              <div className='flex gap-2 laptop:gap-4'>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_9914.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_0072.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_0104.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
              </div>

              <div className='flex gap-2 laptop:gap-4'>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_9783.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/TKK_9538.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_9873.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
              </div>

              <div className='flex gap-2 laptop:gap-4'>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/TKK_9656.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_0517.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
                <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/TKK_9623.JPG'
                    alt='img'
                    width={320}
                    height={480}
                    className='rounded'
                  ></Image>
                </div>
              </div>
              <div className='relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-crosshair'>
                  <Image
                    src='/images/album/HNH_0080.JPG'
                    alt='img'
                    width={992}
                    height={661}
                    className='rounded'
                  ></Image>
                </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full h-[490px] bg-[url('/images/footer-bg.jpeg')] bg-cover flex justify-center items-center">
        <div className='w-[200px] h-[200px] laptop:w-[300px] laptop:h-[300px] bg-black/40 rounded-full flex justify-center items-center'>
          <div className='w-[175px] h-[125px] laptop:w-[256px] laptop:h-[200px] relative'>
            <Image
              id='footerGif'
              src='/images/footerGif.gif'
              alt='ty_gif'
              layout='fill'
            />
          </div>
        </div>

        <div className='fixed bottom-[24px] right-[24px] laptop:bottom-[45px] laptop:right-[45px] flex gap-4'>
          <button
            className={`w-10 h-10 p-2 bg-black/40 rounded-full outline-hidden transition-transform duration-300 ${
              isScrollDown ? '' : 'delay-100 translate-x-full'
            }`}
            onClick={togglePlayMusic}
          >
            <div
              className={`absolute bg-black/20 w-10 h-10 rounded-full top-0 left-0 duration-1000 ${
                playingMusic ? 'animate-ping' : ''
              }`}
            ></div>
            <audio
              id='music'
              preload='auto'
              onEnded={() => setPlayingMusic(false)}
            >
              <source src='/audio/i-do.mp3'></source>
            </audio>
            <div className='w-full h-full relative'>
              <Image
                src={NoteIcon}
                alt='music'
                layout='fill'
                color='white'
              ></Image>
            </div>
          </button>
          <button
            id='btnUp'
            className={`w-10 h-10 p-2 bg-black/40 rounded-full relative outline-hidden transition-all duration-300 ${
              isScrollDown ? 'opacity-100' : 'opacity-0 translate-y-1/2'
            }`}
            onClick={scrollToTopFunction}
          >
            <div
              className={`absolute bg-black/20 w-10 h-10 rounded-full top-0 left-0 duration-1000`}
            ></div>
            <div className='w-full h-full relative'>
              <Image
                src={ArrowUpIcon}
                alt='up'
                layout='fill'
                color='white'
              ></Image>
            </div>
          </button>
        </div>
      </footer>

      <div className='flex w-full laptop:h-[36px] h-[24px] bg-black text-white text-[10px] laptop:text-xs justify-center items-center'>
        {"Copyright © 2022 Méo | console.log('(╯°□°）╯︵ ┻━┻');"}
      </div>
    </div>
  );
}
