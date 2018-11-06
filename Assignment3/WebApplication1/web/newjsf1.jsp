<%-- 
    Document   : newjsf1
    Created on : Nov 2, 2018, 10:53:25 PM
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
        <div>
            <h1>Invalid username <jsp:getProperty name="ub" property="name" /> and Password <jsp:getProperty name="ub" property="password" /></h1> 
                       

        </div>
    </body>
    </html>
</f:view>
