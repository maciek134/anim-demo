import AOS from 'aos';
import anime from 'animejs/lib/anime.es';
import 'aos/dist/aos.css';
import "./styles.less";

AOS.init();

anime({
  targets: '#hello-path path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  autoplay: true,
});

const heroAnimation = anime.timeline({
  easing: 'easeInOutSine',
  duration: 1500,
  autoplay: true,
});
heroAnimation.add({
  targets: '#hero path',
  strokeDashoffset: [anime.setDashoffset, 0],
}, 0);
heroAnimation.add({
  targets: '#hero path, #hero circle',
  fill: (e, i) => {
    return [ `rgba(255, 255, 255, 0)`, anime.get(e, 'fill') ];
  },
}, 1);

const scrollAnimation = anime({
  targets: '#scroll-position',
  translateY: 'calc(100vh - 3rem)',
  rotateZ: '1800deg',
  easing: 'linear',
  autoplay: false,
  backgroundColor: '#4e32a8',
});

const deskAnimation = anime.timeline({
  autoplay: false,
  easing: 'linear',
});

deskAnimation.add({
  targets: '#desk path',
  strokeDashoffset: [anime.setDashoffset, 0],
});
deskAnimation.add({
  targets: '#desk path',
  strokeDashoffset: [0, anime.setDashoffset],
  duration: 2000,
});
deskAnimation.add({
  targets: '#desk p',
  opacity: [0, 1],
}, '-=500');

const observer = new IntersectionObserver(([entry]) => {
  if (entry.intersectionRect.top <= 0) {
    return;
  }
  deskAnimation.seek(deskAnimation.duration * entry.intersectionRatio);
}, {
  threshold: new Array(100).fill(0).map((v, i) => i / 100),
});
const desk = document.getElementById('desk');
observer.observe(desk);

function setScrollSeek() {
  const scrollPercent = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  scrollAnimation.seek(scrollAnimation.duration * scrollPercent);
}

window.addEventListener('scroll', setScrollSeek, { passive: false });
setScrollSeek();