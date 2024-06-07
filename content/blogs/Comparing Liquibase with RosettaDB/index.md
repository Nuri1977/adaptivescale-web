+++
author = "Nuhi Besimi"
title = "Comparing Liquibase with RosettaDB"
date = "2023-02-28"
tags = [
    "RosettaDB",
    "Liquibase",
    "YAML",
    "JSON",
    "DDL",
    "DBML"
]

aliases = ["compare-liquibase-rosettadb"]
image = "rosettadb-liquibase.png"
type = "blog"

+++
**Liquibase** allows you to specify the database change you want using SQL or several different database-agnostic formats, including XML, YAML, and JSON. Developers can abstract the database code to make it extremely easy to push out changes to different database types.

**RosettaDB** is an open source declarative data modeler and transpiler ([https://github.com/AdaptiveScale/rosetta#overview](https://github.com/AdaptiveScale/rosetta#overview)) that converts database objects from one database to another. Define your database in DBML and RosettaDB generates the target DDL and executes it for you. RosettaDB is used also as DBT Model Generator and Database Testing toolkit for your data.

In this blog we are going to show a step-by-step solution for declarative data modeling in Google Spanner using Liquibase and using RosettaDB. As a result we will compare both tools. The process that we will perform with both tools is as follow:

1.  Create new project
2.  Configure
3.  Extract the current state of the Google Spanner
4.  Introduce some changes
5.  Apply the changes
6.  Rollback

In order to achieve the above requirements these are the steps we have to follow with Liquibase:

**1.** Download and configure Liquibase on your machine. Download all the required JDBC drivers. For more details on this step please refer to the Getting Started section of Liquibase docs [https://docs.liquibase.com/start/home.html](https://docs.liquibase.com/start/home.html)

**2.** Create a new liquibase project using the init command

```
liquibase init project
```


**3.** Edit the **liquibase.properties** to configure the connection for Google Cloud Spanner. Example:

```
changeLogFile=my_db_changelog.json
liquibase.command.url=jdbc:cloudspanner:/projects/my_project/instances/my_instance/databases/SimpleDB
liquibase.command.username: root
liquibase.command.password: root
```


**4.** Capture the current state of your database by creating a deployable Liquibase _changelog_ using the command

```
liquibase generateChangeLog --changeLogFile=my_actual_state_db_changelog.json
```


Now since we have the actual state of our database we can start to make our first changes by creating our first _changeset_ in our changelog file.

**5\.** We now add a new table for our database by creating a new _changeset_ in our changelog file

```
{ "databaseChangeLog":
  [{
    "changeSet": {
      "id": "123456789-1",
      "author": "root",
      "changes": [
        {
          "createTable": {
            "columns": [
              {
                "column": {
                  "constraints": {
                    "nullable": false,
                    "primaryKey": true,
                    "primaryKeyName": "PRIMARY_KEY"
                  },
                  "name": "LogId",
                  "type": "INT64"
                }
              },
              {
                "column": {
                  "name": "Description",
                  "type": "STRING(MAX)"
                }
              }
            ]
            ,
            "tableName": "Logs"
          }
        }
      ]
    }
  },
]}
```


**6\.** After we add our new changes to our changelog we then update the actual state of our database by using the command

```
liquibase update
```


This command will deploy the changes to our database and we are set with the next set of commands.

**7\.** Now we can automatically roll back our database last change by running the Liquibase rollback command like this

```
liquibase rollbackCount 1
```


This command will remove the last _changeset_ from our actual database, with this we roll back our database.

With the above steps we demonstrated the process of how we use Liquibase to extract the current state of the database, change the database, use the update command to update the database, restore/rollback to previous state.

Now, we are going to show, how the same process can be performed by using RosettaDB: [https://github.com/AdaptiveScale/rosetta](https://github.com/AdaptiveScale/rosetta)

In order to achieve the above requirements these are the steps we have to follow with RosettaDB:

**1.** Download and configure RosettaDB on your machine. Download all the required JDBC drivers. For more details on this step please refer to the Getting Started section of RosettaDB docs [https://github.com/AdaptiveScale/rosetta#getting-started](https://github.com/AdaptiveScale/rosetta#getting-started)

**2.** Create a new rosetta project using the init command

```
rosetta init cloudspanner_project
```


**3.** Edit the **main.conf** to configure the connection for Google Cloud Spanner. Example:

```
connections:
  - name: cloudspanner_conn
    databaseName: SimpleDB
    schemaName:
    dbType: spanner
    url: jdbc:cloudspanner:/projects/my_project/instances/my_instance/databases/SimpleDB
    userName: 
    password: 
```


**4\.** Run the rosetta **extract** command to generate the DBML models from Google Cloud Spanner tables

```
rosetta extract -s cloudspanner_conn
```


Since now we have the DBML models, we can review it, and use it for the next steps. We are ready to add new changes to our database.

**5\.** We now add a new table for our database by adding a new _table_ in our DBML model inside the tables property

```
---
safeMode: false
tables:
- name: "Logs"
  type: "TABLE"
  schema: "SimplePOS"
  columns:
  - name: "LogId"
    typeName: "INT64"
    ordinalPosition: 0
    primaryKeySequenceId: 1
    columnDisplaySize: 0
    scale: 0
    precision: 5
    autoincrement: false
    nullable: false
    primaryKey: true
  - name: "Description"
    typeName: "STRING(MAX)"
    ordinalPosition: 0
    primaryKeySequenceId: 0
    columnDisplaySize: 0
    scale: 0
    precision: 45
    autoincrement: false
    nullable: false
    primaryKey: false
databaseProductName: "SimpleDB"
databaseType: "spanner"
```


After adding the new table in the DBML model we then use the apply command to update our database

```
rosetta apply -s cloudspanner_conn
```


This command will deploy the changes to our database and we are set with the next set of commands.

**7\.** Now we can automatically roll back our database by choosing a previous state from our database in the _snapshots_ directory and by running the RosettaDB apply command like this:

```
rosetta apply -s cloudspanner_conn -m snapshots/model-20230215-121137.yaml
```


With the above steps we demonstrated the process of how we can use RosettaDB as a declarative data modeler and as DDL transpiler so we can add/change/update our database in a few steps.

**Liquibase vs. RosettaDB**

|  | Liquibase	  | RosettaDB	 |
| --------| ----------- | ----------- |
| Getting started| No account needed, you can download the latest release from the Liquibase web.  | No account needed, you can download the latest release from GitHub|
| Configuration| Uses `liquibase.properties` to specify the connection string and `changeLogFile`.| Uses `main.conf` to specify the connections.|
| Extracted Schema | It can be in various formats XML, JSON, YAML or SQL. | It supports only YAML.|
| Changes| You need to create a new changelog file and add a `changeset` to define your changes.| You update the extracted `model.yaml` based on your changes.|
| Apply Changes| `#Register the changelog liquibase registerChangeLog`<br>`#Update the current state liquibase update`| `#Apply the changes based on the current state of model.yaml rosetta apply -s <CONNECTION_NAME>`|
| Rollback            | Rollback to a specific `changeset` or version. `liquibase rollbackCount 1`<br>`liquibase rollback -tag=1.0.0`| Rollback to any version. Before each apply, it generates a snapshot with the current state. `rosetta apply -s cloudspanner -m snapshots/model-20230215-121137.yaml` |
| DDL Transpiler      | NO| YES|
| DBT Modeler         | NO| YES|
| Database Testing    | NO| YES|
| Supports View       | YES| YES|
| Supports Interleaved Tables | NO| YES|