import { DateTime, DurationLike } from 'luxon';

export class DateHelper {
  static addToCurrent(duration: DurationLike): Date {
    const dt = DateTime.now();
    return dt.plus(duration).toJSDate();
  }

  static isAfterCurrent(date: Date): boolean {
    const d1 = DateTime.fromJSDate(date ?? new Date());
    const d2 = DateTime.now();
    return d2 > d1;
  }

  static startOfDay(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .startOf('day')
      .toJSDate();
  }

  static endOfDay(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .endOf('day')
      .toJSDate();
  }

  static isValidDate(date: Date): boolean {
    // set date format to accept
    const dateFormat = 'yyyy-MM-dd';
    // check if date is valid
    return DateTime.fromFormat(date.toString(), dateFormat).isValid;
  }

  static startOfWeek(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .startOf('week')
      .toJSDate();
  }

  static endOfWeek(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .endOf('week')
      .toJSDate();
  }

  static startOfMonth(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .startOf('month')
      .toJSDate();
  }

  static endOfMonth(date: Date): Date {
    return DateTime.fromJSDate(date ?? new Date())
      .endOf('month')
      .toJSDate();
  }

  static buildDate(p: { date: string; time: string; timezone: string }) {
    return DateTime.fromFormat(`${p.date} ${p.time}`, 'yyyy-MM-dd HH:mm', {
      zone: p.timezone,
    })
      .toUTC()
      .toString();
  }
}
