import db from '../src/datastores';
import User from '../src/models/users';

export default expect => {
  describe('Postgres Integration', () => {
    it('should create Inital Schema', async () => {
      const schemaDef = await db.query(
        `select * from pg_tables where schemaname='f3'`
      );
      expect(typeof schemaDef).to.eq('object');
    });

    it('should create Inital tables', async () => {
      const { rows } = await db.query(
        `select * from pg_tables where schemaname='f3'`
      );
      expect(rows.length).eq(2);
      const tableNames = rows.map(row => row.tablename);
      tableNames.forEach(name =>
        expect(['orders', 'users'].includes(name)).eq(true)
      );
    });

    it('should create initial Admin', async () => {
      const Admin = await User.findByUsername('admin');
      expect(typeof Admin).eq('object');
      expect(Admin.username).eq('admin');
    });
  });
};
