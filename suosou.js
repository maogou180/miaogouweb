// 实时时钟功能
function updateClock() {
	const clockElement = document.getElementById('clock');
	const now = new Date();
	clockElement.innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// 搜索按钮的跳转功能
function searchProduct() {
	const searchTerm = document.getElementById('search-input').value;
	// 这里你可以处理搜索逻辑，例如跳转到搜索结果页面
	alert('搜索功能尚未实现，您输入的内容是：' + searchTerm);
}

// 模拟历史搜索数据
const historyData = ['牛仔裤', '连衣裙', '运动鞋', '羽绒服', '耳机', '智能手表', '毛衣', '卫衣'];
const historyContainer = document.getElementById('history-search');

historyData.forEach(item => {
	const div = document.createElement('div');
	div.classList.add('item');
	div.innerText = item;
	historyContainer.appendChild(div);
});
