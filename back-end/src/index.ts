console.log("Hello World");
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSourceGoodCorner } from './config/db';
import { buildSchema } from 'type-graphql';
import ClothesResolver from './resolvers/clothesresolver';
import categoryResolver from './resolvers/categoriesResolver';
import tagResolver from './resolvers/tagsResolver';



const start = async () => {
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    try {
        await dataSourceGoodCorner.initialize();
        console.log("Data source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        return;
    }
    const schema = await buildSchema({
        resolvers: [ClothesResolver, categoryResolver, tagResolver]
    })

    const server = new ApolloServer({
       schema
      });

    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

    console.log(`🚀 Server listening at: ${url}`);
};
start();
