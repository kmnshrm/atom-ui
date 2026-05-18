import { r as registerInstance, c as createEvent, h, H as Host } from './index-DUsoYu9r.js';

const colorControllerCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}:host{display:block;font-family:inherit;width:100%;max-width:2a0px}.col-ctrl-label{font-size:13px;font-weight:700;color:var(--color-primary, #6366f1);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em}.col-ctrl-grid{display:flex;flex-direction:column;gap:6px}.col-ctrl-row{display:flex;align-items:center;gap:8px}.col-ctrl-key{flex:0 0 20px;font-size:12px;font-weight:500;color:var(--text-secondary, #4b5563)}.col-ctrl-input-wrapper{flex:1;display:flex;align-items:center;border:1px solid var(--border-default, #e5e7eb);border-radius:4px;background:var(--bg-primary, #ffffff);padding:2px 6px;transition:all 0.2s}.col-ctrl-input-wrapper:focus-within{border-color:var(--color-primary, #6366f1);box-shadow:0 0 0 2px rgba(var(--color-primary-rgb, 99, 102, 241), 0.1)}.col-ctrl-input{flex:1;border:none;background:transparent;outline:none;font-size:13px;padding:4px;width:100%;color:var(--text-primary, #111827);font-family:monospace;text-align:right}.col-ctrl-input::-webkit-outer-spin-button,.col-ctrl-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.hex-row .col-ctrl-key{font-family:monospace;font-weight:700}.col-ctrl-unit{font-size:12px;color:var(--text-muted, #9ca3af);margin-left:4px;min-width:12px}.hex-input{text-align:left;letter-spacing:0.05em;font-weight:600}`;

const ColorController = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.colorChange = createEvent(this, "colorChange");
    }
    /** Current color as a hex string */
    value = '#10b981';
    /** Label for the entire group */
    label = '';
    /** Emitted when any color channel changes */
    colorChange;
    r = 16;
    g = 185;
    b = 129;
    h = 159;
    s = 91;
    v = 73;
    hex = '10B981';
    handleValueUpdate(newValue) {
        this.updateAllFromHex(newValue);
    }
    componentWillLoad() {
        this.updateAllFromHex(this.value);
    }
    updateAllFromHex(hex) {
        if (!hex)
            return;
        const clean = hex.startsWith('#') ? hex.slice(1) : hex;
        this.hex = clean.toUpperCase();
        const bigInt = parseInt(clean, 16);
        this.r = (bigInt >> 16) & 255;
        this.g = (bigInt >> 8) & 255;
        this.b = bigInt & 255;
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h = 0;
        if (d === 0)
            h = 0;
        else if (max === r)
            h = ((g - b) / d) % 6;
        else if (max === g)
            h = (b - r) / d + 2;
        else if (max === b)
            h = (r - g) / d + 4;
        h = Math.round(h * 60);
        if (h < 0)
            h += 360;
        const s = max === 0 ? 0 : d / max;
        const v = max;
        this.h = h;
        this.s = Math.round(s * 100);
        this.v = Math.round(v * 100);
    }
    emitChange() {
        this.value = `#${this.hex}`;
        this.colorChange.emit(this.value);
    }
    handleHexInput = (e) => {
        const val = e.detail.value || '';
        if (val.length === 6 || val.length === 3) {
            if (/^[0-9A-Fa-f]+$/.test(val)) {
                this.hex = val.toUpperCase();
                this.updateAllFromHex(this.hex);
                this.emitChange();
            }
        }
    };
    handleRgbChange(channel, val) {
        if (isNaN(val))
            return;
        this[channel] = Math.max(0, Math.min(255, val));
        this.hex = ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1).toUpperCase();
        this.updateAllFromHex(this.hex);
        this.emitChange();
    }
    handleHsvChange(channel, val) {
        if (isNaN(val))
            return;
        if (channel === 'h')
            this.h = Math.max(0, Math.min(360, val));
        if (channel === 's')
            this.s = Math.max(0, Math.min(100, val));
        if (channel === 'v')
            this.v = Math.max(0, Math.min(100, val));
        // HSV to RGB
        const h = this.h;
        const s = this.s / 100;
        const v = this.v / 100;
        const c = v * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = v - c;
        let r = 0, g = 0, b = 0;
        if (h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }
        this.r = Math.round((r + m) * 255);
        this.g = Math.round((g + m) * 255);
        this.b = Math.round((b + m) * 255);
        this.hex = ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1).toUpperCase();
        this.emitChange();
    }
    render() {
        return (h(Host, { key: 'b3bf272d34509127138914724e36b188edd43d6e' }, this.label && h("div", { key: '36ebf9de294642b1d67135b6c8c452fb47c612e6', class: "col-ctrl-label" }, this.label), h("div", { key: '59133d3793607ff7168906dbddd0e7e40c7244a9', class: "col-ctrl-grid" }, h("div", { key: '44b1a8ae8bbc3faaf5c9b009eab5580297761c2d', class: "col-ctrl-row" }, h("span", { key: 'd5fe3fe12e6a116569b2939a0d63f8ff5599184f', class: "col-ctrl-key" }, "H"), h("div", { key: '69bb7842109760c51e1122963cb56f0eba8454a0', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: 'f6a133615ab877293398de65f3b0004c0234f161', class: "col-ctrl-input", type: "number", value: this.h, onInputChange: (v) => this.handleHsvChange('h', parseInt(v.detail)), variant: "plain" }), h("span", { key: 'e00ac8771d5c0f6a08d93fd3f1c1b85b6014edca', class: "col-ctrl-unit" }, "\u00B0"))), h("div", { key: '2fd071bc5741f47cbf40b6664332c6f63e684091', class: "col-ctrl-row" }, h("span", { key: '375c1767c1631f1f5aa0095606c9e50b350443f2', class: "col-ctrl-key" }, "S"), h("div", { key: '3c41e3f98fc37ab7a2af5f3a57dfa7bb05427744', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: '3f2a4a152681231156b1b82091fd08b78d6cba2f', class: "col-ctrl-input", type: "number", value: this.s, onInputChange: (v) => this.handleHsvChange('s', parseInt(v.detail)), variant: "plain" }), h("span", { key: '3c33faf1a4ffe99ebe5cde064c024034b691ad1f', class: "col-ctrl-unit" }, "%"))), h("div", { key: '2e49ebd592ade20e0e7660b10416b656312347e0', class: "col-ctrl-row", style: { marginBottom: '12px' } }, h("span", { key: '874e0da90ed96b03c7955ac6650c75b039ea886a', class: "col-ctrl-key" }, "V"), h("div", { key: '7ef1fd0da2ea55c460643e464a0a06bd4ae2d280', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: '11cb688038ce67cee9c29b091498b7967674b7fa', class: "col-ctrl-input", type: "number", value: this.v, onInputChange: (v) => this.handleHsvChange('v', parseInt(v.detail)), variant: "plain" }), h("span", { key: '09449462dbba86a0fd33b862f42590209218b9e2', class: "col-ctrl-unit" }, "%"))), h("div", { key: 'c16ecc86f52bbb01edea970400c2128d86384a70', class: "col-ctrl-row" }, h("span", { key: '53fa2cd839dc048567e3aed4fe6ce766d7005577', class: "col-ctrl-key" }, "R"), h("div", { key: 'bcf8bf7833c0dc0030d99b28af56b0bc430fd708', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: 'a498ca548a2529505bae7161659f50b4e5641678', class: "col-ctrl-input", type: "number", value: this.r, onInputChange: (v) => this.handleRgbChange('r', parseInt(v.detail)), variant: "plain" }))), h("div", { key: '516aff05554aad71cc012a9905dad96d5e03b91e', class: "col-ctrl-row" }, h("span", { key: '2c234e6e2f2111724cf603a76303a965b2277c17', class: "col-ctrl-key" }, "G"), h("div", { key: '85339e47bcd95bf20f6e7ae42ac5d29739e8d05a', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: 'd705b336aaceb110e92a9a63c000bfc19c9bdb17', class: "col-ctrl-input", type: "number", value: this.g, onInputChange: (v) => this.handleRgbChange('g', parseInt(v.detail)), variant: "plain" }))), h("div", { key: '033523f4276729ee119fe4ad793e02850c288831', class: "col-ctrl-row", style: { marginBottom: '12px' } }, h("span", { key: '66fd8bdd0d2dd540fb591d02ebc3240913477b52', class: "col-ctrl-key" }, "B"), h("div", { key: '1cfa29786007a7c1292817b914cb573f0a69f1b8', class: "col-ctrl-input-wrapper" }, h("ui-input", { key: 'b6c51663d914adb081819c23fb8e7915be7b50cb', class: "col-ctrl-input", type: "number", value: this.b, onInputChange: (v) => this.handleRgbChange('b', parseInt(v.detail)), variant: "plain" }))), h("div", { key: '4c43173acd72a63dcb2e3ea5759d05bceebd6087', class: "col-ctrl-row hex-row" }, h("span", { key: '3d742b9ca0c5956498a6787171a22fbdb0e87a12', class: "col-ctrl-key" }, "#"), h("div", { key: '294d48fc7bb69c9dda1a36788b6e712725fda674', class: "col-ctrl-input-wrapper hex-wrapper" }, h("ui-input", { key: '051e90c5e2814ba7a5ae6cb542e379f343cf29ea', class: "col-ctrl-input hex-input", value: this.hex, onInputChange: (v) => this.handleHexInput({ detail: { value: v.detail } }), variant: "plain" }))))));
    }
    static get watchers() { return {
        "value": [{
                "handleValueUpdate": 0
            }]
    }; }
};
ColorController.style = colorControllerCss();

export { ColorController as ui_color_controller };
