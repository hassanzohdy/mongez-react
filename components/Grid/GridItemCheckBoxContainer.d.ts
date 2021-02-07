/// <reference types="react" />
/**
 * This is just a grid item that is wrapping a checkbox that will be mostly
 * become beside an input
 */
declare const GridItemCheckBoxContainer: import("react").ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core").StyledComponentProps<"root"> & {
    className?: string;
}>;
export default GridItemCheckBoxContainer;
