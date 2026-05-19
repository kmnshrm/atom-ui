// Global transfer-list mock datasets for Stencil UI Transfer List demos in demos.json

export function initTransferListGlobals() {
  if (typeof window === 'undefined') return;

  const sourceItems = [
    { key: 1, label: 'Task 1', description: 'Development task', icon: 'code' },
    { key: 2, label: 'Task 2', description: 'Design update', icon: 'pen-tool' },
    { key: 3, label: 'Meeting', description: 'Weekly sync', icon: 'calendar' },
    { key: 4, label: 'Bug Fix', description: 'Urgent', icon: 'alert-circle' },
    { key: 5, label: 'Review', description: 'Code review', icon: 'check-circle' },
    { key: 6, label: 'Deployment', description: 'Prod release', icon: 'server' },
    { key: 7, label: 'Testing', description: 'E2E tests', icon: 'test-tube' },
    { key: 8, label: 'Docs', description: 'Update readme', icon: 'file-text' },
  ];

  const treeItems = [
    { key: 'p1', label: 'Parent 1' },
    {
      key: 'p2',
      label: 'Parent 2',
      children: [
        { key: 'c1', label: 'Child 1' },
        { key: 'c2', label: 'Child 2' },
      ],
    },
    {
      key: 'p3',
      label: 'Parent 3',
      children: [
        { key: 'c3', label: 'Child 3' },
        { key: 'c4', label: 'Child 4' },
      ],
    },
  ];

  const tableColumns = [
    { title: 'Name', dataIndex: 'label' },
    { title: 'Type', dataIndex: 'description' },
  ];

  const itemsWithDisabled = [
    ...sourceItems.slice(0, 3),
    { key: 100, label: 'Disabled Item', description: 'Cannot be moved', disabled: true },
    ...sourceItems.slice(3)
  ];

  // Attach to window
  (window as any).sourceItems = sourceItems;
  (window as any).treeItems = treeItems;
  (window as any).tableColumns = tableColumns;
  (window as any).itemsWithDisabled = itemsWithDisabled;
}
