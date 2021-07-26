import React from 'react';
import Switch from '@material-ui/core/Switch';
import { styled, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import withCheckbox, { CheckboxProps } from './withCheckbox';

const SwitchButton: React.FC<CheckboxProps> = withCheckbox(Switch);

const Wrapper = styled('div')({
  marginTop: '1.5rem',
  display: 'inline-block',
});

export const AlignedSwitchButton = (props:CheckboxProps) => (
  <Wrapper>
    <SwitchButton {...props} />
  </Wrapper>
)

export const coloredIOSSwitchButton = color => {
  return withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: color,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))((propsList: any) => {
    const { classes, ...props } = propsList;
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
}

export const IOSSwitchButton: React.FC<CheckboxProps> = withCheckbox(coloredIOSSwitchButton(blue[500]));

export default SwitchButton;