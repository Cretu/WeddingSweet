package controllers;

import models.User;
import play.mvc.With;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-17
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
@With(Secure.class)
public class Users extends CRUD {
    public static void listAll(){
        List<User> users = User.findAll();
        renderArgs.put("users",users);
        String loginUserName = Security.connected();
        User loginUser = User.find("byName",loginUserName).first();
        render(loginUser);

    }
    @Check("user")
    public static void account(){
        String id = session.get("userID");
        User user = User.findById(Long.valueOf(id));
        render(user);
    }
    public static void changePwd(){
        String id = session.get("userID");
        User user = User.findById(Long.valueOf(id));
        render(user);
    }
}
