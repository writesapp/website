import React from "react";
import Helmet from "react-helmet";

export default function SEO({ title }) {
  return (
    <Helmet titleTemplate="%s | writes." defaultTitle="writes.">
      <title>${title}</title>
    </Helmet>
  );
}
