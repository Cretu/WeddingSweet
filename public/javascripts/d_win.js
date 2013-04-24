var win = {
    tipsbase: '',
    tipsname: {
        bg: 'bg_x_1_0.png',
        ld: 'ajaxloader.gif',
        ok: 'ok.png',
        warn: 'dialog/b1.png',
        close: 'CloseDialog.gif'
    },
    tips: function (n) { return win.tipsbase + win.tipsname[n]; },
    consts: { ok: '__winbox_ok_btn', cancel: '__winbox_cancel_btn' },
    objs: function (n) {
        switch (n) {
            case 'body': return $('#WinBox');
            case 'border': return $('#WinBorder');
            case 'bg': return $('#CoverBox');
        }
        return null;
    },
    __win_close_timeout: '',
    __win_resize_timer: '',
    wait: function () {
        win.create({ cover: true, width: 450, html: '<span style="display:block;margin-left:50px;height:25px;line-height:25px;background:url(' + win.tips('ld') + ') left center no-repeat;padding-left:18px;">请稍后。。。</span>' });
    },
    close: function () {
        $('#WinBox,#CoverBox,#WinBorder').remove();
        win.reset();
    },
    reset: function () {
        window.clearTimeout(win.__win_close_timeout);
        window.clearInterval(win.__win_resize_timer);
    },
    resize: function () {
        var obj = win.objs('border'), box = win.objs('body');
        var w = box[0].offsetWidth + 20, h = box[0].offsetHeight + 20;
        if (obj.length > 0) {
            if (obj.width() != w || obj.height() != h)
                obj.css({ width: w, height: h });
        }
    },
    create: function (options) {
        var winbody = $(document.body);
        if ($("#CoverBox").length == 0 && options.cover == true) {
            $('<div id="CoverBox"></div>').appendTo(winbody);
            if (!options.modal)
                $("#CoverBox").click(win.close);
        }
        if ($("#WinBox").length == 0)
            $('<div id="WinBox"></div>').appendTo(winbody);
        $('#WinBox').css({ width: options.width });
        if ($("#WinBorder").length == 0)
            $('<div id="WinBorder"></div>').appendTo(winbody);
        if (options.html.responseText)
            $("#WinBox").html(options.html.responseText);
        else
            $("#WinBox").html(options.html);
        win.resize();
        $(document.body).unbind('keyup').keyup(function (e) { if (e.which == 27 && !options.modal) { win.close(); } });
    },
    alert: function (options) {
        var defaults = { title: '提示', content: '', width: 450, cover: false, btntype: 'none', timeout: 0 };
        options = $.extend(defaults, options);
        var html = '<div style="margin:5px 10px 5px 50px;line-height:30px;font-size:14px;background:url(' + win.tips('ok') + ') no-repeat;padding-left:36px;">' + options['content'] + '</div>';
        win.show({ title: options.title, content: html, width: options.width, cover: options.cover, btntype: options.btntype, timeout: options.timeout, modal: options.modal });
    },
    warn: function (options) {
        var defaults = { title: '提示', content: '', width: 450, cover: false, btntype: 'ok', timeout: 0 };
        options = $.extend(defaults, options);
        var html = '<div style="margin:5px 10px 5px 50px;line-height:46px;font-size:14px;background:url(' + win.tips('warn') + ') no-repeat;padding-left:46px;">' + options['content'] + '</div>';
        win.show({ title: options.title, content: html, width: options.width, cover: options.cover, btntype: options.btntype, timeout: options.timeout, modal: options.modal });
    },
    confirm: function (options) {
        if (arguments.length > 1) {
            var data = {};
            data.content = arguments[0];
            data.ok = arguments[1];
            options = data;
        }
        var defaults = { title: '请确认', content: '', width: 450, cover: false, btntype: 'confirm', timeout: 0 };
        options = $.extend(defaults, options);
        var html = '<div style="margin:5px 10px 5px 50px;line-height:50px;font-size:14px;background:url(' + win.tips('warn') + ') no-repeat;padding-left:50px;">' + options['content'] + '</div>';
        options.content = html;
        win.show(options);
    },
    show: function (options) {
        var defaults = { url: '', title: '', content: '', ready: null, ok: win.close, cancel: win.close, timeout: 0, btntype: 'ok', btns: null, width: 600, cover: true, modal: false };
        options = $.extend(defaults, options);
        var url = options.url, content = options.content, title = options.title;

        var doafter = function () {//当内容就绪后执行
            if (title != '') {
                content = SetWinTitle(title) + content;
            }
            if (options.btntype != 'none') {
                content += '<div id="btnlist" class="m_10 txt_center">';
                if (options.btntype != 'diy')
                    content += '<input type="button" id="' + win.consts.ok + '" value="确 定" class="submitbtn submitbtn_s"/>';
                if (options.btntype == 'confirm')
                    content += '<input type="button" value="取 消" id="' + win.consts.cancel + '" class="submitbtn submitbtn_s m_l_10"/>';
                content += '</div>';
            }
            options.html = content;
            win.create(options);
            //添加附加按钮
            if (options.btns != null) {
                for (var i = 0; i < options.btns.length; i++) {
                    var btn = options.btns[i];
                    var input_btn = $('<input type="button"/>');
                    for (var attr in btn) {
                        if (attr != 'click')
                            input_btn.attr(attr, btn[attr]);
                    }
                    input_btn.addClass('m_l_10');
                    if (btn.click) {
                        input_btn.click(btn.click);
                    }
                    $('#btnlist').append(input_btn);
                }
            }
            if (options.ready) {
                options.ready();
            }
            if (options.ok) {
                $('#' + win.consts['ok']).click(options.ok);
            }
            $('#' + win.consts['cancel']).click(options.cancel);

            win.reset();
            if (options.timeout > 0) {
                win.__win_close_timeout = setTimeout(win.close, options.timeout);
            }
            win.__win_resize_timer = window.setInterval(win.resize, 100);
        }
        var via_ajax = false;
        if (url != '') {
            if (url.indexOf('#') > -1) {
                content = $(url).html();
            } else {
                win.wait();
                via_ajax = true;
                $.get(url + (url.indexOf('?') > -1 ? "&t=" : "?t=" + Math.random()), function (data) {
                    content = data;
                    //console.log('html ready');
                    doafter();
                });
            }
        }
        if (!via_ajax) { doafter(); }
    }
};

//在莫窗口中打开传入的网站页面
//url：要在莫窗口中打开打开的页面地址
function OpenWin(url, callback, options) {
    var isurl = false;
    var defaults = { ready: null, timeout: 0, btntype: 'none' };
    options = $.extend(defaults, options);
    if (callback) {
        options.ready = callback;
    }
    if (typeof url == 'object') {
        options.content = url.html;
        win.show(options);
    } else if (url == "") {
        return;
    } else if (url.indexOf('#') > -1) {
        options.content = dg(url.replace('#', '')).innerHTML;
        win.show(options);
    } else {
        isurl = true;
        win.wait();
        var myAjax = Request.sendGET(
            url + (url.indexOf('?') > -1 ? "&t=" : "?t=" + Math.random()),
            "",
            function (html) {
                options.content = html.responseText;
                win.show(options);
            }
        );
    }
}
//设置title
function SetWinTitle(title) {
    return '<div style="background:url(' + win.tips('bg') + ') repeat-x;height:30px;line-height:30px;padding-left:10px;margin-top:-5px;"><span style="cursor:pointer;float:right;background:url(' + win.tips('close') + ') no-repeat left center;width:15px;height:30px;" onclick="CloseWin();"></span><strong>' + title + '</strong></div>';
}

//{标题，消息内容，是否需要按钮，是否显示错误图标，自动关闭的毫秒数}
function Alert(options) {
    if (typeof (options) == 'string') {
        options = { msg: options };
    }
    var defaults = { title: '提示', msg: '', btn: true, err: false, timeout: 0 };
    options = $.extend(defaults, options);
    var html = '<div style="margin:5px 10px 5px 50px;font-size:14px;background:url(';
    if (!options.err) {
        html += win.tips('ok') + ') no-repeat;padding-left:36px;line-height:30px;">';
    } else {
        html += win.tips('warn') + ') no-repeat;padding-left:50px;line-height:48px;">';
    }
    html += options.msg + '</div>'

    var params = { title: options.title, content: html, timeout: options.timeout, btntype: '' };
    if (options.btn == false)
        params['btntype'] = 'none';
    win.show(params);
}
//{标题，消息内容,回调方法}
function Confirm(options) {
    var defaults = { title: '提示', msg: '', callback: null };
    var settings;
    if (arguments.length > 1) {
        var i = 0;
        settings = {};
        for (var key in defaults) {
            settings[key] = arguments[i];
            i++;
        }
    } else {
        settings = options;
    }
    options = $.extend(defaults, settings);
    var html = '<div style="margin:5px 10px 5px 50px;line-height:48px;font-size:14px;background:url(' + win.tips('warn') + ') no-repeat;padding-left:50px;">' + options.msg + '</div>';
    win.show({
        title: options.title,
        content: html,
        btntype: 'confirm',
        ok: options.callback
    });
}


//创建莫窗口
function CreateWin() {
    if (!dg("CoverBox")) { ChangeCoverBox(); }
    if (!dg("WinBox")) {
        var winBox = document.createElement("div");
        winBox.setAttribute("id", "WinBox");
        document.body.appendChild(winBox);
    }
    if (!dg("WinBorder")) {
        var winBorder = document.createElement("div");
        winBorder.setAttribute("id", "WinBorder");
        document.body.appendChild(winBorder);
    }
}

function Win(html) {
    CreateWin();
    if (html.responseText)
        dg("WinBox").innerHTML = html.responseText;
    else
        dg("WinBox").innerHTML = html;
}

function ChangeHeight() {
    if (dg("WinBorder")) {
        //dg("WinBox").style.width = (dg("WinBox").offsetWidth + (! -[1, ] ? -250 : 0)) + "px";
        dg("WinBorder").style.width = (dg("WinBox").offsetWidth + 20) + "px";
        dg("WinBorder").style.height = (dg("WinBox").offsetHeight + 20) + "px";
    }
}

//关闭莫窗口
function CloseWin() { win.close(); }

function ChangeCoverBox() {
    if (dg("CoverBox")) {
        document.body.removeChild(dg("CoverBox"));
    }
    else {
        var coverBox = document.createElement("div");
        document.body.appendChild(coverBox);
        coverBox.id = 'CoverBox';
        coverBox.onclick = function () { CloseWin(); }
    }
}
