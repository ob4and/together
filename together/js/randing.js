// 숫자 카운터
let isCounting = false; // 지금 카운팅 중인지 체크

function countUp(elementId, startValue, endValue, duration) {
  const el = document.getElementById(elementId);
  const fmt = new Intl.NumberFormat();
  let startTs = null;
  let lastValue = startValue - 1;

  isCounting = true; // 시작할 때 true로

  function frame(ts) {
    if (!startTs) startTs = ts;
    const t = Math.min((ts - startTs) / duration, 1);
    const value = Math.floor(startValue + (endValue - startValue) * t);

    if (value !== lastValue) {
      el.textContent = fmt.format(value);

      // 펄스 효과 (원하면 간격 조절)
      if (value % 20 === 0 || value === endValue) {
        el.classList.remove('pulse');
        // reflow로 애니메이션 재시작
        el.offsetWidth; 
        el.classList.add('pulse');
      }

      lastValue = value;
    }

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      isCounting = false; // 끝났으면 다시 실행 가능
    }
  }

  requestAnimationFrame(frame);
}

/* 화면에 50% 이상 보일 때마다 시작 (위→아래, 아래→위 둘 다) */
const target = document.getElementById('counter');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isCounting) {
      // 보일 때마다 리셋해서 다시 카운트 시작
      countUp('counter', 2001828, 2001928, 2000);
    }
  });
}, { threshold: 0.5 });

io.observe(target);
  


// 앱 목업
  document.addEventListener('DOMContentLoaded', () => {
    const textGroups = document.querySelectorAll('.text-group2');
    const imgBoxes = document.querySelectorAll('.img-box');
  
    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Array.from(textGroups).indexOf(entry.target);
  
        if (index !== -1) {
          const imgBox = imgBoxes[index];
  
          if (entry.isIntersecting) {
            imgBox.classList.add('show');
          } else {
            imgBox.classList.remove('show');
          }
        }
      });
    }, {
      threshold: 0.5 // text-group2가 뷰포트에 50% 이상 보일 때 감지
    });
  
    // 각 text-group2 요소를 옵저버에 등록
    textGroups.forEach((textGroup) => observer.observe(textGroup));
  });