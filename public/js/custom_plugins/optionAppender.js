$(function(){
  $.fn.optionAppender = function(options){
    var settings = $.extend({
      var display : '',
      var appendTo : '.job-mission-div'
    },options);
    var that = this;
    $(that).on('keyup',function(e){
      var code = (e.keyCode ? e.keyCode : e.which);
      var value = $(that).val();
      var appendTo = settings.appendTo;
      var option = '<span>'+value+' <i class="fa fa-times remove"></i></span>';
      if(!$(''+appendTo+'').hasClass('option-appender-list')){
        $(''+appendTo+'').addClass('option-appender-list');
      }
      if(code == 13){
        $(''+appendTo+'').append(option);
        $(that).val('');
      }

      $('.option-appender-list span i.remove').on('click',function(){
        $(that).parents('span').remove();
      });
    });
}( jQuery ));
