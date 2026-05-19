import { useState, useRef, useEffect } from 'react';
import type { PropConfig } from './ComponentPlayground';
import './PropEditor.css';

interface PropEditorProps {
  propConfigs: PropConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function PropEditor({ propConfigs, values, onChange }: PropEditorProps) {
  const booleans = propConfigs.filter(c => c.type === 'boolean');
  const selects = propConfigs.filter(c => c.type === 'select');
  const inputs = propConfigs.filter(c => c.type === 'string' || c.type === 'textarea');
  const others = propConfigs.filter(c => !['boolean', 'select', 'string', 'textarea'].includes(c.type));

  const items = [
    ...(booleans.length > 0 ? [{ id: 'booleans', title: `State & Behaviors (${booleans.length})` }] : []),
    ...(selects.length > 0 ? [{ id: 'selects', title: `Layout & Variants (${selects.length})` }] : []),
    ...(inputs.length > 0 ? [{ id: 'inputs', title: `Content & Text (${inputs.length})` }] : []),
    ...(others.length > 0 ? [{ id: 'others', title: `Advanced Configuration (${others.length})` }] : [])
  ];

  return (
    <div className="pe-root">
      <ui-accordion 
        items={JSON.stringify(items)} 
        multiple="true" 
        default-open={JSON.stringify(items.map(i => i.id))}
        variant="default"
      >
        {booleans.length > 0 && (
          <div slot="content-booleans" className="pe-booleans-wrap pe-accordion-body">
            {booleans.map(config => (
              <PropControl key={config.name} config={config} value={values[config.name]} onChange={val => onChange(config.name, val)} />
            ))}
          </div>
        )}
        {selects.length > 0 && (
          <div slot="content-selects" className="pe-grid-2 pe-accordion-body">
            {selects.map(config => (
              <PropControl key={config.name} config={config} value={values[config.name]} onChange={val => onChange(config.name, val)} />
            ))}
          </div>
        )}
        {inputs.length > 0 && (
          <div slot="content-inputs" className="pe-grid-2 pe-accordion-body">
            {inputs.map(config => (
              <PropControl key={config.name} config={config} value={values[config.name]} onChange={val => onChange(config.name, val)} />
            ))}
          </div>
        )}
        {others.length > 0 && (
          <div slot="content-others" className="pe-grid-2 pe-accordion-body">
            {others.map(config => (
              <PropControl key={config.name} config={config} value={values[config.name]} onChange={val => onChange(config.name, val)} />
            ))}
          </div>
        )}
      </ui-accordion>
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

  // ui-input: fires inputChange or inputInput with direct string on every keystroke
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const isNumber = config.type === 'number';
    const handler = (e: any) => {
      const rawVal = e.detail !== undefined && typeof e.detail === 'string'
        ? e.detail
        : (e.detail && e.detail.value !== undefined ? e.detail.value : e.target.value);
      onChangeRef.current(isNumber ? Number(rawVal) : rawVal);
    };
    el.addEventListener('inputChange', handler);
    el.addEventListener('inputInput', handler);
    el.addEventListener('uiInput', handler);
    el.addEventListener('input', handler);
    return () => {
      el.removeEventListener('inputChange', handler);
      el.removeEventListener('inputInput', handler);
      el.removeEventListener('uiInput', handler);
      el.removeEventListener('input', handler);
    };
  }, [config.type]);

  // ui-switch: fires switchChange with detail.checked
  useEffect(() => {
    const el = switchRef.current;
    if (!el) return;
    const handler = (e: any) => {
      const checked = e.detail && typeof e.detail.checked === 'boolean' ? e.detail.checked : e.target.checked;
      onChangeRef.current(checked);
    };
    el.addEventListener('switchChange', handler);
    el.addEventListener('uiChange', handler);
    el.addEventListener('change', handler);
    return () => {
      el.removeEventListener('switchChange', handler);
      el.removeEventListener('uiChange', handler);
      el.removeEventListener('change', handler);
    };
  }, [value]);

  // ui-dropdown: listen for valueChange with detail.value
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;
    const handler = (e: any) => {
      const val = e.detail && e.detail.value !== undefined ? e.detail.value : e.target.value;
      onChangeRef.current(val);
    };
    el.addEventListener('valueChange', handler);
    el.addEventListener('uiChange', handler);
    el.addEventListener('change', handler);
    return () => {
      el.removeEventListener('valueChange', handler);
      el.removeEventListener('uiChange', handler);
      el.removeEventListener('change', handler);
    };
  }, [value]);

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
          options={JSON.stringify(config.options?.map(opt => ({ value: opt, label: opt })) || [])}
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
