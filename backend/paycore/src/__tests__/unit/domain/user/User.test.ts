import { describe, it, expect } from 'bun:test';
import { User } from '../../../../domain/user/User';

describe('User Domain Entity', () => {
    describe('constructor', () => {
        it('Crear usuario con data valida', async () => {
            
            const hashedPassword = await Bun.password.hash('password123')
            
            const userData = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: 'González',
                email: 'juan@example.com',
            };


            const user = User.create(
                userData.name,
                userData.paternalSurname,
                userData.email,
                hashedPassword,
                userData.maternalSurname
            );

            expect(user.paternalSurname).toBe('Pérez');
            expect(user.maternalSurname).toBe('González');
            expect(user.email).toBe('juan@example.com');
            expect(user.fullName).toBe('Juan Pérez González');
            expect(user.hashedPassword).toBe(hashedPassword);
        });

        it('Crear Usuario sin apellido materno', async () => {
            const userData = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: null,
                email: 'juan@example.com',
                password: 'password123',
            };

            const hashedPassword = await Bun.password.hash(userData.password)

            const user = User.create(
                userData.name,
                userData.paternalSurname,
                userData.email,
                hashedPassword,
                userData.maternalSurname
            );

            expect(user.fullName).toBe('Juan Pérez');
        });
    });
});