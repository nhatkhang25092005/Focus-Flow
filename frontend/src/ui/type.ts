// Toast types definition
export type ToastStyle = "success" | "error" | "info" | "warning"
export type ToastDirection = "left" | "right" | "up" | "down"
export type VisibleState = "hidden" | "start" | "end"
export type ToastPosition = "down-right" | "up-right" | "up-left" | "down-left"
export interface ToastState {
  message: string
  style: ToastStyle
  visible: VisibleState
  direction: ToastDirection
  position: ToastPosition
  vertical: number
  horizon: number
}
export interface ToastProps extends ToastState {
  onAnimationEnd: () => void
}
export type ToastApiService = {
  message: string
  style: ToastStyle
  duration?: number
  position?: ToastPosition
  direction?: ToastDirection
}

// Popup types definition
export type PopupStyle = "success" | "error" | "info" | "warning"
export interface PopupState {
  title: string
  message: string
  style: PopupStyle
  visible: boolean
  navigateTo?: string
  buttonText: string
}

// Loading types definition
export type LoadingPhase = "enter" | "exit"
export interface LoadingState {
  isLoading: boolean
  phase?: LoadingPhase
  message?: string
}
