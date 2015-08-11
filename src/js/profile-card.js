$(function () {

    $('#js-video').controls = false;

    function getInstagramPhotos() {
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'vsco東京',
            clientId: 'ba35984961c543dfad202e51873035fb',
            sortBy: 'most-liked',
            resolution: 'low_resolution',
            limit: 10
        });
        feed.run();
    }

    function initializeMap() {

        var stylesArray = [{"stylers":[{"visibility":"simplified"}]},{"stylers":[{"color":"#131314"}]},{"featureType":"water","stylers":[{"color":"#131313"},{"lightness":7}]},{"elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":25}]}];
        function initialize() {
            var mapOptions = {
              center: { lat: 35.1494444, lng: -90.0488889 },
              zoom: 12,
              styles: stylesArray,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            var map = new google.maps.Map(document.getElementById('js-maps'),
                mapOptions);
        }

        google.maps.event.addDomListener(window, 'load', initialize);

    }

    function animateCardsIn() {
        for (var i = 0; i < document.getElementsByClassName('card').length; i += 1) {
            (function (i, card) {
                setTimeout(function () {
                    $(card).addClass('is-card-out');
                }, 1000);
            }(i, document.getElementsByClassName('card')[i]));

            (function (i, card) {
                setTimeout(function () {
                    $(card).removeClass('is-card-out');
                }, 3000);
            }(i, document.getElementsByClassName('card')[i]));
        }
    }

    initializeMap();
    getInstagramPhotos();
    animateCardsIn();

    $(document).on('mouseover', '[data-hover-behavior="expand"]', function (event) {
        var cardClassName = $(this).data('card');
        var $card = $(cardClassName);

        $('.card').each(function () {
            $(this).removeClass('is-card-hover');
        });

        if ($card.hasClass('is-card-out')) {
            $card.removeClass('is-card-hover');
        } else {
            $card.addClass('is-card-hover');
        }

        if ($('.card.stats-card').hasClass('is-card-out') && ! $card.hasClass('is-card-out')) {
            $('.card.stats-card').addClass('is-card-outter');
        }
    });

    $(document).on('mouseleave', '[data-hover-behavior="expand"]', function (event) {
        var cardClassName = $(this).data('card');
        var $card = $(cardClassName);

        $('.card').each(function () {
            $(this).removeClass('is-card-hover');
        });

        if ($('.card.stats-card').hasClass('is-card-out') && ! $card.hasClass('is-card-out')) {
            $('.card.stats-card').removeClass('is-card-outter');
        }
    });

    $(document).on('click', '[data-click-behavior="expand"]', function (event) {
        var cardClassName = $(this).data('card');
        var $card = $(cardClassName);

        $card.addClass('is-card-out');
        $card.removeClass('is-card-hover');
        $('.card.stats-card').removeClass('is-card-outter');
    });

    $(document).on('click', '#instafeed a', function (event) {
        event.preventDefault();

        $('#instafeed a').toggleClass('hidden');

        $(this).removeClass('hidden');
        $(this).toggleClass('clicked');
    });
});