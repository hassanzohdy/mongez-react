import { trans } from './../../localization';
import withInputType from '../utils/withInputType';

const PasswordInput = withInputType('password', {
    name: 'password',
    placeholder: trans('password'),
}); 

export default PasswordInput;