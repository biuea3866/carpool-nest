import { GraphQLDataSourceProcessOptions, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ValueOrPromise } from "apollo-server-types";

class Authentication extends RemoteGraphQLDataSource {
    public willSendRequest({
        request,
        context
    }) {
        console.log(request.http.headers)
    }
};

export { Authentication };