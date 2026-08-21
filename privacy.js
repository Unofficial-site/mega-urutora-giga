/* =========================================================
   privacy.js
   GUIDELINE / PRIVACY PAGE
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==================================================
           Fade In
           ================================================== */

        const sections =
            document.querySelectorAll(
                ".privacy-section"
            );


        sections.forEach(
            function (section, index) {

                const delay =
                    100 + (index * 120);


                setTimeout(
                    function () {

                        section.style.transition =
                            "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";

                        section.style.opacity =
                            "1";

                        section.style.transform =
                            "translateY(0)";

                    },
                    delay
                );

            }
        );


        /* ==================================================
           Reduced Motion
           ================================================== */

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            sections.forEach(
                function (section) {

                    section.style.transition =
                        "none";

                    section.style.opacity =
                        "1";

                    section.style.transform =
                        "none";

                }
            );

        }

    }
);
