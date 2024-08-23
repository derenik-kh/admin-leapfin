export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-col items-center justify-center min-h-[calc(100vh_-_66px_-_3rem)] py-8 md:py-10 flex">
      <div className="w-full max-w-full text-center justify-center flex flex-1">
        {children}
      </div>
    </section>
  );
}
