import { mergeSchemas } from 'graphql-tools';
import authSchema from './auth/schema';
import usersSchema from './users/schema';
import stockxSchema from './stockx/schema';
import productsSchema from './products/schema';
import cartsSchema from './carts/schema'
/* CODE-GENERATOR - ROOTSCHEMA IMPORT */

export default mergeSchemas({
  schemas: [
    authSchema,
    usersSchema,
    stockxSchema,
    productsSchema,
    cartsSchema,
/* CODE-GENERATOR - ROOTSCHEMA DEFAULT */
  ],
});
