const sesssionIdToUserMap = new Map();

function setUser(id, user){
    sesssionIdToUserMap.set(id, user)
}

function getUser(id){
    return sesssionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}