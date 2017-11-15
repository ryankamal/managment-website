$(function(){
  $.fn.cardToggler = function(options){
    var settings = $.extend({
    },options);

    var that = $(this);
    $(that).children(':not(":first-child")').hide();
    var toggler = '<div class="cardToggler "><div class="move right"><i class="icon-control-forward"></i></div><div class="head">2</div><div class="move left"><i class="icon-control-rewind"></i></div></div>';
      $(that).append(toggler);

    var cardLength = $(that).children(':not(".cardToggler")').length;
    console.log('cardLength',cardLength);
    var currentIndex ;
    currentIndex = 0;
    $(that).find('.cardToggler .left').addClass('disabled');
    $(that).find('.cardToggler .head').text($(that).children().eq(0).attr('data-head'));

    $(that).find('.cardToggler .move').on('click touch',function(){
      if($(this).hasClass('right')){
        if(cardLength-1 !== currentIndex){
          $(that).children(':not(".cardToggler")').hide();
          $(that).children().eq(currentIndex+1).show();
          currentIndex = currentIndex+1;
        }
      }else if($(this).hasClass('left')){
        if(currentIndex !== 0){
          $(that).children(':not(".cardToggler")').hide();
          $(that).children().eq(currentIndex-1).show();
          currentIndex = currentIndex-1;
        }
      }
      $(that).find('.cardToggler .head').text($(that).children().eq(currentIndex).attr('data-head'));

      if(currentIndex == cardLength-1){
        $(that).find('.cardToggler .right').addClass('disabled');
      }else if(currentIndex ==0){
        $(that).find('.cardToggler .left').addClass('disabled');
      }else{
        $(that).find('.cardToggler .move').removeClass('disabled');
      }

    });




  }

}(jQuery));
