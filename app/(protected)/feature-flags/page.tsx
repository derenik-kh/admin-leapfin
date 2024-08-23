import dynamic from "next/dynamic";
const FeatureFlagsTable = dynamic(() => import("./_components/Table"));

export default function DocsPage() {
  return (
    <div className="w-full flex-1">
      <FeatureFlagsTable />
    </div>
  );
}
