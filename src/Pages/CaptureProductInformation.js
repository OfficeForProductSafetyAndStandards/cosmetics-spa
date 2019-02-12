import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import {
  asAnchor,
  asPaginationItem,
  BackLink,
  Breadcrumb,
  Button,
  Checkbox,
  DateInput,
  FileUpload,
  GridCol,
  GridRow,
  Header,
  InputField,
  Layout,
  ListItem,
  ListNavigation,
  Main,
  MultiChoice,
  Pagination,
  PhaseBanner,
  Radio,
  SearchBox,
  Select,
  TextArea,
  UnorderedList,
  LeadParagraph,
  Paragraph,
} from 'govuk-react';

import PropTypes from 'prop-types';
import Wizard from './Wizard'
import TopNav, { asNavLinkAnchor, asTopNavAnchor } from '@govuk-react/top-nav';

const LogoAnchor = asTopNavAnchor('a');
const NavAnchor = asNavLinkAnchor('a');

const AnchorTag = asAnchor('a');
const PaginationTag = asPaginationItem('a');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async (values) => {
  await sleep(300);
  //qq TODO submit form
};

const required = value => (value ? undefined : 'Required');

const RadioGroup = ({
  label, hint, options, inline, input, meta,
}) => (
  <div>
    <MultiChoice label={label} hint={hint} meta={meta}>
      {options.map(o => (
        <Radio
          key={o.value}
          {...input}
          value={o.value}
          inline={inline}
          checked={o.value === input.value}
        >
          {o.title}
        </Radio>
      ))}
    </MultiChoice>
  </div>
);

RadioGroup.defaultProps = {
  input: {},
  meta: {},
  hint: undefined,
  inline: false,
  options: {},
};

RadioGroup.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  inline: PropTypes.bool,
  options: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
};

class CheckboxGroup extends React.Component {
  static defaultProps = {
    hint: undefined,
  };

  static propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  };

  field = ({
    input, meta, label, hint, options,
  }) => {
    const { onChange } = input;
    const inputValue = input.value;

    const checkboxes = options.map(({ title, value }) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <Checkbox
          key={value}
          value={value}
          checked={checked}
          onChange={handleChange}
        >
          {title}
        </Checkbox>
      );
    });

    return (
      <MultiChoice label={label} hint={hint} meta={meta} >
        {checkboxes}
      </MultiChoice>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}

const App = () => (
  <div>
    <Main>
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      render={({
 handleSubmit, reset, submitting, pristine, values, mutators: { push, pop },
}) => (
  <form onSubmit={handleSubmit}>
    <Layout>
    <Wizard
      initialValues={{ notification : { is_imported: false}, customers: [
        {
          firstName: "toto"
        }
      ] }}
      onSubmit={onSubmit}>

     <Wizard.Page>
      <GridRow>
        <GridCol>
          <Header id="formfields" level="2">Is the UK responsible person a business or individual?</Header>

          <Field
            name="notification.is_soletrader"
            
            component={RadioGroup}
            options={[
              { title: 'Business or legal entity', value: 'false' },
              { title: 'Individual or sole trader', value: 'true' },
            ]}
            validate={required}
            inline
          />

        </GridCol>
      </GridRow>
      </Wizard.Page>

      <Wizard.Page>
      <GridRow>
        <GridCol>

          <Header id="formfields" level="1">UK responsible person details</Header>

          <LeadParagraph>
            <a href="https://beta.companieshouse.gov.uk/">
            Find your company information, including registration number on Companies House (opens in a new tab).
            </a>
          </LeadParagraph>


          <Field  name="responsible_person.companies_house_number"  component={InputField} validate={required}>Companies House registration number</Field>
          <Field  name="responsible_person.business"  component={InputField} validate={required}>Registered business name</Field>
          <Field  name="responsible_person.email"  component={InputField} validate={required}>Email address</Field>
          <Field  name="responsible_person.phone"  component={InputField} validate={required}>Phone number</Field>

          </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>

          <Header id="formfields" level="3">Registered business address</Header>
          <Field  name="responsible_person.address.line1"  component={InputField} validate={required}>Building and street</Field>
          <Field  name="responsible_person.address.line2"  component={InputField} validate={required}></Field>
          <Field  name="responsible_person.address.city"  component={InputField} validate={required}>Town or city</Field>
          <Field  name="responsible_person.address.county"  component={InputField} validate={required}>County</Field>
          <Field  name="responsible_person.address.postcode"  component={InputField} validate={required}>Postcode</Field>
        </GridCol>
      </GridRow>
      </Wizard.Page>


      <Wizard.Page>
      <GridRow>
        <GridCol>
          <Header id="formfields" level="2">Cosmetic product identification</Header>
          <LeadParagraph>
          The name as it appears on the label so it can be easily identified. This doesn’t need to include size or shade.
          </LeadParagraph>
          <Field  name="notification.name" 
            component={InputField}
            hint="For example, 'Brand name, face cream'"
            validate={required}>Brand and product name</Field>
          </GridCol>
        </GridRow>

      <GridRow>
        <GridCol>
          <Field  name="notification.additional_name"
             component={InputField}
             hint="For example, ‘with added Aloe vera’."
             validate={required}>Additional name (if there is one)</Field>
        </GridCol>
      </GridRow>

      <GridRow>
          <GridCol>

            <Paragraph>
            The different shades shall be indicated in the shades field and shall be clearly separated
            by a " / " preceded and followed by a white space.
          </Paragraph>

          <Field  name="notification.shades" 
            component={InputField}
            validate={required}>Shades available (if applicable)</Field>

        </GridCol>
      </GridRow>
      </Wizard.Page>


      <Wizard.Page>
      <GridRow>
        <GridCol>
          <Header id="formfields" level="2">Please provide details of any cateogry 1A or 1B CMR substances</Header>
        </GridCol>
      </GridRow>
      <GridRow>
        <Paragraph>CMR 1</Paragraph>
        <GridCol><Field name="notification.cmr1a" component={InputField}>INCI/Chemical/IUPAC Name</Field></GridCol>
        <GridCol><Field name="notification.cmr1b" component={InputField}>CAS number</Field></GridCol>
        <GridCol><Field name="notification.cmr1c" component={InputField}>EC Number</Field></GridCol>
      </GridRow>
      <GridRow>
        <Paragraph>CMR 2</Paragraph>
        <GridCol><Field name="notification.cmr2a" component={InputField}>INCI/Chemical/IUPAC Name</Field></GridCol>
        <GridCol><Field name="notification.cmr2b" component={InputField}>CAS number</Field></GridCol>
        <GridCol><Field name="notification.cmr2c" component={InputField}>EC Number</Field></GridCol>
      </GridRow>
      <GridRow>
        <Paragraph>CMR 3</Paragraph>
        <GridCol><Field name="notification.cmr3a" component={InputField}>INCI/Chemical/IUPAC Name</Field></GridCol>
        <GridCol><Field name="notification.cmr3b" component={InputField}>CAS number</Field></GridCol>
        <GridCol><Field name="notification.cmr3c" component={InputField}>EC Number</Field></GridCol>
      </GridRow>
      </Wizard.Page>

      <Wizard.Page>
      <GridRow>
        <GridCol>
          <Header id="formfields" level="2">Please provide details of any nanomaterials</Header>
        </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>
      <Field
              name="notification.contains_nanomaterails"
              label="Does the product contain nanomaterials?"
              component={RadioGroup}
              options={[
                { title: 'Yes', value: 'true' },
                { title: 'No', value: 'false' },
              ]}
              validate={required}
              inline
            />
        </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>
      <Field
              name="notification.nanomaterial_application"
              label="How are the nanomaterials applied?"
              component={RadioGroup}
              options={[
                { title: 'Rinse Off', value: 'rinse_off' },
                { title: 'Leave On', value: 'leave_on' },
              ]}
              inline
            />
        </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>
          <Header id="input_type_checkbox" level="3">Exposure routes</Header>
          <CheckboxGroup
            name="notification.nanomaterial_application"
            label="What are the exposure routes?"
            validate={required}
            options={[
            { title: 'Dermal', value: 'dermal' },
            { title: 'Oral', value: 'oral' },
            { title: 'Inhalation', value: 'inhalation' }
          ]}
          />
        </GridCol>
      </GridRow>

      <GridRow>
        <Paragraph>Nanomaterial 1</Paragraph>
        <GridCol><Field name="notification.nano1" component={InputField}>INCI name</Field></GridCol>
      </GridRow>
      <GridRow>
        <Paragraph>Nanomaterial 2</Paragraph>
        <GridCol><Field name="notification.nano2" component={InputField}>INCI name</Field></GridCol>
      </GridRow>
      <GridRow>
        <Paragraph>Nanomaterial 3</Paragraph>
        <GridCol><Field name="notification.nano3" component={InputField}>INCI name</Field></GridCol>
      </GridRow>

      </Wizard.Page>


      <Wizard.Page>
        <GridRow>
          <GridCol>
            <Header id="formfields" level="2">Is this a component of a multi-component product?</Header>

            <Field
              name="notification.is_single_component"
              label=""
              component={RadioGroup}
              options={[
                { title: 'Yes', value: 'true' },
                { title: 'No', value: 'false' },
              ]}
              validate={required}
              inline
            />
          </GridCol>
        </GridRow>
      </Wizard.Page>

      <Wizard.Page>
        <GridRow>
          <GridCol>
            <Header id="formfields" level="2">Product Origin</Header>
                        
            <Field
              name="notification.is_imported"
              label="Is the cosmetic imported into the UK?"
              component={RadioGroup}
              options={[
                { title: 'Yes', value: 'true' },
                { title: 'No', value: 'false' },
              ]}
              validate={required}
              inline
            />

          <Field
            name="notification.imported_from"
            component={InputField}>
            What is the country of origin?
          </Field>
          </GridCol>
        </GridRow>
      </Wizard.Page>


      <Wizard.Page>
        <GridRow>
          <GridCol>
            <Header id="formfields" level="2">Product Category and Formulation</Header>
          <Field
            name="category1"
            label="Level 1 category"
            component={Select}
            validate={required}
          >
            <option />
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </Field>
          <Field
            name="category2"
            label="Level 2 category"
            component={Select}
            validate={required}
          >
            <option />
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </Field>
          <Field
            name="category3"
            label="Level 3 category"
            component={Select}
            validate={required}
          >
            <option />
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </Field>
          </GridCol>
        </GridRow>
      </Wizard.Page>

      <Wizard.Page>
        <GridRow>
          <GridCol>
            <Header id="formfields" level="2">Industry Reference</Header>
          <Field
            name="notification.industry_reference"
            component={InputField}>
            What is your internal company reference number for the product?
          </Field>
          </GridCol>
        </GridRow>
      </Wizard.Page>

      <Wizard.Page>
      <GridRow>
        <GridCol>
          <Header id="input_type_radio" level="3">END: EXAMPLES OF OTHER FORM INPUTS</Header>
          <Field
            name="likesAnimals"
            label="Do you like animals?"
            hint="You must tell us"
            component={RadioGroup}
            options={[
              { title: 'Yep', value: 'yes' },
              { title: 'Nope', value: 'no' },
            ]}
            validate={required}
            inline
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="input_type_checkbox" level="3">Input type=checkbox</Header>
          <CheckboxGroup
            name="sauces"
            label="What sauces do you like?"
            hint="come get some sauce"
            validate={required}
            options={[
            { title: 'Tomato', value: 'tomato' },
            { title: 'Soy', value: 'soy' },
            { title: 'Mint', value: 'mint' },
            { title: 'Mustard', value: 'mustard' },
          ]}
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="input_type_file" level="3">Textarea</Header>
          <Field
            name="group1"
            acceptedFormats=".jpg, .png"
            hintText="This can be in either JPG or PNG format"
            label="Upload a photo"
            component={FileUpload}
          />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <Header id="dateInput" level="3">Date input</Header>
          <DateInput hintText="For example, dd mm yyyy">
            What is your date of birth?
          </DateInput>
        </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>
          <Header id="textarea" level="3">Textarea</Header>
          <Field
            name="description"
            component={TextArea}
            validate={required}
            hint="Any other information you want to provide"
          >
            Description
          </Field>
        </GridCol>
      </GridRow>

      <GridRow>
        <GridCol>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </GridCol>
      </GridRow>
      </Wizard.Page>
      </Wizard>
    </Layout>
  </form>
      )}
    />
    </Main>
  </div>
);

export default App;
