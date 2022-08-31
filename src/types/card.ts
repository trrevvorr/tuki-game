import type { Modifier } from "./modifier";
import type { Piece } from "./piece";
import type { CardSettings } from "./cardSettings";

export interface Card {
  pieces: Piece;
  modifiers: Modifier[];
  index?: number;
}

export interface CardWithSettings extends Card {
  settings: CardSettings;
}
