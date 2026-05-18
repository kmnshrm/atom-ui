import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-DUsoYu9r.js';

const listGroupCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}:host{display:block;--header-padding:12px 16px;--header-bg-hover:rgba(0, 0, 0, 0.04);--header-bg-selected:var(--primary-color-light, #e0f2fe);--header-color-selected:var(--primary-color, #0284c7)}.group-header{padding:var(--header-padding);font-weight:600;font-size:0.875rem;color:var(--text-muted, #6b7280);text-transform:uppercase;letter-spacing:0.05em;display:flex;align-items:center;justify-content:space-between;user-select:none;border-radius:4px;margin-bottom:4px;transition:all 0.2s ease}.group-header-collapsible{cursor:pointer}.group-header-collapsible:hover{background-color:var(--header-bg-hover)}.group-header-selectable{cursor:pointer}.group-header-selectable:hover{background-color:var(--header-bg-hover)}.group-header-selected{background-color:var(--header-bg-selected);color:var(--header-color-selected)}.group-header-selected .group-icon,.group-header-selected .collapse-icon{color:var(--header-color-selected)}.group-header-dense{padding:8px 16px;font-size:0.8125rem}.header-left{display:flex;align-items:center;gap:12px;flex:1}.collapse-btn{background:none;border:none;padding:4px;cursor:pointer;color:inherit;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:background-color 0.2s;margin-left:-8px}.collapse-btn:hover{background-color:rgba(0, 0, 0, 0.1)}.selection-checkbox{margin-right:-4px;display:flex;align-items:center;justify-content:center}.selection-checkbox .checkbox-box{width:20px;height:20px;border:2px solid var(--border-strong, #d1d5db);border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;background:var(--bg-primary, #ffffff)}.selection-checkbox .checkbox-box i{font-size:12px;color:var(--text-standard, #ffffff);transform:scale(0);transition:transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selection-checkbox.selected .checkbox-box{background:var(--primary-color, #0ea5e9);border-color:var(--primary-color, #0ea5e9)}.selection-checkbox.selected .checkbox-box i{transform:scale(1)}.selection-checkbox:hover .checkbox-box{border-color:var(--primary-color, #0ea5e9)}.group-badge{padding:2px 8px;border-radius:12px;font-size:0.75rem;font-weight:600;margin-left:8px;line-height:1.4}.group-badge.badge-default{background:var(--bg-primary, #e5e7eb);color:var(--text-secondary, #374151)}.group-badge.badge-primary{background:var(--primary-color, #0ea5e9);color:var(--text-standard, #ffffff)}.group-badge.badge-secondary{background:var(--secondary-color, #64748b);color:var(--text-standard, #ffffff)}.group-badge.badge-success{background:var(--success-color, #22c55e);color:var(--text-standard, #ffffff)}.group-badge.badge-danger{background:var(--danger-color, var(--color-danger, #ef4444));color:var(--text-standard, #ffffff)}.group-badge.badge-warning{background:var(--warning-color, var(--color-warning, #f59e0b));color:var(--text-standard, #ffffff)}.group-badge.badge-info{background:var(--info-color, var(--color-primary, #10b981));color:var(--text-standard, #ffffff)}.header-actions{display:flex;align-items:center;gap:8px}.group-footer{padding:8px 16px;border-top:1px solid var(--border-subtle, #f3f4f6);font-size:0.875rem;color:var(--text-muted, #6b7280)}.group-footer:empty{display:none}.collapse-icon{font-size:0.75rem;transition:transform 0.2s ease;color:var(--text-muted, #9ca3af)}.group-icon{font-size:1rem;color:var(--text-muted, #6b7280)}.group-label{flex:1}.group-content{display:block;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);opacity:1;max-height:1000px;overflow:visible;transform-origin:top}.group-content-collapsed{max-height:0;opacity:0;overflow:hidden;transform:scaleY(0.95)}.group-divider{height:1px;background-color:var(--bg-primary, #e5e7eb);margin:8px 0}.list-group-skeleton{padding:16px}.list-group-skeleton .skeleton-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}.list-group-skeleton .skeleton-header .skeleton-icon{width:24px;height:24px;border-radius:4px;background:var(--bg-primary, #e5e7eb);animation:pulse 1.5s infinite}.list-group-skeleton .skeleton-header .skeleton-text{height:16px;width:120px;border-radius:4px;background:var(--bg-primary, #e5e7eb);animation:pulse 1.5s infinite}.list-group-skeleton .skeleton-content{display:flex;flex-direction:column;gap:12px;padding-left:12px}.list-group-skeleton .skeleton-content .skeleton-item{height:48px;width:100%;border-radius:8px;background:var(--bg-secondary, #f3f4f6);animation:pulse 1.5s infinite}.list-group-skeleton .skeleton-content .skeleton-item:nth-child(2){animation-delay:0.1s}.list-group-skeleton .skeleton-content .skeleton-item:nth-child(3){animation-delay:0.2s}@keyframes pulse{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}`;

const AppListGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.groupClick = createEvent(this, "groupClick");
        this.groupToggle = createEvent(this, "groupToggle");
    }
    get el() { return getElement(this); }
    label = '';
    collapsible = false;
    expanded = true;
    icon = '';
    divider = true;
    dense = false;
    // New Premium Features
    selectable = false;
    selected = false;
    badge = '';
    badgeColor = 'default';
    level = 0;
    skeleton = false;
    groupClick;
    groupToggle;
    toggleExpanded = (e) => {
        e.stopPropagation();
        if (this.collapsible) {
            this.expanded = !this.expanded;
            this.groupToggle.emit({ expanded: this.expanded });
        }
    };
    handleHeaderClick = (e) => {
        if (this.selectable) {
            this.selected = !this.selected;
        }
        this.groupClick.emit({ selected: this.selected, expanded: this.expanded });
        if (this.collapsible && !this.selectable) {
            this.toggleExpanded(e);
        }
    };
    renderSkeleton() {
        return (h("div", { class: "list-group-skeleton" }, h("div", { class: "skeleton-header" }, h("div", { class: "skeleton-icon" }), h("div", { class: "skeleton-text" })), h("div", { class: "skeleton-content" }, h("div", { class: "skeleton-item" }), h("div", { class: "skeleton-item" }), h("div", { class: "skeleton-item" }))));
    }
    render() {
        if (this.skeleton) {
            return h(Host, null, this.renderSkeleton());
        }
        const headerClasses = {
            'group-header': true,
            'group-header-collapsible': this.collapsible,
            'group-header-dense': this.dense,
            'group-header-selected': this.selected,
            'group-header-selectable': this.selectable
        };
        const contentClasses = {
            'group-content': true,
            'group-content-collapsed': !this.expanded,
        };
        const paddingLeft = this.level * 24;
        return (h(Host, { style: { '--group-level': this.level.toString() } }, this.label && (h("div", { class: headerClasses, onClick: this.handleHeaderClick, style: { paddingLeft: `${paddingLeft + 12}px` } }, h("div", { class: "header-left" }, this.collapsible && (h("ui-button", { variant: "ghost", onClick: this.toggleExpanded, ariaLabel: this.expanded ? "Collapse group" : "Expand group", icon: this.expanded ? 'chevron-down' : 'chevron-right', iconLibrary: "fontawesome", iconOnly: true, size: "sm" })), this.selectable && (h("div", { class: {
                'selection-checkbox': true,
                'selected': this.selected
            } }, h("div", { class: "checkbox-box" }, this.selected && h("ui-icon", { name: "check", library: "fontawesome" })))), this.icon && (h("ui-icon", { class: "group-icon", name: this.icon.replace(/^fa[sb]? fa-/, ''), library: "fontawesome" })), h("span", { class: "group-label" }, this.label), this.badge && (h("span", { class: `group-badge badge-${this.badgeColor}` }, this.badge))), h("div", { class: "header-actions" }, h("slot", { name: "header-actions" })))), h("div", { class: contentClasses, role: "region", "aria-expanded": this.expanded.toString() }, h("slot", null)), h("div", { class: "group-footer" }, h("slot", { name: "footer" })), this.divider && h("div", { class: "group-divider" })));
    }
};
AppListGroup.style = listGroupCss();

const listItemCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.list-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:all 0.2s ease;user-select:none;outline:none;position:relative;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;width:100%;max-width:100%;box-sizing:border-box}.list-item:focus{outline:2px solid rgba(var(--color-primary-rgb, 59, 130, 246), 0.5);outline-offset:-2px}.collapse-icon{font-size:0.75rem;transition:transform 0.2s ease;color:var(--text-muted, #6b7280)}.list-item-icon{font-size:1.25rem;flex-shrink:0;transition:color 0.2s ease}.list-item-avatar{width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;background:var(--bg-secondary, #f1f5f9)}.list-item-avatar img{width:100%;height:100%;object-fit:cover}.list-item-image{width:48px;height:48px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--bg-secondary, #f1f5f9)}.list-item-image img{width:100%;height:100%;object-fit:cover}.list-item-sm .list-item-avatar{width:32px;height:32px}.list-item-sm .list-item-image{width:36px;height:36px}.list-item-lg .list-item-avatar{width:48px;height:48px}.list-item-lg .list-item-image{width:64px;height:64px}.skeleton-pulse{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);animation:list-skeleton-shimmer 1.5s infinite;pointer-events:none;z-index:10}.skeleton-text{height:0.8em;background:var(--bg-primary, #e2e8f0);border-radius:4px;width:80%;display:inline-block}.skeleton-text.list-item-sublabel{width:60%;margin-top:4px}.skeleton-circle{background:var(--bg-primary, #e2e8f0);border-radius:50%}.skeleton-rect{background:var(--bg-primary, #e2e8f0);border-radius:8px}@keyframes list-skeleton-shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}.is-skeleton{pointer-events:none;background:transparent !important;border-color:var(--border-subtle, #f1f5f9) !important;transform:none !important}.list-item-highlight{background:var(--bg-primary, #dcfce7);color:var(--color-success, #166534);padding:0 2px;border-radius:2px;font-weight:700}.list-item-content{flex:1;display:flex;flex-direction:column;gap:6px;min-width:0;overflow:hidden}.list-item-label-wrapper{display:flex;align-items:center;gap:8px;min-width:0;overflow:hidden}.list-item-label{font-size:1rem;color:var(--text-secondary, #374151);transition:color 0.2s ease;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-item-sublabel{font-size:0.875rem;color:var(--text-muted, #6b7280);line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.list-item-multiline .list-item-content{padding:4px 0}.list-item-multiline .list-item-label{white-space:normal;line-height:1.5;word-wrap:break-word;word-break:break-word}.list-item-multiline .list-item-sublabel{white-space:normal;line-height:1.5;word-wrap:break-word;word-break:break-word}.list-item-action-icon{font-size:1.125rem;flex-shrink:0;padding:4px;border-radius:4px;transition:all 0.2s ease}.list-item-action-icon:hover{background:rgba(0, 0, 0, 0.05)}.list-item-action-icon:active{transform:scale(0.95)}.list-item-sm{padding:8px 12px;gap:8px}.list-item-sm .list-item-icon{font-size:1rem}.list-item-sm .list-item-label{font-size:0.875rem}.list-item-sm .list-item-action-icon{font-size:1rem}.list-item-md{padding:12px 16px;gap:12px}.list-item-lg{padding:16px 20px;gap:14px}.list-item-lg .list-item-icon{font-size:1.5rem}.list-item-lg .list-item-label{font-size:1.125rem}.list-item-lg .list-item-action-icon{font-size:1.25rem}.list-item-dense{padding:6px 12px;gap:8px}.list-item-dense .list-item-label{font-size:0.875rem}.list-item-text{background:transparent}.list-item-text:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(0, 0, 0, 0.04)}.list-item-filled{background:var(--bg-primary, #ffffff);border:1px solid var(--border-default, #e5e7eb);margin-bottom:2px;border-radius:6px}.list-item-filled:hover:not(.list-item-disabled):not(.list-item-readonly){background:var(--bg-primary, #f9fafb);border-color:var(--border-strong, #d1d5db)}.list-item-filled.list-item-primary{background:rgba(var(--color-success-rgb, 61, 205, 88), 0.05);border-color:rgba(var(--color-success-rgb, 61, 205, 88), 0.2)}.list-item-filled.list-item-primary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-success-rgb, 61, 205, 88), 0.1)}.list-item-filled.list-item-secondary{background:rgba(107, 114, 128, 0.05);border-color:rgba(107, 114, 128, 0.2)}.list-item-filled.list-item-secondary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(107, 114, 128, 0.1)}.list-item-filled.list-item-success{background:rgba(22, 163, 74, 0.05);border-color:rgba(22, 163, 74, 0.2)}.list-item-filled.list-item-success:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(22, 163, 74, 0.1)}.list-item-filled.list-item-danger{background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.05);border-color:rgba(var(--color-danger-rgb, 220, 38, 38), 0.2)}.list-item-filled.list-item-danger:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.1)}.list-item-filled.list-item-warning{background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.05);border-color:rgba(var(--color-warning-rgb, 245, 158, 11), 0.2)}.list-item-filled.list-item-warning:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.1)}.list-item-filled.list-item-info{background:rgba(8, 145, 178, 0.05);border-color:rgba(8, 145, 178, 0.2)}.list-item-filled.list-item-info:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(8, 145, 178, 0.1)}.list-item-outlined{background:transparent;border:1px solid var(--border-default, #e5e7eb);margin-bottom:2px;border-radius:6px}.list-item-outlined:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(0, 0, 0, 0.02);border-color:var(--border-strong, #d1d5db)}.list-item-outlined.list-item-primary{border-color:rgba(var(--color-success-rgb, 61, 205, 88), 0.3)}.list-item-outlined.list-item-primary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-success-rgb, 61, 205, 88), 0.05);border-color:rgba(var(--color-success-rgb, 61, 205, 88), 0.5)}.list-item-outlined.list-item-secondary{border-color:rgba(107, 114, 128, 0.3)}.list-item-outlined.list-item-secondary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(107, 114, 128, 0.05);border-color:rgba(107, 114, 128, 0.5)}.list-item-outlined.list-item-success{border-color:rgba(22, 163, 74, 0.3)}.list-item-outlined.list-item-success:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(22, 163, 74, 0.05);border-color:rgba(22, 163, 74, 0.5)}.list-item-outlined.list-item-danger{border-color:rgba(var(--color-danger-rgb, 220, 38, 38), 0.3)}.list-item-outlined.list-item-danger:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.05);border-color:rgba(var(--color-danger-rgb, 220, 38, 38), 0.5)}.list-item-outlined.list-item-warning{border-color:rgba(var(--color-warning-rgb, 245, 158, 11), 0.3)}.list-item-outlined.list-item-warning:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.05);border-color:rgba(var(--color-warning-rgb, 245, 158, 11), 0.5)}.list-item-outlined.list-item-info{border-color:rgba(8, 145, 178, 0.3)}.list-item-outlined.list-item-info:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(8, 145, 178, 0.05);border-color:rgba(8, 145, 178, 0.5)}.list-item-soft{background:rgba(0, 0, 0, 0.02);border-radius:6px;margin-bottom:2px}.list-item-soft:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(0, 0, 0, 0.05)}.list-item-soft.list-item-primary{background:rgba(var(--color-success-rgb, 61, 205, 88), 0.08)}.list-item-soft.list-item-primary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-success-rgb, 61, 205, 88), 0.12)}.list-item-soft.list-item-secondary{background:rgba(107, 114, 128, 0.08)}.list-item-soft.list-item-secondary:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(107, 114, 128, 0.12)}.list-item-soft.list-item-success{background:rgba(22, 163, 74, 0.08)}.list-item-soft.list-item-success:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(22, 163, 74, 0.12)}.list-item-soft.list-item-danger{background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.08)}.list-item-soft.list-item-danger:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.12)}.list-item-soft.list-item-warning{background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.08)}.list-item-soft.list-item-warning:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.12)}.list-item-soft.list-item-info{background:rgba(8, 145, 178, 0.08)}.list-item-soft.list-item-info:hover:not(.list-item-disabled):not(.list-item-readonly){background:rgba(8, 145, 178, 0.12)}.list-item-default .list-item-icon{color:var(--text-muted, #6b7280)}.list-item-primary .list-item-icon{color:var(--color-success, #3dcd58)}.list-item-secondary .list-item-icon{color:var(--text-muted, #6b7280)}.list-item-success .list-item-icon{color:var(--color-success, #16a34a)}.list-item-danger .list-item-icon{color:var(--color-danger-hover, #dc2626)}.list-item-warning .list-item-icon{color:var(--color-warning, #f59e0b)}.list-item-info .list-item-icon{color:var(--color-info-hover, #0891b2)}.list-item-text.list-item-selected.list-item-primary{background:rgba(var(--color-success-rgb, 61, 205, 88), 0.08)}.list-item-text.list-item-selected.list-item-primary .list-item-icon,.list-item-text.list-item-selected.list-item-primary .list-item-label{color:var(--color-success, #3dcd58);font-weight:600}.list-item-text.list-item-selected.list-item-secondary{background:rgba(107, 114, 128, 0.08)}.list-item-text.list-item-selected.list-item-secondary .list-item-icon,.list-item-text.list-item-selected.list-item-secondary .list-item-label{color:var(--text-secondary, #4b5563);font-weight:600}.list-item-text.list-item-selected.list-item-success{background:rgba(22, 163, 74, 0.08)}.list-item-text.list-item-selected.list-item-success .list-item-icon,.list-item-text.list-item-selected.list-item-success .list-item-label{color:var(--color-success, #16a34a);font-weight:600}.list-item-text.list-item-selected.list-item-danger{background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.08)}.list-item-text.list-item-selected.list-item-danger .list-item-icon,.list-item-text.list-item-selected.list-item-danger .list-item-label{color:var(--color-danger-hover, #dc2626);font-weight:600}.list-item-text.list-item-selected.list-item-warning{background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.08)}.list-item-text.list-item-selected.list-item-warning .list-item-icon,.list-item-text.list-item-selected.list-item-warning .list-item-label{color:var(--color-warning-hover, #d97706);font-weight:600}.list-item-text.list-item-selected.list-item-info{background:rgba(8, 145, 178, 0.08)}.list-item-text.list-item-selected.list-item-info .list-item-icon,.list-item-text.list-item-selected.list-item-info .list-item-label{color:var(--color-info-hover, #0891b2);font-weight:600}.list-item-text.list-item-selected.list-item-default{background:rgba(0, 0, 0, 0.05)}.list-item-text.list-item-selected.list-item-default .list-item-label{font-weight:600}.list-item-filled.list-item-selected.list-item-primary{background:var(--bg-primary, #d1fae5);border-color:var(--color-success, #3dcd58)}.list-item-filled.list-item-selected.list-item-primary .list-item-icon,.list-item-filled.list-item-selected.list-item-primary .list-item-label{color:var(--color-success, #009B4E);font-weight:600}.list-item-filled.list-item-selected.list-item-success{background:var(--bg-primary, #dcfce7);border-color:var(--color-success, #16a34a)}.list-item-filled.list-item-selected.list-item-success .list-item-icon,.list-item-filled.list-item-selected.list-item-success .list-item-label{color:var(--color-success, #166534);font-weight:600}.list-item-filled.list-item-selected.list-item-danger{background:var(--bg-primary, #fee2e2);border-color:var(--color-danger-hover, #dc2626)}.list-item-filled.list-item-selected.list-item-danger .list-item-icon,.list-item-filled.list-item-selected.list-item-danger .list-item-label{color:var(--color-danger, #991b1b);font-weight:600}.list-item-outlined.list-item-selected.list-item-primary{border-color:var(--color-success, #3dcd58);border-width:2px}.list-item-outlined.list-item-selected.list-item-primary .list-item-icon,.list-item-outlined.list-item-selected.list-item-primary .list-item-label{color:var(--color-success, #3dcd58);font-weight:600}.list-item-outlined.list-item-selected.list-item-success{border-color:var(--color-success, #16a34a);border-width:2px}.list-item-outlined.list-item-selected.list-item-success .list-item-icon,.list-item-outlined.list-item-selected.list-item-success .list-item-label{color:var(--color-success, #16a34a);font-weight:600}.list-item-soft.list-item-selected.list-item-primary{background:rgba(var(--color-success-rgb, 61, 205, 88), 0.12)}.list-item-soft.list-item-selected.list-item-primary .list-item-icon,.list-item-soft.list-item-selected.list-item-primary .list-item-label{color:var(--color-success, #009B4E);font-weight:600}.list-item-selected{border-radius:8px}.list-item-soft.list-item-selected.list-item-success{background:rgba(22, 163, 74, 0.12);border-radius:8px}.list-item-soft.list-item-selected.list-item-success .list-item-icon,.list-item-soft.list-item-selected.list-item-success .list-item-label{color:var(--color-success, #15803d);font-weight:600}.list-item-disabled{opacity:0.5;cursor:not-allowed;pointer-events:none}.list-item-readonly{cursor:default}.list-item-divider::after{content:"";position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--bg-primary, #e5e7eb)}.list-item-link .list-item-label{text-decoration:none}.list-item-link:hover .list-item-label{text-decoration:underline}.list-item-interactive{cursor:pointer}.list-item:not(.list-item-interactive){cursor:default}.list-item-children{display:flex;flex-direction:column;animation:slideDown 0.2s ease}@keyframes slideDown{from{opacity:0;max-height:0}to{opacity:1;max-height:500px}}.list-item-focused{box-shadow:0 0 0 2px rgba(var(--color-primary-rgb, 59, 130, 246), 0.3)}.list-item-hovered:not(.list-item-disabled):not(.list-item-readonly){transform:translateX(2px);border-radius:8px}.list-item-context-menu{position:relative}.list-item-context-menu .list-item-context-icon{font-size:0.875rem;color:var(--text-muted, #9ca3af);margin-left:auto;transition:transform 0.2s ease}.list-item-context-menu.list-item-context-menu-open .list-item-context-icon{transform:rotate(90deg)}.list-item-context-menu:hover .list-item-context-icon{color:var(--text-muted, #6b7280)}.context-menu{min-width:200px;background:var(--bg-primary, #ffffff);border-radius:8px;box-shadow:0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);padding:8px 0;animation:contextMenuFadeIn 0.15s ease-out;overflow:hidden;max-height:400px;overflow-y:auto}.context-menu ::slotted(ui-list-item){margin:0;border-radius:0}.context-menu::-webkit-scrollbar{width:6px}.context-menu::-webkit-scrollbar-track{background:transparent}.context-menu::-webkit-scrollbar-thumb{background:var(--bg-secondary, #d1d5db);border-radius:3px}.context-menu::-webkit-scrollbar-thumb:hover{background:var(--color-primary, #9ca3af)}@keyframes contextMenuFadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}.context-menu-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;z-index:9998;background:transparent}.list-item-checkbox{display:flex;align-items:center;cursor:pointer;margin-right:4px}.list-item-checkbox input[type=checkbox]{position:absolute;opacity:0;width:0;height:0}.list-item-checkbox .checkbox-icon{font-size:1.25rem;color:var(--text-muted, #9ca3af);transition:all 0.2s ease}.list-item-checkbox:hover .checkbox-icon{color:var(--text-muted, #6b7280)}.list-item-checked .checkbox-icon{color:var(--color-success, #3dcd58) !important}.list-item-disabled .list-item-checkbox,.list-item-readonly .list-item-checkbox{cursor:not-allowed;opacity:0.5}.list-item-badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:12px;font-size:0.75rem;font-weight:600;line-height:1;white-space:nowrap}.list-item-badge.badge-default{background:var(--bg-secondary, #f3f4f6);color:var(--text-secondary, #374151)}.list-item-badge.badge-primary{background:var(--bg-primary, #d1fae5);color:var(--color-success, #009B4E)}.list-item-badge.badge-secondary{background:var(--bg-secondary, #f3f4f6);color:var(--text-secondary, #4b5563)}.list-item-badge.badge-success{background:var(--bg-primary, #d1fae5);color:var(--color-primary, #065f46)}.list-item-badge.badge-danger{background:var(--bg-primary, #fee2e2);color:var(--color-danger, #991b1b)}.list-item-badge.badge-warning{background:var(--bg-primary, #fef3c7);color:var(--color-danger, #92400e)}.list-item-badge.badge-info{background:var(--bg-primary, #e0f2fe);color:var(--color-primary, #075985)}.list-item-counter{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 6px;border-radius:10px;background:var(--color-success, #3dcd58);color:var(--text-standard, #ffffff);font-size:0.75rem;font-weight:600;line-height:1;margin-left:auto;flex-shrink:0}.list-item-right{display:flex;align-items:center;flex-direction:column;gap:6px;margin-left:auto;flex-shrink:0;max-width:50%;overflow:hidden}.list-item-pills{display:flex;flex-wrap:wrap;gap:6px;align-items:center;max-width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}.list-item-pills::-webkit-scrollbar{height:4px}.list-item-pills::-webkit-scrollbar-thumb{background:var(--bg-secondary, #d1d5db);border-radius:2px}.pill{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:16px;font-size:0.75rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;white-space:nowrap;flex-shrink:0}.pill i{font-size:0.75rem}.pill:hover{transform:translateY(-1px);box-shadow:0 2px 4px rgba(0, 0, 0, 0.1)}.pill:active{transform:translateY(0)}.pill.pill-default{background:var(--bg-secondary, #f3f4f6);color:var(--text-secondary, #374151)}.pill.pill-default:hover{background:var(--bg-primary, #e5e7eb)}.pill.pill-primary{background:var(--bg-primary, #d1fae5);color:var(--color-success, #009B4E)}.pill.pill-primary:hover{background:var(--color-success, #a7f3d0)}.pill.pill-secondary{background:var(--bg-secondary, #f3f4f6);color:var(--text-secondary, #4b5563)}.pill.pill-secondary:hover{background:var(--bg-primary, #e5e7eb)}.pill.pill-success{background:var(--bg-primary, #d1fae5);color:var(--color-primary, #065f46)}.pill.pill-success:hover{background:var(--color-success, #a7f3d0)}.pill.pill-danger{background:var(--bg-primary, #fee2e2);color:var(--color-danger, #991b1b)}.pill.pill-danger:hover{background:var(--color-danger, #fecaca)}.pill.pill-warning{background:var(--bg-primary, #fef3c7);color:var(--color-danger, #92400e)}.pill.pill-warning:hover{background:var(--color-primary, #fde68a)}.pill.pill-info{background:var(--bg-primary, #e0f2fe);color:var(--color-primary, #075985)}.pill.pill-info:hover{background:var(--color-primary, #bae6fd)}.list-item-tags{display:flex;flex-wrap:wrap;gap:6px;align-items:center;max-width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}.list-item-tags::-webkit-scrollbar{height:4px}.list-item-tags::-webkit-scrollbar-thumb{background:var(--bg-secondary, #d1d5db);border-radius:2px}.tag{display:inline-flex;align-items:center;padding:2px 8px;background:var(--bg-secondary, #f3f4f6);color:var(--text-muted, #6b7280);border-radius:4px;font-size:0.75rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;white-space:nowrap;flex-shrink:0}.tag:hover{background:var(--bg-primary, #e5e7eb);color:var(--text-secondary, #374151)}.tag:active{transform:scale(0.95)}.list-item-sm .list-item-checkbox .checkbox-icon{font-size:1rem}.list-item-sm .list-item-badge{font-size:0.625rem;padding:1px 6px}.list-item-sm .list-item-counter{min-width:16px;height:16px;font-size:0.625rem}.list-item-sm .pill{padding:2px 8px;font-size:0.625rem}.list-item-sm .tag{padding:1px 6px;font-size:0.625rem}.list-item-sm .list-item-sublabel{font-size:0.75rem}.list-item-lg .list-item-checkbox .checkbox-icon{font-size:1.5rem}.list-item-lg .list-item-badge{font-size:0.875rem;padding:3px 10px}.list-item-lg .list-item-counter{min-width:24px;height:24px;font-size:0.875rem}.list-item-lg .pill{padding:6px 12px;font-size:0.875rem}.list-item-lg .tag{padding:3px 10px;font-size:0.875rem}.list-item-lg .list-item-sublabel{font-size:1rem}.list-item-left-media{display:flex;align-items:center;gap:inherit;flex-shrink:0}.list-item-right-media{display:flex;align-items:center;gap:inherit;flex-shrink:0;margin-left:12px}.list-item-avatar-right .list-item-counter,.list-item-avatar-right .list-item-action-icon,.list-item-avatar-right .list-item-context-icon{margin-left:8px}.list-item-avatar-right .list-item-right-media{margin-left:auto}.list-item.list-item-selection-primary.list-item-selected{background:rgba(var(--color-success-rgb, 61, 205, 88), 0.12) !important;border-color:var(--color-success, #3dcd58) !important}.list-item.list-item-selection-primary.list-item-selected .list-item-label{color:var(--color-success, #009B4E) !important}.list-item.list-item-selection-primary.list-item-selected .list-item-icon{color:var(--color-success, #009B4E) !important}.list-item.list-item-selection-secondary.list-item-selected{background:rgba(107, 114, 128, 0.12) !important;border-color:var(--color-primary, #6b7280) !important}.list-item.list-item-selection-secondary.list-item-selected .list-item-label{color:var(--color-primary, #4b5563) !important}.list-item.list-item-selection-secondary.list-item-selected .list-item-icon{color:var(--color-primary, #4b5563) !important}.list-item.list-item-selection-success.list-item-selected{background:rgba(22, 163, 74, 0.12) !important;border-color:var(--color-success, #16a34a) !important}.list-item.list-item-selection-success.list-item-selected .list-item-label{color:var(--color-success, #15803d) !important}.list-item.list-item-selection-success.list-item-selected .list-item-icon{color:var(--color-success, #15803d) !important}.list-item.list-item-selection-danger.list-item-selected{background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.12) !important;border-color:var(--color-danger-hover, #dc2626) !important}.list-item.list-item-selection-danger.list-item-selected .list-item-label{color:var(--color-danger, #991b1b) !important}.list-item.list-item-selection-danger.list-item-selected .list-item-icon{color:var(--color-danger, #991b1b) !important}.list-item.list-item-selection-warning.list-item-selected{background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.12) !important;border-color:var(--color-warning, #f59e0b) !important}.list-item.list-item-selection-warning.list-item-selected .list-item-label{color:var(--color-danger, #92400e) !important}.list-item.list-item-selection-warning.list-item-selected .list-item-icon{color:var(--color-danger, #92400e) !important}.list-item.list-item-selection-info.list-item-selected{background:rgba(8, 145, 178, 0.12) !important;border-color:var(--color-info-hover, #0891b2) !important}.list-item.list-item-selection-info.list-item-selected .list-item-label{color:var(--color-primary, #075985) !important}.list-item.list-item-selection-info.list-item-selected .list-item-icon{color:var(--color-primary, #075985) !important}.list-item.list-item-hover-primary:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(var(--color-success-rgb, 61, 205, 88), 0.05) !important}.list-item.list-item-hover-secondary:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(107, 114, 128, 0.05) !important}.list-item.list-item-hover-success:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(22, 163, 74, 0.05) !important}.list-item.list-item-hover-danger:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(var(--color-danger-rgb, 220, 38, 38), 0.05) !important}.list-item.list-item-hover-warning:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(var(--color-warning-rgb, 245, 158, 11), 0.05) !important}.list-item.list-item-hover-info:hover:not(.list-item-selected):not(.list-item-disabled){background:rgba(8, 145, 178, 0.05) !important}.list-item-lock-icon{font-size:0.875rem;color:var(--text-muted, #9ca3af);margin-left:12px;flex-shrink:0}.list-item-menu-icon{font-size:1rem;color:var(--text-muted, #6b7280);margin-left:8px;padding:6px;border-radius:6px;transition:all 0.2s ease;flex-shrink:0;cursor:pointer}.list-item-menu-icon:hover{background:rgba(0, 0, 0, 0.08);color:var(--text-primary, #1f2937)}.list-item-menu-icon:active{transform:scale(0.9)}.list-item-locked{cursor:default !important}.list-item-locked .list-item-label{color:var(--text-muted, #9ca3af) !important}.list-item-locked .list-item-icon{opacity:0.5}.list-item-locked:hover{transform:none !important;background:transparent !important}.swipe-actions-container{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;pointer-events:none;z-index:-1;overflow:hidden;border-radius:inherit}.swipe-action{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--text-standard, #ffffff);transition:opacity 0.2s ease}.swipe-action ui-icon{font-size:1.5rem}.swipe-action.left{justify-content:flex-start;padding-left:24px;background-color:var(--color-success, #10b981)}.swipe-action.right{justify-content:flex-end;padding-right:24px;background-color:var(--color-danger, #ef4444)}.bg-success{background-color:var(--color-success, #10b981)}.bg-danger{background-color:var(--color-danger, #ef4444)}.bg-warning{background-color:var(--color-warning, #f59e0b)}.bg-info{background-color:var(--color-primary, #10b981)}.bg-primary{background-color:var(--color-success, #3dcd58)}.list-item[style*=transform]{transition:transform 0.1s ease-out}.list-item-grid{flex-direction:column !important;align-items:center !important;text-align:center;padding:24px 16px !important;border:1px solid var(--border-subtle, #f1f5f9);border-radius:16px !important;background:var(--bg-primary, #ffffff);transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.05)}.list-item-grid:hover{transform:translateY(-4px) !important;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1);border-color:var(--color-primary, #10b981)}.list-item-grid .list-item-avatar,.list-item-grid .list-item-image{width:64px !important;height:64px !important;margin-bottom:16px}.list-item-grid .list-item-content{align-items:center;width:100%}.list-item-grid .list-item-label{font-size:1.125rem;font-weight:700}.list-item-grid .list-item-collaborators{margin-top:12px}.list-item-tree-lines{position:relative}.list-item-tree-lines::before{content:"";position:absolute;left:26px;top:-12px;bottom:50%;width:2px;background:var(--color-primary, #cbd5e1)}.list-item-tree-lines::after{content:"";position:absolute;left:26px;top:50%;width:16px;height:2px;background:var(--color-primary, #cbd5e1);border-radius:0 2px 2px 0}.list-item-collaborators{display:flex;align-items:center;margin-top:4px}.list-item.focused-item{outline:2px solid var(--color-primary, #10b981);outline-offset:-2px;background:var(--bg-primary, #eff6ff)}.list-item-avatar-container{position:relative;display:inline-flex}.list-item-status{position:absolute;width:12px;height:12px;border-radius:50%;border:2px solid var(--bg-primary, #ffffff);z-index:2}.list-item-status.pos-bottom-right{bottom:0;right:0}.list-item-status.pos-top-right{top:0;right:0}.list-item-status.status-online{background:var(--color-success, #10b981)}.list-item-status.status-busy{background:var(--color-danger, #ef4444)}.list-item-status.status-away{background:var(--color-warning, #f59e0b)}.list-item-status.status-offline{background:var(--color-primary, #94a3b8)}.list-item-status.status-online::after{content:"";position:absolute;width:100%;height:100%;background:inherit;border-radius:50%;animation:pulseStatus 2s infinite;opacity:0.6;left:0;top:0}@keyframes pulseStatus{0%{transform:scale(1);opacity:0.6}100%{transform:scale(3);opacity:0}}.list-item-progress-container{display:flex;align-items:center;gap:8px;margin-top:6px;width:100%}.list-item-progress-container .list-item-progress-bar{height:4px;background:var(--color-primary, #10b981);border-radius:2px;transition:width 0.3s ease}.list-item-progress-container .list-item-progress-text{font-size:10px;font-weight:700;color:var(--text-muted, #64748b)}.list-item-star-icon{font-size:0.875rem;color:var(--color-primary, #cbd5e1);margin-right:8px;cursor:pointer;transition:all 0.2s}.list-item-star-icon:hover{color:var(--color-primary, #94a3b8);transform:scale(1.1)}.list-item-star-icon.is-starred{color:var(--color-warning, #f59e0b) !important}.list-item-expandable-section{width:100%;background:var(--bg-primary, #f8fafc);overflow:hidden;border-top:1px solid var(--border-subtle, #f1f5f9);animation:expandDetail 0.4s cubic-bezier(0.4, 0, 0.2, 1)}.list-item-expandable-section .expandable-detail-content{padding:16px 24px 16px 56px}@keyframes expandDetail{from{max-height:0;opacity:0}to{max-height:500px;opacity:1}}.list-item-media-avatar-group{display:flex;align-items:center;justify-content:center;width:48px;height:48px;flex-shrink:0}.list-item-right-collaborators{display:flex;align-items:center;margin-left:auto;margin-right:12px}.is-wobbling{animation:wobbleNo 0.4s ease-in-out}@keyframes wobbleNo{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-4px)}40%,80%{transform:translateX(4px)}}.list-item-pulse{position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:0 0 0 0 rgba(var(--color-danger-rgb, 239, 68, 68), 0);animation:etherealPulse 2s infinite;z-index:1}@keyframes etherealPulse{0%{box-shadow:0 0 0 0 rgba(var(--color-danger-rgb, 239, 68, 68), 0.4)}70%{box-shadow:0 0 0 12px rgba(var(--color-danger-rgb, 239, 68, 68), 0)}100%{box-shadow:0 0 0 0 rgba(var(--color-danger-rgb, 239, 68, 68), 0)}}.presence-halo{position:absolute;top:6px;right:6px;width:10px;height:10px;border-radius:50%;border:2px solid var(--bg-primary, #ffffff);box-shadow:0 0 0 2px rgba(0, 0, 0, 0.1)}.presence-halo.presence-blue{background:var(--color-primary, #10b981)}.presence-halo.presence-purple{background:var(--color-primary, #a855f7)}.list-item-density-compact{padding-top:4px !important;padding-bottom:4px !important;min-height:40px}.list-item-density-compact .list-item-sublabel,.list-item-density-compact .list-item-tags,.list-item-density-compact .list-item-progress-container{display:none}.list-item-density-compact .list-item-avatar-container,.list-item-density-compact ui-avatar{transform:scale(0.8)}.list-item-density-cozy{padding-top:20px !important;padding-bottom:20px !important}.list-item-density-cozy .list-item-label{font-size:1.1rem;font-weight:700;color:var(--text-primary, #0f172a)}.list-item-density-cozy .list-item-avatar-container,.list-item-density-cozy ui-avatar{transform:scale(1.15)}`;

const AppListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.listItemClick = createEvent(this, "listItemClick");
        this.listItemActionClick = createEvent(this, "listItemActionClick");
        this.listItemToggle = createEvent(this, "listItemToggle");
        this.contextMenuOpenEvent = createEvent(this, "contextMenuOpenEvent");
        this.contextMenuCloseEvent = createEvent(this, "contextMenuCloseEvent");
        this.checkboxChange = createEvent(this, "checkboxChange");
        this.pillClick = createEvent(this, "pillClick");
        this.tagClick = createEvent(this, "tagClick");
        this.swipeAction = createEvent(this, "swipeAction");
        this.longPress = createEvent(this, "longPress");
        this.starToggle = createEvent(this, "starToggle");
        this.detailToggle = createEvent(this, "detailToggle");
    }
    get el() { return getElement(this); }
    selected = false;
    disabled = false;
    readonly = false;
    label = '';
    value = '';
    icon = '';
    actionIcon = '';
    size = 'md';
    color = 'default';
    variant = 'text';
    nested = false;
    level = 0;
    collapsible = false;
    expanded = false;
    divider = false;
    dense = false;
    interactive = true;
    href = '';
    target = '_self';
    contextMenu = false;
    contextMenuTrigger = 'click';
    contextMenuPosition = 'auto';
    // New features
    showCheckbox = false;
    checked = false;
    sublabel = '';
    multiline = false;
    badge = '';
    badgeColor = 'default';
    counter = '';
    /** JSON string or array of tag objects */
    tags = '';
    /** Image URL for a square/landscape thumbnail */
    image = '';
    /** User avatar URL */
    userAvatar = '';
    /** Whether to show as a loading skeleton */
    skeleton = false;
    /** Text to highlight (for search results) */
    highlight = '';
    /** Custom selection color (primary, success, etc.) */
    selectionColor = 'default';
    /** Custom hover color (primary, success, etc.) */
    hoverColor = 'default';
    /** Position of the avatar/image (left or right) */
    avatarPosition = 'left';
    /** Whether to show a 3-dot action menu icon */
    showMenu = false;
    rightActionColor = 'danger';
    /** Multiple collaborators to show as an avatar group */
    avatarGroup = '';
    /** Position of the avatar group: 'media' (leading), 'content' (below label), 'right' (after content) */
    avatarGroupPosition = 'content';
    /** Whether to show hierarchical connection lines (tree view) */
    treeLines = false;
    /** Whether the parent is in grid mode */
    gridMode = false;
    /** Delay for long press event (ms) */
    longPressDelay = 600;
    /** Whether the item is locked */
    locked = false;
    /** Enable swipe actions (mobile) */
    swipeActions = false;
    /** Swipe behavior: 'reveal' or 'dismiss' */
    swipeBehavior = 'reveal';
    leftActionIcon = '';
    leftActionColor = 'success';
    rightActionIcon = '';
    /** Progress percentage (0-100), -1 to disable */
    progress = -1;
    /** Presence status: 'online', 'offline', 'busy', 'away' */
    status = '';
    /** Position of the status dot */
    statusPosition = 'bottom-right';
    /** Whether to show the star icon */
    showStar = false;
    /** Multiple actions for left swipe reveal [{icon, color, action}] */
    leftActions = [];
    /** Multiple actions for right swipe reveal [{icon, color, action}] */
    rightActions = [];
    /** Threshold for full-swipe trigger (% of width) */
    fullSwipeThreshold = 0.75;
    /** Whether the item is starred/favorited */
    starred = false;
    /** Whether the item can be expanded to show more details */
    expandable = false;
    /** Whether the expansion detail is shown */
    expandedDetail = false;
    /** Whether the item is currently shaking/wobbling (visual haptic) */
    wobble = false;
    /** Whether to show a pulsating ambient glow for high priority */
    priorityPulse = false;
    /** Collaborative presence data [{id, color}] */
    presence = [];
    /** Layout density mode */
    density = 'comfortable';
    /** Mini sparkline data [10, 50, 20...] */
    sparkline = [];
    /** Custom metadata for Ghost Layer {ip, id, etc.} */
    metadata = {};
    /** Whether to show the Ghost Layer (Alt mode) */
    showGhostLayer = false;
    /** Whether to show a background heatmap glow matching the status */
    auraMode = false;
    /** Professional presence cursors [{name, color, x, y}] */
    presenceCursors = [];
    /** Interactive accessibility label */
    a11yLabel = '';
    isFocused = false;
    isHovered = false;
    contextMenuOpen = false;
    contextMenuX = 0;
    contextMenuY = 0;
    swipeOffset = 0;
    showStatusEditor = false;
    listItemClick;
    listItemActionClick;
    listItemToggle;
    contextMenuOpenEvent;
    contextMenuCloseEvent;
    checkboxChange;
    pillClick;
    tagClick;
    swipeAction;
    longPress;
    starToggle;
    detailToggle;
    contextMenuRef;
    touchStartX = 0;
    touchCurrentX = 0;
    isSwiping = false;
    longPressTimer;
    componentDidLoad() {
        if (this.contextMenu) {
            document.addEventListener('click', this.handleOutsideClick);
        }
    }
    disconnectedCallback() {
        if (this.contextMenu) {
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }
    handleOutsideClick = (e) => {
        if (this.contextMenuOpen && this.contextMenuRef && !this.contextMenuRef.contains(e.target)) {
            const listItem = this.el.shadowRoot.querySelector('.list-item');
            if (listItem && !listItem.contains(e.target)) {
                this.closeContextMenu();
            }
        }
    };
    handleClick = (e) => {
        if (this.disabled || this.readonly) {
            return;
        }
        // Handle context menu on click
        if (this.contextMenu && this.contextMenuTrigger === 'click') {
            e.stopPropagation();
            this.toggleContextMenu(e);
            return;
        }
        if (this.locked) {
            this.wobble = true;
            setTimeout(() => this.wobble = false, 400);
            return;
        }
        if (this.expandable && !this.contextMenu) {
            this.expandedDetail = !this.expandedDetail;
            this.detailToggle.emit({ value: this.value, expanded: this.expandedDetail });
            return;
        }
        if (this.collapsible && !this.contextMenu) {
            this.expanded = !this.expanded;
            this.listItemToggle.emit({ value: this.value, expanded: this.expanded });
        }
        if (this.interactive && !this.contextMenu && !this.locked) {
            if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                this.selected = !this.selected;
            }
            this.listItemClick.emit({
                value: this.value,
                selected: this.selected,
                shiftKey: e.shiftKey,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                altKey: e.altKey
            });
        }
        if (this.href) {
            e.preventDefault();
            window.open(this.href, this.target);
        }
    };
    handleContextMenu = (e) => {
        if (this.contextMenu && this.contextMenuTrigger === 'rightClick') {
            e.preventDefault();
            e.stopPropagation();
            this.toggleContextMenu(e);
        }
    };
    toggleContextMenu = (e) => {
        if (this.contextMenuOpen) {
            this.closeContextMenu();
        }
        else {
            this.openContextMenu(e);
        }
    };
    openContextMenu = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Estimated context menu dimensions (will adjust based on actual size)
        const menuWidth = 200;
        const menuHeight = 300;
        // Viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // Calculate initial position based on contextMenuPosition prop
        let x = 0;
        let y = 0;
        if (this.contextMenuTrigger === 'rightClick') {
            // Use mouse position for right-click
            x = e.clientX;
            y = e.clientY;
        }
        else {
            // Calculate position relative to the list item
            switch (this.contextMenuPosition) {
                case 'right':
                    x = rect.right;
                    y = rect.top;
                    break;
                case 'left':
                    x = rect.left - menuWidth;
                    y = rect.top;
                    break;
                case 'bottom':
                    x = rect.left;
                    y = rect.bottom;
                    break;
                case 'auto':
                default:
                    // Auto: prefer right, fallback to left if not enough space
                    const spaceRight = viewportWidth - rect.right;
                    if (spaceRight > menuWidth) {
                        x = rect.right;
                        y = rect.top;
                    }
                    else {
                        x = rect.left - menuWidth;
                        y = rect.top;
                    }
                    break;
            }
        }
        // Edge detection and adjustment for all directions
        // Right edge: if menu extends beyond right viewport edge, shift left
        if (x + menuWidth > viewportWidth) {
            x = viewportWidth - menuWidth - 10; // 10px padding from edge
        }
        // Left edge: if menu extends beyond left viewport edge, shift right
        if (x < 0) {
            x = 10; // 10px padding from edge
        }
        // Bottom edge: if menu extends beyond bottom viewport edge, shift up
        if (y + menuHeight > viewportHeight) {
            y = viewportHeight - menuHeight - 10; // 10px padding from edge
            // If still not enough space, position above the trigger element
            if (y < 0) {
                y = Math.max(10, rect.top - menuHeight);
            }
        }
        // Top edge: if menu extends beyond top viewport edge, shift down
        if (y < 0) {
            y = 10; // 10px padding from edge
        }
        this.contextMenuX = x;
        this.contextMenuY = y;
        this.contextMenuOpen = true;
        this.contextMenuOpenEvent.emit({ value: this.value });
    };
    closeContextMenu = () => {
        this.contextMenuOpen = false;
        this.contextMenuCloseEvent.emit({ value: this.value });
    };
    handleCheckboxChange = (e) => {
        e.stopPropagation();
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.checkboxChange.emit({ value: this.value, checked: this.checked });
    };
    handleFocus = () => {
        this.isFocused = true;
    };
    handleBlur = () => {
        this.isFocused = false;
    };
    handleMouseEnter = (e) => {
        this.isHovered = true;
        // Handle context menu on hover
        if (this.contextMenu && this.contextMenuTrigger === 'hover') {
            this.openContextMenu(e);
        }
    };
    handleMouseLeave = () => {
        this.isHovered = false;
        // Close context menu on hover out (with delay)
        if (this.contextMenu && this.contextMenuTrigger === 'hover') {
            setTimeout(() => {
                if (!this.isHovered) {
                    this.closeContextMenu();
                }
            }, 300);
        }
    };
    handleTouchStart = (e) => {
        if (!this.swipeActions || this.disabled)
            return;
        this.touchStartX = e.touches[0].clientX;
        this.isSwiping = true;
        // Long press initiation
        if (this.longPressDelay > 0) {
            this.longPressTimer = setTimeout(() => {
                if (!this.swipeOffset) {
                    this.longPress.emit({ value: this.value });
                    if (navigator.vibrate)
                        navigator.vibrate(50); // Haptic feedback
                }
            }, this.longPressDelay);
        }
    };
    handleTouchMove = (e) => {
        if (!this.isSwiping)
            return;
        this.touchCurrentX = e.touches[0].clientX;
        const delta = this.touchCurrentX - this.touchStartX;
        // Clear long press on move
        if (Math.abs(delta) > 10)
            clearTimeout(this.longPressTimer);
        // Limits
        if (delta > 80 && !this.leftActionIcon && this.leftActions.length === 0)
            return;
        if (delta < -80 && !this.rightActionIcon && this.rightActions.length === 0)
            return;
        this.swipeOffset = delta;
    };
    handleTouchEnd = () => {
        if (!this.swipeActions)
            return;
        clearTimeout(this.longPressTimer); // Clear long press on touch end
        const threshold = this.el.clientWidth * 0.25;
        const fullThreshold = this.el.clientWidth * this.fullSwipeThreshold;
        const absOffset = Math.abs(this.swipeOffset);
        if (absOffset > fullThreshold) {
            // Full Swipe Trigger
            const side = this.swipeOffset > 0 ? 'left' : 'right';
            const actions = side === 'left' ? (this.leftActions.length ? this.leftActions : [{ icon: this.leftActionIcon, action: 'left' }]) : (this.rightActions.length ? this.rightActions : [{ icon: this.rightActionIcon, action: 'right' }]);
            const primaryAction = actions[0]?.action || (side === 'left' ? 'check' : 'trash');
            this.swipeOffset = this.swipeOffset > 0 ? this.el.clientWidth : -this.el.clientWidth;
            setTimeout(() => {
                this.swipeAction.emit({ value: this.value, side, action: primaryAction });
                if (this.swipeBehavior === 'dismiss') {
                    this.el.style.display = 'none'; // Physics dismissal
                }
                else {
                    this.swipeOffset = 0;
                }
            }, 200);
            return;
        }
        if (absOffset > threshold) {
            this.swipeOffset = this.swipeOffset > 0 ? 80 * Math.max(1, this.leftActions.length) : -80 * Math.max(1, this.rightActions.length);
        }
        else {
            this.swipeOffset = 0;
        }
    };
    async focusItem() {
        this.isFocused = true;
        this.el.shadowRoot.querySelector('.list-item')?.setAttribute('tabindex', '0');
        this.el.shadowRoot.querySelector('.list-item')?.focus();
    }
    handleKeyDown = (e) => {
        if (this.isFocused) {
            if (e.key === 'Enter') {
                this.listItemClick.emit({ value: this.value, selected: !this.selected });
            }
        }
    };
    renderLabel(text) {
        if (!this.highlight || !text)
            return text;
        const parts = text.split(new RegExp(`(${this.highlight})`, 'gi'));
        return parts.map(part => part.toLowerCase() === this.highlight.toLowerCase()
            ? h("mark", { class: "list-item-highlight" }, part)
            : part);
    }
    renderPresenceCursors() {
        if (!this.presenceCursors || this.presenceCursors.length === 0)
            return null;
        return (h("div", { class: "presence-cursors-layer" }, this.presenceCursors.map(cursor => (h("div", { class: `ghost-cursor cursor-${cursor.color || 'blue'}`, style: { left: `${cursor.x}px`, top: `${cursor.y}px` } }, h("ui-icon", { name: "mouse-pointer", library: "fontawesome" }), h("div", { class: "cursor-label" }, cursor.name))))));
    }
    renderSparkline() {
        if (!this.sparkline || this.sparkline.length < 2)
            return null;
        const max = Math.max(...this.sparkline);
        const min = Math.min(...this.sparkline);
        const range = max - min || 1;
        const width = 60;
        const height = 20;
        const points = this.sparkline.map((val, i) => {
            const x = (i / (this.sparkline.length - 1)) * width;
            const y = height - ((val - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');
        return (h("svg", { class: "list-sparkline", width: width, height: height }, h("polyline", { fill: "none", stroke: "#3bf673", "stroke-width": "1.5", points: points })));
    }
    renderGhostLayer() {
        if (!this.showGhostLayer)
            return null;
        return (h("div", { class: "list-item-ghost-layer" }, h("div", { class: "ghost-meta" }, "IP: ", this.metadata?.ip || '127.0.0.1'), h("div", { class: "ghost-meta" }, "VER: ", this.metadata?.version || '1.0.0'), h("div", { class: "ghost-meta" }, "ID: ", this.value || 'N/A')));
    }
    parseTagsToItems() {
        if (!this.tags)
            return [];
        try {
            const parsed = typeof this.tags === 'string' ? JSON.parse(this.tags) : this.tags;
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    render() {
        const containerClasses = {
            'list-item': true,
            [`list-item-${this.size}`]: true,
            [`list-item-${this.color}`]: true,
            [`list-item-${this.variant}`]: true,
            'list-item-selected': this.selected,
            'list-item-disabled': this.disabled,
            'list-item-readonly': this.readonly,
            'list-item-focused': this.isFocused,
            'list-item-hovered': this.isHovered,
            'list-item-nested': this.nested,
            'list-item-tree-lines': this.treeLines && this.level > 0,
            'list-item-grid': this.gridMode,
            'list-item-collapsible': this.collapsible,
            'list-item-expanded': this.expanded,
            'list-item-divider': this.divider,
            'list-item-dense': this.dense,
            'list-item-interactive': this.interactive,
            'list-item-link': !!this.href,
            'list-item-context-menu': this.contextMenu,
            'list-item-context-menu-open': this.contextMenuOpen,
            'list-item-multiline': this.multiline,
            'list-item-with-checkbox': this.showCheckbox,
            'list-item-checked': this.checked,
            'is-skeleton': this.skeleton,
            'list-item-locked': this.locked,
            'list-item-starred': this.starred,
            'list-item-expandable': this.expandable,
            'list-item-detail-expanded': this.expandedDetail,
            'is-wobbling': this.wobble,
            [`list-item-density-${this.density}`]: true,
            [`list-item-aura-${this.status}`]: this.auraMode && this.status && !this.skeleton,
            [`list-item-selection-${this.selectionColor}`]: this.selected && this.selectionColor !== 'default',
            [`list-item-hover-${this.hoverColor}`]: this.hoverColor !== 'default',
            'list-item-avatar-right': this.avatarPosition === 'right',
        };
        const paddingLeft = this.level * 24;
        const parsedTags = this.parseTagsToItems();
        const collaborators = typeof this.avatarGroup === 'string' ? JSON.parse(this.avatarGroup || '[]') : (this.avatarGroup || []);
        return (h(Host, { key: '58ce4116ce6d57212618035289472a8885198909', onKeyDown: this.handleKeyDown, tabIndex: this.interactive && !this.disabled ? 0 : -1 }, h("div", { key: '2d3d1569f7cadc8e324e75285b08e51865a616d9', class: containerClasses, onClick: this.handleClick, onContextMenu: this.handleContextMenu, onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: () => {
                this.longPressTimer = setTimeout(() => {
                    this.longPress.emit({ value: this.value });
                }, this.longPressDelay);
            }, onMouseUp: () => clearTimeout(this.longPressTimer), onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, tabindex: this.disabled ? -1 : 0, role: "listitem", "aria-label": this.a11yLabel || (this.skeleton ? 'Loading cluster node' : `${this.label}, status: ${this.status}, health: ${this.progress}%`), "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', "aria-haspopup": this.contextMenu ? 'menu' : undefined, "aria-expanded": this.contextMenuOpen ? 'true' : 'false', style: {
                paddingLeft: `${paddingLeft + (this.level > 0 ? 32 : 16)}px`,
                transform: `translateX(${this.swipeOffset}px)`
            }, part: "list-item" }, this.priorityPulse && h("div", { key: '077eb5592bd7da1c326619f37da4b42a0dc428b5', class: "list-item-pulse" }), this.presence && this.presence.length > 0 && this.presence.map(p => (h("div", { class: `presence-halo presence-${p.color || 'blue'}`, title: `User ${p.id} active` }))), this.renderGhostLayer(), this.renderPresenceCursors(), this.swipeActions && this.swipeOffset !== 0 && (h("div", { key: 'f59474feb89543f37d4618ec4c422878669cee3a', class: "swipe-actions-container" }, this.swipeOffset > 0 && (h("div", { key: '64c03eb1c0c9633988441ce81c16a0ba024185a4', class: "swipe-action-wrapper left" }, this.leftActions.length > 0 ? (this.leftActions.map(action => (h("div", { class: `swipe-action bg-${action.color}`, onClick: () => this.swipeAction.emit({ value: this.value, side: 'left', action: action.action }) }, h("ui-icon", { name: action.icon, library: "fontawesome" }))))) : (h("div", { class: `swipe-action left bg-${this.leftActionColor}` }, h("ui-icon", { name: this.leftActionIcon, library: "fontawesome" }))))), this.swipeOffset < 0 && (h("div", { key: 'd6670645e03558910d978b74685c6d0d1e76c774', class: "swipe-action-wrapper right" }, this.rightActions.length > 0 ? (this.rightActions.map(action => (h("div", { class: `swipe-action bg-${action.color}`, onClick: () => this.swipeAction.emit({ value: this.value, side: 'right', action: action.action }) }, h("ui-icon", { name: action.icon, library: "fontawesome" }))))) : (h("div", { class: `swipe-action right bg-${this.rightActionColor}` }, h("ui-icon", { name: this.rightActionIcon, library: "fontawesome" }))))))), this.skeleton && h("div", { key: '4c77cacc6165a5f32b3048a3193c08c43fe1b3dd', class: "skeleton-pulse" }), this.showCheckbox && !this.skeleton && (h("div", { key: '74c9ff9a6bec5c8201a1c713e0eb49d99c44dd85', class: "list-item-checkbox" }, h("ui-checkbox", { key: 'bdf7bed4aa503546fab79d1c1ca8f170b7ea4289', checked: this.checked, disabled: this.disabled, readonly: this.readonly, onCheckboxChange: (e) => this.handleCheckboxChange(e), size: "sm" }))), this.collapsible && !this.contextMenu && !this.skeleton && (h("ui-icon", { key: '0d90b7eaec8eada7810b04ce55b94f4e647b6af0', class: "collapse-icon", name: this.expanded ? 'chevron-down' : 'chevron-right', library: "fontawesome" })), this.avatarPosition === 'left' && (h("div", { key: '32e681013eaf3b8dbf239ed093608b0186f56124', class: "list-item-left-media" }, this.userAvatar ? (h("div", { class: "list-item-avatar-container" }, h("ui-avatar", { class: { 'list-item-avatar': true, 'skeleton-circle': this.skeleton }, src: this.userAvatar, size: this.size === 'lg' ? 'md' : 'sm' }), this.status && !this.skeleton && (h("span", { class: `list-item-status status-${this.status} pos-${this.statusPosition}` })))) : this.image ? (h("div", { class: { 'list-item-image': true, 'skeleton-rect': this.skeleton } }, !this.skeleton && h("img", { src: this.image, alt: this.label }))) : this.icon ? (h("ui-icon", { class: "list-item-icon", name: this.icon, library: "fontawesome" })) : this.avatarGroup && this.avatarGroupPosition === 'media' ? (h("div", { class: "list-item-media-avatar-group" }, h("ui-avatar-group", { items: collaborators, size: "xs", spacing: "-12px", limit: 3 }))) : this.skeleton && (h("div", { class: "list-item-media-placeholder skeleton-circle" })))), h("div", { key: '0149ace554979e9a601bd717fab44c8f71a22f75', class: "list-item-content" }, h("div", { key: 'b53dac62842d57fc4cb060bc138903b59ab1e32b', class: "list-item-label-wrapper" }, this.showStar && !this.skeleton && (h("ui-icon", { key: '15d77a692e85eab6ea85bd530068d83d9221ec0b', class: { 'list-item-star-icon': true, 'is-starred': this.starred }, name: this.starred ? 'star' : 'star', library: "fontawesome", onClick: (e) => {
                e.stopPropagation();
                this.starred = !this.starred;
                this.starToggle.emit({ value: this.value, starred: this.starred });
                if (navigator.vibrate)
                    navigator.vibrate(20);
            } })), h("span", { key: '08cc2c0d174b85bd07acee7aa98c0498d18bce4f', class: { 'list-item-label': true, 'skeleton-text': this.skeleton } }, this.skeleton ? '' : this.renderLabel(this.label)), this.badge && !this.skeleton && (h("span", { key: 'f0c536c274a653d4cb8a6ae4e9b0905a938d0073', class: `list-item-badge badge-${this.badgeColor}` }, this.badge))), (this.sublabel || this.skeleton) && (h("div", { key: 'e3f001f937904d3e291834de24a3305d32c5f22d', class: "list-item-subline" }, h("span", { key: 'cab7999b62cc0d3cca31b573043be48be72ad3b2', class: { 'list-item-sublabel': true, 'skeleton-text': this.skeleton } }, this.skeleton ? '' : this.renderLabel(this.sublabel)), this.renderSparkline())), this.progress >= 0 && !this.skeleton && (h("div", { key: '10559a4b748ef1d49bc7748c35d05217294806b0', class: "list-item-progress-container" }, h("div", { key: '36ec119650364308b1d86b0ed0361b675dd3b56a', class: "list-item-progress-bar", style: { width: `${this.progress}%` } }), h("span", { key: 'ae6209cc9da5ddc2c4dad32c000602d3d4ed7977', class: "list-item-progress-text" }, this.progress, "%"))), this.avatarGroup && this.avatarGroupPosition === 'content' && !this.skeleton && (h("div", { key: '91b42175d2203685397be51b38b0a20e978dab85', class: "list-item-collaborators" }, h("ui-avatar-group", { key: '97782481c4725e203cafb230bdf9cff36ab0b4c7', items: collaborators, size: "xs", spacing: "-8px" }))), parsedTags.length > 0 && !this.skeleton && (h("div", { key: 'ce41b5b18a85962e36532117def183ebec3a889e', class: "list-item-tags" }, h("ui-tag-group", { key: '9fefbdcf44f0f72caf6cb956a7ef663723440a51', spacing: "4px" }, parsedTags.map((tag) => (h("ui-tag", { label: typeof tag === 'string' ? tag : tag.label, color: tag.color || 'default', variant: tag.variant || 'light', size: "xs", shape: tag.shape || 'pill', icon: tag.icon }))))))), h("slot", { key: 'f5f37f87becd210aebc7d3b443805447b2f08934' }), this.avatarPosition === 'right' && (h("div", { key: '1a0024c8eb561fc77c10e6ca393556d57e5b82dc', class: "list-item-right-media" }, this.userAvatar ? (h("div", { class: "list-item-avatar-container" }, h("ui-avatar", { class: { 'list-item-avatar': true, 'skeleton-circle': this.skeleton }, src: this.userAvatar, size: this.size === 'lg' ? 'md' : 'sm' }), this.status && !this.skeleton && (h("span", { class: `list-item-status status-${this.status} pos-${this.statusPosition}` })))) : this.image ? (h("div", { class: { 'list-item-image': true, 'skeleton-rect': this.skeleton } }, !this.skeleton && h("img", { src: this.image, alt: this.label }))) : this.icon ? (h("ui-icon", { class: "list-item-icon", name: this.icon, library: "fontawesome" })) : this.avatarGroup && this.avatarGroupPosition === 'media' ? (h("div", { class: "list-item-media-avatar-group" }, h("ui-avatar-group", { items: collaborators, size: "xs", spacing: "-12px", limit: 3 }))) : null)), this.avatarGroup && this.avatarGroupPosition === 'right' && !this.skeleton && (h("div", { key: 'ca2da167a6df02533aaf3e4d15b14af4a77b188c', class: "list-item-right-collaborators" }, h("ui-avatar-group", { key: '93aca83ac5defecf49eba0144ef8eb793cf84d90', items: collaborators, size: "xs", spacing: "-8px" }))), this.counter !== '' && !this.skeleton && (h("span", { key: 'e32d27e4c9f1e9899d9ea327f2aded8f2184de2a', class: "list-item-counter" }, this.counter)), this.locked && !this.skeleton && (h("ui-icon", { key: '7d5bb73fa57391b4f06938ec16a625c86b89cf36', class: "list-item-lock-icon", name: "lock", library: "fontawesome" })), this.showMenu && !this.skeleton && (h("div", { key: '5cac8d9f75433668559299587d62b358a564cdbc', class: "list-item-menu", onClick: (e) => { e.stopPropagation(); this.toggleContextMenu(e); } }, h("ui-icon", { key: '08ca49e61037d1a7f1590c9941213434caf3f993', name: "ellipsis-v", library: "fontawesome" })))), this.contextMenuOpen && (h("div", { key: '44a01fb51995af67c9a61464caab980c8f4ad523', ref: el => this.contextMenuRef = el, class: "list-item-context-menu-container", style: {
                top: `${this.contextMenuY}px`,
                left: `${this.contextMenuX}px`
            } }, h("slot", { key: 'b44a9d26b3d06e2528c8133f6080db1eee944dc2', name: "context-menu" }, h("div", { key: '455e867a0acb5fcd97df1e1c63de11ab643101ac', class: "context-menu-default" }, h("div", { key: 'ec25558af4c83b57bf36e7c430e5296de74956e9', class: "context-menu-item", onClick: () => this.closeContextMenu() }, h("ui-icon", { key: '69be015e453751f92d2572c82f83977b170386ef', name: "info-circle", library: "fontawesome" }), h("span", { key: 'cc4a0148cba635cd3b7305827339b8be101b21dc' }, "View Details")), h("div", { key: 'bf42c2745524c05869583e60580777266f5fad0d', class: "context-menu-item", onClick: () => this.closeContextMenu() }, h("ui-icon", { key: 'a40e0515fdf007eb09f0348947f38be95b36de42', name: "edit", library: "fontawesome" }), h("span", { key: '9243b179bbcb3b7f09c31ca72d73b38b166d0bb1' }, "Edit Item")), h("div", { key: '881528fbf3230427a153c535c606d1edabd911ff', class: "context-menu-divider" }), h("div", { key: '18cd2ade135fdc8cbc9805361b889897a8c9d384', class: "context-menu-item danger", onClick: () => this.closeContextMenu() }, h("ui-icon", { key: 'a16b3e59fc28d532abbda7d2228889d0e2475671', name: "trash", library: "fontawesome" }), h("span", { key: '1c7dae8d54e168682d9a1bdb6665951a95df092c' }, "Delete Node")))))), this.expandable && (h("div", { key: 'd6da1edf62a007534109bc82de4028efc4235912', class: { 'list-item-detail-panel': true, 'is-expanded': this.expandedDetail } }, h("slot", { key: '6c163928bcb53c29a47d3c56fbfe0ecbfcd5f8c3', name: "detail" })))));
    }
};
AppListItem.style = listItemCss();

export { AppListGroup as ui_list_group, AppListItem as ui_list_item };
