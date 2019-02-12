import React from 'react';
import styled from 'react-emotion';
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants';

const OutterContainer = styled('div')({
  paddingTop: SPACING.SCALE_5,
  textAlign: 'center'
});

// Replace magic numbers with constants
const InnerContainer = styled('div')({
  maxWidth: '960px',
  margin: '0 15px',
  textAlign: 'left',
  [MEDIA_QUERIES.SMALLSCREEN]: {
    margin: '0 15px'
  },
  [MEDIA_QUERIES.LARGESCREEN]: {
    margin: '0 30px'
  },
  // no 1020px breakpoint in constants yet, not sure why
  '@media only screen and (min-width:1020px)': {
    margin: '0 auto'
  }
});

const Main = ({ children, ...props }) => (
  <OutterContainer {...props}>
    <InnerContainer>{children}</InnerContainer>
  </OutterContainer>
);

export default Main;
