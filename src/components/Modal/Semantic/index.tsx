import './index.scss';
import React from 'react';
import { Modal } from 'semantic-ui-react';
import useClasses from '../../../hooks/useClasses';

export type ModalProps = {
    /**
     * Modal size
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'fullScreen';

    /**
     * Display modal in full screen mode
     */
    fullScreen?: boolean;

    /**
     * Dimmer shape
     */
    dimmer?: 'default' | 'blurring' | 'inverted';

    /**
     * Close modal when pressing Esc button
     */
    esc?: boolean;

    /**
     * Display close icon on the modal
     */
    closeIcon?: boolean;

    /**
     * Modal Header
     */
    header?: React.ReactNode;

    /**
     * Modal Actions
     */
    actions?: React.ReactNode;

    /**
     * Determine if the modal should be opened
     */
    open: boolean;

    /**
     * Triggered when modal is closed
     */
    onClose: Function;

    /**
     * Triggered when modal is opened
     */
    onOpen?: Function;

    /**
     * Determine whether the modal should be closed when clicking on backdrop
     */
    backdrop?: boolean;

    /**
     * Modal content
     */
    children: React.ReactNode;

    /**
     * Classes list
     */
    classes?: {
        root?: string;
        header?: string;
        content?: string;
    };
};

const sizesMap = {
    xs: 'mini',
    sm: 'tiny',
    md: 'small',
    lg: 'large',
    fullScreen: 'fullscreen',
}

type SemanticModalSIze = 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';

function modalSize(props): SemanticModalSIze {
    if (props.fullScreen) return 'fullscreen';

    if (!props.size) return 'small';

    return sizesMap[props.size];
}

export default function SemanticModal(props: ModalProps) {
    const [size] = React.useState<SemanticModalSIze>(modalSize(props));

    const getClass = useClasses(props);

    return (
        <>

            <Modal
                animation="fade"
                closeIcon={props.closeIcon}
                size={size}
                closeOnDocumentClick={false}
                onClose={props.onClose as any}
                closeOnEscape={props.esc}
                onOpen={props.onOpen as any}
                dimmer={props.dimmer}
                closeOnDimmerClick={props.backdrop}
                open={props.open}
            >
                {props.header && <Modal.Header className={getClass('header')}>{props.header}</Modal.Header>}
                <Modal.Content className={getClass('content')}>{props.children}</Modal.Content>
                {props.actions && <Modal.Actions className={getClass('actions')}>{props.actions}</Modal.Actions>}
            </Modal>
        </>
    )
}