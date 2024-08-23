const columns = [
  { name: "NAME", uid: "name", sortable: false },
  { name: "IS STRIPE CUSTOMER", uid: "isStripeCustomer", sortable: true },
  { name: "TIME ZONE", uid: "timeZone", sortable: true },
  { name: "STATUS", uid: "isActive", sortable: true },
  { name: "IS DEMO", uid: "isDemo", sortable: false },
  { name: "LAST IMPORTER RUN", uid: "importerRuns", sortable: false },
  { name: "DEFAULT CURRENCY", uid: "defaultCurrency", sortable: false },
  { name: "QUICK LOAD API", uid: "quick-load-api", sortable: false },
  { name: "NAME ID", uid: "nameId", sortable: false },
  { name: "LAST ACCOUNTING RUN", uid: "processingRuns", sortable: false },
  { name: "CATEGORY", uid: "category", sortable: false },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
] as const;

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "inactive", uid: "inactive" },
];

export type Run = {
  dag_id: string;
  dag_run_id: string;
  state: string;
  execution_date: string;
  data_interval_end: string;
  data_interval_start: string;
  external_trigger: boolean;
  start_date: string;
  end_date: string;
  last_scheduling_decision: string;
  logical_date: string;
  run_type: string;
  conf: object;
};

export type Integration = {
  id: number;
  name: string;
  type: string;
  state: string;
  isActive: boolean;
};

export type ColumnKey = (typeof columns)[number]["uid"];
export type OrganizationType = {
  organization: {
    isStripeCustomer: boolean;
    timeZone: string;
    isActive: boolean;
    isDemo: boolean;
    importerRuns: Run[];
    createdAt: string;
    defaultCurrency: string;
    name: string;
    nameId: string;
    processingRuns: Run[];
    id: number;
    category: string;
    updatedAt: string;
  };
  integrations: Integration[];
  importerRuns: Run[];
  processingRuns: Run[];
};

export type OrganizationsType = (Omit<
  OrganizationType,
  "importerRuns" | "processingRuns"
> & {
  importerRuns: Run[];
  processingRuns: Run[];
})[];

const organizations = [];

export { columns, statusOptions, organizations };
