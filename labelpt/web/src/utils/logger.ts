

export const log = (text: any): void => {
  if (!process.env.DEBUG) {
    return
  }
  console.log(text)
}

export const errorLog = (text: any): void => {
  console.error(text)
}