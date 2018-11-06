<%-- 
    Document   : login
    Created on : Nov 4, 2018, 8:17:12 PM
    Author     : visha
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="f" uri="http://java.sun.com/jsf/core"%>
<%@taglib prefix="h" uri="http://java.sun.com/jsf/html"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <title>Login Page</title>
        </head>
        <body>
                 <div>
            <form action="NewServlet" method="post">
                Name : <input type="text" name="name" /><br/>
                Pass : <input type="password" name="pass" /><br/>
                <input type="submit" name="submit" value="submit" />
            </form>        
        </div> 
        </body>
    </html>
</f:view>
