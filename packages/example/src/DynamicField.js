/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Field } from '@flow-form/field';

/* @todo move this */
const minSize = { minHeight: '1em', minWidth: '3em' };
class EditableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.value,
    };
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      ...prevState,
      isEditing: true,
    }));
  }

  onBlur(target) {
    if (target.name !== this.props.name) {
      return;
    }

    this.props.onChange({ name: this.props.name, value: target.value });
    this.setState(prevState => ({
      ...prevState,
      value: target.value,
      isEditing: false,
    }));
  }

  render() {
    const { name, type } = this.props;
    if (this.state.isEditing) {
      return (
        <Field
          type={type || 'text'}
          name={name}
          value={this.state.value}
          handleEnterKey={this.onBlur}
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

export default class DynamicField extends Component {
  constructor(props) {
    super(props);
    this.state = { field1: 'HiHi', field2: 'What', field3: 'Something Else', field4: '' };
    this.update = this.update.bind(this);
  }

  update({ name, value }) {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  render() {
    const { field1, field2, field3, field4 } = this.state;
    return (
      <div>
        <h1>Flow Form</h1>
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
