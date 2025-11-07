import React from 'react';
import { Check } from 'lucide-react';

interface ChecklistState {
  prosCons: boolean;
  decision: boolean;
  pathSpecific: boolean;
}

interface PhaseOneChecklistProps {
  checklistState: ChecklistState;
  chosenPath: 'funding' | 'bootstrap' | null;
}

export function PhaseOneChecklist({ checklistState, chosenPath }: PhaseOneChecklistProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
      <h2 className="text-gray-900 mb-6">阶段一：融资决策</h2>
      
      <div className="space-y-4">
        {/* Item 1: 利弊权衡 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            checklistState.prosCons 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300'
          }`}>
            {checklistState.prosCons && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className={`mb-1 ${checklistState.prosCons ? 'text-gray-900' : 'text-gray-700'}`}>
              1. 融资的利弊权衡（Pros & Cons）
            </div>
            <p className="text-gray-600 text-sm">
              充分理解融资的"双刃剑"效应：加速增长 vs 失去控制权
            </p>
          </div>
        </div>

        {/* Item 2: 融资决策 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            checklistState.decision 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300'
          }`}>
            {checklistState.decision && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className={`mb-1 ${checklistState.decision ? 'text-gray-900' : 'text-gray-700'}`}>
              2. 融资决策（守门员）
            </div>
            <p className="text-gray-600 text-sm">
              基于财务跑道和战略目标，做出"融资"或"自力更生"的决策
            </p>
          </div>
        </div>

        {/* Item 3: 路径特定 */}
        {chosenPath && (
          <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              checklistState.pathSpecific 
                ? 'bg-blue-600 border-blue-600' 
                : 'border-gray-300'
            }`}>
              {checklistState.pathSpecific && <Check className="w-4 h-4 text-white" />}
            </div>
            <div className="flex-1">
              <div className={`mb-1 ${checklistState.pathSpecific ? 'text-gray-900' : 'text-gray-700'}`}>
                {chosenPath === 'funding' 
                  ? '3. 融资知识与阶段' 
                  : '3. 自力更生策略'}
              </div>
              <p className="text-gray-600 text-sm">
                {chosenPath === 'funding' 
                  ? '了解3F vs VC、融资阶段（天使轮/种子轮/A轮）' 
                  : '转向精益运营和现金流优化策略'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>完成度</span>
          <span>
            {Object.values(checklistState).filter(Boolean).length} / 3
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: `${(Object.values(checklistState).filter(Boolean).length / 3) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
