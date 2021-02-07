declare const sidebarItems: {
    items: any[];
    onUpdateItemsCallback: any[];
    extend(moreItems: any): void;
    onUpdate(itemsCallback: any): void;
    getItems(): any;
};
export default sidebarItems;
