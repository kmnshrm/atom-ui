import { useState, useRef, useEffect } from 'react';
import type { PropConfig } from './ComponentPlayground';
import './PropEditor.css';

interface PropEditorProps {
  propConfigs: PropConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function PropEditor({ propConfigs, values, onChange }: PropEditorProps) {
  return (
    <div className="pe-root">
      {propConfigs.map(config => (
        <PropControl
          key={config.name}
          config={config}
          value={values[config.name]}
          onChange={val => onChange(config.name, val)}
        />
      ))}
    </div>
  );
}

function PropControl({
  config,
  value,
  onChange,
}: {
  config: PropConfig;
  value: any;
  onChange: (v: any) => void;
}) {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState(() =>
    typeof value === 'object' ? JSON.stringify(value, null, 2) : ''
  );

  // Stable callback ref — always points to the latest onChange
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Refs for web components
  const inputRef = useRef<any>(null);
  const switchRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);

  // ui-input: fires uiInput with detail.value on every keystroke
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const isNumber = config.type === 'number';
    const handler = (e: any) =>
      onChangeRef.current(isNumber ? Number(e.detail.value) : e.detail.value);
    el.addEventListener('uiInput', handler);
    return () => el.removeEventListener('uiInput', handler);
  }, [config.type]);

  // ui-switch: fires uiChange with detail.checked
  useEffect(() => {
    const el = switchRef.current;
    if (!el) return;
    const handler = (e: any) => onChangeRef.current(e.detail.checked);
    el.addEventListener('uiChange', handler);
    return () => el.removeEventListener('uiChange', handler);
  }, []);

  // ui-dropdown: set options property then listen for uiChange with detail.value
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    if (config.options) {
      el.options = config.options.map((opt: string) => ({ value: opt, label: opt }));
    }
    const handler = (e: any) => onChangeRef.current(e.detail.value);
    el.addEventListener('uiChange', handler);
    return () => el.removeEventListener('uiChange', handler);
  }, [config.options]);

  const handleJsonChange = (text: string) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      setJsonError(null);
      onChange(parsed);
    } catch {
      setJsonError('Invalid JSON');
    }
  };

  return (
    <div className="pe-control">
      <label className="pe-label">
        <span className="pe-prop-name">{config.name}</span>
        {config.description && (
          <span className="pe-prop-hint" title={config.description}>?</span>
        )}
      </label>

      {config.type === 'boolean' && (
        <ui-switch
          ref={switchRef}
          checked={value || undefined}
          label={value ? 'true' : 'false'}
          size="sm"
          color="success"
        />
      )}

      {config.type === 'string' && (
        <ui-input
          ref={inputRef}
          value={value ?? ''}
          placeholder={config.label}
          size="sm"
        />
      )}

      {config.type === 'textarea' && (
        <ui-input
          ref={inputRef}
          value={value ?? ''}
          placeholder={config.label}
          size="sm"
        />
      )}

      {config.type === 'number' && (
        <div className="pe-number-row">
          <ui-input
            ref={inputRef}
            type="number"
            value={String(value ?? 0)}
            size="sm"
            class="pe-number-input"
          />
          <input
            className="pe-range"
            type="range"
            min={0}
            max={100}
            value={value ?? 0}
            onChange={e => onChange(Number(e.target.value))}
          />
        </div>
      )}

      {config.type === 'color' && (
        <div className="pe-color-row">
          <input
            type="color"
            className="pe-color-picker"
            value={value ?? '#ffffff'}
            onChange={e => onChange(e.target.value)}
          />
          <input
            className="pe-input pe-input--color-text"
            type="text"
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder="#rrggbb"
          />
        </div>
      )}

      {config.type === 'select' && (
        <ui-dropdown
          ref={dropdownRef}
          value={value}
          size="sm"
          placeholder="Select..."
          class="pe-dropdown"
        />
      )}

      {config.type === 'json' && (
        <div className="pe-json-wrap">
          <textarea
            className={`pe-json-textarea ${jsonError ? 'pe-json-textarea--error' : ''}`}
            value={jsonText}
            onChange={e => handleJsonChange(e.target.value)}
            rows={6}
            spellCheck={false}
          />
          {jsonError && <span className="pe-json-error">{jsonError}</span>}
        </div>
      )}
    </div>
  );
}
