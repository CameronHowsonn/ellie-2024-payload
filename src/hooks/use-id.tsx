const useId = (prefix: string): string => {
  return `${prefix}-${Math.floor(Math.random() * 10000)}`
}
export default useId
