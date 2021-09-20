import { Database } from './database/db';
import { SetupServer } from './server';
import { Core } from './sys/core';

(async (): Promise<void> => {
    process.env.TZ = 'America/Fortaleza';
    const server = new SetupServer(5555);
    await server.init();
    server.start();
    Database.instance();
    Core.instance();
})();
