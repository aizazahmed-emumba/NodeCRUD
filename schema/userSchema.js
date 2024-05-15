import * as yup from 'yup';

export const createUserSchema = yup.object({
    body: yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: yup.string().notRequired(),
        hobbies: yup.array().of(yup.string()).required(),
}),
params : yup.mixed().notRequired(),
query : yup.mixed().notRequired(),
});

export const getUserByIdSchema = yup.object({
    body: yup.mixed().notRequired(),
    params: yup.object({
        id: yup.string().length(24).required(),
    }),
    query: yup.mixed().notRequired(),
});


export const updateUserSchema = yup.object({
    body: yup.object({
        name: yup.string().notRequired(),
        email: yup.string().email().notRequired(),
        password: yup.string().notRequired(),
        role: yup.string().notRequired(),
        hobbies: yup.array().of(yup.string()).notRequired(),
}),
params : yup.object({
    id: yup.string().length(24).required(),
}),
});


export const deleteUserSchema = yup.object({
    body: yup.mixed().notRequired(),
    params: yup.object({
        id: yup.string().length(24).required(),
    }),
    query: yup.mixed().notRequired(),
})