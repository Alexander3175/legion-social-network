export default function User(email, isActivated, id) {
    return {
        id: id,
        email: email,
        isActivated: isActivated,
    };
}