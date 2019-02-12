import React from 'react';
import styled from 'react-emotion';
import { SPACING, MEDIA_QUERIES } from '@govuk-react/constants';
import { BLUE, WHITE } from 'govuk-colours';
import { asAnchor } from '@govuk-react/hoc';

import {
  Main,
  GridRow,
  GridCol,
  LeadParagraph,
  Paragraph,
  Header,
  ListItem,
  Button,
  ListNavigation,
  InsetText
} from 'govuk-react';
import { ButtonArrow } from '@govuk-react/icons';

const AnchorTag = asAnchor('a');

const Introduction = styled('div')({
  paddingTop: SPACING.SCALE_4,
  paddingBottom: SPACING.SCALE_2
});

const Example = styled('div')({
  borderTop: 'solid 1px #bfc1c3',
  paddingTop: SPACING.SCALE_4,
  paddingBottom: SPACING.SCALE_2
});

const CustomStyledButton = styled(Button)({
  backgroundColor: WHITE,
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: BLUE,
  color: BLUE,
  ':hover': {
    backgroundColor: BLUE,
    color: WHITE
  }
});

const CustomListItem = styled(ListItem)({
  fontSize: '44px',
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: '24px'
  }
});

const HomePage = () => (
  <Main>
    <GridRow>
      <GridCol columnTwoThirds>
        <Introduction>
          <Header level={1}>Creating custom elements</Header>
          <LeadParagraph>
            Examples of customised govuk-react components.
          </LeadParagraph>
          <Paragraph>
            Govuk-react provides components that follow the defined GDS
            standards. There are frequent requests to add support for styling,
            or functionality that are outside the scope of the project.
          </Paragraph>
          <Paragraph>
            This document provides examples on how to customise the visual
            appearance of an imported govuk-react component.
          </Paragraph>
          <InsetText>
            <Paragraph mb={0}>
              When overriding components it is advised that you reference the
              source file for the component.
            </Paragraph>
          </InsetText>
        </Introduction>
        <Example>
          <Header level={2}>Buttons</Header>
          <ListNavigation listStyleType="square" mb={4}>
            <AnchorTag
              target="_blank"
              href="https://ukhomeoffice.github.io/govuk-react/?knob-Children=Button&knob-level=6&knob-Disabled=false&knob-Start=false&selectedKind=Form%2FButtons&selectedStory=Component%20Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel"
            >
              Storybook
            </AnchorTag>
            <AnchorTag
              target="_blank"
              href="https://github.com/UKHomeOffice/govuk-react/blob/master/components/button/src/index.js"
            >
              Component source
            </AnchorTag>
          </ListNavigation>
          <Button>Original button</Button>
          <CustomStyledButton>Customised button</CustomStyledButton>
          <Paragraph>
            Customised components retain their existing options, the example
            below demonstrates an implementation of the customised button, with
            the existing `start` property and support for `icon` as per [the
            storybook
            documentation](https://ukhomeoffice.github.io/govuk-react/?knob-Children=Button&knob-level=6&knob-Disabled=false&knob-Start=false&selectedKind=Form%2FButtons&selectedStory=Component%20Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel).
          </Paragraph>
          <CustomStyledButton start>Customised button</CustomStyledButton>
          <CustomStyledButton start icon={<ButtonArrow />}>
            Customised button
          </CustomStyledButton>
        </Example>
        <Example>
          <Header level={2}>List items</Header>
          <ListItem>Vanilla ListItem</ListItem>
          <CustomListItem>CustomListItem</CustomListItem>
        </Example>
      </GridCol>
    </GridRow>
  </Main>
);

export default HomePage;
