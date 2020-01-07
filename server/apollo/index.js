const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { prisma } = require('../prisma/generated/prisma-client');
const authReq = require('./auth/auth-middleware');

const dummyData = [
  {
    project: 'Resume Q',
    team_lead: 'Luna Lovegood',
    section_lead: 'Hermoine Granger',
    update: 'Today',
    status: 'Fire',
  },
  {
    project: 'Quick Street',
    team_lead: 'Luna Lovegood',
    section_lead: 'Hermoine Granger',
    update: 'Today',
    status: 'None',
  },
  {
    project: 'RV Nav',
    team_lead: 'Lavender Brown',
    section_lead: 'Hermoine Granger',
    update: 'Yesterday',
    status: 'Fire',
  },
  {
    project: 'Sauti Databank',
    team_lead: 'Cho Chang',
    section_lead: 'Hermoine Granger',
    update: 'Yesterday',
    status: 'None',
  },
  {
    project: 'Story Squad',
    team_lead: 'Cedric Diggory',
    section_lead: 'Draco Malfoy',
    update: 'Yesterday',
    status: 'None',
  },
  {
    project: 'Well Done',
    team_lead: 'Ron Weateam',
    section_lead: 'Draco Malfoy',
    update: 'Monday',
    status: 'Fire',
  },
  {
    project: 'Cryptolyptic',
    team_lead: 'Parvati Patil',
    section_lead: 'Draco Malfoy',
    update: 'Monday',
    status: 'None',
  },
  {
    project: 'Movie Recommender',
    team_lead: 'Dean Thomas',
    section_lead: 'Ginny Weateam',
    update: 'Friday',
    status: 'Fire',
  },
  {
    project: 'Omega 2020',
    team_lead: 'Fred Weateam',
    section_lead: 'Ginny Weateam',
    update: 'Friday',
    status: 'Fire',
  },
  {
    project: 'Tally AI',
    team_lead: 'George Weateam',
    section_lead: 'Ginny Weateam',
    update: '8 days ago',
    status: 'None',
  },
  {
    project: 'Wildfire Watch',
    team_lead: 'Seamus Finnegan',
    section_lead: 'Ginny Weateam',
    update: '8 days ago',
    status: 'Fire',
  },
  {
    project: 'Brew Plans',
    team_lead: 'Crab Goyle',
    section_lead: 'Neville Longbottom',
    update: '15 days ago',
    status: 'None',
  },
  {
    project: 'Community Calendar',
    team_lead: 'Frodo Baggins',
    section_lead: 'Neville Longbottom',
    update: '15 days ago',
    status: 'Fire',
  },
  {
    project: 'Cooking Recipe Control',
    team_lead: 'Bill Weateam',
    section_lead: 'Neville Longbottom',
    update: '15 days ago',
    status: 'None',
  },
];

(async () => {
  const resolvers = {
    Query: {
      info: async (parent, args, context) => {
        const { headers } = context;
        const result = await authReq(headers, 'Everyone');
        return result ? dummyData : [];
      },
    },
  };

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
      };
    },
  });

  const { url } = await server.listen();
  console.log(url);
})();