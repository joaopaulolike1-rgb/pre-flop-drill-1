export interface RangeRule {
  id: number;
  stack_size: number; // Novo parâmetro
  category: string;
  hero_pos: string;
  villain_pos: string | null;
  action: string;
  hand_range: string;
}


export const pokerRangesData = {
  "notations": [
    {
      "symbol": "s",
      "meaning": "Suited (Mesmo naipe)"
    },
    {
      "symbol": "o",
      "meaning": "Offsuit (Naipes diferentes)"
    },
    {
      "symbol": "+",
      "meaning": "Indica a carta/par e todas as superiores (ex: 22+ = 22, 33, ..., AA)"
    },
    {
      "symbol": "-",
      "meaning": "Faixa inclusiva (ex: JJ-TT = JJ e TT; 77-22 = 22, 33, 44, 55, 66, 77)"
    }
  ],
  "preflop_ranges": [
    {
      "id": 1,
      "stack_size": 100,
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "TT+, AQs+, AQo+, KQs"
    },
    {
      "id": 2,
      "stack_size": 100,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "66+, ATs+, KJs+, QJs, JTs, T9s, AJo+, KQo"
    },
    {
      "id": 3,
      "stack_size": 100,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+, A2s+, K7s+, Q8s+, J9s+, T8s+, 98s, 87s, ATo+, KTo+, QTo+, JTo+"
    },
    {
      "id": 4,
      "stack_size": 100,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+, A2s+, A2o+, K2s+, K7o+, Q5s+, J7s+, T7s+, Q8o+, J9o+, T9o , 97s+, 86s+, 75s+, 65s, 54s"
    },
    {
      "id": 5,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "UTG",
      "action": "Call",
      "hand_range": "TT-22, AQs-A2s, KTs+, QTs+, JTs, T9s, AQo"
    },
    {
      "id": 6,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "JJ+, AKs, AKo"
    },
    {
      "id": 7,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "MP",
      "action": "Call",
      "hand_range": "99-22, AJs-A2s, KQs-K9s, Q9s+, J9s+, T8s+, 98s, 87s, AJo, KQo"
    },
    {
      "id": 8,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AQs+, AQo+"
    },
    {
      "id": 9,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "CO",
      "action": "Call",
      "hand_range": "88-22, ATs-A2s, KJs-K2s, Q5s+, J7s+, T7s+, 97s+, 86s+, 76s, 65s, 54s, ATo, KJo-KTo, QTo+, JTo"
    },
    {
      "id": 10,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "CO",
      "action": "3Bet",
      "hand_range": "99+, AJs+, KQs, AJo+, KQo"
    },
    {
      "id": 11,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "BTN",
      "action": "Call",
      "hand_range": "77-22, ATs-A2s, KTs-K2s, Q5s+, J7s+, T7s+, 97s+, 86s+, 75s+, 65s, 54s, ATo-A8o, KJo-K9o , Q9o+, J9o+ , T9o"
    },
    {
      "id": 12,
      "stack_size": 100,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "BTN",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, AJo+, KQo"
    },
    {
      "id": 13,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "UTG",
      "action": "Call",
      "hand_range": "JJ-22, AQs-AJs, KQs, QJs, JTs, T9s"
    },
    {
      "id": 14,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "QQ+, AKs, AKo"
    },
    {
      "id": 15,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "MP",
      "action": "Call",
      "hand_range": "99-22, AJs-A9s, KJs-KTs, QTs+, JTs+, T9s, 98s, 87s"
    },
    {
      "id": 16,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AQs+, KQs, AQo+"
    },
    {
      "id": 17,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "CO",
      "action": "Call",
      "hand_range": "88-22, ATs-A2s, KJs-K9s, Q9s+, J9s+, T9s, 98s, 87s"
    },
    {
      "id": 18,
      "stack_size": 100,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "CO",
      "action": "3Bet",
      "hand_range": "99+, AJs+, KQs, AJo+, KQo"
    },
    {
      "id": 19,
      "stack_size": 100,
      "category": "Iso_Limp",
      "hero_pos": "IP",
      "villain_pos": "Limp",
      "action": "Raise",
      "hand_range": "22+, A2s+, KTs+, QTs+, JTs, T9s, 98s, 87s, ATo+, KTo+, QTo+, JTo"
    },
    {
      "id": 20,
      "stack_size": 100,
      "category": "Iso_Limp",
      "hero_pos": "OOP",
      "villain_pos": "Limp",
      "action": "Raise",
      "hand_range": "77+, ATs+, KJs+, QJs, AJo+, KQo"
    },
    {
      "id": 21,
      "stack_size": 100,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "JJ+, AQs+, AKo"
    },
    {
      "id": 22,
      "stack_size": 100,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AJs+, KQs, AQo+"
    },
    {
      "id": 23,
      "stack_size": 100,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "CO_BTN",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, QJs, JTs, AJo+, KQo"
    },
    {
      "id": 24,
      "stack_size": 100,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,97s+,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o"
    },
    {
      "id": 25,
      "stack_size": 100,
      "category": "Blind_War",
      "hero_pos": "BB",
      "villain_pos": "SB",
      "action": "Call",
      "hand_range": "77-22, ATs-A2s, KTs-K2s, QTs-Q5s, J7s+, T7s+, 97s+, 86s+, 75s+, 65s, ATo, KTo, QTo, JTo"
    },
    {
      "id": 26,
      "stack_size": 100,
      "category": "Blind_War",
      "hero_pos": "BB",
      "villain_pos": "SB",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, QJs, AJo+, KJo+, QJo"
    },
    {
      "id": 27,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "99+,AJs+,A9s-A5s,KQs,KTs-K9s,Q9s+,JTs,AKo,AJo-ATo,KQo"
    },
    {
      "id": 28,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "All-in",
      "hand_range": "88-77,ATs,KJs,AQo"
    },
    {
      "id": 29,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "99+,ATs+,A8s-A5s,KQs,K9s,QTs-Q9s,JTs,T9s,AKo,ATo-A9o,KJo,QJo"
    },
    {
      "id": 30,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "88-55,A9s,KJs-KTs,QJs,AQo-AJo,KQo"
    },
    {
      "id": 31,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "88+,A7s+,KJs+,K8s-K7s,Q9s-Q8s,J9s-J8s,T9s,AKo,A7o-A4o,KTo,QTo+,JTo"
    },
    {
      "id": 32,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "77-22,A9s,A6s-A2s,KTs-K9s,QTs+,JTs,AQo-A8o,KJo+"
    },
    {
      "id": 33,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "88+,ATs+,KTs+,K7s-K3s,QTs+,Q8s-Q5s,J8s-J7s,T7s+,98s,A7o-A2o,K9o-K8o,QTo-Q9o,JTo"
    },
    {
      "id": 34,
      "stack_size": 14,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "77-22,A9s-A2s,K9s-K8s,Q9s,J9s+,A8o+,KTo+,QJo"
    },
    {
      "id": 35,
      "stack_size": 14,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "TT+,AQs+,K7s+,Q9s,T8s+,98s,K6o-K2o,QTo,Q8o-Q7o,JTo,J8o"
    },
    {
      "id": 36,
      "stack_size": 14,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Call",
      "hand_range": "99-88,AJs-ATs,A5s-A4s,QTs+,Q8s-Q7s,J6s+,T6s+,96s+,86s+,75s+,65s,Q9o,J9o,T7o+"
    },
    {
      "id": 37,
      "stack_size": 14,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "77-22,A9s-A6s,A3s-A2s,K6s-K3s,Q6s-Q5s,A2o+,K7o+,QJo"
    },
    {
      "id": 38,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "88+, A8s+, KJs, QJs, JTs, AJo+, KQo"
    },
    {
      "id": 39,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "66+, A5s+, K8s+, Q9s+, J9s+, T9s, 98s, ATo+, KJo+, QJo"
    },
    {
      "id": 40,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "66+, A6s+, KJs+, K9s-K7s, Q9s-Q8s, J9s-J8s, T8s+, 98s, 87s, AKo, A9o-A7o, KTo+, QTo+, JTo "
    },
    {
      "id": 41,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "55-22, A5s-A2s, KTs, QTs+, JTs, AQo-ATo"
    },
    {
      "id": 42,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "66+, A6s+, KJs+, K8s-K2s, QJs, Q8s-Q5s, J9s-J7s, T7s+, 97s+, 86s+, 76s, AKo, A4o-A2o, KTo-K8o, QJo-Q9o, J9o+, T9o"
    },
    {
      "id": 43,
      "stack_size": 17,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "55-22, A5s-A2s, K9s, QTs-Q9s, JTs, AQo-A5o, KJo+"
    },
    {
      "id": 44,
      "stack_size": 17,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "88+, A8s+, KTs+, QJs, AQo+"
    },
    {
      "id": 45,
      "stack_size": 17,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Call",
      "hand_range": "A7s-A6s, K7s-K2s, Q8s-Q5s, J8s-J7s, T8s-T7s, 97s+, 86s+, 75s+, 65s, QTo-Q9o, J9o+, T9o"
    },
    {
      "id": 46,
      "stack_size": 17,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "all-in",
      "hand_range": "77-22, A5s-A2s, K9s-K8s, QTs-Q9s, J9s+, T9s, AJo-A2o, K8o+, QJo"
    },
    {
      "id": 47,
      "stack_size": 30,
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "55+,A2s+,K9s+,Q9s+,J9s+,T8s+,98s,ATo+,KJo+"
    },
    {
      "id": 48,
      "stack_size": 30,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "44+,A2s+,K7s+,Q8s+,J8s+,T8s+,98s,87s,A9o+,KTo+,QJo"
    },
    {
      "id": 49,
      "stack_size": 30,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,97s+,86s+,76s,65s,A5o+,K9o+,Q9o+,JTo"
    },
    {
      "id": 50,
      "stack_size": 30,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+,A2s+,K2s+,Q2s+,J4s+,T5s+,96s+,86s+,75s+,65s,54s,A2o+,K7o+,Q8o+,J8o+,T8o+"
    },
  ]
}