import {
  setLoading,
  showToast,
  showPopup,
  hidePopup,
  endToast,
  hideToast,
} from "./slice"
import { store } from "../app/store"
import type { ToastApiService } from "./type"
let toastTimer: ReturnType<typeof setTimeout> | null = null
export const uiService = {
  /**
   * Services for loading effect
   */
  loading: {
    asyncLoading: async <T>(
      request: () => Promise<T>,
      loadingMessage?: string,
    ): Promise<T> => {
      try {
        store.dispatch(
          setLoading({
            isLoading: true,
            message: loadingMessage,
            phase: "enter",
          }),
        )
        const result = await request()
        return result
      } finally {
        store.dispatch(setLoading({ isLoading: false, phase: "exit" }))
      }
    },
  },

  /**
   * Services for toast effect
   */
  toast: {
    showToast: ({
      message,
      style,
      position,
      direction,
      duration,
    }: ToastApiService) => {
      if (toastTimer) {
        clearTimeout(toastTimer)
        store.dispatch(endToast())
      }
      store.dispatch(showToast({ message, style, position, direction }))
      toastTimer = setTimeout(() => {
        store.dispatch(endToast())
        toastTimer = null
      }, duration)
    },

    endToast: () => {
      store.dispatch(endToast())
    },

    hideToast: () => {
      store.dispatch(hideToast())
    },
  },

  showPopup: (
    title: string,
    message: string,
    style: "success" | "error" | "info" | "navigate",
    navigateTo?: string,
  ) => {
    store.dispatch(showPopup({ title, message, style, navigateTo }))
  },

  hidePopup: () => {
    store.dispatch(hidePopup())
  },
}
