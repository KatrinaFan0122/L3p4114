import React from 'react';
import { Check } from 'lucide-react';

interface PhaseTwoState {
  narrative: boolean;
  valuation: boolean;
  pipeline: boolean;
}

interface PhaseTwoChecklistProps {
  phaseTwoState: PhaseTwoState;
}

export function PhaseTwoChecklist({ phaseTwoState }: PhaseTwoChecklistProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
      <h2 className="text-gray-900 mb-6">阶段二：融资执行</h2>
      
      <div className="space-y-4">
        {/* Item 1: 融资叙事 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            phaseTwoState.narrative 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300'
          }`}>
            {phaseTwoState.narrative && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className={`mb-1 ${phaseTwoState.narrative ? 'text-gray-900' : 'text-gray-700'}`}>
              1. 打造你的融资叙事
            </div>
            <p className="text-gray-600 text-sm">
              启动子模块：构建清晰的问题、解决方案、市场机会和团队故事
            </p>
          </div>
        </div>

        {/* Item 2: 估值锚点 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            phaseTwoState.valuation 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300'
          }`}>
            {phaseTwoState.valuation && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className={`mb-1 ${phaseTwoState.valuation ? 'text-gray-900' : 'text-gray-700'}`}>
              2. 明确你的估值锚点
            </div>
            <p className="text-gray-600 text-sm">
              启动子模块：基于可比公司、市场规模、增长率推演合理估值区间
            </p>
          </div>
        </div>

        {/* Item 3: 融资流程 */}
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200 transition-all">
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            phaseTwoState.pipeline 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300'
          }`}>
            {phaseTwoState.pipeline && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1">
            <div className={`mb-1 ${phaseTwoState.pipeline ? 'text-gray-900' : 'text-gray-700'}`}>
              3. 管理你的融资流程
            </div>
            <p className="text-gray-600 text-sm">
              激活看板：追踪所有投资人沟通，从接触到成交的完整漏斗
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>完成度</span>
          <span>
            {Object.values(phaseTwoState).filter(Boolean).length} / 3
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: `${(Object.values(phaseTwoState).filter(Boolean).length / 3) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
