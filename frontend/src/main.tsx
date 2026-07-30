import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/global.css"
import "./styles/fonts.css"
import App from "./App.tsx"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import "./i18n"
import UiHost from "./ui/UIHost.tsx"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <UiHost>
      <StrictMode>
        <App />
      </StrictMode>
    </UiHost>
  </Provider>,
)
