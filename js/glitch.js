// Tab Title Glitch Effect
(function() {
    const originalTitle = document.title;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let interval;
    
    function glitchTabTitle() {
        let iterations = 0;
        clearInterval(interval);
        interval = setInterval(() => {
            document.title = originalTitle.split("").map((letter, index) => {
                if(index < iterations) return originalTitle[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            
            if(iterations >= originalTitle.length) clearInterval(interval);
            iterations += 1 / 2; // Speed of decoding
        }, 50);
    }
    
    // Initial glitch
    setTimeout(glitchTabTitle, 1000);
    
    // Random glitch loop
    setInterval(() => {
        if(Math.random() > 0.8) glitchTabTitle();
    }, 10000);

    // Glitch on visibility change (when user comes back to tab)
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) glitchTabTitle();
    });
})();
