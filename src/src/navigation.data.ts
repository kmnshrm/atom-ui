export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  status?: string;
  iconLibrary?: string; // e.g., 'lucide', 'font-awesome', etc.
  children?: NavItem[];
  type?: 'item' | 'title' | 'divider';
}

export const topNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    status: 'online',
    icon: 'house',
    iconLibrary: 'lucide',
  },
  // {
  //   id: 'overview',
  //   label: 'Overview',
  //   icon: 'search',
  //   iconLibrary: 'lucide',
  // },
  {
    id: 'installation',
    label: 'Installation',
    icon: 'download-cloud',
    iconLibrary: 'lucide',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: 'book-open',
    iconLibrary: 'lucide',
  },
  {
    id: 'components-guide',
    label: 'Components Guide',
    icon: 'book-marked',
    iconLibrary: 'lucide',
  },
  {
    id: 'design-house',
    label: 'Design House',
    icon: 'palette',
    iconLibrary: 'lucide',
  },
];

export const categoryNavItems: NavItem[] = [
  {
    id: 'layout',
    label: 'Foundation & Layout',
    icon: 'layout-dashboard',
    iconLibrary: 'lucide',
    children: [
      { id: 'card', label: 'Card', icon: 'credit-card', iconLibrary: 'lucide' },
      { id: 'divider', label: 'Divider', icon: 'minus', iconLibrary: 'lucide' },
      { id: 'dock', label: 'Dock', icon: 'anchor', iconLibrary: 'lucide' },
      {
        id: 'layout-manager',
        label: 'Layout Manager',
        badge: '✨',
        icon: 'layout-panel-top',
        iconLibrary: 'lucide',
      },
      { id: 'masonry', label: 'Masonry', icon: 'layout-dashboard', iconLibrary: 'lucide' },
      {
        id: 'splitter',
        label: 'Splitter',
        icon: 'split-square-horizontal',
        iconLibrary: 'lucide',
      },
      { id: 'stack', label: 'Stack', icon: 'layers-2', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: 'map',
    iconLibrary: 'lucide',
    children: [
      { id: 'anchor', label: 'Anchor', icon: 'link', iconLibrary: 'lucide' },
      { id: 'breadcrumb', label: 'Breadcrumb', icon: 'chevrons-right', iconLibrary: 'lucide' },
      {
        id: 'context-menu',
        label: 'Context Menu',
        icon: 'mouse-pointer-click',
        iconLibrary: 'lucide',
      },
      { id: 'dock-overlay', label: 'Dock Overlay', icon: 'layout-bottom', iconLibrary: 'lucide' },
      { id: 'scroll-top', label: 'Scroll Top', icon: 'arrow-up-circle', iconLibrary: 'lucide' },
      { id: 'speed-dial', label: 'Speed Dial', icon: 'zap', iconLibrary: 'lucide' },
      { id: 'tab-stack', label: 'Tab Stack', icon: 'folder-open', iconLibrary: 'lucide' },
      { id: 'tabs', label: 'Tabs', icon: 'folder', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'inputs',
    label: 'Inputs & Forms',
    icon: 'keyboard',
    iconLibrary: 'lucide',
    children: [
      { id: 'button', label: 'Button', icon: 'square', iconLibrary: 'lucide' },
      {
        id: 'button-toggle',
        label: 'Button Toggle',
        icon: 'toggle-left',
        iconLibrary: 'lucide',
      },
      { id: 'cascade-select', label: 'Cascade Select', icon: 'target', iconLibrary: 'lucide' },
      { id: 'checkbox', label: 'Checkbox', icon: 'check-square', iconLibrary: 'lucide' },
      { id: 'dropdown', label: 'Dropdown', icon: 'chevron-down-square', iconLibrary: 'lucide' },
      { id: 'input', label: 'Input', icon: 'pencil', iconLibrary: 'lucide' },
      { id: 'otp-input', label: 'OTP Input', icon: 'hash', iconLibrary: 'lucide' },
      { id: 'pattern-input', label: 'Pattern Input', icon: 'regex', iconLibrary: 'lucide' },
      { id: 'picklist', label: 'Picklist', icon: 'list-checks', iconLibrary: 'lucide' },
      { id: 'radio', label: 'Radio', icon: 'radio', iconLibrary: 'lucide' },
      { id: 'range-slider', label: 'Range Slider', icon: 'sliders', iconLibrary: 'lucide' },
      { id: 'rating', label: 'Rating', icon: 'star', iconLibrary: 'lucide' },
      { id: 'switch', label: 'Switch', icon: 'toggle-right', iconLibrary: 'lucide' },
      {
        id: 'transfer-list',
        label: 'Transfer List',
        icon: 'arrow-left-right',
        iconLibrary: 'lucide',
      },
      { id: 'toggle', label: 'Toggle', icon: 'toggle-left', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'data',
    label: 'Data Visualization',
    icon: 'database',
    iconLibrary: 'lucide',
    children: [
      {
        id: 'advanced-data-table',
        label: 'Advanced Table',
        icon: 'table-2',
        iconLibrary: 'lucide',
      },
      { id: 'knob', label: 'Knob', icon: 'gauge', iconLibrary: 'lucide' },
      { id: 'list', label: 'List', icon: 'list', iconLibrary: 'lucide' },
      { id: 'meter-group', label: 'Meter Group', icon: 'thermometer', iconLibrary: 'lucide' },
      { id: 'pagination', label: 'Pagination', icon: 'book-copy', iconLibrary: 'lucide' },
      { id: 'progress', label: 'Progress', icon: 'loader', iconLibrary: 'lucide' },
      { id: 'speedometer', label: 'Speedometer', icon: 'gauge-circle', iconLibrary: 'lucide' },
      { id: 'timeline', label: 'Timeline', icon: 'calendar', iconLibrary: 'lucide' },
      { id: 'timer', label: 'Timer', icon: 'timer', iconLibrary: 'lucide' },
      { id: 'tree', label: 'Tree', icon: 'network', iconLibrary: 'lucide' },
      { id: 'tree-list', label: 'Tree List', icon: 'git-branch', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    icon: 'monitor',
    iconLibrary: 'lucide',
    children: [
      {
        id: 'animate-on-scroll',
        label: 'Animate on Scroll',
        icon: 'video',
        iconLibrary: 'lucide',
      },
      { id: 'avatar', label: 'Avatar', icon: 'user-circle', iconLibrary: 'lucide' },
      { id: 'avatar-group', label: 'Avatar Group', icon: 'users', iconLibrary: 'lucide' },
      { id: 'badge', label: 'Badge', icon: 'badge', iconLibrary: 'lucide' },
      { id: 'carousel', label: 'Carousel', icon: 'image-play', iconLibrary: 'lucide' },
      { id: 'code-editor', label: 'Code Editor', icon: 'code-2', iconLibrary: 'lucide' },
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', iconLibrary: 'lucide' },
      { id: 'empty-state', label: 'Empty State', icon: 'inbox', iconLibrary: 'lucide' },
      { id: 'split-button', label: 'Split Button', icon: 'split', iconLibrary: 'lucide' },
      { id: 'tag', label: 'Tag', icon: 'tag-icon', iconLibrary: 'lucide' },
      { id: 'tags-input', label: 'Tags Input', icon: 'tags', iconLibrary: 'lucide' },
      { id: 'theme-switcher', label: 'Theme Switcher', icon: 'sun-moon', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'overlays',
    label: 'Feedback & Overlays',
    icon: 'message-circle',
    iconLibrary: 'lucide',
    children: [
      { id: 'accordian', label: 'Accordion', icon: 'chevrons-down-up', iconLibrary: 'lucide' },
      { id: 'aside', label: 'Aside Panel', icon: 'panel-right-close', iconLibrary: 'lucide' },
      {
        id: 'context-menu',
        label: 'Context Menu',
        icon: 'mouse-pointer-click',
        iconLibrary: 'lucide',
      },
      { id: 'dialog', label: 'Dialog', icon: 'message-square', iconLibrary: 'lucide' },
      { id: 'panel', label: 'Panel', icon: 'frame', iconLibrary: 'lucide' },
      { id: 'popover', label: 'Popover', icon: 'message-circle', iconLibrary: 'lucide' },
      {
        id: 'resizable-panel',
        label: 'Resizable Panel',
        icon: 'move-horizontal',
        iconLibrary: 'lucide',
      },
      { id: 'skeleton', label: 'Skeleton', icon: 'loader-circle', iconLibrary: 'lucide' },
      { id: 'snackbar', label: 'Snackbar', icon: 'bell', iconLibrary: 'lucide' },
      { id: 'tooltip', label: 'Tooltip', icon: 'help-circle', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: 'bar-chart',
    iconLibrary: 'lucide',
    children: [
      { id: 'chart', label: 'Chart', icon: 'bar-chart-4', iconLibrary: 'lucide' },
      { id: 'bar-chart', label: 'Bar Chart', icon: 'bar-chart', iconLibrary: 'lucide' },
      { id: 'line-chart', label: 'Line Chart', icon: 'line-chart', iconLibrary: 'lucide' },
      { id: 'pie-chart', label: 'Pie / Donut Chart', icon: 'pie-chart', iconLibrary: 'lucide' },
      { id: 'waffle-chart', label: 'Waffle Chart', icon: 'grid-2x2', iconLibrary: 'lucide' },
      { id: 'charts/area-chart', label: 'Area Chart', icon: 'area-chart', iconLibrary: 'lucide' },
      {
        id: 'charts/timeline-range',
        label: 'Timeline Range',
        icon: 'calendar-range',
        iconLibrary: 'lucide',
      },
      { id: 'charts/sparkline', label: 'Sparkline', icon: 'activity', iconLibrary: 'lucide' },
      { id: 'charts/radial-bar', label: 'Radial Bar', icon: 'target', iconLibrary: 'lucide' },
      {
        id: 'charts/gantt-chart',
        label: 'Gantt Chart',
        icon: 'gantt-chart',
        iconLibrary: 'lucide',
      },
      {
        id: 'charts/step-line-chart',
        label: 'Step Line',
        icon: 'trending-up',
        iconLibrary: 'lucide',
      },
      { id: 'charts/waterfall-chart', label: 'Waterfall', icon: 'waves', iconLibrary: 'lucide' },
      { id: 'charts/funnel-chart', label: 'Funnel Chart', icon: 'filter', iconLibrary: 'lucide' },
      { id: 'charts/rose-chart', label: 'Rose Chart', icon: 'flower-2', iconLibrary: 'lucide' },
      { id: 'charts/lollipop-chart', label: 'Lollipop', icon: 'circle-dot', iconLibrary: 'lucide' },
      { id: 'charts/polar-area-chart', label: 'Polar Area', icon: 'radar', iconLibrary: 'lucide' },
      {
        id: 'charts/candlestick-chart',
        label: 'Candlestick',
        icon: 'candlestick-chart',
        iconLibrary: 'lucide',
      },
      { id: 'charts/ohlc-chart', label: 'OHLC Chart', icon: 'bar-chart-4', iconLibrary: 'lucide' },
      { id: 'charts/tree-diagram', label: 'Tree Diagram', icon: 'network', iconLibrary: 'lucide' },
    ],
  },
  {
    id: 'mega-menu',
    label: 'Mega Menu (50 Items)',
    icon: 'layers',
    iconLibrary: 'lucide',
    children: Array.from({ length: 50 }).map((_, i) => ({
      id: `mega-item-${i + 1}`,
      label: `Mega Item ${i + 1}`,
      icon: 'star',
      iconLibrary: 'lucide',
    })),
  },
];

export const userProfileNavItems: NavItem[] = [

  {
    id: 'user-profile-praveen',
    label: 'Praveen Rajkumar',
    status: 'away',
    icon: 'user',
    iconLibrary: 'lucide',
    children: [
      { id: 'my-profile', label: 'My Profile', icon: 'circle-user', iconLibrary: 'lucide' },
      {
        id: 'account-settings',
        label: 'Account Settings',
        icon: 'settings-2',
        iconLibrary: 'lucide',
      },
      { id: 'privacy', label: 'Privacy & Security', icon: 'shield-check', iconLibrary: 'lucide' },
      { id: 'notifications', label: 'Notifications', icon: 'bell-ring', iconLibrary: 'lucide' },
      { id: 'logout', label: 'Logout', icon: 'log-out', iconLibrary: 'lucide' },
    ],
  }
];

export const bottomNavItems: NavItem[] = [
  {
    id: 'system-title',
    label: 'System',
    type: 'title',
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: 'users',
    iconLibrary: 'lucide',
    badge: 'New',
  },

  {
    id: 'settings',
    label: 'Settings',
    badge: '1',
    icon: 'settings',
    iconLibrary: 'lucide',
  },
];
