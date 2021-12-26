var Authorization = {
    vars: {
        lowin: document.querySelector('.lowin'),
        lowin_brand: document.querySelector('.lowin-brand'),
        lowin_wrapper: document.querySelector('.lowin-wrapper'),
        lowin_login: document.querySelector('.lowin-login'),
        lowin_wrapper_height: 0,
        login_back_link: document.querySelector('.login-back-link'),
        forgot_link: document.querySelector('.forgot-link'),
        login_link: document.querySelector('.login-link'),
        login_btn: document.querySelector('.login-btn'),
        reg_btn: document.querySelector('.reg-btn'),
        register_link: document.querySelector('.register-link'),
        password_group: document.querySelector('.password-group'),
        password_group_height: 0,
        lowin_register: document.querySelector('.lowin-register'),
        lowin_footer: document.querySelector('.lowin-footer'),
        box: document.getElementsByClassName('lowin-box'),
        option: {}
    },
    register(e) {
        Authorization.vars.lowin_login.className += ' lowin-animated';
        setTimeout(() => {
            Authorization.vars.lowin_login.style.display = 'none';
        }, 500);
        Authorization.vars.lowin_register.style.display = 'block';
        Authorization.vars.lowin_register.className += ' lowin-animated-flip';

        Authorization.setHeight(Authorization.vars.lowin_register.offsetHeight + Authorization.vars.lowin_footer.offsetHeight);
        Authorization.vars.lowin_register.querySelector('form').setAttribute('action', Authorization.vars.option.reg_url);
        console.log("注册");
        e.preventDefault();
    },
    login(e) {
        Authorization.vars.lowin_register.classList.remove('lowin-animated-flip');
        Authorization.vars.lowin_register.className += ' lowin-animated-flipback';
        Authorization.vars.lowin_login.style.display = 'block';
        Authorization.vars.lowin_login.classList.remove('lowin-animated');
        Authorization.vars.lowin_login.className += ' lowin-animatedback';
        setTimeout(() => {
            Authorization.vars.lowin_register.style.display = 'none';
        }, 500);

        setTimeout(() => {
            Authorization.vars.lowin_register.classList.remove('lowin-animated-flipback');
            Authorization.vars.lowin_login.classList.remove('lowin-animatedback');
        }, 1000);

        Authorization.setHeight(Authorization.vars.lowin_login.offsetHeight + Authorization.vars.lowin_footer.offsetHeight);
        console.log("登录");
        e.preventDefault();
    },
    forgot(e) {
        Authorization.vars.password_group.classList += ' lowin-animated';
        Authorization.vars.password_group.style.visibility = "hidden";
        Authorization.vars.login_back_link.style.display = 'block';
        setTimeout(() => {
            Authorization.vars.login_back_link.style.opacity = 1;
            Authorization.vars.password_group.style.height = 0;
            Authorization.vars.password_group.style.margin = 0;
        }, 100);

        Authorization.vars.login_btn.innerText = '忘记密码';

        Authorization.setHeight(Authorization.vars.lowin_wrapper_height - Authorization.vars.password_group_height);
        Authorization.vars.lowin_login.querySelector('form').setAttribute('action', Authorization.vars.option.forgot_url);
        console.log("忘记密码");
        e.preventDefault();
    },
    loginback(e) {
        Authorization.vars.password_group.style.visibility = "";
        Authorization.vars.password_group.classList.remove('lowin-animated');
        Authorization.vars.password_group.classList += ' lowin-animated-back';
        Authorization.vars.password_group.style.display = 'block';
        setTimeout(() => {
            Authorization.vars.login_back_link.style.opacity = 0;
            Authorization.vars.password_group.style.height = Authorization.vars.password_group_height + 'px';
            Authorization.vars.password_group.style.marginBottom = 30 + 'px';
        }, 100);

        setTimeout(() => {
            Authorization.vars.login_back_link.style.display = 'none';
            Authorization.vars.password_group.classList.remove('lowin-animated-back');
        }, 1000);

        Authorization.vars.login_btn.innerText = '登 录';
        Authorization.vars.lowin_login.querySelector('form').setAttribute('action', Authorization.vars.option.login_url);

        Authorization.setHeight(Authorization.vars.lowin_wrapper_height);
        console.log("返回登录");
        e.preventDefault();
    },
    setHeight(height) {
        Authorization.vars.lowin_wrapper.style.minHeight = height + 'px';
    },
    brand() {
        Authorization.vars.lowin_brand.classList += ' lowin-animated';
        setTimeout(() => {
            Authorization.vars.lowin_brand.classList.remove('lowin-animated');
        }, 1000);
    },
    init(option) {
        Authorization.setHeight(Authorization.vars.box[0].offsetHeight + Authorization.vars.lowin_footer.offsetHeight);

        Authorization.vars.password_group.style.height = Authorization.vars.password_group.offsetHeight + 'px';
        Authorization.vars.password_group_height = Authorization.vars.password_group.offsetHeight;
        Authorization.vars.lowin_wrapper_height = Authorization.vars.lowin_wrapper.offsetHeight;

        Authorization.vars.option = option;
        Authorization.vars.lowin_login.querySelector('form').setAttribute('action', option.login_url);

        let len = Authorization.vars.box.length - 1;

        for (let i = 0; i <= len; i++) {
            if (i !== 0) {
                Authorization.vars.box[i].className += ' lowin-flip';
            }
        }

        Authorization.vars.forgot_link.addEventListener("click", (e) => {
            Authorization.forgot(e);
        });

        Authorization.vars.register_link.addEventListener("click", (e) => {
            Authorization.brand();
            Authorization.register(e);
        });

        Authorization.vars.login_link.addEventListener("click", (e) => {
            Authorization.brand();
            Authorization.login(e);
        });

        Authorization.vars.login_back_link.addEventListener("click", (e) => {
            Authorization.loginback(e);
        });
        console.log("初始化");
    }
}