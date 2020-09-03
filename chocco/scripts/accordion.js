const tabs = document.querySelectorAll('.types__item');
const mesureWidth = (item) => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".types__list");
    const titleBlocks = $(container).find(".types__item-title");
    const titleWidth = titleBlocks.width() * titleBlocks.length;

    const textContainer = $(item).find("p");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titleWidth;
    } else {
        reqItemWidth = 524;
    }


    return  {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }
};

Array.from(tabs).map((tab) => {
    tab.addEventListener('click', function ($event) {

        document.querySelectorAll('.types__item-description').forEach((item) => {
            if (item.parentElement.querySelector('.types__item-title').textContent !== $event.target.textContent) {
                item.classList.remove('types__item-description--active');
            }
        });

        let parentElement,
            descriptionElement;

        if ($event.target.tagName === "DIV") {
            parentElement = $event.target.parentElement;
        }

        if ($event.target.tagName === 'SPAN') {
            parentElement = $event.target.parentElement.parentElement;
        }

        descriptionElement = parentElement.querySelector('.types__item-description');
        if (descriptionElement.classList.contains('types__item-description--active')) {
            descriptionElement.classList.remove('types__item-description--active');
        } else {
            let requiredWidth = mesureWidth(descriptionElement);
            const textBlock = $(descriptionElement).find('p');

            descriptionElement.classList.add('types__item-description--active');

            $(descriptionElement).width(requiredWidth.container);
            textBlock.width(requiredWidth.textContainer);
        }
    });
});
