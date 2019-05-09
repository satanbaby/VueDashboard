export function progress (progressEvent: any) {
  let Total = progressEvent.total
  let loaded = progressEvent.loaded

  let onprogress = (loaded / Total) * 100
  return onprogress
}

export function hasClassElement (el: any, className: string) {
  let check = el.classList.value.split(' ').indexOf(className)
  if (check !== -1) {
    return true
  }
  return false
}
