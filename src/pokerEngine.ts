import type { RangeRule } from './rangesData';
import { pokerRangesData } from './rangesData';
const PREFLOP_RANGES = pokerRangesData.preflop_ranges;


export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const SUITS = ['s', 'h', 'd', 'c']; // s = spades(♠), h = hearts(♥), d = diamonds(♦), c = clubs(♣)

export interface Card {
  suit: string;
  value: string;
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
    
    // Intervalo de Faixas (-) ex: 77-22 ou ATs-A2s
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
    // Notações com sinal de superior (+) ex: TT+ ou AQs+
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
    // Combinações avulsas ex: KQs, AQo, 54s
    else {
      combos.add(token);
    }
  }
  return combos;
}

export function getHandText(c1: Card, c2: Card): string {
  const idx1 = getRankIdx(c1.rank);
  const idx2 = getRankIdx(c2.rank);
  if (idx1 === idx2) return c1.rank + c2.rank;
  if (idx1 > idx2) {
    return c1.rank + c2.rank + (c1.suit === c2.suit ? 's' : 'o');
  } else {
    return c2.rank + c1.rank + (c1.suit === c2.suit ? 's' : 'o');
  }
}

export function getGTOActionForScenario(handText: string, scenario: Scenario): 'FOLD' | 'CALL' | 'RAISE' | '3-BET' {
  const rules = PREFLOP_RANGES.filter(r => scenario.associatedRuleIds.includes(r.id));
  
  // Varre as regras associadas para o cenário atual. Caso não esteja mapeada em nenhuma delas, será FOLD.
  for (let rule of rules) {
    const expanded = expandRange(rule.hand_range);
    if (expanded.has(handText)) {
      if (rule.action === 'Raise') return 'RAISE';
      if (rule.action === 'Call') return 'CALL';
      if (rule.action === '3Bet') return '3-BET';
    }
  }
  return 'FOLD';
}

export function generateRandomHand(): { card1: Card; card2: Card; handText: string } {
  const fullDeck: Card[] = [];
  for (let r of RANKS) {
    for (let s of SUITS) {
      fullDeck.push({ rank: r, suit: s as any });
    }
  }
  
  const idx1 = Math.floor(Math.random() * fullDeck.length);
  const card1 = fullDeck.splice(idx1, 1)[0];
  const idx2 = Math.floor(Math.random() * fullDeck.length);
  const card2 = fullDeck[idx2];

  return { card1, card2, handText: getHandText(card1, card2) };
}

export function getFullGridMatrixForScenario(scenario: Scenario): { [hand: string]: 'FOLD' | 'CALL' | 'RAISE' | '3-BET' } {
  const matrix: { [hand: string]: 'FOLD' | 'CALL' | 'RAISE' | '3-BET' } = {};
  const matrixRanks = [...RANKS].reverse(); // De Ás para 2
  
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
      matrix[cellHand] = getGTOActionForScenario(cellHand, scenario);
    }
  }
  return matrix;
}