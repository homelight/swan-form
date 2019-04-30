/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Field } from '@swan-form/field';
import { hot } from 'react-hot-loader';

/* @todo move this */
const minSize = { minHeight: '1em', minWidth: '3em' };

class EditableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: props.value,
    };
  }

  onClick = () => {
    this.setState(prevState => ({
      ...prevState,
      editing: true,
    }));
  };

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.onBlur(event);
    }
  };

  onBlur = event => {
    const { target } = event;
    const { name, onChange } = this.props;
    if (target.name !== name) {
      return;
    }

    onChange({ name: this.props.name, value: target.value });
    this.setState(prevState => ({
      ...prevState,
      editing: false,
      value: target.value,
    }));
  };

  render() {
    const { name, type } = this.props;
    if (this.state.editing) {
      return (
        <Field
          type={type || 'text'}
          name={name}
          defaultValue={this.state.value}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          autoFocus
        />
      );
    }
    return (
      <div style={minSize} onClick={this.onClick}>
        {this.state.value}
      </div>
    );
  }
}

const style = { padding: '.25em', border: '1px solid black', margin: '.25em', maxWidth: '300px' };

class DynamicField extends Component {
  state = { field1: 'HiHi', field2: 'What', field3: 'Something Else', field4: '' };

  update = ({ name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { field1, field2, field3, field4 } = this.state;
    return (
      <div>
        <h1>Swan Form</h1>
        <p>Not really a dynamic field yet.</p>
        <div style={style}>
          <EditableDisplay name="field1" value={field1} onChange={this.update} />
        </div>
        <div style={style}>
          <EditableDisplay name="field4" value={field4} type="date" onChange={this.update} />
        </div>
        <div style={style}>
          <EditableDisplay name="field2" value={field2} onChange={this.update} />
        </div>
        <div style={style}>
          <EditableDisplay name="field3" value={field3} onChange={this.update} />
        </div>
        <h3>State</h3>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default hot(module)(DynamicField);
