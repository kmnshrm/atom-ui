import { r as registerInstance, h } from './index-DUsoYu9r.js';

const timelineItemCss = () => `.sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}.a11y-sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border-width:0 !important}:host{display:block}.timeline-item-container{position:relative;margin-bottom:20px}.timeline-item-content{position:relative;width:400px;min-height:120px;padding:20px;background-color:#f9f9f9;border-radius:5px;box-shadow:0 0 5px rgba(0, 0, 0, 0.1);transition:transform 0.3s ease}.timeline-item-content:hover{transform:translateY(-5px)}.timeline-item-container::after{content:"";position:absolute;top:20px;width:16px;height:16px;background-color:#f9f9f9;border:4px solid #ddd;border-radius:50%;z-index:1}:host(:nth-child(odd)) .timeline-item-container::after{right:-8px}:host(:nth-child(even)) .timeline-item-container::after{left:-8px}:host(:nth-child(odd)) .timeline-item-content{left:0}:host(:nth-child(even)) .timeline-item-content{right:0}`;

const TimelineItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * The title of the timeline item.
     */
    itemTitle;
    /**
     * The description of the timeline item.
     */
    itemDescription;
    /**
     * The date of the timeline item.
     */
    itemDate;
    render() {
        return (h("div", { key: '54a294a4b0f3ba13841d3c8de125694e81f2141c', class: "timeline-item-container" }, h("div", { key: '0ccb68f5384a8ac2bba5cebb5d75b96fb1dccc16', class: "timeline-item-content" }, h("h2", { key: '75c5b1f55e06a1345105dd12b924e41a3bada993' }, this.itemTitle), h("p", { key: '7ae3c4cf655c6831943b8d53db977e3348907471' }, this.itemDescription), h("span", { key: '23175d4215f96f76a580dece414fe379446a23da' }, this.itemDate))));
    }
};
TimelineItem.style = timelineItemCss();

export { TimelineItem as timeline_item };
