: root {
	--primary - color: #ff6b6b;
	--secondary - color: #4ecdc4;
				--accent-color: # feca57;
	--background - color: #f7f7f7;
	--text - color:
		#333;
			}

			body {
				margin: 0;
				font-family: Arial, sans-serif;
				background-color: var(--background-color);
				color: var(--text-color);
				overflow-x: hidden;
			}

			header {
				background-color: var(--primary-color);
				color: white;
				padding: 20px;
				text-align: center;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
				position: relative;
				z-index: 1;
			}

			header h1 {
				margin: 0;
				font-size: 2.5rem;
			}

			header p {
				font-size: 1.2rem;
			}

			.marquee {
				margin: 20px 0;
				padding: 10px;
				background-color: var(--accent-color);
				color: white;
				font-size: 1.2rem;
				white-space: nowrap;
				overflow: hidden;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}

			.marquee span {
				display: inline-block;
				padding-left: 100%;
				animation: marquee 15s linear infinite;
			}

			@keyframes marquee {
				from {
					transform: translateX(100%);
				}

				to {
					transform: translateX(-100%);
				}
			}

			.carousel {
				width: 100%;
				height: 400px;
				overflow: hidden;
				margin-bottom: 40px;
				position: relative;
				display: flex;
				align-items: center;
			}

			.carousel img {
				height: 100%;
				max-width: none;
				/* 禁用自动宽度适应 */
				object-fit: cover;
				/* 确保高度填满，保持图片比例 */
				margin: 0 auto;
				/* 水平居中 */
				transition: opacity 1s ease;
				/* 平滑切换效果 */
				opacity: 0;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
			}

			.carousel img.active {
				opacity: 1;
				/* 当前图片显示 */
				z-index: 1;
			}

			@keyframes slide {
				0% {
					transform: translateX(0);
				}

				25% {
					transform: translateX(-100%);
				}

				50% {
					transform: translateX(-200%);
				}

				75% {
					transform: translateX(-300%);
				}

				100% {
					transform: translateX(0);
				}
			}

			section {
				padding: 40px;
				max-width: 1200px;
				margin: 0 auto;
			}

			section h2 {
				color: var(--primary-color);
				margin-bottom: 20px;
				font-size: 2rem;
				border-bottom: 2px solid var(--primary-color);
				padding-bottom: 10px;
			}

			section p {
				line-height: 1.6;
				font-size: 1.1rem;
			}

			.highlight {
				color: var(--secondary-color);
				font-weight: bold;
			}

			.snowflakes {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				z-index: 0;
			}

			.snowflake {
				position: absolute;
				top: -10px;
				background-color: white;
				border-radius: 50%;
				opacity: 0.8;
				width: 8px;
				height: 8px;
				animation: fall linear infinite;
			}

			@keyframes fall {
				0% {
					transform: translateY(-10px) rotate(0deg);
					opacity: 0.8;
				}

				100% {
					transform: translateY(100vh) rotate(360deg);
					opacity: 0.4;
				}
			}

			footer {
				background-color: var(--primary-color);
				color: white;
				text-align: center;
				padding: 20px;
				position: relative;
				width: 100%;
				bottom: 0;
				z-index: 1;
			}

			footer p {
				margin: 0;
			}

			.return-link {
				margin-top: 30px;
				display: inline-block;
				padding: 10px 20px;
				background-color: var(--primary-color);
				color: white;
				text-decoration: none;
				border-radius: 5px;
				transition: background-color 0.3s ease;
			}

			.return-link:hover {
				background-color: var(--secondary-color);
			}

			/* Snowflake animation settings */
			.snowflake:nth-child(odd) {
				animation-duration: 10s;
				animation-delay: 0s;
			}

			.snowflake:nth-child(even) {
				animation-duration: 15s;
				animation-delay: 5s;
			}
