// =========================================================
// main.js
// メガ・ウルトラギガ 非公式ファンサイト
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

            return fetch(gasUrl, {

                method: 'POST',

                mode: 'no-cors',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(payload)

            });

        })

        .catch(function (error) {

            console.log(
                'アクセス情報の送信に失敗しました:',
                error
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

    var newsContainer =
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

    var galleryImages = [

        'S25.webp',
        'S26.webp',
        'S27.webp',
        'S28.webp'

    ];


    var previewThumb =
        document.getElementById('nextPreviewThumb');


    var previewBox =
        document.getElementById('nextPreviewBox');


    var galleryElement =
        document.querySelector('.gallery-swiper');


    var gallerySwiper = null;


    /*
     * ギャラリーが存在し、
     * Swiper.jsが正常に読み込まれている場合のみ初期化
     */

    if (
        galleryElement &&
        typeof Swiper !== 'undefined'
    ) {

        gallerySwiper = new Swiper(
            '.gallery-swiper',
            {

                loop: true,

                spaceBetween: 10,

                grabCursor: true,


                navigation: {

                    nextEl: '.swiper-button-next',

                    prevEl: '.swiper-button-prev'

                },


                on: {

                    init: function () {

                        /*
                         * 初期表示時にも
                         * NEXT画像を正しく設定
                         */

                        updateNextPreview(this);

                    },


                    slideChange: function () {

                        /*
                         * スライド変更時に
                         * NEXTプレビューを更新
                         */

                        updateNextPreview(this);

                    }

                }

            }
        );

    }


    // =====================================================
    // NEXTプレビュー更新
    // =====================================================

    function updateNextPreview(swiper) {

        if (!previewThumb) {
            return;
        }


        var nextIndex =
            (swiper.realIndex + 1) %
            galleryImages.length;


        previewThumb.src =
            galleryImages[nextIndex];


        /*
         * 念のためaltも更新
         */

        previewThumb.alt =
            '次の画像プレビュー';


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
    // ヘッダー動画
    // =====================================================

    var video =
        document.getElementById('headerVideo');


    if (video) {


        /*
         * 自動再生対策
         */

        video.muted = true;

        video.playsInline = true;


        /*
         * ページ読み込み完了後に再生
         */

        window.addEventListener(
            'load',
            function () {

                setTimeout(
                    function () {

                        video.play()

                            .catch(function (error) {

                                console.log(
                                    '動画の自動再生がブロックされました:',
                                    error
                                );

                            });

                    },
                    300
                );

            }
        );


        /*
         * 一部ブラウザで
         * 読み込み時に再生できなかった場合の保険
         */

        video.addEventListener(
            'canplay',
            function () {

                if (video.paused) {

                    video.play()

                        .catch(function () {

                            /*
                             * 自動再生が許可されていない場合は
                             * 何もしない
                             */

                        });

                }

            }
        );

    }

});
