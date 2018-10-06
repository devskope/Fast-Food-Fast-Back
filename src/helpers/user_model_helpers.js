export default async (db, [query, params], role, logger) => {
  const user = await db.query(query, params);
  let createSuccess;
  if (user) {
    logger(`${role} saved`);
    createSuccess = true;
  }
  return {
    user: user.rows[0],
    createSuccess
  };
};
