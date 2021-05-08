import { Button } from '@material-ui/core'
import React from 'react'
import { trans } from '../../localization'

export default function FileManagerButton({onClick, children = trans('fileManager.buttonText')}) {
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}
