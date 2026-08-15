export function getMaxDate() {
  const today = new Date()
  const maxDate = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate(),
  )

  return maxDate.toISOString().split("T")[0]
}
