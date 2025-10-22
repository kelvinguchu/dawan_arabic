import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import type { Locale, FormatDistanceFn } from 'date-fns'

const translations: Record<string, string> = {
  lessThanXSeconds: 'أقل من {{count}} ثانية',
  xSeconds: '{{count}} ثانية',
  halfAMinute: 'نصف دقيقة',
  lessThanXMinutes: 'أقل من {{count}} دقيقة',
  xMinutes: '{{count}} دقيقة',
  aboutXHours: 'حوالي {{count}} ساعة',
  xHours: '{{count}} ساعة',
  xDays: '{{count}} يوم',
  aboutXWeeks: 'حوالي {{count}} أسبوع',
  xWeeks: '{{count}} أسبوع',
  aboutXMonths: 'حوالي {{count}} شهر',
  xMonths: '{{count}} شهر',
  aboutXYears: 'حوالي {{count}} سنة',
  xYears: '{{count}} سنة',
  overXYears: 'أكثر من {{count}} سنة',
  almostXYears: 'أكثر من {{count}} سنة',
}

const formatDistance: FormatDistanceFn = (token, count, options) => {
  const translation = translations[token]
  const result = translation ? translation.replace('{{count}}', count.toString()) : ''

  if (options?.addSuffix) {
    if ((options.comparison || 0) > 0) {
      return 'خلال ' + result
    } else {
      return result + ' مضى'
    }
  }

  return result
}

const arLocale: Locale = {
  ...enUS,
  code: 'ar',
  formatDistance: formatDistance,
}

export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      console.warn('Invalid dateString provided to formatTimeAgo:', dateString)
      return 'تاريخ غير صالح'
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: arLocale })
  } catch (error) {
    console.error('Error in formatTimeAgo:', error)
    return 'التاريخ غير متوفر'
  }
}
