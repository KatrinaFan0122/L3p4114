import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

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

interface CoFoDialogProps {
  open: boolean;
  scene: Scene;
  onUnderstoodProsCons: () => void;
  onDecisionA: () => void;
  onDecisionB: () => void;
  onKnowledgeComplete: () => void;
  onBootstrapComplete: () => void;
  onStartNarrative: () => void;
  onStartValuation: () => void;
  onActivateKanban: () => void;
}

export function CoFoDialog({
  open,
  scene,
  onUnderstoodProsCons,
  onDecisionA,
  onDecisionB,
  onKnowledgeComplete,
  onBootstrapComplete,
  onStartNarrative,
  onStartValuation,
  onActivateKanban,
}: CoFoDialogProps) {
  if (!open) return null;

  return (
    <div className="w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-6 h-fit sticky top-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">Co</span>
          </div>
          <div>
            <div className="text-gray-900">Co-Fo</div>
            <div className="text-gray-500 text-sm">您的商业伙伴</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {scene === 'intro' && (
          <>
            <p className="text-gray-700">
              张伟，我们来<strong>商议</strong>一个对你未来至关重要的决策：是否需要外部融资。
            </p>
            <p className="text-gray-700">
              融资是"双刃剑"——它可以加速增长，但也意味着稀释控制权和股权。我们必须先<strong>商议</strong>一下融资的<strong>代价</strong>（The Costs），好吗？
            </p>
          </>
        )}

        {scene === 'pros-cons' && (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-amber-900 mb-3">融资的代价</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-amber-900 mb-1">1. 失去控制权</div>
                  <p className="text-amber-800 text-sm">
                    投资人将获得董事会席位和重大决策的否决权。您可能无法完全按照自己的意愿经营公司。
                  </p>
                </div>
                <div>
                  <div className="text-amber-900 mb-1">2. 股权稀释</div>
                  <p className="text-amber-800 text-sm">
                    每一轮融资都会稀释您的股权比例。如果公司估值10倍增长，但您的股权从100%降至10%，您的实际收益可能并未增加。
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              这些代价是真实的，也是永久的。我们需要在充分理解这些权衡后，才能做出明智的决策。
            </p>
            <Button 
              onClick={onUnderstoodProsCons}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              我已了解利弊
            </Button>
          </>
        )}

        {scene === 'decision' && (
          <>
            <p className="text-gray-700">
              基于我们在<strong>「智能财务模型」</strong>中的"现金流跑道"，并充分权衡了"失去控制权"和"股权稀释"的代价。
            </p>
            <p className="text-gray-700">
              我们的当前决策是：
            </p>
            <div className="space-y-3 mt-4">
              <Button 
                onClick={onDecisionA}
                className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
              >
                A. 是，我需要融资来加速
              </Button>
              <Button 
                onClick={onDecisionB}
                variant="outline"
                className="w-full justify-start"
              >
                B. 否，我决定自力更生（Bootstrapping）
              </Button>
            </div>
          </>
        )}

        {scene === 'path-a-knowledge' && (
          <>
            <p className="text-gray-700">
              收到。这是一个重大决策。我们将解锁<strong>"融资执行"</strong>工作台。
            </p>
            <p className="text-gray-700">
              在进入之前，我们先快速完成第三项：了解"融资知识与阶段"。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-blue-900 mb-1">3F vs VC</div>
                <p className="text-blue-800 text-sm">
                  <strong>3F（Friends, Family, Fools）</strong>：早期小额融资，通常10-50万，条款灵活。
                  <strong>VC（风险投资）</strong>：专业机构投资，通常100万+，条款严格，附带战略资源。
                </p>
              </div>
              <div>
                <div className="text-blue-900 mb-1">融资阶段</div>
                <p className="text-blue-800 text-sm">
                  <strong>天使轮</strong>：验证MVP，50-200万｜
                  <strong>种子轮</strong>：验证PMF，200-500万｜
                  <strong>A轮</strong>：规模化增长，500万+
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              完成了。我们已经完成了"决策"阶段。现在我们进入<strong>"融资执行"</strong>工作台，我们来准备三件关键"产出物"。
            </p>
            <Button 
              onClick={onKnowledgeComplete}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              进入融资执行
            </Button>
          </>
        )}

        {scene === 'path-b-bootstrap' && (
          <>
            <p className="text-gray-700">
              张伟，这是一个非常明智和强大的决定。自力更生（Bootstrapping）意味着您将保持100%的控制权和股权。
            </p>
            <p className="text-gray-700">
              我们的战略重点将自动转移到"精益运营"和"现金流优化"。我们是否需要立即返回<strong>「智能财务模型」</strong>，一起<strong>商议</strong>一下如何优化"运营成本（Opex）"？
            </p>
            <Button 
              onClick={onBootstrapComplete}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              返回财务模型
            </Button>
          </>
        )}

        {scene === 'phase-two-narrative' && (
          <>
            <p className="text-gray-700">
              很棒，我们进入了<strong>"融资执行"</strong>工作台。
            </p>
            <p className="text-gray-700">
              我们先从清单的第一项开始：<strong>打造你的融资叙事</strong>。
            </p>
            <p className="text-gray-600 text-sm">
              一个好的融资叙事需要回答：我们在解决什么问题？为什么是现在？为什么是我们？
            </p>
            <Button 
              onClick={onStartNarrative}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              开始「融资叙事」辅导
            </Button>
          </>
        )}

        {scene === 'phase-two-valuation' && (
          <>
            <p className="text-gray-700">
              现在我们来明确<strong>"估值锚点"</strong>。
            </p>
            <p className="text-gray-600 text-sm">
              估值不是拍脑袋，而是基于可比公司、市场规模、增长率等多个维度的综合推演。
            </p>
            <Button 
              onClick={onStartValuation}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              开始「估值推演」辅导
            </Button>
          </>
        )}

        {scene === 'phase-two-activate' && (
          <>
            <p className="text-gray-700">
              最后，我们来管理<strong>"融资流程"</strong>。
            </p>
            <p className="text-gray-700">
              我们将使用一个"持久化看板"来追踪所有投资人沟通，确保您不会遗漏任何关键节点。
            </p>
            <Button 
              onClick={onActivateKanban}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              激活「投资人追踪看板」
            </Button>
          </>
        )}

        {scene === 'completed' && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-900">
                ✓ 您的"融资执行"工作台已激活。您可以随时返回此处，管理您的投资人沟通漏斗。
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
