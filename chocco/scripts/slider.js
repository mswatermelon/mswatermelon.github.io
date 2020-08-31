const slider = $(".slider__list").bxSlider({
    pager: false,
    controls: false
});

$('.slider__left').click((e) => {
    e.preventDefault();
    slider.goToPreventSlide();
});
$('.slider__right').click((e) => {
    e.preventDefault();
    slider.goToNextSlide();
});
