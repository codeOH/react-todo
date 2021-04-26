const deepClone = obj => {
  if (typeof obj !== 'object') {
    return obj
  }

  let copiedObj = null

  if (Array.isArray(obj)) {
    copiedObj = []
  } else {
    copiedObj = {}
  }

  for (let prop in obj) {
    copiedObj[prop] =
      typeof copiedObj[prop] === 'object'
        ? deepClone(copiedObj[prop])
        : obj[prop]
  }

  return copiedObj
}

const isEmptyObj = obj => {
  return !obj || Object.keys(obj).length === 0
}

export { deepClone, isEmptyObj }
