'use strict';

(function($){
	var spinner = '<i class="fa fa-spinner fa-spin fa-5x fa-fw"></i><span class="sr-only">Loading...</span>';

	$('#show_latest').on('click', function( event ) {
		// Clean the element wrapper and append the Font Awesome Wrapper
		$('#entries').html(spinner);
		$.post( "content.php", { show: true })
			.done(function( data ) {
				var parsed = JSON.parse( data );
				// Clean the spinner
				$('#entries').html('');
				$.each(parsed, function(i) {
					var wrapper = $('<div class="panel panel-default" />');
					var title = $('<div class="panel-heading"><a href="' + parsed[i].link + '" target="_blank"><h3 class="panel-title">' + parsed[i].title + '</h3></a></div>').appendTo(wrapper);
					var content = $('<div class="panel-body"></div>').appendTo(wrapper);
					if ( parsed[i].video !== null ) {
						var subtitle = $('<div class="well"><p>' + parsed[i].subtitle + '</p><object style="height: 385px;;display:block;" class="" id="' + parsed[i].video + '" name="' + parsed[i].video + '" data="http://k.uecdn.es/index.php/kwidget/wid/_110/uiconf_id/8705176/entry_id/' + parsed[i].video + '" type="application/x-shockwave-flash"><param name="movie" value="http://k.uecdn.es/index.php/kwidget/wid/_110/uiconf_id/8705176/entry_id/' + parsed[i].video + '"><param name="flashvars" value="&amp;siteCatalyst15.incremental=marcatv&amp;siteCatalyst15.incrementalCounter=0&amp;siteCatalyst15.path=%2Fflash%2Fkdp3%2FSC15%2FsiteCatalyst15Plugin_emtv7.swf&amp;doubleclick.plugin=true&amp;doubleclick.adTagUrlPre=http%3A%2F%2Fpubads.g.doubleclick.net%2Fgampad%2Fads%3Fsz%3D640x360%26iu%3D%2F99071977%2Fmc2%2Fmarca_videocort_marca-tv%26ciu_szs%26impl%3Ds%26gdfp_req%3D1%26env%3Dvp%26output%3Dvast%26unviewed_position_start%3D1%26url%3D%5Breferrer_url%5D%26description_url%3Dhttp%253A%252F%252Fvideos.marca.com%252Fv%252F0_yeiv6xp0-neymar-empujo-a-ruben-vezo-por-las-escaleras-del-tunel-de-vestuarios%26correlator%3D%5Btimestamp%5D%26cust_params%3Dp%253Dpreroll%2526t%253Dfutbol&amp;doubleclick.numPreroll=1&amp;doubleclick.preSequence=1&amp;doubleclick.adTagUrlPost=&amp;doubleclick.numPostroll=0&amp;doubleclick.postSequence=0&amp;autoPlay=true&amp;autoMute=false"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowNetworking" value="all"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"></object></div>').appendTo(content);
					} else {
						var subtitle = $('<div class="well"><span class="media-left"><img src="' + parsed[i].thumbnail + '"></span><div class="media-body">' + parsed[i].subtitle + '</div></div>').appendTo(content);
					}
					// Create the categories
					var labels = $('<h5 />').appendTo(content);
					$.each(parsed[i].categories, function(ic) {
						var label = $('<span class="label label-default">' + parsed[i].categories[ic] + '</span>').appendTo(labels);
					});
					var read_more = $('<p><a href="' + parsed[i].link + '" target="_blank" class="pull-right">Leer más...</a></p>').appendTo(content);
					$('#entries').append(wrapper);
				});
			})
			.fail(function( error ) {
				console.error( error );
				$('#entries').html('Ha ocurrido un error.');
			});
	});
})(jQuery);