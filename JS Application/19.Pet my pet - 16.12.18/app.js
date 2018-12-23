const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');
    this.before({except: {}}, function() {
        user.initializeLogin();
    });

    this.get('#/welcome', home.welcome);
    this.get('#/', home.index);
    this.get('#/pets/:category', home.index);

    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);

    this.get('#/logout', user.logout);

    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);

    this.get("#/add",pet.addGet);
    this.post("#/add",pet.addPost);

    this.get("#/myPets",pet.myPet);

    this.get('#/edit/:petId', pet.editGet);
    this.put('#/edit/:petId', pet.editPost);

    this.get('#/details/:petId', pet.details);

    this.get('#/like/:petId', pet.like);
    this.get('#/likeFromDetails/:petId', pet.likeFromDetails);

    this.get('#/delete/:petId', pet.deleteGet);
    this.post('#/delete/:petId', pet.deletePost);
});

$(function(){
    app.run('#/');
});