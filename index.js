let currentCode;

function toggleLogin(type) {
	const accountForm = document.getElementById('account-login-form');
	const phoneForm = document.getElementById('phone-login-form');
	const registerForm = document.getElementById('register-form');
	const accountToggle = document.getElementById('account-login-toggle');
	const phoneToggle = document.getElementById('phone-login-toggle');
	const registerToggle = document.getElementById('register-toggle');

	accountForm.style.display = type === 'account' ? 'block' : 'none';
	phoneForm.style.display = type === 'phone' ? 'block' : 'none';
	registerForm.style.display = type === 'register' ? 'block' : 'none';

	accountToggle.classList.toggle('active', type === 'account');
	phoneToggle.classList.toggle('active', type === 'phone');
	registerToggle.classList.toggle('active', type === 'register');
}

function sendCode() {
	const phoneNumber = document.getElementById('phone-number').value;
	const phoneError = document.getElementById('phone-error');
	const phonePattern = /^1[3-9]\d{9}$/;

	if (!phoneNumber) {
		phoneError.textContent = "请输入手机号";
		phoneError.style.display = "block";
		return;
	}

	if (!phonePattern.test(phoneNumber)) {
		phoneError.textContent = "手机号格式错误";
		phoneError.style.display = "block";
		return;
	}

	phoneError.style.display = "none";
	currentCode = Math.floor(1000 + Math.random() * 9000);
	alert("验证码已发送: " + currentCode);
}

function handleAccountLogin(event) {
	event.preventDefault();
	const username = document.getElementById('login-username').value;
	const password = document.getElementById('login-password').value;
	const accountError = document.getElementById('account-error');

	if (username === '2975685613@qq.com' && password === '123456') {
		accountError.style.display = "none";
		showModal("登录成功！");
		setTimeout(() => {
			window.location.href = "zhuye.html";
		}, 1000);
	} else {
		accountError.textContent = "用户名或密码错误";
		accountError.style.display = "block";
	}
}

function handlePhoneLogin(event) {
	event.preventDefault();
	const phoneCode = document.getElementById('phone-code').value;
	const phoneError = document.getElementById('phone-error');

	if (phoneCode == currentCode) {
		phoneError.style.display = "none";
		showModal("登录成功！");
		setTimeout(() => {
			window.location.href = "zhuye.html";
		}, 1000);
	} else {
		phoneError.textContent = "验证码错误";
		phoneError.style.display = "block";
	}
}

function sendRegisterCode() {
	const email = document.getElementById('register-email').value;
	const registerError = document.getElementById('register-error');
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!email) {
		registerError.textContent = "请输入邮箱";
		registerError.style.display = "block";
		return;
	}

	if (!emailPattern.test(email)) {
		registerError.textContent = "邮箱格式错误";
		registerError.style.display = "block";
		return;
	}

	registerError.style.display = "none";
	currentCode = Math.floor(1000 + Math.random() * 9000);
	alert("验证码已发送到邮箱: " + currentCode);
}

function handleRegister(event) {
	event.preventDefault();
	const username = document.getElementById('register-username').value;
	const email = document.getElementById('register-email').value;
	const password = document.getElementById('register-password').value;
	const registerCode = document.getElementById('register-code').value;
	const registerError = document.getElementById('register-error');
	const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	if (!username || !email || !password) {
		registerError.textContent = "请填写所有字段";
		registerError.style.display = "block";
		return;
	}

	if (!passwordPattern.test(password)) {
		registerError.textContent = "密码至少包含8个字符，包括一个大写字母、一个小写字母和一个数字";
		registerError.style.display = "block";
		return;
	}

	if (registerCode != currentCode) {
		registerError.textContent = "验证码错误";
		registerError.style.display = "block";
		return;
	}

	registerError.style.display = "none";
	showModal("注册成功！");
	setTimeout(() => {
		window.location.href = "zhuye.html";
	}, 1000);
}

function showModal(message) {
	const modal = document.getElementById('successModal');
	const modalMessage = document.getElementById('modal-message');
	modalMessage.textContent = message;
	modal.style.display = "flex";
}

function closeModal() {
	const modal = document.getElementById('successModal');
	modal.style.display = "none";
}
