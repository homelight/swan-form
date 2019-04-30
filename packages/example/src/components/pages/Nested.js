import React, { Component } from 'react';
import { Field, asField } from '@swan-form/field';

const isEmptyString = v => v === '';
const valueOrTag = v => (isEmptyString(v) ? '<empty string>' : v);

class TestComponent extends Component {
  static displayName = 'TestComponent';

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState);
    Object.keys(prevProps).forEach(key => {
      if (prevProps[key] !== this.props[key]) {
        console.log(`Props[${key}]: ${valueOrTag(prevProps[key])} => ${valueOrTag(this.props[key])}`);
      }
    });

    if (prevState) {
      Object.keys(prevState).forEach(key => {
        if (prevState[key] !== this.state[key]) {
          console.log(`State[${key}]: ${valueOrTag(prevState[key])} => ${valueOrTag(this.state[key])}`);
        }
      });
    }
  }

  render() {
    const { setValue, setRef, isFormSubmitting, hasFormSubmitted, ...props } = this.props;

    return <input ref={setRef} {...props} />;
  }
}

const Test = asField(TestComponent);

class TestWrapper extends Component {
  static displaName = 'TestWrapper';

  componentDidUpdate(prevProps, prevState) {
    console.log('Updating the <TestWrapper />');
    // console.log(prevProps, prevState);
    Object.keys(prevProps).forEach(key => {
      if (prevProps[key] !== this.props[key]) {
        console.log(`Props[${key}]: ${valueOrTag(prevProps[key])} => ${valueOrTag(this.props[key])}`);
      }
    });

    if (prevState) {
      Object.keys(prevState).forEach(key => {
        if (prevState[key] !== this.state[key]) {
          console.log(`State[${key}]: ${valueOrTag(prevState[key])} => ${valueOrTag(this.state[key])}`);
        }
      });
    }
  }

  render() {
    const { setValue, setRef, isFormSubmitting, hasFormSubmitted, children, ...props } = this.props;
    const [child] = React.Children.toArray(children);
    return (
      <>
        <button type="button" onClick={() => setValue('Testing')}>
          Set Value
        </button>
        {React.cloneElement(child, { ...props })}
      </>
    );
  }
}

const Wrapper = asField(TestWrapper);

export class Nested extends Component {
  render() {
    return (
      <div>
        Nested!
        <div>
          <Field type="text" placeholder="Regular <Field />" />
        </div>
        <div>
          <Test type="text" />
        </div>
        <div>
          <Wrapper placeholder="Testing one two three">
            <Test type="text" name="test-wrapped" />
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default Nested;
