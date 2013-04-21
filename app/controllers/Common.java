package controllers;

import models.User;
import play.cache.Cache;
import play.libs.Codec;
import play.libs.Images;
import play.mvc.Controller;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-24
 * Time: 下午1:07
 * To change this template use File | Settings | File Templates.
 */
public class Common extends Controller{
    public static void captcha(String id) {
        Images.Captcha captcha = Images.captcha();
        captcha.addNoise();
        String code = captcha.getText("#000FFF",4);
        Cache.set(id, code, "3mn");
        session.put("captchaID",id);
        renderBinary(captcha);
    }
    public static void checkCaptcha(String captcha){
        renderText(Cache.get(session.get("captchaID")).toString().equalsIgnoreCase(captcha)?"true":"false");
    }

    public static void logout(){
        try {
            Secure.logout();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
    public static void login(){
//        if (session.get("username")!= null){
//            Home.index();
//        }//取消，由页面进行处理并跳转
        render();
    }

    public static void register(){
        String randomID = Codec.UUID();
        render(randomID);
    }

    public static void regist(){
        User user = new User();
        user.email = params.get("email");
        user.password = params.get("password");
        user.age = 0;
        user.name = "无名";
		user.role = "user";
        user.save();
        redirect("/login");
    }
    public static void checkEmailExist(String email){
        if(User.find("byEmail",email).first()!=null){
            renderText("true");
        }else {
            renderText("false");
        }
    }
}
