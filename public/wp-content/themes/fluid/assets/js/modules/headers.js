(function($) {
    "use strict";

    var header = {};
    edgtf.modules.header = header;

    header.isStickyVisible = false;
    header.stickyAppearAmount = 0;
    header.behaviour = '';

    header.edgtfOnDocumentReady = edgtfOnDocumentReady;
    header.edgtfOnWindowLoad = edgtfOnWindowLoad;
    header.edgtfOnWindowResize = edgtfOnWindowResize;
    header.edgtfOnWindowScroll = edgtfOnWindowScroll;

    $(document).ready(edgtfOnDocumentReady);
    $(window).load(edgtfOnWindowLoad);
    $(window).resize(edgtfOnWindowResize);
    $(window).scroll(edgtfOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function edgtfOnDocumentReady() {
        edgtfHeaderBehaviour();
        edgtfSideArea();
        edgtfSideAreaScroll();
        edgtfFullscreenMenu();
        edgtfInitMobileNavigation();
        edgtfMobileHeaderBehavior();
        edgtfSetDropDownMenuPosition();
        edgtfDropDownMenu();    
        edgtfSearch();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function edgtfOnWindowLoad() {
        edgtfSetDropDownMenuPosition();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function edgtfOnWindowResize() {
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function edgtfOnWindowScroll() {
        
    }

    /*
     **	Show/Hide sticky header on window scroll
     */
    function edgtfHeaderBehaviour() {

        var header = $('.edgtf-page-header'),
	        stickyHeader = $('.edgtf-sticky-header'),
            fixedHeaderWrapper = $('.edgtf-fixed-wrapper'),
	        menuAreaHeight = fixedHeaderWrapper.children('.edgtf-menu-area').outerHeight();
        
        var revSliderHeight =  0;
        if ($('.edgtf-slider').length) {
            revSliderHeight = $('.edgtf-slider').outerHeight();
        }

        var headerMenuAreaOffset = $('.edgtf-page-header').find('.edgtf-fixed-wrapper').length ? $('.edgtf-page-header').find('.edgtf-fixed-wrapper').offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar : 0;
		
        var stickyAppearAmount;
        var headerAppear;

        switch(true) {
            // sticky header that will be shown when user scrolls up
            case edgtf.body.hasClass('edgtf-sticky-header-on-scroll-up'):
                edgtf.modules.header.behaviour = 'edgtf-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) + parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfStickyHeaderHeight);
	            
                headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();

                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        edgtf.modules.header.isStickyVisible= false;
                        stickyHeader.removeClass('header-appear').find('.edgtf-main-menu .second').removeClass('edgtf-drop-down-start');
                    }else {
                        edgtf.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case edgtf.body.hasClass('edgtf-sticky-header-on-scroll-down-up'):
                edgtf.modules.header.behaviour = 'edgtf-sticky-header-on-scroll-down-up';

                if(edgtfPerPageVars.vars.edgtfStickyScrollAmount !== 0){
                    edgtf.modules.header.stickyAppearAmount = parseInt(edgtfPerPageVars.vars.edgtfStickyScrollAmount);
                } else {
                    edgtf.modules.header.stickyAppearAmount = parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) + parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) + revSliderHeight;
                }

                headerAppear = function(){
                    if(edgtf.scroll < edgtf.modules.header.stickyAppearAmount) {
                        edgtf.modules.header.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.edgtf-main-menu .second').removeClass('edgtf-drop-down-start');
                    }else{
                        edgtf.modules.header.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case edgtf.body.hasClass('edgtf-fixed-on-scroll'):
                edgtf.modules.header.behaviour = 'edgtf-fixed-on-scroll';
                var headerFixed = function(){

                    if(edgtf.scroll <= headerMenuAreaOffset) {
                        fixedHeaderWrapper.removeClass('fixed');
	                    fixedHeaderWrapper.children('.edgtf-menu-area').css({'height': menuAreaHeight});
                        header.css('margin-bottom', '0');
                    } else {
                        fixedHeaderWrapper.addClass('fixed');
	                    fixedHeaderWrapper.children('.edgtf-menu-area').css({'height': (menuAreaHeight - 20) + 'px'});
	                    header.css('margin-bottom', (menuAreaHeight - 20) + 'px');
                    }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

    /**
     * Show/hide side area
     */
    function edgtfSideArea() {

        var wrapper = $('.edgtf-wrapper'),
            sideMenuButtonOpen = $('a.edgtf-side-menu-button-opener'),
            cssClass = 'edgtf-right-side-menu-opened';

        wrapper.prepend('<div class="edgtf-cover"/>');

        $('a.edgtf-side-menu-button-opener, a.edgtf-close-side-menu').click( function(e) {
            e.preventDefault();

            if(!sideMenuButtonOpen.hasClass('opened')) {

                sideMenuButtonOpen.addClass('opened');
                edgtf.body.addClass(cssClass);

                $('.edgtf-wrapper .edgtf-cover').click(function() {
                    edgtf.body.removeClass('edgtf-right-side-menu-opened');
                    sideMenuButtonOpen.removeClass('opened');
                });

                var currentScroll = $(window).scrollTop();
                $(window).scroll(function() {
                    if(Math.abs(edgtf.scroll - currentScroll) > 400){
                        edgtf.body.removeClass(cssClass);
                        sideMenuButtonOpen.removeClass('opened');
                    }
                });
            } else {
                sideMenuButtonOpen.removeClass('opened');
                edgtf.body.removeClass(cssClass);
            }
        });
    }

    /*
    **  Smooth scroll functionality for Side Area
    */
    function edgtfSideAreaScroll(){

        var sideMenu = $('.edgtf-side-menu');

        if(sideMenu.length){    
            sideMenu.niceScroll({ 
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0, 
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false, 
                horizrailenabled: false 
            });
        }
    }

    /**
     * Init Fullscreen Menu
     */
    function edgtfFullscreenMenu() {

        if ($('a.edgtf-fullscreen-menu-opener').length) {

            var popupMenuOpener = $( 'a.edgtf-fullscreen-menu-opener'),
                popupMenuHolderOuter = $(".edgtf-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.edgtf-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.edgtf-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.edgtf-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.edgtf-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.edgtf-fullscreen-menu ul li:not(.has_sub) a');


            //set height of popup holder and initialize nicescroll
            popupMenuHolderOuter.height(edgtf.windowHeight).niceScroll({
                scrollspeed: 30,
                mousescrollstep: 20,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            }); //200 is top and bottom padding of holder

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(edgtf.windowHeight);
            });

            if (edgtf.body.hasClass('edgtf-fade-push-text-right')) {
                cssClass = 'edgtf-push-nav-right';
                fadeRight = true;
            } else if (edgtf.body.hasClass('edgtf-fade-push-text-top')) {
                cssClass = 'edgtf-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 'ms',
                        'animation-delay': (i+1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('edgtf-fm-opened')) {
                    popupMenuOpener.addClass('edgtf-fm-opened');
                    edgtf.body.addClass('edgtf-fullscreen-menu-opened');
                    edgtf.body.removeClass('edgtf-fullscreen-fade-out').addClass('edgtf-fullscreen-fade-in');
                    edgtf.body.removeClass(cssClass);
                    if(!edgtf.body.hasClass('page-template-full_screen-php')){
                        edgtf.modules.common.edgtfDisableScroll();
                    }
                    $(document).keyup(function(e){
                        if (e.keyCode == 27 ) {
                            popupMenuOpener.removeClass('edgtf-fm-opened');
                            edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                            edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                            edgtf.body.addClass(cssClass);
                            if(!edgtf.body.hasClass('page-template-full_screen-php')){
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                            $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                                $('nav.popup_menu').getNiceScroll().resize();
                            });
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('edgtf-fm-opened');
                    edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                    edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                    edgtf.body.addClass(cssClass);
                    if(!edgtf.body.hasClass('page-template-full_screen-php')){
                        edgtf.modules.common.edgtfEnableScroll();
                    }
                    $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                        $('nav.popup_menu').getNiceScroll().resize();
                    });
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                var thisItem = $(this),
	                thisItemParent = thisItem.parent();

                if (thisItemParent.hasClass('has_sub')) {
                    var submenu = thisItemParent.find('> ul.sub_menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuint', function() {
                            popupMenuHolderOuter.getNiceScroll().resize();
                        });
	                    thisItemParent.removeClass('open_sub');
                    } else if($('.open_sub').length <= 0) {
	                    popupMenuHolderOuter.getNiceScroll().resize();

	                    submenu.slideDown(400, 'easeInOutQuint', function() {
		                    popupMenuHolderOuter.getNiceScroll().resize();
	                    });
                    } else {
	                    thisItemParent.addClass('open_sub');
	                    thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
		                    popupMenuHolderOuter.getNiceScroll().resize();

		                    submenu.slideDown(400, 'easeInOutQuint', function() {
			                    popupMenuHolderOuter.getNiceScroll().resize();
		                    });
	                    });
                    }
                }
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.click(function (e) {

                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){

                    if (e.which == 1) {
                        popupMenuOpener.removeClass('edgtf-fm-opened');
                        edgtf.body.removeClass('edgtf-fullscreen-menu-opened');
                        edgtf.body.removeClass('edgtf-fullscreen-fade-in').addClass('edgtf-fullscreen-fade-out');
                        edgtf.body.addClass(cssClass);
                        $("nav.edgtf-fullscreen-menu ul.sub_menu").slideUp(200, function(){
                            $('nav.popup_menu').getNiceScroll().resize();
                        });
                        edgtf.modules.common.edgtfEnableScroll();
                    }
                }else{
                    return false;
                }
            });
        }
    }

    function edgtfInitMobileNavigation() {
        var navigationOpener = $('.edgtf-mobile-header .edgtf-mobile-menu-opener');
        var navigationHolder = $('.edgtf-mobile-header .edgtf-mobile-nav');
        var dropdownOpener = $('.edgtf-mobile-nav .mobile_arrow, .edgtf-mobile-nav h6, .edgtf-mobile-nav a.edgtf-mobile-no-link');
        var animationSpeed = 200;

        //whole mobile menu opening / closing
        if(navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                if(navigationHolder.is(':visible')) {
                    navigationHolder.slideUp(animationSpeed);
                } else {
                    navigationHolder.slideDown(animationSpeed);
                }
            });
        }

        //dropdown opening / closing
        if(dropdownOpener.length) {
            dropdownOpener.each(function() {
                $(this).on('tap click', function(e) {
                    var dropdownToOpen = $(this).nextAll('ul').first();

                    if(dropdownToOpen.length) {
                        e.preventDefault();
                        e.stopPropagation();

                        var openerParent = $(this).parent('li');
                        if(dropdownToOpen.is(':visible')) {
                            dropdownToOpen.slideUp(animationSpeed);
                            openerParent.removeClass('edgtf-opened');
                        } else {
                            dropdownToOpen.slideDown(animationSpeed);
                            openerParent.addClass('edgtf-opened');
                        }
                    }

                });
            });
        }

        $('.edgtf-mobile-nav a, .edgtf-mobile-logo-wrapper a').on('click tap', function(e) {
            if($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                navigationHolder.slideUp(animationSpeed);
            }
        });
    }

    function edgtfMobileHeaderBehavior() {
        if(edgtf.body.hasClass('edgtf-sticky-up-mobile-header')) {
            var stickyAppearAmount,
                mobileHeader = $('.edgtf-mobile-header'),
                mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
                adminBar     = $('#wpadminbar');

            var docYScroll1 = $(document).scrollTop();
            stickyAppearAmount = mobileHeaderHeight + edgtfGlobalVars.vars.edgtfAddForAdminBar;

            $(window).scroll(function() {
                var docYScroll2 = $(document).scrollTop();

                if(docYScroll2 > stickyAppearAmount) {
                    mobileHeader.addClass('edgtf-animate-mobile-header');
                } else {
                    mobileHeader.removeClass('edgtf-animate-mobile-header');
                }

                if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                    mobileHeader.removeClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', 0);

                    if(adminBar.length) {
                        mobileHeader.find('.edgtf-mobile-header-inner').css('top', 0);
                    }
                } else {
                    mobileHeader.addClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', stickyAppearAmount);
                }

                docYScroll1 = $(document).scrollTop();
            });
        }
    }

    /**
     * Set dropdown position
     */
    function edgtfSetDropDownMenuPosition(){

        var menuItems = $(".edgtf-drop-down > ul > li.narrow");
        menuItems.each( function(i) {

            var browserWidth = edgtf.windowWidth-16; // 16 is width of scroll bar
            var menuItemPosition = $(this).offset().left;
            var dropdownMenuWidth = $(this).find('.second .inner ul').width();

            var menuItemFromLeft = 0;
            if(edgtf.body.hasClass('edgtf-boxed')){
                menuItemFromLeft = edgtf.boxedLayoutWidth  - (menuItemPosition - (browserWidth - edgtf.boxedLayoutWidth )/2);
            } else {
                menuItemFromLeft = browserWidth - menuItemPosition;
            }

            var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

            if($(this).find('li.sub').length > 0){
                dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
            }

            if(menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth){
                $(this).find('.second').addClass('right');
                $(this).find('.second .inner ul').addClass('right');
            }
        });
    }

    function edgtfDropDownMenu() {

        var menu_items = $('.edgtf-drop-down > ul > li');

        menu_items.each(function(i) {
            if($(menu_items[i]).find('.second').length > 0) {

                var dropDownSecondDiv = $(menu_items[i]).find('.second');

                if($(menu_items[i]).hasClass('wide')) {
                    
                    if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                        dropDownSecondDiv.css('left', 0);
                    }

                    //set columns to be same height - start
                    var tallest = 0;
                    $(this).find('.second > .inner > ul > li').each(function() {
                        var thisHeight = $(this).height();
                        if(thisHeight > tallest) {
                            tallest = thisHeight;
                        }
                    });

                    $(this).find('.second > .inner > ul > li').css("height", ""); // delete old inline css - via resize
                    $(this).find('.second > .inner > ul > li').height(tallest);
                    //set columns to be same height - end

                    var left_position;

                    if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                        left_position = dropDownSecondDiv.offset().left;

                        dropDownSecondDiv.css('left', -left_position);
                        dropDownSecondDiv.css('width', edgtf.windowWidth);
                    }
                }

                if(!edgtf.menuDropdownHeightSet) {
                    $(menu_items[i]).data('original_height', dropDownSecondDiv.height() + 'px');
                    dropDownSecondDiv.height(0);
                }

                if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    $(menu_items[i]).on("touchstart mouseenter", function() {
                        dropDownSecondDiv.css({
                            'height': $(menu_items[i]).data('original_height'),
                            'overflow': 'visible',
                            'visibility': 'visible',
                            'opacity': '1'
                        });
                    }).on("mouseleave", function() {
                        dropDownSecondDiv.css({
                            'height': '0px',
                            'overflow': 'hidden',
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    });

                } else {
                    if(edgtf.body.hasClass('edgtf-dropdown-animate-height')) {
                        $(menu_items[i]).mouseenter(function() {
                            dropDownSecondDiv.css({
                                'visibility': 'visible',
                                'height': '0px',
                                'opacity': '0'
                            });
                            dropDownSecondDiv.stop().animate({
                                'height': $(menu_items[i]).data('original_height'),
                                opacity: 1
                            }, 300, function() {
                                dropDownSecondDiv.css('overflow', 'visible');
                            });
                        }).mouseleave(function() {
                            dropDownSecondDiv.stop().animate({
                                'height': '0px'
                            }, 150, function() {
                                dropDownSecondDiv.css({
                                    'overflow': 'hidden',
                                    'visibility': 'hidden'
                                });
                            });
                        });
                    } else {
                        var config = {
                            interval: 0,
                            over: function() {
                                setTimeout(function() {
                                    dropDownSecondDiv.addClass('edgtf-drop-down-start');
                                    dropDownSecondDiv.stop().css({'height': $(menu_items[i]).data('original_height')});
                                }, 150);
                            },
                            timeout: 150,
                            out: function() {
                                dropDownSecondDiv.stop().css({'height': '0px'});
                                dropDownSecondDiv.removeClass('edgtf-drop-down-start');
                            }
                        };
                        $(menu_items[i]).hoverIntent(config);
                    }
                }
            }
        });
         $('.edgtf-drop-down ul li.wide ul li a').on('click', function(e) {
            if (e.which == 1){
                var $this = $(this);
                setTimeout(function() {
                    $this.mouseleave();
                }, 500);
            }
        });

        edgtf.menuDropdownHeightSet = true;
    }

    /**
     * Init Search Types
     */
    function edgtfSearch() {

        var searchOpener = $('a.edgtf-search-opener'),
            searchForm,
            searchClose,
            touch = false;

        if ( $('html').hasClass( 'touch' ) ) {
            touch = true;
        }

        if ( searchOpener.length > 0 ) {
            //Check for type of search
            if ( edgtf.body.hasClass( 'edgtf-fullscreen-search' ) ) {

                var fullscreenSearchFade;

                searchClose = $( '.edgtf-fullscreen-search-close' );
                fullscreenSearchFade = true;
                edgtfFullscreenSearch( fullscreenSearchFade);

            } else if ( edgtf.body.hasClass( 'edgtf-slide-from-header-bottom' ) ) {

                edgtfSearchSlideFromHeaderBottom();

            } else if ( edgtf.body.hasClass( 'edgtf-search-covers-header' ) ) {

                edgtfSearchCoversHeader();

            } else if ( edgtf.body.hasClass( 'edgtf-search-slides-from-window-top' ) ) {

                searchForm = $('.edgtf-search-slide-window-top');
                searchClose = $('.edgtf-search-close');
                edgtfSearchWindowTop();
            }
        }

        /**
         * Search slides from window top type of search
         */
        function edgtfSearchWindowTop() {

            searchOpener.click( function(e) {
                e.preventDefault();

                var yPos = 0;
                if($('.title').hasClass('has_parallax_background')){
                    yPos = parseInt($('.title.has_parallax_background').css('backgroundPosition').split(" ")[1]);
                }

                if ( searchForm.height() == "0") {
                    $('.edgtf-search-slide-window-top input[type="text"]').focus();
                    //Push header bottom
                    edgtf.body.addClass('edgtf-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos + 50)+'px'
                    }, 150);
                } else {
                    edgtf.body.removeClass('edgtf-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos - 50)+'px'
                    }, 150);
                }

                $(window).scroll(function() {
                    if ( searchForm.height() != '0' && edgtf.scroll > 50 ) {
                        edgtf.body.removeClass('edgtf-search-open');
                        $('.title.has_parallax_background').css('backgroundPosition', 'center '+(yPos)+'px');
                    }
                });

                searchClose.click(function(e){
                    e.preventDefault();
                    edgtf.body.removeClass('edgtf-search-open');
                    $('.title.has_parallax_background').animate({
                        'background-position-y': (yPos)+'px'
                    }, 150);
                });

            });
        }

        /**
         * Search covers header type of search
         */
        function edgtfSearchCoversHeader() {

            searchOpener.click(function (e) {
                e.preventDefault();
                var searchFormHeight,
	                adjsSearchFormHeight = 0,
                    searchFormHolder = $('.edgtf-search-cover .edgtf-form-holder-outer'),
                    searchForm,
                    searchFormLandmark; // there is one more div element if header is in grid

                if ($(this).closest('.edgtf-grid').length) {
                    searchForm = $(this).closest('.edgtf-grid').parent().children().first();
                    searchFormLandmark = searchForm;
                }
                else {
                    searchForm = $(this).closest('.edgtf-menu-area').children().first();
                    searchFormLandmark = searchForm;
                }

                if ($(this).closest('.edgtf-sticky-header').length > 0) {
                    searchForm = $(this).closest('.edgtf-sticky-header').children().first();
                    searchFormLandmark = searchForm;
                }
                if ($(this).closest('.edgtf-mobile-header').length > 0) {
                    searchForm = $(this).closest('.edgtf-mobile-header').children().children().first();
                    searchFormLandmark = searchForm.parent();
                }

                //Find search form position in header and height
                if (searchFormLandmark.parent().hasClass('edgtf-logo-area')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfLogoAreaHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-top-bar')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfTopBarHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-menu-area')) {
	                if(edgtf.body.find('.edgtf-top-bar').length) {
		                adjsSearchFormHeight = edgtfGlobalVars.vars.edgtfTopBarHeight;
	                }
                    searchFormHeight = edgtfGlobalVars.vars.edgtfMenuAreaHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-sticky-header')) {
                    searchFormHeight = edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight;
                } else if (searchFormLandmark.parent().hasClass('edgtf-mobile-header')) {
	                if(edgtf.body.find('.edgtf-top-bar').length) {
		                adjsSearchFormHeight = edgtfGlobalVars.vars.edgtfTopBarHeight;
	                }
                    searchFormHeight = $('.edgtf-mobile-header-inner').height();
                }

	            if(edgtf.body.hasClass('edgtf-header-elegant')) {
		            adjsSearchFormHeight += 46; // 46 is top padding of header
	            }

	            searchFormHeight = searchFormHeight - adjsSearchFormHeight;

                searchFormHolder.height(searchFormHeight);
                searchForm.stop(true).fadeIn(600);
                $('.edgtf-search-cover input[type="text"]').focus();
                $('.edgtf-search-close, .edgtf-content, footer').click(function (e) {
                    e.preventDefault();
                    searchForm.stop(true).fadeOut(450);
                });
                searchForm.blur(function () {
                    searchForm.stop(true).fadeOut(450);
                });
            });

        }

        /**
         * Search slide from header bottom type of search
         */
        function edgtfSearchSlideFromHeaderBottom() {
	
	        searchOpener.click( function(e) {
		        e.preventDefault();
		
		        var thisItem = $(this),
			        searchIconPosition = parseInt(edgtf.windowWidth - thisItem.offset().left - thisItem.outerWidth());

		        if(edgtf.body.hasClass('edgtf-boxed') && edgtf.windowWidth > 1024) {
			        searchIconPosition -= parseInt((edgtf.windowWidth - $('.edgtf-boxed .edgtf-wrapper .edgtf-wrapper-inner').outerWidth()) / 2);
		        }
		
		        if(!edgtf.body.hasClass('edgtf-search-opened')){
			        edgtf.body.addClass('edgtf-search-opened');
			        if(thisItem.parents('.edgtf-fixed-wrapper').length) {
				        thisItem.parents('.edgtf-fixed-wrapper').find('.edgtf-slide-from-header-bottom-holder').css('right', searchIconPosition).slideToggle(300, 'easeOutBack');
			        } else if (thisItem.parents('.edgtf-sticky-header.header-appear').length) {
				        thisItem.parents('.edgtf-sticky-header.header-appear').find('.edgtf-slide-from-header-bottom-holder').css('right', searchIconPosition).slideToggle(300, 'easeOutBack');
			        } else if(thisItem.parents('.edgtf-logo-area').length) {
				        thisItem.parents('.edgtf-page-header').find('.edgtf-slide-from-header-bottom-holder').css('right', searchIconPosition).slideToggle(300, 'easeOutBack');
			        } else if (thisItem.parents('.edgtf-page-header').children('.edgtf-slide-from-header-bottom-holder').length) {
				        thisItem.parents('.edgtf-page-header').children('.edgtf-slide-from-header-bottom-holder').css('right', searchIconPosition).slideToggle(300, 'easeOutBack');
			        } else if (thisItem.parents('.edgtf-mobile-header').length) {
				        thisItem.parents('.edgtf-mobile-header').find('.edgtf-slide-from-header-bottom-holder').css('right', searchIconPosition).slideToggle(300, 'easeOutBack');
			        }
			        setTimeout(function(){
				        $('.edgtf-slide-from-header-bottom-holder input').focus();
			        },400);
		        } else {
			        edgtf.body.removeClass('edgtf-search-opened');
			        
			        if (thisItem.parents('.edgtf-page-header').length) {
				        thisItem.parents('.edgtf-page-header').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        } else if (thisItem.parents('.edgtf-mobile-header').length) {
				        thisItem.parents('.edgtf-mobile-header').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        }
		        }
	        });
	
	        //Close on escape
	        $(document).keyup(function(e){
		        if (e.keyCode == 27 ) { //KeyCode for ESC button is 27
			        edgtf.body.removeClass('edgtf-search-opened');
			        if(searchOpener.parents('.edgtf-fixed-wrapper').length) {
				        searchOpener.parents('.edgtf-fixed-wrapper').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        } else if (searchOpener.parents('.edgtf-sticky-header.header-appear').length) {
				        searchOpener.parents('.edgtf-sticky-header.header-appear').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        } else if(searchOpener.parents('.edgtf-logo-area').length) {
				        searchOpener.parents('.edgtf-page-header').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        } else if (searchOpener.parents('.edgtf-page-header').children('.edgtf-slide-from-header-bottom-holder').length) {
				        searchOpener.parents('.edgtf-page-header').children('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        } else if (searchOpener.parents('.edgtf-mobile-header').length) {
				        searchOpener.parents('.edgtf-mobile-header').find('.edgtf-slide-from-header-bottom-holder').fadeOut(0);
			        }
		        }
	        });
        }

        /**
         * Fullscreen search fade
         */
        function edgtfFullscreenSearch( fade) {

            var searchHolder = $( '.edgtf-fullscreen-search-holder');

            searchOpener.click( function(e) {
                e.preventDefault();
                var samePosition = false,
                    closeTop = 0,
                    closeLeft = 0;
                if ( $(this).data('icon-close-same-position') === 'yes' ) {
                    closeTop = $(this).find('.edgtf-search-opener-wrapper').offset().top;
                    closeLeft = $(this).offset().left;
                    samePosition = true;
                }
                //Fullscreen search fade
                if ( fade ) {
                    if ( searchHolder.hasClass( 'edgtf-animate' ) ) {
                        edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                        edgtf.body.addClass( 'edgtf-search-fade-out' );
                        edgtf.body.removeClass( 'edgtf-search-fade-in' );
                        searchHolder.removeClass( 'edgtf-animate' );
                        setTimeout(function(){
                            searchHolder.find('.edgtf-search-field').val('');
                            searchHolder.find('.edgtf-search-field').blur();
                        },300);
                        if(!edgtf.body.hasClass('page-template-full_screen-php')){
                            edgtf.modules.common.edgtfEnableScroll();
                        }
                    } else {
                        edgtf.body.addClass('edgtf-fullscreen-search-opened');
                        setTimeout(function(){
                            searchHolder.find('.edgtf-search-field').focus();
                        },900);
                        edgtf.body.removeClass('edgtf-search-fade-out');
                        edgtf.body.addClass('edgtf-search-fade-in');
                        searchHolder.addClass('edgtf-animate');
                        if (samePosition) {
                            searchClose.css({
                                'top' : closeTop - edgtf.scroll,
                                'left' : closeLeft
                            });
                        }
                        if(!edgtf.body.hasClass('page-template-full_screen-php')){
                            edgtf.modules.common.edgtfDisableScroll();
                        }
                    }
                    searchClose.click( function(e) {
                        e.preventDefault();
                        edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                        searchHolder.removeClass('edgtf-animate');
                        setTimeout(function(){
                            searchHolder.find('.edgtf-search-field').val('');
                            searchHolder.find('.edgtf-search-field').blur();
                        },300);
                        edgtf.body.removeClass('edgtf-search-fade-in');
                        edgtf.body.addClass('edgtf-search-fade-out');
                        if(!edgtf.body.hasClass('page-template-full_screen-php')){
                            edgtf.modules.common.edgtfEnableScroll();
                        }
                    });

                    //Close on click away
                    $(document).mouseup(function (e) {
                        var container = $(".edgtf-form-holder-inner");
                        if (!container.is(e.target) && container.has(e.target).length === 0)  {
                            e.preventDefault();
                            edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                            searchHolder.removeClass('edgtf-animate');
                            setTimeout(function(){
                                searchHolder.find('.edgtf-search-field').val('');
                                searchHolder.find('.edgtf-search-field').blur();
                            },300);
                            edgtf.body.removeClass('edgtf-search-fade-in');
                            edgtf.body.addClass('edgtf-search-fade-out');
                            if(!edgtf.body.hasClass('page-template-full_screen-php')){
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                        }
                    });

                    //Close on escape
                    $(document).keyup(function(e){
                        if (e.keyCode == 27 ) { //KeyCode for ESC button is 27
                            edgtf.body.removeClass('edgtf-fullscreen-search-opened');
                            searchHolder.removeClass('edgtf-animate');
                            setTimeout(function(){
                                searchHolder.find('.edgtf-search-field').val('');
                                searchHolder.find('.edgtf-search-field').blur();
                            },300);
                            edgtf.body.removeClass('edgtf-search-fade-in');
                            edgtf.body.addClass('edgtf-search-fade-out');
                            if(!edgtf.body.hasClass('page-template-full_screen-php')){
                                edgtf.modules.common.edgtfEnableScroll();
                            }
                        }
                    });
                }
            });

            //Text input focus change
            $('.edgtf-fullscreen-search-holder .edgtf-search-field').focus(function(){
                $('.edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line').css("width","100%");
            });

            $('.edgtf-fullscreen-search-holder .edgtf-search-field').blur(function(){
                $('.edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line').css("width","0");
            });
        }
    }

})(jQuery);