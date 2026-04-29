# BookApp

```
BookApp
 ├── src/main/java/com/auth/
 │     └── LoginServlet.java
 ├── src/main/webapp/
 │     ├── login.jsp
 │     ├── dashboard.jsp
 │     ├── error.jsp
 │     └── WEB-INF/
 │           └── web.xml
```

## ✅ 1. Project Structure

```
BookApp
 ├── src/main/java/com/auth/
 │     └── LoginServlet.java
 ├── src/main/webapp/
 │     ├── login.jsp
 │     ├── dashboard.jsp
 │     ├── error.jsp
 │     └── WEB-INF/
 │           └── web.xml
```

## ✅ 2. Create login.jsp

```jsp
<%@ page language="java" %>
<html>
<body>

<h2>Login Page</h2>

<form action="login" method="post">
    Username: <input type="text" name="username" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    <input type="submit" value="Login">
</form>

</body>
</html>
```

## ✅ 3. Create LoginServlet.java

```java
package com.auth;

import java.io.IOException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        // Simple validation (for demo)
        if (user.equals("admin") && pass.equals("1234")) {

            HttpSession session = request.getSession();
            session.setAttribute("user", user);

            response.sendRedirect("dashboard.jsp");

        } else {
            response.sendRedirect("error.jsp");
        }
    }
}
```

## ✅ 4. Configure web.xml

```xml
<web-app>

  <servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.auth.LoginServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login</url-pattern>
  </servlet-mapping>

</web-app>
```

## ✅ 5. Create dashboard.jsp (Protected Page)

```jsp
<%@ page language="java" %>
<%
    String user = (String) session.getAttribute("user");

    if (user == null) {
        response.sendRedirect("login.jsp");
    }
%>

<html>
<body>

<h2>Welcome <%= user %></h2>
<p>You are logged in!</p>

<a href="logout">Logout</a>

</body>
</html>
```

## ✅ 6. Create error.jsp

```html
<html>
<body>
<h3>Invalid Credentials</h3>
<a href="login.jsp">Try Again</a>
</body>
</html>
```

## ✅ 7. (Optional but recommended) Logout Servlet

LogoutServlet.java

```java
package com.auth;

import java.io.IOException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class LogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        session.invalidate();

        response.sendRedirect("login.jsp");
    }
}
```

Add to web.xml

```xml
<servlet>
    <servlet-name>LogoutServlet</servlet-name>
    <servlet-class>com.auth.LogoutServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>LogoutServlet</servlet-name>
    <url-pattern>/logout</url-pattern>
</servlet-mapping>
```

## 🧪 Run It

Open:

http://localhost:8080/BookApp/login.jsp

Use:

Username: admin
Password: 1234