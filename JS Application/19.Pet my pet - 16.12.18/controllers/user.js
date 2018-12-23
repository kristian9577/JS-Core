const user = (function () {
    const getLogin = function (ctx) {
        if (userModel.isAuthorized()) {
            ctx.redirect('#/');
        }
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function (ctx) {
        var username = ctx.params.username;
        var password = ctx.params.password;

        if (username.length < 3) {
            notifications.showError('Username must be at least 3 symbols');
            return;
        } else if (password.length < 6) {
            notifications.showError('Password must be at least 6 symbols');
            return;
        }



        userModel.login(username, password)
            .done(function (data) {
                storage.saveUser(data);
                notifications.showInfo('Login successful!');
                ctx.redirect('#/');
            });
    };

    const logout = function (ctx) {
        userModel.logout().done(function () {
            storage.deleteUser();
            notifications.showInfo('Logout successful!');

            ctx.redirect('#/');
        });
    }

    const getRegister = function (ctx) {
        if (userModel.isAuthorized()) {
            ctx.redirect('#/');
        }
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function (ctx) {
        if (ctx.params.username.length < 3) {
            notifications.showError('Username must be at least 3 symbols');
            return;
        } else if (ctx.params.password.length < 6) {
            notifications.showError('Password must be at least 6 symbols');
            return;
        }

        userModel.register(ctx.params)
            .done(function (data) {
                storage.saveUser(data);
                notifications.showInfo('Register successful!');
                ctx.redirect('#/');
            });
    }

    const initializeLogin = function () {
        let userInfo = storage.getData('userInfo');

        if (userModel.isAuthorized()) {
            $('#welcomeUsername').text(userInfo.username);
            $('.navbar-dashboard').show();
            $('.navbar-anonymous').hide();
        } else {
            $('.navbar-dashboard').hide();
            $('.navbar-anonymous').show();
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());