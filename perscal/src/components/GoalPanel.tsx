/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Trash2, CheckCircle2, Sparkles, Edit2, Calendar, Plus, X } from 'lucide-react';
import { Goal } from '../types';
import { JALALI_MONTH_NAMES, CURRENT_JALALI_YEAR } from '../utils/jalali';

interface GoalPanelProps {
  goals: Goal[];
  onSaveGoal: (id: string | null, title: string, targetMonth: number, targetDay: number) => Promise<void>;
  onDeleteGoal: (id: string) => Promise<void>;
}

export default function GoalPanel({
  goals = [],
  onSaveGoal,
  onDeleteGoal
}: GoalPanelProps) {
  const [goalText, setGoalText] = useState('');
  const [targetMonth, setTargetMonth] = useState(12);
  const [targetDay, setTargetDay] = useState(29);
  
  // Track if we are editing an existing goal, or adding a new one
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Maximum days logic for Esfand or general month length checking
  const getMaxDays = (month: number) => {
    if (month >= 1 && month <= 6) return 31;
    if (month >= 7 && month <= 11) return 30;
    if (month === 12) return 29; // Esfand is 29 days
    return 30;
  };

  const maxDays = getMaxDays(targetMonth);

  // Clamp selected date if out of range for the month
  useEffect(() => {
    if (targetDay > maxDays) {
      setTargetDay(maxDays);
    }
  }, [targetMonth, maxDays, targetDay]);

  // Open the form to add a new goal
  function handleOpenAdd() {
    setEditingId(null);
    setGoalText('');
    setTargetMonth(12);
    setTargetDay(29);
    setIsFormOpen(true);
  }

  // Open the form to edit an existing goal
  function handleStartEdit(goal: Goal) {
    setEditingId(goal.id);
    setGoalText(goal.title);
    setTargetMonth(goal.targetMonth || 12);
    setTargetDay(goal.targetDay || 29);
    setIsFormOpen(true);
  }

  // Save handling
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!goalText.trim()) return;

    try {
      setIsSubmitting(true);
      await onSaveGoal(editingId, goalText.trim(), targetMonth, targetDay);
      setIsFormOpen(false);
      setGoalText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="goal-panel-container" className="bg-white border border-stone-200 p-5 rounded-xl shadow-sm select-none">
      
      {/* Header section with target metrics */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500/10 text-amber-600 p-1.5 rounded">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black font-sans text-stone-900">برنامه‌ریزی و اهداف سالانه</h3>
            <p className="text-[10px] text-stone-400">تا ۳ هدف فعال سال با تاریخ معین و پیگیری مستمر روزانه</p>
          </div>
        </div>
        
        {/* Progress tag */}
        <span className="text-xs bg-stone-50 text-stone-500 border border-stone-150 px-2 py-1 rounded font-bold font-sans">
          {goals.length} از ۳ هدف
        </span>
      </div>

      {/* Goal List Display */}
      {goals.length > 0 && !isFormOpen && (
        <div className="space-y-3 mb-4">
          {goals.map((goal, index) => {
            const hasCrossedCount = goal.crossedDays?.length || 0;
            return (
              <div 
                key={goal.id} 
                className="flex flex-col gap-2.5 p-3.5 bg-stone-50 border border-stone-200/80 rounded-lg hover:border-stone-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 my-0.5 flex-1 pr-0.5">
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-amber-600 block">
                      هدف شماره {index + 1}:
                    </span>
                    <p className="text-xs font-sans font-black text-stone-900 leading-normal">
                      {goal.title}
                    </p>
                    
                    <div className="flex items-center gap-1.5 text-[10.5px] text-stone-500 font-sans pt-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>مهلت دستیابی:</span>
                      <span className="font-extrabold text-stone-850">
                        {goal.targetDay} {JALALI_MONTH_NAMES[goal.targetMonth - 1]} {CURRENT_JALALI_YEAR}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleStartEdit(goal)}
                      className="p-1.5 text-stone-500 hover:text-black hover:bg-stone-100 rounded-md transition-colors cursor-pointer border border-stone-200 bg-white"
                      title="ویرایش هدف"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer border border-stone-200 bg-white"
                      title="حذف هدف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar and counter */}
                <div className="bg-white p-2 border border-stone-150 rounded-md flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>تعهد روز افزون:</span>
                    <strong className="text-stone-850">{hasCrossedCount} روز خط خورده</strong>
                  </div>
                  
                  {/* Small progress meter indicator */}
                  <div className="w-20 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full" 
                      style={{ width: `${Math.min(100, (hasCrossedCount / 30) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {goals.length === 0 && !isFormOpen && (
        <div className="py-8 border border-dashed border-stone-200 text-center rounded-lg mb-4 text-stone-400 text-xs font-medium space-y-1">
          <p>هنوز هیچ هدف سالانه‌ای تعریف نکرده‌اید.</p>
          <p className="text-[10px] text-stone-400">یک هدف با تاریخ پایان انتخاب کنید تا در تقویم پیگیری کنید.</p>
        </div>
      )}

      {/* "Add Goal" Button Trigger */}
      {!isFormOpen && goals.length < 3 && (
        <button
          onClick={handleOpenAdd}
          className="w-full py-2.5 px-4 bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 hover:border-stone-300 rounded-lg text-xs font-bold transition-all focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4" />
          <span>تعریف هدف جدید سالانه</span>
        </button>
      )}

      {/* Goal Form (Edit or Create) */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="space-y-3.5 bg-stone-50/50 p-4 border border-stone-200 rounded-lg">
          <div className="flex justify-between items-center border-b border-stone-100 pb-1.5 mb-1.5">
            <span className="text-[10px] font-bold text-amber-600 uppercase">
              {editingId ? 'ویرایش هدف سالانه' : 'افزودن هدف سالانه جدید'}
            </span>
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)} 
              className="text-stone-400 hover:text-stone-700 bg-white border border-stone-200 rounded p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-stone-500">عنوان هدف:</label>
            <input
              type="text"
              required
              maxLength={150}
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="مثلاً: ورزش منظم روزانه یا روزی ۱ ساعت برنامه‌نویسی"
              className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2.5 outline-none text-xs text-stone-850 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 placeholder:text-stone-400 transition-all font-sans"
            />
          </div>

          {/* Jalali Target Date Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500">ماه مهلت:</label>
              <select
                value={targetMonth}
                onChange={(e) => setTargetMonth(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 rounded-lg px-2 py-2.5 outline-none text-xs text-stone-850 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans cursor-pointer"
              >
                {JALALI_MONTH_NAMES.map((name, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500">روز مهلت:</label>
              <select
                value={targetDay}
                onChange={(e) => setTargetDay(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 rounded-lg px-2 py-2.5 outline-none text-xs text-stone-850 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 font-sans cursor-pointer"
              >
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-2 text-xs text-stone-500 hover:text-stone-850 hover:bg-stone-50 transition-colors cursor-pointer rounded-lg border border-stone-200 bg-white font-sans"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !goalText.trim()}
              className="bg-black hover:bg-stone-800 text-white text-xs font-bold font-sans px-3.5 py-2.5 rounded-lg transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{editingId ? 'ثبت تغییرات' : 'افزودن هدف'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
