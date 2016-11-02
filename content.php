<?php
// Enable: Allow URL FOpen
ini_set('allow_url_fopen',1);
// If is a POST request
if ( isset( $_POST['show'] ) ) {
	$url = "http://estaticos.marca.com/rss/futbol/primera-division.xml";
	$entries = array();
	$iterator = 0;
	$limit = 20;
	$content = NULL;
	
	// Get the content of the XML
	if( ini_get('allow_url_fopen') ) {
		$content = file_get_contents( $url );
	} else {
		$ch = curl_init();
		curl_setopt ($ch, CURLOPT_URL, $url);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
		$content = curl_exec($ch);
	}
	// Parse XML to PHP Object
	$xml = new SimpleXmlElement($content);
	foreach($xml->channel->item as $entry) {
		if ( $iterator < $limit ) {
			// Cast CDATA to string
			$entries[$iterator] = array(
				'title' => (string) $entry->title,
				'subtitle' => strip_tags( (string) $entry->children('media', true)->title ),
				'link' => (string) $entry->link,
				'description' => substr( strip_tags( (string) $entry->children('media', true)->description ), 0, 120 ),
				'thumbnail' => (string) $entry->children('media', true)->thumbnail->attributes()->url,
				'pubDate' => (string) $entry->pubDate,
				'categories' => array(),
				'video' => null
			);
			// Get video if any
			if ( isset( $entry->children('media', true)->content ) ) {
				foreach($entry->children('media', true)->content as $content) {
					switch ( (string) $content->attributes()->type ) {
						case 'videofile':
							$entries[$iterator]['video'] = (string) $content->attributes()->idKaltura;
							break;
					}
				}
			}
			// Get all categories
			foreach($entry->category as $category) {
				$entries[$iterator]['categories'][] = (string) $category;
			}
		}
		$iterator++;
	}
	// Return as a JSON
	echo json_encode( $entries );	
}
?>