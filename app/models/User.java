package models;
import javax.persistence.*;
import play.db.jpa.Model;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-18
 * Time: 下午1:27
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class User extends Model {
    public String name;
    public int age;
    public String password;
    public String role;
    public String imageUrl;

    public User() {
        super();
    }


}
