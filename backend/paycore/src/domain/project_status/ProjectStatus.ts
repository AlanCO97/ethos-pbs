export class ProjectStatus {
    constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted: Date | null = null,
    ){}

    static fromDatabase(row: any): ProjectStatus {
        return new ProjectStatus(
            row.id.toString(),
            row.name,
            new Date(row.created_at),
            new Date(row.updated_at),
            row.deleted ? new Date(row.deleted) : null
        );
    }

    toPublicResponse() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}