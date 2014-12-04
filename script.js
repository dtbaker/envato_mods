/*
 * Copyright (c) 2014 
 * Author: dtbaker
 *
 */
// ==UserScript==
// @name			Mod Tools for the Envato Market
// @creator			dtbaker@gmail.com
// @namespace		dtbaker.net
// @description		Mod Tools for the Envato Market.
// @date			2014-11-17
// @version			1.0.1
// @include			http://activeden.net*
// @include			http://audiojungle.net*
// @include			http://themeforest.net*
// @include			http://videohive.net*
// @include			http://graphicriver.net*
// @include			http://3docean.net*
// @include			http://codecanyon.net*
// @include			http://photodune.net*
// ==/UserScript==

(function () {

	/*
	insert the the bootstrap of dbp
	*/
	
	var inject = document.createElement("script");
	inject.setAttribute("type", "text/javascript");
    var mod_tools_base_uri = chrome.extension.getURL('');
    // this injects some code into the browser window along with the bootstrap.js extension file (from our desired loading location above)
    var actualCode = ['window.dtbaker_mod_tools = window.dtbaker_mod_tools || {};',"window.dtbaker_mod_tools['base'] = '" +  mod_tools_base_uri + "'; "].join('\n');
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head||document.documentElement).appendChild(script);
    inject.setAttribute("src", mod_tools_base_uri + 'bootstrap.js');
	(document.head || document.documentElement).appendChild(inject);
	

})();