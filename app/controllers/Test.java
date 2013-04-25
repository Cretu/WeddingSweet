package controllers;

import play.Play;
import play.libs.Files;
import play.libs.MimeTypes;
import play.mvc.Controller;

import java.io.File;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-4-24
 * Time: 下午2:25
 * To change this template use File | Settings | File Templates.
 */
public class Test extends Controller {
    static Logger logger = Logger.getLogger("Test");

    public static void avatar() {
        render();
    }
    public static String saveAvatar(File avatar){
        String avatarMimeType = MimeTypes.getContentType(avatar.getName());
        logger.info(avatarMimeType);
        String saveFileName = "";
        if (avatar.length()>Long.valueOf(Play.configuration.getProperty("avatarMaxSize"))*1024){
            flash.error("文件过大");
        }else if (Play.configuration.getProperty("allowTypes").indexOf(avatarMimeType)==-1){
            flash.error("不允许的类型");
        }else{
            saveFileName = "public/upload/user_"+session.get("userID")+avatar.getName().substring(avatar.getName().lastIndexOf('.'));
            Files.copy(avatar, Play.getFile(saveFileName));
        }
       return avatarMimeType;
    }

    public static void d_win() {
        render();
    }
}
