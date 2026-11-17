import type { Choice, GameState, Line, Scene } from './types';

export function flagOn(state: GameState, key?: string): boolean {
  return Boolean(key && state.flags[key]);
}

export function lineVisible(line: Line, state: GameState): boolean {
  if (line.ifFlag && !state.flags[line.ifFlag]) return false;
  if (line.ifNotFlag && state.flags[line.ifNotFlag]) return false;
  if (line.ifEvidence && !state.evidence.includes(line.ifEvidence)) return false;
  if (line.ifNotEvidence && state.evidence.includes(line.ifNotEvidence)) return false;
  if (line.ifAllEvidence && !line.ifAllEvidence.every((id) => state.evidence.includes(id)))
    return false;
  return true;
}

export function choiceVisible(choice: Choice, state: GameState): boolean {
  if (choice.requiresFlag && !state.flags[choice.requiresFlag]) return false;
  if (choice.hideIfFlag && state.flags[choice.hideIfFlag]) return false;
  return true;
}

export function visibleSceneLines(scene: Scene, state: GameState): Line[] {
  return scene.lines.filter((line) => lineVisible(line, state));
}

export function visibleChoices(line: Line, state: GameState): Choice[] {
  return (line.choices ?? []).filter((choice) => choiceVisible(choice, state));
}
