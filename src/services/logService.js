import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const initLog = () =>{
    Sentry.init({
        dsn: "https://44bb78e839454de6bfd8a0090ae102e3@o1008763.ingest.sentry.io/5972774",
        integrations: [new Integrations.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}


