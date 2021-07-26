import { styled } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

export default function responsiveStyled(component, mode = 'up') {
    return style => {
        return styled(component)(props => {
            const { theme } = props;

            if (typeof style === 'function') {
                style = style({ theme });
            }

            const finalStyle = { ...style };

            for (const breakpoint of ['sm', 'md', 'lg', 'xl']) {
                if (finalStyle[breakpoint]) {
                    const breakpointText = theme.breakpoints[mode](breakpoint as Breakpoint);
                    finalStyle[breakpointText] = finalStyle[breakpoint];
                }
            }

            return finalStyle;
        });
    }
}