/**
 * 卡片管理模块
 * 负责卡片的创建、交互、动画等核心功能
 */

import { CONFIG } from './config.js'
import { randomFrom, clamp, applyTransform, isMobileDevice } from './utils.js'
import { stateManager } from './stateManager.js'
import { themeManager } from './themeManager.js'

/**
 * 卡片管理器
 */
export class CardManager {
	constructor(boardElement) {
		this.board = boardElement
	this.isMobile = isMobileDevice()
	this.textPositions = []
	this.textBounds = { minX: 0, maxX: 1, minY: 0, maxY: 1 }
	this.heartPositions = []
	this.currentPositionIndex = 0
		this.currentRandomIndex = 0
		this.randomizedIndices = []
		this.textGroups = []
		this.textWord = 'ZIUCH'
		this.totalCardsToGenerate = 0
		this.cardsGenerated = 0
		this.onAllCardsGenerated = null // 回调函数

		this.loadLayouts(false)
	}

	/**
	 * Fisher-Yates 洗牌算法，随机打乱索引
	 */
	shuffleIndices(length) {
		const indices = Array.from({ length }, (_, i) => i)
		for (let i = indices.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[indices[i], indices[j]] = [indices[j], indices[i]]
		}
		return indices
	}

	updateBoardStageClasses() {
		if (!this.board) return
		const inTextPhase = this.isInTextPhase()
		this.board.classList.toggle('text-layout-active', inTextPhase)
		if (!this.board.getAttribute('data-text-word')) {
			this.board.setAttribute('data-text-word', this.textWord || 'ZIUCH')
		}
		if (inTextPhase) {
			this.board.classList.remove('heart-background', 'heart-emphasis', 'heartbeat-animation')
			this.board.style.removeProperty('--heart-bg-image')
			this.board.classList.add('text-view-balanced')
			if (typeof document !== 'undefined') {
				document.body.classList.remove('heart-theme')
				document.body.style.removeProperty('--heart-bg-image')
			}
		}
	}

	/**
	 * 刷新文字布局和爱心布局的位置数据
	 * @param {boolean} preserveProgress - 是否保留当前生成进度
	 */
	loadLayouts(preserveProgress = false) {
		const textLayout = CONFIG.LAYOUT.getTextPositions(this.isMobile) || {}
		const heartLayout = CONFIG.LAYOUT.getHeartPositions() || []

		const rawTextPositions = Array.isArray(textLayout.positions)
			? textLayout.positions
			: []
		const heartPositions = Array.isArray(heartLayout)
			? heartLayout
			: []

		const targetTotal = Math.min(rawTextPositions.length, heartPositions.length)

		this.textBounds = textLayout.bounds || { minX: 0, maxX: 1, minY: 0, maxY: 1 }
		this.textPositions = rawTextPositions.slice(0, targetTotal).map((pos, idx) => ({
			...pos,
			index: idx
		}))

		this.textGroups = Array.isArray(textLayout.groups) ? textLayout.groups : []
		this.randomizedIndices = this.shuffleIndices(this.textPositions.length)
		this.textWord = textLayout.word || 'ZIUCH'

		const heartCount = targetTotal || heartPositions.length
		if (heartCount > 0 && heartPositions.length > heartCount) {
			const step = heartPositions.length / heartCount
			const sampledHeart = []
			for (let i = 0; i < heartCount; i++) {
				const candidateIndex = Math.min(Math.floor(i * step), heartPositions.length - 1)
				sampledHeart.push({ ...heartPositions[candidateIndex] })
			}
			this.heartPositions = sampledHeart
		} else {
			this.heartPositions = heartPositions.slice(0, heartCount)
		}

		const verticalOffset = this.isMobile ? 0.06 : 0.1
		const horizontalOffset = this.isMobile ? 0 : 0.01
		this.heartPositions = this.heartPositions.map(pos => ({
			x: Math.min(1, Math.max(0, pos.x + horizontalOffset)),
			y: Math.min(1, Math.max(0, pos.y + verticalOffset))
		}))
		this.totalCardsToGenerate = heartCount

		if (this.board) {
			this.board.setAttribute('data-text-word', this.textWord)
		}

		if (preserveProgress) {
			const activeCount = stateManager.getActiveCardCount()
			this.currentRandomIndex = Math.min(activeCount, this.textPositions.length)
			this.cardsGenerated = Math.max(this.cardsGenerated || 0, this.currentRandomIndex)
			this.currentPositionIndex = Math.min(
				this.currentPositionIndex || 0,
				this.heartPositions.length
			)
		} else {
			this.currentRandomIndex = 0
			this.cardsGenerated = 0
			this.currentPositionIndex = 0
		}

		this.updateBoardStageClasses()
	}

	isInTextPhase() {
		return CONFIG.LAYOUT.USE_TEXT_LAYOUT && this.currentRandomIndex < this.textPositions.length
	}

	playTextEmphasis() {
		const board = this.board
		if (!board) return Promise.resolve()

		return new Promise(resolve => {
			const className = 'text-emphasis'
			board.classList.remove(className)
			// 强制重新计算以便重复触发动画
			void board.offsetWidth

			let finished = false
			const emphasisDuration = CONFIG.ANIMATION.TEXT_EMPHASIS_DURATION || 1600

			const cleanup = () => {
				if (finished) return
				finished = true
				board.classList.remove(className)
				board.removeEventListener('animationend', handleEnd)
				resolve()
			}

			const handleEnd = (event) => {
				if (event.target !== board) return
				cleanup()
			}

			board.addEventListener('animationend', handleEnd)
			board.classList.add(className)

			// 防止动画被禁用时无法 resolve
			setTimeout(cleanup, emphasisDuration)
		})
	}

	/**
	 * 创建新卡片
	 */
    createCard() {
        if (CONFIG.DEBUG) {
            console.log(`创建卡片前: 活动卡片数 = ${stateManager.getActiveCardCount()}`)
        }

		const card = document.createElement('div')
		card.className = 'card'

		// 彩蛋：判断是否是最后两张卡片（第160和161张）
		const currentCount = stateManager.getActiveCardCount()
		const maxCards = this.totalCardsToGenerate || CONFIG.LIMITS.MAX_CARDS_DESKTOP
		const isSecondLastCard = currentCount === maxCards - 2
		const isLastCard = currentCount === maxCards - 1

		// 随机选择颜色和消息，最后两张卡片使用彩蛋文案
		// 根据当前主题选择颜色索引
		const colors = themeManager.getColors()
		let colorIndex = Math.floor(Math.random() * colors.length)
		let letterIndexForCard = null
		let message
		if (isSecondLastCard) {
			message = CONFIG.LAYOUT.EASTER_EGG_MESSAGES[0]
		} else if (isLastCard) {
			message = CONFIG.LAYOUT.EASTER_EGG_MESSAGES[1]
		} else {
			message = randomFrom(CONFIG.MESSAGES)
		}

		// 计算位置参数
		const cardWidth = this.isMobile
			? CONFIG.CARD.MOBILE_WIDTH
			: CONFIG.CARD.DESKTOP_WIDTH
		const cardHeight = this.isMobile
			? CONFIG.CARD.MOBILE_HEIGHT
			: CONFIG.CARD.DESKTOP_HEIGHT
		const horizontalMargin = this.isMobile
			? CONFIG.SPACING.MOBILE_HORIZONTAL
			: CONFIG.SPACING.DESKTOP_HORIZONTAL
		const verticalMargin = this.isMobile
			? CONFIG.SPACING.MOBILE_VERTICAL
			: CONFIG.SPACING.DESKTOP_VERTICAL

		let left, top

		const inTextPhase = this.isInTextPhase()
		const textTargetScale = this.isMobile
			? CONFIG.SCALE.TEXT_MOBILE
			: CONFIG.SCALE.TEXT_DESKTOP
		const targetScale = inTextPhase ? textTargetScale : CONFIG.SCALE.NORMAL
		const initialScaleForAnimation = inTextPhase
			? Math.max(textTargetScale * 0.82, textTargetScale - 0.12)
			: (this.isMobile ? CONFIG.SCALE.INITIAL_MOBILE : CONFIG.SCALE.INITIAL_DESKTOP)
		const visualWidth = cardWidth * targetScale
		const visualHeight = cardHeight * targetScale

		// 使用文字形状布局或爱心形状布局
		if (inTextPhase) {
			// 使用随机索引获取文字坐标点
			const randomIndex = this.randomizedIndices[this.currentRandomIndex]
			const position = this.textPositions[randomIndex] || { x: Math.random(), y: Math.random() }
			letterIndexForCard = typeof position.letterIndex === 'number' ? position.letterIndex : 0
			colorIndex = colors.length ? letterIndexForCard % colors.length : colorIndex

		const bounds = this.textBounds || { minX: 0, maxX: 1, minY: 0, maxY: 1 }
		const rangeX = Math.max(bounds.maxX - bounds.minX, 0.001)
		const rangeY = Math.max(bounds.maxY - bounds.minY, 0.001)
		const normalizedX = (position.x - bounds.minX) / rangeX
		const normalizedY = (position.y - bounds.minY) / rangeY
		const clampedX = Math.min(1, Math.max(0, normalizedX))
		const clampedY = Math.min(1, Math.max(0, normalizedY))

		const boardRect = this.board.getBoundingClientRect()
		const boardWidth = boardRect.width || window.innerWidth
		const boardHeight = boardRect.height || window.innerHeight * 0.55

		const paddingX = this.isMobile
			? Math.max(16, boardWidth * 0.05)
			: Math.max(32, boardWidth * 0.04)
		const paddingY = this.isMobile
			? Math.max(18, boardHeight * 0.08)
			: Math.max(44, boardHeight * 0.16)

		const usableWidth = Math.max(boardWidth - paddingX * 2, cardWidth * 1.15)
		const usableHeight = Math.max(boardHeight - paddingY * 2, cardHeight * 1.2)

		const centerX = paddingX + clampedX * usableWidth
		const centerY = paddingY + clampedY * usableHeight

		left = centerX - visualWidth / 2
		top = centerY - visualHeight / 2

		left = clamp(left, 0, Math.max(0, boardWidth - visualWidth))
		top = clamp(top, 0, Math.max(0, boardHeight - visualHeight))

			// 移动到下一个随机索引
			this.currentRandomIndex++

			// 追踪生成进度
			this.cardsGenerated++
			if (CONFIG.DEBUG) {
				console.log(`卡片生成进度: ${this.cardsGenerated}/${this.totalCardsToGenerate}`)
			}
			if (this.cardsGenerated >= this.totalCardsToGenerate && this.onAllCardsGenerated) {
				console.log('所有卡片已生成，将触发回调')
				// 延迟触发回调，确保最后一张卡片已经完成渲染
				setTimeout(() => {
					if (this.onAllCardsGenerated) {
						console.log('执行卡片生成完成回调')
						this.onAllCardsGenerated()
					}
				}, CONFIG.ANIMATION.TRANSITION_DURATION + 100)
			}
		} else if (CONFIG.LAYOUT.USE_HEART_SHAPE) {
			// 获取当前位置索引对应的爱心坐标点
			const position = this.heartPositions[this.currentPositionIndex % this.heartPositions.length]

			// 计算可用区域（考虑卡片尺寸和边距）
			const availableWidth = window.innerWidth - horizontalMargin * 2
			const availableHeight = window.innerHeight - verticalMargin * 2

			// 计算爱心的缩放比例（取较小值以确保完整显示）
			const scaleRatio = this.isMobile ? 0.82 : 0.98
			const scale = Math.min(availableWidth, availableHeight) * scaleRatio

			// 将归一化坐标转换为实际像素坐标（居中显示）
			const centerX = horizontalMargin + (availableWidth - scale) / 2 + position.x * scale
			const centerY = verticalMargin + (availableHeight - scale) / 2 + position.y * scale

			left = centerX - visualWidth / 2
			top = centerY - visualHeight / 2

			// 添加一些随机偏移，让卡片看起来更自然、更密集
			const randomOffset = this.isMobile ? 4 : 8
			left += (Math.random() - 0.5) * randomOffset
			top += (Math.random() - 0.5) * randomOffset

			const minLeft = horizontalMargin
			const minTop = verticalMargin
			const maxLeft = window.innerWidth - horizontalMargin - visualWidth
			const maxTop = window.innerHeight - verticalMargin - visualHeight

			left = clamp(left, minLeft, Math.max(minLeft, maxLeft))
			top = clamp(top, minTop, Math.max(minTop, maxTop))

			// 循环使用位置
			this.currentPositionIndex++
		} else {
			// 随机生成位置（以卡片中心为准）
			const randomCenterX = horizontalMargin + Math.random() * Math.max(window.innerWidth - horizontalMargin * 2, 0)
			const randomCenterY = verticalMargin + Math.random() * Math.max(window.innerHeight - verticalMargin * 2, 0)
			left = randomCenterX - visualWidth / 2
			top = randomCenterY - visualHeight / 2

			const minLeft = horizontalMargin
			const minTop = verticalMargin
			const maxLeft = window.innerWidth - horizontalMargin - visualWidth
			const maxTop = window.innerHeight - verticalMargin - visualHeight
			left = clamp(left, minLeft, Math.max(minLeft, maxLeft))
			top = clamp(top, minTop, Math.max(minTop, maxTop))
		}

		// 不旋转，保持水平以便识别爱心形状
		const angle = 0

		// 设置样式 - 使用颜色类而不是直接设置背景色
		card.classList.add(`color-${colorIndex}`)
		card.style.left = `${left}px`
		card.style.top = `${top}px`

		// 设置HTML内容
		card.innerHTML = `
			<div class="card-header">
				<div class="window-controls">
					<button class="control close" type="button" aria-label="关闭"></button>
					<span class="control minimize"></span>
					<span class="control maximize"></span>
				</div>
				<div class="card-title">温馨提示</div>
			</div>
			<div class="card-body">${message}</div>
		`

		if (inTextPhase) {
			card.classList.add('text-phase-card')
		}

		if (letterIndexForCard !== null) {
			card.setAttribute('data-letter-index', String(letterIndexForCard))
		}

		// 初始化卡片状态
		stateManager.initCardState(card, {
			angle,
			scale: initialScaleForAnimation,
			translateX: 0,
			translateY: 0,
			left,
			top,
			lastPosition: { left, top }
		})

		// 应用初始transform
		const state = stateManager.getCardState(card)
		applyTransform(card, {
			scale: state.scale,
			rotate: state.angle
		})

		// 添加到DOM
		this.board.appendChild(card)
		stateManager.bringToFront(card)

		// 存储尺寸
		stateManager.updateCardState(card, {
			width: card.offsetWidth,
			height: card.offsetHeight
		})

		// 入场动画
		requestAnimationFrame(() => {
			stateManager.updateCardState(card, { scale: targetScale })
			applyTransform(card, {
				scale: targetScale,
				rotate: state.angle
			})
			card.style.opacity = '1'
		})

		// 绑定交互事件
		this.setupInteractions(card)

		// 只在非文字布局模式下限制卡片数量
		// 文字布局模式下需要保留所有卡片用于过渡动画
		if (!CONFIG.LAYOUT.USE_TEXT_LAYOUT) {
			this.limitCardCount()
		}

		this.updateBoardStageClasses()

		if (CONFIG.DEBUG) {
			console.log(`创建卡片后: 活动卡片数 = ${stateManager.getActiveCardCount()}`)
		}
	}

	/**
	 * 限制卡片数量，删除最旧的卡片
	 */
	limitCardCount() {
		const maxCards = this.isMobile
			? CONFIG.LIMITS.MAX_CARDS_MOBILE
			: CONFIG.LIMITS.MAX_CARDS_DESKTOP

		// 当卡片数量达到或超过限制时，删除最旧的卡片
		let deleted = 0
            while (stateManager.getActiveCardCount() > maxCards) {
                const oldest = this.board.firstElementChild
                if (oldest && oldest.classList.contains('card')) {
                    if (CONFIG.DEBUG) {
                        console.log(`删除最旧的卡片，当前数量: ${stateManager.getActiveCardCount()}`)
                    }
                    this.removeCard(oldest)
                    deleted++
                    if (deleted > 10) {
                        if (CONFIG.DEBUG) console.error('删除卡片过多，强制停止')
                        break // 防止无限循环
                    }
                } else {
                    break // 防止无限循环
                }
		}
	}

	/**
	 * 设置卡片交互事件
	 * @param {HTMLElement} card - 卡片元素
	 */
	setupInteractions(card) {
		const header = card.querySelector('.card-header')
		const closeBtn = card.querySelector('.control.close')

		// 防止快速重复点击
		let isProcessing = false

		closeBtn.addEventListener('click', event => {
			event.stopPropagation()
			if (!isProcessing) {
				isProcessing = true
				this.closeCard(card)
			}
		})

		// 拖拽事件（支持鼠标和触摸）
		header.addEventListener('pointerdown', event => {
			this.startDrag(event, card)
		})

		// 点击卡片置顶
		card.addEventListener('pointerdown', () => {
			stateManager.bringToFront(card)
		})
	}

	/**
	 * 开始拖拽（修复：支持触摸拖拽）
	 * @param {PointerEvent} event - 指针事件
	 * @param {HTMLElement} card - 卡片元素
	 */
	startDrag(event, card) {
		// 忽略按钮点击
		if (event.target.closest('.control')) return

		const state = stateManager.getCardState(card)
		if (!state || state.closing || state.maximized) return

		event.preventDefault()
		stateManager.bringToFront(card)

		const header = card.querySelector('.card-header')
		card.classList.add('dragging')
		header.classList.add('dragging')

		stateManager.updateCardState(card, {
			dragging: true,
			dragOffsetX: event.clientX - state.left,
			dragOffsetY: event.clientY - state.top
		})

		// 使用requestAnimationFrame节流拖拽更新
		let dragFrame = null
		let pendingLeft = state.left
		let pendingTop = state.top

		const commitDrag = () => {
			dragFrame = null
			const currentState = stateManager.getCardState(card)
			const cardWidth = currentState.width || card.offsetWidth
			const cardHeight = currentState.height || card.offsetHeight

			// 边界限制（允许少量超出）
			const overflowRatio = CONFIG.BOUNDARY.OVERFLOW_RATIO
			const maxLeft = window.innerWidth - cardWidth * (1 - overflowRatio)
			const maxTop = window.innerHeight - cardHeight * (1 - overflowRatio)
			const minLeft = -cardWidth * overflowRatio
			const minTop = -cardHeight * overflowRatio

			currentState.left = clamp(pendingLeft, minLeft, maxLeft)
			currentState.top = clamp(pendingTop, minTop, maxTop)

			card.style.left = `${currentState.left}px`
			card.style.top = `${currentState.top}px`
		}

		const handlePointerMove = moveEvent => {
			const currentState = stateManager.getCardState(card)
			if (!currentState || !currentState.dragging) return

			pendingLeft = moveEvent.clientX - currentState.dragOffsetX
			pendingTop = moveEvent.clientY - currentState.dragOffsetY

			if (dragFrame === null) {
				dragFrame = requestAnimationFrame(commitDrag)
			}
		}

		const handlePointerUp = () => {
			const currentState = stateManager.getCardState(card)
			if (currentState) {
				currentState.dragging = false
				currentState.lastPosition = {
					left: currentState.left,
					top: currentState.top
				}
			}

			card.classList.remove('dragging')
			header.classList.remove('dragging')

			if (dragFrame !== null) {
				cancelAnimationFrame(dragFrame)
				commitDrag()
			}

			document.removeEventListener('pointermove', handlePointerMove)
			document.removeEventListener('pointerup', handlePointerUp)
		}

		document.addEventListener('pointermove', handlePointerMove)
		document.addEventListener('pointerup', handlePointerUp)
	}

	/**
	 * 关闭卡片（修复：完整清理事件和状态）
	 * @param {HTMLElement} card - 卡片元素
	 */
	closeCard(card) {
		const state = stateManager.getCardState(card)
		if (!state || state.closing) return

		stateManager.updateCardState(card, { closing: true, scale: CONFIG.SCALE.MINIMIZED })

		const currentState = stateManager.getCardState(card)
		applyTransform(card, {
			scale: currentState.scale,
			rotate: currentState.angle
		})
		card.style.opacity = '0'

		const handleTransitionEnd = event => {
			if (event.propertyName === 'opacity') {
				card.removeEventListener('transitionend', handleTransitionEnd)
				this.removeCard(card)
			}
		}

		card.addEventListener('transitionend', handleTransitionEnd)
	}

	/**
	 * 移除卡片并清理资源（修复内存泄漏）
	 * @param {HTMLElement} card - 卡片元素
	 */
	removeCard(card) {
		// 清理状态管理器中的引用
		stateManager.cleanupCard(card)

		// 从DOM中移除
		card.remove()
	}

	/**
	 * 最小化卡片
	 * @param {HTMLElement} card - 卡片元素
	 */
	minimizeCard(card) {
		const state = stateManager.getCardState(card)
		if (!state || state.closing) return

		const runMinimize = () => {
			stateManager.updateCardState(card, { closing: true })
			stateManager.bringToFront(card)

			const cardWidth = state.width || card.offsetWidth
			const bottom = Math.max(window.innerHeight - 24, 0)
			const targetLeft = clamp(
				state.left,
				16,
				Math.max(window.innerWidth - cardWidth - 16, 16)
			)

			stateManager.updateCardState(card, {
				left: targetLeft,
				top: bottom,
				scale: CONFIG.SCALE.MINIMIZED,
				angle: 0
			})

			const currentState = stateManager.getCardState(card)
			card.style.left = `${currentState.left}px`
			card.style.top = `${currentState.top}px`
			card.style.opacity = '0.35'
			applyTransform(card, {
				scale: currentState.scale,
				rotate: 0
			})

			const handleTransitionEnd = event => {
				if (event.propertyName === 'transform') {
					card.removeEventListener('transitionend', handleTransitionEnd)
					this.removeCard(card)
				}
			}

			card.addEventListener('transitionend', handleTransitionEnd)
		}

		// 如果是全屏状态，先恢复再最小化
		if (state.maximized) {
			stateManager.clearMaximizedCard(card)
			card.classList.remove('maximized')
			card.style.borderRadius = `${CONFIG.CARD.BORDER_RADIUS}px`

			stateManager.updateCardState(card, {
				left: 0,
				top: 0,
				scale: CONFIG.SCALE.NORMAL,
				angle: 0
			})

			const currentState = stateManager.getCardState(card)
			applyTransform(card, {
				scale: currentState.scale,
				rotate: 0
			})

			requestAnimationFrame(() => {
				requestAnimationFrame(runMinimize)
			})
			return
		}

		runMinimize()
	}

	/**
	 * 切换全屏状态
	 * @param {HTMLElement} card - 卡片元素
	 */
	toggleMaximize(card) {
		const state = stateManager.getCardState(card)
		if (!state || state.closing) return

		if (state.maximized) {
			this.restoreFromMaximize(card)
		} else {
			this.maximizeCard(card)
		}
	}

	/**
	 * 全屏卡片
	 * @param {HTMLElement} card - 卡片元素
	 */
	maximizeCard(card) {
		const state = stateManager.getCardState(card)

		// 保存全屏前的状态
		stateManager.updateCardState(card, {
			beforeMaximize: {
				left: state.left,
				top: state.top,
				scale: state.scale ?? CONFIG.SCALE.NORMAL,
				width: card.offsetWidth,
				height: card.offsetHeight,
				angle: state.angle ?? 0
			}
		})

		card.classList.add('maximized')
		card.style.left = '0px'
		card.style.top = '0px'
		card.style.width = `${window.innerWidth}px`
		card.style.height = `${window.innerHeight}px`
		card.style.borderRadius = '0'

		stateManager.updateCardState(card, {
			left: 0,
			top: 0,
			scale: CONFIG.SCALE.NORMAL,
			angle: 0
		})

		const currentState = stateManager.getCardState(card)
		applyTransform(card, {
			scale: currentState.scale,
			rotate: 0
		})

		stateManager.setMaximizedCard(card)
	}

	/**
	 * 从全屏恢复
	 * @param {HTMLElement} card - 卡片元素
	 */
	restoreFromMaximize(card) {
		const state = stateManager.getCardState(card)
		const previous = state.beforeMaximize
		if (!previous) return

		card.classList.remove('maximized')
		card.style.left = `${previous.left}px`
		card.style.top = `${previous.top}px`
		card.style.width = `${previous.width}px`
		card.style.height = `${previous.height}px`
		card.style.borderRadius = `${CONFIG.CARD.BORDER_RADIUS}px`

		stateManager.updateCardState(card, {
			left: previous.left,
			top: previous.top,
			scale: previous.scale ?? CONFIG.SCALE.NORMAL,
			angle: previous.angle ?? 0
		})

		const currentState = stateManager.getCardState(card)
		applyTransform(card, {
			scale: currentState.scale,
			rotate: currentState.angle
		})

		stateManager.clearMaximizedCard(card)
		stateManager.bringToFront(card)
		stateManager.updateCardState(card, {
			lastPosition: { left: currentState.left, top: currentState.top }
		})

		// 恢复原始尺寸（使用正确的时间）
		setTimeout(() => {
			const latestState = stateManager.getCardState(card)
			if (latestState && !latestState.maximized) {
				card.style.width = ''
				card.style.height = ''
				stateManager.updateCardState(card, {
					width: card.offsetWidth,
					height: card.offsetHeight
				})
			}
		}, CONFIG.ANIMATION.TRANSITION_DURATION + 10)
	}

	/**
	 * 更新移动端状态
	 */
	updateMobileState() {
		const wasMobile = this.isMobile
		this.isMobile = isMobileDevice()

		// 如果移动端状态改变，重新获取位置坐标
		if (wasMobile !== this.isMobile) {
			this.loadLayouts(true)
		}
	}

	/**
	 * 重新布局所有卡片（用于全屏切换等窗口尺寸变化）
	 */
	relayoutCards() {
		if (!CONFIG.LAYOUT.USE_HEART_SHAPE) return

		const cards = document.querySelectorAll('.card')
		if (cards.length === 0) return

		// 计算参数
		const cardWidth = this.isMobile
			? CONFIG.CARD.MOBILE_WIDTH
			: CONFIG.CARD.DESKTOP_WIDTH
		const cardHeight = this.isMobile
			? CONFIG.CARD.MOBILE_HEIGHT
			: CONFIG.CARD.DESKTOP_HEIGHT
		const horizontalMargin = this.isMobile
			? CONFIG.SPACING.MOBILE_HORIZONTAL
			: CONFIG.SPACING.DESKTOP_HORIZONTAL
		const verticalMargin = this.isMobile
			? CONFIG.SPACING.MOBILE_VERTICAL
			: CONFIG.SPACING.DESKTOP_VERTICAL

		// 计算可用区域
		const availableWidth = window.innerWidth - cardWidth - horizontalMargin * 2
		const availableHeight = window.innerHeight - cardHeight - verticalMargin * 2

		// 计算爱心的缩放比例
		const scaleRatio = this.isMobile ? 0.82 : 0.98
		const scale = Math.min(availableWidth, availableHeight) * scaleRatio

		// 计算中心偏移
		const centerOffsetX = horizontalMargin + (availableWidth - scale) / 2
		const centerOffsetY = verticalMargin + (availableHeight - scale) / 2

		// 重新定位每张卡片
		cards.forEach((card, index) => {
			const state = stateManager.getCardState(card)
			if (!state || state.maximized || state.closing) return

			// 获取对应的爱心位置
			const position = this.heartPositions[index % this.heartPositions.length]

			// 计算新位置
			let newLeft = centerOffsetX + position.x * scale
			let newTop = centerOffsetY + position.y * scale

			// 添加随机偏移
			const randomOffset = this.isMobile ? 8 : 15
			newLeft += (Math.random() - 0.5) * randomOffset
			newTop += (Math.random() - 0.5) * randomOffset

			// 更新卡片位置
			card.style.left = `${newLeft}px`
			card.style.top = `${newTop}px`

			// 更新状态
			stateManager.updateCardState(card, {
				left: newLeft,
				top: newTop,
				lastPosition: { left: newLeft, top: newTop }
			})
		})
	}

	/**
	 * 处理窗口大小变化
	 */
	handleResize() {
		this.updateMobileState()

		// 更新全屏卡片尺寸
		const maximizedCard = stateManager.getMaximizedCard()
		if (maximizedCard) {
			maximizedCard.style.width = `${window.innerWidth}px`
			maximizedCard.style.height = `${window.innerHeight}px`
		}

		// 重新布局爱心形状的卡片
		this.relayoutCards()
	}
}
