/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import jalaali from 'jalaali-js';
import { JalaliDate, GregorianDate, StaticHoliday, CalendarDay } from '../types';

// Strict definitions for Solar Hijri year 1405 (equivalent to March 21, 2026 - March 20, 2027)
export const CURRENT_JALALI_YEAR = 1405;

export const JALALI_MONTH_NAMES = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

export const JALALI_WEEKDAY_NAMES = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه'
];

// generic leap year algorithm from jalaali-js
export function isLeapJalaliYear(jy: number): boolean {
  return jalaali.isLeapJalaaliYear(jy);
}

// Get the number of days in a Jalali month from jalaali-js
export function getJalaliMonthLength(jy: number, jm: number): number {
  return jalaali.jalaaliMonthLength(jy, jm);
}

// Converts Jalali year, month, day to Gregorian from jalaali-js
export function toGregorian(jy: number, jm: number, jd: number): GregorianDate {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return { gy, gm, gd };
}

// Convert Gregorian to Jalali from jalaali-js
export function dateToJalali(date: Date): JalaliDate {
  const { jy, jm, jd } = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return { jy, jm, jd };
}

// Static Persian Calendar (Solar) Holidays specifically for Jalali Month
export const SOLAR_HOLIDAYS_1405: StaticHoliday[] = [
  { month: 1, day: 1, title: 'آغاز نوروز (تعطیل)', isHoliday: true },
  { month: 1, day: 2, title: 'عید نوروز (تعطیل)', isHoliday: true },
  { month: 1, day: 3, title: 'عید نوروز (تعطیل)', isHoliday: true },
  { month: 1, day: 4, title: 'عید نوروز (تعطیل)', isHoliday: true },
  { month: 1, day: 12, title: 'روز جمهوری اسلامی ایران (تعطیل)', isHoliday: true },
  { month: 1, day: 13, title: 'روز طبیعت / سیزده‌بدر (تعطیل)', isHoliday: true },
  { month: 1, day: 18, title: 'روز جهانی بهداشت', isHoliday: false },
  { month: 1, day: 25, title: 'روز بزرگداشت عطار نیشابوری', isHoliday: false },
  { month: 1, day: 29, title: 'روز ارتش جمهوری اسلامی ایران', isHoliday: false },
  
  { month: 2, day: 1, title: 'روز بزرگداشت سعدی شیرازی', isHoliday: false },
  { month: 2, day: 3, title: 'روز بزرگداشت شیخ بهایی / روز معمار', isHoliday: false },
  { month: 2, day: 10, title: 'روز ملی خلیج فارس', isHoliday: false },
  { month: 2, day: 12, title: 'روز معلم / شهادت مرتضی مطهری', isHoliday: false },
  { month: 2, day: 15, title: 'روز بزرگداشت شیخ کلینی / روز شیراز', isHoliday: false },
  { month: 2, day: 25, title: 'روز بزرگداشت فردوسی', isHoliday: false },
  { month: 2, day: 28, title: 'روز بزرگداشت خیام نیشابوری', isHoliday: false },
  
  { month: 3, day: 1, title: 'روز بزرگداشت ملاصدرا', isHoliday: false },
  { month: 3, day: 3, title: 'فتح خرمشهر / روز مقاومت و ایثار', isHoliday: false },
  { month: 3, day: 14, title: 'رحلت امام خمینی (تعطیل)', isHoliday: true },
  { month: 3, day: 15, title: 'قیام خونین ۱۵ خرداد (تعطیل)', isHoliday: true },
  { month: 3, day: 20, title: 'روز جهانی صنایع دستی', isHoliday: false },
  
  { month: 4, day: 1, title: 'روز اصناف', isHoliday: false },
  { month: 4, day: 7, title: 'شهادت دکتر بهشتی و ۷۲ تن از یارانش (تعطیل)', isHoliday: true },
  { month: 4, day: 10, title: 'روز صنعت و معدن', isHoliday: false },
  { month: 4, day: 14, title: 'روز قلم', isHoliday: false },
  { month: 4, day: 25, title: 'روز بهزیستی و تامین اجتماعی', isHoliday: false },
  
  { month: 5, day: 8, title: 'روز بزرگداشت سهروردی', isHoliday: false },
  { month: 5, day: 14, title: 'صدور فرمان مشروطیت', isHoliday: false },
  { month: 5, day: 17, title: 'روز خبرنگار', isHoliday: false },
  { month: 5, day: 28, title: 'سالروز کودتای ۲۸ مرداد', isHoliday: false },
  
  { month: 6, day: 1, title: 'روز پزشک / بزرگداشت ابن سینا', isHoliday: false },
  { month: 6, day: 4, title: 'روز کارمند', isHoliday: false },
  { month: 6, day: 5, title: 'روز داروساز / بزرگداشت زکریای رازی', isHoliday: false },
  { month: 6, day: 21, title: 'روز ملی سینما', isHoliday: false },
  { month: 6, day: 27, title: 'روز شعر و ادب فارسی / بزرگداشت استاد شهریار', isHoliday: false },
  
  { month: 7, day: 1, title: 'آغاز سال تحصیلی جدید و بازگشایی مدارس', isHoliday: false },
  { month: 7, day: 8, title: 'روز جهانی ناشنوایان / بزرگداشت مولوی', isHoliday: false },
  { month: 7, day: 13, title: 'روز نیروی انتظامی', isHoliday: false },
  { month: 7, day: 16, title: 'روز جهانی کودک', isHoliday: false },
  { month: 7, day: 20, title: 'روز بزرگداشت حافظ شیرازی', isHoliday: false },
  
  { month: 8, day: 8, title: 'روز نوجوان / شهادت محمدحسین فهمیده', isHoliday: false },
  { month: 8, day: 13, title: 'روز دانش‌آموز', isHoliday: false },
  { month: 8, day: 14, title: 'روز فرهنگ عمومی', isHoliday: false },
  { month: 8, day: 24, title: 'روز کتاب و کتابخوانی', isHoliday: false },
  
  { month: 9, day: 5, title: 'روز بسیج مستضعفین', isHoliday: false },
  { month: 9, day: 7, title: 'روز نیروی دریایی', isHoliday: false },
  { month: 9, day: 16, title: 'روز دانشجو', isHoliday: false },
  { month: 9, day: 30, title: 'شب یلدا (شنبه مهر)', isHoliday: false },
  
  { month: 10, day: 5, title: 'روز ملی ایمنی در برابر زلزله', isHoliday: false },
  { month: 10, day: 20, title: 'شهادت امیرکبیر در حمام فین کاشان', isHoliday: false },
  
  { month: 11, day: 12, title: 'آغاز دهه فجر انقلاب اسلامی', isHoliday: false },
  { month: 11, day: 22, title: 'پیروزی انقلاب اسلامی ایران (تعطیل)', isHoliday: true },
  { month: 11, day: 29, title: 'روز سپندارمزگان / روز عشق ایرانی', isHoliday: false },
  
  { month: 12, day: 5, title: 'روز مهندس / بزرگداشت خواجه نصیرالدین طوسی', isHoliday: false },
  { month: 12, day: 15, title: 'روز درختکاری', isHoliday: false },
  { month: 12, day: 29, title: 'روز ملی شدن صنعت نفت ایران (تعطیل)', isHoliday: true }
];

// Hijri Lunar shifted holidays accurately matched onto solar months for solar y1405
export const LUNAR_HOLIDAYS_1405: StaticHoliday[] = [
  { month: 1, day: 1, title: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true },
  { month: 1, day: 24, title: 'شهادت امام جعفر صادق (ع) (تعطیل)', isHoliday: true },
  { month: 3, day: 6, title: 'عید سعید قربان (تعطیل)', isHoliday: true },
  { month: 3, day: 14, title: 'عید سعید غدیر خم (تعطیل)', isHoliday: true },
  { month: 4, day: 3, title: 'تاسوعای حسینی (تعطیل)', isHoliday: true },
  { month: 4, day: 4, title: 'عاشورای حسینی (تعطیل)', isHoliday: true },
  { month: 5, day: 13, title: 'اربعین حسینی (تعطیل)', isHoliday: true },
  { month: 5, day: 21, title: 'رحلت رسول اکرم و شهادت امام حسن مجتبی (ع) (تعطیل)', isHoliday: true },
  { month: 5, day: 23, title: 'شهادت امام رضا (ع) (تعطیل)', isHoliday: true },
  { month: 5, day: 31, title: 'شهادت امام حسن عسکری (ع) (تعطیل)', isHoliday: true },
  { month: 6, day: 10, title: 'میلاد رسول اکرم (ص) و امام جعفر صادق (ع) (تعطیل)', isHoliday: true },
  { month: 7, day: 24, title: 'شهادت حضرت فاطمه زهرا (س) (تعطیل)', isHoliday: true },
  { month: 9, day: 3, title: 'ولادت امام علی (ع) و روز پدر (تعطیل)', isHoliday: true },
  { month: 9, day: 17, title: 'مبعث رسول اکرم (ص) (تعطیل)', isHoliday: true },
  { month: 10, day: 4, title: 'ولادت امام زمان (عج) / نیمه شعبان (تعطیل)', isHoliday: true },
  { month: 11, day: 10, title: 'شهادت امام علی (ع) (تعطیل)', isHoliday: true },
  { month: 11, day: 19, title: 'عید سعید فطر (تعطیل)', isHoliday: true },
  { month: 11, day: 20, title: 'تعطیل به مناسبت عید سعید فطر', isHoliday: true }
];

// Gets the weekday of dry inputs
export function getWeekdayForJalaliDate(jy: number, jm: number, jd: number): number {
  const gDate = toGregorian(jy, jm, jd);
  const dateObj = new Date(Date.UTC(gDate.gy, gDate.gm - 1, gDate.gd));
  const gDay = dateObj.getUTCDay();
  return (gDay + 1) % 7;
}

// Gets all holidays and events for a specific day
export function getHolidaysForDate(jy: number, jm: number, jd: number): { titles: string[]; isHoliday: boolean } {
  const titles: string[] = [];
  let isHoliday = false;

  // 1. Check Solar Holidays of 1405 (same for every year since Jalali calendar is fixed solar)
  for (const h of SOLAR_HOLIDAYS_1405) {
    if (h.month === jm && h.day === jd) {
      titles.push(h.title);
      if (h.isHoliday) isHoliday = true;
    }
  }

  // 2. Check Lunar Shifted Holidays of 1405 (only applicable if user's calendar year is exactly 1405)
  if (jy === 1405) {
    for (const lh of LUNAR_HOLIDAYS_1405) {
      if (lh.month === jm && lh.day === jd) {
        titles.push(lh.title);
        if (lh.isHoliday) isHoliday = true;
      }
    }
  }

  // 3. Fridays (Jomeh) are official off-days
  const weekday = getWeekdayForJalaliDate(jy, jm, jd);
  if (weekday === 6) { // Friday
    isHoliday = true;
    if (!titles.includes('جمعه / تعطیل پایان هفته')) {
      titles.push('جمعه / تعطیل پایان هفته');
    }
  }

  return { titles, isHoliday };
}

// Builds the grid of 42 cells for Month view of ANY year with absolute precision
export function getMonthDays(jy: number, jm: number): CalendarDay[] {
  const monthLength = getJalaliMonthLength(jy, jm);
  const startWeekday = getWeekdayForJalaliDate(jy, jm, 1); // 0 (Sat) to 6 (Fri)
  
  const days: CalendarDay[] = [];

  // Previous month representation
  let prevJy = jy;
  let prevJm = jm - 1;
  if (prevJm === 0) {
    prevJm = 12; // previous is of previous year
    prevJy = jy - 1;
  }
  
  // Previous month length
  const prevMonthLength = getJalaliMonthLength(prevJy, prevJm);

  // Pad start with previous month trailing days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const prevJd = prevMonthLength - i;
    const gDate = toGregorian(prevJy, prevJm, prevJd);
    const { titles, isHoliday } = getHolidaysForDate(prevJy, prevJm, prevJd);
    const weekday = (startWeekday - 1 - i + 7) % 7;

    days.push({
      dayNumber: prevJd,
      jalaliDate: { jy: prevJy, jm: prevJm, jd: prevJd },
      gregorianDate: gDate,
      isCurrentMonth: false,
      isToday: false,
      holidays: titles,
      isHoliday,
      weekday,
      eventsCount: 0
    });
  }

  // Current month days
  const todaySolar = dateToJalali(new Date());

  for (let jd = 1; jd <= monthLength; jd++) {
    const gDate = toGregorian(jy, jm, jd);
    const { titles, isHoliday } = getHolidaysForDate(jy, jm, jd);
    const weekday = (startWeekday + jd - 1) % 7;

    const isToday = todaySolar.jy === jy && todaySolar.jm === jm && todaySolar.jd === jd;

    days.push({
      dayNumber: jd,
      jalaliDate: { jy, jm, jd },
      gregorianDate: gDate,
      isCurrentMonth: true,
      isToday,
      holidays: titles,
      isHoliday,
      weekday,
      eventsCount: 0
    });
  }

  // Pad end with next month leading days to complete standard 42-grid
  const rem = 42 - days.length;
  let nextJy = jy;
  let nextJm = jm + 1;
  if (nextJm === 13) {
    nextJm = 1;
    nextJy = jy + 1;
  }

  for (let jd = 1; jd <= rem; jd++) {
    const gDate = toGregorian(nextJy, nextJm, jd);
    const { titles, isHoliday } = getHolidaysForDate(nextJy, nextJm, jd);
    const weekday = (days.length) % 7;

    days.push({
      dayNumber: jd,
      jalaliDate: { jy: nextJy, jm: nextJm, jd },
      gregorianDate: gDate,
      isCurrentMonth: false,
      isToday: false,
      holidays: titles,
      isHoliday,
      weekday,
      eventsCount: 0
    });
  }

  return days;
}
