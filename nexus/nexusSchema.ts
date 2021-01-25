import { makeSchema } from 'nexus'
import { paljs } from '@paljs/nexus'
import { join } from 'path'
import * as types from './graphql'

export const schema = makeSchema({
  types,
  plugins: [paljs()],
  outputs: {
    schema: join(process.cwd(), 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), 'nexus', 'context.ts'),
    export: 'Context',
  },
})
