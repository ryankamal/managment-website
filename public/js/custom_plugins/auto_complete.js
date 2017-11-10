$(function(){

 $.fn.auto_complete = function(options){
   var settings = $.extend({
     data : ["sandwich","meals","drinks","deserts","fruits"]
   },options);
   var key_word = $(this).val();
   $(this).addClass('active');
   console.log(key_word);
   console.log(settings.data);


   /*
   *lets append our main html structure to our destination element
   */
   var search_result = '<div class="search_result"></div>';
   if(!$(this).parent().eq(0).find('.search_result').length > 0){
     $(this).parent().eq(0).append(search_result);
   }else{
     $(this).parent().eq(0).find('.search_result').show();
   }

   /*
   *look at our array
   */
   if(key_word.length > 0 && $.trim(key_word) !== ''){
     $(this).parent().eq(0).find('.search_result').empty();
     for(var i =0; i < settings.data.length; i++){
       if(settings.data[i].indexOf(''+key_word+'') != -1){
         var result_row = '<div class="result_row">'+settings.data[i]+'</div>';
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
   */
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




 }



}( jQuery ));
