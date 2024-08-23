export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block max-w-full text-center justify-center w-full">
        {children}
      </div>
    </section>
  );
}
