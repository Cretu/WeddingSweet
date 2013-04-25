package controllers;

import models.User;
import play.Play;
import play.libs.Files;
import play.libs.MimeTypes;
import play.mvc.With;

import java.io.File;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-17
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
@With(Secure.class)
public class Users extends CRUD {
    static Logger logger = Logger.getLogger("User");

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
    @Check("user")
    public static void changePwd(){
        String id = session.get("userID");
        User user = User.findById(Long.valueOf(id));
        render(user);
    }
    @Check("user")
    public static String doChangePwd(){
        String id = session.get("userID");
        User user = User.findById(Long.valueOf(id));
        user.password = params.get("password");
        String info = null;
        try {
            user.save();
            info = "密码修改成功";
        }catch (Exception e){
            info = e.getLocalizedMessage()+"密码修改失败";
        }
        return info;
    }
    @Check("user")
    public static String checkOldPwd(String pwd){
        Long id = Long.valueOf(session.get("userID"));
        return User.find("byIdAndPassword",id,pwd).first()==null?"false":"true";
    }
    @Check("user")
    public static void avatar(String avatarURL){
		if(new File("public/upload/user_"+session.get("userID")+".jpg").exists()){
			avatarURL = "/public/upload/user_"+session.get("userID")+".jpg";
		}
		if (avatarURL == null){
			avatarURL = "/public/upload/user_null.jpg";
		}
        render(avatarURL);
    }
    @Check("user")
    public static void saveAvatar(File avatar){
        String avatarMimeType = MimeTypes.getContentType(avatar.getName());
        logger.info(avatarMimeType);
        String saveFileName = "";
        if (avatar.length()>Long.valueOf(Play.configuration.getProperty("avatarMaxSize"))*1024){
            flash.error("文件过大");
        }else if (Play.configuration.getProperty("allowTypes").indexOf(avatarMimeType)==-1){
            flash.error("不允许的类型");
        }else{
            saveFileName = "/public/upload/user_"+session.get("userID")+avatar.getName().substring(avatar.getName().lastIndexOf('.'));
            Files.copy(avatar, Play.getFile(saveFileName));
        }
       avatar(saveFileName);
    }
}
