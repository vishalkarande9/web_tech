


package mbs;
import java.io.Serializable;

/**
 * @author spring
 */
public class myBean extends Object implements Serializable {

    public static final String ISTATUS = "Login";

    private String status;
    private int id;
    private String name;
    private String password;

    public myBean() {
        status = ISTATUS;
        id=0;
        name = new String();
        password = new String();
    }

    public String getStatus() {return status;}
    public void setStatus(String value) {status = value;}

    public int getId() {return id;}
    public void setId(int value) {id = value;}

    public String getName() {return name;}
    public void setName(String value) {name = value;}
    public String getPassword() {return password;}
    public void setPassword(String value) {password = value;}

}
