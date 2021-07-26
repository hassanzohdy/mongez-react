import Form from './Form';
import service from 'apps/app-name/module-name/services/service';
import {wizardTable, CrudOptions, tableActions } from 'mongez/table';
// imports

const options: CrudOptions = PAGE_OPTIONS;

export default wizardTable(options);