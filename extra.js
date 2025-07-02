<style>
/* This class will be applied to each character by the JS */
.letter {
  display: inline-block;
  opacity: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform, opacity;
  margin: 0 5px;
}

.line{
	overflow:hidden;
}

.loader_container{
	display:block;
}
  </style>
  

<link rel="stylesheet" href="https://unpkg.com/lenis@1.2.3/dist/lenis.css">



// body after

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/vipulkumar-dev/gsap/SplitText.min.js"></script>
<script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>  

<script>
    document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Get the heading element
  const heading = document.querySelector('.animated-text');
  const originalText = heading.innerHTML;
  
  // Clear the heading
  heading.innerHTML = '';
  
  // Create spans for each character, preserving the <br> tag
  const parts = originalText.split('<br>');
  
  parts.forEach((part, partIndex) => {
    // Process each part (before and after the <br>)
    Array.from(part).forEach((char) => {
      // Skip spaces in the character splitting, but still add them
      if (char === ' ') {
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'letter';
        spaceSpan.innerHTML = '&nbsp;';
        heading.appendChild(spaceSpan);
        return;
      }
      
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char;
      heading.appendChild(span);
    });
    
    // Add back the <br> tag if this isn't the last part
    if (partIndex < parts.length - 1) {
      heading.appendChild(document.createElement('br'));
    }
  });
  
  // Get all letter elements for animation
  const letters = document.querySelectorAll('.letter');
  
  // Set initial states for each letter
  letters.forEach((letter, index) => {
    const randomY = (Math.random() * -100 - 100) + '%';
    const randomRotateY = index % 2 === 0 ? 90 : -90; // Alternate rotation direction
    
    gsap.set(letter, {
      y: randomY,
      opacity: 0,
      rotateY: randomRotateY,
      scale: 0.5
    });
  });
  
  // Create the scroll-triggered animation
  gsap.to(letters, {
    y: "0%",
    opacity: 1,
    rotateY: 0,
    scale: 1,
    duration: 0.5,
    stagger: { each: 0.05, from: "random" },
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".scroll-container",
      start: "top top",
      end: "+=200%",
      scrub: 1
    }
  });
});
</script>
  
<script>

    function loadScript(primaryUrl, fallbackUrl) {
      const script = document.createElement("script");
      script.src = primaryUrl;
      script.type = "module";
      script.onload = () => console.log(`Loaded script from: ${primaryUrl}`);
      //document.setAttribute("data-script-mode", "local");
      script.onerror = () => {
        console.warn(
          `Failed to load script from: ${primaryUrl}, attempting fallback.`
        );
        const fallbackScript = document.createElement("script");
        fallbackScript.src = fallbackUrl;
        fallbackScript.type = "module";
        fallbackScript.onload = () =>
          console.log(`Loaded script from: ${fallbackUrl}`);
        fallbackScript.onerror = () =>
         console.error(`Failed to load script from: ${fallbackUrl}`);
        document.head.appendChild(fallbackScript);
        //document.setAttribute("data-script-mode", "server");
      };
      document.head.appendChild(script);
    }

    const FOLDERNAME = "saisei";

    document.addEventListener("DOMContentLoaded", () => {
      loadScript(
        `http://127.0.0.1:3000/${FOLDERNAME}/index.js`,
        `https://ninety-eight.vercel.app/${FOLDERNAME}/index.js`
      );
    });

</script> 
  