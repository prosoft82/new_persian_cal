/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Clock, 
  FileText, 
  CalendarDays,
  Sparkles,
  Server,
  XSquare,
  CheckCircle,
  BookOpen,
  Languages
} from 'lucide-react';
import { JalaliDate, DecryptedEvent, Goal } from '../types';
import { JALALI_MONTH_NAMES, toGregorian, getHolidaysForDate } from '../utils/jalali';
import { getQuranVerseForDay } from '../utils/quran';
import { getEnglishWordForDay } from '../utils/english';

interface EventNotesProps {
  selectedDate: JalaliDate;
  decryptedEvents: DecryptedEvent[]; // plain text events
  onAddEvent: (title: string, description: string, time: string) => Promise<void>;
  onDeleteEvent: (id: string) => void;
  goals: Goal[];
  onToggleGoalCrossed: (id: string, dateKey: string) => void;
  isPast: boolean;
}

export default function EventNotes({
  selectedDate,
  decryptedEvents,
  onAddEvent,
  onDeleteEvent,
  goals,
  onToggleGoalCrossed,
  isPast
}: EventNotesProps) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const dateKey = `${selectedDate.jy}-${selectedDate.jm}-${selectedDate.jd}`;

  // Get Gregorian representation
  const greg = toGregorian(selectedDate.jy, selectedDate.jm, selectedDate.jd);
  const dateStrGregorian = `${greg.gy}/${greg.gm.toString().padStart(2, '0')}/${greg.gd.toString().padStart(2, '0')}`;

  // Get national holidays for this date
  const { titles: holidays } = getHolidaysForDate(selectedDate.jy, selectedDate.jm, selectedDate.jd);

  // Filter events for the active day
  const activeEvents = decryptedEvents.filter(e => e.dateKey === dateKey);

  // Get the predetermined Quranic Verse for this day of the month
  const quranVerse = getQuranVerseForDay(selectedDate.jd);

  // Get the predetermined English word for this day of the month (level B1+)
  const englishWord = getEnglishWordForDay(selectedDate.jd);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsAdding(true);
      await onAddEvent(title, description, time);
      
      // Clear input fields
      setTitle('');
      setDescription('');
      setTime('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div id="event-notes-container" className="bg-white border border-stone-200 p-6 shadow-sm flex flex-col justify-between h-full rounded-xl select-none">
      <div>
        {/* Selected Date Header */}
        <div className="border-b border-stone-100 pb-5 mb-5 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black font-sans text-stone-900 leading-tight">
              {selectedDate.jd} {JALALI_MONTH_NAMES[selectedDate.jm - 1]} {selectedDate.jy}
            </h2>
            <p className="text-xs text-stone-400 font-mono mt-1">
              {dateStrGregorian} میلادی
            </p>
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-150 rounded-md text-xs font-medium text-stone-500">
              <CalendarDays className="w-4 h-4 text-stone-400" />
              <span>روز {selectedDate.jd} ماه</span>
            </span>
          </div>
        </div>

        {/* Quran Verse of the Day Card */}
        <div className="mb-5 p-4 bg-emerald-50/35 border border-emerald-100 rounded-lg space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>آیه روز: {quranVerse.topic}</span>
          </div>
          <div className="space-y-1 text-right">
            <p className="font-extrabold text-stone-900 text-sm leading-relaxed tracking-wide text-center py-2 px-3 bg-white/75 border border-emerald-100/50 rounded-md shadow-xs">
              « {quranVerse.ayah} »
            </p>
            <p className="text-xs text-stone-700 leading-normal font-sans pt-1">
              {quranVerse.translation}
            </p>
            <span className="block text-[9.5px] text-emerald-700/80 font-mono text-left">
              — {quranVerse.citation}
            </span>
          </div>
        </div>

        {/* English Word of the Day Card */}
        <div className="mb-5 p-4 bg-sky-50/25 border border-sky-100 rounded-lg space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sky-800 text-[10.5px] font-black uppercase tracking-wider">
              <Languages className="w-3.5 h-3.5 text-sky-600" />
              <span>واژه انگلیسی کاربردی روز</span>
            </div>
            <span className="text-[10px] bg-sky-100 text-sky-850 font-extrabold font-sans px-2.5 py-0.5 rounded-full">
              سطح {englishWord.level}
            </span>
          </div>
          
          <div className="space-y-2" dir="ltr">
            {/* Word details line */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-stone-900 text-sm font-black font-sans tracking-wide">
                {englishWord.word}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                ({englishWord.partOfSpeech})
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {englishWord.pronunciation}
              </span>
            </div>

            {/* Translation block rendered inside the LTR container */}
            <div dir="rtl" className="text-right border-t border-sky-50/50 pt-2">
              <p className="text-stone-850 text-xs font-bold leading-relaxed">
                <span className="text-[10px] text-sky-700 font-black ml-1">معنی:</span> 
                {englishWord.translation}
              </p>
            </div>

            {/* English Definition */}
            <div className="text-left bg-white/70 p-2 rounded border border-sky-100/30 text-[10.5px] leading-relaxed">
              <p className="text-stone-600 font-sans">
                <strong className="text-stone-800 mr-1 font-bold">Def:</strong> {englishWord.definition}
              </p>
            </div>

            {/* English Example & Translation */}
            <div className="space-y-1 text-left">
              <p className="text-xs text-stone-850 font-medium italic">
                <strong className="text-sky-700 font-bold not-italic">Ex: </strong>
                "{englishWord.example}"
              </p>
              <div dir="rtl" className="text-right pr-3 border-r-2 border-sky-200">
                <p className="text-[10.5px] text-stone-500 leading-normal">
                  {englishWord.exampleTranslation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Goal Tracking Cross Button */}
        {goals.length > 0 && isPast && (
          <div className="mb-5 p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
            <span className="text-[10px] font-bold text-stone-500 block leading-none">تعهد و پیگیری اهداف سالانه (تا ۳ هدف):</span>
            <div className="space-y-2">
              {goals.map((g, idx) => {
                const isGoalCrossed = (g.crossedDays || []).includes(dateKey);
                return (
                  <div key={g.id} className="flex items-center justify-between gap-3 p-2 bg-white border border-stone-150 rounded-lg hover:border-stone-300 transition-all">
                    <div className="space-y-0.5 flex-1 pr-1 truncate">
                      <span className="text-[9px] font-bold text-amber-600">هدف {idx + 1}:</span>
                      <p className="text-xs font-bold text-stone-800 truncate" title={g.title}>{g.title}</p>
                    </div>
                    <button
                      onClick={() => onToggleGoalCrossed(g.id, dateKey)}
                      className={`px-3 py-1.5 rounded-md text-[10.5px] font-bold transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                        isGoalCrossed 
                          ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {isGoalCrossed ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-rose-600 float-right ml-1" />
                          <span>❌ خط خورده</span>
                        </>
                      ) : (
                        <>
                          <XSquare className="w-3.5 h-3.5 text-stone-400 float-right ml-1" />
                          <span>✖ خط زدن</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* National Holidays / Events */}
        {holidays.length > 0 && (
          <div className="mb-5 p-4 bg-red-50/50 border border-red-100 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-red-600 block tracking-widest leading-none mb-1.5">رویدادها و مناسبت‌های رسمی:</span>
            {holidays.map((h, i) => (
              <div key={i} className="text-sm text-red-950 font-bold flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Notes Workspace */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">یادداشت‌ها و قرار ملاقات روزانه</h3>
          
          {activeEvents.length === 0 ? (
            <div className="py-12 border border-dashed border-stone-200 text-center text-stone-400 text-sm rounded-lg flex flex-col items-center justify-center gap-2">
              <FileText className="w-8 h-8 text-stone-300" />
              <span>هیچ رویداد یا یادداشتی برای این روز ثبت نشده است.</span>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {activeEvents.map((ev) => (
                <div key={ev.id} className="border border-stone-150 p-4 bg-stone-50/40 rounded-lg hover:bg-stone-50/80 transition-all flex justify-between items-start gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-stone-900 font-sans leading-snug break-all">
                        {ev.title}
                      </h4>
                      {ev.time && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{ev.time}</span>
                        </span>
                      )}
                    </div>
                    {ev.description && (
                      <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap break-all">
                        {ev.description}
                      </p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => onDeleteEvent(ev.id)}
                    className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer flex-shrink-0 border border-transparent hover:border-red-100"
                    title="حذف یادداشت"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Note Form */}
      <div className="mt-8 border-t border-stone-100 pt-6">
        {isAdding ? (
          <div className="py-4 text-center text-xs text-stone-400 animate-pulse">
            در حال ذخیره‌سازی رویداد...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="text-xs font-bold text-stone-850 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-stone-800" />
              <span>افزودن یادداشت جدید:</span>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                required
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان یادداشت (مثال: جلسه کاری، تولد مریم)"
                className="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 outline-none text-xs text-stone-800 focus:ring-1 focus:ring-black focus:border-black placeholder:text-stone-400 transition-all font-sans"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  maxLength={10}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="ساعت (مثال: ۱۶:۳۰)"
                  className="bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 outline-none text-xs text-stone-850 text-center focus:ring-1 focus:ring-black focus:border-black placeholder:text-stone-400 transition-all font-sans"
                />
                <input
                  type="text"
                  maxLength={300}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="توضیحات بیشتر یادداشت..."
                  className="sm:col-span-2 bg-white border border-stone-200 rounded-lg px-3.5 py-2.5 outline-none text-xs text-stone-850 focus:ring-1 focus:ring-black focus:border-black placeholder:text-stone-400 transition-all font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-stone-800 rounded-lg py-2.5 text-xs font-bold transition-all active:scale-[0.99] cursor-pointer shadow-xs font-sans flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ثبت رویداد جدید در تقویم</span>
            </button>
          </form>
        )}
      </div>


    </div>
  );
}
