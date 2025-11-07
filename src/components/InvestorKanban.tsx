import React, { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

interface Investor {
  id: string;
  name: string;
  type: string;
  amount?: string;
  stage?: string;
}

const initialInvestors: Record<string, Investor[]> = {
  potential: [
    { id: '1', name: '红杉资本中国', type: 'VC', stage: 'A轮' },
    { id: '2', name: '经纬创投', type: 'VC', stage: 'A轮' },
    { id: '3', name: '真格基金', type: '天使', stage: '种子轮' },
  ],
  contacted: [
    { id: '4', name: '高瓴创投', type: 'VC', stage: 'A轮' },
  ],
  meeting: [],
  termsheet: [],
  closed: [],
};

const columns = [
  { id: 'potential', title: '潜在投资人', color: 'bg-gray-100' },
  { id: 'contacted', title: '已接触', color: 'bg-blue-100' },
  { id: 'meeting', title: '已上会', color: 'bg-purple-100' },
  { id: 'termsheet', title: 'TS', color: 'bg-orange-100' },
  { id: 'closed', title: 'Closed', color: 'bg-green-100' },
];

export function InvestorKanban() {
  const [investors, setInvestors] = useState(initialInvestors);
  const [draggedItem, setDraggedItem] = useState<{ columnId: string; investor: Investor } | null>(null);

  const handleDragStart = (columnId: string, investor: Investor) => {
    setDraggedItem({ columnId, investor });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedItem) return;

    setInvestors(prev => {
      const newInvestors = { ...prev };
      
      // Remove from source
      newInvestors[draggedItem.columnId] = prev[draggedItem.columnId].filter(
        inv => inv.id !== draggedItem.investor.id
      );
      
      // Add to target
      newInvestors[targetColumnId] = [...prev[targetColumnId], draggedItem.investor];
      
      return newInvestors;
    });

    setDraggedItem(null);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">投资人追踪看板</h2>
          <p className="text-gray-600 text-sm">持久化工作台 - 管理您的融资漏斗</p>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          添加投资人
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="flex-shrink-0 w-64"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column Header */}
            <div className={`${column.color} rounded-lg p-3 mb-3`}>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">{column.title}</span>
                <span className="text-gray-600 text-sm">
                  {investors[column.id].length}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {investors[column.id].map(investor => (
                <div
                  key={investor.id}
                  draggable
                  onDragStart={() => handleDragStart(column.id, investor)}
                  className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-gray-900">{investor.name}</div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                      {investor.type}
                    </span>
                    {investor.stage && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded">
                        {investor.stage}
                      </span>
                    )}
                  </div>
                  {investor.amount && (
                    <div className="mt-2 text-gray-600 text-sm">
                      {investor.amount}
                    </div>
                  )}
                </div>
              ))}

              {/* Add Card Button */}
              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="text-sm">添加</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-gray-600 text-sm mb-1">总投资人数</div>
          <div className="text-gray-900 text-2xl">
            {Object.values(investors).reduce((sum, arr) => sum + arr.length, 0)}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-blue-600 text-sm mb-1">进行中</div>
          <div className="text-blue-900 text-2xl">
            {investors.contacted.length + investors.meeting.length}
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-orange-600 text-sm mb-1">TS阶段</div>
          <div className="text-orange-900 text-2xl">
            {investors.termsheet.length}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-green-600 text-sm mb-1">已成交</div>
          <div className="text-green-900 text-2xl">
            {investors.closed.length}
          </div>
        </div>
      </div>
    </div>
  );
}
