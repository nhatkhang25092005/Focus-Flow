import { ZodError } from "zod"
export const formatZodError = (error: ZodError, t: (key: string) => string) => {
  const formattedErrors: Record<string, string> = {}

  error.issues.forEach((issue) => {
    const path = issue.path[0]?.toString()
    if (path && !formattedErrors[path]) {
      formattedErrors[path] = t(issue.message)
    }
  })

  return formattedErrors
}
