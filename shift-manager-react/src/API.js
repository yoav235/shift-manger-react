export const handleLogin = (onSuccess, isTrue, user) => {

    if (isTrue !== undefined) {
        onSuccess(user)
        return true;
    } else {
        alert("Invalid username or password");
        return false;
    }
}