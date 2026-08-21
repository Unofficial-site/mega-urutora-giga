/* =========================================================
   sabu.js
   HISTORY / 活動歴ページ
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) {
        return;
    }


    /* =====================================================
       年ごとに日付順に並び替え
       
       新しいもの
       ↓
       古いもの
       ===================================================== */

    const historyYears =
        Array.from(
            historyList.querySelectorAll(".history-year")
        );


    historyYears.forEach(yearBlock => {

        const historyItems =
            Array.from(
                yearBlock.querySelectorAll(".history-item")
            );


        historyItems.sort((a, b) => {

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
           その年の中へ戻す
           
           history-end は触らない
           ================================================= */

        historyItems.forEach(item => {

            yearBlock.appendChild(item);

        });

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
