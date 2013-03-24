package controllers;

import play.cache.Cache;
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
}
