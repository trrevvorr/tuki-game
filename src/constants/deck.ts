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
        [6, 0],
        [6, 4],
      ],
      [
        [0, 1],
        [0, 5],
      ],
      [
        [1, 4],
        [5, 4],
      ],
      [
        [5, 5],
        [10, 5],
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
];
