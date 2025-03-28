import { Form, useNavigation } from '@remix-run/react';
import styles from './NewNote.css';

function NewNote() {
    const navigation = useNavigation();
    // navigation.state === ''  // 'idle', 'loading', 'submitted'
    const isSubmitting = navigation.state === 'submitting';
    console.log('navigation state', navigation.state);

    return (
        <Form method="post" id="note-form">
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id='title' name='title' required/>
            </p>

            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" required />
            </p>

            <div className="form-actions">
                <button disabled={isSubmitting}>{ isSubmitting ? 'Adding...' : 'Add Note'}</button>
            </div>
        </Form>
    )
}

export default NewNote

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}