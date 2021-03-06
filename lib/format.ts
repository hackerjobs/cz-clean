import wrap from 'wrap-ansi'

import { Format } from './types' // eslint-disable-line no-unused-vars

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1)

export default ({ type, subject, body }: Format) => {
  const formattedSubject = subject.replace(/\.+$/, '')

  if (formattedSubject.length === 0) {
    throw new Error('Commit subject must be at least 1 character long.\n')
  }

  if (`${type}: ${formattedSubject}`.length > 50) {
    throw new Error('Commit type + subject must be 50 or less characters long.\n')
  }

  const commit = {
    short: `${type}: ${formattedSubject}`.toLowerCase(),
    long: body ? wrap(capitalize(body), 100) + '.' : null
  }

  return commit
}
