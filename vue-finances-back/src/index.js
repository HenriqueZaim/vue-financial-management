const {
  prisma
} = require('./generated/prisma-client')
const {
  GraphQLServer
} = require('graphql-yoga')
const Binding = require('prisma-binding')

// async function main (){
//   await prisma.createUser({
//     email: 'aeaea',
//     name: 'aksdnasd',
//     password: 'qnjqer'
//   })

//   const users = await prisma.users()

//   console.log(users)
// }

// main().catch(e => console.error(e))

const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint: process.env.PRISMA_ENDPOINT
    }),
    prisma
  })
})

server.start().then(() => console.log("4000"))