export const handleLogin = async (onSuccess, isTrue, user) => {

    if (isTrue) {
        onSuccess(user)
        return true;
    } else {
        alert("Invalid username or password");
        return false;
    }
}