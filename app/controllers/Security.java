package controllers;

import models.User;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-18
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 */
public class Security extends Secure.Security {
    static boolean authenticate(String username, String password) {
        User user = User.find("byName", username).first();
        return user != null && user.password.equals(password);
    }

    static boolean check(String profile) {
        User user = User.find("byName", connected()).first();
        return user.role.equals(profile)?true:false;
    }

}
