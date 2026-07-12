import type {MuseumPointerBindings} from './useMuseumControls';

export type MuseumTouchControlsProps = {
  active: boolean;
  blocked: boolean;
  canInteract: boolean;
  nearbyLabel?: string;
  movementBindings: MuseumPointerBindings;
  lookBindings: MuseumPointerBindings;
  onInteract: () => void;
  onPause: () => void;
  onReset: () => void;
  onDirectory: () => void;
};

const buttonStyle = {minWidth: 44, minHeight: 44} as const;

/** DOM touch controls kept outside the Canvas so they remain large and accessible. */
export function MuseumTouchControls({
  active,
  blocked,
  canInteract,
  nearbyLabel,
  movementBindings,
  lookBindings,
  onInteract,
  onPause,
  onReset,
  onDirectory,
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
      aria-label="Movement joystick"
      role="application"
      style={{minWidth: 104, minHeight: 104, touchAction: enabled ? 'none' : 'auto', userSelect: 'none'}}
    ><span aria-hidden="true">Move</span></div>
    <div
      className="museum-touch-look"
      {...lookBindings}
      aria-label="Drag to look around"
      role="application"
      style={{minWidth: 104, minHeight: 104, touchAction: enabled ? 'none' : 'auto', userSelect: 'none'}}
    ><span aria-hidden="true">Look</span></div>
    <div className="museum-touch-actions">
      <button
        className="museum-touch-interact"
        type="button"
        disabled={!enabled || !canInteract}
        onClick={onInteract}
        style={buttonStyle}
      >{nearbyLabel ? `Interact: ${nearbyLabel}` : 'Interact'}</button>
      <button type="button" onClick={onPause} disabled={!enabled} style={buttonStyle}>Pause / Exit</button>
      <button type="button" onClick={onReset} disabled={!enabled} style={buttonStyle}>Reset position</button>
      <button type="button" onClick={onDirectory} disabled={blocked} style={buttonStyle}>Directory</button>
    </div>
  </div>;
}
