
(function () {

    //Load styles
	$('head').append('<link type="text/css" rel="stylesheet" href="'+window.dtbaker_mod_tools.base + 'css/disabled_threads.css" />');

    $('.thread__title:contains("Disabled")').each(function(){
        $(this).parents('.thread').first().addClass('thread_disabled');
    });


})();