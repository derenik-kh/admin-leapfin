import { Icon } from "@iconify/react";

import { Logo } from "@/components/Logo";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-start gap-2 px-2 w-56 p-4 ml-4">
        <Logo className="text-[#252366]" width={"100%"} />
        <div className="w-12 h-10 text-default-700">
          <Icon
            className="text-[#252366]"
            icon={"mdi:administrator"}
            width={32}
          />
        </div>
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen">
        {children}
      </section>
    </>
  );
}
