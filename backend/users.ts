export class User {
    constructor(public email: string,
                public name: string,
                private password: string) {}

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password
    }
}

export const users: {[key: string]: User} = {
    'tav.dev@gmail.com': new User('tav.dev@gmail.com', 'Tav', 'tavpass'),
    'tai@gmail.com': new User('tai@gmail.com', 'Tai', 'taipass')
}
