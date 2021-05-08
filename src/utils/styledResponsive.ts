import { styled } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

const styledResponsive = (element, style) => {
    return styled(element)(({ theme }) => {
        for (const breakpoint of breakpoints) {
            if (style[breakpoint]) {
                const breakpointStyle = style[breakpoint];
                delete style[breakpoint];
                style[theme.breakpoints.up(breakpoint as Breakpoint)] = breakpointStyle;
            }
        }

        return { style };
    });
};

export default styledResponsive;