const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach((field) => {
        field.removeClass("form__input--error");

        if (field.val().trim() === "") {
            field.addClass("form__input--error")
        }
    });

    const errorFields = form.find (".form__input--error");

    return errorFields.length === 0;
};

$(".form").submit((e) => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='contactName']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $('#modal');
    const content = modal.find(".modal__content");

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
        let request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            }
        });


        modal.removeClass("modal--error");

        request.done((data) => {
            content.text(data.message);
        });

        request.fail((data) => {
            const message = data.responseJSON.message;

            content.text(message);
            modal.addClass("modal--error");
        });

        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            })
        });
    }
});

$(".app-submit-btn").click((e) => {
    e.preventDefault();

    $.fancybox.close();
});
