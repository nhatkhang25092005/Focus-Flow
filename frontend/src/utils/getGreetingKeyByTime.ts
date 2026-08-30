export function getGreetingKeyByTime() {
  const hour = new Date().getHours()

  if (hour < 12) return "home.greeting.morning"
  if (hour < 18) return "home.greeting.afternoon"
  return "home.greeting.evening"
}