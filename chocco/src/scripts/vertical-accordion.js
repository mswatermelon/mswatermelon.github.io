const openItem = ((item) => {
    const container = item.closest(".about-team__item");
    const contentBlock = container.find(".about-team__description");
    const textBlock = contentBlock.find(".about-team__description-container");
    const reqHeight = textBlock.height();

    container.addClass("about-team__item--active");
    contentBlock.height(reqHeight);
});

const closeEveryItem = (container)=> {
    const items = container.find(".about-team__description");
    const itemContainer = container.find(".about-team__item");

    itemContainer.removeClass("about-team__item--active");

    items.height(0);
};

$('.about-team__title').click((e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".about-team__list");
    const elemContainer = $this.closest(".about-team__item");

    closeEveryItem(container);

    if (!elemContainer.hasClass("active")) {
        openItem($this);
    }
});
