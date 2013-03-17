package controllers;

import play.mvc.Controller;
import play.mvc.With;

/**
 * Created with IntelliJ IDEA.
 * User: Cretu
 * Date: 13-3-17
 * Time: 下午4:53
 * To change this template use File | Settings | File Templates.
 */
@With(Secure.class)
public class Users extends Controller {
    public static void index(){
        renderText("XXXXXXXXXXXXXXXXXX");
    }
}
