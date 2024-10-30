// redis, assets 서버가 켜짐과 동시에 로드가 되는 내용을 init에 추가했었다.

import { loadProtos } from "./loadProto.js";

 const initServer = async () => {
    await loadProtos();
 };

 export default initServer;