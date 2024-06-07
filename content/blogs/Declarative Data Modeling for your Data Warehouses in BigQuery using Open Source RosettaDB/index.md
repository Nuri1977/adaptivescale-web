+++
author = "Nuhi Besimi"
title = "Declarative Data Modeling for your Data Warehouses in BigQuery using Open Source RosettaDB"
date = "2023-02-21"

tags = [
    "RosettaDB",
    "BigQuery",
    "Data Warehouses",
    "Declarative Data Modeling"
]
aliases = ["declarative-data-modeling-data-warehouses-in-bigquery"]
image = "rosettadb.png"
type = "blog"

+++

Engineers today use BigQuery to build data warehouses because these are optimised for analytical queries and better performance on huge amounts of data. Assume a company has all its transactional data on a Postgres Database and wants to build a data warehouse in BigQuery in a few steps.

We are going to show, how this can be performed by using RosettaDB: [https://github.com/AdaptiveScale/rosetta](https://github.com/AdaptiveScale/rosetta)

RosettaDB is a declarative data modeler and transpiler that converts database objects from one database to another. Define your database in DBML and rosetta generates the target DDL for you.

With the help of RosettaDB, we will:

1.  Initialise a new project
2.  Configure a connection to the source DB which in his case is PostgreSQL
3.  Configure a connection to the target data sources which is BigQuery
4.  Extract the current schema for the targeted tables from PostgreSQL and generate the declarative DBML models
5.  Convert the generated DBML models from step #3, generate the DDLs for the target DB and apply the changes

In order to achieve the above requirements these are the steps we have to follow with RosettaDB:

**1.** Download and configure RosettaDB on your machine. Download all the required JDBC drivers. For more details on this step please refer to the Getting Started section of RosettaDB docs [https://github.com/AdaptiveScale/rosetta#getting-started](https://github.com/AdaptiveScale/rosetta#getting-started)

**2.** Create a new rosetta project using the init command

```
rosetta init [PROJECT_NAME]
```


**3.** Edit the **main.conf** to configure the connection for the PostgreSQL and BigQuery

Example:

```
connections:
  - name: pg
    databaseName: postgres
    schemaName: rosseta_testing
    dbType: postgres
    url: jdbc:postgresql://<HOST>:<PORT>/<DATABASE>?user=<USER>&password=<PASSWORD>
    userName: <USER>
    password: <PASSWORD>
    tables:
      - <TABLE_1>
      - <TABLE_2>
  - name: bq
    databaseName: bigquery-public-data
    schemaName: austin_311
    dbType: bigquery
    url: jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;ProjectId=<PROJECT_ID>;AdditionalProjects=bigquery-public-data;OAuthType=0;OAuthServiceAcctEmail=<EMAIL>;OAuthPvtKeyPath=<SERVICE_ACCOUNT_KEY_PATH>
    userName:
    password:
```


**4\.** Run the rosetta **extract** command to generate the DBML models from PostgreSQL tables

```
rosetta extract -s pg
```


Since now we have the DBML models, we can review it, and use it for the next steps. The generated DBML models are ready to be converted to the target DDL and executed to the target DB.

**5\.** Run rosetta **compile** to generate the DDLs for BigQuery

```
rosetta compile -s pg -t bq
```


**6\.** Review the generated files, if everything is as expected you can apply these changes to the target DB (BigQuery)

**7\.** Run rosetta apply to generate the tables in BigQuery

```
rosetta apply -s bq
```


With the above steps we demonstrated the process of how you can use RosettaDB as a declarative data modeler and as DDL transpiler so you can build your data warehouses in just a few steps.
