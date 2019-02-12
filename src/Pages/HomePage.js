import React from "react";
import styled from "react-emotion";
import { SPACING } from "@govuk-react/constants";
import { Link } from 'react-router-dom';

import { Form, Field } from "react-final-form";

import {
  Main,
  GridRow,
  GridCol,
  LeadParagraph,
  Paragraph,
  InsetText,
  Header,
  Button
} from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";

const Introduction = styled("div")({
  paddingTop: SPACING.SCALE_4,
  paddingBottom: SPACING.SCALE_2
});

const SpecialistTerm = styled("div")({
  paddingTop: SPACING.SCALE_2
});

const FormStart = styled("div")({
  paddingTop: SPACING.SCALE_2
});

const HomePage = () => (
  <Main>
    <GridRow>
      <GridCol columnTwoThirds>
        <Introduction>
          <Header level={1}>Create a Cosmetic Product Information File</Header>
          <LeadParagraph>
          This tool can be used to create a file suitable for
            registering cosmetics products for sale in the UK.
          </LeadParagraph>
        </Introduction>
        <FormStart>
          <Link to="/CaptureProductInformation">
          <Button start icon={<ButtonArrow />}>
            Let's start
          </Button>
          </Link>
        </FormStart>
      </GridCol>
    </GridRow>
  </Main>
);

export default HomePage;
