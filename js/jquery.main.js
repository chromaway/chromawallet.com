$(function(){

    var menuBtn = $('.show-mobile-menu'),
        menu = $('.site__menu'),
        page = new Page(),
        menuShow = new MenuShow(menuBtn,menu);
} );
var Page = function(){
    this.items = $('.site__page');
    this.window = $(window);
    this.minHeight = 600;
    this.contents = $('.site__center');
    this.timer = setTimeout(function(){}, 0);
    this.timer2 = setTimeout(function(){}, 0);
    this.scroll = false;
    this.scrollMouse = false;
    this.menu = $('.site__menu');
    this.windowWidth = $(window).width();
    this.videoBtn =  $('.video-call');
    this.pageContents =  $('.site__content');
    this.videoContainer =  $('.videoBlock');
    this.nextPageBtn = $('.down-btn');
    this.prevPageBtn = $('.up-btn');
    this.menuLnk = $( '.main-menu a' );
    this.videoCloseBtn =  $('.videoBlock__close');
    this.activeIndex = 0;
    this.action = false;
    this.activePage = $('.site__page.active');
    this.animationArrDown = [
        2100, 1100, 2800, 1400, 1100
    ];


    this.init();
};
    Page.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function(){
            var self = this;

            return {
                build: function(){
                    self.core.setSize();
                    self.core.controls();
                    self.core.startPage();
                    self.core.resize();
                },
                setSize: function (){
                    self.contents.each(function(){
                        var curItem = $( this );

                        curItem.height( '100%' );

                        var newH = curItem.parents( '.site__page' ).height();

                        if ( newH < self.minHeight ){
                            newH=self.minHeight;
                        }

                        curItem.height( newH );
                    })
                },
                startPage: function(){

                    self.downBtn = $('.down-btn');
                    self.bigLogo = $('.logo');


                    self.activePage.fadeIn(500, function(){
                        self.downBtn.fadeIn(700);

                    });

                },
                downToPage1: function(){
                    var pageContentCur = self.items.eq( 0 ),
                        pageContentNext = self.items.eq( 1 ),
                        textBlock = pageContentNext.find('.colored-text'),
                        videoBlokc = pageContentNext.find('.colored-video'),
                        textShow = pageContentNext.find('.colored-text__show'),
                        windW = 0;


                    self.bigLogo.animate( {
                        top: -self.bigLogo.height()
                    }, {
                        easing: 'easeInOutQuad',
                        duration: 500,
                        complete: function(){
                            pageContentCur.find( '.down-btn').fadeOut( 300, function(){
                                pageContentCur.removeClass( 'active' );
                                pageContentNext.addClass( 'active' );
                                pageContentCur.scrollTop( 0 );

                                windW = pageContentNext.find( '.site__content' ).width();

                                textBlock.css({
                                    left: -windW/2
                                });

                                videoBlokc.css({
                                    right: -windW/2
                                });

                                self.menu.animate({
                                    top: 0
                                }, {
                                    duration: 300,
                                    easing: 'easeOutQuad',
                                    complete: function(){
                                        videoBlokc.animate({
                                            right: 0
                                        }, {
                                            duration: 500,
                                            easing: 'easeOutQuad'
                                        } );
                                        textBlock.animate({
                                            left: 0
                                        },{
                                            complete: function(){
                                                    textShow.fadeTo(500, 1);
                                                    self.action = false;
                                            },
                                            duration: 500,
                                            easing: 'easeOutQuad'
                                        });
                                    }
                                });


                            } );
                        }
                    } );
                },
                downToPage2: function(){

                    var pageContentCur = self.items.eq( 1 ),
                        pageContentNext = self.items.eq( 2 ),
                        textBlock = pageContentCur.find('.colored-text'),
                        textShow = pageContentCur.find('.colored-text__show'),
                        firstBlock = pageContentNext.find('.instruction-back'),
                        secondBlock = pageContentNext.find('.about-text__wrap'),
                        windW = pageContentCur.find( '.site__content' ).width();

                    $( 'body' ).css( {
                        background: '#2d333d'
                    } );
                    textShow.fadeTo( 300, 0, function(){
                        textBlock.animate( {
                            left: windW/2
                        }, {
                            duration: 500,
                            easing: 'easeInOutQuad',
                            complete: function(){
                                pageContentCur.removeClass( 'active' );
                                pageContentNext.addClass( 'active' );
                                pageContentCur.scrollTop( 0 );

                                firstBlock.css( { display: 'none' } );
                                secondBlock.css( { display: 'none' } );

                                firstBlock.fadeIn( 300 );
                                secondBlock.fadeIn( 300, function (){
                                    self.action = false;
                                } );
                            }
                        } );
                    } );
                },
                downToPage3: function(){
                    var pageContentCur = self.items.eq( 2 ),
                        pageContentNext = self.items.eq( 3 ),
                        firstBlock = pageContentNext.find('.instruction-back'),
                        secondBlock = pageContentNext.find('.about-text'),
                        squeres = pageContentNext.find('.squeres'),
                        pageText = pageContentNext.find('.download-page__text'),
                        items = pageContentNext.find('.download-page__text li');

                    pageContentNext.addClass( 'active' );
                    pageContentNext.css( { top: self.window.height() } );
                    pageContentCur.css( { height: self.window.height() - 115 } );
                    pageContentNext.css( { height: self.window.height() - 115 } );
                    squeres.css( { display: 'none' } );
                    pageText.css( { display: 'none' } );
                    items.css( { opacity: 0 } );

                    pageContentCur.animate( {
                        top: -(self.window.height()-( 115 * 2 ) )
                    },{
                        duration: 500,
                        easing: 'easeInOutQuad'
                    } );
                    pageContentNext.animate( {
                        top: 115
                    },{
                        easing: 'easeInOutQuad',
                        duration: 500,
                        complete: function(){
                            pageContentCur.removeClass( 'active' );
                            pageContentCur.removeAttr( 'style' );
                            pageContentCur.scrollTop( 0 );
                            pageContentNext.removeAttr( 'style' );

                            squeres.fadeIn( 500, function(){
                                pageText.fadeIn( 300, function(){
                                    items.each( function( i ){
                                        showItems( $( this ), i );
                                    } );
                                } );
                            } );
                        }
                    } );

                    function showItems( item, i ){
                        item.css( { top: 50} );
                        setTimeout( function(){
                            item.animate({
                                top: 0,
                                opacity: 1
                            },{
                                specialEasing: {
                                    top: 'easeOutBounce',
                                    opacity: 'easeInOutQuad'
                                },
                                duration: 500,
                                complete: function(){
                                    $( this ).removeAttr( 'style' );
                                    self.action = false;
                                }
                            } );
                        }, i * 300 );
                    }
                },
                downToPage4: function(){

                    var pageContentCur = self.items.eq( 3 ),
                        pageContentNext = self.items.eq( 4 ),
                        squeres = pageContentCur.find('.squeres'),
                        pageText = pageContentCur.find('.download-page__text h2,.download-page__text p'),
                        items = pageContentCur.find('.download-page__text');

                    $( 'body' ).css( { background: '#353c4c' } );
                    pageContentNext.css( { background: '#353c4c' } );

                    pageText.fadeTo( 300, 0, function(){
                        squeres.fadeOut( 300 );
                        items.animate( {
                            top: -107
                        }, {
                            duration: 500,
                            easing: 'easeInOutQuad',
                            complete: function(){
                                pageContentCur.removeClass( 'active' );
                                pageContentCur.removeAttr( 'style' );
                                pageContentNext.addClass( 'active' );


                                pageContentNext.addClass( 'active-shtorka' );

                                setTimeout( function(){
                                    pageContentCur.scrollTop(0);
                                    self.action = false;
                                }, 600 );
                            }
                        } );
                    } );

                },
                downToPage5: function(){

                    var pageContentCur = self.items.eq( 4 ),
                        pageContentNext = self.items.eq( 5 ),
                        backImg = pageContentNext.find('.contacts__back'),
                        conatctsText = pageContentNext.find('.contacts > div:first-child');

                    $( 'body' ).css( { background: '#d05f6b' } );

                    pageContentNext.find( 'site__content' ).css( { position: 'static' } );

                    pageContentNext.addClass( 'active' );
                    pageContentNext.css( { top: self.window.height() } );
                    pageContentCur.css( { height: self.window.height() - 115 } );
                    pageContentNext.css( { height: self.window.height() - 115 } );
                    backImg.css( { display: 'none' } );
                    conatctsText.css( { opacity: 0 } );

                    pageContentCur.animate( {
                        top: -(self.window.height()-( 115 * 2 ) )
                    },{
                        duration: 500,
                        easing: 'easeInOutQuad'
                    } );
                    pageContentNext.animate( {
                        top: 115
                    },{
                        easing: 'easeInOutQuad',
                        duration: 500,
                        complete: function(){
                            pageContentNext.removeAttr( 'style' );
                            pageContentCur.removeClass( 'active' );
                            pageContentCur.removeAttr( 'style' );

                            pageContentCur.css( { background: '#353c4c' } );
                            backImg.fadeIn( 300, function(){
                                conatctsText.fadeTo( 300, 1, function(){
                                    self.action = false;
                                } );
                            } );
                        }
                    } );
                },
                moveUp: function (newIndex){},
                moveDown: function(newIndex){
                    var total = 0;
                    console.log(self.activeIndex,newIndex)

                    for( i = self.activeIndex; i != newIndex; i++ ){
                        toNextPage (total);
                        total += self.animationArrDown[ i ] + 100
                    }

                    function toNextPage (duration){
                        setTimeout( function(){
                            console.log(duration)
                            self.core.nextPage();
                        },duration );
                    }
                },
                resize: function(){
                    var curContent;

                    self.pageContents.each( function(i){
                        curContent = $( this );
                        if( i == 1 ){
                            var firstBlock = curContent.find( '.colored-text' ),
                                secondBlock = curContent.find( '.colored-video'),
                                newH = 0;

                            firstBlock.height( 'auto' );
                            secondBlock.height( 'auto' );

                            if( firstBlock.outerHeight() > secondBlock.outerHeight() ){
                                newH = firstBlock.outerHeight();
                            } else {
                                newH = secondBlock.outerHeight();
                            }

                            if( newH <  ( self.window.height() - 115 ) ) {
                                newH = ( self.window.height() - 115 );
                            }

                            firstBlock.outerHeight(newH);
                            secondBlock.outerHeight(newH);
                        } else if( i == 2 ){
                            var firstBlock = curContent.find( '.instruction-back' ),
                                firstBlockTable = curContent.find( '.instruction-back__tabel'),
                                firstBlockTableCell = curContent.find( '.instruction-back__tabel-cell'),
                                secondBlock = curContent.find( '.about-text'),
                                newH = 0;

                            firstBlock.height( 'auto' );
                            secondBlock.height( 'auto' );

                            if( firstBlock.outerHeight() > secondBlock.outerHeight() ){
                                newH = firstBlock.outerHeight();
                                firstBlockTable.outerHeight(newH);
                                firstBlockTableCell.outerHeight(newH);
                            } else {
                                newH = secondBlock.outerHeight();
                            }

                            if( newH <  ( self.window.height() - 115 ) ) {
                                newH = ( self.window.height() - 115 );
                            }

                            firstBlock.outerHeight(newH);
                            firstBlockTable.outerHeight(newH);
                            firstBlockTableCell.outerHeight(newH);
                            secondBlock.outerHeight(newH);
                        } else if( i == 3 ){
                            var firstBlock = curContent.find( '.download-page' ),
                                newH = 659;

                            firstBlock.height( newH );

                            if( newH <  ( self.window.height() - 115 ) ) {
                                newH = ( self.window.height() - 115 );
                            }

                            firstBlock.outerHeight(newH);

                        } else if( i == 4 ){
                            var firstBlock = curContent.find( '.resources' ),
                                newH = 652;

                            if( newH <  ( self.window.height() - 115 ) ) {
                                newH = ( self.window.height() - 115 );
                            }

                            curContent.outerHeight(newH);
                            curContent.css( {
                                overflow: 'hidden',
                                position: 'relative'
                            } );
                        } else if( i == 5 ){
                            var newH = 500;

                            if( newH <  ( self.window.height() - 115 ) ) {
                                newH = ( self.window.height() - 115 );
                            }

                            curContent.outerHeight(newH);
                        }
                    } );
                },
                upToPage0: function(){

                    var pageContentCur = self.items.eq( 0 ),
                        pageContentNext = self.items.eq( 1 ),
                        textBlock = pageContentNext.find('.colored-text'),
                        videoBlokc = pageContentNext.find('.colored-video'),
                        textShow = pageContentNext.find('.colored-text__show'),
                        windW = pageContentNext.find( '.site__content' ).width();

                    textShow.fadeTo(500, 0, function(){
                        videoBlokc.animate({
                            right: -windW/2
                        }, {
                            duration: 500,
                            easing: 'easeOutQuad'
                        } );

                        self.menu.animate({
                            top: -115
                        }, {
                            duration: 300,
                            easing: 'easeOutQuad'
                        } );

                        textBlock.animate({
                            left: -windW/2
                        },{
                            complete: function(){
                                pageContentCur.addClass( 'active' );
                                pageContentNext.removeClass( 'active' );

                                self.bigLogo.animate( {
                                        top: '50%'
                                    }, {
                                        easing: 'easeInOutQuad',
                                        duration: 500,
                                    complete: function(){
                                        self.action = false;
                                    }
                                });
                                pageContentCur.find( '.down-btn').fadeIn( 500 );
                            },
                            duration: 500,
                            easing: 'easeOutQuad'
                        });
                    });
                },
                upToPage1: function(){

                    var pageContentCur = self.items.eq( 1 ),
                        pageContentNext = self.items.eq( 2 ),
                        textBlock = pageContentCur.find('.colored-text'),
                        textShow = pageContentCur.find('.colored-text__show'),
                        firstBlock = pageContentNext.find('.instruction-back'),
                        secondBlock = pageContentNext.find('.about-text__wrap');

                    firstBlock.fadeOut( 300 );
                    secondBlock.fadeOut( 300, function(){
                        pageContentCur.addClass( 'active' );
                        pageContentNext.removeClass( 'active' );

                        firstBlock.css( { display: 'block' } );
                        secondBlock.css( { display: 'block' } );

                        textBlock.animate( {
                                left: 0
                            }, {
                                duration: 500,
                                easing: 'easeInOutQuad',
                                complete: function(){
                                    textShow.fadeTo( 300, 1, function(){
                                        $( 'body' ).css( {
                                            background: '#fff'
                                        } );
                                        self.action = false;
                                    } );
                                }
                        });
                    } );

//                    $( 'body' ).css( {
//                        background: '#2d333d'
//                    } );
//                    textShow.fadeTo( 300, 0, function(){
//                        textBlock.animate( {
//                            left: windW/2
//                        }, {
//                            duration: 500,
//                            easing: 'easeInOutQuad',
//                            complete: function(){
//                                pageContentCur.removeClass( 'active' );
//                                pageContentNext.addClass( 'active' );
//
//                                firstBlock.css( { display: 'none' } );
//                                secondBlock.css( { display: 'none' } );
//
//                                firstBlock.fadeIn( 300 );
//                                secondBlock.fadeIn( 300, function (){
//                                    self.action = false;
//                                } );
//                            }
//                        } );
//                    } );
                },
                upToPage2: function(){
                    var pageContentCur = self.items.eq( 2 ),
                        pageContentNext = self.items.eq( 3 ),
                        firstBlock = pageContentNext.find('.instruction-back'),
                        secondBlock = pageContentNext.find('.about-text'),
                        squeres = pageContentNext.find('.squeres'),
                        pageText = pageContentNext.find('.download-page__text');

                    pageText.fadeOut( 300 );
                    squeres.fadeOut( 300, function(){
                        pageContentCur.addClass('active');
                        pageContentCur.css( {
                            height: self.window.height() - 115,
                            top: -(self.window.height()-( 115 * 2 ) )
                        } );

                        pageContentNext.animate( {
                            top: '100%'
                        }, {
                            duration: 500,
                            easing: 'easeInOutQuad'
                        } );
                        pageContentCur.animate( {
                            top: 115
                        }, {
                            duration: 500,
                            easing: 'easeInOutQuad',
                            complete: function(){
                                pageContentNext.removeAttr( 'style' );
                                pageContentNext.removeClass( 'active' );
                                pageContentCur.removeAttr( 'style' );
                                self.action = false;
                            }
                        } );
                    } );



                },
                upToPage3: function(){

                    var pageContentCur = self.items.eq( 3 ),
                        pageContentNext = self.items.eq( 4 ),
                        squeres = pageContentCur.find('.squeres'),
                        pageText = pageContentCur.find('.download-page__text h2,.download-page__text p'),
                        items = pageContentCur.find('.download-page__text');

                    pageContentNext.removeClass( 'active-shtorka' );

                    setTimeout( function(){
                        pageContentCur.addClass( 'active' );
                        pageContentNext.removeClass( 'active' );

                        squeres.fadeIn( 300, function(){
                            items.animate( {
                                top: '50%'
                            }, {
                                duration: 500,
                                easing: 'easeInOutQuad',
                                complete: function() {
                                    pageText.fadeTo( 300, 1, function(){
                                        $( 'body' ).css( { background: '#fff' } );
                                        self.action = false;
                                    } )
                                }
                            } );
                        } );

                    }, 500 );

                },
                upToPage4:function(){

                    var pageContentCur = self.items.eq( 4 ),
                        pageContentNext = self.items.eq( 5 ),
                        backImg = pageContentNext.find('.contacts__back'),
                        conatctsText = pageContentNext.find('.contacts > div:first-child');

                    pageContentCur.css( { background: '#353c4c' } );

                    conatctsText.fadeTo( 300,0, function(){
                        backImg.fadeOut( 300, function(){
                            pageContentCur.addClass('active');
                            pageContentCur.css( {
                                height: self.window.height() - 115,
                                top: -(self.window.height()-( 115 * 2 ) )
                            } );

                            pageContentNext.animate( {
                                top: '100%'
                            }, {
                                duration: 500,
                                easing: 'easeInOutQuad'
                            } );
                            pageContentCur.animate( {
                                top: 115
                            }, {
                                duration: 500,
                                easing: 'easeInOutQuad',
                                complete: function(){
                                    pageContentNext.removeAttr( 'style' );
                                    pageContentNext.removeClass( 'active' );
                                    pageContentCur.removeAttr( 'style' );

                                    $( 'body' ).css( { background: '#353c4c' } );
                                    pageContentCur.css( { background: '#353c4c' } );

                                    self.action = false;
                                }
                            } );
                        } );
                    } );
                },
                controls: function(){

                    self.videoBtn.on('click', function(){

                        var curElem = $(this);

                        self.core.videOpen(curElem)

                        return false;

                    });

                    self.prevPageBtn.on('click', function(){

                        self.core.prevPage();

                        return false;

                    });

                    self.nextPageBtn.on('click', function(){

                        self.core.nextPage();

                        return false;

                    });

                    self.menuLnk.on( {
                        'click': function(){
                            var curItem = $( this );

                            self.menuLnk.removeClass( 'active' );

                            curItem.addClass('active');

                            self.core.moveDown( self.menuLnk.index( curItem ) + 2 );
                        }
                    } );

                    $('body').on( {
                        keydown: function(e){
                            self.core.videoHide(e);
                        },
                        mousemove : function(e){
                            var x = e.pageX;

                            $( '.contacts__back' ).css({
                                'left': -500 - ( (x-self.windowWidth)*0.03 )
                            });

                            var curW = self.window.width(),
                                deg = (( ( ( x - curW / 2 ) / ( curW / 2 ) ) * 30 ) * Math.PI)/180,
                                degCos = Math.cos(deg),
                                degSin = Math.sin(deg);

                            $( '.squeres' ).find('>div').css({
                                transform: 'matrix3d(' + degCos + ', 0, ' + degSin + ', 0, 0, 1, 0, 0, ' + degSin + ', 0, ' + degCos + ', 0, 0, 0, 0, 1)'
                            });
                        }
                    } );

                    self.videoCloseBtn.on('click', function(){


                        var curElem = $(this);

                        self.core.videoHide(curElem);

                    });

                    self.window.on({
                        'resize':function(){
                            self.core.setSize();
                            self.core.resize();
                        },
                        'DOMMouseScroll':function( e ){
                            clearTimeout(self.timer2);

                            self.scrollMouse = true;

                            self.timer2=setTimeout(function(){

                                if( !self.scroll ) {
                                    var direction = ( e.originalEvent.detail > 0 ) ? -1 : 1;
                                    if(direction==1){
                                        self.core.prevPage();
                                    }else{
                                        self.core.nextPage();
                                    }
                                }

                                self.scroll = false;
                            },50);

                        },
                        'mousewheel': function( e ){

                            clearTimeout(self.timer2);

                            self.scrollMouse = true;

                            self.timer2=setTimeout(function(){

                                if( !self.scroll ) {
                                    var direction = ( e.originalEvent.wheelDelta > 0 ) ? 1 : -1;
                                    if(direction<0){
                                        self.core.nextPage();
                                    }else{
                                        self.core.prevPage() ;
                                    }
                                }

                                self.scroll = false;
                            },50);


                        }
                    });

                    self.items.on({
                        'scroll':function( e ){
                            if( self.scrollMouse ) {
                                self.scroll = true;
                            }
                            self.scrollMouse = false;
                            clearTimeout(self.timer2);
                        }
                    });
                },
                videOpen: function(curElem){


                    self.videoContainer.children().attr('src', curElem.attr('href'));

                    setTimeout(function(){

                        self.videoContainer.fadeIn();


                    },300)


                },
                videoHide: function(e){

                    if(e.which == 27){

                        self.videoContainer.fadeOut(300);
                        self.videoContainer.children().attr('src','');

                    }
                    else{
                        self.videoContainer.fadeOut(300);
                        self.videoContainer.children().attr('src','');
                    }

                },
                menuActive: function(elem){

                    if(elem == 2){
                        self.menuLnk.removeClass('active');

                    }
                    else{
                        self.menuLnk.removeClass('active');

                        self.menuLnk.eq(elem-3).addClass('active');

                    }


                },
                nextPage:function(){
                    self.timer=setTimeout(function(){

                        if(self.windowWidth > 1000){
                            if( !self.action && self.activeIndex<5){

                                self.action = true;

                                self.activeIndex++;

                                if( self.activeIndex == 1 ){



                                    self.core.downToPage1();

                                } else if( self.activeIndex == 2){
                                    self.core.menuActive(3)

                                    self.core.downToPage2();

                                } else if( self.activeIndex == 3){

                                    self.core.menuActive(4)

                                    self.core.downToPage3();
                                }
                                else if( self.activeIndex == 4){
                                    self.core.menuActive(5)


                                    self.core.downToPage4();
                                }
                                else if( self.activeIndex == 5){
                                    self.core.menuActive(6)

                                    self.core.downToPage5();
                                }

                            }
                        }
                    },50)
                },
                prevPage:function(){
                    self.timer=setTimeout(function(){

                        if(self.windowWidth > 1000){
                            if(!self.action && self.activeIndex>=0){

                                self.action = true;
                                self.activeIndex--;
                                if( self.activeIndex == 0 ){


                                    self.core.upToPage0();

                                } else if( self.activeIndex == 1){
                                    self.core.menuActive(2)

                                    self.core.upToPage1();

                                } else if( self.activeIndex == 2){

                                    self.core.upToPage2();
                                    self.core.menuActive(3)


                                }else if( self.activeIndex == 3){

                                    self.core.menuActive(4)

                                    self.core.upToPage3();

                                }else if( self.activeIndex == 4){
                                    self.core.menuActive(5)

                                    self.core.upToPage4();

                                }
                            }
                        }


                    },50)
                },
                hidePageNext: function(){

                    self.activePage.fadeOut();
                    self.activePage.removeClass('active');
                    self.activePage = self.activePage.next().addClass('active');


                },
                hidePagePrev: function(){



                    self.activePage.fadeOut();
                    self.activePage.removeClass('active');
                    self.activePage  = self.activePage.prev().addClass('active');


                }
            };
        }
    };

var MenuShow = function(menuBtn, menu){
    this.btn = menuBtn;
    this.menu = menu;


    this.init();
};
MenuShow.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.controls();
            },
            controls: function(){

                self.btn.on('click', function(){

                    var curElem = $(this);

                    self.core.activeAdd(curElem);
                    self.core.menuShow(curElem);

                    return false;
                });

            },
            activeAdd: function(e){

                if(e.hasClass('active')){

                    e.removeClass('active');

                }
                else{

                    e.addClass('active');

                }
            },
            menuShow: function(e){

                if(e.hasClass('active')){

                    self.menu.addClass('show');


                }
                else{

                    self.menu.removeClass('show');


                }




            }
        };
    }
};