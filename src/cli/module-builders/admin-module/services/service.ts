import { RestfulEndpoint } from "mongez/http";

class ServiceClassNameService extends RestfulEndpoint {
    route = 'service-route';
}

const serviceObjectService: ServiceClassNameService = new ServiceClassNameService();

export default serviceObjectService;