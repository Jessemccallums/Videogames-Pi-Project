//important: Aqui esta la validacion de los campos
function validate(state, errorsState) {
    
    const errors = { ...errorsState };

    //document: validacion name
    if (!state.name) errors.name = 'Nombre Vacio';
    else if (!isNaN(state.name)) errors.name = 'No debe ser un numero';
    else if (state.name.length > 30) errors.name = 'Supera los 35 caracteres';
    else errors.name = '';

    //document: validacion de la descripcion

    if (!state.released) errors.released = 'Fecha de lanzamiento vacia';
    else errors.released = '';

    //document: validacion 

    //document: validacion del released

    if (!state.description) errors.description = 'descripcion vacia';
    else errors.description = '';


    //document: validacion background_image
    if (!state.background_image) errors.background_image = 'Imagen Vacio';
    else if (
        !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
            state.background_image,
        )
    )
        errors.background_image = 'URL no valida (falta http/https)';
    else errors.background_image = '';

   
    return errors;
}


module.exports={
    validate
}