export const handleLogin = (onSuccess, isTrue, user, shifts) => {

    if (isTrue !== undefined) {
        onSuccess(user, shifts)
        return true;
    } else {
        alert("Invalid username or password");
        return false;
    }
}