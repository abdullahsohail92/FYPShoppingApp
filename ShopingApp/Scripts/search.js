(function($) {
	var init = function(options) {

		var suggestion = function(data) {
			var searchBox = $(self[0]).parent().find('.result ul')[0];
			$(searchBox).find('li').remove();
			if (data.length > 0) {
				$(self).parent().find('.result').addClass('open');
			}
			for (suggest in data) {
				var li = document.createElement('li');
				$(li).html(data[suggest]['value']);
				$(li).attr('data',data[suggest]['keys']);
				$(searchBox).append(li);
			}

			$(searchBox).find('li').click(function(e) {
				$(self[0]).val($(this).html());

				$(self[0]).parent().find('.result').removeClass('open');
				var resultpath = (options.hasOwnProperty('result') ? options['result'] : '/search');
				var keys =$(this).attr('data').replace(/,/g,"&key=");
				window.location.href = encodeURI(resultpath + '?key=' + keys);
			});

		};

		var error = function(e) {
			var searchBox = $(self[0]).parent().find('.result');
			searchBox.addClass('open');
			searchBox.html('<span class="error">No data found!</span>');
		};

		var query = function(self, query) {
			var opt = options;
			$.ajax({
				url : opt.url + "?q=" + query,
				dataType : 'json',
				error : error
			}).done(suggestion);

		};

		var self = $(this);
		if (self.length > 0) {
			var suggestionHolder = document.createElement('div');
			$(suggestionHolder).addClass('result');
			var ul = document.createElement('ul');
			$(suggestionHolder).append(ul);
			self.parent().append(suggestionHolder);
			self.keyup(function(e) {
				console.log(self);
				var q = self.val();
				var minLength = (options.hasOwnProperty('minLength') ? options['minLength'] : 0);
				if (q.length >= minLength) {
					query(self, q);
				}
			});
		}
	};
	$.fn.search = init;

})(jQuery);
