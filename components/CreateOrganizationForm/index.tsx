import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Input,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";

import {
  activateSchema,
  type CreateOrganizationInput,
  dbNameSchema,
  firstUserEmailSchema,
  firstUserNameSchema,
  nameIdSchema,
  nameSchema,
  orgCategorySchema,
} from "@/schemas";
import { createOrganization } from "@/actions/organization";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
};

export function CreateOrganizationForm({
  isOpen,
  onOpenChange,
  onClose,
}: Props) {
  const form = useForm({
    defaultValues: {
      name: "",
      nameId: "",
      firstUserName: "",
      firstUserEmail: "",
      activate: false,
      connectNewApi: false,
      dbName: "production",
      orgCategory: "demo",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await createOrganization(
          value as CreateOrganizationInput,
        );

        if (response) {
          onClose();
        }
        toast.success("Organization created successfully");
        form.reset();
      } catch (error) {
        toast.error(error?.toString(), {
          duration: 5000,
          dismissible: true,
        });
      }
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => {
        form.reset();
      }}
      onOpenChange={onOpenChange}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new Organization
              </ModalHeader>
              <ModalBody>
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Input
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="Organization Name"
                      name={field.name}
                      size="sm"
                      value={field.state.value}
                      variant="faded"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    />
                  )}
                  name="name"
                  validators={{
                    onChange: nameSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Select
                      disallowEmptySelection
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="Organization Category"
                      name={field.name}
                      selectedKeys={[field.state.value]}
                      size="sm"
                      variant="faded"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <SelectItem key={"production"}>Production</SelectItem>
                      <SelectItem key={"sandbox"}>Sandbox</SelectItem>
                      <SelectItem key={"demo"}>Demo</SelectItem>
                      <SelectItem key={"other"}>Other</SelectItem>
                    </Select>
                  )}
                  name="orgCategory"
                  validators={{
                    onChange: orgCategorySchema,
                  }}
                />

                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Input
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="Name ID"
                      name={field.name}
                      size="sm"
                      value={field.state.value}
                      variant="faded"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    />
                  )}
                  name="nameId"
                  validators={{
                    onChange: nameIdSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Select
                      disallowEmptySelection
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="Database Instance"
                      name={field.name}
                      selectedKeys={[field.state.value]}
                      size="sm"
                      variant="faded"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <SelectItem key={"db2"}>Implementation DB</SelectItem>
                      <SelectItem key={"default"}>Production DB</SelectItem>
                    </Select>
                  )}
                  name="dbName"
                  validators={{
                    onChange: dbNameSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Input
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="First User Name"
                      name={field.name}
                      size="sm"
                      value={field.state.value}
                      variant="faded"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    />
                  )}
                  name="firstUserName"
                  validators={{
                    onChange: firstUserNameSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Input
                      color={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? "danger"
                          : "default"
                      }
                      errorMessage={field.state.meta.errors.join(", ")}
                      id={field.name}
                      isInvalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      label="First User Email"
                      name={field.name}
                      size="sm"
                      value={field.state.value}
                      variant="faded"
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    />
                  )}
                  name="firstUserEmail"
                  validators={{
                    onChange: firstUserEmailSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Checkbox
                      isSelected={field.state.value}
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    >
                      Activate
                    </Checkbox>
                  )}
                  name="activate"
                  validators={{
                    onChange: activateSchema,
                  }}
                />
                <form.Field
                  // biome-ignore lint/correctness/noChildrenProp: <explanation>
                  children={(field) => (
                    <Checkbox
                      isSelected={field.state.value}
                      onBlur={field.handleBlur}
                      onValueChange={field.handleChange}
                    >
                      Connect LeapConnect API
                    </Checkbox>
                  )}
                  name="connectNewApi"
                  validators={{
                    onChange: activateSchema,
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <form.Subscribe
                  //@ts-ignore
                  children={([canSubmit, isSubmitting]) => {
                    return (
                      <Button
                        color="primary"
                        isDisabled={!canSubmit}
                        isLoading={isSubmitting}
                        type="submit"
                        // onPress={form.handleSubmit}
                      >
                        Create
                      </Button>
                    );
                  }}
                  //@ts-ignore
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
}
