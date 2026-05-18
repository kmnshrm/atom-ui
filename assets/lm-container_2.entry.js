import { r as registerInstance, h } from './index-DUsoYu9r.js';

const lmContainerCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}:host{display:block;width:100%;height:100%;overflow:hidden;box-sizing:border-box}.lm-container{display:flex;width:100%;height:100%;flex:1;overflow:hidden;box-sizing:border-box}.lm-container.lm-row,.lm-container.lm-horizontal{flex-direction:row}.lm-container.lm-column,.lm-container.lm-vertical{flex-direction:column}.lm-container{}.lm-container.lm-tabs{flex-direction:column}.lm-container{}.lm-container.lm-nav-layout{flex-direction:row;}.lm-container.lm-nav-layout>.lm-tabs{width:48px;flex-direction:column;border-bottom:none;border-right:1px solid var(--border-subtle, #e2e8f0)}.lm-container.lm-nav-layout>.lm-tab-content{flex:1;width:calc(100% - 48px)}.lm-child{display:flex;flex:1;min-width:0;min-height:0;overflow:hidden;position:relative;transition:flex-grow 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)}.lm-tab-content{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.lm-tab-pane{display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden}@media (max-width: 768px){.lm-container.lm-row,.lm-container.lm-horizontal,.lm-container.lm-nav-layout{flex-direction:column !important}.lm-container.lm-nav-layout>.lm-tabs{width:100% !important;flex-direction:row !important;border-right:none;border-bottom:1px solid var(--border-subtle, #e2e8f0);height:auto;overflow-x:auto}.lm-container.lm-nav-layout>.lm-tab-content{width:100% !important}:host-context(.lm-container) .lm-splitter{display:none !important}}`;

const LmContainer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    node;
    activeTabId; // For tabs container
    renderChild(child, index) {
        if (this.node.type === 'tabs') {
            // For tabs, only render active one
            if (child.id !== this.activeTabId && (index !== 0 || this.activeTabId)) { // naive default to first if no active
                if (child.id !== this.activeTabId)
                    return null;
            }
        }
        if (child.type === 'panel') {
            return h("lm-panel", { panel: child });
        }
        return h("lm-container", { node: child });
    }
    render() {
        if (!this.node) {
            return h("div", { class: "lm-container lm-empty" }, "No configuration node provided");
        }
        const cls = `lm-container lm-${this.node.type}`;
        if (this.node.type === 'tabs' || this.node.type === 'nav' || this.node.type === 'single') {
            // Single type just renders the first child directly, no tabs
            if (this.node.type === 'single') {
                const child = this.node.children[0];
                return (h("div", { class: cls, "data-id": this.node.id }, child ? this.renderChild(child, 0) : h("div", { class: "lm-empty-single" }, "Empty")));
            }
            const activeId = this.activeTabId || (this.node.children[0] ? this.node.children[0].id : null);
            const isNav = this.node.type === 'nav';
            return (h("div", { class: `${cls} ${isNav ? 'lm-nav-layout' : ''}`, "data-id": this.node.id }, h("lm-tabs", { panels: this.node.children, activeTabId: activeId, containerId: this.node.id, mode: isNav ? 'vertical' : 'horizontal' }), h("div", { class: "lm-tab-content" }, this.node.children.map((c, i) => (h("div", { class: "lm-tab-pane", style: { display: c.id === activeId ? 'block' : 'none' } }, this.renderChild(c, i)))))));
        }
        return (h("div", { class: cls, "data-id": this.node.id }, this.node.children.map((c, i) => {
            const isColumn = this.node.type === 'column' || this.node.type === 'vertical';
            const isCollapsed = c.collapsed === true;
            if (isCollapsed)
                return null;
            // Check if it's the last VISIBLE child to decide on splitter
            const isLastVisible = !this.node.children.slice(i + 1).some(next => !next.collapsed);
            return [
                h("div", { class: "lm-child", "data-id": c.id, style: {
                        flexGrow: c.size ? `${c.size}` : '1',
                        minWidth: c.minWidth ? `${c.minWidth}px` : '0',
                        minHeight: c.minHeight ? `${c.minHeight}px` : '0'
                    } }, (c.type === 'panel') ? h("lm-panel", { panel: c }) : h("lm-container", { node: c })),
                /* Render Splitter if not last visible element */
                !isLastVisible &&
                    h("lm-splitter", { containerId: this.node.id, index: i, direction: isColumn ? 'vertical' : 'horizontal' })
            ];
        })));
    }
};
LmContainer.style = lmContainerCss();

const lmFloatingWindowCss = () => ``;

const LmFloatingWindow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    panelId;
    x = 100;
    y = 100;
    render() {
        return (h("div", { key: '987212734ff21ee0d02c5ae2f0fe144e901d8206', class: "lm-float", style: { left: `${this.x}px`, top: `${this.y}px` }, "data-panel-id": this.panelId }, h("div", { key: '8b922866c1955c167c6a2e5ea5d30c3c5a6bd57c', class: "lm-float-header" }, "Floating - ", this.panelId), h("div", { key: 'a0e3f8cd66090fc879b10b7ce0d7005ea6e76381', class: "lm-float-body" }, h("slot", { key: '0362df47eeafe69e15151e443b72c62e97ca3300' }))));
    }
};
LmFloatingWindow.style = lmFloatingWindowCss();

export { LmContainer as lm_container, LmFloatingWindow as lm_floating_window };
