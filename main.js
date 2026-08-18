// =========================================================
// main.js
// =========================================================


// =========================================================
// 1. IP取得 → GASへアクセス情報送信
// =========================================================

(function () {

    fetch('https://api.ipify.org?format=json')

        .then(function (response) {

            if (!response.ok) {
                throw new Error('IPアドレスの取得に失敗しました');
            }

            return response.json();

        })

        .then(function (data) {

            var gasUrl =
                'https://script.google.com/macros/s/AKfycbyjeSl9o61YcA6DUdGUlOHaziHfRkrPMNIiC1TmDKo1JdU6G4tGbMADYthqiJiRejUZ/exec';

            var payload = {

                ip: data.ip,

                referrer: document.referrer

            };


            fetch(gasUrl, {

                method: 'POST',

                mode: 'no-cors',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(payload)

            })
            .catch(function (err) {

                console.log(
                    'アクセス情報の送信に失敗しました:',
                    err
                );

            });

        })

        .catch(function (err) {

            console.log(
                'IPアドレスの取得に失敗しました:',
                err
            );

        });

})();



// =========================================================
// 2. DOM読み込み完了後
// =========================================================

document.addEventListener('DOMContentLoaded', function () {


    // =====================================================
    // NEWS読み込み
    // =====================================================

    const newsContainer =
        document.getElementById('news-container');


    if (newsContainer) {

        fetch('news.html')

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        'news.html の読み込みに失敗しました'
                    );

                }

                return response.text();

            })

            .then(function (html) {

                newsContainer.innerHTML = html;

            })

            .catch(function (error) {

                console.error(
                    'NEWSの読み込みに失敗しました:',
                    error
                );

            });

    }



    // =====================================================
    // Swiper ギャラリー
    // =====================================================

    const galleryImages = [

        'S25.webp',
        'S26.webp',
        'S27.webp',
        'S28.webp'

    ];


    const previewThumb =
        document.getElementById('nextPreviewThumb');


    const previewBox =
        document.getElementById('nextPreviewBox');


    let gallerySwiper = null;


    const galleryElement =
        document.querySelector('.gallery-swiper');


    // Swiperが存在する場合だけ初期化

    if (
        galleryElement &&
        typeof Swiper !== 'undefined'
    ) {

        gallerySwiper = new Swiper(
            '.gallery-swiper',
            {

                loop: true,

                spaceBetween: 10,

                navigation: {

                    nextEl: '.swiper-button-next',

                    prevEl: '.swiper-button-prev'

                },

                grabCursor: true,


                on: {

                    slideChange: function () {

                        const nextIndex =
                            (this.realIndex + 1) %
                            galleryImages.length;


                        if (previewThumb) {

                            previewThumb.src =
                                galleryImages[nextIndex];

                        }

                    }

                }

            }
        );

    }



    // =====================================================
    // NEXTプレビュークリック
    // =====================================================

    if (
        previewBox &&
        gallerySwiper
    ) {

        previewBox.addEventListener(
            'click',
            function () {

                gallerySwiper.slideNext();

            }
        );

    }



    // =====================================================
    // NEXTプレビュー初期画像
    // =====================================================

    if (previewThumb) {

        previewThumb.src = galleryImages[1];

    }



    // =====================================================
    // ヘッダー動画
    // =====================================================

    const video =
        document.getElementById('headerVideo');


    if (video) {

        video.muted = true;

        video.playsInline = true;


        // ページ読み込み完了後に再生

        window.addEventListener(
            'load',
            function () {

                setTimeout(
                    function () {

                        video.play()

                            .catch(function (err) {

                                console.log(
                                    '動画の自動再生がブロックされました:',
                                    err
                                );

                            });

                    },
                    300
                );

            }
        );

    }


});
