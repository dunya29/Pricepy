$(function() {

    /*
     *  Полифил для SVG в IE
     */

    svg4everybody();

	
	
	

	/*
     * Hello world!
     */
    console.log("  ___  __  __ _   _ ___                                               \n / _ \\|  \\/  | \\ | |_ _|__ _  __ _  ___ _ __   ___ _   _   _ __ _   _ \n| | | | |\\/| |  \\| || |/ _` |/ _` |/ _ \\ '_ \\ / __| | | | | '__| | | |\n| |_| | |  | | |\\  || | (_| | (_| |  __/ | | | (__| |_| |_| |  | |_| |\n \\___/|_|  |_|_| \\_|___\\__,_|\\__, |\\___|_| |_|\\___|\\__, (_)_|   \\__,_|\n                             |___/                 |___/              ");


	
    /*
     *  Menu dropdown
     */

    $('.menu .toggle').hover(
        function() {
            $(this).find('.menu__dropdown').slideDown(300);
        },
        function() {
            $(this).find('.menu__dropdown').slideUp(300);
        },
        200);

    /*
     *  City select
     */

    $('.city-select').click(function(e) {
        e.preventDefault();
        $(this).parents('.h-info__item').find('.city').fadeToggle();
    });


    /*
     *  Videofon
     */

    $('#ytbg').youtube_background();



    /*
     *  Mobile menu
     */

    $('.burger').click(function(e) {
        e.preventDefault();
        $('body').toggleClass("noscroll")
        $(this).toggleClass('open');
        $('.navbar__menu').slideToggle();
    });


    /*
     *   Маска телефона
     */

    $('.phone').mask('+7 (999) 999-99-99');

    /*
     *  Card
     */

    $('.card').hover(
        function() {
            if (!$(this).hasClass('open')) {
                $(this).find('.card__hidden').fadeIn(300);
            }
        },
        function() {
            if (!$(this).hasClass('open')) {
                $(this).find('.card__hidden').fadeOut(300);
            }
        },
        200);

    $('.card-price__close').click(function(e) {
        e.preventDefault();
        $(this).parents('.card').removeClass('open').find('.card-price').fadeOut();
    });

    /*
     *  Gallery
     */

    $('.gallery__carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        asNavFor: '.gallery__thumbs',
    });


    $('.gallery__thumbs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        asNavFor: '.gallery__carousel',
        prevArrow: '<button class="prev" type="button"><svg><use href="assets/files/img/icons/sprite.svg#arr-prev"></svg></button>',
        nextArrow: '<button class="next" type="button"><svg><use href="assets/files/img/icons/sprite.svg#arr-next"></svg></button>',
        responsive: [{
            breakpoint: 668,
            settings: {
                slidesToShow: 2
            }
        }]
    });


    /*
     *  Banner 
     */
    var time = 5;
    var $bar,
        $sliderBanner,
        isPause,
        tick,
        percentTime;

    $sliderBanner = $('.banner__carousel');
    $sliderBanner.slick({
        draggable: true,
        adaptiveHeight: false,
        dots: false,
        arrows: false,
        mobileFirst: true,
        pauseOnDotsHover: true,
    });

    $bar = $('.slider-progress .progress');

    $('.banner').on({
        mouseenter: function() {
            isPause = true;

        },
        mouseleave: function() {
            isPause = false;

        }
    })

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $sliderBanner.slick('slickNext');
                startProgressbar();
            }
        }
    }


    function resetProgressbar() {
        $bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }

    startProgressbar();





    /*
     * фансибокс и карусель. идем к правильному индексу.
     */
    $('[data-fancybox="gallery"]').fancybox({
        afterClose: function(instance, current) {
            document.location.reload();
        }
    });


    /*
     *  Вертикальная карусель
     */

    $('.vertical').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical: true,
        verticalSwiping: true,
        focusOnSelect: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                vertical: false,
                centerMode: true
            }
        }]
    });

    /*
     *  Tabs 
     */

    $('.tabs__nav a').click(function(e) {
        e.preventDefault();
        let $this = $(this);
        let link = $this.attr('href');

        $this.parents('li').addClass('active').siblings('li').removeClass('active');
        $(link).addClass('active').fadeIn().siblings('.tabs__tab').removeClass('active').hide();
    });

    /*
     *  Accordion
     */

    $('.accord__title').click(function(e) {
        e.preventDefault();
        $(this).siblings('.accord__content').slideToggle().parents('.accord__item').toggleClass('open').siblings('.accord__item').removeClass('open').find('.accord__content').slideUp();
    });

    /*
     *  Filter
     */

    $('.filter__toggle').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('.filter__row').slideToggle();
    });

    /*
     *  Modal
     */

    $('.js-modal-show').on('click', function() {
        var currentModal = $(this).attr('data-target');
        $(currentModal).fadeIn(500);
        $('body').append('<div class="overlay" id="js-overlay"></div>');
    });

    $('.js-modal-close').on('click', function(e) {
        e.preventDefault();
        $('.js-modal').fadeOut(100);
        $('#js-overlay').remove();
    });

    $('body').on('click', '#js-overlay', function() {
        $('.js-modal').fadeOut(100);
        $('#js-overlay').remove();
    });

    /*
     *  Плавный скрол
     */

    $('.js-anchor').click(function() {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html,body').animate({ scrollTop: destination }, 1100);
        return false;
    });

    /*
     *  фиксированный хедер
     */

    let topHeaderOffset = $('.header').offset().top;

    $(window).scroll(function() {
        let header = $('.header');
        var fromTop = $(window).scrollTop();
        if (fromTop > topHeaderOffset) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
    });

    $('.menu .parent').hover(function() {
        clearTimeout($.data(this, 'timer'));
        $('ul', this).stop(true, true).slideDown(200);
    }, function() {
        $.data(this, 'timer', setTimeout($.proxy(function() {
            $('ul', this).stop(true, true).slideUp(200);
        }, this), 100));
    });



    let url = document.location.href;
    $.each($(".current a"), function() {
        if (this.href == url) {
            $(this).replaceWith(function() {
                return '<a>' + $(this).html() + '</a>';
            });
        }
    });



});