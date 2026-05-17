import docsData from '../docs.json';
import demosData from '../demos.json';
import type { PropConfig, DemoSection } from '../components/playground/ComponentPlayground';

interface StencilProp {
  name: string;
  type: string;
  default?: string;
  docs: string;
  values?: Array<{ value?: string; type?: string }>;
}

const componentRegistryCache: Record<string, PropConfig[]> = {};

/**
 * Returns the dynamic prop configurations for a given component tag (e.g. 'ui-button')
 */
export function getPropsForComponent(tagName: string): PropConfig[] {
  if (componentRegistryCache[tagName]) {
    return componentRegistryCache[tagName];
  }

  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component) return [];

  const props: PropConfig[] = component.props.map((p: StencilProp) => {
    // 1. Determine the prop editor type
    let type: PropConfig['type'] = 'string';
    let options: string[] | undefined = undefined;

    // Clean up type string
    const rawType = p.type.trim();

    // Check if type is boolean
    if (rawType === 'boolean') {
      type = 'boolean';
    }
    // Check if type is number
    else if (rawType === 'number') {
      type = 'number';
    }
    // Check if it is a literal union like "'primary' | 'secondary'" or '"filled" | "outline"'
    else if (rawType.includes('|') || (p.values && p.values.length > 1 && p.values.every(v => v.value !== undefined))) {
      type = 'select';
      // Extract option values
      if (p.values && p.values.length > 0 && p.values.every(v => v.value !== undefined)) {
        options = p.values.map(v => v.value!);
      } else {
        options = rawType
          .split('|')
          .map(opt => opt.trim().replace(/^['"]|['"]$/g, ''))
          .filter(opt => opt !== 'undefined' && opt !== 'null');
      }
    }
    // Check if it is a JSON property
    else if (rawType.includes('[]') || rawType === 'any' || rawType.includes('Record<') || rawType.includes('Array<')) {
      type = 'json';
    }

    // 2. Resolve default value
    let defaultValue: any = undefined;
    if (p.default !== undefined) {
      const cleanedDefault = p.default.trim();
      if (type === 'boolean') {
        defaultValue = cleanedDefault === 'true';
      } else if (type === 'number') {
        defaultValue = Number(cleanedDefault);
        if (isNaN(defaultValue)) defaultValue = 0;
      } else if (type === 'select' || type === 'string') {
        // Remove surrounding quotes e.g. "'primary'" -> "primary"
        defaultValue = cleanedDefault.replace(/^['"`]|['"`]$/g, '');
      } else if (type === 'json') {
        try {
          defaultValue = JSON.parse(cleanedDefault);
        } catch {
          defaultValue = undefined;
        }
      }
    }

    // Determine clean label from name
    const label = p.name
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^\w/, c => c.toUpperCase());

    return {
      name: p.name,
      type,
      label,
      defaultValue,
      options,
      description: p.docs || `${label} property`
    };
  });

  componentRegistryCache[tagName] = props;
  return props;
}

/**
 * Returns dynamic descriptions for a given component
 */
export function getDescriptionForComponent(tagName: string, fallback: string): string {
  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component) return fallback;
  return component.docs || component.readme?.split('\n')[2]?.trim() || fallback;
}

/**
 * Returns compiled live demos for a given component key (e.g. 'button')
 */
export function getDemosForComponent(componentId: string): DemoSection[] {
  const demos = (demosData as Record<string, DemoSection[]>)[componentId];
  return demos || [];
}
