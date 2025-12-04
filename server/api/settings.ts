let settings = {
  weekStart: 1
}

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    console.log('Server received POST settings:', body)
    if (body.weekStart !== undefined) {
      settings.weekStart = body.weekStart
    }
    return settings
  }
  return settings
})
