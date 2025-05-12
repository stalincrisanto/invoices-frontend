import { BRAND_1 } from "@/utils/config/theme";
import styled from "@emotion/styled";

export const Header = () => {
  return (
    <Container>
      <BlueBand />
    </Container>
  );
};

const Container = styled("div")({ display: "flex", flexDirection: "column" });
const BlueBand = styled("div")({ backgroundColor: BRAND_1, height: "50px" });
