# HibernateApp — Hibernate ORM Project

This project demonstrates database integration using Hibernate ORM with MySQL, Maven, and Jakarta EE.

## ✅ 1. Create Maven Project

### In Eclipse:

1. File → New → Maven Project
2. Select `maven-archetype-webapp`
3. Project name: `HibernateApp`
4. Click Finish
## ✅ 2. Project Structure

After setup, your project should look like this:

```
HibernateApp/
 ├── src/main/java/
 │     └── com/entity/
 │           ├── Book.java
 │           ├── User.java
 │           ├── HibernateUtil.java
 │           └── TestHibernate.java
 ├── src/main/resources/
 │     └── hibernate.cfg.xml          (Essential configuration file)
 ├── src/main/webapp/
 │     └── WEB-INF/
 └── pom.xml                          (Maven dependencies)
```
## ✅ 3. Configure Dependencies (pom.xml)

Open `pom.xml` and add the following dependencies inside the `<dependencies>` section:

```xml
<dependencies>

    <!-- Hibernate Core ORM -->
    <dependency>
        <groupId>org.hibernate.orm</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.4.4.Final</version>
    </dependency>

    <!-- MySQL JDBC Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.3.0</version>
    </dependency>

    <!-- Jakarta Persistence API -->
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
    </dependency>

</dependencies>
```

After adding dependencies:

1. Right-click project → Maven → Update Project
2. Wait for dependencies to download
3. Refresh project (F5)
## ✅ 4. Create Database

In MySQL client, execute the following SQL commands:

```sql
CREATE DATABASE hibernatedb;

USE hibernatedb;

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
);
```
## ✅ 5. Create hibernate.cfg.xml

This is the core Hibernate configuration file that specifies database connection and entity mappings.

### Steps:

1. Right-click `src/main/resources` → New → File
2. Name: `hibernate.cfg.xml`
3. Add the following configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
 "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
 "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
 <session-factory>

  <!-- Database Connection Properties -->
  <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
  <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/hibernatedb</property>
  <property name="hibernate.connection.username">root</property>
  <property name="hibernate.connection.password">password</property>

  <!-- Database Dialect -->
  <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>

  <!-- Development Settings -->
  <property name="hibernate.show_sql">true</property>
  <property name="hibernate.hbm2ddl.auto">update</property>

  <!-- Entity Mappings -->
  <mapping class="com.entity.Book"/>
  <mapping class="com.entity.User"/>

 </session-factory>
</hibernate-configuration>
```
## ✅ 6. Create Entity Class — Book.java

Entity classes represent database tables in the object-oriented model.

### Steps:

1. Right-click `src/main/java` → New → Class
2. Package: `com.entity`
3. Name: `Book`
4. Add the following code:

```java
package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String author;
    private double price;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
```
## ✅ 7. Create Entity Class — User.java

### Steps:

1. Right-click `src/main/java` → New → Class
2. Package: `com.entity`
3. Name: `User`
4. Add the following code:

```java
package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```
## ✅ 8. Create Hibernate Utility Class (Essential)

This utility class manages the Hibernate `SessionFactory`, which is required to create database sessions.

### Steps:

1. Right-click `src/main/java` → New → Class
2. Package: `com.entity`
3. Name: `HibernateUtil`
4. Add the following code:

```java
package com.entity;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static final SessionFactory factory;

    static {
        try {
            factory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return factory;
    }
}
```
## ✅ 9. Create Test Class

Create a simple test to verify that Hibernate is correctly configured and can insert data.

### Steps:

1. Right-click `src/main/java` → New → Class
2. Package: `com.entity`
3. Name: `TestHibernate`
4. Add the following code:

```java
package com.entity;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class TestHibernate {
    public static void main(String[] args) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Book b = new Book();
        b.setTitle("Hibernate Basics");
        b.setAuthor("Gavin King");
        b.setPrice(600);

        session.save(b);

        tx.commit();
        session.close();

        System.out.println("\u2705 Data Inserted Successfully!");
    }
}
```

## ✅ 10. Run and Verify

### To test:

1. Right-click `TestHibernate.java` → Run as → Java Application
2. Check the console for the success message
3. Verify in MySQL:

```sql
SELECT * FROM books;
```

If you see the inserted book record, your Hibernate setup is complete and working correctly.