import { Numbers } from '@src/database/entity/Numbers';
import * as axios from 'axios';
import { Logger } from '../logger';

export class Core {

    private static core: Core;
    static FLAG_EXTRACT: boolean = false;
    private httpURL = 'http://challenge.dienekes.com.br/api/numbers?page=';

    public static instance(): Core {
        if (!this.core) {
            this.core = new this();
        }
        return this.core;
    }

    /**
     * Função extrai os numeros da API de forma recursiva,
     * Tolerante a erros retornado do servidor (500)
     * Quando finaliza o carregamento para de chamar a função
     * 
     * @param index da pagina a ser extraido os dados
     */
    public extract(index: number = 1) {
        this.requestPage(index).then((e) => {
            if (e !== null && e.length !== 0) {
                index = index + 1;
                e.forEach(el => {
                    let s: Numbers = new Numbers();
                    s.pagina = (index - 1);
                    s.valor = el;
                    Numbers.save(s)
                })
            } else if (e !== null && e.length === 0) {
                Logger.instance().print("Finalizou Carregamento de números");
                Core.FLAG_EXTRACT = true;
                return;
            }
            this.extract(index)
        })
    }

    /**
     * 
     * @param index pagina a ser extraido os números
     * @returns retorna um array de números obtidos da página especifica
     */
    private requestPage(index: number): Promise<number[]> {
        return new Promise((resolve) => {
            axios.default
                .get(this.httpURL + index.toFixed(0))
                .then((res) => {
                    if (res.status == 200)
                        resolve(res.data.numbers)
                    else {
                        resolve(null)
                    }
                })
                .catch(function (error) {
                    Logger.instance().print(JSON.stringify(error.response.data));
                    resolve(null)
                });
        })
    }

    /**
     * 
     * Função utilizada para fazer a ordenação dos números de forma crescente
     * @param array total dos numeros obtidos, ainda não ordenados
     * @returns retorna o Array dos números já ordenados
     */
    public transform(array: Array<number>, left: number = 0, right: number = array.length - 1) {
        let index;

        if (array.length > 1) {
            const pivot = array[Math.floor((right + left) / 2)];
            let i = left;
            let j = right;

            while (i <= j) {
                while (array[i] < pivot) {
                    i++;
                }
                while (array[j] > pivot) {
                    j--;
                }

                if (i <= j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    i++;
                    j--;
                }
            }
            index = i;
            if (left < index - 1) {
                this.transform(array, left, index - 1);
            }

            if (index < right) {
                this.transform(array, index, right);
            }
        }

        return array;
    }


}