import {ANCIENT_GREEK_HALL_DEFINITION} from './ancientGreekHall';
import {ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION} from './ethicsJusticePoliticalLifeHall';
import {LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION} from './logicLanguageScienceHall';
import {MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION} from './mindConsciousnessSelfHall';
import {MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION} from './modernityFreedomCritiqueHall';
import {RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION} from './renaissanceReasonRevolutionHall';
import type {MuseumHallDefinition} from './museumWorldTypes';

/**
 * The data-only manifest behind the lazy runtime registry. Keeping this list
 * free of React loaders lets audits and map projections verify the same hall
 * membership that the rendered continuous world uses.
 */
export const MUSEUM_WORLD_DEFINITIONS = [
  ANCIENT_GREEK_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION,
  ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION,
  MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION,
] as const satisfies readonly MuseumHallDefinition[];
