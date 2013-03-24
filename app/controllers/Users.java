package controllers;

import models.User;
import play.libs.Codec;
import play.mvc.With;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-17
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
//@With(Secure.class)
@Check("administrator")
public class Users extends CRUD {
    public static void listAll(){
        List<User> users = User.findAll();
        renderArgs.put("users",users);
        String loginUserName = Security.connected();
        User loginUser = User.find("byName",loginUserName).first();
        render(loginUser);

    }

    public static void logout(){
        try {
            Secure.logout();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
    public static void login(){
        if (session.get("username")!= null){
            Home.index();
        }
        render();
    }

    public static void register(){
        String randomID = Codec.UUID();
        render(randomID);
    }

}
