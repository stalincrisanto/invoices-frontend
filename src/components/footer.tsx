import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { FOOTER_DETAIL, LOGOTIPOS } from "./../utils/config/constants";

const Footer = () => {
  return (
    <>
      <FooterImage>
        <Image
          alt="Footer detail"
          src={FOOTER_DETAIL}
          quality={100}
          priority
          style={{
            objectFit: "cover",
            marginTop: 10,
            padding: 0,
            margin: 0,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
          width={450}
          height={40}
        />
      </FooterImage>
      <div style={{ right: 0, maxWidth: "100vh" }}>
        <Image
          alt="Logotipos metro Quito"
          src={LOGOTIPOS}
          quality={100}
          style={{
            objectFit: "contain",
            margin: 10,
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          width={450}
          height={50}
          unoptimized
        />
      </div>
    </>
  );
};

const FooterImage = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0;
  min-width: 100%;
  height: 600px;
`;

export default Footer;
