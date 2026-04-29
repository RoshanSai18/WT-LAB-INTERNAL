## ✅ 1. Setup Requirements

Make sure you have:

- Eclipse IDE (Enterprise / Dynamic Web)
- Apache Tomcat (configured in Eclipse)
- MySQL installed
- MySQL Connector JAR (add to project)

## ✅ 2. Create Dynamic Web Project

1. Open Eclipse
2. File → New → Dynamic Web Project
3. Name: BookApp
4. Select Tomcat server
5. Click Finish

## ✅ 3. Create Database & Table

Open MySQL and run:

```sql
CREATE DATABASE bookdb;

USE bookdb;

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    author VARCHAR(100),
    price DOUBLE
);

INSERT INTO books(title, author, price) VALUES
('Java Basics', 'James Gosling', 500),
('Servlet Guide', 'Oracle Docs', 300),
('Data Science Intro', 'Andrew Ng', 700);
```

## ✅ 4. Add MySQL Connector

1. Download MySQL Connector JAR
2. In Eclipse:
   - Right-click project → Build Path
   - Configure Build Path
   - Add External JAR → select connector

## ✅ 5. Create Servlet

Package:

`com.book.servlet`

Class:

`BookServlet.java`

```java
package com.book.servlet;

import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class BookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/bookdb", "root", "password");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM books");

            out.println("<html><body>");
            out.println("<h2>Book List</h2>");
            out.println("<table border='1'>");
            out.println("<tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th></tr>");

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getInt("id") + "</td>");
                out.println("<td>" + rs.getString("title") + "</td>");
                out.println("<td>" + rs.getString("author") + "</td>");
                out.println("<td>" + rs.getDouble("price") + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");
            out.println("</body></html>");

            con.close();

        } catch (Exception e) {
            out.println(e);
        }
    }
}
```

## ✅ 6. Configure web.xml

Go to WEB-INF/web.xml

```xml
<web-app>

  <servlet>
    <servlet-name>BookServlet</servlet-name>
    <servlet-class>com.book.servlet.BookServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>BookServlet</servlet-name>
    <url-pattern>/books</url-pattern>
  </servlet-mapping>

</web-app>
```

## ✅ 7. Create HTML Page (Frame / UI)

index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Book App</title>
</head>
<body>

<h2>Book Application</h2>

    <iframe src="menu.html" width="100%" height="500px"></iframe>

    <iframe name="contentFrame" width="100%" height="500px"></iframe>

</body>
</html>
```

menu.html

```html
<html>
<body>

<h3>Menu</h3>

<a href="books" target="contentFrame">
    View Books
</a>

</body>
</html>
```

## ✅ 8. Run Project

* Keep the mysql connector jar under lib in WEB-INF under webapp only then will it work
* In case you think everything is right, then please go to project on the menu bar and clean all projects
* the way you add mysql connector to the lib folder is to right click, select import, and select general-> file system and then select the folder which has the jar file and next. You will then be able to select the jar file and add it to the lib folder

1. Right-click project → Run on Server
2. Open:

http://localhost:8080/BookApp
3. Click View Books

👉 Data will load in the content frame