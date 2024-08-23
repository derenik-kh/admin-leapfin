"use client";

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Code,
  Checkbox,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { wipeData } from "@/actions/organization";

export type WipeDataType = {
  wipeSnowflake: boolean;
  wipeElasticsearch: boolean;
  wipePostgres: boolean;
  wipeRawData: boolean;
};

const wipeDataKeyMapping: Record<keyof WipeDataType, string> = {
  wipeSnowflake: "Snowflake",
  wipeElasticsearch: "Elasticsearch",
  wipePostgres: "Postgres",
  wipeRawData: "Raw Data",
};

export function WipeData() {
  const params = useParams<{
    slug: string;
  }>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isOpenSelectData,
    onClose: onCloseSelectData,
    onOpen: onOpenSelectData,
  } = useDisclosure();
  const [values, setValues] = useState<WipeDataType>({
    wipeSnowflake: false,
    wipeElasticsearch: false,
    wipePostgres: false,
    wipeRawData: false,
  });

  const wipeableData = useMemo(
    () => (
      <div className="space-x-2 mt-2 space-y-2">
        {Object.entries(values)
          .filter(([, value]) => value)
          .map(([key]) => (
            <Code key={key}>
              {wipeDataKeyMapping[key as keyof WipeDataType]}
            </Code>
          ))}
      </div>
    ),
    [values],
  );

  const wipe = async () => {
    try {
      setLoading(true);
      await wipeData(params.slug, values);
      toast.info("Data wiped successfully");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to wipe data");
    } finally {
      onClose();
      onCloseSelectData();
      setLoading(false);
    }
  };

  const handleCheckboxChange = (key: keyof WipeDataType, value: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isWipeDataEnabled = useMemo(
    () => Object.values(values).some((value) => value),
    [values],
  );

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        size="lg"
        onClose={() => {
          setValues({
            wipeSnowflake: false,
            wipeElasticsearch: false,
            wipePostgres: false,
            wipeRawData: false,
          });
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Wipe data
              </ModalHeader>
              <ModalBody>
                <p className="text-small">
                  Confirm that you want to wipe selected data for this
                  Organization.
                  {wipeableData}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="font-bold"
                  color="danger"
                  isLoading={loading}
                  onPress={wipe}
                >
                  Confirm Wipe Data
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        backdrop="blur"
        isOpen={isOpenSelectData}
        size="md"
        onClose={() => {
          setValues({
            wipeSnowflake: false,
            wipeElasticsearch: false,
            wipePostgres: false,
            wipeRawData: false,
          });
          onCloseSelectData();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Wipe data {params.slug}
              </ModalHeader>
              <ModalBody>
                <p className="text-small">
                  Select the data you want to wipe for this Organization.
                </p>
                <Checkbox
                  isSelected={values.wipePostgres}
                  onValueChange={(value) =>
                    handleCheckboxChange("wipePostgres", value)
                  }
                >
                  Postgres
                </Checkbox>
                {values.wipePostgres ? (
                  <Checkbox
                    className="ml-4"
                    isSelected={values.wipeRawData}
                    onValueChange={(value) =>
                      handleCheckboxChange("wipeRawData", value)
                    }
                  >
                    Raw Data
                  </Checkbox>
                ) : null}
                <Checkbox
                  isSelected={values.wipeElasticsearch}
                  onValueChange={(value) =>
                    handleCheckboxChange("wipeElasticsearch", value)
                  }
                >
                  Elasticsearch
                </Checkbox>
                <Checkbox
                  isSelected={values.wipeSnowflake}
                  onValueChange={(value) =>
                    handleCheckboxChange("wipeSnowflake", value)
                  }
                >
                  Snowflake
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="font-bold"
                  color="danger"
                  isDisabled={!isWipeDataEnabled}
                  onPress={onOpen}
                >
                  Wipe Data
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button className="font-bold" color="danger" onClick={onOpenSelectData}>
        Wipe Data
      </Button>
    </div>
  );
}
