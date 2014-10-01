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
      
      control: $v.parent().find('.controls .control'),
      
      controlskeleton: '<div class=\"controls\"><div class=\"positions\"><div></div><div class=\"selector\"><a href=\"#\"></a></div><div class=\"selector\"><a href=\"#\"></a></div></div><div class=\"control-back\"><div class=\"control\"></div></div></div>',
      
      controlwidth: $v.parent().find('.controls .control').width(),
      
      slides: $v.find('.slide').length - 1,

      slidewidth: $v.find('.slide').width(),
      
      shadow: $v.find('.shadow-side')[0],
      
      curpos_beginning: false,
      curpos_ending: false,
      
      setIndex: function(k){
        $v.attr('data-index',k);
      },
        
      setWidth: function(){
        
        o = $(this.obj);
        p = o.parent();
        
        this.slidewidth = o.find('.slide').width();
        if(p.find('.controls').length != 0)
          p.find('.controls')[0].style.left = this.slidewidth - p.find('.positions').width();
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
        
        console.log(this.control[0]);
        
        if(this.control[0]){
          this.control[0].addEventListener('click',this.click.bind(null,this))
          }
        
      },

      click: function(sl,ev){
        
        console.log('click')
        sl.moveTo(2,1)
        
        },

      touchstart: function(sl,ev){
                
        sl.xstart = sl.xend = ev.touches[0].pageX;
        sl.ystart = sl.yend = ev.touches[0].pageY;
        sl.tstart = new Date();
        
      },
      
      touchmove: function(sl,ev){
        
        sl.xend = ev.touches[0].pageX;
        sl.yend = ev.touches[0].pageY;
          
        sl.delta = Number(((sl.xend - sl.xstart)/sl.slidewidth).toPrecision(4));
        
        sl.deltaY = Number(((sl.yend - sl.ystart)/130).toPrecision(4));
        
        if((sl.beginning && sl.delta < 0) || (sl.ending && sl.delta > 0)){
          
          if(Math.abs(sl.delta) > 0.07 && sl.deltaY < 0.5){
            TweenLite.to(sl.obj,0,{x: (-sl.curpos*sl.slidewidth)+(sl.xend-sl.xstart)})
            TweenLite.to(sl.control,0,{x:(sl.controlwidth*sl.curpos)-(sl.delta*sl.controlwidth)})
          }
          
        }else{
          
          console.log(sl.delta);
          
          (sl.beginning)? sl.shadow.className = sl.shadow.className + ' active':null;
          
          
        }
        
      },
        
      touchend: function(sl,ev){
        
        sl.tend = new Date();
        
        sl.shadow.className = 'shadow-side'

        interval = sl.tend - sl.tstart
        speed = (sl.xend - sl.xstart)/(sl.tend - sl.tstart)
        
        //~ console.log('translation:%d',sl.xend - sl.xstart);
        //~ console.log('interval:%d',interval);
        //~ console.log('delta:%f',sl.delta);
        //~ console.log('speed:%f',speed);
        //~ console.log('t:%f',0.4/speed);
        //~ console.log('curpos:%f',sl.curpos);
        
        if( Math.abs(sl.delta) > 0.05 && Math.abs(sl.delta) < 0.6 && Math.abs(speed) > 0.2 ){ //Movimiento rapido
          (sl.delta < 0) ? sl.moveForward(0.4/speed) : sl.moveBackward(0.4/speed);
          //~ console.log('rapido');
        }else if( Math.abs(sl.delta) > 0.6 ){ //Movimiento largo
          //~ console.log('largo');
          (sl.delta < 0) ? sl.moveForward(0.4/speed) : sl.moveBackward(0.4/speed);
        }else{ //Movimiento corto
          //~ console.log('corto');
          sl.moveTo(sl.curpos,0.4/speed);
        }
        
        (sl.curpos === 0) ? sl.beginning = true : sl.beginning = false;
        (sl.curpos === sl.slides) ? sl.ending = true : sl.ending = false;
        
        console.log(sl)
        
      },
      
      moveForward: function(t){
        
        if(this.curpos != this.slides){
          this.curpos++;
          }
        TweenLite.to(this.obj,Math.abs(t),{x:-this.slidewidth*this.curpos, ease:Power4.easeOut})
        TweenLite.to(this.control,Math.abs(t),{x:this.controlwidth*this.curpos, ease:Power4.easeOut})
        },
      
      moveBackward: function(t){
        
        if(this.curpos != 0){
          this.curpos--;
          }
        TweenLite.to(this.obj,Math.abs(t),{x:-this.slidewidth*this.curpos, ease:Power4.easeOut})
        TweenLite.to(this.control,Math.abs(t),{x:this.controlwidth*this.curpos, ease:Power4.easeOut})
        
        },
        
      moveTo: function(pos,t){
        TweenLite.to(this.obj,Math.abs(t),{x:-this.slidewidth*pos, ease:Power4.easeOut})
        TweenLite.to(this.control,Math.abs(t),{x:this.controlwidth*pos, ease:Power4.easeOut})
        }
      }
    
    sliders.push(slider);
    
    slider.setIndex(sliders.length - 1);
    slider.setWidth();
    slider.setHandlers();
    
    window.addEventListener('resize',function(ev){
      for(i=0;i<sliders.length;i++){
        sliders[i].setWidth();
        sliders[i].moveTo(sliders[i].curpos,0)
        }
      })
    
    })
  })


  ajax_test = function(){
    
    xhr = new XMLHttpRequest();
    
    xhr.open('POST','resultados.php',true);
    
    xhr.addEventListener('progress',function(ev){
      t = ev.totalSize;
      l = ev.loaded;
      
      console.log('Porcentaje: %d\%',Math.round(100*l/t));     
      });
    
    xhr.addEventListener('readystatechange',function(ev){
      //~ console.log(ev,'rsc')
      if (xhr.readyState === 4) $('section').html(xhr.responseText);
      })
    
    xhr.send()
    }
