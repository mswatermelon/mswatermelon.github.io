const tabs = document.querySelectorAll('.types__item');

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
        descriptionElement.classList.contains('types__item-description--active') ?
            descriptionElement.classList.remove('types__item-description--active') :
            descriptionElement.classList.add('types__item-description--active');
    });
});
