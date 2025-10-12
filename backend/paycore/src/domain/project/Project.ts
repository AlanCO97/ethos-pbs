import { ProjectStatus } from "../project_status/ProjectStatus";

export class Project {
    constructor(
        public id: string,
        public name: string,
        public status: ProjectStatus,
        public createdAt: Date,
        public updatedAt: Date,
        public deleted: Date | null = null,
    ) {}


    static create(
        name: string,
        status: ProjectStatus
    ): Project {
        const now = new Date();
        return new Project(
            '',
            name,
            status,
            now,
            now,
            null
        );
    }

    static fromDatabase(row: any, status: ProjectStatus): Project {
        return new Project(
            row.id.toString(),
            row.name,
            status,
            new Date(row.created_at),
            new Date(row.updated_at),
            row.deleted ? new Date(row.deleted) : null
        );
    }

    toPublicResponse() {
        return {
            id: this.id,
            name: this.name,
            status: this.status.toPublicResponse()
        };
    }
}