import * as z from "zod";

export const FormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Mínimo de 3 caracteres de longitud" })
    .max(20, { message: "Máximo de 20 caracteres de longitud" }),
  password: z
    .string()
    .min(8, { message: "El password debe tener 8 caracteres de longitud" }),
});
