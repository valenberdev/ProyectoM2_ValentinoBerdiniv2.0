const supertest = require("supertest");
const app = require("../src/app");
const request = supertest(app);

jest.mock('../src/db/pool.js');
const pool = require('../src/db/pool');

test('Deberia entregar todos los autores', async () => { 
    pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ana', email: 'ana@test.com', bio: 'test'}]});
    const response = await request.get('/authors');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'Ana', email: 'ana@test.com', bio: 'test' }])
 });

 test('Deberia crear un autor', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 4, name: 'Test', email: 'test@test.com', bio: 'test' }] });
    const response = await request.post('/authors').send({ name: 'Test', email: 'test@test.com', bio: 'test' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 4, name: 'Test', email: 'test@test.com', bio: 'test' }); 
});

test('Deberia mostrar el autor del id especificado', async () => {
    pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Ana', email: 'ana@test.com', bio: 'test' }] });
    const response = await request.get('/authors/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Ana', email: 'ana@test.com', bio: 'test' })
});

test('Deberia decir que no se encontro ningun usuario con ese id', async () => {
    pool.query.mockResolvedValue({ rows: [] });
    const response = await request.get('/authors/99');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Autor no encontrado' });
});

test('Deberia decir que faltaron campos obligatorios', async () => {
    const response = await request.post('/authors').send({ id: 5, name: 'test', email: '', bio: 'test' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Faltan campos requeridos'})
});

test('Deberia decir que no hay un autor con ese id para eliminar', async () => {
    pool.query.mockResolvedValue({ rows: [] });
    const response = await request.delete('/authors/99');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Autor no encontrado'});
});