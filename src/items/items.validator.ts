import z from 'zod';

export const createItemSchema = z.object({
  name: z
    .string('Please enter a name!')
    .trim()
    .nonempty('Please enter a name!')
    .max(30, "Name can't exceed 30 characters!")
    .meta({ examples: ['iPhone 18 Pro Max'] }),
  description: z
    .string('Please enter a description!')
    .trim()
    .nonempty('Please enter a description!')
    .max(100, "Description can't exceed 100 characters!")
    .meta({ examples: ['iPhone 18 Pro Max RAM 32 GB Storage 2 TB Burgundy'] }),
  price: z.coerce
    .number('Please enter a price!')
    .min(1, 'Minimum price is 1!')
    .meta({ examples: [18000000] }),
  stock: z.coerce
    .number('Please enter a stock!')
    .min(0, 'Minimum stock is 0!')
    .meta({ examples: [100] }),
});

export const updateItemSchema = createItemSchema.partial();

export const idSchema = z.coerce
  .number('Please enter an id!')
  .positive('Must be positive!')
  .meta({ examples: [1] });

export const querySchema = z.object({
  cursor: z.coerce
    .number('Please enter a number!')
    .positive('Must be positive!')
    .optional(),
  keyword: z
    .string('Please enter a keyword!')
    .trim()
    .nonempty('Please enter a keyword!')
    .max(30, "Keyword can't exceed 30 characters!")
    .optional(),
});

export type QuerySchema = z.infer<typeof querySchema>;
