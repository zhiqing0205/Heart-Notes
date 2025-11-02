/**
 * 应用配置常量
 */
export const CONFIG = {
	// 调试开关（避免大量日志拖慢页面）
	DEBUG: false,
	// 便签墙消息
	MESSAGES: [
		'保持好心情',
		'多喝水哦',
		'今天辛苦啦',
		'早点休息',
		'记得吃水果',
		'加油，你可以的',
		'祝你顺利',
		'保持微笑呀',
		'愿所有烦恼都消失',
		'期待下一次见面',
		'梦想总会实现',
		'天气冷了，多穿衣服',
		'记得给自己放松',
		'每天都要元气满满',
		'今天也要好好爱自己',
		'适当休息一下',
		'你真的很棒',
		'相信自己',
		'一切都会好起来的',
		'今天也是特别的一天',
		'慢慢来，不着急',
		'你值得更好的',
		'保持热爱，奔赴山海',
		'做自己就好',
		'珍惜当下',
		'温柔对待世界',
		'别忘了吃早餐',
		'注意安全哦',
		'要开心呀',
		'好好睡一觉',
		'别太累了',
		'给自己一个拥抱',
		'今天也很美好',
		'生活需要仪式感',
		'慢慢变好',
		'心情要像花儿一样',
		'保持善良',
		'记得晒太阳',
		'听听喜欢的音乐',
		'出去走走吧',
		'想吃什么就吃吧',
		'做喜欢的事',
		'别想太多',
		'享受当下',
		'你已经很努力了',
		'给自己点时间',
		'不必太完美',
		'按自己的节奏来',
		'好运会降临的',
		'未来可期',
		'保持热情',
		'温暖常在',
		'平安喜乐',
		'岁岁常欢愉',
		'万事皆可期',
		'一切安好',
		'心想事成',
		'前路浩浩荡荡',
		'笑口常开',
		'健康快乐',
		'顺遂无忧',
		'轻松一点',
		'别忘了喝奶茶',
		'今天要快乐哦',
		'做个好梦'
	],

	// 卡片颜色（黑暗模式深色系）
	COLORS: [
		'#4a3942', // 深玫瑰紫
		'#2f4858', // 深青蓝
		'#5a4a3a', // 深橙棕
		'#3a4a3a', // 深翠绿
		'#473a5a', // 深紫罗兰
		'#4a4a38', // 深橄榄黄
		'#364852', // 深青灰
		'#52385a'  // 深粉紫
	],

	// 卡片颜色（浅色模式亮色系）
	COLORS_LIGHT: [
		'#ffe0e3', // 粉红
		'#c7f0ff', // 天蓝
		'#ffd8a8', // 橙黄
		'#d9f2d9', // 翠绿
		'#e5d7ff', // 紫罗兰
		'#f9f7d9', // 柠檬黄
		'#d2f0f8', // 青色
		'#ffd4f5'  // 粉紫
	],

	// 卡片尺寸
	CARD: {
		DESKTOP_WIDTH: 220,
		DESKTOP_HEIGHT: 140,
		MOBILE_WIDTH: 140, // 缩小移动端卡片
		MOBILE_HEIGHT: 100,
		BORDER_RADIUS: 12,
		MOBILE_BORDER_RADIUS: 10
	},

	// 间距
	SPACING: {
		DESKTOP_HORIZONTAL: 16,
		DESKTOP_VERTICAL: 20,
		MOBILE_HORIZONTAL: 12,
		MOBILE_VERTICAL: 12
	},

	// 动画时长 (ms)
	ANIMATION: {
		TRANSITION_DURATION: 350,
		INITIAL_SPAWN_DELAY_DESKTOP: 20,
		INITIAL_SPAWN_DELAY_MOBILE: 30,
		SPAWN_INTERVAL_DESKTOP: 250,
		SPAWN_INTERVAL_MOBILE: 180,
		RESIZE_DEBOUNCE: 300,
		TEXT_EMPHASIS_DURATION: 1800,
		TEXT_EMPHASIS_HOLD: 700
	},

	// 卡片数量限制
	LIMITS: {
		MAX_CARDS_DESKTOP: 185, // 增加到185个以形成更大的爱心
		MAX_CARDS_MOBILE: 185,
		INITIAL_CARDS_DESKTOP: 0, // 爱心形状通过自动生成逐步形成
		INITIAL_CARDS_MOBILE: 0
	},

	// 旋转角度范围
	ROTATION: {
		DESKTOP_RANGE: 10,
		MOBILE_RANGE: 6
	},

	// z-index管理
	Z_INDEX: {
		BASE: 1,
		MAXIMIZED: 10000,
		MAX_NORMAL: 9999 // 普通卡片最大z-index
	},

	// 边界约束
	BOUNDARY: {
		OVERFLOW_RATIO: 0.15 // 允许卡片超出屏幕的比例
	},

	// 初始缩放
	SCALE: {
		INITIAL_DESKTOP: 0.7,
		INITIAL_MOBILE: 0.85,
		TEXT_DESKTOP: 0.48,
		TEXT_MOBILE: 0.58,
		NORMAL: 1,
		MINIMIZED: 0.1
	},

	BACKGROUND: {
		HEART_IMAGE: 'https://img.ziuch.top/i/2025/11/02/r3u2c4.jpg'
	},

	// 移动端检测断点
	MOBILE_BREAKPOINT: 768,

	// 性能策略
	PERF: {
		USE_IDLE_SPAWN: true, // 使用 requestIdleCallback 在空闲时生成卡片
		WOW_MODE: true, // 惊艳模式：更快的生成、更高的上限
		INITIAL_BATCH_SIZE_DESKTOP: 4,
		INITIAL_BATCH_SIZE_MOBILE: 3,
		ADAPTIVE_SPAWN: false, // 禁用自适应生成，保持固定速度
		TARGET_FPS: 55,
		FPS_LOWER: 48,
		FPS_UPPER: 58,
		SPAWN_BURST_MAX: 1, // 禁用突发生成，每次只生成1张
		SPAWN_INTERVAL_MIN_DESKTOP: 350,
		SPAWN_INTERVAL_MIN_MOBILE: 350,
		SPAWN_INTERVAL_MAX_DESKTOP: 350,
		SPAWN_INTERVAL_MAX_MOBILE: 350
	},

	// 爱心形状布局
	LAYOUT: {
		USE_HEART_SHAPE: true, // 是否使用爱心形状布局
		USE_TEXT_LAYOUT: true, // 是否使用文字布局（ZIUCH）
		TRANSITION_TO_HEART: true, // 是否在文字显示完后过渡到爱心
		EASTER_EGG_MESSAGES: [
			'为自己的人生鲜艳上色',
			'先把爱涂上喜欢的颜色'
		], // 彩蛋：最后两张卡片的固定文案（倒数第二张、最后一张）

		// ZIUCH 文字坐标生成函数
		// 使用 Canvas 路径采样生成文字轮廓点
		getTextPositions: (isMobile = false) => {
			// 创建临时 Canvas
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			const text = 'ZIUCH'
			// 根据屏幕大小动态调整字号
			const screenSize = Math.min(
				typeof window !== 'undefined' ? window.innerWidth : 1920,
				typeof window !== 'undefined' ? window.innerHeight : 1080
			)
			const fontSize = isMobile ? Math.floor(screenSize * 0.15) : Math.floor(screenSize * 0.12)
			const letterSpacing = isMobile ? Math.floor(fontSize * 0.1) : Math.floor(fontSize * 0.2)

			// 设置字体（使用粗体以便有更多点）
			ctx.font = `bold ${fontSize}px Arial, sans-serif`

			// 计算文字总宽度
			const metrics = ctx.measureText(text)
			const textWidth = metrics.width + letterSpacing * (text.length - 1)
			const textHeight = fontSize

			// 设置 Canvas 尺寸（增加边距）
			const padding = fontSize * 0.3
			canvas.width = isMobile ? textHeight + padding * 2 : textWidth + padding * 2
			canvas.height = isMobile ? textWidth + padding * 2 : textHeight + padding * 2

			ctx.font = `bold ${fontSize}px Arial, sans-serif`
			ctx.fillStyle = '#000'
			ctx.textBaseline = 'top'

			const letterBounds = []
			const boundPadding = fontSize * 0.08

			// 绘制文字并记录每个字母的包围盒
			if (isMobile) {
				// 移动端：竖排文字（从上到下）
				const totalHeight = fontSize * text.length + letterSpacing * (text.length - 1)
				const startY = (canvas.height - totalHeight) / 2
				for (let i = 0; i < text.length; i++) {
					const char = text[i]
					const charMetrics = ctx.measureText(char)
					const x = (canvas.width - charMetrics.width) / 2
					const y = startY + i * (fontSize + letterSpacing)
					ctx.fillText(char, x, y)

					letterBounds.push({
						index: i,
						minX: x - boundPadding,
						maxX: x + charMetrics.width + boundPadding,
						minY: y - boundPadding,
						maxY: y + fontSize + boundPadding
					})
				}
			} else {
				// 桌面端：横排文字
				let offsetX = (canvas.width - textWidth) / 2
				const offsetY = (canvas.height - textHeight) / 2
				for (let i = 0; i < text.length; i++) {
					const char = text[i]
					const charWidth = ctx.measureText(char).width
					ctx.fillText(char, offsetX, offsetY)

					letterBounds.push({
						index: i,
						minX: offsetX - boundPadding,
						maxX: offsetX + charWidth + boundPadding,
						minY: offsetY - boundPadding,
						maxY: offsetY + fontSize + boundPadding
					})

					offsetX += charWidth + letterSpacing
				}
			}

			// 采样像素点（减小步长，增加密度）
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
			const pixels = imageData.data
			const letterPoints = Array.from({ length: text.length }, () => [])
			const positionsRaw = []

			// 采样步长（减小以获得更多点，避免遮挡）
			const step = Math.max(2, Math.floor(fontSize / 40))

			for (let y = 0; y < canvas.height; y += step) {
				for (let x = 0; x < canvas.width; x += step) {
					const index = (y * canvas.width + x) * 4
					const alpha = pixels[index + 3]

					// 如果像素不透明，记录位置
					if (alpha > 128) {
						const normalized = {
							x: x / canvas.width,
							y: y / canvas.height
						}
						let letterIndex = 0
						for (let i = 0; i < letterBounds.length; i++) {
							const bound = letterBounds[i]
							if (
								x >= bound.minX &&
								x <= bound.maxX &&
								y >= bound.minY &&
								y <= bound.maxY
							) {
								letterIndex = bound.index
								break
							}
						}

						const point = { ...normalized, letterIndex }
						letterPoints[letterIndex].push(point)
						positionsRaw.push(point)
					}
				}
			}

			const computeBounds = pts => {
				if (!pts.length) {
					return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
				}
				let minX = pts[0].x
				let maxX = pts[0].x
				let minY = pts[0].y
				let maxY = pts[0].y
				for (const p of pts) {
					if (p.x < minX) minX = p.x
					if (p.x > maxX) maxX = p.x
					if (p.y < minY) minY = p.y
					if (p.y > maxY) maxY = p.y
				}
				return { minX, maxX, minY, maxY }
			}

			const evenSample = (points, count) => {
				if (count <= 0) return []
				if (points.length <= count) {
					return points.map(p => ({ ...p }))
				}
				const stepSize = points.length / count
				const selected = []
				let cursor = 0
				const used = new Set()
				for (let i = 0; i < count; i++) {
					let candidateIndex = Math.floor(cursor)
					if (candidateIndex >= points.length) candidateIndex = points.length - 1
					while (used.has(candidateIndex) && candidateIndex < points.length - 1) {
						candidateIndex++
					}
					while (used.has(candidateIndex) && candidateIndex > 0) {
						candidateIndex--
					}
					used.add(candidateIndex)
					selected.push({ ...points[candidateIndex] })
					cursor += stepSize
				}
				return selected
			}

			const targetCount = isMobile
				? CONFIG.LIMITS.MAX_CARDS_MOBILE
				: CONFIG.LIMITS.MAX_CARDS_DESKTOP

			const totalSamples = positionsRaw.length || 1
			let quotas = letterPoints.map(group => (group.length ? Math.max(1, Math.round((group.length / totalSamples) * targetCount)) : 0))
			let sumQuota = quotas.reduce((sum, q) => sum + q, 0)

			if (sumQuota > targetCount) {
				while (sumQuota > targetCount) {
					const idx = quotas.findIndex(q => q > 1)
					if (idx === -1) break
					quotas[idx]--
					sumQuota--
				}
			}

			if (sumQuota < targetCount) {
				let safety = 0
				while (sumQuota < targetCount && safety < 1000) {
					let boosted = false
					for (let i = 0; i < quotas.length && sumQuota < targetCount; i++) {
						if (letterPoints[i].length > quotas[i]) {
							quotas[i]++
							sumQuota++
							boosted = true
						}
					}
					if (!boosted) break
					safety++
				}
			}

			const positions = []
			const groups = []
			let indexCounter = 0

			for (let i = 0; i < letterPoints.length; i++) {
				const quota = Math.min(quotas[i], targetCount - positions.length)
				const sampled = evenSample(letterPoints[i], quota)
				const sorted = sampled.sort((a, b) => {
					if (isMobile) {
						return a.x - b.x || a.y - b.y
					}
					return a.y - b.y || a.x - b.x
				})

				const groupIndices = []
				for (const point of sorted) {
					const entry = { ...point, letterIndex: i }
					positions.push(entry)
					groupIndices.push(indexCounter)
					indexCounter++
				}
				groups.push(groupIndices)
			}

			const bounds = computeBounds(positions)
			const spawnOrder = groups.flat()

			return {
				positions,
				groups,
				spawnOrder,
				bounds,
				canvasSize: {
					width: canvas.width,
					height: canvas.height
				}
			}
		},

		// 爱心形状的参数化坐标点（基于数学公式）
		// 使用归一化坐标 [0, 1]，将在实际使用时根据屏幕大小缩放
		getHeartPositions: () => {
			const positions = []
			const numPoints = 185 // 增加到185个点（约15%增量）

			// 第一遍：计算所有原始坐标
			const rawPositions = []
			for (let i = 0; i < numPoints; i++) {
				const t = (i / numPoints) * 2 * Math.PI
				// 爱心参数方程
				const x = 16 * Math.pow(Math.sin(t), 3)
				const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
				rawPositions.push({ x, y })
			}

			// 找出实际的最小值和最大值
			let minX = Math.min(...rawPositions.map(p => p.x))
			let maxX = Math.max(...rawPositions.map(p => p.x))
			let minY = Math.min(...rawPositions.map(p => p.y))
			let maxY = Math.max(...rawPositions.map(p => p.y))

			const rangeX = maxX - minX
			const rangeY = maxY - minY

			// 第二遍：归一化到 [0, 1]
			for (const pos of rawPositions) {
				const normalizedX = (pos.x - minX) / rangeX
				const normalizedY = (pos.y - minY) / rangeY
				positions.push({ x: normalizedX, y: normalizedY })
			}

			return positions
		}
	}
}
