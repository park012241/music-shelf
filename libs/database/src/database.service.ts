import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService {
  private static mongoClient;
  private static readonly collections = new Map();
  private static isConnected: boolean = false;

  public static async connect(): Promise<void> {
    if (!process.env.MONGODB_URI) {
      throw new Error('There is no MongoDB connection URI please set to $MONGODB_URI');
    }
    this.mongoClient = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await this.mongoClient.connect();
    this.isConnected = true;
  }

  public static collection<T>(name: string): Collection<T> {
    if (!this.isConnected) {
      throw new Error('MongoDB Client is not connected');
    }
    if (!this.collections.has(name)) {
      this.collections.set(name, DatabaseService.mongoClient.db().collection(name));
    }
    return this.collections.get(name);
  }
}
