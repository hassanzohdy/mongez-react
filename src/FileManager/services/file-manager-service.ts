import { RestfulEndpoint } from "./../../http";

class FileManagerService extends RestfulEndpoint {
    route = '/file-manager';
}

const fileManagerService: FileManagerService = new FileManagerService();

export default fileManagerService;