import docsData from '../docs.json';
import demosData from '../demos.json';
import type { PropConfig, DemoSection, EventConfig, MethodConfig, SlotConfig, PartConfig } from '../components/playground/ComponentPlayground';

interface StencilProp {
  name: string;
  type: string;
  attr?: string;
  default?: string;
  docs: string;
  required?: boolean;
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
      description: p.docs || `${label} property`,
      rawType: p.type.trim(),
      attrName: p.attr || p.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
      required: p.required || false,
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

/**
 * Returns compiled events emitted by a given component (e.g. 'ui-accordion')
 */
export function getEventsForComponent(tagName: string): EventConfig[] {
  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component || !component.events) return [];
  return component.events.map((e: any) => ({
    event: e.event,
    detail: e.detail,
    docs: e.docs
  }));
}

/**
 * Returns compiled public methods exposed by a given component (e.g. 'ui-accordion')
 */
export function getMethodsForComponent(tagName: string): MethodConfig[] {
  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component || !component.methods) return [];
  return component.methods.map((m: any) => ({
    name: m.name,
    signature: m.signature,
    docs: m.docs
  }));
}

/**
 * Returns named slots exposed by a given component (e.g. 'ui-dialog-box')
 */
export function getSlotsForComponent(tagName: string): SlotConfig[] {
  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component || !component.slots) return [];
  return component.slots.map((s: any) => ({
    name: s.name || '(default)',
    docs: s.docs || ''
  }));
}

/**
 * Returns CSS shadow parts exported by a given component for ::part() styling
 */
export function getPartsForComponent(tagName: string): PartConfig[] {
  const component = docsData.components.find((c: any) => c.tag === tagName);
  if (!component || !component.parts) return [];
  return component.parts.map((p: any) => ({
    name: p.name,
    docs: p.docs || ''
  }));
}
