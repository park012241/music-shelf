import { config } from 'dotenv';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  beforeEach(() => {
    config();
  });

  it('should be defined', () => {
    expect(DatabaseService).toBeDefined();
  });

  it('should throw Error when MongoDB connection URI is not provided', () => {
    delete process.env.MONGODB_URI;
    expect(DatabaseService.connect()).rejects.toThrow();
  });

  it('should throw Error when access collections before connect', () => {
    expect(() => {
      return DatabaseService.collection('test');
    }).toThrow();
  });

  it('should can connect', async () => {
    await DatabaseService.connect();
  });

  it('should get collection', () => {
    DatabaseService.collection('test');
  });

  it('should exact same instance', () => {
    expect(DatabaseService.collection('test')).toStrictEqual(DatabaseService.collection('test'));
  });
});
