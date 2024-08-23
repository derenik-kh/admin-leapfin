"use client";

import type { OrganizationType } from "../organization-table/constants";
import type { User } from "@/types";

import {
  Avatar,
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import { type PropsWithChildren, useState } from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";

import Sidebar from "@/components/sidebar";
import { Logo } from "@/components/Logo";
import { cn } from "@/utils/cn";
import { sectionItems } from "@/components/sidebar-items";
import { logout } from "@/actions/auth";

export default function MainLayout({
  children,
  user,
  currentOrg,
}: PropsWithChildren<{ user?: User; currentOrg?: OrganizationType | null }>) {
  const { setTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  const params = useParams<{ slug: string }>();

  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-dvh w-full">
      <div
        className={cn(
          "relative flex h-full w-72 max-w-[288px] flex-1 flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out shadow-xl",
          {
            "-ml-72 -translate-x-72": isHidden || isCompact,
          },
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2">
            <Logo className="text-[#252366]" width={"100%"} />
            <div className="w-12 h-10 text-default-700">
              <Icon
                className="text-[#252366]"
                icon={"mdi:administrator"}
                width={32}
              />
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button
                className="mt-1 h-8 w-8 outline-none transition-transform"
                type="button"
              >
                <Badge
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar size="sm" />
                </Badge>
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              // disabledKeys={["theme"]}
              variant="flat"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-thin">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="theme"
                isReadOnly
                className="cursor-default"
                endContent={
                  <select
                    className="z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200"
                    id="theme"
                    name="theme"
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="system">System</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                }
              >
                Theme
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => logout()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Spacer y={8} />
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="organizations"
            iconClassName="group-data-[selected=true]:text-primary-foreground"
            itemClasses={{
              base: "data-[selected=true]:bg-primary dark:data-[selected=true]:bg-primary data-[hover=true]:bg-default-300/20 dark:data-[hover=true]:bg-default-200/40",
              title: "group-data-[selected=true]:text-primary",
            }}
            items={sectionItems}
            selectedKeys={[currentPath]}
          />
        </ScrollShadow>
        <Spacer y={8} />
        <div className="mt-auto flex flex-col">
          <Button
            fullWidth
            isDisabled
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <div className="w-6 h-6">
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              </div>
            }
            variant="light"
          >
            Help & Information
          </Button>
          <Button
            className="justify-start data-[hover=true]:bg-danger-100 text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <div className="w-6 h-6">
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              </div>
            }
            variant="light"
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </div>
      </div>
      <div className="w-full flex-1 flex-col p-4">
        <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4 shadow-md">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => setIsHidden(!isHidden)}
          >
            <div className="w-6 h-6">
              <Icon
                className="text-default-500"
                height={24}
                icon="solar:sidebar-minimalistic-outline"
                width={24}
              />
            </div>
          </Button>
          <h2 className="text-medium font-medium text-default-700">
            <Breadcrumbs>
              {pathname
                .split("/")
                .slice(1)
                .map((el) =>
                  el === params.slug ? currentOrg?.organization?.name : el,
                )
                .map((path) => (
                  <BreadcrumbItem
                    key={path}
                    className="capitalize"
                    href={`/${path}`}
                  >
                    {path}
                  </BreadcrumbItem>
                ))}
            </Breadcrumbs>
          </h2>
        </header>
        <main className="mt-4 h-[calc(100vh_-_66px_-_3rem)] w-full overflow-visible">
          <div className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
