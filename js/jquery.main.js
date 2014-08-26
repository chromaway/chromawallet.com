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
    this.videoContainer =  $('.videoBlock');
    this.nextPageBtn = $('.down-btn');
    this.prevPageBtn = $('.up-btn');
    this.videoCloseBtn =  $('.videoBlock__close');
    this.activeIndex = 0;
    this.action = false;
    this.activePage = $('.site__page.active');

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


                    var textBlock = $('.colored-text'),
                        videoBlokc = $('.colored-video'),
                        textShow = $('.colored-text__show');

                    self.bigLogo.animate({

                        top: -self.bigLogo.height()

                    },{
                        complete: function(){

                            self.activePage.prev().fadeOut(300, function(){


                                self.menu.animate({
                                    top: 0
                                })

                                textBlock.css({
                                    left: -self.windowWidth/2
                                });

                                videoBlokc.css({
                                    left: self.windowWidth
                                });


                                setTimeout(function(){

                                    self.activePage.css({
                                        'display':'block'
                                    });

                                        videoBlokc.animate({

                                            left: self.windowWidth/2

                                        },500)

                                        textBlock.animate({

                                            left: 0

                                        },{
                                            complete: function(){
                                                    textShow.fadeIn(500);
                                                    self.action = false;
                                            },
                                            duration: 500

                                        });


                                },300)

                            });

                        }
                    },500)
                },
                downToPage2: function(){

                    var textBlock = $('.about-text'),
                        unstructionBack = $('.instruction-back');


                    self.activePage.css({
                        'display':'block'
                    });


                    setTimeout( function(){

                        textBlock.animate({

                            left: self.windowWidth/2
                        },{
                            complete: function(){
                                setTimeout( function(){

                                    unstructionBack.fadeIn(300, function(){
                                        textBlock.children().fadeIn();
                                    });

                                },1500);
                                self.action = false;

                            }
                        },300)

                    },1500)

                },
                downToPage3: function(){


                    var textBlock = $('.about-text'),
                        prevSlideBlock = $('.site__page-crhromaWallet02'),
                        text = $('.download-page__text'),
                        squeres = $('.squeres'),
                        indexCount = 1,
                        unstructionBack = $('.instruction-back');

                    self.podlozhka = $('<div class="podlozhka"></div>');

                    prevSlideBlock.children().append(self.podlozhka);

                    textBlock.animate({
                        top: -textBlock.height()
                    });

                    unstructionBack.animate({
                        top: -textBlock.height()
                    });

                    $('body').mousemove(function(e){
                        var x = e.pageX;

                        squeres.find('>div').css({

                            'transform': 'rotateY('+ (x-self.windowWidth/2)*0.03+'deg)'


                    });


                    });

                    setTimeout( function(){

                        self.core.hidePageNext();
                        self.activePage.css({
                            'display':'block'
                        });

                    },500);

                    setTimeout(function(){
                        squeres.fadeIn(function(){
                            text.fadeIn();
                        });
                    },1500);

                    setTimeout(function(){

                        text.find('li').each( function(indexCount){


                            var curItem = $(this);

                            setTimeout(function(){

                                curItem.animate({
                                    opacity: 1
                                },{
                                    complete: function(){
                                        self.action = false;

                                    }
                                },300)

                            },++indexCount*500);

                        });

                    },2000)





                },
                downToPage4: function(){

                    var downloadText1 = $('.download-page__text h2'),
                        downloadText2 = $('.download-page__text p'),
                        downloadText3 = $('.download-page__text'),
                        squeres = $('.squeres');

                    downloadText1.animate({
                        opacity: 0
                    },300);
                    downloadText2.animate({
                        opacity: 0
                    },{
                        complete: function(){
                            downloadText3.animate({
                                top: -downloadText3.height()
                            },500);

                        }
                    },300);



                    setTimeout( function(){
                        squeres.fadeOut();

                    },2000);


                    setTimeout(function(){
                        self.core.hidePageNext();

                        self.activePage.prev({
                            'display': 'none'
                        })
                        self.activePage.css({
                            'display':'block'
                        })
                    },2500)

                    setTimeout( function(){

                        self.activePage.addClass('active-shtorka');

                        downloadText1.css({
                            display:'none',
                            opacity: '1'
                        })

                        downloadText2.css({
                            display:'none',
                            opacity: '1'
                        })

                        self.action = false;


                    },3000)

                },
                downToPage5: function(){

                    var backImg = $('.contacts__back'),
                        conatctsText = $('.contacts > div:first-child');

                    self.activePage.next().css({
                        'display':'block'
                    });

                    self.activePage.animate({
                        bottom: self.activePage.height()
                    },300);



                    backImg.delay(1000).fadeIn(300, function(){

                        conatctsText.fadeIn(300);
                        self.core.hidePageNext();
                        self.action = false;



                    });



                    $('body').mousemove(function(e){
                            var x = e.pageX;

                        backImg.css({

                                'left': (x-self.windowWidth)*0.03+'px'


                            });
                    });


                },
                upToPage0: function(){


                    var textBlock = $('.colored-text'),
                        videoBlokc = $('.colored-video'),
                        textShow = $('.colored-text__show');

                    textShow.fadeOut(500);

                    textBlock.animate({

                        left: -self.windowWidth/2

                    },500)

                    videoBlokc.animate({
                        left: self.windowWidth
                    },500)


                    setTimeout( function(){

                        self.menu.animate({
                            top:'-115px'
                        },{
                            complete: function(){
                                self.core.hidePagePrev();

                                self.activePage.fadeIn();

                                self.bigLogo.animate({

                                    top: self.window.height()/2 - 114

                                },300);



                                self.action = false;

                            },
                            duration: 600
                        })

                    },500)







                },
                upToPage1: function(){

                    var textBlock = $('.about-text'),
                        unstructionBack = $('.instruction-back');

                    textBlock.children().fadeOut(300, function(){

                        setTimeout(function(){
                            unstructionBack.fadeOut(300)
                        },500)

                        textBlock.animate({

                            left: 0

                        },{
                            complete: function(){


                                self.core.hidePagePrev();


                                    self.activePage.fadeIn()

                                    self.action = false;



                            }
                        },300)

                    })

                },
                upToPage2: function(){



                    var textBlock = $('.about-text'),
                        prevSlideBlock = $('.site__page-crhromaWallet02'),
                        text = $('.download-page__text'),
                        squeres = $('.squeres'),
                        indexCount = 1,
                        podlozhka = $('.podlozhka'),
                        unstructionBack = $('.instruction-back');


                    text.find('li').each( function(indexCount){



                        var curItem = $(this);

                        setTimeout(function(){

                            curItem.animate({
                                opacity: 0
                            },300)

                        },++indexCount*500);






                    });


                    setTimeout( function(){
                        text.fadeOut( function(){
                            squeres.fadeOut(300,function(){
                                self.activePage.css({
                                    'display':'none'
                                });
                                self.activePage.prev().css({
                                    'display':'block'
                                });
                                self.podlozhka.css({
                                    'top':'0'
                                })


                                self.core.hidePagePrev();
                            });
                        });
                    },5000);

                    setTimeout( function(){

                        textBlock.animate({
                            top: 0
                        },300);

                        unstructionBack.animate({
                            top: 0
                        },{
                            complete: function(){
                                podlozhka.remove();
                                self.action = false;

                            }
                        },300);

                    },6000)






                },
                upToPage3: function(){

                    self.activePage.removeClass('active-shtorka');


                    var downloadText1 = $('.download-page__text h2'),
                        downloadText2 = $('.download-page__text p'),
                        downloadText3 = $('.download-page__text'),
                        squeres = $('.squeres');

                    setTimeout(function(){


                        self.activePage.prev().css({
                            'display': 'block'
                        })
                        self.activePage.css({
                            'display':'none'
                        })
                        self.core.hidePagePrev();

                    },1000);


                    setTimeout( function(){
                        squeres.fadeIn();

                    },1500);


                    downloadText3.animate({
                        top: '50%'
                    },2000);

                    downloadText1.fadeIn();
                    downloadText2.fadeIn();
                    setTimeout( function(){

                        self.action = false;

                    },3000)




                },
                upToPage4:function(){


                    var backImg = $('.contacts__back'),
                        conatctsText = $('.contacts > div:first-child');

                    conatctsText.fadeOut(300);
                    backImg.delay(1000).fadeOut();

                    self.activePage.prev().animate({
                        bottom: 0
                    },300);

                    self.activePage.prev().css({
                        'display':'block'
                    });
                    self.core.hidePagePrev();

                    self.action = false;

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

                    $('body').keydown(function(e){

                        self.core.videoHide(e)

                    });



                    self.videoCloseBtn.on('click', function(){


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
                            if( !self.action){

                                self.action = true;

                                self.activeIndex++;

                                if( self.activeIndex == 1 ){

                                    self.core.hidePageNext();

                                    self.core.downToPage1();

                                } else if( self.activeIndex == 2){

                                    self.core.hidePageNext();

                                    self.core.downToPage2();

                                } else if( self.activeIndex == 3){

                                    self.core.downToPage3();
                                }
                                else if( self.activeIndex == 4){
                                    self.core.downToPage4();
                                }
                                else if( self.activeIndex == 5){
                                    self.core.downToPage5();
                                }

                            }
                        }




                    },50)
                },
                prevPage:function(){




                    self.timer=setTimeout(function(){

                        if(self.windowWidth > 1000){

                            if(!self.action){

                                self.action = true;
                                self.activeIndex--;



                                if( self.activeIndex == 0 ){


                                    self.core.upToPage0();

                                } else if( self.activeIndex == 1){

                                    self.core.upToPage1();

                                } else if( self.activeIndex == 2){

                                    self.core.upToPage2();

                                }else if( self.activeIndex == 3){

                                    self.core.upToPage3();

                                }else if( self.activeIndex == 4){

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