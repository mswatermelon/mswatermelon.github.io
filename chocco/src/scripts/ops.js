const sections = $("section");
const display = $(".maincontent");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("section--active");

const performTransition = sectionEq => {
    if (inScroll) {
        return;
    }

    inScroll = true;
    const position = sectionEq * -100;

    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sideMenu = $(".fixed-menu");

    if (menuTheme === "black") {
        sideMenu.addClass("fixed-menu--shadowed");
    } else {
        sideMenu.removeClass("fixed-menu--shadowed");
    }

    display.css({
        transform: `translateY(${position}%)`
    });

    sections.eq(sectionEq).addClass("section--active").siblings().removeClass("section--active");

    setTimeout(() => {
        inScroll = false;
        sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
    }, 1300)
};

const scrollViewPort = direction => {
    const activeSection = sections.filter(".section--active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    if (direction === "next" && nextSection.length) {
        performTransition(nextSection.index());
    }
    if (direction === "prev" && prevSection.length) {
        performTransition(prevSection.index());
    }
};

$(window).on('wheel', (e) => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewPort("next");
    }

    if (deltaY < 0) {
        scrollViewPort("prev");
    }
});

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (e.keyCode) {
            case 38:
                scrollViewPort("prev");
                break;
            case 40:
                scrollViewPort("next");
                break;
        }
    }
});


$(".wrapper").on("touchmove", (e) => {
    e.preventDefault();
});


$("[data-section-to]").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-section-to");
    const reqSection = $(`[data-section-id=${target}`);

    performTransition(reqSection.index());
});

if (isMobile) {
    $("body").swipe( {
        swipe: function(event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction === "up") {
                scrollDirection = "next";
            }
            if (direction === "down") {
                scrollDirection = "prev";
            }

            scrollViewPort(scrollDirection);
        }
    });
}
