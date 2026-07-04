export interface RangeRule {
  id: number;
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
      "category": "RFI",
      "hero_pos": "UTG",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "TT+, AQs+, AQo+, KQs"
    },
    {
      "id": 2,
      "category": "RFI",
      "hero_pos": "MP",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "66+, ATs+, KJs+, QJs, JTs, T9s, AJo+, KQo"
    },
    {
      "id": 3,
      "category": "RFI",
      "hero_pos": "CO",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+, A2s+, K7s+, Q8s+, J9s+, T8s+, 98s, 87s, ATo+, KTo+, QTo+, JTo+"
    },
    {
      "id": 4,
      "category": "RFI",
      "hero_pos": "BTN",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+, A2s+, A2o+, K2s+, K7o+, Q5s+, J7s+, T7s+, Q8o+, J9o+, T9o , 97s+, 86s+, 75s+, 65s, 54s"
    },
    {
      "id": 5,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "UTG",
      "action": "Call",
      "hand_range": "TT-22, AQs-A2s, KTs+, QTs+, JTs, T9s, AQo"
    },
    {
      "id": 6,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "JJ+, AKs, AKo"
    },
    {
      "id": 7,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "MP",
      "action": "Call",
      "hand_range": "99-22, AJs-A2s, KQs-K9s, Q9s+, J9s+, T8s+, 98s, 87s, AJo, KQo"
    },
    {
      "id": 8,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AQs+, AQo+"
    },
    {
      "id": 9,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "CO",
      "action": "Call",
      "hand_range": "88-22, ATs-A2s, KJs-K2s, Q5s+, J7s+, T7s+, 97s+, 86s+, 76s, 65s, 54s, ATo, KJo-KTo, QTo+, JTo"
    },
    {
      "id": 10,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "CO",
      "action": "3Bet",
      "hand_range": "99+, AJs+, KQs, AJo+, KQo"
    },
    {
      "id": 11,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "BTN",
      "action": "Call",
      "hand_range": "77-22, ATs-A2s, KTs-K2s, Q5s+, J7s+, T7s+, 97s+, 86s+, 75s+, 65s, 54s, ATo-A8o, KJo-K9o , Q9o+, J9o+ , T9o"
    },
    {
      "id": 12,
      "category": "Defense_BB",
      "hero_pos": "BB",
      "villain_pos": "BTN",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, AJo+, KQo"
    },
    {
      "id": 13,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "UTG",
      "action": "Call",
      "hand_range": "JJ-22, AQs-AJs, KQs, QJs, JTs, T9s"
    },
    {
      "id": 14,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "QQ+, AKs, AKo"
    },
    {
      "id": 15,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "MP",
      "action": "Call",
      "hand_range": "99-22, AJs-A9s, KJs-KTs, QTs+, JTs+, T9s, 98s, 87s"
    },
    {
      "id": 16,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AQs+, KQs, AQo+"
    },
    {
      "id": 17,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "CO",
      "action": "Call",
      "hand_range": "88-22, ATs-A2s, KJs-K9s, Q9s+, J9s+, T9s, 98s, 87s"
    },
    {
      "id": 18,
      "category": "Defense_BTN",
      "hero_pos": "BTN",
      "villain_pos": "CO",
      "action": "3Bet",
      "hand_range": "99+, AJs+, KQs, AJo+, KQo"
    },
    {
      "id": 19,
      "category": "Iso_Limp",
      "hero_pos": "IP",
      "villain_pos": "Limp",
      "action": "Raise",
      "hand_range": "22+, A2s+, KTs+, QTs+, JTs, T9s, 98s, 87s, ATo+, KTo+, QTo+, JTo"
    },
    {
      "id": 20,
      "category": "Iso_Limp",
      "hero_pos": "OOP",
      "villain_pos": "Limp",
      "action": "Raise",
      "hand_range": "77+, ATs+, KJs+, QJs, AJo+, KQo"
    },
    {
      "id": 21,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "UTG",
      "action": "3Bet",
      "hand_range": "JJ+, AQs+, AKo"
    },
    {
      "id": 22,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "MP",
      "action": "3Bet",
      "hand_range": "TT+, AJs+, KQs, AQo+"
    },
    {
      "id": 23,
      "category": "Defense_SB",
      "hero_pos": "SB",
      "villain_pos": "CO_BTN",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, QJs, JTs, AJo+, KQo"
    },
    {
      "id": 24,
      "category": "Blind_War",
      "hero_pos": "SB",
      "villain_pos": null,
      "action": "Raise",
      "hand_range": "22+,A2s+,K2s+,Q5s+,J7s+,T7s+,97s+,87s,76s,65s,A2o+,K8o+,Q9o+,J9o+,T9o"
    },
    {
      "id": 25,
      "category": "Blind_War",
      "hero_pos": "BB",
      "villain_pos": "SB",
      "action": "Call",
      "hand_range": "77-22, ATs-A2s, KTs-K2s, QTs-Q5s, J7s+, T7s+, 97s+, 86s+, 75s+, 65s, ATo, KTo, QTo, JTo"
    },
    {
      "id": 26,
      "category": "Blind_War",
      "hero_pos": "BB",
      "villain_pos": "SB",
      "action": "3Bet",
      "hand_range": "88+, AJs+, KJs+, QJs, AJo+, KJo+, QJo"
    }
  ]
}