$(window).load(function(){
    var $iw_thumbs          = $('#iw_thumbs'),
        $iw_ribbon          = $('#iw_ribbon'),
        $iw_ribbon_close    = $iw_ribbon.children('span.iw_close'),
        $iw_ribbon_zoom     = $iw_ribbon.children('span.iw_zoom');
        
        ImageWall   = (function() {
                // window width and height
            var w_dim,
                // index of current image
                current             = -1,
                isRibbonShown       = false,
                isFullMode          = false,
                // ribbon / images animation settings
                ribbonAnim          = {speed : 250, easing : 'easeOutExpo'},
                imgAnim             = {speed : 250, easing : 'jswing'},
                // init function : call masonry, calculate window dimentions, initialize some events
                init                = function() {
                    $iw_thumbs.imagesLoaded(function(){
                        $iw_thumbs.masonry({
                            isAnimated  : true
                        });
                    });
                    getWindowsDim();
                    initEventsHandler();
                },
                // calculate window dimentions
                getWindowsDim       = function() {
                    w_dim = {
                        width   : $(window).width(),
                        height  : $(window).height()
                    };
                },
                // initialize some events
                initEventsHandler   = function() {
                    
                    // click on a image
                    $iw_thumbs.delegate('li', 'click', function() {
                        if($iw_ribbon.is(':animated')) return false;
                        
                        var $el = $(this);
                        
                        if($el.data('ribbon')) {
                            // showFullImage($el);
                            window.open($el.children('img').data('img'));
                            closeRibbon();
                        }
                        else if(!isRibbonShown) {
                            isRibbonShown = true;
                            
                            $el.data('ribbon',true);
                            
                            // set the current
                            current = $el.index();
                        
                            showRibbon($el);
                        }
                    });
                    
                    // click ribbon close
                    $iw_ribbon_close.bind('click', closeRibbon);
                    $iw_ribbon.bind('click', closeRibbon);
                    
                    // on window resize we need to recalculate the window dimentions
                    $(window).bind('resize', function() {
                                getWindowsDim();
                                if($iw_ribbon.is(':animated'))
                                    return false;
                                closeRibbon();
                             })
                             .bind('scroll', function() {
                                if($iw_ribbon.is(':animated'))
                                    return false;
                                closeRibbon();
                             });
                    
                },
                showRibbon          = function($el) {
                    var $img    = $el.children('img'),
                        $descrp = $img.next();
                    
                    // fadeOut all the other images
                    $iw_thumbs.children('li').not($el).animate({opacity : 0.2}, imgAnim.speed);
                    
                    // the ribbon will animate from the left or right
                    // depending on the position of the image
                    var ribbonCssParam      = {
                            top : $el.offset().top - $(window).scrollTop() - 6 + 'px'
                        },
                        descriptionCssParam,
                        dir;
                    
                    if( $el.offset().left < (w_dim.width * (0.4)) ) {
                        dir = 'left';
                        ribbonCssParam.left     = 0;
                        ribbonCssParam.right    = 'auto';
                    }
                    else {
                        dir = 'right';
                        ribbonCssParam.right    = 0;
                        ribbonCssParam.left     = 'auto';
                    }
                    
                    // increase the image z-index, and set the height to 100px (default height)
                    $img.css('z-index', 100)
                        .data('originalHeight',$img.height())
                        .stop()
                        .animate({
                            height      : dir=='left'?'130px':'130px'
                        }, imgAnim.speed, imgAnim.easing);

                    $iw_ribbon.css({})
                              .show()
                              .stop()
                              .animate({width : '100%'}, ribbonAnim.speed, ribbonAnim.easing, function() {
                                    switch(dir) {
                                        case 'left' :
                                            descriptionCssParam     = {
                                                'left'          : $img.outerWidth(true) + 'px',
                                                'text-align'    : 'left'
                                            };
                                            break;
                                        case 'right' :  
                                            descriptionCssParam     = {
                                                'left'          : '-200px',
                                                'text-align'    : 'right'
                                            };
                                            break;
                                    };
                                    $descrp.css(descriptionCssParam).fadeIn();
                                    // show close button and zoom
                                    $iw_ribbon_close.show();
                                    $iw_ribbon_zoom.show();
                              });
                    
                },
                // close the ribbon
                // when in full mode slides in the middle of the page
                // when not slides left
                closeRibbon         = function() {
                    if($iw_ribbon.is(':animated')) return false;

                    isRibbonShown   = false
                    
                    $iw_ribbon_close.hide();
                    $iw_ribbon_zoom.hide();
                    
                    if(!isFullMode) {
                    
                        // current wall image
                        var $el         = $iw_thumbs.children('li').eq(current);
                        
                        resetWall($el);
                        
                        // slide out ribbon
                        $iw_ribbon.stop()
                                  .animate({width : '0%'}, ribbonAnim.speed, ribbonAnim.easing); 
                              
                    }
                    else {
                        $iw_ribbon.stop().animate({
                            opacity     : 0.8,
                            height      : '0px',
                            marginTop   : w_dim.height/2 + 'px' // half of window height
                        }, ribbonAnim.speed, function() {
                            $iw_ribbon.css({
                                'width'     : '0%',
                                'height'    : '126px',
                                'margin-top': '0px'
                            }).children('img').remove();
                        });
                        
                        isFullMode  = false;
                    }
                },
                resetWall           = function($el) {
                    var $img        = $el.children('img'),
                        $descrp     = $img.next();
                        
                    $el.data('ribbon',false);
                    
                    // reset the image z-index and height
                    $img.css('z-index',1).stop().animate({
                        height      : $img.data('originalHeight')
                    }, imgAnim.speed,imgAnim.easing);
                    
                    // fadeOut the description
                    $descrp.fadeOut();

                    // fadeIn all the other images
                    $iw_thumbs.children('li').not($el).animate({opacity : 1}, imgAnim.speed);                               
                },
                showFullImage       = function($el) {
                    isFullMode  = true;
                    
                    $iw_ribbon_close.hide();
                    
                    var $img    = $el.children('img'),
                        large   = $img.data('img'),
                    
                        // add a loading image on top of the image
                        $loading = $('<span class="iw_loading"></span>');

                    $el.append($loading);
                    
                    // preload large image
                    $('<img/>').load(function() {
                        var $largeImage = $(this);
                        
                        $loading.remove();
                        
                        $iw_ribbon_zoom.hide();
                        
                        resizeImage($largeImage);
                        
                        // reset the current image in the wall
                        resetWall($el);
                        
                        // animate ribbon in and out
                        $iw_ribbon.stop().animate({
                            opacity     : 1,
                            height      : '0px',
                            marginTop   : '63px' // half of ribbons height
                        }, ribbonAnim.speed, function() {
                            // add the large image to the DOM
                            $iw_ribbon.prepend($largeImage);
                            
                            $iw_ribbon_close.show();
                            
                            document.getSelection().empty()

                            $iw_ribbon.animate({
                                height      : '100%',
                                marginTop   : '0px',
                                top         : '0px'
                            }, ribbonAnim.speed);
                        });
                    }).attr('src',large);
                        
                },
                resizeImage         = function($image) {
                    var widthMargin     = 100,
                        heightMargin    = 100,
                    
                        windowH         = w_dim.height - heightMargin,
                        windowW         = w_dim.width - widthMargin,
                        theImage        = new Image();
                        
                    theImage.src        = $image.attr("src");
                    
                    var imgwidth        = theImage.width,
                        imgheight       = theImage.height;

                    if((imgwidth > windowW) || (imgheight > windowH)) {
                        if(imgwidth > imgheight) {
                            var newwidth    = windowW,
                                ratio       = imgwidth / windowW,
                                newheight   = imgheight / ratio;
                                
                            theImage.height = newheight;
                            theImage.width  = newwidth;
                            
                            if(newheight > windowH) {
                                var newnewheight    = windowH,
                                    newratio        = newheight/windowH,
                                    newnewwidth     = newwidth/newratio;
                            
                                theImage.width      = newnewwidth;
                                theImage.height     = newnewheight;
                            }
                        }
                        else {
                            var newheight   = windowH,
                                ratio       = imgheight / windowH,
                                newwidth    = imgwidth / ratio;
                            
                            theImage.height = newheight;
                            theImage.width  = newwidth;
                            
                            if(newwidth > windowW) {
                                var newnewwidth     = windowW,
                                    newratio        = newwidth/windowW,
                                    newnewheight    = newheight/newratio;
                        
                                theImage.height     = newnewheight;
                                theImage.width      = newnewwidth;
                            }
                        }
                    }
                        
                    $image.css({
                        'width'         : theImage.width + 'px',
                        'height'        : theImage.height + 'px',
                        'margin-left'   : -theImage.width / 2 + 'px',
                        'margin-top'    : -theImage.height / 2 + 'px'
                    });                         
                };
                
            return {init : init};   
        })();
    
    ImageWall.init();
});