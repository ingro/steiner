import { createActions, createActionTypes, createDefaultMessages, createActionMessages } from '../../src/helpers/actionCreator';

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

describe('createActionTypes', () => {
    it('generates the correct action types', () => {
        const actionTypes = createActionTypes('posts');

        expect(actionTypes).toMatchSnapshot();
    });
});

describe('createActions', () => {
    it('generates the correct actions', () => {
        const actionTypes = createActionTypes('posts');

        const actions = createActions('posts', actionTypes);

        expect(actions.fetch(42)).toMatchSnapshot();
        expect(actions.list()).toMatchSnapshot();
        expect(actions.create({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.createSuccess({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.createFail({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.update(42, { foo: 'bar' })).toMatchSnapshot();
        expect(actions.updateSuccess({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.updateFail({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.delete(42)).toMatchSnapshot();
        expect(actions.deleteSuccess({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.deleteFail({ foo: 'bar' })).toMatchSnapshot();
        expect(actions.resetCurrent()).toMatchSnapshot();
        expect(actions.changePage(3)).toMatchSnapshot();
        expect(actions.changeOrder('name', 'DESC')).toMatchSnapshot();
        expect(actions.updateFilter('q', 'foo')).toMatchSnapshot();
        expect(actions.select(42)).toMatchSnapshot();
        expect(actions.deselect(42)).toMatchSnapshot();
        expect(actions.selectAll()).toMatchSnapshot();
        expect(actions.deselectAll()).toMatchSnapshot();
    })
})