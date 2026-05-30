/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { JalaliDate, DecryptedEvent, Goal } from './types';
import { dateToJalali, CURRENT_JALALI_YEAR, JALALI_MONTH_NAMES } from './utils/jalali';
import CalendarGrid from './components/CalendarGrid';
import EventNotes from './components/EventNotes';
import GoalPanel from './components/GoalPanel';

export default function App() {
  
  // Dynamic today detection using our accurate conversion function
  const today = useMemo(() => {
    return dateToJalali(new Date());
  }, []);

  // Compute yesterday's Jalali date
  const yesterday = useMemo(() => {
    const now = new Date();
    // Subtract 24 hours to get yesterday
    const yesterdayDateObj = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return dateToJalali(yesterdayDateObj);
  }, []);

  const yesterdayKey = `${yesterday.jy}-${yesterday.jm}-${yesterday.jd}`;

  const [selectedDate, setSelectedDate] = useState<JalaliDate>(today);
  const [activeYear, setActiveYear] = useState<number>(today.jy);
  const [activeMonth, setActiveMonth] = useState<number>(today.jm);

  // States for Goals and Events loaded from backend File Store or local storage fallback
  const [goals, setGoals] = useState<Goal[]>([]);
  const [events, setEvents] = useState<DecryptedEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usingLocalStorage, setUsingLocalStorage] = useState<boolean>(false);

  // Load goals and events on startup
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/data');
        if (res.ok) {
          const data = await res.json();
          const serverEvents = data.events || [];
          
          let serverGoals: Goal[] = [];
          if (Array.isArray(data.goals)) {
            serverGoals = data.goals;
          } else if (data.goal) {
            serverGoals = [{ ...data.goal, id: data.goal.id || 'goal-1' }];
          }
          
          setEvents(serverEvents);
          setGoals(serverGoals);
          setUsingLocalStorage(false);
          // Sync to localStorage as backup
          localStorage.setItem('cal_events', JSON.stringify(serverEvents));
          localStorage.setItem('cal_goals', JSON.stringify(serverGoals));
        } else {
          throw new Error('Server returned non-ok status');
        }
      } catch (err) {
        console.warn('Backend API not available or errored. Switching seamlessly to LocalStorage...', err);
        setUsingLocalStorage(true);
        // Fallback to local storage
        const cachedEvents = localStorage.getItem('cal_events');
        const cachedGoals = localStorage.getItem('cal_goals');
        const cachedSingleGoal = localStorage.getItem('cal_goal');
        setEvents(cachedEvents ? JSON.parse(cachedEvents) : []);
        
        if (cachedGoals) {
          setGoals(JSON.parse(cachedGoals));
        } else if (cachedSingleGoal) {
          setGoals([{ ...JSON.parse(cachedSingleGoal), id: 'goal-1' }]);
        } else {
          setGoals([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute event counters for each calendar cell
  const eventsCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    events.forEach(e => {
      map[e.dateKey] = (map[e.dateKey] || 0) + 1;
    });
    return map;
  }, [events]);

  // Saves a new event to the server
  async function handleAddEvent(title: string, description: string, time: string) {
    const dateKey = `${selectedDate.jy}-${selectedDate.jm}-${selectedDate.jd}`;
    const newEvent: DecryptedEvent = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      dateKey,
      title: title.trim(),
      description: (description || '').trim(),
      time: (time || '').trim(),
      createdAt: Date.now()
    };

    // Update state and localStorage optimistically
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('cal_events', JSON.stringify(updatedEvents));

    if (!usingLocalStorage) {
      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateKey, title, description, time })
        });
      } catch (err) {
        console.error('Failed to save event to server, saved locally', err);
      }
    }
  }

  // Deletes an event from the server
  async function handleDeleteEvent(id: string) {
    // Update state and localStorage optimistically
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('cal_events', JSON.stringify(updatedEvents));

    if (!usingLocalStorage) {
      try {
        await fetch(`/api/events/${id}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.error('Failed to delete event from server, updated locally', err);
      }
    }
  }

  // Saves or updates a goal (supports up to 3 goals) on the server
  async function handleSaveGoal(id: string | null, title: string, targetMonth: number, targetDay: number) {
    let updatedGoals: Goal[];
    
    if (id === null) {
      if (goals.length >= 3) return; // limit to 3 goals
      const newGoal: Goal = {
        id: Math.random().toString(36).substring(2, 9).toUpperCase(),
        title: title.trim(),
        targetMonth,
        targetDay,
        createdAt: Date.now(),
        crossedDays: []
      };
      updatedGoals = [...goals, newGoal];
    } else {
      updatedGoals = goals.map(g => {
        if (g.id === id) {
          return {
            ...g,
            title: title.trim(),
            targetMonth,
            targetDay
          };
        }
        return g;
      });
    }

    setGoals(updatedGoals);
    localStorage.setItem('cal_goals', JSON.stringify(updatedGoals));

    if (!usingLocalStorage) {
      try {
        await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goals: updatedGoals })
        });
      } catch (err) {
        console.error('Failed to save goals to server, saved locally', err);
      }
    }
  }

  // Deletes a specific goal on the server
  async function handleDeleteGoal(id: string) {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('cal_goals', JSON.stringify(updatedGoals));

    if (!usingLocalStorage) {
      try {
        await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goals: updatedGoals })
        });
      } catch (err) {
        console.error('Failed to delete goal on server, updated locally', err);
      }
    }
  }

  // Toggles if a dateKey is crossed off for a specific goal
  async function handleToggleGoalCrossed(id: string, dateKey: string) {
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        const currentCrossed = g.crossedDays || [];
        const updatedCrossed = currentCrossed.includes(dateKey)
          ? currentCrossed.filter(k => k !== dateKey)
          : [...currentCrossed, dateKey];
        return { ...g, crossedDays: updatedCrossed };
      }
      return g;
    });

    setGoals(updatedGoals);
    localStorage.setItem('cal_goals', JSON.stringify(updatedGoals));

    if (!usingLocalStorage) {
      try {
        await fetch('/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goals: updatedGoals })
        });
      } catch (err) {
        console.error('Failed to save crossed status to server, updated locally', err);
      }
    }
  }

  // Check if there are any goals that need yesterday crossed off
  const uncrossedYesterdayGoals = useMemo(() => {
    return goals.filter(g => !(g.crossedDays || []).includes(yesterdayKey));
  }, [goals, yesterdayKey]);

  const hasUncrossedYesterday = uncrossedYesterdayGoals.length > 0;

  // Check if selected date is in the past
  const isSelectedDatePast = useMemo(() => {
    if (selectedDate.jy < today.jy) return true;
    if (selectedDate.jy > today.jy) return false;
    if (selectedDate.jm < today.jm) return true;
    if (selectedDate.jm > today.jm) return false;
    return selectedDate.jd < today.jd;
  }, [selectedDate, today]);

  return (
    <div dir="rtl" className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased select-none">
      
      {/* Premium minimal header */}
      <header className="bg-white border-b border-stone-200 py-3.5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-stone-900 font-sans tracking-tight">دفترچه تقویم شمسی {activeYear}</h1>
              <p className="text-xs text-stone-400 font-sans mt-0.5 font-medium">سیستم برنامه‌ریزی دفتری هماهنگ با اهداف و بررسی عملکرد روزانه</p>
            </div>
          </div>


        </div>
      </header>

      {/* Dynamic Notification Banner / Daily Prompt */}
      {goals.length > 0 && hasUncrossedYesterday && (
        <div className="bg-amber-500/10 border-b border-amber-500/25 py-3 px-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-stone-900">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="p-1 px-2.5 bg-amber-500 text-white rounded font-bold text-[10px] select-none text-center self-start sm:self-auto uppercase">اعلان پایش هدف</span>
              <p className="text-xs sm:text-xs font-bold leading-relaxed font-sans text-right">
                روز گذشته (<span className="text-amber-700 font-black">{yesterday.jd} {JALALI_MONTH_NAMES[yesterday.jm - 1]}</span>) سپری شد و برای {uncrossedYesterdayGoals.length} هدف خود خط نزده‌اید! لطفاً تعهد خود را در تقویم علامت بزنید.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0 self-end sm:self-auto">
              {uncrossedYesterdayGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleToggleGoalCrossed(g.id, yesterdayKey)}
                  className="bg-black hover:bg-stone-850 text-white text-[11px] font-black font-sans px-3 py-1.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  ❌ خط زدن دیروز: {g.title.slice(0, 18)}{g.title.length > 18 ? '...' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main body */}
      <main className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full flex-1">
        
        {isLoading ? (
          <div className="lg:col-span-12 flex flex-col items-center justify-center py-32 space-y-3">
            <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-stone-500 font-medium">در حال بارگذاری اطلاعات تقویم و پرونده اهداف از سرور...</p>
          </div>
        ) : (
          <>
            {/* Calendar grid (First on mobile, left on desktop) */}
            <section className="lg:col-span-8 lg:row-span-2 order-1 flex flex-col gap-6">
              <CalendarGrid 
                selectedDate={selectedDate}
                activeYear={activeYear}
                activeMonth={activeMonth}
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setActiveYear(date.jy);
                  setActiveMonth(date.jm);
                }}
                onMonthChange={setActiveMonth}
                onYearChange={setActiveYear}
                eventsCountMap={eventsCountMap}
                todayDate={today}
                goals={goals}
              />
            </section>

            {/* EventNotes panel (Second on mobile, bottom-right on desktop) */}
            <section className="lg:col-span-4 order-2 lg:order-3">
              <EventNotes 
                selectedDate={selectedDate}
                decryptedEvents={events}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                goals={goals}
                onToggleGoalCrossed={handleToggleGoalCrossed}
                isPast={isSelectedDatePast}
              />
            </section>

            {/* Goal panel (Third on mobile, top-right on desktop) */}
            <section className="lg:col-span-4 order-3 lg:order-2">
              <GoalPanel 
                goals={goals}
                onSaveGoal={handleSaveGoal}
                onDeleteGoal={handleDeleteGoal}
              />
            </section>
          </>
        )}

      </main>

      {/* Minimalist Footer */}
      <footer className="mt-auto py-5 border-t border-stone-200 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {today.jy} دفترچه تقویم شخصی. ثبت پایدار عملکرد شما در سیستم داخلی و فایل داده‌گاه.</p>
        </div>
      </footer>

    </div>
  );
}
