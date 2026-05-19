// Global tree mock datasets for Stencil UI Tree demos in demos.json

export function initTreeGlobals() {
  if (typeof window === 'undefined') return;

  const TREE_DATA = [
    {
      id: '1',
      label: 'Root Folder',
      expanded: true,
      children: [
        {
          id: '1-1',
          label: 'Documents',
          expanded: false,
          children: [
            { id: '1-1-1', label: 'Resume.pdf', icon: 'file-pdf', color: 'danger' },
            { id: '1-1-2', label: 'CoverLetter.doc', icon: 'file-word', color: 'primary' },
          ],
        },
        {
          id: '1-2',
          label: 'Pictures',
          children: [
            { id: '1-2-1', label: 'Vacation.jpg', icon: 'image', color: 'success' },
            { id: '1-2-2', label: 'Family.png', icon: 'image', color: 'secondary' },
          ],
        },
        { id: '1-3', label: 'Music', icon: 'music', color: 'info' },
      ],
    },
  ];

  const COMPONENT_DATA = [
    {
      id: '1',
      label: 'My Project',
      icon: 'folder',
      color: 'primary',
      expanded: true,
      children: [
        {
          id: '1-1',
          label: 'src',
          icon: 'folder',
          color: 'info',
          connectorColor: '#10b981',
          expanded: true,
          children: [
            { id: '1-1-1', label: 'index.ts', icon: 'file-code', color: 'warning' },
            { id: '1-1-2', label: 'styles.css', icon: 'file-code-o', color: 'info' },
            { id: '1-1-3', label: 'App.tsx', icon: 'code', color: 'primary' },
          ],
        },
        {
          id: '1-2',
          label: 'public',
          icon: 'folder-open',
          color: 'success',
          connectorColor: '#f59e0b',
          children: [
            { id: '1-2-1', label: 'index.html', icon: 'html5', color: 'danger' },
            { id: '1-2-2', label: 'favicon.ico', icon: 'image', color: 'secondary' },
          ],
        },
        { id: '1-3', label: 'package.json', icon: 'file-text', color: 'danger' },
        { id: '1-4', label: 'README.md', icon: 'file-text-o', color: 'secondary' },
      ],
    },
  ];

  const ELITE_DATA = [
    {
      id: 'src',
      label: 'src',
      icon: 'folder',
      expanded: true,
      actions: [
        { id: 'add', icon: 'plus', tooltip: 'New File' },
        { id: 'refresh', icon: 'rotate-cw', tooltip: 'Reload' },
      ],
      children: [
        {
          id: 'components',
          label: 'components',
          icon: 'folder',
          expanded: true,
          children: [
            {
              id: 'tree-tsx',
              label: 'tree.tsx',
              icon: 'file-code',
              color: 'primary',
              actions: [{ id: 'delete', icon: 'trash-2', color: '#ef4444' }],
            },
            { id: 'tree-scss', label: 'tree.scss', icon: 'file-type-scss', color: 'info' },
          ],
        },
        {
          id: 'utils',
          label: 'utils.ts',
          icon: 'file-code',
          loading: true,
        },
      ],
    },
    {
      id: 'package',
      label: 'package.json',
      icon: 'file-json',
      badge: 'v1.0.0',
      actions: [{ id: 'external', icon: 'external-link' }],
    },
    {
      id: 'license',
      label: 'LICENSE',
      icon: 'file-text',
      locked: true,
    },
  ];

  const MODERN_GREEN_DATA = [
    {
      id: 'root',
      label: 'Zenith Project (Ground)',
      icon: 'target',
      connectorColor: '#10b981',
      expanded: true,
      children: [
        {
          id: 'src',
          label: 'src',
          icon: 'folder',
          connectorColor: '#10b981',
          expanded: true,
          children: [
            { id: 'tree', label: 'tree.tsx', icon: 'cpu', color: 'success', badge: 'v2.1' },
            { id: 'styles', label: 'styles.scss', icon: 'droplet' },
            {
              id: 'assets',
              label: 'assets',
              icon: 'archive',
              children: [
                { id: 'logo', label: 'logo.svg', icon: 'image' },
                { id: 'bg', label: 'background.png', icon: 'image' },
              ],
            },
          ],
        },
        {
          id: 'config',
          label: 'Configuration',
          icon: 'settings',
          children: [
            { id: 'env', label: '.env', icon: 'lock' },
            { id: 'pkg', label: 'package.json', icon: 'package' },
          ],
        },
        { id: 'dist', label: 'Distribution', icon: 'send', color: 'info' },
      ],
    },
  ];

  const ORG_CHART_DATA = [
    {
      id: '1',
      label: 'Board of Directors',
      icon: 'users',
      badge: 'Top Level',
      color: 'primary',
      expanded: true,
      children: [
        {
          id: '1-1',
          label: 'Chief Executive Officer',
          icon: 'user',
          badge: 'CEO',
          color: 'info',
          expanded: true,
          children: [
            {
              id: '1-1-1',
              label: 'Chief Technology Officer',
              icon: 'cpu',
              badge: 'Tech',
              color: 'success',
              expanded: true,
              children: [
                {
                  id: '1-1-1-1',
                  label: 'VP of Engineering',
                  icon: 'users',
                  badge: 'Management',
                  color: 'warning',
                  expanded: true,
                  children: [
                    { id: '1-1-1-1-1', label: 'Engineering Manager', icon: 'shield', color: 'danger' },
                    { id: '1-1-1-1-2', label: 'Platform Architect', icon: 'code', color: 'info' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const GIT_GRAPH_DATA = [
    {
      id: 'g1',
      label: 'initial commit',
      icon: 'git-commit',
      badge: 'main',
      color: 'primary',
      expanded: true,
      children: [
        {
          id: 'g2',
          label: 'feat: add core tree logic',
          icon: 'git-commit',
          expanded: true,
          children: [
            {
              id: 'g3',
              label: 'chore: update stencil config',
              icon: 'git-commit',
              expanded: true,
              children: [
                {
                  id: 'g4',
                  label: 'feature/animation: add spring motions',
                  icon: 'git-branch',
                  badge: 'feature/anim',
                  color: 'info',
                  expanded: true,
                  children: [
                    { id: 'g5', label: 'refactor: simplify render path', icon: 'git-commit' },
                    { id: 'g6', label: 'fix: edge case in dnd', icon: 'git-commit' },
                  ],
                },
                { id: 'g7', label: 'docs: update readme', icon: 'git-commit', badge: 'v1.2.0', color: 'success' },
                { id: 'g8', label: 'fix: accessibility a11y', icon: 'git-commit', children: [{ id: 'g9', label: 'add aria-labels', icon: 'git-commit' }] },
              ],
            },
          ],
        },
      ],
    },
  ];

  function generateLargeTree(count = 120) {
    const tree = [];
    let nodeId = 1;
    const techTopics = ['Frontend', 'Backend', 'DevOps', 'Security', 'Database', 'Mobile', 'AI/ML', 'Cloud'];
    const subtopics = [
      'React',
      'Vue',
      'Angular',
      'Svelte',
      'Next.js',
      'Remix',
      'Nuxt',
      'SvelteKit',
      'Node',
      'Python',
      'Go',
      'Rust',
      'Java',
      'C#',
      'PHP',
      'Ruby',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Terraform',
      'Ansible',
      'Helm',
      'Auth',
      'OAuth',
      'JWT',
      'RBAC',
      'LDAP',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Cassandra',
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'MLflow',
      'AWS',
      'Azure',
      'GCP',
      'Cloudflare',
    ];
    let topicIdx = 0;
    while (nodeId <= count && topicIdx < techTopics.length) {
      const topic = techTopics[topicIdx++];
      const start = (topicIdx - 1) * Math.ceil(subtopics.length / techTopics.length);
      const end = Math.min(start + Math.ceil(subtopics.length / techTopics.length), subtopics.length);
      const children = subtopics.slice(start, end).map((s, i) => ({
        id: `large-${nodeId++}-${i}`,
        label: s,
        icon: 'file',
      }));
      tree.push({ id: `large-${nodeId++}`, label: topic, icon: 'folder', children });
    }
    return tree;
  }

  function generateStressTestData() {
    let total = 0;
    function createNodes(depth: number, maxDepth: number) {
      if (depth > maxDepth) return [];
      const count = depth < 3 ? 3 : depth < 6 ? 2 : 1;
      const nodes = [];
      for (let i = 0; i < count; i++) {
        total++;
        const id = `stress-${depth}-${i}-${total}`;
        nodes.push({
          id,
          label: `Level ${depth} Node ${i + 1}`,
          icon: depth < maxDepth ? 'folder' : 'file',
          expanded: depth < 3,
          children: createNodes(depth + 1, maxDepth),
        });
      }
      return nodes;
    }
    const { data } = { data: createNodes(1, 10) };
    return { data, total };
  }

  const stressData = generateStressTestData();

  // Attach to window
  (window as any).TREE_DATA = TREE_DATA;
  (window as any).COMPONENT_DATA = COMPONENT_DATA;
  (window as any).ELITE_DATA = ELITE_DATA;
  (window as any).MODERN_GREEN_DATA = MODERN_GREEN_DATA;
  (window as any).ORG_CHART_DATA = ORG_CHART_DATA;
  (window as any).GIT_GRAPH_DATA = GIT_GRAPH_DATA;
  (window as any).generateLargeTree = generateLargeTree;
  (window as any).generateStressTestData = generateStressTestData;
  (window as any).data = stressData.data;
  (window as any).largeData = generateLargeTree(150);
  (window as any).total = stressData.total;
}
