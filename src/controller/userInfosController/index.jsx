const isUserLoggedIn = () => {
    if (localStorage.getItem("userInfos")) {
        return true;
    } else {
        return false;
    }
}

const getUserId = () => {
    if (isUserLoggedIn()){
        return JSON.parse(localStorage.getItem("userInfos"))._id;
    }else{
        return undefined;
    }
}

export { isUserLoggedIn, getUserId };