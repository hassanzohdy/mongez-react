import withInputType from '../utils/withInputType';
import { trans } from './../../localization';

const EmailInput = withInputType('email', {
    name: 'email',
    placeholder: trans('email'),
}); 

export default EmailInput;