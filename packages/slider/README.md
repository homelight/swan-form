# @swan-form/slider

Contains the slider forms for @swan-form.

## <Slide /> component

TL;DR: Don't use the slide component, but pass the slide objects to the slider.

The `Slide` component is used **only** internally and should not be used.

Ideally, we'd be able to write a slider like this:

```
<Slider>
  <Slide beforeExit={() => alert("Exiting")}>
    This is a slide
  </Slide>
  <Slide shouldShowIf={() => false}>
    <Field name="aTextField" />
  </Slide>
  <Slide render={(props => {props})} />
</Slider>
```

But the problem is that we want to attach the `shouldShowIf` functions and the `beforeExit` functionality to the slide itself, but those must be run by the slider component. The `Slider` component itself renders the `Slide` based on the logic there. Thus, treating the Slides as objects, allow the `Slider` to control that functionality without having to resort to fragile anti-patterns that access the Slide's methods.

## Development Note

This package is unstable, and it's not recommended that you use it yet.
