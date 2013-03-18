package controllers;

import play.mvc.*;

public class Application extends Controller {

    public static void index() {
        render();
    }

    @Check("admin")
    public static void secret() throws Throwable {
        renderText("这是一个需要授权才能访问的页面");
    }
}