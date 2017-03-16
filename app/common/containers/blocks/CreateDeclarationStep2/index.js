import React from 'react';
import withStyles from 'withStyles';
import { show } from 'components/Popup';
import { connect } from 'react-redux';

import { H1 } from 'components/Title';
import CreateDeclarationForm from 'containers/forms/CreateDeclarationStep2';
import SignInDeclarationPopup from 'containers/popups/SignInDeclaration';

import styles from './styles.scss';
@connect(null, { show })
@withStyles(styles)
export default class CreateDeclarationStep2 extends React.Component {
  render() {
    const { show } = this.props;
    return (
      <section className={styles.declaration}>
        <div className={styles.declaration__title}>
          <H1>Створити нову декларацію. Крок 2</H1>
        </div>
        <div className={styles.declaration__form}>
          <CreateDeclarationForm showPopup={() => show('signInDeclaration')} onSubmit={() => {}} />
        </div>
        <SignInDeclarationPopup />
      </section>
    );
  }
}
