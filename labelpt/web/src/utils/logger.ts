export const log = (text: any, ...optional: any[]): void => {
  if (process.env.REACT_APP_DEBUG === 'false') {
    return
  }
  console.log(text, ...optional)
}

export const errorLog = (text: any): void => {
  console.error(text)
}
