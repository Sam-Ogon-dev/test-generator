import User from "../domain/User";

export default interface Repository {
    saveRefreshToken(refreshToken: string): void
    saveUser(user: User): void
}
