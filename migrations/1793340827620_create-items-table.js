/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('items', {
    id: {
      type: 'integer',
      primaryKey: true,
      sequenceGenerated: { precedence: 'ALWAYS' },
    },
    name: {
      type: 'varchar(30)',
      notNull: true,
    },
    description: {
      type: 'varchar(100)',
      notNull: true,
    },
    stock: {
      type: 'integer',
      notNull: true,
      check: 'stock >= 0',
    },
    price: {
      type: 'integer',
      notNull: true,
      check: 'price > 0',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('items');
};
