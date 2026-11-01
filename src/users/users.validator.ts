import z from 'zod';

export const createUserSchema = z.object({
  name: z
    .string('Please enter a name!')
    .trim()
    .nonempty('Please enter a name!')
    .max(30, "Name can't exceed 30 characters!")
    .meta({ examples: ['ricky'] }),
  password: z
    .string('Please enter a password!')
    .nonempty('Please enter a password!')
    .min(8, 'Minimum password length is 8 characters!')
    .max(30, "Password can't exceed 30 characters!")
    .meta({ examples: ['halo1234'] }),
  email: z
    .email('Please enter a valid email!')
    .trim()
    .nonempty('Please enter an email!')
    .max(100, "Email can't exceed 100 characters!")
    .meta({ examples: ['ricky123@gmail.com'] }),
});

export const loginUserSchema = z.object({
  password: z
    .string('Please enter a password!')
    .nonempty('Please enter a password!')
    .meta({ examples: ['halo1234'] }),
  email: z
    .email('Please enter a valid email!')
    .trim()
    .meta({ examples: ['ricky@gmail.com'] }),
});
