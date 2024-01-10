import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SELECT version();");
  const postgresVersionParsed = postgresVersion.rows[0].version.split(" ")[1];

  const maxConnections = await database.query(
    "SELECT current_setting('max_connections');",
  );
  const maxConnectionsParsed = parseInt(maxConnections.rows[0].current_setting);

  const databaseName = process.env.POSTGRES_DB;
  const openConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openConnectionsResultParsed = openConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersionParsed,
        max_connections: maxConnectionsParsed,
        open_connections: openConnectionsResultParsed,
      },
    },
  });
}

export default status;
