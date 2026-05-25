import { useState, useRef, useEffect } from 'react';
import React from 'react';
import PropEditor from './PropEditor';
import CodePreview from './CodePreview';
import DemoRenderer from './DemoRenderer';
import './ComponentPlayground.css';

export interface PropConfig {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'select' | 'color' | 'json' | 'textarea';
  label: string;
  defaultValue: any;
  options?: string[];
  description?: string;
}

export interface ExampleConfig {
  title: string;
  description?: string;
  code: string;
  render: () => React.ReactNode;
}

export interface DemoSection {
  title: string;
  description?: string;
  /** Raw HTML string from the original JS demo files */
  html: string;
}

export interface DocSection {
  title: string;
  content: string;
}

export interface EventConfig {
  event: string;
  detail: string;
  docs: string;
}

export interface MethodConfig {
  name: string;
  signature: string;
  docs: string;
}

export interface ComponentPlaygroundProps {
  componentName: string;
  tagName: string;
  description: string;
  props: PropConfig[];
  renderPreview: (props: Record<string, any>) => React.ReactNode;
  buildCode: (props: Record<string, any>) => string;
  docs: DocSection[];
  examples: ExampleConfig[];
  /** Raw HTML demo sections pulled from the original demo JS files */
  demoSections?: DemoSection[];
  /** When true, skips the tab UI and renders just the scrollable single-page content */
  interactiveDocs?: boolean;
  events?: EventConfig[];
  methods?: MethodConfig[];
}

// ─── TOC Sections for Interactive Docs ────────────────────────────────────────
const TOC_SECTIONS = [
  { id: 'section-overview', label: 'Overview', icon: 'info' },
  { id: 'section-examples', label: 'Examples', icon: 'code-2' },
  { id: 'section-props', label: 'Props Reference', icon: 'list' },
] as const;

// ─── Left Sidebar for Interactive Docs (reserved for future use) ─────────────────
const _DocsSidebar = null; void _DocsSidebar;


// ─── Right TOC Sidebar (reserved for future use) ───────────────────────────────
const _TocSidebar = null; void _TocSidebar;


// ─── Interactive Docs Center Content ─────────────────────────────────────────
function InteractiveDocsContent({
  componentName,
  tagName,
  description,
  propConfigs,
  docs,
  examples,
  demoSections,
  onSectionChange,
  noScrollWrapper = false,
  events = [],
  methods = []
}: ComponentPlaygroundProps & {
  propConfigs: PropConfig[];
  onSectionChange: (id: string) => void;
  noScrollWrapper?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handler = () => {
      const sectionIds = TOC_SECTIONS.map(s => s.id);
      for (const id of [...sectionIds].reverse()) {
        const el = container.querySelector(`#${id}`) as HTMLElement | null;
        if (el && el.offsetTop <= container.scrollTop + 120) {
          onSectionChange(id);
          return;
        }
      }
      onSectionChange(sectionIds[0]);
    };
    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
  }, []);

  const scrollToId = (id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.querySelector(`#${id}`) as HTMLElement | null;
    if (target) {
      container.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
    }
  };

  // Expose scrollToId via a ref trick so the parent TocSidebar can call it
  (InteractiveDocsContent as any)._scrollToId = scrollToId;

  return (
    <div
      className={noScrollWrapper ? 'id-docs-content' : 'cp-dual-center-content'}
      ref={noScrollWrapper ? undefined : scrollRef}
      id={noScrollWrapper ? undefined : 'cp-dual-center-scroll'}
    >
      {/* ── OVERVIEW ── */}
      <div className="cp-dual-section" id="section-overview">
        <div className="cp-section-badge">OVERVIEW</div>
        <h2 className="cp-dual-section-title">
          <ui-icon name="info" size="18" />
          {componentName}
        </h2>
        <div className="cp-consolidated-overview-box">
          <div className="cp-overview-main-info">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
              <ui-tag label={`<${tagName}>`} color="success" />
              <ui-tag label="Web Component" color="info" />
              <ui-tag label="Stable" color="primary" />
            </div>
            <p className="cp-overview-desc">{description}</p>
          </div>
          <div className="cp-overview-metadata-grid">
            <div className="cp-metadata-item">
              <span className="cp-metadata-label">HTML Tag</span>
              <code className="cp-metadata-value">&lt;{tagName}&gt;</code>
            </div>
            <div className="cp-metadata-item">
              <span className="cp-metadata-label">DOM Class</span>
              <code className="cp-metadata-value">HTML{componentName.replace(/\s+/g, '')}Element</code>
            </div>
            <div className="cp-metadata-item">
              <span className="cp-metadata-label">Scope</span>
              <code className="cp-metadata-value">Shadow DOM</code>
            </div>
            <div className="cp-metadata-item">
              <span className="cp-metadata-label">Export Name</span>
              <code className="cp-metadata-value">{componentName.replace(/\s+/g, '')}</code>
            </div>
          </div>
        </div>

        {/* Documentation narrative */}
        {docs.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            {docs.map((sec, i) => (
              <div key={i} className="cp-consolidated-doc-block">
                <h3 className="cp-doc-subsection-title">{sec.title}</h3>
                <div className="cp-docs-text" dangerouslySetInnerHTML={{ __html: sec.content }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── EXAMPLES & DEMOS ── */}
      <div className="cp-dual-section" id="section-examples">
        <div className="cp-section-badge">EXAMPLES</div>
        <h2 className="cp-dual-section-title">
          <ui-icon name="code-2" size="18" />
          Examples &amp; Demos
        </h2>

        <div className="cp-consolidated-examples-list">
          {examples.map((example, i) => (
            <ExampleCard key={`ex-${i}`} example={example} index={i} />
          ))}

          {demoSections && demoSections.length > 0 && (
            <>
              <div className="cp-demos-intro">
                <ui-icon name="play-circle" size="18" />
                <span>Real demos ported directly from the <code>{tagName}</code> demo files</span>
              </div>
              {demoSections.map((section, i) => (
                <DemoCard key={`demo-${i}`} section={section} index={i} />
              ))}
            </>
          )}

          {examples.length === 0 && (!demoSections || demoSections.length === 0) && (
            <div style={{ textAlign: 'center', padding: '3rem 2rem', color: 'rgba(255,255,255,0.25)' }}>
              <ui-icon name="code-2" size="36" />
              <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>No examples available yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ── PROPS REFERENCE ── */}
      <div className="cp-dual-section" id="section-props">
        <div className="cp-section-badge">API</div>
        <h2 className="cp-dual-section-title">
          <ui-icon name="list" size="18" />
          Props Reference
        </h2>
        <div className="cp-props-table-wrapper" id="sub-props">
          <table className="cp-props-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {propConfigs.map(prop => (
                <tr key={prop.name}>
                  <td><code className="cp-code-inline">{prop.name}</code></td>
                  <td><span className="cp-type-badge">{prop.type === 'select' ? prop.options?.join(' | ') : prop.type}</span></td>
                  <td><code className="cp-code-inline">{String(prop.defaultValue)}</code></td>
                  <td className="cp-prop-desc">{prop.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── EVENTS REFERENCE ── */}
        {events && events.length > 0 && (
          <div style={{ marginTop: '2rem' }} id="sub-events">
            <h3 className="cp-doc-subsection-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>
              <ui-icon name="zap" size="16" />
              Events Emitted
            </h3>
            <div className="cp-props-table-wrapper">
              <table className="cp-props-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Detail Payload</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.event}>
                      <td><code className="cp-code-inline">{ev.event}</code></td>
                      <td><code className="cp-code-inline">{ev.detail}</code></td>
                      <td className="cp-prop-desc">{ev.docs || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── METHODS REFERENCE ── */}
        {methods && methods.length > 0 && (
          <div style={{ marginTop: '2rem' }} id="sub-methods">
            <h3 className="cp-doc-subsection-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>
              <ui-icon name="terminal" size="16" />
              Public Methods
            </h3>
            <div className="cp-props-table-wrapper">
              <table className="cp-props-table">
                <thead>
                  <tr>
                    <th>Method Name</th>
                    <th>Signature</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {methods.map(m => (
                    <tr key={m.name}>
                      <td><code className="cp-code-inline">{m.name}</code></td>
                      <td><code className="cp-code-inline">{m.signature}</code></td>
                      <td className="cp-prop-desc">{m.docs || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── NOTES REFERENCE ── */}
        <div style={{ marginTop: '2rem' }} id="sub-notes">
          <h3 className="cp-doc-subsection-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
            <ui-icon name="file-text" size="16" />
            Notes &amp; Guidelines
          </h3>
          <div className="cp-consolidated-notes-box">
            <ul className="cp-consolidated-notes-list">
              <li><strong>Stencil Integration:</strong> This component is built as a standard web component. In React, use camelCase for properties and standard event listeners for custom events.</li>
              <li><strong>Ref Reflection:</strong> For public methods, obtain a DOM reference using React <code>useRef</code> or <code>document.querySelector</code> and invoke the methods directly on the element.</li>
              <li><strong>Styling Customization:</strong> Most components support dynamic theme injection. Custom CSS properties can be set via global stylesheets or custom element style attributes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
// ─── URL helpers ─────────────────────────────────────────────────────────────
const STATIC_IDS = new Set(['home','overview','documentation','design-house','installation','components-guide','pricing']);

function getTabFromHash(): string {
  const cleaned = window.location.hash.replace(/^#\/?/, '');
  const match = cleaned.match(/^component\/([^/]+)\//);
  return match ? match[1] : 'playground';
}

function getCompIdFromHash(): string {
  const cleaned = window.location.hash.replace(/^#\/?/, '');
  const match = cleaned.match(/^component\/[^/]+\/(.+)$/);
  return match ? match[1] : cleaned;
}

function syncTabToUrl(tab: string) {
  const id = getCompIdFromHash();
  if (id && !STATIC_IDS.has(id)) {
    window.history.replaceState(null, '', `#/component/${tab}/${id}`);
  }
}

export default function ComponentPlayground({
  componentName,
  tagName,
  description,
  props: propConfigs,
  renderPreview,
  buildCode,
  docs,
  examples,
  demoSections,
  interactiveDocs = false,
  events = [],
  methods = []
}: ComponentPlaygroundProps) {
  const [activeTab, setActiveTabState] = useState<'playground' | 'docs' | 'examples'>(
    () => (getTabFromHash() as any) || 'playground'
  );
  const [propValues, setPropValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    propConfigs.forEach(p => { defaults[p.name] = p.defaultValue; });
    return defaults;
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [appTheme, setAppTheme] = useState<string>(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  // Track app theme changes so preview components receive the correct theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setAppTheme(document.documentElement.getAttribute('data-theme') || 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const setActiveTab = (tab: 'playground' | 'docs' | 'examples') => {
    setActiveTabState(tab);
    syncTabToUrl(tab);
  };

  const handlePropChange = (name: string, value: any) => {
    setPropValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(buildCode(propValues));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabs = interactiveDocs
    ? ([
      { id: 'docs', label: 'Documentation', icon: 'book-open' },
      { id: 'examples', label: 'Examples & Demos', icon: 'code-2' },
    ] as const)
    : ([
      { id: 'playground', label: 'Design Studio', icon: 'sliders-horizontal' },
      { id: 'docs', label: 'Documentation', icon: 'book-open' },
      { id: 'examples', label: 'Examples & Demos', icon: 'code-2' },
    ] as const);

  // ── Interactive Docs mode: skip tab shell, render scrollable content directly ──
  if (interactiveDocs) {
    return (
      <InteractiveDocsContent
        componentName={componentName}
        tagName={tagName}
        description={description}
        props={propConfigs}
        propConfigs={propConfigs}
        renderPreview={renderPreview}
        buildCode={buildCode}
        docs={docs}
        examples={examples}
        demoSections={demoSections}
        onSectionChange={() => {}}
        noScrollWrapper={true}
        events={events}
        methods={methods}
      />
    );
  }

  return (
    <div className="cp-root">
      {/* Header */}
      <div className="cp-header">
        <div className="cp-header-title-row">
          <div className="cp-header-title">
            <ui-tag label={`<${tagName}>`} color="success" />
            <h1 className="cp-component-name">{componentName}</h1>
          </div>
        </div>
        <p className="cp-description">{description}</p>

        {/* Tabs */}
        <div className="cp-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`cp-tab ${activeTab === tab.id ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <ui-icon name={tab.icon} size="16" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="cp-tab-container">
          {/* Playground Tab */}
          {activeTab === 'playground' && (
            <div className="cp-playground-layout">
              <ui-resizable-panel
                direction="horizontal"
                panels='[
                  {"id":"panel-1","minSize":20,"maxSize":50,"size":30},
                  {"id":"panel-2","minSize":50,"maxSize":80,"size":70}
                ]'
                handle-size={6}
                handle-color="rgba(255,255,255,0.08)"
                handle-hover-color="rgba(99,102,241,0.6)"
                animated
                show-handle-icon
                style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
              >
                {/* Controls Panel — left */}
                <div className="cp-controls-panel" slot="panel-1">
                  <div className="cp-controls-header">
                    <ui-icon name="settings-2" size="16" />
                    <span>Properties</span>
                  </div>
                  <PropEditor
                    propConfigs={propConfigs}
                    values={propValues}
                    onChange={handlePropChange}
                  />
                  <ui-button
                    variant="ghost"
                    icon="rotate-ccw"
                    full-width
                    class="cp-reset-btn"
                    onClick={() => {
                      const defaults: Record<string, any> = {};
                      propConfigs.forEach(p => { defaults[p.name] = p.defaultValue; });
                      setPropValues(defaults);
                    }}
                  >
                    Reset to Defaults
                  </ui-button>
                </div>

                {/* Preview Panel — right */}
                <div className="cp-preview-panel" slot="panel-2">
                  <div className="cp-preview-label">
                    <span>Live Preview</span>
                    <div className="cp-preview-actions">
                      <ui-button
                        variant={copiedCode ? 'success' : 'outline'}
                        size="sm"
                        icon={copiedCode ? 'check' : 'copy'}
                        onClick={handleCopyCode}
                        title="Copy code"
                      >
                        {copiedCode ? 'Copied!' : 'Copy Code'}
                      </ui-button>
                    </div>
                  </div>
                  <div className="cp-preview-stage">
                    <div className="cp-preview-grid-bg" />
                    <div className="cp-preview-content">
                      {(() => {
                        const el = renderPreview(propValues);
                        return React.isValidElement(el)
                          ? React.cloneElement(el as React.ReactElement<any>, { theme: appTheme })
                          : el;
                      })()}
                    </div>
                  </div>
                  {/* Code Preview */}
                  <div className="cp-code-section">
                    <CodePreview code={buildCode(propValues)} language="html" />
                  </div>
                </div>
              </ui-resizable-panel>
            </div>
          )}

          {/* Docs Tab */}
          {activeTab === 'docs' && (
            <div className="cp-docs-layout">
              <div className="cp-docs-content">
                {/* Props Table */}
                <section className="cp-docs-section">
                  <h2 className="cp-docs-section-title">
                    <ui-icon name="list" size="18" />
                    Props Reference
                  </h2>
                  <div className="cp-props-table-wrapper">
                    <table className="cp-props-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Default</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propConfigs.map(prop => (
                          <tr key={prop.name}>
                            <td><code className="cp-code-inline">{prop.name}</code></td>
                            <td><span className="cp-type-badge">{prop.type === 'select' ? prop.options?.join(' | ') : prop.type}</span></td>
                            <td><code className="cp-code-inline">{String(prop.defaultValue)}</code></td>
                            <td className="cp-prop-desc">{prop.description || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Events Table */}
                {events && events.length > 0 && (
                  <section className="cp-docs-section">
                    <h2 className="cp-docs-section-title">
                      <ui-icon name="zap" size="18" />
                      Events Emitted
                    </h2>
                    <div className="cp-props-table-wrapper">
                      <table className="cp-props-table">
                        <thead>
                          <tr>
                            <th>Event Name</th>
                            <th>Detail Payload</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map(ev => (
                            <tr key={ev.event}>
                              <td><code className="cp-code-inline">{ev.event}</code></td>
                              <td><code className="cp-code-inline">{ev.detail}</code></td>
                              <td className="cp-prop-desc">{ev.docs || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Methods Table */}
                {methods && methods.length > 0 && (
                  <section className="cp-docs-section">
                    <h2 className="cp-docs-section-title">
                      <ui-icon name="terminal" size="18" />
                      Public Methods
                    </h2>
                    <div className="cp-props-table-wrapper">
                      <table className="cp-props-table">
                        <thead>
                          <tr>
                            <th>Method Name</th>
                            <th>Signature</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {methods.map(m => (
                            <tr key={m.name}>
                              <td><code className="cp-code-inline">{m.name}</code></td>
                              <td><code className="cp-code-inline">{m.signature}</code></td>
                              <td className="cp-prop-desc">{m.docs || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* Doc Sections */}
                {docs.map((section, i) => (
                  <section key={i} className="cp-docs-section">
                    <h2 className="cp-docs-section-title">
                      <ui-icon name="file-text" size="18" />
                      {section.title}
                    </h2>
                    <div className="cp-docs-text" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>
                ))}
              </div>
            </div>
          )}

          {/* Examples & Demos Tab */}
          {activeTab === 'examples' && (
            <div className="cp-examples-split-layout">
              <div className="cp-examples-sidebar">
                <ui-anchor
                  scroll-container=".cp-examples-scroll-container"
                  sticky="true"
                  scroll-offset="40"
                  smooth-scroll="true"
                  theme="dark"
                  size="sm"
                  active-color="#10b981"
                  items={JSON.stringify([
              ...examples.map((ex, i) => ({
                id: `link-ex-${i}`,
                label: ex.title,
                target: `example-heading-${i}`,
              })),
              ...(demoSections || []).map((demo, i) => ({
                id: `link-demo-${i}`,
                label: demo.title,
                target: `demo-heading-${i}`,
              })),
              // Child entry for demo example (link to first example as illustration)
              { id: 'demo-child', label: 'Demo Example', target: 'example-heading-0' },
            ])}
                />
              </div>

              <div className="cp-examples-scroll-container">
                {examples.map((example, i) => (
                  <ExampleCard key={`ex-${i}`} example={example} index={i} />
                ))}

                {demoSections && demoSections.length > 0 && (
                  <>
                    <div className="cp-demos-intro" style={{ marginTop: '1rem' }}>
                      <ui-icon name="play-circle" size="18" />
                      <span>Real demos ported directly from the <code>{tagName}</code> demo files</span>
                    </div>
                    {demoSections.map((section, i) => (
                      <DemoCard key={`demo-${i}`} section={section} index={i} />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}


function ExampleCard({ example, index }: { example: ExampleConfig; index: number }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cp-example-card">
      <div className="cp-example-header">
        <div>
          <div className="cp-example-number">Example {index + 1}</div>
          <h3 className="cp-example-title" id={`example-heading-${index}`}>{example.title}</h3>
          {example.description && <p className="cp-example-desc">{example.description}</p>}
        </div>
        <div className="cp-example-actions">
          <ui-button
            variant={copied ? 'success' : 'outline'}
            size="sm"
            icon={copied ? 'check' : 'copy'}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </ui-button>
          <ui-button
            variant={showCode ? 'primary' : 'outline'}
            size="sm"
            icon="code-2"
            onClick={() => setShowCode(v => !v)}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </ui-button>
        </div>
      </div>

      {/* Preview */}
      <div className="cp-example-preview">
        <div className="cp-preview-grid-bg" />
        <div className="cp-preview-content">
          {example.render()}
        </div>
      </div>

      {/* Code */}
      {showCode && (
        <div className="cp-example-code">
          <CodePreview code={example.code} language="html" />
        </div>
      )}
    </div>
  );
}

function DemoCard({ section, index }: { section: DemoSection; index: number }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(section.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cp-demo-section">
      <div className="cp-demo-section-header">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span className="cp-demo-section-number">{index + 1}</span>
          <div>
            <h3 className="cp-demo-section-title" id={`demo-heading-${index}`}>{section.title}</h3>
            {section.description && <p className="cp-demo-section-desc">{section.description}</p>}
          </div>
        </div>
        <div className="cp-example-actions">
          <ui-button
            variant={copied ? 'success' : 'outline'}
            size="sm"
            icon={copied ? 'check' : 'copy'}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </ui-button>
          <ui-button
            variant={showCode ? 'primary' : 'outline'}
            size="sm"
            icon="code-2"
            onClick={() => setShowCode(v => !v)}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </ui-button>
        </div>
      </div>
      
      <div className="cp-demo-section-body">
        <DemoRenderer html={section.html} />
      </div>

      {showCode && (
        <div className="cp-example-code">
          <CodePreview code={section.html} language="html" />
        </div>
      )}
    </div>
  );
}
