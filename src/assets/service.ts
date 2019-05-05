export function progress (progressEvent: any) {
  let Total = progressEvent.total
  let loaded = progressEvent.loaded

  let onprogress = (loaded / Total) * 100
  return onprogress
}
