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

import {
  activateQuickLoadApi,
  connectQuickLoadApi,
  deactivateQuickLoadApi,
} from "@/actions/organization";

type Props = {
  status?: boolean | null;
  organizationNameId: string;
  quickLoadApiIntegrationId?: number | string | null;
};

export function ConnectApi({
  status,
  organizationNameId,
  quickLoadApiIntegrationId,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const params = useParams<{ slug: string }>();
  const isNotConnected = status === null;
  const isActive = status === true;

  const [value, setValue] = useState("");

  const connectApi = async () => {
    try {
      setLoading(true);
      if (params.slug) {
        await connectQuickLoadApi(params.slug);
      }
      setValue("");
      toast.success("LeapConnect API connected successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to connect LeapConnect API");
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const activateApi = async () => {
    try {
      setLoading(true);
      if (quickLoadApiIntegrationId) {
        await activateQuickLoadApi(String(quickLoadApiIntegrationId));
      }
      setValue("");
      toast.success("LeapConnect API activated successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to activate LeapConnect API");
    } finally {
      onClose();
      setLoading(false);
    }
  };
  const deactivateApi = async () => {
    try {
      setLoading(true);
      if (quickLoadApiIntegrationId) {
        await deactivateQuickLoadApi(String(quickLoadApiIntegrationId));
      }
      setValue("");
      toast.success("LeapConnect API deactivated successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to deactivate LeapConnect API");
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
                {isNotConnected
                  ? "Connect Quick Load API"
                  : isActive
                    ? "Deactivate Quick Load API"
                    : "Activate Quick Load API"}
              </ModalHeader>
              <ModalBody>
                <p className="text-small">
                  Are you sure you want to{" "}
                  {isNotConnected
                    ? "connect"
                    : isActive
                      ? "deactivate"
                      : "activate"}{" "}
                  the Quick Load API for this organization?
                </p>
                {isActive ? (
                  <>
                    <p className="text-small">
                      Please type{" "}
                      <Code className="font-bold">{organizationNameId}</Code> to
                      deactivate the Quick Load API.
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
                  color={isActive ? "danger" : "primary"}
                  isDisabled={isActive ? value !== organizationNameId : false}
                  isLoading={loading}
                  onPress={
                    isNotConnected
                      ? connectApi
                      : isActive
                        ? deactivateApi
                        : activateApi
                  }
                >
                  {isNotConnected
                    ? "Connect"
                    : isActive
                      ? "Deactivate"
                      : "Activate"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        className="font-bold"
        color={isActive ? "danger" : "default"}
        variant="bordered"
        onClick={onOpen}
      >
        {isActive
          ? "Deactivate Quick Load API"
          : isNotConnected
            ? "Connect Quick Load API"
            : "Activate Quick Load API"}
      </Button>
    </div>
  );
}
