+++
author = "RosettaDB"
title = "Generating DDL"
date = "2023-05-15"
type = "usecase"

+++

To generate DDL in Rosetta, you can follow these steps:

1. Install the required JDBC drivers for your source and target databases.

2. Download and install Rosetta on your system.

3. Configure Rosetta to connect to your source and target databases. You can do this by updating the YAML config file with the connection details for each database.

4. Use the rosetta generate command to generate DDL from your source database. The syntax of the command is as follows:

```
rosetta generate --source=<source_db_type> --target=<target_db_type>

```

Replace <source_db_type> with the type of your source database (e.g., mysql, postgres, oracle, etc.), and replace <target_db_type> with the type of your target database.

You can also specify the following optional parameters:

- --output=<output_file>: Specify the name of the output file where the generated DDL will be written. If not specified, the DDL will be written to stdout.

- --logging-level=<logging_level>: Set the logging level (debug, info, warn, or error). Default is info.

- --tables=<table_list>: Specify a list of tables to generate DDL for. If not specified, DDL will be generated for all tables in the source database.

- --schemas=<schema_list>: Specify a list of schemas to generate DDL for. If not specified, DDL will be generated for all schemas in the source database.

Here’s an example command to generate DDL for a MySQL source database and a Postgres target database:

```
rosetta generate --source=mysql --target=postgres \
  --output=ddl.sql \
  --tables=my_table_1,my_table_2 \
  --schemas=my_schema_1,my_schema_2

```
In this example, we’re generating DDL for two specific tables (my_table_1 and my_table_2) and two specific schemas (my_schema_1 and my_schema_2). The generated DDL will be written to a file called ddl.sql.

5. Once you have the generated DDL, you can execute it on your target database to create the necessary schema and tables. You can use any SQL client or tool to execute the DDL script.

Note that Rosetta generates declarative DBML models that can be used for conversion to alternate database targets. However, the generated DDL may require further modifications and optimizations to suit your specific use case and database configurations.