module.exports = {
  backend: {
    generator: 'nexus',
    onDelete: true,
    output: 'nexus/graphql',
  },
  frontend: {
    admin: { outPut: 'pages/admin' },
  },
}
