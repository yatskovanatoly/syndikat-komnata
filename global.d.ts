import ru from './messages/ru.json'

type Messages = typeof ru

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages
}
