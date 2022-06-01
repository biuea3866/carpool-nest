import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';
  
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./graphql/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }) => ({ req }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
