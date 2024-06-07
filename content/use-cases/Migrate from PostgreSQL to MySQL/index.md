+++
author = "RosettaDB"
title = "Migrate from PostgreSQL to MySQL"
date = "2023-05-20"
type = "usecase"

+++

To migrate your PostgreSQL database to MySQL using Rosetta, you can follow these simple steps:

1.  Install the required JDBC drivers for both PostgreSQL and MySQL databases.
    
2.  Download and install Rosetta on your system.
    
3.  Configure Rosetta to connect to your PostgreSQL and MySQL databases in a YAML config file. Here’s an example of how you can set up connections in the YAML config file:
    

```
connections:
  - name: postgres_prod
    databaseName: mydatabase
    schemaName: public
    dbType: postgres
    url: jdbc:postgresql://localhost:5432/mydatabase
    userName: user
    password: pass
  - name: mysql_prod
    databaseName: mydatabase
    schemaName: myschema
    dbType: mysql
    url: jdbc:mysql://localhost:3306/mydatabase
    userName: user
    password: pass

```


4.  Use Rosetta to generate DDL from your PostgreSQL database and transpile it to MySQL by running the following command:

```
rosetta generate --source=postgres_prod --target=mysql_prod --output-dir=./mysql_ddl

```


This will generate the MySQL DDL files in the `./mysql_ddl` directory.

5.  Execute the generated DDL files on your MySQL database to create the required tables, indexes, and other objects.