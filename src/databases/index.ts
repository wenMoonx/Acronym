import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://yucob:Security!2022@atlascluster.2k5kzlt.mongodb.net/test?retryWrites=true`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
