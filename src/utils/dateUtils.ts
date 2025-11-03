import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import type { Locale, FormatDistanceFn } from 'date-fns'

const formatUnit = (
  count: number,
  forms: { singular: string; dual: string; plural: string; pluralWithNumber: string },
) => {
  if (count === 1) {
    return forms.singular
  }

  if (count === 2) {
    return forms.dual
  }

  if (count >= 3 && count <= 10) {
    return `${count} ${forms.plural}`
  }

  return `${count} ${forms.pluralWithNumber}`
}

const units = {
  second: {
    singular: 'ثانية واحدة',
    dual: 'ثانيتين',
    plural: 'ثوانٍ',
    pluralWithNumber: 'ثانية',
  },
  minute: {
    singular: 'دقيقة واحدة',
    dual: 'دقيقتين',
    plural: 'دقائق',
    pluralWithNumber: 'دقيقة',
  },
  hour: {
    singular: 'ساعة واحدة',
    dual: 'ساعتين',
    plural: 'ساعات',
    pluralWithNumber: 'ساعة',
  },
  day: {
    singular: 'يوم واحد',
    dual: 'يومين',
    plural: 'أيام',
    pluralWithNumber: 'يوم',
  },
  week: {
    singular: 'أسبوع واحد',
    dual: 'أسبوعين',
    plural: 'أسابيع',
    pluralWithNumber: 'أسبوع',
  },
  month: {
    singular: 'شهر واحد',
    dual: 'شهرين',
    plural: 'أشهر',
    pluralWithNumber: 'شهر',
  },
  year: {
    singular: 'سنة واحدة',
    dual: 'سنتين',
    plural: 'سنوات',
    pluralWithNumber: 'سنة',
  },
}

const translations: Record<string, (count: number) => string> = {
  lessThanXSeconds: (count) => `أقل من ${formatUnit(count, units.second)}`,
  xSeconds: (count) => formatUnit(count, units.second),
  halfAMinute: () => 'نصف دقيقة',
  lessThanXMinutes: (count) => `أقل من ${formatUnit(count, units.minute)}`,
  xMinutes: (count) => formatUnit(count, units.minute),
  aboutXMinutes: (count) => `حوالي ${formatUnit(count, units.minute)}`,
  aboutXHours: (count) => `حوالي ${formatUnit(count, units.hour)}`,
  xHours: (count) => formatUnit(count, units.hour),
  xDays: (count) => formatUnit(count, units.day),
  aboutXWeeks: (count) => `حوالي ${formatUnit(count, units.week)}`,
  xWeeks: (count) => formatUnit(count, units.week),
  aboutXMonths: (count) => `حوالي ${formatUnit(count, units.month)}`,
  xMonths: (count) => formatUnit(count, units.month),
  aboutXYears: (count) => `حوالي ${formatUnit(count, units.year)}`,
  xYears: (count) => formatUnit(count, units.year),
  overXYears: (count) => `أكثر من ${formatUnit(count, units.year)}`,
  almostXYears: (count) => `قرابة ${formatUnit(count, units.year)}`,
}

const formatDistance: FormatDistanceFn = (token, count, options) => {
  const formatter = translations[token]
  const result = formatter ? formatter(count) : `${count}`

  if (options?.addSuffix) {
    if ((options.comparison || 0) > 0) {
      return `بعد ${result}`
    }
    return `قبل ${result}`
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

    if (Number.isNaN(date.getTime())) {
      console.warn('Invalid dateString provided to formatTimeAgo:', dateString)
      return 'تاريخ غير صالح'
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: arLocale })
  } catch (error) {
    console.error('Error in formatTimeAgo:', error)
    return 'التاريخ غير متوفر'
  }
}
