const el = document.getElementById('copyright-year');
const startYear = 2013;
const endYear = new Date().getFullYear();
const holdTime = 2000;

// Classic 8-bit palette: Magenta, Cyan, Lime, Yellow, Bright Red, White
const bitColors = ['#ff00ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000', '#ffffff'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      el.innerText = startYear;
      setTimeout(() => {
        slow8BitGlitch(el, startYear, endYear);
      }, holdTime);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 1.0 });

function slow8BitGlitch(obj, start, end) {
  let current = start;
  
  const timer = setInterval(() => {
    const isGlitching = Math.random() > 0.65; 
    const glitchChars = "0123456789<>_$%#";

    if (isGlitching) {
      // 1. Pick a random 8-bit color
      const randomColor = bitColors[Math.floor(Math.random() * bitColors.length)];
      
      // 2. Scramble the text
      let broken = "";
      for(let i=0; i<4; i++) broken += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      
      obj.innerText = broken;
      obj.style.color = randomColor;
      obj.style.textShadow = `2px 2px 0px #000`; // 8-bit blocky shadow
      obj.style.transform = `scale(${1 + Math.random() * 0.1})`; // Slight size pop
    } else {
      // 3. Increment year and reset styles
      if (current < end) current++;
      
      obj.innerText = current;
      obj.style.color = ""; // Returns to your CSS default
      obj.style.textShadow = "none";
      obj.style.transform = "scale(1)";
    }

    if (current >= end && !isGlitching) {
      obj.innerText = end;
      obj.style.color = "";
      clearInterval(timer);
    }
  }, 180); // Slightly slower to let the colors register
}

observer.observe(el);