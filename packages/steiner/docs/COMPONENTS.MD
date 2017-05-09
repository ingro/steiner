# Components

## FormWrapper

It renders a form enhanced with some functionality (thanks to `redux-form` and `react-router`):

- it asks confirm if you try to navigate away if some form values have been changed;
- it render a standard set of buttons via `FormControls` component
- it submits the form via `redux-form`'s submit action

```
import { FormWrapper } from 'steiner';
import { reduxForm, Field } from 'redux-form';

class Edit extends Component {
    render() {
        return (
            <FormWrapper
                {...this.props}
                cancelLink={"/posts"}
                submit={this.submit}
            >
                <Field
                    name="title"
                    component={InputField}
                />
            </FormWrapper>
        );
    }
}

export default reduxForm({
    form: 'posts'
})(Edit);

```

### Properties

- `cancelLink` (string|object): the url to which the cancel button should point
- `goBackAfterSave` (bool): if the browser should navigate to the url provided by `cancelLink` after a successfully submit (default: **true**)
- `outerControlsClass` (string): css class to apply to the form control's wrapper (default: "**row**")
- `submit` (func): the submit function
- `unsavedMessage` (string): the confirm message displayed to the user before navigating away from a dirty form

## FormControls

It renders the standard toolbar of actions for the forms, with a cancel, a reset and a submit button. It's used by default in the `FormWrapper` component.

```
import { FormControls } from 'steiner';

class Form extends Component {
    render() {
        return (
            <form>
                ...
                <FormControls
                    valid={valid}
                    submitting={submitting}
                    dirty={dirty}
                    cancelLink={() => {}}
                    onReset={() => {}}
                />
            </form>
        );
    }
}
```

### Properties

- `cancelLabel` (string): the label of the cancel button
- `cancelLink` (string|object): the url to which the cancel button should point
- `dirty` (bool): to know if the form is in a dirty state
- `onReset` (func): a function to be called when the reset button is clicked
- `resetLabel` (string): the label of the reset button
- `submitLabel` (string): the label of the submit button
- `submitting` (bool): to know if the form is submitting to the endpoint

## KeyBinderHoc

High order component that let you easily setup hotkeys actions via `mousetrap`. It render the wrapper component with two additional props:

- bindShortcut(key, callback, global = false);
- unbindShortcut(key);

Key bindings are cleared anyway when the component get unmounted.

```
import { KeyBinderHoc } from 'steiner';

class QuickEdit extends Component {
    componentDidMount() {
        this.props.bindShortcut(['ctrl+e', 'command+e'], (event) => {
            event.preventDefault();

            // handle the event
        }, true);
    }

    render() {
        return (
            <div>
                <h3>My component</h3>
            </div>
        );
    }
}

export default KeyBinderHoc(QuickEdit);
```