$(function () {

    document.getElementById('js-video').controls = false;
    var map;

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

    function createWaves() {
        var stats = document.getElementsByClassName('stats--wave');
        var i, waves, data, stat;

        for ( i = 0; i < stats.length; i += 1) {
            stat = stats[i];
            data = $(stat).data();

            waves = new SineWaves({
              // Canvas Element
              el: stat.children[0],

              // General speed of entire wave system
              speed: data.speed,

              // How many degress should we rotate all of the waves
              rotate: 0,

              // Ease function from left to right
              ease: data.ease,

              // Specific how much the width of the canvas the waves should be
              // This can either be a number or a percent
              waveWidth: '100%',

              // An array of wave options
              waves: [
                {
                  timeModifier: data.timeModifier,   // This is multiplied againse `speed`
                  lineWidth: 3,      // Stroke width
                  amplitude: 20,    // How tall is the wave
                  wavelength: data.waveLength,   // How long is the wave
                  segmentLength: data.segmentLength, // How smooth should the line be
                  strokeStyle: 'rgba(58, 96, 218, 0.5)', // Stroke color and opacity
                  type: data.waveType       // Wave type
                }
              ],

              // Perform any additional initializations here
              initialize: function (){},

              // This function is called whenver the window is resized
              resizeEvent: function() {

                // Here is an example on how to create a gradient stroke
                var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
                gradient.addColorStop(0, data.color);
                gradient.addColorStop(0.5, data.color);
                gradient.addColorStop(1, data.color);

                var index = -1;
                var length = this.waves.length;
                  while(++index < length){
                  this.waves[index].strokeStyle = gradient;
                }
              }
            });

        }
    }

    /* Extending the jQuery object, to animate a card based on it's classname. */
    $.fn.animateCard = function () {
        $(this).toggleClass('is-card-out');
    };

    /* Returns the card element associated with the button. */
    function getAssociatedCard(button) {
        var classList = button.className.split(/\s+/);
        var i, parts;

        for ( i = 0; i < classList.length; i += 1 ) {

            if (~classList[i].indexOf('js-')) {

                parts = classList[i].split('-');
                parts[parts.length - 1] = 'card';

                return document.getElementsByClassName(parts.join('-'));

            }
        }
    }

    function animateCardsIn() {
        for (var i = 0; i < document.getElementsByClassName('card').length; i += 1) {
            (function (i, card) {
                setTimeout(function () {
                    $(card).click();
                }, 1000 * i);
            }(i, document.getElementsByClassName('card')[i]));
        }
    }

    $('.card').on('click', function () {
        $(this).animateCard();
    });

    initializeMap();
    createWaves();
    animateCardsIn();
});