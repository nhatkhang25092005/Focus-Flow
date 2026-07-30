import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ToastDirection, ToastPosition, ToastStyle } from "./type"
import type { ToastState, PopupState, LoadingState } from "./type"
export interface UiState {
  loading: LoadingState
  toast: ToastState
  popup: PopupState
}
const initialUIState: UiState = {
  loading: {
    isLoading: false,
    phase: "enter",
    message: "",
  },
  toast: {
    message: "",
    style: "info",
    visible: "hidden",
    direction: "left",
    position: "down-right",
    vertical: 0,
    horizon: 0,
  },
  popup: {
    message: "",
    style: "info",
    visible: false,
  },
}
export const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    setLoading(state, action: PayloadAction<LoadingState>) {
      state.loading.isLoading = action.payload.isLoading
      state.loading.message = action.payload.message || ""
      state.loading.phase = action.payload.phase || "enter"
    },
    showToast(
      state,
      action: PayloadAction<{
        message: string
        style: ToastStyle
        direction?: ToastDirection
        position?: ToastPosition
        vertical?: number
        horizon?: number
      }>,
    ) {
      state.toast = {
        message: action.payload.message,
        style: action.payload.style,
        direction: action.payload.direction || "left",
        position: action.payload.position || "down-right",
        vertical: 0,
        horizon: 0,
        visible: "start",
      }
    },
    endToast(state) {
      state.toast.visible = "end"
    },
    hideToast(state) {
      state.toast.visible = "hidden"
    },
    showPopup(
      state,
      action: PayloadAction<{
        message: string
        style: "success" | "error" | "info" | "navigate"
      }>,
    ) {
      state.popup = {
        message: action.payload.message,
        style: action.payload.style,
        visible: true,
      }
    },
    hidePopup(state) {
      state.popup.visible = false
    },
  },
})

export const {
  setLoading,
  showToast,
  endToast,
  hideToast,
  showPopup,
  hidePopup,
} = uiSlice.actions

export default uiSlice.reducer
