export type SortableContainerProps = {
    list: any[];
    setList: Function;
    onDragEnd?: Function;
    listStyle?: Function;
    direction?: 'vertical' | 'horizontal';
    renderItem: (item: any, index: number) => React.ReactNode;
    [id: string]: any;
};

export type SortableElementProps = {
    id: any;
    index: number;
    children: any;
    className?: string;
    direction?: 'horizontal' | 'vertical';
    itemStyle?: Function;
    [id: string]: any;
};