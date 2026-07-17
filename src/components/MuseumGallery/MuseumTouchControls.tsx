import type {MuseumPointerBindings} from './useMuseumControls';
import type {MuseumWalkingPace} from './museumMovement';

export type MuseumTouchControlsProps = {
  active: boolean;
  blocked: boolean;
  canInteract: boolean;
  nearbyLabel?: string;
  walkingPace: MuseumWalkingPace;
  movementBindings: MuseumPointerBindings;
  lookBindings: MuseumPointerBindings;
  onInteract: () => void;
  onPause: () => void;
  onReset: () => void;
  onMap: () => void;
  onDirectory: () => void;
  onWalkingPaceChange: (pace: MuseumWalkingPace) => void;
};

const buttonStyle = {minWidth: 44, minHeight: 44} as const;

/** DOM touch controls kept outside the Canvas so they remain large and accessible. */
export function MuseumTouchControls({
  active,
  blocked,
  canInteract,
  nearbyLabel,
  walkingPace,
  movementBindings,
  lookBindings,
  onInteract,
  onPause,
  onReset,
  onMap,
  onDirectory,
  onWalkingPaceChange,
}: MuseumTouchControlsProps) {
  const enabled = active && !blocked;
  return <div
    className="museum-touch-controls"
    data-active={enabled ? 'true' : 'false'}
    aria-label="Museum touch controls"
  >
    <div
      className="museum-touch-joystick"
      {...movementBindings}
      aria-hidden="true"
      style={{minWidth: 104, minHeight: 104, touchAction: enabled ? 'none' : 'auto', userSelect: 'none'}}
    ><span aria-hidden="true">Move</span></div>
    <div
      className="museum-touch-look"
      {...lookBindings}
      aria-hidden="true"
      style={{minWidth: 104, minHeight: 104, touchAction: enabled ? 'none' : 'auto', userSelect: 'none'}}
    ><span aria-hidden="true">Look</span></div>
    <div className="museum-touch-actions">
      <button
        className="museum-touch-speed"
        type="button"
        disabled={!enabled}
        aria-pressed={walkingPace === 'fast'}
        aria-label={`Walking speed is ${walkingPace}. Switch to ${walkingPace === 'fast' ? 'standard' : 'fast'} speed`}
        onClick={() => onWalkingPaceChange(walkingPace === 'fast' ? 'standard' : 'fast')}
        style={buttonStyle}
      >{walkingPace === 'fast' ? 'Fast' : 'Std'}</button>
      <button
        className="museum-touch-interact"
        type="button"
        disabled={!enabled || !canInteract}
        aria-label={nearbyLabel ? `Interact with ${nearbyLabel}` : 'Interact with a nearby Museum stop'}
        onClick={onInteract}
        style={buttonStyle}
      >Interact</button>
      <button type="button" onClick={onPause} disabled={!enabled} style={buttonStyle} aria-label="Pause or exit the Museum visit">Pause</button>
      <button type="button" onClick={onReset} disabled={!enabled} style={buttonStyle} aria-label="Reset Museum position">Reset</button>
      <button type="button" onClick={onMap} disabled={blocked} style={buttonStyle} aria-label="Open Museum visitor map">Map</button>
      <button type="button" onClick={onDirectory} disabled={blocked} style={buttonStyle} aria-label="Open Museum directory">Guide</button>
    </div>
  </div>;
}
