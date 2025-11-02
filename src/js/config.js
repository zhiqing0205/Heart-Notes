/**
 * 应用配置常量
 */
const LETTER_PATTERNS = {
	Z: [
		'1111111111111111',
		'..............11',
		'.............11.',
		'............11..',
		'...........11...',
		'..........11....',
		'.........11.....',
		'........11......',
		'.......11.......',
		'......11........',
		'.....11.........',
		'....11..........',
		'...11...........',
		'..11............',
		'.11.............',
		'1111111111111111'
	],
	I: [
		'.....111111.....',
		'......1111......',
		'........11......',
		'........11......',
		'........11......',
		'........11......',
		'........11......',
		'........11......',
		'......1111......',
		'.....111111.....'
	],
	U: [
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'.11111111111111.',
		'..111111111111..'
	],
	C: [
		'..111111111111..',
		'.11111111111111.',
		'11111........111',
		'1111............',
		'111.............',
		'111.............',
		'111.............',
		'1111............',
		'11111........111',
		'.11111111111111.',
		'..111111111111..'
	],
	H: [
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111111111111111',
		'1111111111111111',
		'1111........1111',
		'1111........1111',
		'1111........1111',
		'1111........1111'
	]
}

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
		SPAWN_INTERVAL_DESKTOP: 300,
		SPAWN_INTERVAL_MOBILE: 230,
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
		TEXT_DESKTOP: 0.58,
		TEXT_MOBILE: 0.68,
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

		// ZIUCH 文字坐标生成函数（基于预设像素网格）
		getTextPositions: (isMobile = false) => {
			const text = 'ZIUCH'
			const letters = text.split('')
			const density = 3
			const letterSpacing = isMobile ? 10 : 28

			const patterns = letters.map(letter => LETTER_PATTERNS[letter] || [])
			const letterWidths = patterns.map(pattern => (pattern[0] ? pattern[0].length : 0))
			const letterHeights = patterns.map(pattern => pattern.length)

			const positionsRaw = []
			const letterPoints = letters.map(() => [])

			if (isMobile) {
				const maxWidth = Math.max(...letterWidths)
				const safeMaxWidth = Math.max(1, maxWidth)
				const totalHeight = patterns.reduce((sum, pattern, idx) => {
					const height = pattern.length
					return sum + height + (idx === patterns.length - 1 ? 0 : letterSpacing)
				}, 0)
				const safeTotalHeight = Math.max(1, totalHeight)

				let currentY = 0
				patterns.forEach((pattern, letterIndex) => {
					const height = pattern.length
					const width = pattern[0]?.length || 0
					const offsetX = (maxWidth - width) / 2
					for (let row = 0; row < height; row++) {
						const line = pattern[row] || ''
						for (let col = 0; col < line.length; col++) {
							if (line[col] !== '1') continue
							for (let subY = 0; subY < density; subY++) {
								for (let subX = 0; subX < density; subX++) {
									const baseX = offsetX + col + (subX + 0.5) / density
									const baseY = currentY + row + (subY + 0.5) / density
									const normalized = {
										x: baseX / safeMaxWidth,
										y: baseY / safeTotalHeight,
										letterIndex
									}
									letterPoints[letterIndex].push(normalized)
									positionsRaw.push(normalized)
								}
							}
						}
					}
					currentY += height + letterSpacing
				})
			} else {
				const totalWidth = patterns.reduce((sum, pattern, idx) => {
					const width = pattern[0]?.length || 0
					return sum + width + (idx === patterns.length - 1 ? 0 : letterSpacing)
				}, 0)
				const safeTotalWidth = Math.max(1, totalWidth)
				const maxHeight = Math.max(...letterHeights)
				const safeMaxHeight = Math.max(1, maxHeight)

				let currentX = 0
				patterns.forEach((pattern, letterIndex) => {
					const height = pattern.length
					const width = pattern[0]?.length || 0
					const offsetY = (maxHeight - height) / 2
					for (let row = 0; row < height; row++) {
						const line = pattern[row] || ''
						for (let col = 0; col < line.length; col++) {
							if (line[col] !== '1') continue
							for (let subY = 0; subY < density; subY++) {
								for (let subX = 0; subX < density; subX++) {
									const baseX = currentX + col + (subX + 0.5) / density
									const baseY = offsetY + row + (subY + 0.5) / density
									const normalized = {
										x: baseX / safeTotalWidth,
										y: baseY / safeMaxHeight,
										letterIndex
									}
									letterPoints[letterIndex].push(normalized)
									positionsRaw.push(normalized)
								}
							}
						}
					}
					currentX += width + letterSpacing
				})
			}

			const computeBounds = (pts) => {
				if (!pts.length) return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
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

			const limit = isMobile
				? CONFIG.LIMITS.MAX_CARDS_MOBILE
				: CONFIG.LIMITS.MAX_CARDS_DESKTOP
			const targetCount = Math.min(limit, positionsRaw.length)
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
					const entry = { x: point.x, y: point.y, letterIndex: i }
					positions.push(entry)
					groupIndices.push(indexCounter)
					indexCounter++
				}
				groups.push(groupIndices)
			}

			const bounds = computeBounds(positions)
			const spawnOrder = positions.map((_, index) => index)

			return {
				positions,
				groups,
				spawnOrder,
				word: text,
				bounds,
				canvasSize: {
					width: isMobile ? Math.max(1, Math.max(...letterWidths)) : Math.max(1, patterns.reduce((sum, pattern, idx) => sum + (pattern[0]?.length || 0) + (idx === patterns.length - 1 ? 0 : letterSpacing), 0)),
					height: isMobile ? Math.max(1, patterns.reduce((sum, pattern, idx) => sum + pattern.length + (idx === patterns.length - 1 ? 0 : letterSpacing), 0)) : Math.max(1, Math.max(...letterHeights))
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
