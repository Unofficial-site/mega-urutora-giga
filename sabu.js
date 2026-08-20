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
       HISTORY ITEM取得
       ===================================================== */

    const historyItems =
        Array.from(
            historyList.querySelectorAll(
                ".history-item"
            )
        );


    if (!historyItems.length) {
        return;
    }


    /* =====================================================
       日付順に並び替え
       
       新しいもの
       ↓
       古いもの
       
       2026
       2025
       2024
       ...
       ===================================================== */

    historyItems.sort((a, b) => {


        const yearA =
            Number(
                a.dataset.year
            ) || 0;


        const monthA =
            Number(
                a.dataset.month
            ) || 0;


        const dayA =
            Number(
                a.dataset.day
            ) || 0;


        const yearB =
            Number(
                b.dataset.year
            ) || 0;


        const monthB =
            Number(
                b.dataset.month
            ) || 0;


        const dayB =
            Number(
                b.dataset.day
            ) || 0;


        /* 年 */

        if (yearA !== yearB) {

            return yearB - yearA;

        }


        /* 月 */

        if (monthA !== monthB) {

            return monthB - monthA;

        }


        /* 日 */

        return dayB - dayA;

    });


    /* =====================================================
       並び替えたものをHTMLへ戻す
       ===================================================== */

    historyItems.forEach(item => {

        historyList.appendChild(item);

    });


    /* =====================================================
       年の判別

       年自体は画面には表示しません。

       ただし各記事に

       data-year="2026"

       があるので、JavaScript側では
       何年の記事なのか判別できます。
       ===================================================== */

    let currentYear = null;


    historyItems.forEach(item => {


        const year =
            item.dataset.year;


        if (!year) {
            return;
        }


        /*

           例えば

           2026
           2026
           2026
           2025
           2025
           2024

           のように並んでいることを確認。

        */


        if (currentYear === null) {

            currentYear = year;

        }


        /*
         * 年が変わった場合
         */

        if (currentYear !== year) {

            currentYear = year;

        }

    });


    /* =====================================================
       外部リンク対策
       ===================================================== */

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
