/*
 * this part has been designed and developed by ryan kamal
 * email: social.ryankamal@gmail.com
 */



/*
 * let`s append a space for new size
 */

$(document).on('click','.new_size',function(){
    $('.size_section').find('.list_empty').remove();
    var option = '<div class="colored-row option"><div class="col-xs-3"> <input type="text" class="form-control " placeholder="اسم الحجم" name="size_name"></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر التكلفة" name="cost_price"></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر البيع" name="sale_price"></div><div class="col-xs-2"></div><div class="col-xs-1" style="text-align: center"> <button type="button" class="btn btn-icon btn-pure danger btn-sm mr-1 option_remove"><i class="fa fa-trash-o"></i> </button></div></div>';
    $('.size_section').append(option);
    check_options('size_section');
    check_sizes();
});


/*
 * let`s remove a previously created space for a size
 */

$(document).on('click','.option_remove',function(){
  if($(this).parents().hasClass('size_section')){
    var name = $(this).parents('.colored-row').find('input[name="size_name"]').val();
    $('.extras_section').find('[data-size="'+name+'"]').remove();
  }
  $(this).parents('.option').remove();
  check_options('size_section');
  check_options('extras_section');
    check_sizes();
});


/*
 * check if lists are empty or not
 */
function check_options(type){
    var options = $('.'+type+'').find('.colored-row').length;
    var warning = $('.'+type+'').find('.list_empty').length;
    if(options == 0 && type == 'size_section' && warning < 1){
        var message = '<div class="list_empty"> <i class="fa fa-exclamation-circle"></i> <p> لم تقم بتحديد أي أحجام بعد </p></div>';
        $('.'+type+'').append(message);
    }else if(options == 0 && type == 'extras_section' && warning < 1){
        var message = '<div class="list_empty"> <i class="fa fa-exclamation-circle"></i> <p> لم تقم بتحديد أي اضافات بعد </p></div>';
        $('.'+type+'').append(message);
    }
}



/*
 * show extras engine search box
 */
$(document).on('click','.new_extra',function(){
    $('.extras_engine_input').show();
    $('.extras_engine_input input').focus();
});
var extras_list = ['apple','ball','people','cheese','بقدونس'];
$(document).on('keyup','.extras_engine_input input',function(){
    var key_word = $(this).val();
    if(key_word.length > 0 && $.trim(key_word) !== ''){
        $('.extras_engine_result').empty();
        for(var i = 0; i < extras_list.length; i++){
            if(extras_list[i].indexOf(''+key_word+'') != -1){
                var option = '<div class="option" data-name="'+extras_list[i]+'">'+extras_list[i]+'</div>';
                $('.extras_engine_result').append(option);
            }
        }
        var options = $('.extras_engine_result').find('.option').length;
        if(options == 0){
            var suggest = '<div class="option" data-name="'+key_word+'">هذه الاضافة غير موجودة مسبقا، اضغط هنا لاضافتها لقاعدة البيانات وتثبيتها </div>';
            $('.extras_engine_result').append(suggest);
            $('.extras_engine_result').css('opacity','1').css('height','40px');
        }else{
            $('.extras_engine_result').css('opacity','1').css('height',''+(options * 30 + 10)+'').css('border','0px 1px 1px 1px solid #ddd');
        }

    }else{
        $('.extras_engine_result').empty();
        $('.extras_engine_result').css('opacity','0').css('height','0px');
    }
});




$(document).on('click','.extras_engine_result .option',function(){
    var name = $(this).data('name');
    var sizes_length = $('.size_section').find('.option').length;
    var extras_legnth = $('.extras_section').find('.'+name+'').length;
    var sizes = [];
    var current_sizes = [];

    for(var i = 0; i < extras_legnth; i++){
        current_sizes.push($('.extras_section').find('.'+name+'').eq(i).data('size'));
    }

    if(extras_legnth > 0){
    for(var i = 0; i < sizes_length; i++){
    sizes.push($('.size_section').find('input[name=size_name]').eq(i).val());

        if(sizes[i] != current_sizes[i] && extras_legnth != sizes_length && $.trim(sizes[i]) !== ''){
            var option = '<div class="colored-row option '+name+'" data-size="'+sizes[i]+'"><div class="col-xs-3"> <input type="text" class="form-control " value="'+name+'" name="extra_name" disabled></div><div class="col-xs-2"> <input type="text" class="form-control " value="'+get_first_letter(sizes[i])+'" name="size_name" disabled></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر التكلفة" name="cost_price"></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر البيع" name="sale_price"></div><div class="col-xs-1" style="text-align: center"> <button type="button" class="btn btn-icon btn-pure danger btn-sm mr-1 option_remove"><i class="fa fa-trash-o"></i> </button></div></div>';
    $('.extras_section').append(option);
        }
    }
    }else{
        for(var i = 0; i < sizes_length; i++){
    sizes.push($('.size_section').find('input[name=size_name]').eq(i).val());
    if($.trim(sizes[i]) !== ''){
    var option = '<div class="colored-row option '+name+'" data-size="'+sizes[i]+'"><div class="col-xs-3"> <input type="text" class="form-control " value="'+name+'" name="extra_name" disabled></div><div class="col-xs-2"> <input type="text" class="form-control " value="'+get_first_letter(sizes[i])+'" name="size_name" disabled></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر التكلفة" name="cost_price"></div><div class="col-xs-3"> <input type="text" class="form-control " placeholder="سعر البيع" name="sale_price"></div><div class="col-xs-1" style="text-align: center"> <button type="button" class="btn btn-icon btn-pure danger btn-sm mr-1 option_remove"><i class="fa fa-trash-o"></i> </button></div></div>';
            $('.extras_section').append(option);
            $('.extras_section').find('.list_empty').remove();
        }
    }
    }


    $('.extras_engine_result').empty();
    $('.extras_engine_result').css('opacity','0').css('height','0px');
    $('.extras_engine_input input').val('');
    $('.extras_engine_input').hide();
});


function check_sizes(){
    var options = $('.size_section').find('.option').length;
    var buttons = $('.extras_head').find('.new_extra').length;
    var button = '<button type="button" class="btn btn-outline-secondary btn-sm new_extra"> اضافة جديدة</button>';
    if(options > 0 && buttons == 0){
        $('.extras_head').append(button);
    }else if(options == 0){
        $('.extras_head').find('.new_extra').remove();
    }
}

$(document).on('click','.extras_engine_input .form-control-position',function(){
    $('.extras_engine_input input').val('');
    $('.extras_engine_input').hide();
});


$(document).on('click','.cancel_manual_item',function(){
    $('input[name=itemname]').val('');
    $('.size_section').find('.option').remove();
    $('.extras_section').find('.option').remove();
    $('.extras_engine_result').empty();
    $('.extras_engine_result').css('opacity','0').css('height','0px');
    $('.extras_engine_input input').val('');
    $('.extras_engine_input').hide();
    check_options('size_section');
        check_options('extras_section');
        check_sizes();
});
