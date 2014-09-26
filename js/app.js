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
      
      control: $v.find('.control'),
      
      controlwidth: this.control,
      
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
        this.obj.addEventListener('touchstart',this.touchstart.bind(null,this));
        this.obj.addEventListener('touchmove',this.touchmove.bind(null,this));
        this.obj.addEventListener('touchend',this.touchend.bind(null,this));
		  },

      touchstart: function(sl,ev){
                
        sl.xstart = sl.xend = ev.touches[0].pageX;
        sl.tstart = new Date();
        
      },
      
      touchmove: function(sl,ev){
        
        sl.xend = ev.touches[0].pageX;
          
        sl.delta = Number(((sl.xend - sl.xstart)/sl.slidewidth).toPrecision(4))
        
        if(Math.abs(sl.delta) > 0.2){
          TweenLite.to(sl.obj,0,{x: (-sl.curpos*sl.slidewidth)+(sl.xend-sl.xstart)})
          }
        
        },
        
      touchend: function(sl,ev){
        
        sl.tend = new Date();

        interval = sl.tend - sl.tstart
        speed = (sl.xend - sl.xstart)/(sl.tend - sl.tstart)
        
        //~ console.log('translation:%d',sl.xend - sl.xstart);
        //~ console.log('interval:%d',interval);
        //~ console.log('delta:%f',sl.delta);
        //~ console.log('speed:%f',speed);
        //~ console.log('t:%f',0.4/speed);
        //~ console.log('curpos:%f',sl.curpos);
        
        if( Math.abs(sl.delta) > 0.05 && Math.abs(sl.delta) < 0.3 && Math.abs(speed) > 0.2 ){ //Movimiento rapido
          (sl.delta < 0) ? sl.moveForward(0.4/speed) : sl.moveBackward(0.4/speed);
        }else if( Math.abs(sl.delta) > 0.3 ){ //Movimiento largo
          (sl.delta < 0) ? sl.moveForward(0.4/speed) : sl.moveBackward(0.4/speed);
        }else{ //Movimiento corto
          sl.moveTo(sl.curpos,0.4/speed);
        }
      },
      
      moveForward: function(t){
        
        if(this.curpos != this.slides){
          this.curpos++;
          }
        TweenLite.to(this.obj,Math.abs(t),{x:-this.slidewidth*this.curpos, ease:Power4.easeOut})
        },
      
      moveBackward: function(t){
        
        if(this.curpos != 0){
          this.curpos--;
          }
        TweenLite.to(this.obj,Math.abs(t),{x:-this.slidewidth*this.curpos, ease:Power4.easeOut})
        
        },
        
      moveTo: function(pos,t){
        TweenLite.to(this.obj,Math.abs(t),{x:TweenLite.to(this.obj,1,{x:-this.slidewidth*pos}), ease:Power4.easeOut})
        }
      }
    
    sliders.push(slider)
    
    slider.setIndex(sliders.length - 1);
    slider.setHandlers();
    
    })
  })

