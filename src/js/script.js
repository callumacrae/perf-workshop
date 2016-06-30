var thumbs = document.querySelectorAll('.carousel__thumb');
var main = document.querySelector('.carousel__image');

for (var i = 0; i < thumbs.length; i++) {
	thumbs[i].addEventListener('click', function () {
		main.src = this.dataset.src;
	});
}
