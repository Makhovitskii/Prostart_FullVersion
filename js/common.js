$(function() {

	// Custom JS

    // screen_size();

    $('.calendar-full').datepicker({
        language: "az",
        todayHighlight: true
    });

    $('.calendar-month').datepicker({
        language: "az",
        format: "mm-yyyy",
        viewMode: "months",
        minViewMode: "months"
    });

    $('.input-date').datepicker({
        format : 'dd-mm-yyyy',
        language: "az",
        todayHighlight: true,
        autoclose: true
    });

    $('#table-state').click(function(event) {
        if($(this).children('span').hasClass('full-table'))
        {
            $(this).children('span').removeClass('full-table').html('Bütün jurnal');
            $('#full-table').fadeOut(100);
            $('#short-table').fadeIn(300);
        }
        else
        {
            $(this).children('span').addClass('full-table').html('Qısa jurnal');
            $('#short-table').fadeOut(100);
            $('#full-table').fadeIn(300);
        }
    });

    $('#employee-state').click(function(event) {
        if($(this).children('span').hasClass('full-table'))
        {
            $(this).children('span').removeClass('full-table').html('Vizit kart');
            $('#full-table').fadeOut(100);
            $('#short-table').fadeIn(300);
        }
        else
        {
            $(this).children('span').addClass('full-table').html('Cədvəl');
            $('#short-table').fadeOut(100);
            $('#full-table').fadeIn(300);
        }
    });

    $('#structure-state').click(function(event) {
        if($(this).children('span').hasClass('full-table'))
        {
            $(this).children('span').removeClass('full-table').html('Vizual baxış');
            $('#full-table').fadeOut(100);
            $('#short-table').fadeIn(300);
        }
        else
        {
            $(this).children('span').addClass('full-table').html('Cədvəl');
            $('#short-table').fadeOut(100);
            $('#full-table').fadeIn(300);

            buildStructure();
        }
    });

    $('#noworkday-state').click(function(event) {
        if($(this).children('span').hasClass('full-table'))
        {
            $(this).children('span').removeClass('full-table').html('Təqvim');
            $('#full-table').fadeOut(100);
            $('#short-table').fadeIn(300);
        }
        else
        {
            $(this).children('span').addClass('full-table').html('Cədvəl');
            $('#short-table').fadeOut(100);
            $('#full-table').fadeIn(300);
        }
    });

    // Selectize init

    $select = $('.selectize').selectize();

    // Scrolling table sticky head

    // $('.table-hover').tableScroll({height:500});

    // Preloader timeout

    // setTimeout(function(){
        $('.preloader').fadeOut(300);
    // }, 1000);

    $('[data-toggle="tooltip"]').tooltip()
});

function screen_size()
{
   $('.content, .nav, .sidebar, .option-panel').height($( document ).height());
}

function sidebar_settings()
{
    $('.sidebar_settings').slideDown(300);
    $('#sbs').fadeOut(150);
}
function sidebar_settings_close()
{
    $('.sidebar_settings').slideUp(300);
    $('#sbs').fadeIn(150);
}

function option_panel(name, size)
{
    if(typeof name!='undefined' && name!='' && typeof size!='undefined' && parseInt(size)>0)
    {
        $('.option-panel[data-name]').each(function()
        {
            if($(this).attr('data-name')!=name && $(this).hasClass('open'))
            {
                $(this).removeClass('open');
                $(this).children('.option-panel-inner').css('left', '-'+size+'px');

                $(this).fadeOut();
            }
        });

        setTimeout(function()
        {
            var panel = $('.option-panel[data-name="'+name+'"]');
            panel.toggleClass('open');

            if(panel.hasClass('open'))
            {
                panel.fadeIn(500);
                setTimeout(function()
                {
                    panel.children('.option-panel-inner').css('left', '0px');
                }, 500);
            }
            else
            {
                panel.children('.option-panel-inner').css('left', '-'+size+'px');
                setTimeout(function()
                {
                    panel.fadeOut(500);
                }, 500);
            }
        }, 500);
    }
}

function table_field_editor() {
    $('table tbody tr td[data-toggle="edit"]').on('click', function(event)
    {
        if(typeof $(event.target).attr('type')=="undefined")
        {
            var ths = $(this);
            if(!ths.hasClass('sallary-edit')) {
                var sum = parseInt(ths.find('sum').html());
                ths.parent('tr').addClass('active');
                ths.addClass('sallary-edit').html('<input type="text" placeholder="0" value="'+sum+'"><span><i class="fa fa-save"></i></span>');
            }
            else
            {
                var sum = parseInt(ths.find('input').val());
                ths.parent('tr').removeClass('active');
                ths.removeClass('sallary-edit').html('<sum>'+sum+'</sum><span><i class="fa fa-pencil"></i></span>');
            }
        }

    });
}
table_field_editor();

function debt_calculator()
{
    $('.debt-payment-type').change(function(){

        var ths = $(this).parents('div[data-name]');

        if($(this).val()==2)
        {
            if(typeof ths.find('input[name="debt-pay-date"]').val()=="undefined" || ths.find('input[name="debt-pay-date"]').val()=="")
            {
                ths.find('input[name="debt-pay-date"]').css('border-color', '#e74c3c').next('a').css('border-color', '#e74c3c');

                setTimeout(function(){ ths.find('input[name="debt-pay-date"]').css('border-color', '#dedede').next('a').css('border-color', '#dedede'); }, 1000);

                var selectize = $(this)[0].selectize;
                selectize.setValue(0, false);

            }
            else if(typeof ths.find('input[name="debt-sum"]').val()=="undefined" || isNaN(parseInt(ths.find('input[name="debt-sum"]').val())) || parseInt(ths.find('input[name="debt-sum"]').val())<=0)
            {
                ths.find('input[name="debt-sum"]').css('border-color', '#e74c3c');

                setTimeout(function(){ ths.find('input[name="debt-sum"]').css('border-color', '#dedede'); }, 1000);

                var selectize = $(this)[0].selectize;
                selectize.setValue(0, false);

            }
            else
            {
                if(ths.find('.debt-payment-type').parents('div[data-name]').children('div.option-panel-inner').hasClass('small-panel') && parseInt(ths.find('.debt-payment-type').val())==2)
                {
                    ths.find('.debt-payment-type').parents('div[data-name]').children('div.option-panel-inner').removeClass('small-panel').addClass('debt-panel');
                }
                else
                {
                    ths.find('.debt-payment-type').parents('div[data-name]').children('div.option-panel-inner').removeClass('debt-panel').addClass('small-panel');
                }

                if(parseInt(ths.find('.debt-payment-type').val())==2)
                {
                    ths.find('.debt-payment-type').parents('div[data-name]').find('div.debt-credit-block').fadeIn(800);
                }
                else
                {
                    ths.find('.debt-payment-type').parents('div[data-name]').find('div.debt-credit-block').fadeOut(800);
                }
            }
        }
    });


    $('input[name="debt-payment-monts"]').keyup(function(event)
    {
        var ths = $(this);

        setTimeout(function()
        {
            var sum = parseInt(ths.parents('div[data-name]').find('input[name="debt-sum"]').val()),
                mon = parseInt(ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').val());

                if(mon<=60)
                {
                    var cem = Math.floor(sum / mon);

                    cem = isNaN(cem)? null : cem;

                    ths.parents('div[data-name]').find('input[name="debt-payment-sum"]').val(cem);

                    var table = ths.parents('div[data-name]').find('.debt-credit-table tbody');
                        table.html('');

                    for (var i = 1; i <= mon; i++)
                    {
                        sum = sum - cem;
                        var ots = 0;

                        if(i==mon && sum>0)
                        {
                            var precent = Math.round(sum * 100 / cem);
                            if(precent<=50)
                            {
                                cem = sum+cem;
                                sum = 0;
                            }
                            else
                            {
                                ots = sum;
                            }
                        }

                        table.append('<tr>' +
                        '<td>'+i+'</td>' +
                        '<td>16.06.2018</td>' +
                        '<td>'+cem+'</td>' +
                        '<td>'+sum+'</td>' +
                        '<td>' +
                        '<span class="flex">' +
                        '<label class="switch">' +
                        '<input type="checkbox">' +
                        '<span class="slider round"></span>' +
                        '</label>' +
                        '</span>' +
                        '</td>' +
                        '</tr>');

                        if(ots>0)
                        {
                            table.append('<tr>' +
                            '<td>'+(i+1)+'</td>' +
                            '<td>16.06.2018</td>' +
                            '<td>'+ots+'</td>' +
                            '<td>'+(sum-ots)+'</td>' +
                            '<td>' +
                            '<span class="flex">' +
                            '<label class="switch">' +
                            '<input type="checkbox">' +
                            '<span class="slider round"></span>' +
                            '</label>' +
                            '</span>' +
                            '</td>' +
                            '</tr>');
                        }
                    }

                    table.parent('table').tableScroll({height:200});
                }
                else
                {

                    ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').css('border-color', '#DE5B4D');
                    ths.parents('div.debt-credit').find('.debt-payment-monts-error').fadeIn(300);

                    setTimeout(function()
                    {
                        ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').css('border-color', '#dedede');
                        ths.parents('div.debt-credit').find('.debt-payment-monts-error').fadeOut(300);
                    }, 3000);

                }
        }, 500);
    });

    $('input[name="debt-payment-sum"]').keyup(function(event)
    {
        var ths = $(this);

        setTimeout(function()
        {
            var sum = parseInt(ths.parents('div[data-name]').find('input[name="debt-sum"]').val()),
                pay = parseInt(ths.parents('div[data-name]').find('input[name="debt-payment-sum"]').val());

            var mon = Math.round(sum / pay);

                mon = isNaN(mon)? null : mon;

                ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').val(mon);


                if(mon<=60)
                {
                    var table = ths.parents('div[data-name]').find('.debt-credit-table tbody');
                        table.html('');

                    for (var i = 1; i <= mon; i++)
                    {

                        if(i==mon)
                        {
                            if(sum<pay)
                            {
                                pay = sum;
                            }
                            else
                            {
                                sum = sum - pay;
                                pay = pay + sum;
                                sum = pay;
                            }
                        }

                        sum = sum - pay;

                        table.append('<tr>' +
                        '<td>'+i+'</td>' +
                        '<td>16.06.2018</td>' +
                        '<td>'+pay+'</td>' +
                        '<td>'+sum+'</td>' +
                        '<td>' +
                        '<span class="flex">' +
                        '<label class="switch">' +
                        '<input type="checkbox">' +
                        '<span class="slider round"></span>' +
                        '</label>' +
                        '</span>' +
                        '</td>' +
                        '</tr>');
                    }

                    table.parent('table').tableScroll({height:200});
                }
                else
                {
                    ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').css('border-color', '#DE5B4D');
                    ths.parents('div.debt-credit').find('.debt-payment-monts-error').fadeIn(300);

                    setTimeout(function()
                    {
                        ths.parents('div[data-name]').find('input[name="debt-payment-monts"]').css('border-color', '#dedede');
                        ths.parents('div.debt-credit').find('.debt-payment-monts-error').fadeOut(300);
                    }, 3000);
                }

                // $(this).parents('div[data-name]').find('input[name="debt-payment-monts"]').val(mon).trigger('keyup');
        }, 500);

    });
}
debt_calculator();


//  sidebar_dashboard_menu
function  dashboard_menu()
{
    $('a[data-action="sidebar_dashboard_menu"]').on('click', function(){
        var e = $(this);
        if(!e.parent('li').hasClass('open'))
        {
            e.parents('ul').children('li').addClass('hidden');
            e.parent('li').removeClass('hidden').addClass('open');
            e.next('div.sidebar_dashboard_menu_sub').fadeIn(500);
            e.find('i').removeClass('fa-angle-down').addClass('fa-times');
        }
        else
        {
            e.find('i').removeClass('fa-times').addClass('fa-angle-down');
            e.parents('ul').children('li').removeClass('hidden').removeClass('open');
        }
    });
}
dashboard_menu();

//  progress  bar

function dashboard_progress()
{
    var line = new ProgressBar.Line('#p_gecikenler', {
        strokeWidth: 4,
        color: '#d65b4a',
        duration: 3000,
        easing: 'easeInOut',
        trailColor: '#eee',
        trailWidth: 1
    });

    line.animate(0.8);
}


// Wizard

function checkerChange()
{
    var state = document.getElementById($(this).attr('id')).checked,
        th = $(this).parent('div');
    if (!state)
    {
        th.next(".time").hide();
        th.parent().find(".break").css("display", "inline-block")
    }
    else
    {
        th.parent().find(".break").hide();
        th.parent().find(".time").css("display", "inline");
    }
}

function displayWorkSchedule()
{
    var checked = this.checked;
    if (!checked)
    {
        $(this).parent().siblings().eq(1).hide();
        $(this).parent().siblings().eq(2).css("display", "inline-block");
    }
    else
    {
        $(this).parent().siblings().eq(1).css("display", "inline-block");
        $(this).parent().siblings().eq(2).hide();
    }
}

function wizardPagesNextprev()
{
    if($(this).hasClass('next'))
    {
        var th = $(this).parents('div[data-role="wizard-pages"]');
        if(th.hasClass('page_1') || th.hasClass('page_2'))
        {
            th.removeClass('active').next().addClass('active');
            $('.wizard_left_side .pages').children('div.active').removeClass('active').next().addClass('active');
        }
    }
    else
    {
        var th = $(this).parents('div[data-role="wizard-pages"]');
        if(th.hasClass('page_2') || th.hasClass('page_3'))
        {
            th.removeClass('active').prev().addClass('active');
            $('.wizard_left_side .pages').children('div.active').removeClass('active').prev().addClass('active');
        }
    }
}


//  wizard slider

function wizard_slider()
{

    setTimeout(function(){

        var th = $('.wizard_slide.active'),
            dt = $('.wizard_slide_dots .active');

            th.removeClass('active');
            dt.removeClass('active');

            if(th.hasClass('s1') || th.hasClass('s2'))
            {
                th.next().addClass('active');
                dt.next().addClass('active');
            }
            else
            {
                $('.wizard_slide.s1').addClass('active');
                $('.wizard_slide_dots .d1').addClass('active');
            }
    }, 500);
}


// Profile progress

function profile_progress()
{
    var line = new ProgressBar.Line('#profile_p', {
        strokeWidth: 4,
        color: '#69cb9d',
        duration: 3000,
        easing: 'easeInOut',
        trailColor: '#eee',
        trailWidth: 3
    });

    line.animate(0.8);
}

// profile

function profile_search()
{
    $('#profile_search').unbind('click').click(function(){
        $(this).parent('div').children('div.src_input').fadeIn(300);
    });

    $('#profile_search_close').unbind('click').click(function(event) {
        $(this).parent('div.src_input').fadeOut(300);
    });
}
profile_search();

// Employee image cropt

function image_crop()
{
    $('.image-editor').cropit(
    {
        imageState: {
          src: '',
        },
        width: 235,
        height: 235,
    });

    $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
    });

    $('.image-select').click(function(){
        $(this).parents('div.image-editor').find('.cropit-image-input').click();
    });
}

function cordion()
{
    $('.cordion .cordion-item .cordion-header span').on('click', function(){
        $(this).parents('.cordion').children('.cordion-item').toggleClass('active');
    });
}
cordion();

function help()
{
    $('.help_panel .open_close').on('click', function(){
        $('.help_panel').toggleClass('open');
    });

    $('.help_panel_header a.close').on('click', function(){
        $('.help_panel').removeClass('open');
    });
}
help();

function help_mnu()
{
    $('.help_mnu li a.first-lvl').on('click', function(){
        $('.help_mnu li').removeClass('open');
        $('.help_mnu li ul a.mid-lvl').removeClass('active');
        $(this).parent().addClass('open');
    });

    $('.help_mnu li ul a.mid-lvl').on('click', function(){
        $(this).parent('li').parent('ul').find('a').removeClass('active');
        $(this).addClass('active');
    });
}
help_mnu();

function notification(name)
{
    $('.notification_wrapper[data-name="'+name+'"]').addClass('open');
}

function notificationCloseBtn()
{
    $('.notifi_close').on('click', function(){
        var ths = $(this);
        ths.parents('div.notification').removeClass('jackInTheBox').addClass('zoomOut');
        setTimeout(function(){
          ths.parents('div.notification_wrapper').removeClass('open');
          ths.parents('div.notification').removeClass('zoomOut').addClass('jackInTheBox');
        }, 500);

    });
}
notificationCloseBtn();

function inOutCheck()
{
    $('.inout .switch input').on('click', function(){
        var checked = this.checked;
        if (!checked)
        {
            $('#person-status-b').click();
            $(this).parent().next().text('Gəlməyib');
        }
        else
        {
            $(this).parent().next().text('Gəlib');
        }
    });
}
inOutCheck();

function taskNotifyTimeSet()
{
    $( 'span[role-action="taskModal"]' ).on( 'click' , function(event)
    {
        if($(event.target).hasClass('fa-bell-o'))
        {
            // You can take tr id and send AJAX query to base, and insert to template values from ajax result

            var tmpl = '<div class="customTaskModalContent">' +
                            '<div class="row">' +
                                '<div class="col-6">' +
                                    '<div class="round-input-label">' +
                                        '<label>Bildiriş tarixi</label>' +
                                        '<input type="text" class="form-control input-date">' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-5">' +
                                    '<div class="round-input-label">' +
                                        '<label>Bildiriş vaxtı</label>' +
                                        '<input type="time" class="form-control">' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-1">' +
                                    '<a href="javascript:;" role-action="closeTaskModal">' +
                                        '<i class="fa fa-times"></i>' +
                                    '</a>' +
                                    '<button class="btn btn-danger" role-action="saveTaskModal">' +
                                        '<i class="fa fa-save"></i>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

            // First look for other opened modals and remove it

            $( '.customTaskModalContent' ).remove();

            // After append this modal

            $(this).append(tmpl)

            // Add function to inner elements
            // Enable input datepicker

            $('.input-date').datepicker({
                format : 'dd-mm-yyyy',
                language: "az",
                todayHighlight: true,
                autoclose: true
            });

            // This close button
            $( '.customTaskModalContent a[role-action="closeTaskModal"]').on('click' , function()
            {
                $( '.customTaskModalContent' ).remove();
            });

            // This save button
            $( '.customTaskModalContent button[role-action="saveTaskModal"]').on('click' , function()
            {
                alert('save true');

                // You can close all after save if you wanna
                // $( '.customTaskModalContent' ).remove();
            });

        }
    });
}

taskNotifyTimeSet();

function emptyContentCloseBtn()
{
    $( '.emptyContent_close' ).on( 'click' , function() {
        var ths = $( this );
        ths.parents( 'div.emptyContent' ).removeClass( 'zoomInDown' ).addClass( 'zoomOut' );
        setTimeout( function() {
            ths.parents( 'div.emptyContent_wrapper' ).removeClass( 'open' );
            ths.parents( 'div.emptyContent' ).removeClass( 'zoomOut' ).addClass( 'zoomInDown' );
        } , 500 );

    } );
}

emptyContentCloseBtn();


function call_type()
{
    $('input[name="call_type"]').click(function()
    {
        if($(this).attr('value')==2)
        {
            $('.arwon').fadeIn(300);
        }
        else
        {
            $('.arwon').fadeOut(300);
        }
    });
}
call_type();
