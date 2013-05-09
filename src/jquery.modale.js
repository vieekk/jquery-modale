var Modale = (function ($) {
	function Modale($wrapper, options) {
		this.$wrapper = $wrapper.filter('.modale-wrapper').eq(0);
		this.$modale = this.$wrapper.children('.modale').eq(0);

		var defaults = {
			overlay: true,
			opacity: 0.5
		};
		this.settings = $.extend({}, defaults, options);

		this.applyMargins();
		this.show();
		if (this.settings.overlay) this.addOverlay();
	}

	Modale.prototype.addOverlay = function () {
		this.$overlay = $('<div class="modale-overlay"></div>').insertBefore(this.$modale);
		this.$overlay.css('opacity', this.settings.opacity);
	}

	Modale.prototype.applyMargins = function () {
		this.$modale.css({
			'margin-left': '-' + Math.round(this.$modale.width()/2) + 'px',
			'margin-top': '-' + Math.round(this.$modale.height()/2) + 'px'
		});
	}

	Modale.prototype.show = function () {
		this.$wrapper.fadeIn(500);
	}

	return Modale;
})(jQuery);

(function($) {
	$.fn.modale = function() {
		new Modale($(this));
	};

	$('.modale-trigger').on('click', function (event) {
		event.preventDefault();
		$('#' + $(this).data('modaleId') + '.modale-wrapper').modale();
	});
})(jQuery);