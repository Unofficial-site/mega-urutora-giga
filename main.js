/* =========================================================
   main.js
   メガ・ウルトラギガ 非公式ファンサイト
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NEWS HTML 読み込み
       ===================================================== */

    const newsContainer =
        document.getElementById("news-container");


    if (newsContainer) {

        fetch("news.html")

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        `NEWSの読み込みに失敗しました: ${response.status}`
                    );

                }

                return response.text();

            })

            .then(html => {

                newsContainer.innerHTML = html;

            })

            .catch(error => {

                console.error(error);

                newsContainer.innerHTML = `
                    <div class="news-load-error">
                        NEWSを読み込めませんでした。
                    </div>
                `;

            });

    }


    /* =====================================================
       Swiper
       ===================================================== */

    if (
        typeof Swiper !== "undefined" &&
        document.querySelector(".gallery-swiper")
    ) {

        const gallerySwiper =
            new Swiper(".gallery-swiper", {

                loop: true,

                slidesPerView: 1,

                spaceBetween: 0,

                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },

                speed: 500,

                grabCursor: true

            });


        /* ===============================================
           NEXT PREVIEW
           =============================================== */

        const previewBox =
            document.getElementById("nextPreviewBox");


        const previewThumb =
            document.getElementById("nextPreviewThumb");


        if (
            previewBox &&
            previewThumb
        ) {

            const updateNextPreview = () => {
                /*
                 * 重複スライド（duplicate）を除いた
                 * 本来のオリジナルスライド一覧を取得
                 */
                const originalSlides =
                    document.querySelectorAll(
                        ".gallery-swiper .swiper-slide:not(.swiper-slide-duplicate)"
                    );


                if (!originalSlides.length) {
                    return;
                }


                /*
                 * 現在のインデックス（realIndex）に +1 をして
                 * 次の画像のインデックスを計算する
                 */
                const total = originalSlides.length;
                let nextIndex = (gallerySwiper.realIndex + 1) % total;


                /*
                 * 次の画像が入っているスライド要素を取得
                 */
                const nextSlide = originalSlides[nextIndex];


                if (!nextSlide) {
                    return;
                }


                const nextImage =
                    nextSlide.querySelector("img");


                if (!nextImage) {
                    return;
                }


                /*
                 * プレビューサムネイルの画像を次の画像に更新
                 */
                previewThumb.src =
                    nextImage.src;


                previewThumb.alt =
                    "次の画像プレビュー";

            };


            /*
             * 初期化時とスライド変更時にプレビューを更新
             */
            updateNextPreview();


            gallerySwiper.on(
                "slideChange",
                updateNextPreview
            );


            /*
             * NEXTプレビューをクリックしたら
             * 次の画像へ移動
             */

            previewBox.addEventListener(
                "click",
                () => {

                    gallerySwiper.slideNext();

                }
            );

        }

    }


    /* =====================================================
       Header Video
       ===================================================== */

    const headerVideo =
        document.getElementById("headerVideo");


    if (headerVideo) {

        /*
         * autoplay対策
         */

        headerVideo.muted = true;


        const playVideo = () => {

            const promise =
                headerVideo.play();


            if (
                promise &&
                typeof promise.catch === "function"
            ) {

                promise.catch(() => {
                    /*
                     * ブラウザの自動再生制限時は
                     * エラー表示しない
                     */
                });

            }

        };


        /*
         * 読み込み時
         */

        playVideo();


        /*
         * ページ表示後にも再試行
         */

        window.addEventListener(
            "load",
            playVideo
        );

    }


    /* =====================================================
       外部リンク
       ===================================================== */

    /*
     * target="_blank" のリンクについて
     * noopener noreferrer が付いていない場合に追加
     */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            const rel =
                link.getAttribute("rel") || "";


            const relValues =
                new Set(
                    rel
                        .split(/\s+/)
                        .filter(Boolean)
                );


            relValues.add("noopener");

            relValues.add("noreferrer");


            link.setAttribute(
                "rel",
                Array.from(relValues).join(" ")
            );

        });

});
