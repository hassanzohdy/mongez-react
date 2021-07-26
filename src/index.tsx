import { scan } from './router';
import bootstrap from './bootstrap';

// common types
export type { LangModeType } from './utils/CommonTypes';

export default function Mongez() {
    bootstrap();
    // start router scanner
    scan();
}