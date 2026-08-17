class IncludeHTML extends HTMLElement {
  async connectedCallback() {
    const file = this.getAttribute('src');
    if (file) {
      try {
        const response = await fetch(file);
        if (response.ok) {
          this.innerHTML = await response.text();
        }
      } catch (error) {
        console.error('読み込み失敗:', error);
      }
    }
  }
}
customElements.define('include-html', IncludeHTML);
// 【1】IP取得とGASへのアクセス情報送信処理
(function() {
    fetch('https://api.ipify.org?format=json')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var gasUrl = 'https://script.google.com/macros/s/AKfycbyjeSl9o61YcA6DUdGUlOHaziHfRkrPMNIiC1TmDKo1JdU6G4tGbMADYthqiJiRejUZ/exec';
            var payload = {
                ip: data.ip,
                referrer: document.referrer
            };
            fetch(gasUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })
        .catch(function(err) { console.log(err); });
})();

// 【2】画面読み込み完了後のDOM操作（スライダーと動画制御）
document.addEventListener('DOMContentLoaded', function () {
    
    // スライダー（Swiper）の設定
    const galleryImages = ['S25.webp', 'S26.webp', 'S27.webp', 'S28.webp'];
    const previewThumb = document.getElementById('nextPreviewThumb');
    const previewBox = document.getElementById('nextPreviewBox');

    const gallerySwiper = new Swiper('.gallery-swiper', {
        loop: true, 
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        grabCursor: true,
        on: {
            slideChange: function () {
                const nextIndex = (this.realIndex + 1) % galleryImages.length;
                if(previewThumb) {
                    previewThumb.src = galleryImages[nextIndex];
                }
            }
        }
    });

    if(previewBox) {
        previewBox.addEventListener('click', function () {
            gallerySwiper.slideNext();
        });
    }
    
    // ヘッダー動画の自動再生設定（スマホ等の制限回避）
    const video = document.getElementById("headerVideo");
    if(video) {
        video.muted = true;
        video.playsInline = true;
        
        window.addEventListener("load", () => {
            setTimeout(() => {
                video.play().catch(err => console.log(err));
            }, 300);
        });
    }
});
