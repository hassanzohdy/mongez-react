import Form from './Form';
import service from 'modules/app-name/module-name/services/service';
import {crudPage, CrudOptions, tableActions } from 'mongez/admin';
// imports

const options: CrudOptions = PAGE_OPTIONS;

export default crudPage(options);