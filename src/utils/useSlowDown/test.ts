import { useSlowDown } from "."

describe("useSlowDown", () => {
  it("works", () => {
    // Arrange
    const valA = 1

    // Act
    const received = useSlowDown(valA)
    const expected = 1

    // Assert
    expect(received).toEqual(expected)
  })
})
