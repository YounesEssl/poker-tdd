export function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = []

  function helper(start: number, current: T[]) {
    if (current.length === k) {
      result.push([...current])
      return
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i])
      helper(i + 1, current)
      current.pop()
    }
  }

  helper(0, [])
  return result
}
