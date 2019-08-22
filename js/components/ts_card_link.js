/**
 * @file
 *
 * TS Grid Card Link custom JS. Avoids duplicate links - for accessibility.
 */

export default function(context) {
	// // Alias global jQuery object.
	const $ = jQuery;
	if (context == document) {
		$("div[data-href]:not([data-href=\"\"])", context).each(function () {
			$(this).click(function (e) {
				if ($(e.target).closest('[data-contextual-id]').length) {
					return;
				}
				window.location.href = $(this).attr('data-href');
			});
		});
		$('div[data-href-target][data-href-trigger]', context).once('ts-grid-card-link').each(function () {
			var $parent = $(this);
			$parent.find($(this).attr('data-href-trigger')).on('click', function () {
				window.location.href = $parent.find($parent.attr('data-href-target')).attr('href');
			});
		});
	}
}
