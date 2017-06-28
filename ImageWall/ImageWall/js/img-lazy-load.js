/**
 * JS图片延迟加载
 * @constructor {DataLazyLoad}
 * @param {options} 对象传参
 * @time 2014-1-10
 */
/*
 * 延迟加载的原理：滚动时：待加载的资源相对于游览器顶端的距离 - threshold <= 可视区域相对于浏览器顶端的距离 true 就加载
 * 否则的话 不加载
 */
 function DataLazyLoad(options){
    
    this.config = {

        container      :   window,   //容器 默认为window
        threshold      :   0,        // 离多少像素渲染图片
        event          :  'scroll',  // 默认为scroll(滚动)
        effect         :  'fadeIn',  // 默认为fadeIn 也可以为fadeIn, slideDown 等 jQuery 自带的效果
        effectspeed    :  1500,      // 时间  
        suffix         :  'img-ph',     // img属性 默认以data-img 也可以自定义后缀
        skip_invisible : true       // 如果img标签为隐藏的 那么不强制加载
    };

    this.cache = {};

    this.init(options);
    this._update();
 }
 
 DataLazyLoad.prototype = {
    
    init: function(options){
        
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;
        
        // 滚动时(或者其他事件) 触发事件
        $(_config.container).unbind(_config.event);
        $(_config.container).bind(_config.event,function(){
            self._update();
        });
    },
    /*
     * 加载对应的图片
     */
    _eachImg: function(item) {
        var self = this,
            _config = self.config,
            _cache = self.cache;

        if($(item).attr('isload') == 'false' || $(item).attr('isload') == undefined) {
            var dataImg = $(item).attr('data-'+_config.suffix),
                src = $(item).attr('src');
             //$(item).hide();
             $(item).attr('src',dataImg);
             $(item).attr('data-'+_config.suffix,'');
             //$(item)[_config.effect](_config.effectspeed);
             $(item).attr('isload','true');
        } 
    },
    _update:function(){
        var self = this,
            _config = self.config,
            _cache = self.cache;
         if(_config.container === window) {
             $('img').each(function(index,item){
                // 如果图片隐藏的 那么不强制加载
                // if(_config.skip_invisible && !$('img').is(":visible")) {
                //     return;
                // }

                if (self._belowthefold(item)) {
                        self._eachImg(item);
                } 
            })
            
         }else {
            $('img',$(_config.container)).each(function(index,item){
                // 如果图片隐藏的 那么不强制加载
                if(_config.skip_invisible && !$('img').is(":visible")) {
                    return;
                }
                if (self._abovethetop(item) ||
                    self._leftofbegin(item)) {
                        
                } else if (self._belowthefold(item) &&
                    self._rightoffold(item)) {
                        self._eachImg(item);
                } 

            })
         }
         
    },
    /*
     * 往下滚动时 判断待加载的元素是否在可视区域内
     * @return {Boolean}
     */
    _belowthefold: function(elem){
        var self = this,
            _config = self.config;
        var fold;
        if(_config.container === window) {
            fold = $(window).height() + $(window).scrollTop();
        }else {
            fold = $(_config.container).offset().top + $(_config.container).height();
        }

        return fold >= $(elem).offset().top - _config.threshold;
    },
    /* 
     * 往右滚动时 判断待加载的元素是否在可视区域内
     * @return {Boolean}
     */
    _rightoffold: function(elem){
        var self = this,
            _config = self.config;
        var fold;
        if(_config.container === window) {
            fold = $(window).width() + $(window).scrollLeft();
        }else {
            fold = $(_config.container).offset().left + $(_config.container).width();
        }
        
        return fold >= $(elem).offset().left - _config.threshold;
    },
    /*
     * 往上滚动
     * @return {Boolean}
     */
    _abovethetop: function(elem){
        var self = this,
            _config = self.config;
        var fold;
        if(_config.container === window) {
            fold = $(window).scrollTop();
        }else {
            fold = $(_config.container).offset().top;
        }
        return fold >= $(elem).offset().top + _config.threshold  + $(elem).height();
    },
    /*
     * 往左滚动
     * @return {Boolean}
     */
    _leftofbegin: function(elem) {
        var self = this,
            _config = self.config;
        var fold;
        
        if (_config.container === window) {
            fold = $(window).scrollLeft();
        } else {
            fold = $(_config.container).offset().left;
        }
        return fold >= $(elem).offset().left + _config.threshold + $(elem).width();
    }
    
 };

 // 初始化的方式
 $(function(){
    
    var datalazy = new DataLazyLoad({
        // container: '#demo'
    });
 });