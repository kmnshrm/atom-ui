export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  status?: string;
  iconLibrary?: string;
  children?: NavItem[];
}

export const topNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    status: 'online',
    icon: 'house',
    iconLibrary: 'lucide',
  },
  {
    id: 'overview',
    label: 'Overview',
    icon: 'search',
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
      { id: 'layout-manager', label: 'Layout Manager', badge: 'New', icon: 'layout-panel-top', iconLibrary: 'lucide' },
      { id: 'masonry', label: 'Masonry', icon: 'layout-dashboard', iconLibrary: 'lucide' },
      { id: 'splitter', label: 'Splitter', icon: 'split-square-horizontal', iconLibrary: 'lucide' },
      { id: 'stack', label: 'Stack', icon: 'layers', iconLibrary: 'lucide' },
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
      { id: 'context-menu', label: 'Context Menu', icon: 'mouse-pointer-click', iconLibrary: 'lucide' },
      { id: 'scroll-top', label: 'Scroll Top', icon: 'arrow-up-circle', iconLibrary: 'lucide' },
      { id: 'speed-dial', label: 'Speed Dial', icon: 'zap', iconLibrary: 'lucide' },
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
      { id: 'button-toggle', label: 'Button Toggle', icon: 'toggle-left', iconLibrary: 'lucide' },
      { id: 'checkbox', label: 'Checkbox', icon: 'check-square', iconLibrary: 'lucide' },
      { id: 'dropdown', label: 'Dropdown', icon: 'chevron-down', iconLibrary: 'lucide' },
      { id: 'input', label: 'Input', icon: 'pencil', iconLibrary: 'lucide' },
      { id: 'radio', label: 'Radio', icon: 'radio', iconLibrary: 'lucide' },
      { id: 'switch', label: 'Switch', icon: 'toggle-right', iconLibrary: 'lucide' },
    ],
  },
];

export const userProfileNavItems: NavItem[] = [
  { id: 'about', label: 'About', icon: 'info', iconLibrary: 'lucide' },
  {
    id: 'user-profile',
    label: 'John Doe',
    status: 'online',
    icon: 'user',
    iconLibrary: 'lucide',
    children: [
      { id: 'my-profile', label: 'My Profile', icon: 'circle-user', iconLibrary: 'lucide' },
      { id: 'account-settings', label: 'Account Settings', icon: 'settings', iconLibrary: 'lucide' },
      { id: 'logout', label: 'Logout', icon: 'log-out', iconLibrary: 'lucide' },
    ],
  },
];

export const bottomNavItems: NavItem[] = [
  { id: 'user-management', label: 'User Management', icon: 'users', iconLibrary: 'lucide', badge: 'New' },
  { id: 'settings', label: 'Settings', badge: '1', icon: 'settings', iconLibrary: 'lucide' },
];
