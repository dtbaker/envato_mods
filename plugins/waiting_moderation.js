
(function () {

    //Load styles
	$('head').append('<link type="text/css" rel="stylesheet" href="'+window.dtbaker_mod_tools.base + 'css/waiting_moderation.css" />');
	$('head').append('<script src="//dmypbau5frl9g.cloudfront.net/assets/market/pages/default/additional_scripts/admin/index-8e98f48fff767e541c3a50b07c171333.js" type="text/javascript"></script>');

    $('.user-post__edit-container:contains("This forum message is waiting for moderation")').each(function(){
        var $thread = $(this).parents('.user-post').first();
        $thread.addClass('waiting_moderation');
        var message_id = $thread.find('.user-post__post').attr('id').replace('message_content_','');

        // remove the duplicate text.
        var divs = $(this).find('div');
        $(this).html('');
        $(this).append('<div class="thread_mod_panel" id="thread_mod_panel_'+message_id+'">' +
        '<div class="box--topbar"> <h2>This forum message is waiting for moderation</h2> </div>' +
        '<div class="thread_mod_actions">Mod Tools Loading...</div>' +
        '</div>');
        $(this).append(divs);
        load_mod_actions(message_id,1);
    });

    var admin_community = get('html_admin_community','');

    function load_mod_actions(message_id,attempt_number){
        //amp;message_id=547071#547071
        if(message_id){
            // grab the mod tools cache and check if this message ID exists here.
            // if it doesn't exist (or the cache doesnt exist) we grab the /admin/community page again.
            if(!admin_community && attempt_number == 1){
                get_admin_community(function(){
                    load_mod_actions(message_id,attempt_number+1);
                });
            }else {
                console.log('mod tools: admin/community from cache');

                var $ac = $(admin_community);
                $("a[href*='message_id=" + message_id + "']", $ac).each(function () {
                    // found the "view in context" link for this flagged comment.
                    var $p = $('#thread_mod_panel_' + message_id + ' .thread_mod_actions');
                    $p.html('');
                    $p.append($(this).parents('.complaints').find('.detail'));
                    $p.append($(this).parents('.complaints').find('.complaint'));
                    $p.append($(this).parent());
                });
            }
        }
    }
    function get_admin_community(callback){
        $.ajax('/admin/community', {
			type: 'GET',
			cache: false,
			success: function (d) {
                console.log("mod tools: admin/community loaded successfully");
				save('html_admin_community',d);
                admin_community = d;
                callback();
			},
			error: function (d) {
				alert('Failed to load admin/community page..')
			}
		});
    }

    function save(setting, value){
        localStorage.setItem('dtbaker_mod_'+setting,value);
    }

    function get(setting, fallback){
        var v = localStorage.getItem('dtbaker_mod_'+setting);
        if(!v)return fallback;
        return v;
    }

})();