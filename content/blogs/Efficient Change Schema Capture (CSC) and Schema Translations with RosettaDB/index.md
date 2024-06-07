+++
author = "Nuhi Besimi"
title = "Efficient Change Schema Capture (CSC) and Schema Translations with RosettaDB"
date = "2024-05-08"
tags = [
    "database migration",
    "schema conversion",
    "RosettaDB",
    "data management"
]
aliases = ["efficient-change-schema-capture"]
image = "rosettadb.png"
type = "blog"

+++


> RosettaDB is an open-source toolkit designed for efficient migration of database schemas. It automates the conversion of schemas and data types, ensuring smooth transitions while maintaining data integrity. The tool supports complex migrations by handling differences in data types, thereby reducing costs and technical complexities. It also provides you with the capabilities of Change Schema Capture (CSC) from one database to another. The process includes initial configuration, schema extraction, DDL generation, and schema application, streamlining the transition from on database to another.

[RosettaDB](https://github.com/AdaptiveScale/rosetta) is an open source toolkit that enables seamless Information Lifecycle Management (ILM), including migration of databases from one database to another. It also provides a DDL (Data Definition Language) transpiler, enabling the translation of database schemas from one database system to another with no manual intervention. This capability is crucial for organizations looking to transition their data storage solutions to more sophisticated or specialized database systems.

[RosettaDB](https://github.com/AdaptiveScale/rosetta) helps automate the conversion of schemas, data types, and database structures, ensuring that the transition is not only smooth but also retains the integrity and functionality of the original database system. This reduces the complexity and risk associated with database migrations, and significantly cuts down the time and resources needed for such projects.

[KineticaDB](https://www.kinetica.com/) is a next-generation database that harnesses the power of GPU acceleration to handle complex analytical computations with extraordinary speed and efficiency. In the world of big data, where rapid processing and analysis of large volumes of data are crucial, Kinetica offers significant advantages. Its architecture is designed to manage massive datasets and high velocity real-time data feeds, making it an exceptional choice for applications in finance, retail, healthcare, and energy sectors that require real-time analytics and decision-making.

The use of GPUs allows Kinetica to perform parallel data processing, dramatically speeding up the analysis times compared to traditional CPU-bound databases. This capability is particularly beneficial for machine learning and AI-driven applications, where faster data processing translates directly into quicker insights and more responsive decision-making systems. Moreover, Kinetica supports geospatial data types and functions, which are essential for location-based analytics and operational intelligence.

A major challenges companies face is the migration of databases, schemas, and tables from one database vendor to another. This task is particularly complex when moving from traditional relational databases (RDBMS) like PostgreSQL to cloud-based databases designed for analytics, such as KineticaDB.

These challenges include:

*   Data Integrity and Consistency: Ensuring that data remains accurate and consistent post-migration.
*   Schema and Data Type Compatibility: Different databases support different data types and structures, which can lead to significant hurdles during migration.
*   Performance Considerations: Migrations can affect the performance of applications, especially when moving from systems optimized for transactional processing to those optimized for analytical processing.
*   Cost and Complexity: Migrations can be costly and require significant technical expertise, often necessitating the use of intermediary tools like RosettaDB.
*   Migrating from a relational database to a cloud database optimized for analytics involves not just moving data but transforming the way data is structured and accessed. This requires thoughtful planning and execution to leverage the new platform’s strengths without losing the value of the legacy data.

In order to achieve the above requirements use RosettaDB and the following steps:

**1.** Download and configure RosettaDB on your machine. Download all the required JDBC drivers. For more details on this step please refer to the Getting Started section of RosettaDB docs [https://github.com/AdaptiveScale/rosetta#getting-started](https://github.com/AdaptiveScale/rosetta#getting-started)

**2.** Create a new rosetta project using the init command

```
rosetta init [PROJECT_NAME]
```


**3.** Edit the **main.conf** to configure the connection for the PostgreSQL and KineticaDB

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
  - name: kinetica
    databaseName: kinetica
    schemaName: ki_home
    dbType: kinetica
    url: jdbc:kinetica:URL=http://<HOST>:<PORT>;CombinePrepareAndExecute=1;Schema=ki_home;
    userName: <USER>
    password: <PASSWORD>
```


**4\.** Run the rosetta **extract** command to generate the DBML models from PostgreSQL tables

```
rosetta extract -s pg
```


Since now we have the DBML models, we can review it, and use it for the next steps. The generated DBML models are ready to be converted to the target DDL and executed to the target DB.

**5\.** Run rosetta **compile** to generate the DDLs for KineticaDB

```
rosetta compile -s pg -t kinetica
```


**6\.** Review the generated files, if everything is as expected you can apply these changes to the target DB (KineticaDB)

**7\.** Run rosetta apply to generate the tables in KineticaDB

```
rosetta apply -s kinetica
```


This step will create the schema and all the tables in KineticaDB.

**8\.** If you continue to introduce changes in your PostgresDB and want to apply the same changes in your KineticaDB, then you simply run the steps:

```
rosetta extract -s pg
rosetta compile -s pg -t kinetica
rosetta apply -s kinetica
```


or (if you want to skip the review of the generated DDL):

```
rosetta extract -s pg -t kinetica
rosetta apply -s kinetica
```


The above steps will only apply the changes based on the **diff** that the current version of DB has compared to the new **model.yaml.**

To verify the difference between two version you can use the diff command:

```
rosetta diff -s kinetica
```


The migration to high-performance analytics databases like KineticaDB, facilitated by tools such as RosettaDB, represents a transformative step for businesses aiming to enhance their data analytics capabilities. While the journey involves challenges, the strategic use of technology can mitigate risks and maximize the effectiveness of data resources in the digital age. By understanding the tools and techniques available for these migrations, companies can better position themselves to take advantage of the opportunities presented by modern data analytics platforms.