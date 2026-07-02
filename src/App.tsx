import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, ShieldAlert, Award, ChevronRight, Sliders, Layers } from 'lucide-react';
import { SCENARIOS, generateRandomHand, getGTOActionForScenario, getFullGridMatrixForScenario, RANKS } from './pokerEngine';
import type { Scenario, Card } from './pokerEngine';

interface HistoryLog {
  handText: string;
  scenarioName: string;
  category: string;
  heroPos: string;
  userChoice: string;
  correctChoice: string;
  isCorrect: boolean;
}

export default function App() {
  // Estados de Fluxo e Menu
  const [view, setView] = useState<'SETUP' | 'GAMEPLAY' | 'LEAK_FINDER'>('SETUP');
  const [filterPositions, setFilterPositions] = useState<string[]>(['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB']);
  const [filterCategories, setFilterCategories] = useState<string[]>(['RFI', 'Defense_BB', 'Defense_BTN', 'Iso_Limp', 'Defense_SB', 'Blind_War']);
  const [stackSize, setStackSize] = useState<number>(100);
  const [sessionHandsCount, setSessionHandsCount] = useState<number>(20);

  // Estados de Gameplay Ativos
  const [currentHandIdx, setCurrentHandIdx] = useState<number>(0);
  const [allowedScenarios, setAllowedScenarios] = useState<Scenario[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [card1, setCard1] = useState<Card | null>(null);
  const [card2, setCard2] = useState<Card | null>(null);
  const [handText, setHandText] = useState<string>('');
  const [correctAction, setCorrectAction] = useState<'FOLD' | 'CALL' | 'RAISE' | '3-BET'>('FOLD');
  
  // Gamificação e Feedbacks
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [userSelectedAction, setUserSelectedAction] = useState<string | null>(null);
  const [showThresholdUX, setShowThresholdUX] = useState<boolean>(false);
  const [isLastChoiceCorrect, setIsLastChoiceCorrect] = useState<boolean>(false);
  const [sessionHistory, setSessionHistory] = useState<HistoryLog[]>([]);

  // Carregar/Filtrar Cenários e Sortear Mão inicial
  const startTrainerSession = () => {
    const matches = SCENARIOS.filter(s => 
      filterPositions.includes(s.heroPos) && 
      filterCategories.includes(s.category)
    );

    if (matches.length === 0) {
      alert("Nenhum cenário corresponde aos filtros selecionados. Ative mais posições ou categorias!");
      return;
    }

    setAllowedScenarios(matches);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCurrentHandIdx(0);
    setSessionHistory([]);
    setUserSelectedAction(null);
    setShowThresholdUX(false);
    
    // Disparar o primeiro Drill
    nextDrillHand(matches, 0);
    setView('GAMEPLAY');
  };

  const nextDrillHand = (scenariosPool: Scenario[], index: number) => {
    if (index >= sessionHandsCount) {
      setView('LEAK_FINDER');
      return;
    }

    const randomScenario = scenariosPool[Math.floor(Math.random() * scenariosPool.length)];
    const handSetup = generateRandomHand();
    const gtoAnswer = getGTOActionForScenario(handSetup.handText, randomScenario);

    setCurrentScenario(randomScenario);
    setCard1(handSetup.card1);
    setCard2(handSetup.card2);
    setHandText(handSetup.handText);
    setCorrectAction(gtoAnswer);
    setUserSelectedAction(null);
    setShowThresholdUX(false);
    setCurrentHandIdx(index);
  };

  // Processar Ação do Usuário
  const handlePlayerAction = (action: 'FOLD' | 'CALL' | 'RAISE' | '3-BET') => {
    if (showThresholdUX) return; // Tela congelada pelo Threshold UX

    setUserSelectedAction(action);
    const isCorrect = (action === correctAction);
    setIsLastChoiceCorrect(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    // Salva no log histórico do Detector de Erros (Leak Finder)
    if (currentScenario) {
      setSessionHistory(prev => [...prev, {
        handText,
        scenarioName: currentScenario.name,
        category: currentScenario.category,
        heroPos: currentScenario.heroPos,
        userChoice: action,
        correctChoice: correctAction,
        isCorrect
      }]);
    }

    // Ativar Congelamento de Tela GTO (Sempre exibe se errou ou acertou para análise tática)
    setShowThresholdUX(true);
  };

  // Atalhos Rápidos por Teclado (F, C, R, 3 ou Espaço)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view !== 'GAMEPLAY') return;
      const key = e.key.toUpperCase();

      if (showThresholdUX) {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          nextDrillHand(allowedScenarios, currentHandIdx + 1);
        }
        return;
      }

      if (key === 'F') handlePlayerAction('FOLD');
      if (key === 'C') handlePlayerAction('CALL');
      if (key === 'R') handlePlayerAction('RAISE');
      if (key === '3') handlePlayerAction('3-BET');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, showThresholdUX, allowedScenarios, currentHandIdx]);

  // Função Auxiliar de Cores para o Baralho de 4 Cores GipsyTeam
  const getSuitMeta = (suit: 's' | 'h' | 'd' | 'c') => {
    switch (suit) {
      case 's': return { label: '♠', color: 'bg-slate-900 border-slate-700 text-slate-100' };
      case 'h': return { label: '♥', color: 'bg-red-600 border-red-500 text-white' };
      case 'd': return { label: '♦', color: 'bg-blue-600 border-blue-500 text-white' };
      case 'c': return { label: '♣', color: 'bg-emerald-600 border-emerald-500 text-white' };
    }
  };

  // Agrupadores de Estatísticas para o Leak Finder final
  const accuracyPct = sessionHistory.length > 0 
    ? Math.round((sessionHistory.filter(h => h.isCorrect).length / sessionHistory.length) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col justify-between">
      
      {/* HEADER GLOBAL DO SIMULADOR */}
      <header className="border-b border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-400" /> POKER PREFLOP DRILL TRAINER
          </h1>
          <p className="text-xs text-slate-400">Motor de Resolução de Ranges Base Integrado</p>
        </div>

        {view === 'GAMEPLAY' && (
          <div className="flex items-center gap-6 bg-slate-900/60 border border-slate-800 rounded-xl px-5 py-2 text-sm">
            <div>Progresso: <span className="text-emerald-400 font-bold">{currentHandIdx + 1}/{sessionHandsCount}</span></div>
            <div className="w-px h-6 bg-slate-800" />
            <div>Placar: <span className="text-cyan-400 font-bold">{score} Acertos</span></div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex items-center gap-1">Streak: <span className="text-amber-400 font-bold">🔥 {streak}</span></div>
          </div>
        )}
      </header>

      {/* ----------------- TELA 1: CONFIGURAÇÃO CIRÚRGICA (SETUP) ----------------- */}
      {view === 'SETUP' && (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto animate-fadeIn">
          
          <div className="md:col-span-2 bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" /> Seletor Avançado de Escopo de Treino
              </h2>

              {/* Filtro de Posições (Hero) */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Posições Disponíveis para Estudo (Sua Posição)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'].map(pos => {
                    const active = filterPositions.includes(pos);
                    return (
                      <button
                        key={pos}
                        onClick={() => setFilterPositions(prev => active ? prev.filter(p => p !== pos) : [...prev, pos])}
                        className={`py-2 px-3 rounded-xl font-bold text-sm transition-all border ${
                          active ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/20' : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {pos}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtro de Categorias de Range */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Cenários de Ação Pré-Flop</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'RFI', name: 'RFI (Open Raise Sem Limps)' },
                    { id: 'Defense_BB', name: 'Defesa de Big Blind (Facing Raise)' },
                    { id: 'Defense_BTN', name: 'Defesa de Button (Facing Raise)' },
                    { id: 'Iso_Limp', name: 'Isolamento contra Limpers' },
                    { id: 'Defense_SB', name: 'Defesa de Small Blind (3-Bet Focada)' },
                    { id: 'Blind_War', name: 'Guerra de Blinds (SB vs BB)' },
                  ].map(cat => {
                    const active = filterCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFilterCategories(prev => active ? prev.filter(c => c !== cat.id) : [...prev, cat.id])}
                        className={`p-3 rounded-xl font-medium text-left text-xs transition-all border flex justify-between items-center ${
                          active ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configurações Regulares */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Profundidade do Stack (Estratégia)</label>
                  <select 
                    value={stackSize} 
                    onChange={(e) => setStackSize(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                  >
                    <option value={100}>100 BB (Deep Stack Completo)</option>
                    <option value={30}>30 BB (Estratégia Intermediate MMT)</option>
                    <option value={15}>15 BB (Push / Fold Fases Finais)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">Tamanho da Sessão (Mãos)</label>
                  <select 
                    value={sessionHandsCount} 
                    onChange={(e) => setSessionHandsCount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                  >
                    <option value={10}>10 Flashcards Rápidos</option>
                    <option value={20}>20 Flashcards Padrão</option>
                    <option value={50}>50 Super Exercícios</option>
                    <option value={100}>100 Maratona GTO</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={startTrainerSession}
              className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-base py-4 rounded-xl transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> INICIAR SESSÃO DE DRILL
            </button>
          </div>

          {/* PAINEL LATERAL INFORMATIVO */}
          <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2 mb-3">Especificações do Motor</h3>
              <ul className="text-xs text-slate-400 space-y-3 list-disc pl-4">
                <li><strong className="text-slate-300">Banco de Dados Base:</strong> Alimentado integralmente pelo arquivo anexado contendo as 26 matrizes principais.</li>
                <li><strong className="text-slate-300">Regra Oculta de Fold:</strong> Qualquer combinatória que não se enquadre nos ranges explícitos de Aumento ou Chamada do cenário é automaticamente imputada como <span className="text-red-400 font-bold">FOLD</span>.</li>
                <li><strong className="text-slate-300">GipsyTeam Design:</strong> Cartas estilizadas em modo de alto contraste para otimização neural e leitura instantânea da jogada.</li>
              </ul>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 mt-4">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-bold">Dica de Produtividade</span>
              <p className="text-xs text-slate-300 mt-1">Utilize os atalhos <strong className="text-emerald-400">F</strong> (Fold), <strong className="text-emerald-400">C</strong> (Call), <strong className="text-emerald-400">R</strong> (Raise) e <strong className="text-emerald-400">3</strong> (3-Bet) no seu teclado para treinar em velocidade máxima de Grind.</p>
            </div>
          </div>
        </main>
      )}

      {/* ----------------- TELA 2: MESA DE GAMEPLAY (DASHBOARD RAPIDO) ----------------- */}
      {view === 'GAMEPLAY' && currentScenario && card1 && card2 && (
        <main className="my-auto flex flex-col gap-6 items-center animate-fadeIn">
          
          {/* TIMELINE E CENÁRIO ATUAL */}
          <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-800 p-4 rounded-2xl text-center shadow-inner">
            <span className="bg-slate-800 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-900/50">
              {currentScenario.category} ➔ {currentScenario.name}
            </span>
            <p className="mt-3 text-sm text-slate-200 font-medium tracking-wide">
              {currentScenario.timeline} <span className="text-amber-400 font-bold">({stackSize} BB)</span>
            </p>
          </div>

          {/* SIMULAÇÃO MINI MESA 6-MAX (HUD PODS) */}
          <div className="w-full max-w-4xl bg-slate-950/80 border border-slate-900 rounded-3xl p-6 relative flex flex-col items-center">
            
            {/* Grid dos Assentos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-6">
              {['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'].map(pos => {
                const isHero = currentScenario.heroPos === pos;
                const isAggressor = currentScenario.villainPos === pos || (currentScenario.villainPos === 'CO_BTN' && (pos === 'CO' || pos === 'BTN'));
                
                let borderColor = 'border-slate-800';
                let bgStyle = 'bg-slate-900/40 text-slate-500';
                let badge = null;

                if (isHero) {
                  borderColor = 'border-amber-500 shadow-md shadow-amber-500/10';
                  bgStyle = 'bg-slate-900 text-amber-400 glow-neon-active';
                  badge = "HERO";
                } else if (isAggressor) {
                  borderColor = 'border-red-500';
                  bgStyle = 'bg-red-950/20 text-red-400';
                  badge = currentScenario.category === 'Iso_Limp' ? 'LIMP' : 'RAISE';
                } else {
                  // Simula que os outros deram fold
                  bgStyle = 'bg-slate-900/10 text-slate-600 border-slate-900 opacity-40';
                  badge = "FOLD";
                }

                return (
                  <div key={pos} className={`border rounded-xl p-3 text-center transition-all ${bgStyle} ${borderColor}`}>
                    <div className="text-xs font-black tracking-widest">{pos}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{isHero ? `${stackSize} BB` : '100 BB'}</div>
                    {badge && (
                      <span className={`inline-block text-[9px] px-2 py-0.5 mt-1.5 rounded font-bold ${
                        badge === 'HERO' ? 'bg-amber-500 text-slate-950' : badge === 'FOLD' ? 'bg-slate-800 text-slate-500' : 'bg-red-600 text-white'
                      }`}>
                        {badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AS DUAS CARTAS DISTRIBUÍDAS (ESTILO FLASHCARD GT) */}
            <div className="flex gap-4 my-4">
              {[card1, card2].map((card, idx) => {
                const meta = getSuitMeta(card.suit);
                return (
                  <div 
                    key={idx} 
                    className={`w-28 h-40 rounded-2xl border-2 flex flex-col justify-between p-4 shadow-2xl transition-transform transform hover:scale-105 select-none ${meta.color} ${
                      showThresholdUX ? (isLastChoiceCorrect ? 'border-emerald-500' : 'border-red-500') : ''
                    }`}
                  >
                    <div className="text-3xl font-black leading-none">{card.rank}</div>
                    <div className="text-5xl self-end font-bold leading-none">{meta.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-2">
              <span className="text-xs text-slate-400 tracking-wider">Combinação Computada: </span>
              <strong className="text-lg text-slate-200 tracking-widest">{handText}</strong>
            </div>
          </div>

          {/* DOCK DE BOTÕES DE AÇÃO DO JOGADOR */}
          {!showThresholdUX ? (
            <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                onClick={() => handlePlayerAction('FOLD')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 py-4 rounded-xl font-black text-sm tracking-widest text-slate-200 transition-all active:scale-95"
              >
                FOLD <span className="block text-[10px] text-slate-500 font-normal mt-0.5">[F]</span>
              </button>
              
              <button 
                onClick={() => handlePlayerAction('CALL')}
                className="bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-black text-sm tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-emerald-600/10"
              >
                CALL <span className="block text-[10px] text-emerald-200/60 font-normal mt-0.5">[C]</span>
              </button>

              <button 
                onClick={() => handlePlayerAction('RAISE')}
                className="bg-amber-600 hover:bg-amber-500 py-4 rounded-xl font-black text-sm tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-amber-600/10"
              >
                RAISE <span className="block text-[10px] text-amber-200/60 font-normal mt-0.5">[R]</span>
              </button>

              <button 
                onClick={() => handlePlayerAction('3-BET')}
                className="bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-black text-sm tracking-widest text-white transition-all active:scale-95 shadow-lg shadow-indigo-600/10"
              >
                3-BET <span className="block text-[10px] text-indigo-200/60 font-normal mt-0.5">[3]</span>
              </button>
            </div>
          ) : (
            
            /* ----------------- CONGELAMENTO DE TELA THRESHOLD UX + MATRIZ GTO ----------------- */
            <div className="w-full max-w-4xl bg-slate-900 border-2 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl animate-scaleUp border-slate-800">
              
              {/* Alerta de Acerto ou Erro */}
              <div className={`w-full p-4 rounded-xl flex items-center gap-3 border ${
                isLastChoiceCorrect 
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/50 text-red-400 glow-neon-incorrect'
              }`}>
                {isLastChoiceCorrect ? <CheckCircle className="w-6 h-6 shrink-0" /> : <ShieldAlert className="w-6 h-6 shrink-0" />}
                <div className="text-sm">
                  <p className="font-bold uppercase tracking-wider">
                    {isLastChoiceCorrect ? 'Decisão Correta (GTO Solved)' : 'FALHA DE RANGES DETECTADA (LEAK)'}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Você escolheu <strong className="underline">{userSelectedAction}</strong>. A ação matemática recomendada para a mão <strong className="text-white">{handText}</strong> é <strong className="bg-slate-800 px-2 py-0.5 rounded text-white border border-slate-700">{correctAction}</strong>.
                  </p>
                </div>
              </div>

              {/* Matriz Dinâmica Exposta */}
              <div className="w-full max-w-md">
                <span className="block text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mb-2">Fronteiras Estratégicas do Cenário Atual</span>
                <div className="grid grid-cols-13 gap-0.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.entries(getFullGridMatrixForScenario(currentScenario)).map(([matrixHand, act]) => {
                    const isUserHand = matrixHand === handText;
                    let cellBg = 'bg-slate-900 text-slate-600';
                    if (act === 'RAISE') cellBg = 'bg-amber-600 text-white font-bold';
                    if (act === 'CALL') cellBg = 'bg-emerald-600 text-white font-bold';
                    if (act === '3-BET') cellBg = 'bg-indigo-600 text-white font-bold';
                    if (act === 'FOLD') cellBg = 'bg-slate-800/40 text-slate-500';

                    return (
                      <div 
                        key={matrixHand} 
                        title={`${matrixHand}: ${act}`}
                        className={`aspect-square flex items-center justify-center text-[8px] select-none rounded-[1px] transition-all ${cellBg} ${
                          isUserHand ? 'ring-4 ring-white scale-110 z-10 animate-pulse border border-black' : ''
                        }`}
                      >
                        {matrixHand.slice(0, 2)}
                      </div>
                    );
                  })}
                </div>
                
                {/* Legenda do Gráfico */}
                <div className="flex justify-center gap-4 text-[10px] mt-3 font-semibold">
                  <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-600" /> Raise</div>
                  <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Call</div>
                  <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" /> 3-Bet</div>
                  <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-slate-800" /> Fold</div>
                </div>
              </div>

              {/* Botão de Avanço */}
              <button
                onClick={() => nextDrillHand(allowedScenarios, currentHandIdx + 1)}
                className="w-full max-w-xs bg-slate-100 hover:bg-white text-slate-950 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1 shadow-lg transition-all"
              >
                AVANÇAR PARA A PRÓXIMA MÃO <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-500 -mt-3">Dica: Ou pressione a barra de [Espaço]</span>
            </div>
          )}
        </main>
      )}

      {/* ----------------- TELA 3: DETECTOR DE FALHAS (LEAK FINDER SUMMARY) ----------------- */}
      {view === 'LEAK_FINDER' && (
        <main className="max-w-4xl mx-auto w-full my-auto animate-fadeIn">
          
          {/* Card de Performance Geral */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" />
            
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-bounce" />
            <h2 className="text-2xl font-black tracking-wide text-slate-100">Sessão Concluída!</h2>
            <p className="text-xs text-slate-400 mt-0.5">Métricas e relatórios de aproveitamento tático coletados</p>
            
            <div className="my-6">
              <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {accuracyPct}%
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mt-1">Taxa de Acerto Global</span>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm border-t border-slate-800/80 pt-5">
              <div>
                <span className="block text-xs text-slate-400">Acertos</span>
                <strong className="text-emerald-400 font-bold text-lg">{score}</strong>
              </div>
              <div className="w-px h-8 bg-slate-800 mx-auto self-center" />
              <div>
                <span className="block text-xs text-slate-400">Maior Streak</span>
                <strong className="text-amber-400 font-bold text-lg">🔥 {maxStreak}</strong>
              </div>
            </div>
          </div>

          {/* Lista detalhada do Detector de Erros (Leak Finder) */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-400" /> Diagnóstico de Erros (Leak Finder Logs)
            </h3>

            {sessionHistory.filter(h => !h.isCorrect).length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">
                🎉 Estratégia impecável! Você não cometeu nenhum desvio GTO nesta sessão.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {sessionHistory.filter(h => !h.isCorrect).map((log, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-red-950/50 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <span className="font-black text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px] mr-2">
                        {log.heroPos}
                      </span>
                      <span className="text-slate-200 font-medium">{log.scenarioName}</span>
                      <p className="text-slate-400 mt-1">
                        Mão avaliada: <strong className="text-slate-200">{log.handText}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Sua jogada: <strong className="text-red-400 line-through">{log.userChoice}</strong></span>
                      <span className="block font-bold text-emerald-400">GTO correto: {log.correctChoice}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão de Retorno */}
          <button
            onClick={() => setView('SETUP')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-4 rounded-xl font-bold mt-6 text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" /> CONFIGURAR NOVO TREINO (MENU)
          </button>
        </main>
      )}

      {/* FOOTER */}
      <footer className="text-center text-[10px] text-slate-500 mt-6 border-t border-slate-900 pt-4">
        Poker preflop GTO simulator engine. Desenvolvido para alta velocidade de clique.
      </footer>
    </div>
  );
}