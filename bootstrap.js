/*
 * Copyright (c) 2014 
 * Author: dtbaker
 *
 */
(function () {

	//"use strict"

	var version = '1.0.1',
		cookiePrefix = 'emods_';
	
	if( typeof jQuery != 'undefined' ){
		go();
		return;
	}
	
	yepnope({
		load: [
			"http://0.envato-static.com/assets/application/vendor-2b538c3f97134712a085fc58f4c396f5.js" 
		],
		complete: go
	});
		
	function go(){
	
		var username = $('#user_username').html();
		var loadit = [];
		var storage;
		if(!username) return false;
        //console.log(window.dtbaker_mod_tools);
		window.dtbaker_mod_tools = window.dtbaker_mod_tools || {};
		window.dtbaker_mod_tools['user'] = username;
		
		try{
			window.dtbaker_mod_tools['storage'] = $.parseJSON(localStorage.getItem('dtbaker_mod_tools'));
			if(!window.dtbaker_mod_tools['storage']) {
				window.dtbaker_mod_tools['storage'] = {};
				save('firstvisit', true);
			}
		}catch (e) {
			window.dtbaker_mod_tools['storage'] = {};
		}
		window.dtbaker_mod_tools.set = function(extension, name, value){
			var obj = localStorage[extension] ? $.parseJSON(localStorage[extension]) : {};
			obj[name] = value;
			localStorage.setItem(extension, JSON.stringify(obj));
		};
		
		window.dtbaker_mod_tools.get = function(extension, name){
			var obj = localStorage[extension] || false;
			if(!obj) return '';
			obj = $.parseJSON(obj);
			return (obj[name]) ? obj[name] : '';
		};
		
		window.dtbaker_mod_tools.delete = function(extension, name){
			if(!name){
				localStorage.removeItem(extension);
			}else{
				var obj = localStorage[extension] ? $.parseJSON(localStorage[extension]) : {};
				if(obj[name]){
					delete(obj[name]);
					localStorage.setItem(extension, JSON.stringify(obj));
				}
			}
			
		};
		
		window.dtbaker_mod_tools.setCookie = function(cookieName, value, daysToExpire, path, domain, secure) {
			var expiryDate;
			
			cookieName = cookiePrefix + cookieName;
		
			if (daysToExpire) {
				expiryDate = new Date();
				expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 8.64e7));
			}
		
			document.cookie = cookieName + '=' + (value.toString()) +
			(daysToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
			';path=' + (path ? path : '/') +
			(domain ? ';domain=' + domain : '') +
			(secure ? ';secure' : '');
			return window.dtbaker_mod_tools.getCookie(cookieName);
		};
	
		window.dtbaker_mod_tools.getCookie = function(cookieName) {
			cookieName = cookiePrefix + cookieName;
			var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
				cookieMatch = cookiePattern.exec(document.cookie);
				if(cookieMatch){
					return cookieMatch[2];
				}
				return 0;
		};
		
		window.dtbaker_mod_tools.deleteCookie = function(cookieName) {
			return window.dtbaker_mod_tools.setCookie(cookieName, 0, -1);
		};

			//Forum page
		if (location.href.match(/^http:\/\/([\.a-z3]+)\.(net|com)\/forums/)) {
			enque('disabled_threads');
		}
		if (location.href.match(/^http:\/\/([\.a-z3]+)\.(net|com)\/forums\/thread/)) {
			enque('waiting_moderation');
		}
		//everywhere;
		//enque('notification');

		load(function(){
			console.log('Thanks for using dtbaker mod tools!');
		});
	
	
		function enque(plugin){

			loadit.push(plugin);

		}
		
		function load(callback){
		
			if(!loadit.length) return false;
			
			loadit.sort();
			var url = window.dtbaker_mod_tools['base']+'plugins/';

            var script_count = 0;
			for(var item in loadit){
                script_count++;
				console.log('mod tools: ' + loadit[item]+' loaded!');
                var plugin_url = url + loadit[item] + '.js?v=' + version;

                console.log("Loading script: "+script_count + " url: " + plugin_url);
                $.ajax({
                    url: plugin_url,
                    dataType: "script",
                    success: function(){
                        script_count--;
                        console.log("Left to load: "+script_count);
                        if(script_count<=0){
                            // we've loaded all scripts completely... run our callback
                            callback();
                        }
                    },
                    cache: true
                });
			}

			
		}
		



		function save(setting, value){
			var settings = window.dtbaker_mod_tools.storage || {};
			settings[setting] = value;
			localStorage.setItem('dtbaker_mod_tools', JSON.stringify(settings));
			
			window.dtbaker_mod_tools.storage = settings;
			
			return window.dtbaker_mod_tools.storage[setting] == value;
			
		}
		
		function get(setting, fallback){
			return window.dtbaker_mod_tools.storage[setting] ? window.dtbaker_mod_tools.storage[setting] : fallback;
		}
		
	}

})();