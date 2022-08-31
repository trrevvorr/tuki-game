import type { Card, CardWithSettings } from "@/types/card";
import { Modifier } from "@/types/modifier";

export class Deck {
  private readonly cards: CardWithSettings[];

  constructor() {
    this.cards = this.addSettings(this.shuffle(cards));
  }

  getCard(index: number) {
    return this.cards[index];
  }

  cardCount() {
    return this.cards.length;
  }
  private shuffle(cards: Card[]): Card[] {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach((card, index) => (card.index = index));

    return shuffled;
  }

  private addSettings(cards: Card[]): CardWithSettings[] {
    return cards.map((card) => {
      const rotateRange = [
        card.modifiers.includes(Modifier.ROTATE_LEFT) ? -1 : 0,
        card.modifiers.includes(Modifier.ROTATE_RIGHT) ? 1 : 0,
      ];
      const rotate = (Math.floor(Math.random() * (rotateRange[1] - rotateRange[0] + 1)) +
        rotateRange[0]) as -1 | 0 | 1;

      return {
        ...card,
        settings: {
          snow: card.modifiers.includes(Modifier.SNOW) && !!Math.round(Math.random()),
          rotate,
        },
      };
    });
  }
}

const cards: Card[] = [
  {
    pieces: [
      [
        [0, 3],
        [4, 3],
      ],
      [
        [3, 4],
        [3, 8],
      ],
      [
        [4, 5],
        [8, 5],
      ],
      [
        [5, 0],
        [5, 4],
      ],
    ],
    modifiers: [Modifier.SNOW],
  },
  {
    pieces: [
      [
        [2, 5],
        [2, 9],
      ],
      [
        [0, 0],
        [0, 4],
      ],
      [
        [3, 9],
        [3, 13],
      ],
      [
        [1, 2],
        [1, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 0],
        [0, 4],
      ],
      [
        [2, 4],
        [6, 4],
      ],
      [
        [1, 4],
        [1, 8],
      ],
      [
        [1, 1],
        [5, 1],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 0],
        [4, 0],
      ],
      [
        [4, 5],
        [4, 9],
      ],
      [
        [3, 1],
        [7, 1],
      ],
      [
        [3, 2],
        [3, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 5],
        [4, 5],
      ],
      [
        [2, 0],
        [2, 4],
      ],
      [
        [2, 6],
        [6, 6],
      ],
      [
        [0, 7],
        [4, 7],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [11, 0],
        [11, 4],
      ],
      [
        [5, 2],
        [5, 6],
      ],
      [
        [6, 2],
        [10, 2],
      ],
      [
        [0, 2],
        [4, 2],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 6],
        [9, 6],
      ],
      [
        [0, 0],
        [4, 0],
      ],
      [
        [8, 1],
        [8, 5],
      ],
      [
        [3, 1],
        [7, 1],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [11, 2],
        [11, 6],
      ],
      [
        [6, 3],
        [10, 3],
      ],
      [
        [5, 0],
        [5, 4],
      ],
      [
        [0, 0],
        [4, 0],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 0],
        [4, 0],
      ],
      [
        [1, 1],
        [5, 1],
      ],
      [
        [4, 2],
        [8, 2],
      ],
      [
        [6, 3],
        [10, 3],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [7, 0],
        [7, 4],
      ],
      [
        [0, 2],
        [0, 6],
      ],
      [
        [4, 5],
        [8, 5],
      ],
      [
        [1, 6],
        [5, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [2, 1],
        [6, 1],
      ],
      [
        [4, 4],
        [8, 4],
      ],
      [
        [0, 5],
        [4, 5],
      ],
      [
        [1, 0],
        [1, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 1],
        [0, 5],
      ],
      [
        [3, 0],
        [3, 4],
      ],
      [
        [1, 5],
        [5, 5],
      ],
      [
        [6, 2],
        [6, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 2],
        [5, 6],
      ],
      [
        [2, 1],
        [6, 1],
      ],
      [
        [0, 4],
        [0, 8],
      ],
      [
        [1, 0],
        [1, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [6, 0],
        [6, 4],
      ],
      [
        [0, 6],
        [4, 6],
      ],
      [
        [7, 2],
        [11, 2],
      ],
      [
        [5, 2],
        [5, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 0],
        [4, 0],
      ],
      [
        [5, 5],
        [9, 5],
      ],
      [
        [3, 1],
        [3, 5],
      ],
      [
        [2, 6],
        [6, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 3],
        [4, 7],
      ],
      [
        [3, 0],
        [3, 4],
      ],
      [
        [4, 1],
        [8, 1],
      ],
      [
        [0, 8],
        [4, 8],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [2, 6],
        [2, 10],
      ],
      [
        [0, 5],
        [4, 5],
      ],
      [
        [5, 5],
        [5, 9],
      ],
      [
        [0, 0],
        [0, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [3, 6],
        [7, 6],
      ],
      [
        [3, 1],
        [3, 5],
      ],
      [
        [8, 3],
        [8, 7],
      ],
      [
        [0, 0],
        [4, 0],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [3, 5],
        [3, 9],
      ],
      [
        [5, 3],
        [5, 7],
      ],
      [
        [4, 1],
        [4, 5],
      ],
      [
        [0, 0],
        [4, 0],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 5],
        [0, 9],
      ],
      [
        [3, 4],
        [3, 8],
      ],
      [
        [1, 1],
        [1, 5],
      ],
      [
        [2, 0],
        [2, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 4],
        [4, 4],
      ],
      [
        [4, 0],
        [8, 0],
      ],
      [
        [2, 6],
        [6, 6],
      ],
      [
        [5, 1],
        [5, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 2],
        [4, 2],
      ],
      [
        [7, 1],
        [11, 1],
      ],
      [
        [5, 2],
        [5, 6],
      ],
      [
        [6, 0],
        [6, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 6],
        [4, 6],
      ],
      [
        [4, 0],
        [4, 4],
      ],
      [
        [0, 1],
        [0, 5],
      ],
      [
        [3, 5],
        [7, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 6],
        [4, 6],
      ],
      [
        [5, 5],
        [5, 9],
      ],
      [
        [5, 0],
        [5, 4],
      ],
      [
        [1, 1],
        [1, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [2, 0],
        [6, 0],
      ],
      [
        [6, 3],
        [10, 3],
      ],
      [
        [0, 4],
        [4, 4],
      ],
      [
        [5, 1],
        [5, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 0],
        [9, 0],
      ],
      [
        [5, 1],
        [5, 5],
      ],
      [
        [0, 2],
        [4, 2],
      ],
      [
        [6, 3],
        [6, 7],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 5],
        [4, 5],
      ],
      [
        [6, 5],
        [10, 5],
      ],
      [
        [4, 0],
        [4, 4],
      ],
      [
        [3, 6],
        [7, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 5],
        [4, 5],
      ],
      [
        [3, 0],
        [7, 0],
      ],
      [
        [5, 1],
        [5, 5],
      ],
      [
        [6, 3],
        [10, 3],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 5],
        [4, 9],
      ],
      [
        [0, 0],
        [0, 4],
      ],
      [
        [6, 1],
        [6, 5],
      ],
      [
        [1, 4],
        [5, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 0],
        [5, 4],
      ],
      [
        [0, 6],
        [4, 6],
      ],
      [
        [6, 4],
        [10, 4],
      ],
      [
        [5, 5],
        [5, 9],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [2, 7],
        [2, 11],
      ],
      [
        [5, 0],
        [5, 4],
      ],
      [
        [3, 4],
        [3, 8],
      ],
      [
        [0, 3],
        [4, 3],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 2],
        [4, 2],
      ],
      [
        [6, 0],
        [10, 0],
      ],
      [
        [1, 3],
        [5, 3],
      ],
      [
        [4, 1],
        [8, 1],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 6],
        [5, 10],
      ],
      [
        [0, 4],
        [4, 4],
      ],
      [
        [3, 5],
        [7, 5],
      ],
      [
        [6, 0],
        [6, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 1],
        [5, 5],
      ],
      [
        [5, 0],
        [9, 0],
      ],
      [
        [0, 1],
        [4, 1],
      ],
      [
        [4, 6],
        [8, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 1],
        [4, 5],
      ],
      [
        [0, 6],
        [4, 6],
      ],
      [
        [1, 0],
        [5, 0],
      ],
      [
        [3, 7],
        [7, 7],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [3, 7],
        [7, 7],
      ],
      [
        [3, 2],
        [3, 6],
      ],
      [
        [1, 1],
        [5, 1],
      ],
      [
        [0, 0],
        [0, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [2, 0],
        [6, 0],
      ],
      [
        [2, 3],
        [2, 7],
      ],
      [
        [1, 0],
        [1, 4],
      ],
      [
        [0, 4],
        [0, 8],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [3, 0],
        [3, 4],
      ],
      [
        [9, 1],
        [9, 5],
      ],
      [
        [4, 4],
        [8, 4],
      ],
      [
        [0, 5],
        [4, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [9, 2],
        [9, 6],
      ],
      [
        [0, 2],
        [4, 2],
      ],
      [
        [6, 1],
        [10, 1],
      ],
      [
        [5, 0],
        [5, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [1, 4],
        [1, 8],
      ],
      [
        [0, 7],
        [0, 11],
      ],
      [
        [2, 0],
        [2, 4],
      ],
      [
        [3, 2],
        [3, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 2],
        [8, 2],
      ],
      [
        [10, 0],
        [10, 4],
      ],
      [
        [0, 1],
        [4, 1],
      ],
      [
        [9, 2],
        [9, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [0, 2],
        [4, 2],
      ],
      [
        [9, 0],
        [9, 4],
      ],
      [
        [3, 3],
        [7, 3],
      ],
      [
        [4, 1],
        [8, 1],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [1, 3],
        [1, 7],
      ],
      [
        [0, 0],
        [0, 4],
      ],
      [
        [2, 6],
        [2, 10],
      ],
      [
        [2, 5],
        [6, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 6],
        [8, 6],
      ],
      [
        [0, 0],
        [4, 0],
      ],
      [
        [4, 1],
        [4, 5],
      ],
      [
        [3, 4],
        [3, 8],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [8, 1],
        [8, 5],
      ],
      [
        [6, 0],
        [10, 0],
      ],
      [
        [0, 4],
        [4, 4],
      ],
      [
        [3, 5],
        [7, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [1, 0],
        [5, 0],
      ],
      [
        [0, 6],
        [4, 6],
      ],
      [
        [3, 1],
        [3, 5],
      ],
      [
        [1, 7],
        [1, 11],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [5, 0],
        [5, 4],
      ],
      [
        [0, 8],
        [0, 12],
      ],
      [
        [0, 3],
        [4, 3],
      ],
      [
        [1, 4],
        [1, 8],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [4, 7],
        [8, 7],
      ],
      [
        [1, 6],
        [5, 6],
      ],
      [
        [1, 0],
        [1, 4],
      ],
      [
        [0, 2],
        [0, 6],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [6, 4],
        [10, 4],
      ],
      [
        [0, 1],
        [4, 1],
      ],
      [
        [5, 0],
        [5, 4],
      ],
      [
        [11, 0],
        [11, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [6, 1],
        [6, 5],
      ],
      [
        [0, 2],
        [0, 6],
      ],
      [
        [4, 0],
        [4, 4],
      ],
      [
        [1, 5],
        [5, 5],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
  {
    pieces: [
      [
        [6, 3],
        [6, 7],
      ],
      [
        [0, 1],
        [0, 5],
      ],
      [
        [1, 5],
        [5, 5],
      ],
      [
        [7, 0],
        [7, 4],
      ],
    ],
    modifiers: [Modifier.SNOW, Modifier.ROTATE_LEFT, Modifier.ROTATE_RIGHT],
  },
];
