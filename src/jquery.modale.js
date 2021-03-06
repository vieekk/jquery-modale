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
		this.$wrapper.on('modale-show', function () { that.show(); });
		this.$wrapper.on('modale-hide', function () { that.hide(); });
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
		var height = this.$modal.height() - this.$header.outerHeight() - this.$footer.outerHeight() + 'px';
		this.$content.css({
			'height': height,
			'max-height': height
		});
	}

	Modale.prototype.applyMargins = function () {
		var top = '-' + Math.round(this.$modal.height()/2) + 'px';
		var left = '-' + Math.round(this.$modal.width()/2) + 'px';
		this.$modal.css({
			'margin-top': top,
			'margin-left': left
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