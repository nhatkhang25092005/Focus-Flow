import Backdrop from "./Backdrop"
import { useAppSelector } from "../../app/hooks"
export default function Popup() {
  const { visible, style, message } = useAppSelector((state) => state.ui.popup)
  return (
    <Backdrop isOpen={visible} duration={200}>
      <div></div>
    </Backdrop>
  )
}
