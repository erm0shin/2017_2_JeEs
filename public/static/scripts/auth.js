'use strict';

authForm.addEventListener('submit', event => {
	event.preventDefault();
	console.log(authForm.elements);
	const email = authForm.elements['email'].value;
	const username = authForm.elements['username'].value;

	auth(username, email, (err, resp) => {
		if (err) {
			return alert(`AUTH Error: ${err.status}`);
		}
		usernameDiv.textContent = username;
		authorizedBlock.hidden = false;
		unauthorizedBlock.hidden = true;
		authForm.reset();
		authForm.parentElement.parentElement.hidden = true;
		main.hidden = false;
	});
});

function auth(username, email, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/auth', true);
	xhr.withCredentials = true;

	const user = {username, email};
	const body = JSON.stringify(user);

	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) return;
		if (+xhr.status !== 200) {
			return callback(xhr, null);
		}

		const response = JSON.parse(xhr.responseText);
		callback(null, response);
	};

	xhr.send(body);
}