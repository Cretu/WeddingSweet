package controllers;

import models.User;
import play.Logger;
import play.data.validation.Required;
import play.libs.Crypto;
import play.mvc.Http;
import play.mvc.With;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-18
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 */
public class Security extends Secure.Security {
    static boolean authenticate(String email, String password) {
        User user = User.find("byEmail", email).first();
        return user != null && user.password.equals(password);
    }

    static boolean check(String profile) {
        if(connected() == null){
            return false;
        }else{
            System.out.print(connected());
            User user = User.findById(Long.valueOf(session.get("userID")));
            return user.role.equals(profile)?true:false;
        }

    }

    // ~~~ Login

    public static void login(@Required String email, @Required String password) throws Throwable {
        Http.Cookie remember = request.cookies.get("rememberme");
        if(remember != null) {
            int firstIndex = remember.value.indexOf("-");
            int lastIndex = remember.value.lastIndexOf("-");
            if (lastIndex > firstIndex) {
                String sign = remember.value.substring(0, firstIndex);
                String restOfCookie = remember.value.substring(firstIndex + 1);
                String username = remember.value.substring(firstIndex + 1, lastIndex);
                String time = remember.value.substring(lastIndex + 1);
                Date expirationDate = new Date(Long.parseLong(time)); // surround with try/catch?
                Date now = new Date();
                if (expirationDate == null || expirationDate.before(now)) {
                    logout();
                }
                if(Crypto.sign(restOfCookie).equals(sign)) {
                    session.put("username", username);
                    Logger.info(controllers.Security.connected() + " 已成功登陆");
                    Secure.redirectToOriginalURL();
                }
            }
        }
        //检查用户记录
        User user = User.find("byEmailAndPassword",email,password).first();
        if(user==null){
            Logger.info("用户["+email+"]尝试登陆系统失败");
            flash.error("登陆失败，请检查你的用户名或密码");
            flash.keep("url");
            redirect("/login");//将未登录跳转至用户登陆页面，不采用Secure提供的login页面
        }else {
            session.put("username",user.name);
            session.put("userID",user.id);
            Logger.info("用户["+controllers.Security.connected() + "] 已成功登陆");
            Home.index();
        }
    }
    public static void logout() throws Throwable {
       String userName = controllers.Security.connected();
        session.clear();
        response.removeCookie("rememberme");
        flash.success("secure.logout");
        Logger.info("用户["+userName+"] 已成功退出");
        redirect("/");
    }


}
