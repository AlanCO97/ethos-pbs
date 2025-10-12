import { describe, it, expect } from "bun:test";
import { Project } from "../../../../domain/project/Project";
import { ProjectStatus } from "../../../../domain/project_status/ProjectStatus";

describe('Project Domain Entity', () => {
    describe('constructor', () => {
        it('Crear proyecto con status válido', () => {
            const status = new ProjectStatus('1', 'pendiente', new Date(), new Date());
            const project = Project.create('Proyecto X', status);

            expect(project.name).toBe('Proyecto X');
            expect(project.status).toBeInstanceOf(ProjectStatus);
            expect(project.status.name).toBe('pendiente');
            expect(project.id).toBe(''); // porque create inicializa vacío
            expect(project.deleted).toBeNull();
            expect(project.createdAt).toBeInstanceOf(Date);
            expect(project.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe('fromDatabase', () => {
        it('Crear proyecto desde fila de DB', () => {
            const status = new ProjectStatus('1', 'aprobado', new Date(), new Date());
            const row = {
                id: 42,
                name: 'Proyecto DB',
                created_at: '2025-10-12T14:00:00Z',
                updated_at: '2025-10-12T14:05:00Z',
                deleted: null
            };

            const project = Project.fromDatabase(row, status);

            expect(project.id).toBe('42');
            expect(project.name).toBe('Proyecto DB');
            expect(project.status).toBe(status);
            expect(project.createdAt.toISOString()).toBe('2025-10-12T14:00:00.000Z');
            expect(project.updatedAt.toISOString()).toBe('2025-10-12T14:05:00.000Z');
            expect(project.deleted).toBeNull();
        });

        it('fromDatabase convierte deleted si existe', () => {
            const status = new ProjectStatus('1', 'cancelado', new Date(), new Date());
            const row = {
                id: 43,
                name: 'Proyecto Eliminado',
                created_at: '2025-10-12T14:00:00Z',
                updated_at: '2025-10-12T14:05:00Z',
                deleted: '2025-10-12T15:00:00Z'
            };

            const project = Project.fromDatabase(row, status);

            expect(project.deleted).toBeInstanceOf(Date);
            expect(project.deleted?.toISOString()).toBe('2025-10-12T15:00:00.000Z');
        });
    });

    describe('toPublicResponse', () => {
        it('Debe retornar la respuesta pública correcta', () => {
            const status = new ProjectStatus('1', 'pendiente', new Date(), new Date());
            const project = Project.create('Proyecto Response', status);

            const response = project.toPublicResponse();

            expect(response.id).toBe(project.id);
            expect(response.name).toBe('Proyecto Response');
            expect(response.status.id).toBe(status.id);
            expect(response.status.name).toBe('pendiente');
        });
    });
});