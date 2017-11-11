$(function(){
  $.fn.image_upload = function(options){
    var settings = $.extend({
      name : 'image_upload',
      width: '',
      height: '',
      background: '',
      border: '',
    },options);
    var form = '<div class="image_upload"> <input type="file" id="'+settings.name+'" name="'+settings.name+'" hidden="" /> <label for="'+settings.name+'"> <i class="ft-camera"></i> </label></div>';
    $(this).append(form);
    $(this).find('.image_upload label').css('width',settings.width).css('height',settings.height).css('background',settings.background).css('border-color',settings.border);
  }
}( jQuery ));
