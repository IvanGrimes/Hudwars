var jquery = require('jquery');

$(document).ready(function(){
	$(window).on("resize", function () {
		//set height to chat__message-area

		$('.chat__message-area').css('height', 'auto');

		var windowWidth = $(window).width(),
			setH = ($(document).height() - $('body').height()) + ($('.sidebar--left').height() - $('.menu').height());

		if (windowWidth > 1550) {
			$('.chat__message-area').css('height', setH - 205);
		} else if (windowWidth <= 1180 && windowWidth > 785) {
			$('.chat__message-area').css('height', 518);
		} else {
			$('.chat__message-area').css('height', setH);
		}
	}).resize();

	$('.chat__message-form').on('submit', function(){
		var message = document.getElementById('chat__input'),
			date = new Date(),
			avatar = "img/avatar.jpg",
			username = "Sweetgirl",
			text = message.value,
			time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
			getAllMessages = document.getElementsByClassName('chat__message');

		// shitty :(( new message template
		$('.chat__message-area').append(
			'<div class="chat__message"><img class="chat__message--avatar" src="' + avatar + '" alt=""><div class="chat__message--content"><div class="chat__message--info"><span class="chat__message--username">' + username + '</span><span class="chat__message--time">' + time + '</span></div><div class="chat__message--text"><p>' + text + '</p></div></div>'
		);

		// autoscroll to the last message
		$(() => {
			var chatArea = $('.chat__message-area'),
				scrollHeight = chatArea[0].scrollHeight;
			chatArea.scrollTop(scrollHeight);
		});

		return false;
	});


	let players = document.getElementsByClassName('player'),
		hp = [100, 73, 32, 0 , 100, 0, 81, 91, 26, 82],
		armor = [34, 10, 5, 0 , 100, 0, 31, 0, 20, 12];

	// get hp/armor through ajax into array, also possible do it through adding data-armor/data-hp to the html tag player
	function setArmor() {
		for (var i = 0; i < players.length; i++) {
			$(players[i]).find('.player__stats--hp').css('height', hp[i] + '%');
			$(players[i]).find('.player__stats--armor').css('height', armor[i] + '%');

			if (armor[i] === 100) {
				if (!$(players[i]).hasClass('player__utils--display')) {
					$(players[i]).find('.player__utils--armor--icon').addClass('player__utils--display');
				}
				$(players[i]).find('.player__utils--armor--icon').find('use').attr('xlink:href', '#armorfull');
			} else if (armor[i] <= 99 && armor[i] !== 0) {
				if (!$(players[i]).hasClass('player__utils--display')) {
					$(players[i]).find('.player__utils--armor--icon').addClass('player__utils--display');
				}
				$(players[i]).find('.player__utils--armor--icon').find('use').attr('xlink:href', '#armordamaged');
			} else {
				$(players[i]).find('.player__utils--armor--icon').removeClass('player__utils--display');
			}
		}
	}
	setArmor();
});
