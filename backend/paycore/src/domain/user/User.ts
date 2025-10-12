export class User {
    constructor(
        public id: string,
        public name: string,
        public paternalSurname: string,
        public maternalSurname: string | null = null,
        public email: string,
        public hashedPassword: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted: Date | null = null,
    ) {}

    get fullName(): string {
        return this.maternalSurname
            ? `${this.name} ${this.paternalSurname} ${this.maternalSurname}`
            : `${this.name} ${this.paternalSurname}`;
    }

    static create(
        name: string,
        paternalSurname: string,
        email: string,
        hashedPassword: string,
        maternalSurname?: string | null
    ): User {
        const now = new Date();
        return new User(
            '',
            name,
            paternalSurname,
            maternalSurname ?? null,
            email,
            hashedPassword,
            now,
            now,
            null
        );
    }

    static fromDatabase(row: any): User {
        return new User(
            row.id.toString(),
            row.name,
            row.paternal_surname,
            row.maternal_surname,
            row.email,
            row.hashed_password,
            new Date(row.created_at),
            new Date(row.updated_at),
            row.deleted ? new Date(row.deleted) : null
        );
    }

    toPublicResponse() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            fullName: this.fullName,
        };
    }
}