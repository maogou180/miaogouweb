document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.getElementById('loginForm');

	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		// Here you would typically send the login data to a server
		console.log('Login attempted with:', email, password);

		// For demonstration, we'll just show an alert
		alert('Login attempt registered. Check console for details.');
	});
});
