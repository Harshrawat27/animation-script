// import { roll, lenisInit } from '../utils.js';
// import { liveReload } from '../liveReload.js';

const header = document.getElementById('header');
let lastScrollPosition = 0;
let delta = 50; // Minimum scroll distance before toggling header
let ticking = false;
let isMenuOpen = false;

function handleScroll() {
  const currentScrollPosition = window.scrollY;

  if (Math.abs(currentScrollPosition - lastScrollPosition) > delta) {
    if (currentScrollPosition > lastScrollPosition) {
      // Scrolling down
      header.classList.add('hidden');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
    }
    lastScrollPosition = currentScrollPosition;
  }

  ticking = false;
}
export function lenisInit() {
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
const lenis = lenisInit();

// var scriptLocation = document.currentScript.src;
// console.log("scriptLocation", scriptLocation);

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});

(function loaderAnimatiion() {
  const loaderTl = gsap.timeline({
    defaults: {
      duration: 3,
      ease: 'power4.inOut',
    },
  });

  loaderTl
    .to('.loader_center_line', {
      height: '0%',
      duration: 2,
    })
    .to(
      '.loader_line',
      {
        height: '0%',
        duration: 2,
      },
      '<'
    );

  const loader_circle = document.querySelector('.loader_circle');
  const length = loader_circle.getTotalLength();

  // Set the stroke dash values
  loader_circle.style.strokeDasharray = length;
  loader_circle.style.strokeDashoffset = 0;

  loaderTl
    .to(
      '.loader_svg',
      {
        opacity: '0',
        delay: 1,
        duration: 1.3,
        // duration: 5,
      },
      '<'
    )
    .to(
      '.loader_circle',
      {
        strokeDashoffset: length,
        duration: 1.3,
        // duration: 5,
      },
      '<-0.4'
    );

  loaderTl
    .to(
      '.loader_bg_left',
      {
        x: '-101%',
        duration: 2,
      },
      '=-0.4'
    )
    .to(
      '.loader_bg_right',
      {
        x: '101%',
        duration: 2,
      },
      '<'
    );

  const hero_svg_path = document.querySelectorAll('.hero_svg path');

  hero_svg_path.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
  loaderTl
    .to(
      hero_svg_path,
      {
        strokeDashoffset: 0,
        stagger: 0.1,
      },
      '=-1.5'
    )
    .to(
      hero_svg_path,
      {
        fill: 'rgb(251, 240, 218)',
        duration: 2,
      },
      '<=+1.5'
    );

  loaderTl
    .from(
      '.header_border',
      {
        width: 0,
        duration: 1.5,
      },
      '<'
    )
    .from(
      '[nav-reveal]',
      {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 2,
      },
      '<'
    );

  new SplitText('#hero-paragraph', { type: 'lines' });
  new SplitText('#hero-paragraph', { type: 'lines', linesClass: 'line' });

  loaderTl
    .from(
      '#hero-paragraph .line > div',
      {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 2,
      },
      '<'
    )
    .from(
      '.hero-svg-small',
      {
        opacity: 0,
        duration: 1.5,
      },
      '<'
    )
    .from('#scroll-text', { y: 30, opacity: 0, duration: 1.5 }, '<+1');
})();

const menu_open_tl = gsap.timeline({
  paused: true,
  defaults: {
    duration: 2,
    ease: 'power4.inOut',
  },
});
menu_open_tl
  .to('.navigation_left', {
    x: '0%',
    duration: 1.5,
  })
  .to(
    '.navigation_right',
    {
      x: '0%',
      duration: 1.5,
    },
    '<'
  )
  .from(
    '.nav_border',
    {
      width: '0%',
      duration: 1.5,
      stagger: 0.05,
    },
    '<+0.5'
  )
  .from(
    '.nav_border_left',
    {
      width: '0%',
      duration: 1.5,
      stagger: 0.05,
    },
    '<'
  )
  .from(
    '[nav_animate]',
    {
      y: 50,

      duration: 1.5,
      stagger: 0.05,
    },
    '<'
  )
  .from(
    '[nav_animate_left]',
    {
      y: 50,

      duration: 1.5,
      stagger: 0.05,
    },
    '<'
  )
  .from(
    '[nav_animate_fade]',
    {
      opacity: 0,
      duration: 1.5,
      stagger: 0.05,
    },
    '<+0.5'
  );

const menu_close_tl = gsap.timeline({
  paused: true,
  defaults: {
    duration: 2,
    ease: 'power4.inOut',
  },
});
menu_close_tl
  .to('.navigation_left', {
    x: '-101%',
    duration: 1.5,
  })
  .to(
    '.navigation_right',
    {
      x: '101%',
      duration: 1.5,
    },
    '<'
  );

const menu_trigger = document.querySelector('.menu_trigger');
const menu_close = document.querySelector('.menu_close');

menu_trigger.addEventListener('click', () => {
  menu_open_tl.restart();
  isMenuOpen = true;
});

menu_close.addEventListener('click', () => {
  menu_close_tl.restart();
  isMenuOpen = false;
});

document.querySelectorAll('[parallax-image]').forEach((image) => {
  //wrap the image with a div
  const wrapper = document.createElement('div');
  wrapper.classList.add('parallax-image-wrapper');
  wrapper.style.overflow = 'hidden';
  image.parentNode.insertBefore(wrapper, image);
  wrapper.appendChild(image);

  const parallaxtl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      // markers: true,
    },
  });
  const PARALLAXAMOUNT = 70;
  const imageHeight = image.clientHeight;
  wrapper.style.height = `${imageHeight}px`;
  image.style.height = `${imageHeight + PARALLAXAMOUNT}px`;

  parallaxtl.fromTo(
    image,
    {
      y: 0,
    },
    {
      y: -PARALLAXAMOUNT,
    }
  );

  if (image.hasAttribute('not-reveal')) {
    return;
  }

  gsap.fromTo(
    wrapper,
    {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1.5,
      delay: 0.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
      },
    }
  );
});

document.querySelectorAll('[para-reveal]').forEach((text) => {
  new SplitText(text, { type: 'lines' });
  new SplitText(text, { type: 'lines', linesClass: 'line' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: text,
      start: 'top 80%',
      // start: 'top bottom',
      end: 'bottom top',
    },
  });
  tl.fromTo(
    text.querySelectorAll('.line > div'),
    {
      y: '140%',
    },
    {
      y: 0,

      stagger: 0.1,
      duration: 1.5,
      ease: 'power4.inOut',
    }
  );
});

document.querySelectorAll('[basic-reveal]').forEach((element) => {
  // gsap.from(element, {
  //   scrollTrigger: {
  //     trigger: element,
  //     start: "top bottom",
  //     end: "bottom top",
  //   },
  //   y: "150%",
  //   duration: 1.5,
  //   ease: "power4.inOut",
  // });

  gsap.set(element, {
    y: '150%',
  });
});

ScrollTrigger.batch('[basic-reveal]', {
  start: 'top bottom',
  end: 'bottom top',
  // markers: true,
  onEnter: (elements, triggers) => {
    gsap.to(elements, {
      y: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power3.inOut',
    });
  },
});

document.querySelectorAll('[fade-in]').forEach((element) => {
  gsap.set(element, {
    opacity: 0,
  });
});

ScrollTrigger.batch('[fade-in]', {
  start: 'top bottom',
  end: 'bottom top',
  // markers: true,
  onEnter: (elements, triggers) => {
    gsap.to(elements, {
      opacity: 1,
      stagger: 0.1,
      duration: 3,
      ease: 'power3.inOut',
    });
  },
});

document.querySelectorAll('[border-reveal]').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
    },
    width: '0%',
    duration: 1.5,
    ease: 'power4.inOut',
  });
});

document.querySelectorAll('.footer_link_content').forEach((element) => {
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.5,
      ease: 'none',
    },
  });
  tl.fromTo(
    element.querySelector('.footer_link_border'),
    {
      left: '0%',
      right: '100%',
    },
    {
      left: '0%',
      right: '0%',
    }
  ).to(element.querySelector('.footer_link_border'), {
    right: '0%',
    left: '100%',
  });

  let tween = null;

  // Kill any running tween
  const stopTween = () => {
    if (tween) {
      tween.kill();
      tween = null;
    }
  };

  // Reset timeline when it's done
  tl.eventCallback('onComplete', () => {
    tl.pause(0); // Go back to start, paused
  });

  element.addEventListener('mouseenter', () => {
    // play the animation until 50%

    stopTween();

    tween = gsap.to(tl, {
      progress: 0.5,
      duration: Math.abs(tl.progress() - 0.5) * tl.duration(),
      ease: 'power3.out',
    });

    gsap.to(element.querySelector('.footer_link_shadow'), {
      width: '100%',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });
  element.addEventListener('mouseleave', () => {
    stopTween();

    tween = gsap.to(tl, {
      progress: 1,
      duration: (1 - tl.progress()) * tl.duration(),
      ease: 'power3.inOut',
    });

    // Optional: reset timeline after complete if you want repeat behavior
    tween.then(() => {
      tl.pause(0);
    });

    gsap.to(element.querySelector('.footer_link_shadow'), {
      width: '0%',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });
});

const processBlocks = document.querySelectorAll('.process-block');

processBlocks.forEach((element) => {
  element.isOpen = false;

  element.addEventListener('mouseenter', () => {
    gsap.to(element.querySelector('.bg-off-brown'), {
      top: '0%',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });

  element.addEventListener('click', () => {
    // all other elements should be closed
    processBlocks.forEach((processBlock) => {
      if (processBlock !== element) {
        processBlock.isOpen = false;
        toggleProcess(processBlock, true);
      }
    });

    toggleProcess(element, element.isOpen);
    element.isOpen = !element.isOpen;
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element.querySelector('.bg-off-brown'), {
      top: '100%',
      duration: 0.5,
      ease: 'power3.inOut',
    });
  });
});

function toggleProcess(element, isOpen) {
  gsap.to(element.querySelector('.process-answer'), {
    height: isOpen ? '0px' : 'auto',
    duration: 0.5,
    ease: 'power3.inOut',
  });
  gsap.to(element.querySelectorAll('.process-btn'), {
    y: isOpen ? '0%' : '-100%',
    duration: 0.5,
    ease: 'power3.inOut',
  });

  if (!isOpen) {
    gsap.from(element.querySelectorAll('[process-reveal]'), {
      y: '50px',
      stagger: 0.01,
      duration: 1,
      ease: 'power3.inOut',
    });
  }
}

// console.log("From how it why");
// roll("[roll]", 80);
// liveReload();

{
  /* <svg
  xmlns='http://www.w3.org/2000/svg'
  width='100%'
  viewBox='0 0 830 360'
  fill='none'
  class='footer_info_svg'
>
  <path
    d='M72.6125 359.45H65.7486C44.7958 337.052 32.5131 322.602 19.8691 292.979C6.14136 261.549 0 229.036 0 198.33C0 166.9 6.50261 134.387 19.8691 103.681C32.5131 74.0575 44.7958 59.246 65.7486 36.8481H72.6125C57.0785 64.3036 28.5392 113.434 28.5392 198.33C28.5392 283.225 57.0785 332.717 72.6125 359.45Z'
    fill='none'
    stroke='currentColor'
    style='stroke-dashoffset: 0px; stroke-dasharray: 710.25; fill: rgb(251, 240, 218);'
  ></path>
  <path
    d='M408.866 212.419C408.866 216.392 404.892 216.392 403.447 216.392H345.285C345.646 226.869 346.007 272.748 346.007 280.335C346.007 302.371 342.756 317.544 310.604 325.131C305.185 309.958 302.295 302.01 275.924 294.424V291.534C280.62 291.895 304.824 293.701 305.908 293.701C324.693 293.701 325.416 289.005 325.777 282.502C326.138 273.11 325.777 226.869 325.777 216.392H154.903C154.903 223.618 155.264 231.926 155.264 244.209C155.264 254.686 155.625 306.706 155.264 311.764C154.541 324.047 139.73 325.492 138.285 325.492C134.311 325.492 131.421 323.686 131.421 319.35C131.421 318.267 131.782 313.209 131.782 312.125C132.866 298.398 134.672 231.565 135.034 216.392C119.5 216.392 100.353 217.476 85.5415 220.366L76.8714 204.832C93.8504 206.277 117.693 207 135.395 207.722C136.479 178.461 137.201 153.895 137.201 121.021C137.201 94.2879 135.756 83.8114 132.866 67.5549L159.238 81.6439H231.128V34.6806H142.259C135.034 34.6806 112.997 35.4031 96.0179 38.6544L87.3478 23.1204C106.133 24.5654 128.531 26.0104 147.316 26.0104H351.787L364.431 10.4764C366.599 7.58637 368.044 6.14134 369.85 6.14134C372.018 6.14134 375.991 9.39265 376.353 9.7539L394.777 25.2879C396.222 26.733 398.389 28.178 398.389 30.7068C398.389 34.6806 394.416 34.6806 392.971 34.6806H249.191V81.6439H322.526L326.499 74.78C329.028 70.8062 330.112 69.7224 331.918 69.7224C333.363 69.7224 334.086 70.0837 338.06 72.6125L352.51 82.0051C354.316 83.0889 356.122 84.8952 356.122 86.7015C356.122 90.314 352.51 92.8428 343.478 98.2617C343.84 113.796 344.923 190.382 345.285 207.722H362.986L375.63 191.105C377.075 189.298 379.243 186.769 381.049 186.769C382.133 186.769 384.3 187.492 387.552 190.382L405.253 207C407.421 208.806 408.866 210.251 408.866 212.419ZM325.777 144.141V90.314H249.191V144.141H325.777ZM325.777 207.722V152.811H249.191V207.722H325.777ZM231.128 144.141V90.314H155.264V144.141H231.128ZM231.128 207.722V152.811H155.264V207.722H231.128Z'
    fill='none'
    stroke='currentColor'
    style='stroke-dashoffset: 0px; stroke-dasharray: 3244.5; fill: rgb(251, 240, 218);'
  ></path>
  <path
    d='M746.279 298.036C746.279 301.288 743.028 302.01 740.499 302.01H476.421C463.777 302.01 443.546 303.455 429.819 305.984L421.51 290.45C448.604 292.617 474.614 293.34 481.478 293.34H575.044V196.523H526.997C514.353 196.523 494.483 197.968 480.756 200.858L472.086 185.324C499.18 187.492 525.552 187.853 532.054 187.853H575.044C575.044 163.649 575.044 157.869 574.682 106.932H493.761C470.279 167.984 446.075 201.942 427.29 217.837L424.4 215.67C454.023 175.209 488.342 67.1936 488.342 36.8481C488.342 35.4031 488.342 33.9581 487.62 29.9843L522.3 47.3246C524.107 48.4083 525.552 50.2146 525.552 52.7434C525.552 57.4397 521.216 58.8848 519.771 59.246C518.326 59.9685 511.101 62.4973 509.656 62.8586C506.044 74.0575 502.792 83.8114 497.012 98.2617H574.682C574.321 87.7852 574.682 41.1832 573.96 31.7905C573.237 21.3141 569.625 11.1989 565.651 0L603.583 10.4764C605.75 11.1989 609.363 13.0052 609.363 15.8953C609.363 18.0628 607.557 20.2303 606.112 21.6754C604.667 23.4816 597.803 29.623 596.358 31.068C596.358 41.5445 595.996 88.869 595.996 98.2617H672.583L684.143 82.7277C685.949 80.1989 687.394 78.3926 689.201 78.3926C691.368 78.3926 694.619 80.9214 696.064 82.0051L716.656 97.5392C718.462 98.9842 720.269 100.79 720.269 103.319C720.269 106.571 717.017 106.932 714.85 106.932H595.996C595.635 132.942 595.635 162.927 595.635 187.853H653.797L664.996 172.319C667.886 167.984 668.609 167.984 670.415 167.984C671.86 167.984 673.305 168.345 677.279 171.597L696.064 187.131C697.871 188.937 699.677 190.382 699.677 192.911C699.677 196.162 696.426 196.523 693.897 196.523H595.635C595.274 212.057 595.635 279.612 595.274 293.34H696.064L711.598 276.722C714.85 273.11 715.211 272.748 717.017 272.748C719.185 272.748 721.714 274.555 723.881 276.361L742.667 292.617C744.473 294.424 746.279 295.508 746.279 298.036Z'
    fill='none'
    stroke='currentColor'
    style='stroke-dashoffset: 0px; stroke-dasharray: 2559.58; fill: rgb(251, 240, 218);'
  ></path>
  <path
    d='M829.368 198.33C829.368 229.036 823.227 261.549 809.499 292.979C796.855 322.602 784.572 337.052 763.619 359.45H756.755C772.289 332.717 800.829 283.225 800.829 198.33C800.829 113.434 772.651 64.3036 756.755 36.8481H763.619C784.572 59.246 796.855 74.0575 809.499 103.681C822.865 134.387 829.368 166.9 829.368 198.33Z'
    fill='none'
    stroke='currentColor'
    style='stroke-dashoffset: 0px; stroke-dasharray: 710.294; fill: rgb(251, 240, 218);'
  >
    stroke
  </path>
</svg>; */
}
