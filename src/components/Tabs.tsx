import clsx from 'clsx';
import React from 'react';
import Is from '@flk/supportive-is';
import Box from '@material-ui/core/Box';
import ColoredIcon from './ColoredIcon';
import AppBar from '@material-ui/core/AppBar';
import { PropTypes } from '@material-ui/core';
import MaterialTab from '@material-ui/core/Tab';
import MaterialTabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/core/styles';

export { MaterialTab as TabHead, TabPanel as TabBody };

type ColorType = PropTypes.Color | 'transparent';

export type TabPanelProps = {
  value?: any;
  index?: any;
  lazy?: boolean;
  children: React.ReactNode;
  [id: string]: any;
};

export type TabProps = {
  value?: any;
  index?: any;
  children: any;
  lazy?: boolean;
  disabled?: boolean;
  iconColor?: ColorType;
  label?: React.ReactNode,
  tooltip?: React.ReactNode;
  icon?: string | React.ReactElement;
};

export type TabsProps = {
  children: any;
  lazy?: boolean;
  noShadow?: boolean;
  value?: any;
  inverted?: boolean;
  classes?: {
    root?: string;
    verticalRoot?: string;
    verticalTabPanel?: string;
    verticalTabs?: string;
  };
  [id: string]: any;
  centered?: boolean;
  textColor?: string;
  iconColor?: string;
  barBackground?: ColorType | string;
  mode?: 'horizontal' | 'vertical';
  onChange?: (value: any, event: React.ChangeEvent<{}>) => void;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, lazy, index, ...other } = props;

  let tabContent;

  if (lazy) {
    tabContent = value === index && (<Typography component="div">{children}</Typography>);
  } else {
    tabContent = <Box p={3} children={children} />
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabContent}
    </div>
  );
}

function MaterialIcon(props: TabProps) {
  if (!props.icon) return null;

  return (
    <IconWrapper>
      <ColoredIcon icon={props.icon} title={props.tooltip} color={props.iconColor} />
    </IconWrapper>
  )
}

const IconWrapper = styled('span')({
  marginRight: '0.5rem',
});

const MaterialLabelWrapper = styled('span')({
  verticalAlign: 'top',
});

function MaterialTabLabel(props: TabProps) {
  return (
    <span>
      <MaterialIcon {...props} />

      {props.label && <MaterialLabelWrapper>{props.label}</MaterialLabelWrapper>}
    </span>
  )
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    verticalRoot: {
      flexGrow: 1,
      display: 'flex',
    },
    tabPanel: {
      flexGrow: 1,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    appBar: (props: any) => {
      return props.appBar;
    }
  };
});

export function Tab(props: TabProps) {
  return <React.Fragment {...props} />;
}

export default function Tabs(props: TabsProps) {
  let { value: defaultValue = 0, noShadow = false, classes: classesList = {}, barBackground = 'primary', mode = 'horizontal', textColor, onChange, lazy, children, ...otherTabsProps } = props;

  const styleSettings: any = {
    appBar: {},
  };

  if (noShadow) {
    styleSettings.appBar.boxShadow = 'none';
  }

  if (!['primary', 'secondary'].includes(barBackground)) {
    styleSettings.appBar.background = barBackground;
    barBackground = undefined; // disable the coloring
  }

  if (textColor) {
    styleSettings.appBar.color = textColor;
  }

  if (props.inverted) {
    styleSettings.appBar.background = '#FFF';
    styleSettings.appBar.color = '#000';
  }

  const classes = useStyles(styleSettings);
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    onChange && onChange(newValue, event);
  };

  if (!Is.array(children)) {
    children = [children];
  }

  const Wrapper = (props) => {
    if (mode === 'vertical') return <React.Fragment {...props} />

    return (
      <>
        <AppBar classes={{ root: classes.appBar }} color={(barBackground as ColorType)} position="static" {...props} />
      </>
    )
  };

  return (
    <div className={clsx(classesList.root, classes.root, {
      [classes.verticalRoot]: mode === 'vertical',
      [classesList.verticalRoot]: mode === 'vertical',
    })}>
      <Wrapper>
        <MaterialTabs
          indicatorColor="primary"
          className={clsx({
            [classes.tabs]: mode === 'vertical',
            [classesList.verticalTabs]: mode === 'vertical',
          })} orientation={mode} value={value} onChange={handleChange} {...otherTabsProps}>
          {children.map((tab, index) => (
            <MaterialTab value={tab.props.index || tab.props.value || index} key={index} label={<MaterialTabLabel {...tab.props} />} />
          ))}
        </MaterialTabs>
      </Wrapper>
      {children.map((tab, index) => (
        <TabPanel className={clsx(classes.tabPanel, {
          [classesList.verticalTabPanel]: mode === 'vertical',
        })} key={index} lazy={tab.props.lazy !== undefined ? tab.props.lazy : lazy} value={value} index={tab.props.index || tab.props.value || index} children={tab.props.children} />
      ))}
    </div>
  );
}