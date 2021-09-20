import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import express from 'express';
import * as  http from 'http';
import { NumbersController } from './controllers/numbersController';

export class SetupServer extends Server {

  private server: http.Server;

  constructor(private port = 3000) {
    super();
  }


  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const numbersController = new NumbersController();
    this.addControllers([numbersController,]);
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://127.0.0.1:${this.port}`);
    });
  }

}