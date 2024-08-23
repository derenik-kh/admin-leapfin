import type { SidebarItem } from "@/components/sidebar";

import { Chip } from "@nextui-org/react";

export const sectionItems: SidebarItem[] = [
  {
    key: "organizations",
    title: "Organizations",
    items: [
      {
        key: "organizations-list",
        href: "/organizations",
        title: "Organizations List",
        icon: "octicon:organization-24",
      },
      {
        key: "feature-flags",
        href: "/feature-flags",
        icon: "pajamas:issue-type-feature-flag",
        title: "Feature Flags",
        isDisabled: true,
      },
    ],
  },
  {
    key: "configs",
    title: "Configs",
    items: [
      {
        key: "activity",
        href: "/activity",
        icon: "bytesize:activity",
        title: "Activity",
        endContent: (
          <Chip size="sm" variant="flat">
            3
          </Chip>
        ),
        isDisabled: true,
      },
      {
        key: "settings",
        href: "/settings",
        icon: "solar:settings-outline",
        title: "Settings",
        isDisabled: true,
      },
    ],
  },
];
