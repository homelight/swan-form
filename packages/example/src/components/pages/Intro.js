import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';

class Intro extends PureComponent {
  render() {
    return (
      <div>
        <h1>Swan Form</h1>
        <p>
          Swan Form provides an interface to easily control components, handle forms, and put forms in sliders. Out of
          the box, it looks fairly plain, but it&apos;s easy to add some pizzazz and make them look nice.
        </p>
        <h2>Dependencies</h2>
        <p>
          The only real dependency is on lodash. It has peer dependencies of <code>react</code>, <code>react-dom</code>,
          and <code>prop-types</code>, which you are probably using anyway.
        </p>
        <h2>Fields</h2>
        <p>
          A general <code>Field</code> component is provided that gives you controlled components for all input types,
          textareas, and select fields. Pared down convenience submit and reset components are provided as well. Also, a{' '}
          <code>Radios</code> component is provided because radios are, well, different.
        </p>
        <p>
          We also ship a Higher Order Component —<code>asField</code> — so that it&apos;s easy for you to compose your
          own complex fields. <code>asField</code> provides the interface for any field to work with the Form component
          out of the box.
        </p>
        <h2>Forms</h2>
        <p>
          A <code>Form</code> component is provided as well.
        </p>
        <h2>Slider Forms (Form Wizards)</h2>
        <p>
          Swan Form was created at Eave in order to handle forms that isolated single questions so that the user can
          focus on one question at a time.
        </p>

        <h2>Other Questions</h2>
        <h3>Can I use it with Redux?</h3>
        <p>
          Internally, Swan Form just uses React&apos;s state, but it provides hooks for you to use Redux if you wish.
        </p>
      </div>
    );
  }
}

export default hot(module)(Intro);
