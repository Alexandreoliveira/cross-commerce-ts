import moment from 'moment';
import fs from 'fs'

export class Logger {

    public static LOG_STATUS = true;
    private static logger: Logger;


    public static instance(): Logger {
        if (!this.logger) {
            this.logger = new this()
        }
        return this.logger
    }

    public print(saida: any) {
        if (Logger.LOG_STATUS) {
            console.log(saida);
        }

        var dir = './logs';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        saida = moment(new Date()).format('DD/MM/YYYY HH:mm:ss').toString() + " :: " + saida + "\n";
        let nomeFile = "logs/" + "LOG" + "(" + moment(new Date()).format('DD.MM.YYYY').toString() + ").txt";
        fs.createWriteStream(nomeFile, { flags: 'a' }).end(saida)
    }

}