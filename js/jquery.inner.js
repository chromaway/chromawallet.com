$( function(){
    $( '.user-guide__menu a' ).on( {
        'click': function(){
            var newClass = $( this ).attr( 'href' );

            $( 'html, body' ).animate( {
                scrollTop: $( '.' + newClass ).offset().top - 115
            },{
                duration: 1000,
                easing: 'easeInOutQuad'
            } );

            return false;
        }
    } );
    $( '.post-load').each( function(){
        new PostLoad( $( this ) );
    } );

    var menuBtn = $('.show-mobile-menu'),
        menu = $('.site__menu'),
        menuShow = new MenuShow(menuBtn,menu);
} );

var PostLoad = function(obj){
    this.obj = obj;
    this.window = $( window );
    this.loaded = false;

    this.init();
};
PostLoad.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.check();
                self.core.controls();
            },
            check: function(){
                var curScroll = self.window.scrollTop(),
                    inWindow,
                    topInWindow,
                    nearTop;

                if( !self.loaded ){
                    topInWindow = self.obj.offset().top - self.window.scrollTop();
                    inWindow = ( topInWindow + self.obj.height() < self.window.height() && topInWindow > 115 );
                    nearTop = ( topInWindow < 140 && topInWindow > 115 );


                    if( inWindow || nearTop ){

                        self.loaded = true;
                        self.core.showPic();
                    }

                }

            },
            showPic: function(){
                var newImage = new Image();

                $( newImage).on( {
                    load: function(){
                        self.obj.append( newImage );
                        setTimeout( function(){
                            self.obj.addClass( 'post-load_loaded' );
                        },100 );

                    }
                } );
                newImage.src = self.obj.attr( 'data-pic' );
            },
            controls: function(){
                self.window.on( {
                    scroll: function(){
                        self.core.check();
                    }
                } );
            }
        };
    }
};

var MenuShow = function(menuBtn, menu){
    this.btn = menuBtn;
    this.menu = menu;
    this.menuItem = menu.find('a');
    this.windowWidth = $(window).width();


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


                if (self.windowWidth < 1000){

                    self.menuItem.on('click', function(e){



                        self.core.activeAdd(self.btn);
                        self.core.menuShow(self.btn);

                        var anchor = $(this);
                        $('html, body').stop().animate({
                            scrollTop: $(anchor.attr('href')).offset().top
                        }, 1000);
                        e.preventDefault();




                    });

                }

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