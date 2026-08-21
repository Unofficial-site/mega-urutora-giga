/* =========================================================
   sabu.js
   HISTORY / 活動歴ページ
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HISTORY
       ===================================================== */

    const historyList =
        document.getElementById("historyList");

    if (!historyList) {
        return;
    }


    /* =====================================================
       年ごとのブロックを取得
       ===================================================== */

    const historyYears =
        Array.from(
            historyList.querySelectorAll(".history-year")
        );


    /* =====================================================
       年ごとに処理
       ===================================================== */

    historyYears.forEach(yearBlock => {

        const items =
            Array.from(
                yearBlock.querySelectorAll(".history-item")
            );


        if (!items.length) {
            return;
        }


        /* =================================================
           日付順に並び替え

           新しい
           ↓
           古い
           ================================================= */

        items.sort((a, b) => {

            const monthA =
                Number(a.dataset.month) || 0;

            const dayA =
                Number(a.dataset.day) || 0;

            const monthB =
                Number(b.dataset.month) || 0;

            const dayB =
                Number(b.dataset.day) || 0;


            /* 月 */

            if (monthA !== monthB) {
                return monthB - monthA;
            }


            /* 日 */

            return dayB - dayA;

        });


        /* =================================================
           並び替えた記事を
           「その年の中」に戻す
           ================================================= */

        items.forEach(item => {

            yearBlock.appendChild(item);

        });

    });


    /* =====================================================
       年ブロック自体も新しい順に並べる
       ===================================================== */

    historyYears.sort((a, b) => {

        const yearA =
            Number(a.dataset.year) || 0;

        const yearB =
            Number(b.dataset.year) || 0;

        return yearB - yearA;

    });


    historyYears.forEach(yearBlock => {

        historyList.appendChild(yearBlock);

    });


    /* =====================================================
       外部リンク対策
       ===================================================== */

    document
        .querySelectorAll('a[target="_blank"]')
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
