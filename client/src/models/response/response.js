
export default function Respons(accessToken, refreshToken, user) {
    return {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
}