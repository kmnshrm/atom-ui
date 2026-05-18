import { r as registerInstance, h, H as Host } from './index-DUsoYu9r.js';

const libraryCardCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}:host{display:block}.card{display:flex;align-items:center;gap:16px;padding:20px;background:linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8));border:1px solid rgba(255, 255, 255, 0.08);border-radius:20px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);cursor:pointer;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);backdrop-filter:blur(10px);position:relative;overflow:hidden}.card::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05));opacity:0;transition:opacity 0.3s ease;pointer-events:none}.card:hover{transform:translateY(-4px) scale(1.02);border-color:rgba(99, 102, 241, 0.5);box-shadow:0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)}.card:hover::before{opacity:1}.card:active{transform:translateY(-2px) scale(1.01)}.card-icon{font-size:2rem;width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));border-radius:14px;flex-shrink:0;transition:transform 0.3s ease}.card:hover .card-icon{transform:scale(1.1) rotate(5deg)}.card-content{flex:1;min-width:0}.card-title{margin:0 0 6px 0;font-size:1.1rem;font-weight:600;color:#f1f5f9;display:flex;align-items:center;gap:8px}.badge{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:3px 8px;background:linear-gradient(135deg, #6366f1, #a855f7);border-radius:20px;color:white;animation:pulse 2s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}.card-description{margin:0;font-size:0.85rem;color:#94a3b8;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.card-action{flex-shrink:0}.play-btn{width:44px;height:44px;border:none;border-radius:50%;background:linear-gradient(135deg, #6366f1, #8b5cf6);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;opacity:0;transform:scale(0.8)}.card:hover .play-btn{opacity:1;transform:scale(1)}.play-btn:hover{background:linear-gradient(135deg, #818cf8, #a78bfa);transform:scale(1.15);box-shadow:0 8px 20px rgba(99, 102, 241, 0.4)}.play-btn:active{transform:scale(1.05)}:host-context(.light) .card{background:linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));border-color:rgba(0, 0, 0, 0.1)}:host-context(.light) .card-title{color:#1e293b}:host-context(.light) .card-description{color:#64748b}`;

const LibraryCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Component ID (used for linking) */
    componentId;
    /** Title of the component */
    cardTitle;
    /** Short description */
    description;
    /** Icon emoji */
    icon = '📦';
    /** Optional badge text */
    badge;
    /** Optional documentation URL */
    docs;
    /** Mode: 'demo' or 'doc' */
    mode = 'demo';
    handleViewDemo = () => {
        if (this.mode === 'doc') {
            if (this.docs) {
                window.location.href = this.docs;
            }
            return;
        }
        // Check if global showSection exists (defined in dashboard.html)
        if (window.showSection) {
            window.showSection(this.componentId);
            return;
        }
        // Fallback navigation
        const targetUrl = `/index.html#${this.componentId}`;
        try {
            if (window.parent !== window) {
                window.parent.location.href = targetUrl;
            }
            else {
                window.location.href = targetUrl;
            }
        }
        catch (e) {
            window.location.href = targetUrl;
        }
    };
    handleViewDocs = (e) => {
        e.stopPropagation();
        if (this.docs) {
            window.location.href = this.docs;
        }
    };
    render() {
        return (h(Host, { key: '3a3ff13a2954f14c350206fdad4ba6340f653e4e' }, h("div", { key: 'b92cca51b6cc6af60d8476f386482ccfdd475a34', class: "card", onClick: this.handleViewDemo }, h("div", { key: '30a68d761de621658d2fc34a40ea101fbf04141e', class: "card-icon" }, this.icon), h("div", { key: '9ac9cba2c76b9568e2a5f319f0b04cb283a5e682', class: "card-content" }, h("h3", { key: '0b62e3e8b4839a79a4f567dee7ff1da61a8799cf', class: "card-title" }, this.cardTitle, this.badge && h("span", { key: '2254007ce97d9a0cc9cbcf66f8b397e48eaca256', class: "badge" }, this.badge)), h("p", { key: '4d5a519fd7d9759ae9f17783e680002e66a82106', class: "card-description" }, this.description)), h("div", { key: '71b72af77182f87ce4e09ad2f17a3f66618ffc12', class: "card-action" }, this.docs && (h("ui-button", { key: '3b9318ef02116646198e2535f97394ccf634f674', variant: "ghost", size: "md", icon: "file-text", "icon-library": "lucide", title: "View Documentation", onClick: this.handleViewDocs })), h("ui-button", { key: 'de3abccdcdd7e3504e7fc57d3525e0a41b27b731', variant: "filled", color: "primary", size: "md", icon: "play", "icon-library": "lucide", title: "View Demo" })))));
    }
};
LibraryCard.style = libraryCardCss();

export { LibraryCard as library_card };
