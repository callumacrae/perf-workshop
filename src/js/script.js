var $ = require('jquery');

$(function () {
	$('.carousel__thumb').on('click', function () {
		$('.carousel__image').attr('src', $(this).attr('src'));
	});
});
