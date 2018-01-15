/**
 * @class ExampleComponent
 */

import Field from './components/Fields/Field';
import AddressField from './components/Fields/AddressField';
import DateField from './components/Fields/DateField';
import Reset from './components/Fields/Reset';
import Submit from './components/Fields/Submit';

export default {
  Field,
  AddressField,
  DateField,
  Reset,
  Submit,
};

// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// import './styles.css'

// export default class ExampleComponent extends Component {
//   static propTypes = {
//     text: PropTypes.string
//   }

//   render() {
//     const {
//       text
//     } = this.props

//     return (
//       <div className='test'>
//         Example Component or not: {text}
//       </div>
//     )
//   }
// }
