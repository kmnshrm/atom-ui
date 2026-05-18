import { useState } from 'react';
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
  demoSections = [],
}: ComponentPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'playground' | 'docs' | 'examples'>('playground');
  const [propValues, setPropValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    propConfigs.forEach(p => { defaults[p.name] = p.defaultValue; });
    return defaults;
  });
  const [copiedCode, setCopiedCode] = useState(false);

  const handlePropChange = (name: string, value: any) => {
    setPropValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(buildCode(propValues));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabs = [
    { id: 'playground', label: 'Design Studio', icon: 'sliders-horizontal' },
    { id: 'docs', label: 'Documentation', icon: 'book-open' },
    { id: 'examples', label: 'Examples & Demos', icon: 'code-2' },
  ] as const;


  return (
    <div className="cp-root">
      {/* Header */}
      <div className="cp-header">
        <div className="cp-header-title">
          <ui-tag label={`<${tagName}>`} color="success" />
          <h1 className="cp-component-name">{componentName}</h1>
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

      {/* Playground Tab */}
      {activeTab === 'playground' && (
        <div className="cp-playground-layout">
          {/* Preview Panel */}
          <div className="cp-preview-panel">
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
                {renderPreview(propValues)}
              </div>
            </div>
            {/* Code Preview */}
            <div className="cp-code-section">
              <CodePreview code={buildCode(propValues)} language="html" />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="cp-controls-panel">
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
        </div>
      )}

      {/* Tab Contents Container */}
      {activeTab !== 'playground' && (
        <div className="cp-tab-container">
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
              {/* Left sticky sidebar navigation using ui-anchor */}
              <div className="cp-examples-sidebar">
                <ui-anchor
                  auto-gen-container=".cp-examples-scroll-container"
                  scroll-container=".cp-examples-scroll-container"
                  sticky="true"
                  scroll-offset="40"
                  smooth-scroll="true"
                  theme="dark"
                  size="sm"
                  active-color="#10b981"
                />
              </div>

              {/* Right scrollable content containing Example and Demo Cards */}
              <div className="cp-examples-scroll-container">
                {examples.map((example, i) => (
                  <ExampleCard key={`ex-${i}`} example={example} index={i} />
                ))}

                {demoSections.length > 0 && (
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
      )}
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
