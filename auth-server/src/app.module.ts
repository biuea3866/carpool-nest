import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { Authentication } from './auth/authentication';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: []
        }),
        buildService: ({
          name,
          url
        }) => {
          return new Authentication
        }
      }
    }),
    UtilsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}