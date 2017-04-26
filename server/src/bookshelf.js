import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from './knexfile';

// BookShelf is an ORM that works with Knex, Postgresql, and NodeJS
export default bookshelf(knex(knexConfig.development));