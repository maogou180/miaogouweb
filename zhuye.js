// 商品数据
const products = [{
		id: 1,
		name: "时尚T恤",
		price: 99.00,
		image: "img/img9.jpg",
		description: "舒适透气的纯棉T恤，多种颜色可选。"
	},
	{
		id: 2,
		name: "智能手表",
		price: 599.00,
		image: "img/img10.jpg",
		description: "支持心率监测、运动追踪等多种功能。"
	},
	{
		id: 3,
		name: "护肤套装",
		price: 299.00,
		image: "img/img11.jpg",
		description: "温和不刺激，适合各种肤质。"
	},
	{
		id: 4,
		name: "无线耳机",
		price: 399.00,
		image: "img/img12.jpg",
		description: "高音质，长续航，舒适佩戴。"
	},
	{
		id: 5,
		name: "运动鞋",
		price: 499.00,
		image: "img/img13.jpg",
		description: "轻便透气，适合各种运动场景。"
	},
	{
		id: 6,
		name: "智能音箱",
		price: 299.00,
		image: "img/img14.jpg",
		description: "智能语音控制，高品质音响体验。"
	},
	{
		id: 7,
		name: "平板电脑",
		price: 1999.00,
		image: "img/img15.jpg",
		description: "轻薄便携，性能强劲，适合工作和娱乐。"
	},
	{
		id: 8,
		name: "咖啡机",
		price: 799.00,
		image: "img/img16.jpg",
		description: "一键制作多种咖啡，享受咖啡馆级口感。"
	}
];

// 购物车
let cart = [];

// 轮播图功能
const carousel = document.querySelector('.carousel');
const carouselImages = carousel.querySelectorAll('img');
const carouselButtons = carousel.querySelectorAll('.carousel-nav button');
let currentIndex = 0;


// 获取轮播图中的所有图片
carouselImages.forEach(image => {
	// 为每张图片添加点击事件
	image.addEventListener('click', () => {
		const url = image.dataset.url; // 获取数据属性中的链接
		window.location.href = url; // 跳转到对应的页面
	});
});

function searchProduct() {
	// 获取输入框的值（可选，根据需要处理）
	var searchTerm = document.getElementById('search-input').value;
	// 构造跳转链接（如果需要将搜索词传递给下一个页面，可以加上参数）
	var url = 'sousuo.html';
	// 可以选择在URL中附加搜索词，例如: 'sousuo.html?query=' + encodeURIComponent(searchTerm)
	window.location.href = url; // 跳转到sousuo.html
}

function showImage(index) {
	carouselImages.forEach(img => img.classList.remove('active'));
	carouselButtons.forEach(btn => btn.classList.remove('active'));
	carouselImages[index].classList.add('active');
	carouselButtons[index].classList.add('active');
}

function nextImage() {
	currentIndex = (currentIndex + 1) % carouselImages.length;
	showImage(currentIndex);
}

setInterval(nextImage, 5000);

carouselButtons.forEach((button, index) => {
	button.addEventListener('click', () => {
		currentIndex = index;
		showImage(currentIndex);
	});
});
// 时钟功能
function updateClock() {
	const now = new Date();
	const clockElement = document.getElementById('clock');
	clockElement.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

// 返回顶部按钮
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
	if (window.pageYOffset > 100) {
		backToTopButton.classList.add('visible');
	} else {
		backToTopButton.classList.remove('visible');
	}
});

backToTopButton.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// 雪花效果
function createSnowflake() {
	const snowflake = document.createElement('div');
	snowflake.classList.add('snowflake');
	snowflake.textContent = '❄';
	snowflake.style.left = Math.random() * window.innerWidth + 'px';
	snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
	snowflake.style.opacity = Math.random();
	snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

	document.body.appendChild(snowflake);

	setTimeout(() => {
		snowflake.remove();
	}, 5000);
}


// 购物车功能
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout');
const closeCart = cartModal.querySelector('.close');

function updateCart() {
	cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
	cartItems.innerHTML = '';
	let total = 0;
	cart.forEach(item => {
		const itemElement = document.createElement('div');
		itemElement.classList.add('cart-item');
		itemElement.innerHTML =
			`
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>¥${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                `;
		cartItems.appendChild(itemElement);
		total += item.price * item.quantity;
	});
	cartTotal.textContent = `¥${total.toFixed(2)}`;
}

function addToCart(product) {
	const existingItem = cart.find(item => item.id === product.id);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.push({ ...product,
			quantity: 1
		});
	}
	updateCart();
}

cartIcon.addEventListener('click', () => {
	cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
	cartModal.style.display = 'none';
});

cartItems.addEventListener('click', (e) => {
	if (e.target.classList.contains('decrease-quantity')) {
		const id = parseInt(e.target.dataset.id);
		const item = cart.find(item => item.id === id);
		if (item.quantity > 1) {
			item.quantity--;
		} else {
			cart = cart.filter(item => item.id !== id);
		}
		updateCart();
	} else if (e.target.classList.contains('increase-quantity')) {
		const id = parseInt(e.target.dataset.id);
		const item = cart.find(item => item.id === id);
		item.quantity++;
		updateCart();
	}
});

checkoutButton.addEventListener('click', () => {
	cartModal.style.display = 'none';
	checkoutModal.style.display = 'block';
});

// 商品详情功能
const productModal = document.getElementById('product-modal');
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const addToCartButton = document.getElementById('add-to-cart');
const closeProduct = productModal.querySelector('.close');

document.querySelectorAll('.view-product').forEach(button => {
	button.addEventListener('click', () => {
		const product = products.find(p => p.id === parseInt(button.dataset.id));
		productImage.src = product.image;
		productName.textContent = product.name;
		productPrice.textContent = `¥${product.price.toFixed(2)}`;
		productDescription.textContent = product.description;
		addToCartButton.dataset.id = product.id;
		productModal.style.display = 'block';
	});
});

closeProduct.addEventListener('click', () => {
	productModal.style.display = 'none';
});

addToCartButton.addEventListener('click', () => {
	const product = products.find(p => p.id === parseInt(addToCartButton.dataset.id));
	addToCart(product);
	productModal.style.display = 'none';
});

// 结算功能
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const closeCheckout = checkoutModal.querySelector('.close');

checkoutForm.addEventListener('submit', (e) => {
	e.preventDefault();
	alert('订单提交成功！');
	cart = [];
	updateCart();
	checkoutModal.style.display = 'none';
});

closeCheckout.addEventListener('click', () => {
	checkoutModal.style.display = 'none';
});

// 账户功能
let isLoggedIn = false; // 登录状态

const accountLink = document.getElementById('account-link');
const accountModal = document.getElementById('account-modal');
const closeAccount = accountModal.querySelector('.close');
const loginForm = document.getElementById('login-form');
const registerLink = document.getElementById('register-link');
const accountStatus = document.getElementById('account-status');

// 默认账户信息
const defaultEmail = '2975685613@qq.com';
const defaultPassword = '123456';

function updateAccountStatus() {
	accountStatus.textContent = isLoggedIn ? '您已登录' : '您尚未登录';
}

accountLink.addEventListener('click', () => {
	accountModal.style.display = 'block';
});

closeAccount.addEventListener('click', () => {
	accountModal.style.display = 'none';
});

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = loginForm.querySelector('input[type="text"]').value;
	const password = loginForm.querySelector('input[type="password"]').value;

	// 验证账户信息
	if (email === defaultEmail && password === defaultPassword) {
		isLoggedIn = true; // 更新登录状态
		alert('登录成功！');
		accountModal.style.display = 'none';
		updateAccountStatus(); // 更新显示状态
	} else {
		alert('用户名或密码错误，请重试。');
	}
});

// 初始化账户状态显示
updateAccountStatus();



// 关闭模态框
window.addEventListener('click', (event) => {
	if (event.target == cartModal) {
		cartModal.style.display = 'none';
	}
	if (event.target == accountModal) {
		accountModal.style.display = 'none';
	}
	if (event.target == productModal) {
		productModal.style.display = 'none';
	}
	if (event.target == checkoutModal) {
		checkoutModal.style.display = 'none';
	}
});

const cities = {
	"北京": ["北京市"],
	"天津": ["天津市"],
	"上海": ["上海市"],
	"重庆": ["重庆市"],
	"河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"],
	"山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "临汾市", "吕梁市"],
	"内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
	"辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "朝阳市", "葫芦岛市"],
	"吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边州"],
	"黑龙江省": ["哈尔滨市", "齐齐哈尔市", "牡丹江市", "佳木斯市", "大庆市", "伊春市", "鸡西市", "鹤岗市", "双鸭山市", "七台河市", "黑河市", "绥化市", "大兴安岭地区"],
	"江苏省": ["南京市", "苏州市", "无锡市", "常州市", "扬州市", "镇江市", "泰州市", "南通市", "连云港市", "宿迁市"],
	"浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"],
	"安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市",
		"宣城市"
	],
	"福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"],
	"江西省": ["南昌市", "九江市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市", "景德镇市", "鹰潭市"],
	"山东省": ["济南市", "青岛市", "烟台市", "潍坊市", "济宁市", "泰安市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市", "枣庄市"],
	"河南省": ["郑州市", "洛阳市", "新乡市", "焦作市", "平顶山市", "鹤壁市", "安阳市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市",
		"驻马店市"
	],
	"湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施州", "仙桃市", "潜江市",
		"天门市", "神农架林区"
	],
	"湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "娄底市", "怀化市", "湘西州"],
	"广东省": ["广州市", "深圳市", "珠海市", "汕头市", "韶关市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市",
		"清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"
	],
	"广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
	"海南省": ["海口市", "三亚市", "三沙市", "儋州市", "文昌市", "琼海市", "万宁市", "东方市", "澄迈县", "定安县", "屯昌县", "琼中县", "陵水县", "保亭县", "乐东县",
		"白沙县"
	],
	"四川省": ["成都市", "绵阳市", "自贡市", "攀枝花市", "泸州市", "德阳市", "广元市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市",
		"资阳市", "阿坝州", "甘孜州", "凉山州"
	],
	"贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "铜仁市", "毕节市", "黔西南州", "黔东南州", "黔南州"],
	"云南省": ["昆明市", "曲靖市", "玉溪市", "丽江市", "普洱市", "保山市", "昭通市", "临沧市", "德宏州", "怒江州", "迪庆州"],
	"西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"],
	"陕西省": ["西安市", "咸阳市", "宝鸡市", "铜川市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"],
	"甘肃省": ["兰州市", "天水市", "平凉市", "酒泉市", "嘉峪关市", "武威市", "白银市", "临夏州", "甘南州"],
	"青海省": ["西宁市", "海东市", "海北州", "黄南州", "海南州", "果洛州", "玉树州", "班玛县"],
	"宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
	"新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉州", "博尔塔拉州", "巴音郭楞州", "阿克苏州", "克孜勒苏州", "喀什州", "和田州", "伊犁州", "塔城州",
		"阿勒泰州", "石河子市", "五家渠市", "阿拉尔市"
	]
};


function searchProduct() {
	const query = document.getElementById('search-input').value;
	console.log("搜索商品: " + query);

	// 跳转至搜索结果页面，并将搜索查询参数添加到 URL 中
	window.location.href = `sousuo.html?query=${encodeURIComponent(query)}`;
}


function updateCities() {
	const provinceDropdown = document.getElementById('province-dropdown');
	const cityDropdown = document.getElementById('city-dropdown');
	const selectedProvince = provinceDropdown.value;

	// 清空城市下拉框
	cityDropdown.innerHTML = "<option value=''>选择城市</option>";

	if (selectedProvince && cities[selectedProvince]) {
		cities[selectedProvince].forEach(city => {
			const option = document.createElement('option');
			option.value = city;
			option.textContent = city;
			cityDropdown.appendChild(option);
		});
		cityDropdown.style.display = "block"; // 显示城市下拉框
	} else {
		cityDropdown.style.display = "none"; // 隐藏城市下拉框
	}
}

function selectCity() {
	const cityDropdown = document.getElementById('city-dropdown');
	const selectedCity = cityDropdown.value;
	const provinceDropdown = document.getElementById('province-dropdown');
	const selectedProvince = provinceDropdown.value;

	if (selectedCity) {
		// 显示选择的省市
		const locationDisplay = document.getElementById('selected-location');
		locationDisplay.textContent = `您选择的省市：${selectedProvince} - ${selectedCity}`;
		cityDropdown.style.display = "none"; // 点击后收起城市下拉框
	}
}
setInterval(createSnowflake, 50);
// 获取所有类别
const categories = document.querySelectorAll('.category');

function showDropdown(element) {
    const dropdown = element.querySelector('.dropdown');
    dropdown.style.display = 'block'; // 显示下拉框
}

function hideDropdown(element) {
    const dropdown = element.querySelector('.dropdown');
    dropdown.style.display = 'none'; // 隐藏下拉框
}
