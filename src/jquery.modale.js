var Modale = (function ($) {
	function Modale($wrapper, options) {
		this.$wrapper = $wrapper.filter('.modale-wrapper').eq(0);
		this.$modal = this.$wrapper.children('.modale').eq(0);
		this.$header = this.$modal.children('.modale-header').eq(0);
		this.$content = this.$modal.children('.modale-content').eq(0);
		this.$footer = this.$modal.children('.modale-footer').eq(0);

		var inline = this.parseDataAttributes();
		var defaults = {
			fadeIn: 500,
			fadeOut: 500,
			overlay: true,
			opacity: 0.5
		};
		this.settings = $.extend({}, defaults, options, inline);
	}

	Modale.prototype.bind = function () {
		var that = this;

		this.$wrapper.on('modale-show', function () {
			that.show();
		});

		this.$modal.find('.modale-hide').on('click', function (event) {
			event.preventDefault();
			that.hide();
		});
	}

	Modale.prototype.addOverlay = function () {
		this.$overlay = $('<div class="modale-overlay"></div>').insertBefore(this.$modal);
		this.$overlay.css('opacity', this.settings.opacity);
	}

	Modale.prototype.applyHeights = function () {
		this.$content.height((this.$modal.height() - this.$header.height() - this.$footer.height()) + 'px');
	}

	Modale.prototype.applyMargins = function () {
		this.$modal.css({
			'margin-left': '-' + Math.round(this.$modal.width()/2) + 'px',
			'margin-top': '-' + Math.round(this.$modal.height()/2) + 'px'
		});
	}

	Modale.prototype.hide = function () {
		this.$wrapper.fadeOut(this.settings.fadeOut);
	}

	Modale.prototype.init = function () {
		this.bind();
		this.applyMargins();
		this.applyHeights();
		if (this.settings.overlay) this.addOverlay();
	}

	Modale.prototype.parseDataAttributes = function () {
		return this.$modal.data();
	}

	Modale.prototype.show = function () {
		this.$wrapper.fadeIn(this.settings.fadeIn);
	}

	return Modale;
})(jQuery);

(function($) {
	$.fn.modale = function() {
		var modale = new Modale($(this), { opacity: 0.6 });
		modale.init();
		return this;
	};

	$('.modale-trigger').each(function () {
		var $trigger = $(this);
		var $wrapper = $('#' + $trigger.data('modaleId')).modale();

		$trigger.on('click', function (event) {
			event.preventDefault();
			$wrapper.trigger('modale-show');
		});
	});
})(jQuery);