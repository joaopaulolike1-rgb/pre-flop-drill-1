import type { RangeRule } from './rangesData';
import { pokerRangesData } from './rangesData';
const PREFLOP_RANGES = pokerRangesData.preflop_ranges;

export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const SUITS = ['s', 'h', 'd', 'c']; // s = spades(♠), h = hearts(♥), d = diamonds(♦), c = clubs(♣)

export interface Card {
  suit: string;
  value: string; // Nota: Garanta que use 'rank' ou 'value' de forma consistente
  rank?: string;  // Adicionado suporte para 'rank' conforme o restante do seu código
}

export interface Scenario {
  id: string;
  name: string;
  category: string;
  heroPos: string;
  villainPos: string | null;
  timeline: string;
  associatedRuleIds: number[];
}

export const SCENARIOS: Scenario[] = [
  { id: 'rfi_utg', name: 'RFI - UTG Open', category: 'RFI', heroPos: 'UTG', villainPos: null, timeline: 'Mesa limpa em GAP ➔ Sua vez de agir', associatedRuleIds: [1] },
  { id: 'rfi_mp', name: 'RFI - MP Open', category: 'RFI', heroPos: 'MP', villainPos: null, timeline: 'UTG deu Fold ➔ Sua vez de agir', associatedRuleIds: [2] },
  { id: 'rfi_co', name: 'RFI - CO Open', category: 'RFI', heroPos: 'CO', villainPos: null, timeline: 'UTG e MP deram Fold ➔ Sua vez de agir', associatedRuleIds: [3] },
  { id: 'rfi_btn', name: 'RFI - BTN Open', category: 'RFI', heroPos: 'BTN', villainPos: null, timeline: 'UTG, MP e CO deram Fold ➔ Sua vez de agir', associatedRuleIds: [4] },
  { id: 'bb_vs_utg', name: 'BB vs UTG Open', category: 'Defense_BB', heroPos: 'BB', villainPos: 'UTG', timeline: 'UTG abriu Raise 2.5 BB ➔ MP ao SB deram Fold ➔ Sua vez', associatedRuleIds: [5, 6] },
  { id: 'bb_vs_mp', name: 'BB vs MP Open', category: 'Defense_BB', heroPos: 'BB', villainPos: 'MP', timeline: 'UTG Fold ➔ MP abriu Raise 2.5 BB ➔ CO ao SB deram Fold', associatedRuleIds: [7, 8] },
  { id: 'bb_vs_co', name: 'BB vs CO Open', category: 'Defense_BB', heroPos: 'BB', villainPos: 'CO', timeline: 'UTG e MP Fold ➔ CO abriu Raise 2.5 BB ➔ BTN e SB Fold', associatedRuleIds: [9, 10] },
  { id: 'bb_vs_btn', name: 'BB vs BTN Open', category: 'Defense_BB', heroPos: 'BB', villainPos: 'BTN', timeline: 'Mesa rodou em Fold até o BTN ➔ BTN abriu Raise 2.5 BB ➔ SB Fold', associatedRuleIds: [11, 12] },
  { id: 'btn_vs_utg', name: 'BTN vs UTG Open', category: 'Defense_BTN', heroPos: 'BTN', villainPos: 'UTG', timeline: 'UTG abriu Raise 2.5 BB ➔ MP e CO deram Fold ➔ Sua vez', associatedRuleIds: [13, 14] },
  { id: 'btn_vs_mp', name: 'BTN vs MP Open', category: 'Defense_BTN', heroPos: 'BTN', villainPos: 'MP', timeline: 'UTG Fold ➔ MP abriu Raise 2.5 BB ➔ CO deu Fold ➔ Sua vez', associatedRuleIds: [15, 16] },
  { id: 'btn_vs_co', name: 'BTN vs CO Open', category: 'Defense_BTN', heroPos: 'BTN', villainPos: 'CO', timeline: 'UTG e MP deram Fold ➔ CO abriu Raise 2.5 BB ➔ Sua vez', associatedRuleIds: [17, 18] },
  { id: 'iso_ip', name: 'Iso Limp (IP)', category: 'Iso_Limp', heroPos: 'BTN', villainPos: 'Limp', timeline: 'Um jogador em MP deu LIMP ➔ CO deu Fold ➔ Sua vez no BTN', associatedRuleIds: [19] },
  { id: 'iso_oop', name: 'Iso Limp (OOP)', category: 'Iso_Limp', heroPos: 'SB', villainPos: 'Limp', timeline: 'Mesa rodou em Fold até o BTN ➔ BTN entrou de LIMP ➔ Sua vez no SB', associatedRuleIds: [20] },
  { id: 'sb_vs_utg', name: 'SB vs UTG Open', category: 'Defense_SB', heroPos: 'SB', villainPos: 'UTG', timeline: 'UTG abriu Raise 2.5 BB ➔ MP ao CO deram Fold ➔ Sua vez', associatedRuleIds: [21] },
  { id: 'sb_vs_mp', name: 'SB vs MP Open', category: 'Defense_SB', heroPos: 'SB', villainPos: 'MP', timeline: 'UTG Fold ➔ MP abriu Raise 2.5 BB ➔ CO e BTN deram Fold ➔ Sua vez', associatedRuleIds: [22] },
  { id: 'sb_vs_cobtn', name: 'SB vs CO/BTN Open', category: 'Defense_SB', heroPos: 'SB', villainPos: 'CO_BTN', timeline: 'Mesa limpa até o CO ➔ CO abriu Raise 2.5 BB ➔ BTN Fold ➔ Sua vez', associatedRuleIds: [23] },
  { id: 'blind_war_sb', name: 'Blind War - SB Open', category: 'Blind_War', heroPos: 'SB', villainPos: null, timeline: 'Mesa rodou limpa em Fold até você no Small Blind', associatedRuleIds: [24] },
  { id: 'blind_war_bb', name: 'Blind War - BB vs SB', category: 'Blind_War', heroPos: 'BB', villainPos: 'SB', timeline: 'Mesa limpa até o SB ➔ SB abriu aumento de 3 BB ➔ Sua vez no BB', associatedRuleIds: [25, 26] },
];

function getRankIdx(r: string): number {
  return RANKS.indexOf(r);
}

export function expandRange(rangeStr: string): Set<string> {
  const combos = new Set<string>();
  if (!rangeStr) return combos;
  const tokens = rangeStr.replace(/\s+/g, '').split(',');

  for (let token of tokens) {
    if (!token) continue;
    
    if (token.includes('-')) {
      const [highPart, lowPart] = token.split('-');
      if (highPart.length === 2 && highPart[0] === highPart[1]) {
        const rHigh = getRankIdx(highPart[0]);
        const rLow = getRankIdx(lowPart[0]);
        for (let i = rLow; i <= rHigh; i++) {
          combos.add(RANKS[i] + RANKS[i]);
        }
      } else {
        const type = highPart.endsWith('s') ? 's' : 'o';
        const mainRank = highPart[0];
        const rKHigh = getRankIdx(highPart[1]);
        const rKLow = getRankIdx(lowPart[1]);
        for (let i = rKLow; i <= rKHigh; i++) {
          combos.add(mainRank + RANKS[i] + type);
        }
      }
    } 
    else if (token.endsWith('+')) {
      const base = token.slice(0, -1);
      if (base.length === 2 && base[0] === base[1]) {
        const rBase = getRankIdx(base[0]);
        for (let i = rBase; i <= getRankIdx('A'); i++) {
          combos.add(RANKS[i] + RANKS[i]);
        }
      } else {
        const type = base.endsWith('s') ? 's' : 'o';
        const mainRank = base[0];
        const rKBase = getRankIdx(base[1]);
        const rMain = getRankIdx(mainRank);
        for (let i = rKBase; i < rMain; i++) {
          combos.add(mainRank + RANKS[i] + type);
        }
      }
    } 
    else {
      combos.add(token);
    }
  }
  return combos;
}

export function getHandText(c1: Card, c2: Card): string {
  const r1 = c1.rank || c1.value;
  const r2 = c2.rank || c2.value;
  const idx1 = getRankIdx(r1);
  const idx2 = getRankIdx(r2);
  if (idx1 === idx2) return r1 + r2;
  if (idx1 > idx2) {
    return r1 + r2 + (c1.suit === c2.suit ? 's' : 'o');
  } else {
    return r2 + r1 + (c1.suit === c2.suit ? 's' : 'o');
  }
}

// CORREÇÃO AQUI: Agora aceita stackSize e faz busca dinâmica baseada nos metadados do cenário
export function getGTOActionForScenario(
  handText: string, 
  scenario: Scenario, 
  stackSize: number = 100
): 'FOLD' | 'CALL' | 'RAISE' | '3-BET' | 'ALL-IN' {
  // Encontra a regra base (100bb) para herdar a categoria e posições mapeadas no cenário
  const baseRules = PREFLOP_RANGES.filter(r => scenario.associatedRuleIds.includes(r.id));
  if (baseRules.length === 0) return 'FOLD';

  const { category, hero_pos, villain_pos } = baseRules[0];

  // Filtra dinamicamente todas as regras do stack correto correspondentes a esse cenário
  const rules = PREFLOP_RANGES.filter(r => 
    r.stack_size === stackSize &&
    r.category === category &&
    r.hero_pos === hero_pos &&
    r.villain_pos === villain_pos
  );
  
  for (let rule of rules) {
    const expanded = expandRange(rule.hand_range);
    if (expanded.has(handText)) {
      const actionLower = rule.action.toLowerCase();
      if (actionLower === 'raise') return 'RAISE';
      if (actionLower === 'call') return 'CALL';
      if (actionLower === '3bet') return '3-BET';
      if (actionLower === 'all-in') return 'ALL-IN'; // Mapeia a nova ação
    }
  }
  return 'FOLD';
}

export function generateRandomHand(): { card1: Card; card2: Card; handText: string } {
  const fullDeck: Card[] = [];
  for (let r of RANKS) {
    for (let s of SUITS) {
      fullDeck.push({ rank: r, value: r, suit: s as any });
    }
  }
  
  const idx1 = Math.floor(Math.random() * fullDeck.length);
  const card1 = fullDeck.splice(idx1, 1)[0];
  const idx2 = Math.floor(Math.random() * fullDeck.length);
  const card2 = fullDeck[idx2];

  return { card1, card2, handText: getHandText(card1, card2) };
}

// CORREÇÃO AQUI: Repassa o stackSize para gerar a matriz correta
export function getFullGridMatrixForScenario(
  scenario: Scenario,
  stackSize: number = 100
): { [hand: string]: 'FOLD' | 'CALL' | 'RAISE' | '3-BET' | 'ALL-IN' } {
  const matrix: { [hand: string]: 'FOLD' | 'CALL' | 'RAISE' | '3-BET' | 'ALL-IN' } = {};
  const matrixRanks = [...RANKS].reverse(); 
  
  for (let r1 of matrixRanks) {
    for (let r2 of matrixRanks) {
      const idx1 = getRankIdx(r1);
      const idx2 = getRankIdx(r2);
      let cellHand = '';
      if (idx1 === idx2) {
        cellHand = r1 + r2;
      } else if (idx1 > idx2) {
        cellHand = r1 + r2 + 's';
      } else {
        cellHand = r2 + r1 + 'o';
      }
      matrix[cellHand] = getGTOActionForScenario(cellHand, scenario, stackSize);
    }
  }
  return matrix;
}

export function getCardsFromHandText(handText: string): { card1: Card; card2: Card } {
  const r1 = handText[0];
  const r2 = handText[1];
  const type = handText.length === 3 ? handText[2] : 'p'; 

  const suitsBase = [...SUITS];
  let s1: string, s2: string;

  if (type === 's') {
    s1 = suitsBase[Math.floor(Math.random() * suitsBase.length)];
    s2 = s1;
  } else {
    const idx1 = Math.floor(Math.random() * suitsBase.length);
    s1 = suitsBase.splice(idx1, 1)[0];
    const idx2 = Math.floor(Math.random() * suitsBase.length);
    s2 = suitsBase[idx2];
  }

  return {
    card1: { rank: r1, value: r1, suit: s1 as any },
    card2: { rank: r2, value: r2, suit: s2 as any }
  };
}

// CORREÇÃO AQUI: Repassa o stackSize para a lógica expert funcionar com ranges curtos
export function generateHandByDifficulty(
  scenario: Scenario, 
  difficulty: 'NORMAL' | 'EXPERT',
  stackSize: number = 100
): { card1: Card; card2: Card; handText: string } {
  
  if (difficulty === 'NORMAL') {
    return generateRandomHand();
  }

  const matrix = getFullGridMatrixForScenario(scenario, stackSize);
  const pool: string[] = [];
  const ranksDesc = [...RANKS].reverse(); 

  const getCoords = (h: string) => {
    const r1 = ranksDesc.indexOf(h[0]);
    const r2 = ranksDesc.indexOf(h[1]);
    const type = h.length === 3 ? h[2] : 'p';
    
    if (type === 's') return { row: Math.min(r1, r2), col: Math.max(r1, r2), type: 's' };
    if (type === 'o') return { row: Math.max(r1, r2), col: Math.min(r1, r2), type: 'o' };
    return { row: r1, col: r2, type: 'p' };
  };

  const actionHands = Object.keys(matrix).filter(h => matrix[h] !== 'FOLD');
  const actionCoords = actionHands.map(getCoords);

  if (actionHands.length === 0) return generateRandomHand();

  Object.keys(matrix).forEach(hand => {
    if (matrix[hand] !== 'FOLD') {
      pool.push(hand); 
    } else {
      const hCoords = getCoords(hand);
      let minDistance = 99;
      
      for (let ac of actionCoords) {
        let dist = Math.max(Math.abs(hCoords.row - ac.row), Math.abs(hCoords.col - ac.col));
        
        if (hCoords.type !== ac.type) {
            if ((hCoords.type === 's' && ac.type === 'o') || (hCoords.type === 'o' && ac.type === 's')) {
                dist += 4; 
            } else {
                dist += 1; 
            }
        }

        if (dist < minDistance) minDistance = dist;
      }

      if (minDistance > 0 && minDistance <= 2) {
        pool.push(hand);
      }
    }
  });

  const chosenHandText = pool[Math.floor(Math.random() * pool.length)];
  const { card1, card2 } = getCardsFromHandText(chosenHandText);
  
  return { card1, card2, handText: chosenHandText };
}