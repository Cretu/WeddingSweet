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

    public User(String name, int age, String password, String role) {
        this.name = name;
        this.age = age;
        this.password = password;
        this.role = role;
    }

    public User() {
        super();
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                '}';
    }
}
