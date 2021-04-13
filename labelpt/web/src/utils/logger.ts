export const log = (text: any): void => {
  if (process.env.REACT_APP_DEBUG === 'false') {
    return
  }
  console.log(text)
}

export const errorLog = (text: any): void => {
  console.error(text)
}
