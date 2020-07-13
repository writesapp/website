import React from "react";
import Helmet from "react-helmet";

export default function SEO({ title }) {
  return (
    <Helmet titleTemplate="%s | writes." defaultTitle="writes.">
      <html lang="pl" />
      <meta charSet="utf8" />
      <title>${title}</title>
      <meta name="description" content="writes. - because who has time to write?" />
      <meta name="keywords" content="writes homework app writesapp free sharing essay" />
      <meta name="author" content="writes. team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
