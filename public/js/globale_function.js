/*
*function to get value of any percent
*/
function get_value_of_precent(value,percent){
  return ((value/100)*percent);
}

/*
*function to get first letter of any string
*/
function get_first_letter(str){
  var result = '';
  $(str.split(' ')).each(function(key,value){
    result+=value.charAt(0);
  });
  return(result);
}


//get date formatted like 1997/03/25 :: ISO Standard
function getFullDate(date){
    var _date = new Date(date);
    var day = _date.getDate();
    var month = _date.getMonth()+1;
    var year = _date.getFullYear();
    var new_date = ""+year+"/"+month+"/"+day+"";
    return new_date;
}

//get time formatted like 02:30 PM
function getTime(date){
    var _date = new Date(date);
    var hour = _date.getHours();
    var minutes = _date.getMinutes();
    var a_p ;
if (hour < 12)
   {
   a_p = "ص";
   }
else
   {
   a_p = "م";
   }
if (hour == 0)
   {
   hour = 12;
   }
if (hour > 12)
   {
   hour = hour - 12;
   }
   if(hour < 10){
        var new_hour = '0'+hour;
    }else{
        var new_hour = hour;
    }
    var new_time = ""+new_hour+":"+minutes+" "+a_p+"";
    return new_time;
}


function minutes_controller(minutes){
    if(minutes == 1){
        return 'دقيقة واحدة';
    }else if(minutes == 2){
        return 'دقيقتين';
    }else if(minutes > 2 && minutes <= 10){
        return minutes + ' دقائق ';
    }else if(minutes > 10){
        return minutes + ' دقيقة ';
    }
}


/*
 * convert 24 hour time to 12 hour time
 */

function allDaytohalf(date){
    var _date = new Date(date);
    var hour = _date.getHours();
    var minutes = _date.getMinutes();
    
    var new_day = getFullDate(date);
    
    if(hour > 12){
        var new_hour = hour - 12;
    }else if(hour == 0){
        var new_hour = 12;
    }else if(hour <= 12){
        var new_hour = hour;
    }
    
    var new_date = new_day +' '+new_hour+':'+minutes;
    return(new_date)
    
    
}




/**
 * hex2rgb
 */

function hex2rgb(hex,opacity){
    hex = (hex + '').trim();
    
      var rgb = null
        , match = hex.match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);
    
      if(!match) { return null; }
      
      rgb = {}
    
      hex = match[1];
      // check if 6 letters are provided
      if (hex.length == 6) {
        rgb.r = parseInt(hex.substring(0, 2), 16);
        rgb.g = parseInt(hex.substring(2, 4), 16);
        rgb.b = parseInt(hex.substring(4, 6), 16);
      }
      else if (hex.length == 3) {
        rgb.r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        rgb.g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        rgb.b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
      }
    
      rgb.css = 'rgb' + (opacity ? 'a' : '') + '(';
      rgb.css += rgb.r + ',' + rgb.g + ',' + rgb.b;
      rgb.css += (opacity ? ',' + opacity : '') + ')';
    
      return rgb.css;
}





/*
* auto complete with submit new option
*/
/*
$(document).on('keyup mousein','[data-complete="ryan-complete"]',function(){

var data = ['sandwich','drinks','meals','salade'];
var dumped = [];
var key_word = $(this).val();
$(this).addClass('active');
/*
*lets append our main html structure to our destination element
*
var search_result = '<div class="search_result"></div>';
if(!$(this).parent().eq(0).find('.search_result').length > 0){
  $(this).parent().eq(0).append(search_result);
}else{
  $(this).parent().eq(0).find('.search_result').show();
}

/*
*look at our array

if(key_word.length > 0 && $.trim(key_word) !== ''){
  $(this).parent().eq(0).find('.search_result').empty();
  for(var i =0; i < data.length; i++){
    if(data[i].indexOf(''+key_word+'') != -1){
      var result_row = '<div class="result_row">'+data[i]+'</div>';
      $(this).parent().eq(0).find('.search_result').append(result_row);
    }
  }
}else{
  $(this).parent().eq(0).find('.search_result').hide();
}

if($(this).parent().eq(0).find('.search_result .result_row').length == 0){
  $(this).parent().eq(0).find('.search_result').hide();
}

/*
*trigger a result click

$('.result_row').on('click',function(){
  $(this).parents().eq(1).find('[data-complete="ryan-complete"]').val($(this).text());
  $(this).parents().eq(1).find('.search_result').empty().hide();
});


$(document).click(function(e) {
 if(e.target.className!="form-control.active"){
   $('.search_result').empty().hide();
 }
 $(document).find('.form-control.active').removeClass('active');
});

});
*/
