import { Controller, Delete, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Numbers } from '@src/database/entity/Numbers';
import { Core } from '@src/sys/core';

@Controller('api/v1/numbers')
export class NumbersController {

    @Get('')
    public getSortNumbers(req: Request, res: Response): void {
        try {
            if (Core.FLAG_EXTRACT) {
                Numbers.find().then((e) => {
                    let numbers_all = new Array();
                    e.forEach((element: any) => {
                        numbers_all.push(element.valor)
                    });
                    numbers_all = Core.instance().transform(numbers_all)
                    res.status(200).send({ numbers: numbers_all, status: 200 })
                }).catch(e => {
                    res.status(500).send({ error: 'Erro', status: 500 });
                })
            } else {
                res.status(200).send({ message: 'Extract not finalized', status: 204 })
            }
        } catch (error) {
            res.status(500).send({ error: 'Erro', status: 500 });
        }
    }

    @Post('extract/:index')
    public getExtract(req: Request, res: Response): void {
        try {
            if (!Core.FLAG_EXTRACT) {
                var a = req.params['index'];
                Core.instance().extract(Number(a))
                res.status(200).send({ message: 'Extract initialized', status: 200 })
            } else {
                res.status(200).send({ message: 'Extract Finalized', status: 200 })
            }

        } catch (error) {
            res.status(500).send({ error: 'Erro', status: 500 });
        }
    }

    @Delete('')
    public deleteNumbers(req: Request, res: Response): void {

        Numbers.clear().then((e) => {
            Core.FLAG_EXTRACT = false;
            res.status(200).send({ message: 'Deleted numbers', status: 200 })
        }).catch(e => {
            res.status(500).send({ error: 'Erro', status: 500 });
        })
    }

}