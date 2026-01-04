document.addEventListener('DOMContentLoaded', () => {
    const texts = document.querySelectorAll('.version-group a');   // 글자 부분
    const svgs  = document.querySelectorAll('.svg-group svg');     // SVG들
    let currentIndex = 0;
    let timerId = null;
    let restartTimeoutId = null;

    const AUTO_INTERVAL = 3000;   // 기본 자동 전환 간격
    const RESTART_DELAY = 50;    // 호버 떼고 다시 돌리기까지 대기 시간

    function resetElements() {
        texts.forEach(t => t.classList.remove('active'));
        svgs.forEach(s => s.classList.remove('active'));
    }

    function showCurrentPair(index) {
        resetElements();
        texts[index].classList.add('active');
        svgs[index].classList.add('active');
    }

    function stopAuto() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        if (restartTimeoutId) {
            clearTimeout(restartTimeoutId);
            restartTimeoutId = null;
        }
    }

    // delay ms 뒤에 자동 재생 시작
    function startAuto(delay = AUTO_INTERVAL) {
        stopAuto();

        restartTimeoutId = setTimeout(() => {
            // 바로 다음 요소부터 시작
            timerId = setInterval(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                showCurrentPair(currentIndex);
            }, AUTO_INTERVAL);
        }, delay);
    }

    // --- 글자 hover ---
    texts.forEach((el, index) => {
        el.addEventListener('mouseenter', () => {
            stopAuto();           // 자동 재생 잠깐 멈춤
            currentIndex = index;
            showCurrentPair(index);
        });

        el.addEventListener('mouseleave', () => {
            // 조금만 기다렸다가 바로 다시 자동 재생
            startAuto(RESTART_DELAY);
        });
    });

    // --- SVG hover (원하면 유지) ---
    svgs.forEach((el, index) => {
        el.addEventListener('mouseenter', () => {
            stopAuto();
            currentIndex = index;
            showCurrentPair(index);
        });

        el.addEventListener('mouseleave', () => {
            startAuto(RESTART_DELAY);
        });
    });

    // 초기 상태 + 자동 재생 시작
    showCurrentPair(0);
    startAuto();   // 처음엔 기본 딜레이
});