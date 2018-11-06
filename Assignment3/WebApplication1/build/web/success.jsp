<%-- 
    Document   : success
    Created on : Nov 4, 2018, 6:45:44 PM
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
            <title>JSP Page</title>
             <jsp:useBean id="ub" class="mbs.myBean" scope="session" />
        </head>
        <body>
             <h1>Successfully logged in as <jsp:getProperty name="ub" property="name" /></h1>
            
        </body>
    </html>
</f:view>
    
    



