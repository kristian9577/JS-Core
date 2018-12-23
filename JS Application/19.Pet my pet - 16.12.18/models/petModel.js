const petModel = (function () {
    let petUrl = `appdata/${storage.appKey}/pets`;

    const add = function (params) {

        let pet = {
            "name": params.name,
            "description": params.description,
            "imageURL": params.imageURL,
            "category": params.category,
            "likes": 0
        };
        return requester.post(petUrl, pet);
    };

    const myPets = function (userId) {
        let url = petUrl + `?query={"_acl.creator":"${userId}"}`;

        return requester.get(url);
    };
    const getPet = function (petId) {
        let url = petUrl + `/${petId}`;
        return requester.get(url);
    };
    const edit=function (params,currentPet) {
        let url=petUrl+`/${params.petId}`;
        let pet={
            "name":currentPet.name,
            "category":currentPet.category,
            "likes":currentPet.likes,
            "imageURL":currentPet.imageURL,
            "description":currentPet.description
        };
        return requester.put(url,pet)
    }
    const allPets = function(category) {
        let url;
        if (category) {
            url = petUrl + `?query={"category":"${category}"}&sort={"likes": -1}`;
        } else {
            url = petUrl + `?query={}&sort={"likes": -1}`;
        }

        return requester.get(url);
    };
    const like=function (currentPet) {
        let url = petUrl + `/${currentPet._id}`;
        let pet = {
            "name": currentPet.name,
            "category": currentPet.category,
            "likes": Number(+currentPet.likes + 1),
            "imageURL": currentPet.imageURL,
            "description": currentPet.description
        };
        return requester.put(url, pet);
    }
    const remove = function(petId) {
        let url = petUrl + '/' +petId;

        return requester.del(url);
    }


    return {
        add,
        myPets,
        getPet,
        edit,
        allPets,
        like,
        remove
    }
})();