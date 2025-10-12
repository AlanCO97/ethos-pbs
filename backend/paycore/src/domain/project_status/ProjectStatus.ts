export class ProyectStatus {
    constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted: Date | null = null,
    ){}

    static fromDatabase(row: any): ProyectStatus {
        return new ProyectStatus(
            row.id.toString(),
            row.name,
            new Date(row.created_at),
            new Date(row.updated_at),
            row.deleted ? new Date(row.deleted) : null
        );
    }
}