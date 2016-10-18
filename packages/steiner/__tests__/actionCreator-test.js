import { createDefaultMessages, createActionMessages } from '../src/helpers/actionCreator';

const defaultPostsMessages = {
    createFail: 'An error occured while creating posts',
    createSuccess: 'posts created with success!',
    deleteFail: 'An error occured while deleting posts',
    deleteSuccess: 'posts deleted with success!',
    updateFail: 'An error occured while updating posts',
    updateSuccess: 'posts updated successfully!',
};

describe('createDefaultMessages', () => {
    it('generate default messages if no custom templates are provided', () => {
        const defaultMessages = createDefaultMessages('posts');

        expect(defaultMessages).toEqual(defaultPostsMessages);
    });

    it('handles custom templates correctly', () => {
        const templates = {
            createFail: '${resource} cannot be created!',
            createSuccess: '${resource} created!'
        };

        const defaultMessages = createDefaultMessages('posts', templates);

        expect(defaultMessages).toEqual({
            createFail: 'posts cannot be created!',
            createSuccess: 'posts created!',
            deleteFail: 'An error occured while deleting posts',
            deleteSuccess: 'posts deleted with success!',
            updateFail: 'An error occured while updating posts',
            updateSuccess: 'posts updated successfully!'
        });
    });   
});

describe('createActionMessages', () => {
    it('returns default messages if no messages or templates are provided', () => {
        const messages = createActionMessages('posts');

        expect(messages).toEqual(defaultPostsMessages);
    });

    it('returns custom messages if provided', () => {
        const customMessages = {
            createFail: 'Booooo',
            createSuccess: 'Hoooray'
        };

        const messages = createActionMessages('posts', { messages: customMessages });

        expect(messages).toEqual({
            createFail: 'Booooo',
            createSuccess: 'Hoooray',
            deleteFail: 'An error occured while deleting posts',
            deleteSuccess: 'posts deleted with success!',
            updateFail: 'An error occured while updating posts',
            updateSuccess: 'posts updated successfully!'
        });
    });

    it('generates messages from custom templates', () => {
        const templates = {
            createFail: '${resource} cannot be created!',
            createSuccess: '${resource} created!'
        };

        const messages = createActionMessages('posts', { messageTemplates: templates });

        expect(messages).toEqual({
            createFail: 'posts cannot be created!',
            createSuccess: 'posts created!',
            deleteFail: 'An error occured while deleting posts',
            deleteSuccess: 'posts deleted with success!',
            updateFail: 'An error occured while updating posts',
            updateSuccess: 'posts updated successfully!'
        });
    })
});