"use strict";

var category = {
    init: function () {
        $('.category')
            .on('click', '.js-buy-product', this.buyProduct.bind(this))
            .on('click', '.js-add-to-wishlist', this.addToWishlist.bind(this));
    },

    buyProduct: function (event) {
        event.preventDefault();

        var url = $(event.currentTarget).attr('href');

        var promise = this.sendRequest(url);
        promise.done(function (response) {
            if (response.status == 'success') {
                $.fancybox({
                    content: response.message
                });
            } else {
                alert(response.message);
            }
        });
    },

    addToWishlist: function (event) {
        event.preventDefault();

        var url = $(event.currentTarget).attr('href');

        var promise = this.sendRequest(url);
        promise.done(function (response) {
            if (response.status == 'success') {
                $(event.currentTarget)
                    .removeClass('btn-default')
                    .text('Добавлен в список пожеланий');
            } else {
                console.log(response);
                alert(response.message);
            }
        });

    },

    sendRequest: function (url) {
        return $.ajax({
            'url': url,
            dataType: 'json',
            beforeSend: function () {
                $.fancybox.showLoading();
            }
        }).done(function (response) {
            // вернулся промис с данными
        }).fail(function (error) {
            alert('Извините, произошла ошибка');
        }).always(function () {
            $.fancybox.hideLoading();
        });
    }

    // Вариант с созданием собственного промиса:
    // sendRequest: function (url) {
    //     var promise = new $.Deferred();
    //
    //     $.ajax({
    //         'url': url,
    //         dataType: 'json',
    //         beforeSend: function () {
    //             $.fancybox.showLoading();
    //         }
    //     }).done(function (response) {
    //         if (response.status == 'success') {
    //             promise.resolve(response.message);
    //         } else if (response.status == 'error') {
    //             alert(response.message);
    //             promise.fail();
    //         }
    //     }).fail(function (error) {
    //         console.log(error);
    //     }).always(function () {
    //         $.fancybox.hideLoading();
    //     });
    //
    //     return promise;
    // }

};

category.init();
