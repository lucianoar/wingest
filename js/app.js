$(document).foundation();

$(document).ready(function(){
  
  sliders = [];
  var $v;
  
  $('.slider').each(function(k,v){
    $v = $(v)
    //set width equals to elements inside
    v.style.width = $v.find('.slide').length * 100 +'%'
    
    slider = {
      
      obj: v,
      
      curpos: 0, //current position
      
      slides: $v.find('.slide').length - 1,

      slidewidth: $v.find('.slide')[0].offsetWidth,
      
      setIndex: function(k){
        $v.attr('data-index',k)
        },
      
      tstart:0, //touch start time
      tend:0, //touch end time
    
      xstartx:0, //touch x start
      xend:0, //touch x end
      delta:0, //touch x end
        
      setHandlers: function(){
        this.obj.addEventListener('touchstart',this.touchstart);
        this.obj.addEventListener('touchmove',this.touchmove);
        this.obj.addEventListener('touchend',this.touchend);
		  },

      touchstart: function(ev){
        sl = sliders[this.getAttribute('data-index')];
        
        sl.xstart = sl.xend = ev.touches[0].pageX;
        sl.tstart = new Date();
        
      },
      
      touchmove: function(ev){
        sl = sliders[this.getAttribute('data-index')];
        
        sl.xend = ev.touches[0].pageX;
      
        TweenLite.to(sl.obj,0,{x: (-sl.curpos*sl.slidewidth)+(sl.xend-sl.xstart)})
        },
        
      touchend: function(ev){
        sl = sliders[this.getAttribute('data-index')];
        
        sl.tend = new Date();
        sl.delta = Number(((sl.xend - sl.xstart)/sl.slidewidth).toPrecision(5))
      
        console.log('translation:%d',sl.xend - sl.xstart);
        console.log('interval:%d',sl.tend - sl.tstart);
        
        console.log('delta:%f',sl.delta);
        console.log('speed:%f',(sl.xend - sl.xstart)/(sl.tend - sl.tstart));
        console.log('curpos:%f',sl.curpos);
      
        (sl.delta < 0)?sl.moveForward():sl.moveBackward();
        },
      
      moveForward: function(){
        
        if(this.curpos != this.slides){
          this.curpos++;
          }
        TweenLite.to(this.obj,1,{x:-this.slidewidth*this.curpos})
        },
      
      moveBackward: function(){
        
        if(this.curpos != 0){
          this.curpos--;
          }
        TweenLite.to(this.obj,1,{x:-this.slidewidth*this.curpos})
        
        }
      }
    
    sliders.push(slider)
    
    slider.setIndex(sliders.length - 1);
    slider.setHandlers();
    
    })
  })

