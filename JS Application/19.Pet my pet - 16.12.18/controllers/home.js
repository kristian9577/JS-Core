const home = (function () {
    const index = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/welcome')

            return;
        }

        petModel.allPets(ctx.params.category)
            .done(function (pets) {

                ctx.pets = pets.filter(p=>p._acl.creator !== storage.getData('userInfo').id);

                ctx.partial('views/home/index.hbs');
            });

    };

    const welcome = function(ctx) {
        if (userModel.isAuthorized()) {
            ctx.redirect('#/');

            return;
        }

        ctx.partial('views/home/welcome.hbs');
    }

    return {
        index,
        welcome
    };
}());