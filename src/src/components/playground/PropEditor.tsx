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
        <button
          className={`pe-toggle ${value ? 'pe-toggle--on' : ''}`}
          onClick={() => onChange(!value)}
          role="switch"
          aria-checked={value}
        >
          <span className="pe-toggle-knob" />
          <span className="pe-toggle-label">{value ? 'true' : 'false'}</span>
        </button>
      )}

      {config.type === 'string' && (
        <input
          className="pe-input"
          type="text"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={config.label}
        />
      )}

      {config.type === 'textarea' && (
        <textarea
          className="pe-textarea"
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={config.label}
          rows={3}
        />
      )}

      {config.type === 'number' && (
        <div className="pe-number-row">
          <input
            className="pe-input pe-input--number"
            type="number"
            value={value ?? 0}
            onChange={e => onChange(Number(e.target.value))}
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
        <div className="pe-select-group">
          {config.options?.map(opt => (
            <button
              key={opt}
              className={`pe-option ${value === opt ? 'pe-option--active' : ''}`}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
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
