const pet = (function () {
    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/welcome');
            return;
        }
        ctx.partial("views/pet/create.hbs");
    };
    const addPost = function (ctx) {
        if (!ctx.params.name || !ctx.params.description || !ctx.params.imageURL || !ctx.params.category) {
            notifications.showError("Please fill the fields!");
            return;
        }
        petModel.add(ctx.params).done(function () {
            notifications.showInfo("Pet created.");
            ctx.redirect('#/')
        })
    };

    const myPet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
            return;
        }
        let userId = storage.getData('userInfo').id;
        petModel.myPets(userId)
            .done(function (pets) {
                ctx.pets = pets;
                ctx.partial('views/pet/myPets.hbs')
            })
    };

    const editGet = function (ctx) {
        petModel.getPet(ctx.params.petId)
            .done(function (pet) {
                if (pet._acl.creator !== storage.getData('userInfo').id) {
                    notifications.showError('You can only edit your own pets');
                    ctx.redirect('#/details/' + pet._id);
                    return;
                }
                ctx.pet = pet;
                ctx.partial = ('views/edit/edit.hbs');
            });
    };

    const editPost=function (ctx) {
        if(!ctx.params.description){
            notifications.showInfo('Please fill the fields.');
            return;
        }
      petModel.getPet(ctx.params.petId)
          .done(function (currentPet) {
              petModel.edit(ctx.params,currentPet)
                  .done(function () {
                      notifications.showInfo('Updated successful.');
                      ctx.redirect('#/details/'+ctx.params.petId);
                  })
          })

    };
    const details = function (ctx) {

        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');

            return;
        }


        petModel.getPet(ctx.params.petId)
            .done(function (pet) {

                if (pet._acl.creator === storage.getData('userInfo').id) {
                    ctx.redirect('#/edit/' + pet._id);
                    return;
                }

                ctx.pet = pet;
                ctx.partial('views/pet/details.hbs');

            });

    };
    const like=function (ctx) {
        petModel.getPet(ctx.params.petId)
            .done(function (pet) {
                if(pet._acl.creator ===storage.getData('userInfo').id){
                    notifications.showError('You cannot pet your own pets');
                    return;
                }
                petModel.like(pet)
                    .done(function () {
                        notifications.showInfo('Pet successful');
                        ctx.redirect('#/');
                    })
            })
    };
    const likeFromDetails=function (ctx) {
        petModel.getPet(ctx.params.petId)
            .done(function (pet) {
                if(pet._acl.creator ===storage.getData('userInfo').id){
                    notifications.showError('You cannot pet your own pets');
                    return;
                }
                petModel.like(pet)
                    .done(function() {
                        notifications.showInfo('Pet succesfully.');
                        ctx.redirect('#/details/' + pet._id);
                    })
            })
    }
    const deleteGet = function(ctx) {
        petModel.getPet(ctx.params.petId)
            .done(function(pet) {
                if (pet._acl.creator !== storage.getData('userInfo').id) {
                    notifications.showError('You can only delete your own pets!');
                    ctx.redirect('#/details/' + pet._id);
                    return;
                }

                ctx.pet = pet;
                ctx.partial('views/pet/delete.hbs');
            })
    }
    const deletePost = function (ctx) {
        petModel.remove(ctx.params.petId)
            .done(function () {
                notifications.showInfo('Pet removed successfully!');
                ctx.redirect('#/');
            })
    }


    return {
        addGet,
        addPost,
        myPet,
        editGet,
        editPost,
        details,
        like,
        likeFromDetails,
        deleteGet,
        deletePost
    }
})();