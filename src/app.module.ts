import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { GlobalResolver } from './global.resolver';
import { UserSchema } from './schemas/user.schema';
import * as autoincrement from 'mongoose-auto-increment';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      connectionFactory: async connection => {
        autoincrement.initialize(connection);
        autoincrement.plugin(UserSchema, {
          model: 'User',
          field: 'user_id',
          startAt: 1,
          incrementBy: 1,
        });
        return connection;
      },
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [GlobalResolver],
})
export class AppModule {}
