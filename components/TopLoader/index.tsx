"use client";

import Loader from "nextjs-toploader";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function NextTopLoader() {
  useEffect(() => {
    nProgress.done();
  }, []);

  return <Loader color={"#4358C3"} showSpinner={false} />;
}
