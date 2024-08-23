"use server";
import type { WipeDataType } from "@/app/(protected)/organizations/[slug]/_components/Actions/WipeData";

import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import {
  type CreateOrganizationInput,
  createOrganizationSchema,
} from "@/schemas";
import { baseUrl } from "@/lib/constants";

export async function createOrganization(body: CreateOrganizationInput) {
  try {
    createOrganizationSchema.parse(body);
    const res = await fetch(`${baseUrl}/admin/org`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");

    return true;
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      throw new Error(err.issues.map((issue) => issue.message).join(", \n"));
    }
    throw new Error((err as Error).message);
  }
}

export async function deactivateOrg(id: string) {
  try {
    const res = await fetch(`${baseUrl}/admin/organization/${id}/deactivate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function activateOrg(id: string) {
  try {
    const res = await fetch(`${baseUrl}/admin/organization/${id}/activate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function connectQuickLoadApi(id: string) {
  try {
    const res = await fetch(`${baseUrl}/admin/organization/${id}/connect_api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function activateQuickLoadApi(id: string) {
  try {
    const res = await fetch(
      `${baseUrl}/admin/integration-status/${id}/activate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function deactivateQuickLoadApi(id: string) {
  try {
    const res = await fetch(
      `${baseUrl}/admin/integration-status/${id}/deactivate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies().toString(),
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function wipeData(id: string, wipeDataElements: WipeDataType) {
  try {
    const res = await fetch(`${baseUrl}/admin/organization/${id}/wipe-data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(wipeDataElements),
      credentials: "include",
    });

    if (!res.ok) {
      const msg = await res.text();

      throw new Error(msg);
    }

    revalidateTag("organizations");
    revalidateTag(id);

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}
