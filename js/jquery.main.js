$(function(){

    var page = new Page();
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
                controls: function(){
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
                nextPage:function(){
                    self.timer=setTimeout(function(){

                    },50)
                },
                prevPage:function(){
                    self.timer=setTimeout(function(){

                    },50)
                }
            };
        }
    };

