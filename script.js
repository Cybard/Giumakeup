document.addEventListener('DOMContentLoaded', () => {
    // Before & After Slider Logic
    const slider = document.querySelector('.comparison-slider');
    const beforeWrapper = document.querySelector('.before-wrapper');
    const handle = document.querySelector('.slider-handle');
    let isSliding = false;

    const slide = (x) => {
        const rect = slider.getBoundingClientRect();
        // Calculate relative position within the slider
        let position = x - rect.left;
        
        // Boundaries
        if (position < 0) position = 0;
        if (position > rect.width) position = rect.width;

        // Calculate percentage
        const percentage = (position / rect.width) * 100;
        
        // Apply widths/positions
        beforeWrapper.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    // Mouse events
    slider.addEventListener('mousedown', () => {
        isSliding = true;
    });

    window.addEventListener('mouseup', () => {
        isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        slide(e.pageX);
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        isSliding = true;
    });

    window.addEventListener('touchend', () => {
        isSliding = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isSliding) return;
        slide(e.touches[0].pageX);
    });
    
    // Resize handling to ensure image widths stay correct
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const beforeImg = document.querySelector('.before-wrapper img');
            beforeImg.style.width = `${entry.contentRect.width}px`;
        }
    });
    
    resizeObserver.observe(slider);
});
