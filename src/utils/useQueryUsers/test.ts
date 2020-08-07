import { useQueryUsers } from "."

describe("useQueryUsers", () => {
  it("works", () => {
    // Arrange
    const valA = 1

    // Act
    const received = useQueryUsers(valA)
    const expected = 1

    // Assert
    expect(received).toEqual(expected)
  })
})
