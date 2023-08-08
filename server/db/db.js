import connection from './connection.js'

export async function getWombles() {
    const result = await connection('wombles').select()
    return result
}

export async function getWombleById(id) {
    const result = await connection('wombles')
        .join('traits', 'wombles.trait_id', 'traits.id')
        .where('wombles.id', id)
        .select('wombles.name', 'traits.description')
    return result
}