import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Typography from "../../components/text/Typography"

describe("Typography Component", () => {
  it("renders children content", () => {
    render(<Typography>Hello FocusFlow</Typography>)
    expect(screen.getByText("Hello FocusFlow")).toBeInTheDocument()
  })

  it("renders correct default HTML element for variants", () => {
    const { container: h1Container } = render(<Typography variant="h1">Heading 1</Typography>)
    expect(h1Container.querySelector("h1")).toBeInTheDocument()

    const { container: h2Container } = render(<Typography variant="h2">Heading 2</Typography>)
    expect(h2Container.querySelector("h2")).toBeInTheDocument()

    const { container: captionContainer } = render(<Typography variant="caption">Caption Text</Typography>)
    expect(captionContainer.querySelector("span")).toBeInTheDocument()
  })

  it("allows overriding HTML element tag with 'as' prop", () => {
    const { container } = render(
      <Typography variant="h1" as="h3">
        Custom Tag
      </Typography>
    )
    expect(container.querySelector("h3")).toBeInTheDocument()
    expect(container.querySelector("h1")).toBeNull()
  })

  it("applies font weight, color, italic, underline, and truncate classes", () => {
    render(
      <Typography
        variant="body"
        color="amber"
        weight="semibold"
        italic
        underline
        truncate
        className="custom-class"
      >
        Styled Text
      </Typography>
    )
    const element = screen.getByText("Styled Text")
    expect(element).toHaveClass("text-amber-500")
    expect(element).toHaveClass("font-semibold")
    expect(element).toHaveClass("italic")
    expect(element).toHaveClass("underline")
    expect(element).toHaveClass("truncate")
    expect(element).toHaveClass("custom-class")
  })
})
