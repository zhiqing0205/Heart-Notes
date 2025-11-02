/**
 * 过渡动画管理器
 * 负责处理 ZIUCH 文字到爱心形状的过渡动画
 */

import { CONFIG } from './config.js'
import { stateManager } from './stateManager.js'
import { isMobileDevice } from './utils.js'

/**
 * 过渡管理器类
 */
export class TransitionManager {
	constructor(cardManager) {
		this.cardManager = cardManager
		this.isTransitioning = false
		this.hasTransitioned = false
		this.heartbeatAnimationId = null
	}

	/**
	 * 开始从文字到爱心的过渡动画
	 */
	startTransition() {
		if (this.isTransitioning || this.hasTransitioned) return
		if (!CONFIG.LAYOUT.TRANSITION_TO_HEART) return

		this.isTransitioning = true
		console.log('开始过渡动画：ZIUCH → 爱心')

		// 获取所有卡片
		const cards = Array.from(document.querySelectorAll('.card'))
		if (cards.length === 0) {
			this.isTransitioning = false
			return
		}

		// 获取爱心位置坐标
		const heartPositions = CONFIG.LAYOUT.getHeartPositions()
		const isMobile = isMobileDevice()

		// 计算位置参数
		const cardWidth = isMobile
			? CONFIG.CARD.MOBILE_WIDTH
			: CONFIG.CARD.DESKTOP_WIDTH
		const cardHeight = isMobile
			? CONFIG.CARD.MOBILE_HEIGHT
			: CONFIG.CARD.DESKTOP_HEIGHT
		const horizontalMargin = isMobile
			? CONFIG.SPACING.MOBILE_HORIZONTAL
			: CONFIG.SPACING.DESKTOP_HORIZONTAL
		const verticalMargin = isMobile
			? CONFIG.SPACING.MOBILE_VERTICAL
			: CONFIG.SPACING.DESKTOP_VERTICAL

		// 计算可用区域
		const availableWidth = window.innerWidth - horizontalMargin * 2
		const availableHeight = window.innerHeight - verticalMargin * 2

		// 计算爱心的缩放比例
		const scaleRatio = isMobile ? 0.82 : 0.98
		const scale = Math.min(availableWidth, availableHeight) * scaleRatio

		// 计算中心偏移
		const centerOffsetX = horizontalMargin + (availableWidth - scale) / 2
		const centerOffsetY = verticalMargin + (availableHeight - scale) / 2

		// 为每张卡片添加过渡样式
		cards.forEach((card, index) => {
			const state = stateManager.getCardState(card)
			if (!state || state.maximized || state.closing) return
			card.classList.remove('text-phase-card')

			// 获取对应的爱心位置
			const heartPosition = heartPositions[index % heartPositions.length]

			// 计算新位置
			let centerX = centerOffsetX + heartPosition.x * scale
			let centerY = centerOffsetY + heartPosition.y * scale
			const targetScale = 1
			const visualWidth = cardWidth * targetScale
			const visualHeight = cardHeight * targetScale
			let newLeft = centerX - visualWidth / 2
			let newTop = centerY - visualHeight / 2

			// 添加随机偏移
			const randomOffset = isMobile ? 4 : 10
			newLeft += (Math.random() - 0.5) * randomOffset
			newTop += (Math.random() - 0.5) * randomOffset
			const minLeft = horizontalMargin
			const minTop = verticalMargin
			const maxLeft = window.innerWidth - horizontalMargin - visualWidth
			const maxTop = window.innerHeight - verticalMargin - visualHeight
			newLeft = Math.min(Math.max(newLeft, minLeft), Math.max(minLeft, maxLeft))
			newTop = Math.min(Math.max(newTop, minTop), Math.max(minTop, maxTop))

			// 添加过渡样式（包括 transform 的过渡）
			const delay = index * 8 // 错落延迟（ms）
			card.style.transition = `left 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, top 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`

			// 延迟触发位置变化
			setTimeout(() => {
				card.style.left = `${newLeft}px`
				card.style.top = `${newTop}px`
				// 将所有卡片恢复到正常大小和无旋转状态
				card.style.transform = 'scale(1) rotate(0deg)'

				// 更新状态
				stateManager.updateCardState(card, {
					left: newLeft,
					top: newTop,
					scale: 1,
					angle: 0,
					lastPosition: { left: newLeft, top: newTop }
				})
			}, 10)
		})

		// 计算完成时间（最后一张卡片的延迟 + 过渡时长）
		const totalDuration = cards.length * 8 + 1200 + 500

		// 过渡完成后
		setTimeout(() => {
			// 清除过渡样式和内联 transform，让 CSS 动画能够生效
			cards.forEach(card => {
				card.style.transition = ''
				// 清除内联 transform，保留位置信息
				card.style.transform = ''
			})

			this.isTransitioning = false
			this.hasTransitioned = true

			console.log('过渡动画完成')

			this.runHeartEmphasis().then(() => this.startHeartbeat())
		}, totalDuration)
	}

	runHeartEmphasis() {
		const board = document.getElementById('board')
		if (!board) return Promise.resolve()

		return new Promise(resolve => {
			const className = 'heart-emphasis'
			board.classList.remove(className)
			void board.offsetWidth
			let finished = false

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
			setTimeout(cleanup, 1800)
		})
	}

	/**
	 * 启动心跳动画
	 */
	startHeartbeat() {
		const board = document.getElementById('board')
		if (!board) return

		// 为 board 添加心跳动画及背景
		board.classList.add('heartbeat-animation', 'heart-background')
		board.style.setProperty('--heart-bg-image', `url('${CONFIG.BACKGROUND.HEART_IMAGE}')`)
		if (typeof document !== 'undefined') {
			document.body.style.setProperty('--heart-bg-image', `url('${CONFIG.BACKGROUND.HEART_IMAGE}')`)
			document.body.classList.add('heart-theme')
		}

		console.log('心跳动画已启动')
	}

	/**
	 * 停止心跳动画
	 */
	stopHeartbeat() {
		const board = document.getElementById('board')
		if (!board) return

		board.classList.remove('heartbeat-animation')

		if (this.heartbeatAnimationId) {
			cancelAnimationFrame(this.heartbeatAnimationId)
			this.heartbeatAnimationId = null
		}

		console.log('心跳动画已停止')
	}

	/**
	 * 重置过渡状态（用于重新开始）
	 */
	reset() {
		this.stopHeartbeat()
		const board = document.getElementById('board')
		if (board) {
			board.classList.remove('text-emphasis', 'heart-emphasis', 'heart-background')
			board.style.removeProperty('--heart-bg-image')
		}
		if (typeof document !== 'undefined') {
			document.body.classList.remove('heart-theme')
			document.body.style.removeProperty('--heart-bg-image')
		}
		this.isTransitioning = false
		this.hasTransitioned = false
	}
}
