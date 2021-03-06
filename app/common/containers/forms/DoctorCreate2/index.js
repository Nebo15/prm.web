import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import Form, { FormBlock, FormRow, FormColumn, FormIcon } from 'components/Form';
import Datepicker from 'components/Datepicker';
import Checkbox from 'components/Checkbox';
import { RadioInputGroup } from 'components/RadioInput';
import Input, { SelectInput } from 'components/Input';


const level = ['Молодший спеціаліст', 'Бакалавр', 'Спеціаліст', 'Магістр'];
const ScienceDegree = ['Доктор філософії', 'Доктор наук'];
const type = [
  'Інтернатура',
  'Спеціалізація',
  'Передатестаційний цикл',
  'Тематичне вдосконалення',
  'Курси інформації',
  'Стажування'];

const Specialty = ['терапевт', 'педіатр', 'сімейний лікар'];
const ProfessionalLevel = ['Друга категорія', 'Перша категорія', 'Вища категорія'];

const selector = formValueSelector('doctorCreate2');

@reduxForm({
  form: 'doctorCreate2',
})
@connect(state => ({
  specialtyField: selector(state, 'PROFESSIONAL.specialty'),
}))
export default class DoctorCreate2Form extends React.Component {
  render() {
    const { handleSubmit, specialtyField } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <FormBlock title="Спеціальність">
          <FormRow>
            <FormColumn>
              <Field
                component={SelectInput}
                name="PROFESSIONAL.specialty"
                placeholder="Cпеціальність"
                options={Specialty.map(item => ({
                  title: item, name: item,
                }))}
              />
            </FormColumn>
            <FormColumn>
              <Field
                label="Cпеціальність за посадою"
                name="agree"
                component={Checkbox}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormBlock title="Статус атестації" border>
          <FormRow>
            <FormColumn>
              <Field
                placeholder="Кваліфікаціїна категорія"
                type="text"
                name="PROFESSIONAL.institution_name"
                component={SelectInput}
                options={ProfessionalLevel.map(item => ({
                  title: item, name: item,
                }))}
                disabled={!specialtyField}
              />
            </FormColumn>
            <FormColumn>
              <RadioInputGroup
                name="gender"
                items={[
                  {
                    value: 'Присвоєння',
                    label: 'Присвоєння',
                  },
                  {
                    value: 'Підтвердження',
                    label: 'Підтвердження',
                  },
                ]}
                disabled={!specialtyField}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                label="Дата отримання"
                name="PROFESSIONAL.issued_date"
                component={Datepicker}
                disabled={!specialtyField}
              />
            </FormColumn>
            <FormColumn>
              <Field
                placeholder="Орган, що проводив атестацію"
                type="text"
                name="PROFESSIONAL.institution_name"
                component={Input}
                disabled={!specialtyField}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormIcon>Додати спеціальність</FormIcon>

        <FormBlock title="Інформація про освіту">
          <FormRow>
            <FormColumn>
              <Field placeholder="Країна" type="text" name="EDUCATION.country" component={Input} />
            </FormColumn>
            <FormColumn>
              <Field placeholder="Населений пункт" type="text" name="EDUCATION.city" component={Input} />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                placeholder="Офіційна повна назва навчального закладу"
                type="text"
                name="EDUCATION.university"
                component={Input}
              />
            </FormColumn>
            <FormColumn>
              <Field
                label="Рік завершення"
                name="EDUCATION.finished_date"
                component={Datepicker}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field placeholder="Номер диплому" type="text" name="EDUCATION.diploma_number" component={Input} />
            </FormColumn>
            <FormColumn />
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                component={SelectInput}
                name="EDUCATION.degree"
                placeholder="Рівень освіти"
                options={level.map(item => ({
                  title: item, name: item,
                }))}
              />
            </FormColumn>
            <FormColumn>
              <Field placeholder="спеціальність за дипломом" type="text" name="EDUCATION.speciality" component={Input} />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormIcon>Додати освіту</FormIcon>

        <FormBlock title="Науковий ступінь">
          <FormRow>
            <FormColumn>
              <Field placeholder="Країна" type="text" name="SCIENCE.country" component={Input} />
            </FormColumn>
            <FormColumn>
              <Field placeholder="Населений пункт" type="text" name="SCIENCE.city" component={Input} />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                component={SelectInput}
                name="SCIENCE.degree"
                placeholder="Науковий ступінь"
                options={ScienceDegree.map(item => ({
                  title: item, name: item,
                }))}
              />
            </FormColumn>
            <FormColumn>
              <Field
                placeholder="Офіційна повна назва навчального закладу"
                type="text"
                name="SCIENCE.institution_name"
                component={Input}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field placeholder="Номер диплому" type="text" name="SCIENCE.diploma_number" component={Input} />
            </FormColumn>
            <FormColumn>
              <Field placeholder="Спеціальність" type="text" name="SCIENCE.speciality2" component={Input} />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field placeholder="Тема диплому" type="text" name="SCIENCE.diploma_topic" component={Input} />
            </FormColumn>
            <FormColumn>
              <Field
                label="Дата видачі"
                name="SCIENCE.issued_date"
                component={Datepicker}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>

        <FormBlock title="Підвищення кваліфікації">
          <FormRow>
            <FormColumn>
              <Field
                component={SelectInput}
                name="QUALIFICATION.qualification"
                placeholder="Вид підготовки"
                options={type.map(item => ({
                  title: item, name: item,
                }))}
              />
            </FormColumn>
            <FormColumn>
              <Field
                placeholder="Навчальний заклад"
                type="text"
                name="QUALIFICATION.institution_name"
                component={Input}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                placeholder="Спеціальність"
                type="text"
                name="QUALIFICATION.speciality"
                component={Input}
              />
            </FormColumn>
            <FormColumn>
              <Field
                label="Дата підв. кваліфікації"
                name="QUALIFICATION.issued_date"
                component={Datepicker}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormIcon>Додати кваліфікацію</FormIcon>
      </Form>
    );
  }
}
