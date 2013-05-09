var Modale = (function ($) {
	function Modale($modale, options) {
		this.$modale = $modale;
	}

	Modale.prototype.applyMargins = function () {
		this.$modale.css({
			'margin-left': '-' + Math.round(this.$modale.width()/2) + 'px',
			'margin-top': '-' + Math.round(this.$modale.height()/2) + 'px'
		});
	}

	Modale.prototype.show = function () {
		this.$modale.fadeIn(500);
	}

	Modale.protype.wrap = function () {
		// this.$wrapper = $('<div class="modale-wrapper').insertAfter(this.$modale);
	}

	return Modale;
})(jQuery);

(function($) {
	$.fn.modale = function() {
		var modale = new Modale($(this));
		modale.applyMargins();
		modale.show();
	};

	$('.modale-trigger').on('click', function (event) {
		event.preventDefault();
		$('#' + $(this).data('modaleId') + '.modale').modale();
	});
})(jQuery);