"use strict";

var category = {
    init: function () {
        $('.category')
            .on('click', '.js-buy-product', this.buyProduct.bind(this))
            .on('click', '.js-add-to-wishlist', this.addToWishlist.bind(this));
    },

    addToWishlist: function (event) {
        event.preventDefault();
        var url = $(event.currentTarget).attr('href');

        this.sendRequest(url).done(function () {
            // Сообщение покажется, потому что триггернулось событие message:show,
            // а здесь мы дополнительно меняем текст на кнопке:
            $(event.currentTarget)
                .removeClass('btn-default')
                .text('Добавлен в список пожеланий');
        });
    },

    buyProduct: function (event) {
        var url = $(event.currentTarget).attr('href');

        this.sendRequest(url)
            .done(function (message) {
                // Сообщение покажется, потому что триггернулось событие message:show,
                // а здесь можно как-то дополнительно обработать успешный запрос.
            });

        event.preventDefault();
    },

    sendRequest: function (url) {
        var promise = new $.Deferred();

        $.ajax({
            'url': url,
            dataType: 'json'
        }).done(function (response) {
            if (response.status == 'success') {
                // Триггерим сообщение
                $(document).triggerHandler('message:show', {
                    message: response.message,
                    type: 'success'
                });

                // Резолвим промис на случай, если помимо показа сообщения нужно сделать еще что-то
                // (заменить текст на кнопке "Добавить в вишлист")
                promise.resolve(response.message);
            } else if (response.status == 'error') {
                $(document).triggerHandler('message:show', {
                    message: response.message,
                    type: 'danger'
                });

                promise.fail();
            }
        }).fail(function (error) {
            console.log(error);
        }).always(function () {
            $.fancybox.hideLoading();
        });

        return promise;
    },

    sendStatistics: function (id) {
        return $.ajax({
            url: 'buy.php?product=' + id
        });
    }
};

category.init();

function showMessage(event, data) {
    var $el = $('<div/>', {
        class: "alert alert-" + data.type,
        css: {
            display: 'none',
            position: 'fixed',
            top: 20,
            left: 20,
            right: 20
        },
        html: data.message
    });

    $el.appendTo('body').slideDown('fast');

    // Скрываем сообщение через 3 секунды:
    $.wait(3000).done(function () {
        $el.slideUp();
    });
}

$(document)
    .on('ajaxStart', function () {
        $.fancybox.showLoading();
    })
    .on('ajaxStop', function () {
        $.fancybox.hideLoading();
    })
    .on('message:show', showMessage);

// Создаем свой таймаут, чтобы скрывать сообщения через заданное время
// $ === jQuery. Это и функция и оъект. Мы можем вызывать и $('div'), и $.each и добавлять свои методы, как этот:
$.wait = function (time) {
    var promise = new $.Deferred();

    setTimeout(function () {
        promise.resolve();
    }, time);

    return promise;
};


