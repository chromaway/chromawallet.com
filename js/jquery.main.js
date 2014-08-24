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
    this.videoBtn =  $('.colored-video');
    this.videoContainer =  $('.videoBlock');
    this.videoCloseBtn =  $('.videoBlock__close');

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
                    self.core.menuShow();
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
                menuShow: function(){


                    self.activePage =  $('.site__page.active');
                    self.downBtn = $('.down-btn');
                    self.bigLogo = $('.logo');


                    if(self.activePage.index() == 2){

                        self.menu.addClass('hide-menu');

                        self.activePage.fadeIn(500, function(){
                            self.downBtn.fadeIn(700);

                        });

                    }
                    else if(self.activePage.index() == 3){

                        var textBlock = $('.colored-text'),
                            videoBlokc = $('.colored-video'),
                            textShow = $('.colored-text__show');

                        self.bigLogo.animate({

                            top: -self.bigLogo.height()

                        },{
                            complete: function(){

                                self.activePage.prev().fadeOut(300, function(){

                                    self.menu.removeClass('hide-menu');

                                    self.menu.css({
                                        'top': '-115px'
                                    });

                                    self.menu.animate({
                                        top: 0
                                    },300);

                                    setTimeout(function(){


                                        textBlock.css({
                                            left: -self.windowWidth/2
                                        });

                                        videoBlokc.css({
                                            left: self.windowWidth/2 + self.windowWidth
                                        });

                                        self.activePage.css({
                                            'display':'block'
                                        });

                                        setTimeout(function(){

                                            textBlock.animate({

                                                left: 0

                                            },{
                                                start: function(){

                                                    videoBlokc.animate({

                                                        left: self.windowWidth/2

                                                    },300)

                                                },
                                                complete: function(){
                                                    setTimeout( function(){
                                                        textShow.fadeIn(500);

                                                    },500)
                                                }

                                            },1500);


                                        },300)

                                    },500)

                                });

                            }
                        },500)

                    }
                    else if(self.activePage.index() == 4){

                        var textBlock = $('.colored-text');


                        self.activePage.prev().css({
                            'display':'block'
                        })
                        self.activePage.css({
                            'display':'none'
                        })

                        textBlock.animate({

                            left: self.windowWidth/2

                        },300)

                    }
                    else{

                        self.menu.removeClass('hide-menu');

                    }


                },
                controls: function(){

                    self.videoBtn.on('click', function(){

                        var curElem = $(this);

                        self.core.videOpen(curElem)

                        return false;

                    });

                    $('body').keydown(function(e){

                        self.core.videoHide(e)

                    });

                    self.videoCloseBtn.on('click', function(){

                        console.log(1);

                        var curElem = $(this);

                        self.core.videoHide(curElem);

                    });

                    self.window.on({
                        'resize':function(){
                            self.core.setSize();
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
                        'scroll':function(){
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
                nextPage:function(){
                    self.timer=setTimeout(function(){


                        if(self.windowWidth > 1000){

                            self.core.hidePage();
                            self.core.menuShow();

                        }




                    },50)
                },
                prevPage:function(){
                    self.timer=setTimeout(function(){

                    },50)
                },
                hidePage: function(){
                    self.activePage.fadeOut();
                    self.activePage.removeClass('active');
                    self.activePage.next().addClass('active');
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