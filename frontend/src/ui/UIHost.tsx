import GlobalLoading from "./components/GlobalLoading"
import Popup from "./components/Popup"
import { useAppSelector } from "../app/hooks"
import Toast from "./components/Toast"
import { uiService } from "./service"
import { useCallback } from "react"
export default function UiHost({ children }: { children: React.ReactNode }) {
  const { toast, loading } = useAppSelector((state) => state.ui)
  const handleToastAnimationEnd = useCallback(() => {
    if (toast.visible === "hidden") uiService.toast.hideToast()
  }, [toast.visible])
  return (
    <>
      <GlobalLoading isLoading={loading.isLoading} message={loading.message} />
      <Popup />
      <Toast {...toast} onAnimationEnd={handleToastAnimationEnd} />
      {children}
    </>
  )
}
