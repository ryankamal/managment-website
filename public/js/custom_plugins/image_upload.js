


$(function(){
  $.fn.image_upload = function(options){
    var settings = $.extend({
      name : 'image_upload',
      width: '',
      height: '',
      background: '',
      border: '',
      radius: '',
    },options);
    var form = '<div class="image_upload"> <input type="file" id="'+settings.name+'" name="'+settings.name+'" hidden="" /> <label for="'+settings.name+'"> <i class="ft-camera"></i> </label></div>';
    $(this).append(form);
    $(this).find('.image_upload label').css('width',settings.width).css('height',settings.height).css('background',settings.background).css('border-color',settings.border).css('border-radius',settings.radius);
    
     $('#'+settings.name+'').on('change',function(event){
       $('label[for="item_image"]').css('background-image','url(\''+URL.createObjectURL(event.target.files[0])+'\')');
       console.log(URL.createObjectURL(event.target.files[0]))
     });

    
  }
}( jQuery ));





