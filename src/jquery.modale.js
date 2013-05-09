var Modale = (function ($) {
	function Modale($wrapper, options) {
		this.$wrapper = $wrapper.filter('.modale-wrapper').eq(0);
		this.$modale = this.$wrapper.children('.modale').eq(0);
		this.$header = this.$modale.children('.modale-header').eq(0);
		this.$content = this.$modale.children('.modale-content').eq(0);
		this.$footer = this.$modale.children('.modale-footer').eq(0);

		var defaults = {
			overlay: true,
			opacity: 0.5
		};
		this.settings = $.extend({}, defaults, options);
	}

	Modale.prototype.bind = function () {
		var that = this;
		this.$modale.find('.modale-hide').on('click', function (event) {
			event.preventDefault();
			that.hide();
		});
	}

	Modale.prototype.addOverlay = function () {
		this.$overlay = $('<div class="modale-overlay"></div>').insertBefore(this.$modale);
		this.$overlay.css('opacity', this.settings.opacity);
	}

	Modale.prototype.applyCss = function () {
		this.$content.height((this.$modale.height() - this.$header.height() - this.$footer.height()) + 'px');
	}

	Modale.prototype.applyMargins = function () {
		this.$modale.css({
			'margin-left': '-' + Math.round(this.$modale.width()/2) + 'px',
			'margin-top': '-' + Math.round(this.$modale.height()/2) + 'px'
		});
	}

	Modale.prototype.hide = function () {
		this.$wrapper.fadeOut(500);
	}

	Modale.prototype.init = function () {
		this.bind();
		this.applyMargins();
		this.applyCss();
		if (this.settings.overlay) this.addOverlay();
		this.show();
	}

	Modale.prototype.show = function () {
		this.$wrapper.fadeIn(500);
	}

	return Modale;
})(jQuery);

(function($) {
	$.fn.modale = function() {
		var modale = new Modale($(this));
		modale.init();
	};

	$('.modale-trigger').on('click', function (event) {
		event.preventDefault();
		$('#' + $(this).data('modaleId') + '.modale-wrapper').modale();
	});
})(jQuery);