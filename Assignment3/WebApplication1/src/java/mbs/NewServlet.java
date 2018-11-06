/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mbs;


import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;


/**
 *
 * @author visha
 */
public class NewServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
            try{
            //    Class<?> forName = Class.forName("org.apache.derby.jdbc.ClientDriver");
                Connection conn = DriverManager.getConnection("jdbc:derby://localhost:1527/LOGIN","vishal","abc");
                Statement st;
             //   PreparedStatement ps = conn.prepareStatement("SELECT * FROM VISHAL.LOGIN_TABLE WHERE username=? AND password=?");
                String username = request.getParameter("name");
                String password = request.getParameter("pass");
                int log = 1;
                st = (Statement)conn.createStatement();
                 System.out.println("before session set");
                 HttpSession session=request.getSession(true);
                 myBean ub = new myBean();
                 session.setAttribute("ub",ub);
                 System.out.println("after set attribute");

               // ps.setString(1,username);
               // ps.setString(1,password);
               // ResultSet rs = ps.executeQuery();
                ResultSet rs = null;
                rs = st.executeQuery("select * from VISHAL.LOGIN_TABLE");
                while(rs.next())
                {
                    if(rs.getString(1).equals(username) && rs.getString(2).equals(password)){
                      log = 0;
                      break;
                    }
                }
                if(log == 0)
                {
                 // HttpSession session = request.getSession(true);
                 // session.setAttribute("usr",username);
                  ub.setName(username);
                  ServletContext SC=getServletContext();
                  RequestDispatcher rd = SC.getRequestDispatcher("/success.jsp");

                  response.sendRedirect("success.jsp");  
                }
                else
                {
                //  HttpSession session = request.getSession(true);
                //  session.setAttribute("usr",username);
                  ub.setName(username);
                  ub.setPassword(password);
                  ServletContext SC=getServletContext();
                  RequestDispatcher rd = SC.getRequestDispatcher("/newjsf1.jsp");
                  response.sendRedirect("newjsf1.jsp");
                }    
             /*
             if(rs.next())
                {
                   HttpSession session = request.getSession(true);
                   session.setAttribute("Welcome",username);
                   response.sendRedirect("index.html");
                }    
                else
                {
                    response.sendRedirect("newjsf1.jsp");    
                }
             */
            }
            catch(Exception e)
            {
                System.out.println(e.getMessage());
            }
             
	}
    
    
   

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
 

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
   

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
