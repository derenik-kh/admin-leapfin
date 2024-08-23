"use client";

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Code,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { activateOrg, deactivateOrg } from "@/actions/organization";

type Props = {
  status: "active" | "inactive";
  organizationNameId: string;
};

export function ChangeStatus({ status, organizationNameId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState("");

  const deactivate = async () => {
    try {
      setLoading(true);
      if (params.slug) {
        await deactivateOrg(params.slug);
      }
      setValue("");
      toast.success("Organization deactivated successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to deactivate organization");
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const activate = async () => {
    try {
      setLoading(true);
      if (params.slug) {
        await activateOrg(params.slug);
      }
      setValue("");
      toast.success("Organization activated successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to activate organization");
    } finally {
      onClose();
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        size="md"
        onClose={() => {
          setValue("");
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {status === "active" ? "Deactivate" : "Activate"}
              </ModalHeader>
              <ModalBody>
                <p className="text-small">
                  Are you sure you want to{" "}
                  {status === "active" ? "deactivate" : "activate"} this
                  organization?
                </p>
                {status === "active" ? (
                  <>
                    <p className="text-small">
                      Please type{" "}
                      <Code className="font-bold">{organizationNameId}</Code> to
                      deactivate the organization.
                    </p>
                    <Input
                      placeholder={organizationNameId}
                      size="sm"
                      value={value}
                      variant="faded"
                      onValueChange={setValue}
                    />
                  </>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="font-bold"
                  color={status === "active" ? "danger" : "primary"}
                  isDisabled={
                    status === "active" ? value !== organizationNameId : false
                  }
                  isLoading={loading}
                  onPress={status === "active" ? deactivate : activate}
                >
                  {status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        className="font-bold"
        color={status === "active" ? "danger" : "default"}
        variant="bordered"
        onClick={onOpen}
      >
        {status === "active" ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
