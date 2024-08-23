import { z } from "zod";

const nameSchema = z
  .string({ message: "Organization name is required" })
  .min(1, {
    message: "Organization name is required",
  })
  .min(5, {
    message: "Organization name must be at least 5 characters",
  });
const nameIdSchema = z
  .string({ message: "Organization name ID is required" })
  .min(1, {
    message: "Organization name ID is required",
  })
  .min(5, {
    message: "Organization name ID must be at least 5 characters",
  });
const activateSchema = z.boolean();
const connectApiSchema = z.boolean();
const dbNameSchema = z.union([z.literal("default"), z.literal("db2")], {
  message: "Database instance is required",
});
const orgCategorySchema = z.union([
  z.literal("production"),
  z.literal("demo"),
  z.literal("sandbox"),
  z.literal("other"),
]);
const firstUserNameSchema = z
  .string({
    message: "First user name is required",
  })
  .min(1, {
    message: "First user name is required",
  })
  .min(5, {
    message: "First user name must be at least 5 characters",
  });
const firstUserEmailSchema = z
  .string({ message: "First user email is required" })
  .email({
    message: "First user email is invalid",
  });

const createOrganizationSchema = z.object({
  name: nameSchema,
  nameId: nameIdSchema,
  activate: activateSchema.optional(),
  connectNewApi: connectApiSchema.optional(),
  dbName: dbNameSchema.optional(),
  orgCategory: orgCategorySchema.optional(),
  firstUserName: firstUserNameSchema.optional(),
  firstUserEmail: firstUserEmailSchema.optional(),
});

export {
  createOrganizationSchema,
  nameSchema,
  nameIdSchema,
  activateSchema,
  connectApiSchema,
  dbNameSchema,
  orgCategorySchema,
  firstUserNameSchema,
  firstUserEmailSchema,
};

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
