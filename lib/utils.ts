import { isBefore, isSameDay, parse } from 'date-fns'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getDatesBetweenDates = (
  startDate: Date,
  endDate: Date,
): Date[] => {
  let dates: Date[] = []
  //to avoid modifying the original date
  const theDate = new Date(startDate)
  while (theDate <= endDate) {
    dates = [...dates, new Date(theDate)]
    theDate.setDate(theDate.getDate() + 1)
  }
  return dates
}

export function range(start: number, end: number): number[] {
  return Array(end - start + 1)
    .fill(1)
    .map((_, idx) => start + idx)
}
// Return the first item in an array
export function head<T>(array: T[]): T {
  return array[0]
}

// Return the rest of an array after the first item
export function tail<T>(array: T[]): T[] {
  return array.slice(1)
}

export function concat<T>(array1: T[], array2: T[]) {
  return array1.concat(array2)
}

export function length<T>(array: T[]) {
  return array.length
}

export function reduce<TElement, TResult>(
  reducerFn: (result: TResult, el: TElement) => TResult,
  initialValue: TResult,
  array: TElement[],
): TResult {
  if (length(array) === 0) return initialValue
  const newInitialValue = reducerFn(initialValue, head(array))
  return reduce(reducerFn, newInitialValue, tail(array))
}

type IFieldIndex = {
  [key: string]: unknown
  date: string
}

// getting array of object and find object index by date field
export function getIndexByDate(fields: IFieldIndex[], date: Date): number {
  const field = head(fields)
  if (length(fields) === 0) return 1
  const parsedDate = parse(field.date, 'yy-MM-dd', new Date())
  if (isSameDay(parsedDate, date)) return -1
  if (isBefore(date, parsedDate)) return 0

  const counter = getIndexByDate(tail(fields), date)
  return counter < 0 ? counter : counter + 1
}

export function convertPromiseAll<T>(result: PromiseSettledResult<T>[]) {
  const successCount = result.filter((r) => r.status === 'fulfilled').length
  const errors: string[] = result
    .filter((r) => r.status === 'rejected')
    .map((r) => {
      if (r.status === 'rejected') {
        return r.reason
      }
    })
  return { errors, successCount }
}
