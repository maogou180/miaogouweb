// 定义购物车数组，尝试从本地存储中加载购物车
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 初始化购物车显示
updateCartDisplay();

// 监听所有加入购物车按钮
document.querySelectorAll(".add-to-cart").forEach(button => {
	button.addEventListener("click", () => {
		const productName = button.getAttribute("data-product");
		const productPrice = parseInt(button.getAttribute("data-price"));

		// 检查购物车中是否已存在该商品
		const existingProduct = cart.find(item => item.name === productName);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			cart.push({
				name: productName,
				price: productPrice,
				quantity: 1
			});
		}

		saveCart();
		updateCartDisplay();
	});
});

// 更新购物车显示
function updateCartDisplay() {
	const cartItemsContainer = document.getElementById("cart-items");
	const cartTotal = document.getElementById("cart-total");
	const cartCount = document.getElementById("cart-count");

	cartItemsContainer.innerHTML = "";
	let total = 0;
	let itemCount = 0;
	cart.forEach((item, index) => {
		const itemElement = document.createElement("div");
		itemElement.textContent = `${item.name} - ￥${item.price} x ${item.quantity}`;

		const removeButton = document.createElement("button");
		removeButton.textContent = "移除";
		removeButton.addEventListener("click", () => {
			removeFromCart(index);
		});

		itemElement.appendChild(removeButton);
		cartItemsContainer.appendChild(itemElement);

		total += item.price * item.quantity;
		itemCount += item.quantity;
	});

	cartTotal.textContent = `总价: ￥${total}`;
	if (cartCount) {
		cartCount.textContent = itemCount;
	}
}

// 移除购物车中的商品
function removeFromCart(index) {
	if (cart[index].quantity > 1) {
		cart[index].quantity -= 1;
	} else {
		cart.splice(index, 1);
	}
	saveCart();
	updateCartDisplay();
}

// 清空购物车按钮
document.getElementById("clear-cart").addEventListener("click", () => {
	cart = [];
	saveCart();
	updateCartDisplay();
});

// 保存购物车到本地存储
function saveCart() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

// 结算功能更新
document.getElementById("checkout").addEventListener("click", () => {
	// 检查购物车是否为空
	if (cart.length === 0) {
		alert("购物车为空，请添加商品！");
		return;
	}

	// 获取用户输入的收货地址
	const address = document.getElementById("address").value;
	if (address.trim() === "") {
		alert("请输入收货地址！");
		return;
	}

	// 获取配送方式及其费用
	const shippingMethod = document.getElementById("shipping-method").value;
	let shippingCost = 0;
	if (shippingMethod === "standard") {
		shippingCost = 10;
	} else if (shippingMethod === "express") {
		shippingCost = 20;
	}

	// 计算总金额（包括配送费用）
	let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;
	let itemList = cart.map(item => `${item.name} x ${item.quantity} - ￥${item.price * item.quantity}`).join("\n");

	// 显示结算信息
	alert(`结算成功！\n商品清单:\n${itemList}\n配送费用: ￥${shippingCost}\n总金额: ￥${total}\n收货地址: ${address}`);

	// 结算完成清空购物车
	cart = [];
	saveCart();
	updateCartDisplay();
});
