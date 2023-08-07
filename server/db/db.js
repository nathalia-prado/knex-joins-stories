import connection from './connection.js'

export async function getWombles() {
    const result = await connection('wombles').select()
    return result
}