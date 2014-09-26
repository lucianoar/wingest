$(document).foundation();
var slider
$(document).ready(function(){
  $('.slider').each(function(k,v){
    
    //events
    v.addEventListener('touchmove',function(ev){
      console.log(ev)
      })
    
    //set width equals to elements inside
    v.style.width = $(v).find('.slide').length * 100 +'%'
    })
  })

