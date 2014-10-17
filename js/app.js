Wingest = {
  
  wrapper: document.getElementById('wrapper'),
  load: document.getElementById('load'),
  
  init: function(){
    $(document).foundation();
    this.section.getSection('home');
    },
    
  attach: function(url,data){
    this.url = url;
    this.type = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(url)?'image':'other';
    this.data = data;
  },
  
  sliders: [],
  
  sections: [],
  
  section: function(name,o){
    
    this.name = name;
    this.contentUrl = o.content;
    this.contentHtml = '';
    this.attachs = o.attachs;
    this.loaded = false;
    this.cached = false;
    
    this.relations = o.relations;
    
    if(!Wingest.sections[this.name]){
      Wingest.sections.push(this);
      //access by name, a hash
      Wingest.sections[this.name] = this;
      }
    
    Wingest.section.load(this);
    
    this.setContentHtml = function(content){
      this.contentHtml = content
      }
    
    
    
  },
  
  setLayout: function(section){
    $('#'+section+' .slider').each(function(k,v){
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
        
        //~ console.log(this.control[0]);
        
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
    
    Wingest.sliders.push(slider);
    
    slider.setIndex(Wingest.sliders.length - 1);
    slider.setWidth();
    slider.setHandlers();
    
    window.addEventListener('resize',function(ev){
      for(i=0;i<sliders.length;i++){
        sliders[i].setWidth();
        sliders[i].moveTo(sliders[i].curpos,0)
        }
      })
    
    })
    }
}

//send header to get section content and attachs
Wingest.section.getSection = function(section){
  
  if(!Wingest.section[section]){
  
    var xhr = new XMLHttpRequest()
    xhr.open('HEAD','views/load.php?section='+section,true);
      
    xhr.addEventListener('load',function(ev){
      header = JSON.parse(ev.target.getResponseHeader('Wingest-Section'));
      section = new Wingest.section(section,header);
    })
      
    xhr.send();
    
  }
}

//load section and attachs or get them from cache
Wingest.section.load = function(o){

  progress = function(i,ev){
    if(!progress.reqs[i]){progress.reqs[i] = {loaded:0,subtotal:0,calls: 0}};
    //~ if(!progress.oldtimestamp){progress.oldtimestamp = ev.timeStamp};
    
    progress.reqs[i].loaded = ev.loaded;
    progress.reqs[i].subtotal = ev.total || Number(ev.target.getResponseHeader('Wingest-Size'));
    progress.reqs[i].calls++;
    
    if(progress.reqs[i].calls == 1){
      progress.totalsize += ev.total
    }
    
    if(!progress.allStarted && progress.reqs.filter(function(v){if(v !== undefined) return v;}).length == progress.totalreqs ){
      progress.allStarted = true;
    }else if(progress.allStarted){
      var loaded_now = 0
      for(var j = 0; j < progress.totalreqs; j++){
        loaded_now += progress.reqs[j].loaded
        }
      var perc = Number(100*loaded_now/progress.totalsize).toString()+'%';
      TweenLite.to('#progress-bar',0.2,{x:perc})
      //~ progress.oldtimestamp = Date.now();
    }
    
    if(Number(loaded_now/progress.totalsize) >= 1){
      Wingest.wrapper.dispatchEvent(Wingest.events.sectionLoaded)
    }
    //~ debugger;
  }
  
  attachLoaded = function(i,ev){
    //~ debugger;
    Wingest.section.attachs.push(new Wingest.attach(o.attachs[i-1],ev.target.response))
  }
  
  //~ progress.oldtimestamp
  progress.totalreqs = o.attachs.length + 1
  progress.reqs = new Array()
  progress.allStarted = false
  
  progress.totalsize = 0;
  
  var xhr =  new XMLHttpRequest();
  xhr.open('POST',o.contentUrl,true);
  xhr.addEventListener('progress',progress.bind(null,0));
  xhr.addEventListener('load',function(ev){
    //~ Wingest.sections[o.name]
    Wingest.sections[o.name].setContentHtml(ev.target.responseText)
    });
  
  xhr.send();
  
  var attachs=[]
  for(var i=1, n=o.attachs.length; i <= n; i++){
    attachs[i] = new XMLHttpRequest();
    attachs[i].open('GET',o.attachs[i-1],true);
    attachs[i].responseType = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(o.attachs[i-1])?'blob':'text';

    attachs[i].addEventListener('progress',progress.bind(null,i));
    attachs[i].addEventListener('load',attachLoaded.bind(null,i));
    attachs[i].send();
    }
  
  progress.sectionLoaded = function(o,ev){
    Wingest.section.renderSection(o.name);
    }
  
  Wingest.wrapper.addEventListener('sectionLoaded',progress.sectionLoaded.bind(null,o))
}

Wingest.section.attachs = [];

Wingest.section.renderSection = function(section){
  Wingest.wrapper.innerHTML += Wingest.sections[section].contentHtml;
}
//~ Wingest.init();

Wingest.events = {
  sectionLoaded: new Event('sectionLoaded'),
}

Wingest.db = function(){
  var request = indexedDB.open("wingest",2);

  request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
   db = request.result;
    images = db.createObjectStore("images", {keyPath: "url"});
    images.createIndex('data','data')

    // Populate with initial data.
    images.put({url: "asdf.png"});
  };

  request.onsuccess = function() {
    db = request.result;
  };

  
}
