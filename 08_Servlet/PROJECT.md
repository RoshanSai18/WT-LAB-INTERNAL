✅ 1. Setup Requirements

Make sure you have:

Eclipse IDE (Enterprise / Dynamic Web)
Apache Tomcat (configured in Eclipse)
MySQL installed
MySQL Connector JAR (add to project)
✅ 2. Create Dynamic Web Project
Open Eclipse
File → New → Dynamic Web Project
Name: BookApp
Select Tomcat server
Click Finish
✅ 3. Create Database & Table

Open MySQL and run:

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
✅ 4. Add MySQL Connector
Download MySQL Connector JAR
In Eclipse:
Right-click project → Build Path
Configure Build Path
Add External JAR → select connector
✅ 5. Create Servlet
Package:

com.book.servlet

Class:

BookServlet.java

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
✅ 6. Configure web.xml

Go to WEB-INF/web.xml

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
✅ 7. Create HTML Page (Frame / UI)
index.html
<html>
<head>
    <title>Book App</title>
</head>

<frameset rows="20%,80%">
    <frame src="menu.html">
    <frame name="contentFrame">
</frameset>

</html>
menu.html
<html>
<body>

<h3>Menu</h3>

<a href="books" target="contentFrame">
    View Books
</a>

</body>
</html>
✅ 8. Run Project
Right-click project → Run on Server
Open:
http://localhost:8080/BookApp
Click View Books
👉 Data will load in the content frame