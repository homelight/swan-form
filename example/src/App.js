import React, { Component } from 'react'

import { Address, Field } from './flow-form';

const minLenTen = (value) => value.length > 9 ? false : 'Min len 10';

export default class App extends Component {
  render () {
    return (
      <div style={{ margin: '5rem', border: '1px solid steelblue', padding: '5rem'}}>
        <Field
        	type="text"
        	name="minTenField"
        	validate={ minLenTen }
        	asyncValidate
        	validateWhileTyping
        	placeholder="test"
        	value="testing"
        	label='field'
        />

        <Address
        	name='address1'
      	/>
      </div>
    )
  }
}
