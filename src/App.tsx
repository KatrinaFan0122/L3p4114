import React, { useState, useEffect } from 'react';
import { CoFoDialog } from './components/CoFoDialog';
import { PhaseOneChecklist } from './components/PhaseOneChecklist';
import { PhaseTwoChecklist } from './components/PhaseTwoChecklist';
import { InvestorKanban } from './components/InvestorKanban';

type Phase = 'phase-one' | 'phase-two' | 'kanban';
type Scene = 
  | 'intro'
  | 'pros-cons'
  | 'decision'
  | 'path-a-knowledge'
  | 'path-b-bootstrap'
  | 'phase-two-narrative'
  | 'phase-two-valuation'
  | 'phase-two-activate'
  | 'completed';

interface ChecklistState {
  prosCons: boolean;
  decision: boolean;
  pathSpecific: boolean;
}

interface PhaseTwoState {
  narrative: boolean;
  valuation: boolean;
  pipeline: boolean;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('phase-one');
  const [scene, setScene] = useState<Scene>('intro');
  const [dialogOpen, setDialogOpen] = useState(true);
  const [checklistState, setChecklistState] = useState<ChecklistState>({
    prosCons: false,
    decision: false,
    pathSpecific: false,
  });
  const [phaseTwoState, setPhaseTwoState] = useState<PhaseTwoState>({
    narrative: false,
    valuation: false,
    pipeline: false,
  });
  const [chosenPath, setChosenPath] = useState<'funding' | 'bootstrap' | null>(null);

  // Auto-transition from intro to pros-cons
  useEffect(() => {
    if (scene === 'intro') {
      const timer = setTimeout(() => {
        setScene('pros-cons');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  // Scene 1: 利弊权衡
  const handleUnderstoodProsCons = () => {
    setChecklistState(prev => ({ ...prev, prosCons: true }));
    setScene('decision');
  };

  // Scene 2: 守门员决策
  const handleDecisionA = () => {
    setChosenPath('funding');
    setChecklistState(prev => ({ ...prev, decision: true }));
    setScene('path-a-knowledge');
  };

  const handleDecisionB = () => {
    setChosenPath('bootstrap');
    setChecklistState(prev => ({ ...prev, decision: true }));
    setScene('path-b-bootstrap');
  };

  // Scene 3: 路径A - 融资知识
  const handleKnowledgeComplete = () => {
    setChecklistState(prev => ({ ...prev, pathSpecific: true }));
    setTimeout(() => {
      setPhase('phase-two');
      setScene('phase-two-narrative');
    }, 500);
  };

  // Scene 4: 路径B - 自力更生
  const handleBootstrapComplete = () => {
    setChecklistState(prev => ({ ...prev, pathSpecific: true }));
    setScene('completed');
    setTimeout(() => {
      setDialogOpen(false);
    }, 3000);
  };

  // Scene 5: 阶段二 - 子模块
  const handleStartNarrative = () => {
    // 模拟启动子模块
    setTimeout(() => {
      setPhaseTwoState(prev => ({ ...prev, narrative: true }));
      setScene('phase-two-valuation');
    }, 2000);
  };

  const handleStartValuation = () => {
    // 模拟启动子模块
    setTimeout(() => {
      setPhaseTwoState(prev => ({ ...prev, valuation: true }));
      setScene('phase-two-activate');
    }, 2000);
  };

  // Scene 6: UI 变形
  const handleActivateKanban = () => {
    setPhaseTwoState(prev => ({ ...prev, pipeline: true }));
    setTimeout(() => {
      setPhase('kanban');
      setScene('completed');
      setTimeout(() => {
        setDialogOpen(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">融资策略</h1>
          <p className="text-gray-600">
            {phase === 'phase-one' && '阶段一：融资决策'}
            {phase === 'phase-two' && '阶段二：融资执行'}
            {phase === 'kanban' && '投资人追踪看板'}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-8">
          {/* Left/Center: Main Workspace */}
          <div className="flex-1">
            {phase === 'phase-one' && (
              <PhaseOneChecklist 
                checklistState={checklistState}
                chosenPath={chosenPath}
              />
            )}
            {phase === 'phase-two' && (
              <PhaseTwoChecklist 
                phaseTwoState={phaseTwoState}
              />
            )}
            {phase === 'kanban' && (
              <InvestorKanban />
            )}
          </div>

          {/* Right: Co-Fo Dialog Panel */}
          <CoFoDialog
            open={dialogOpen}
            scene={scene}
            onUnderstoodProsCons={handleUnderstoodProsCons}
            onDecisionA={handleDecisionA}
            onDecisionB={handleDecisionB}
            onKnowledgeComplete={handleKnowledgeComplete}
            onBootstrapComplete={handleBootstrapComplete}
            onStartNarrative={handleStartNarrative}
            onStartValuation={handleStartValuation}
            onActivateKanban={handleActivateKanban}
          />
        </div>
      </div>
    </div>
  );
}
