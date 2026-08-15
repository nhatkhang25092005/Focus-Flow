import { render } from "@testing-library/react"
import { describe, it } from "vitest"
import { useMemo } from "react"

function Test() {
  const value = useMemo(() => 123, [])

  return <div>{value}</div>
}

describe("React", () => {
  it("works", () => {
    render(<Test />)
  })
})