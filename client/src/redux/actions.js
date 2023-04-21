export const ORDER = 'ORDER'

export const orderCards = (id) => {
    return {type: ORDER, payload: id}
}