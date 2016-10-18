import SteinerHelper from '../../src/index';

describe('SteinerHelper', () => {
    it('is instantiable', () => {
        const helper = new SteinerHelper();

        expect(helper).toBeInstanceOf(SteinerHelper);
    });

    describe('getCreateActionsOptions', () => {
        it('returns undefined if no helper options are defined', () => {
            const helper = new SteinerHelper();

            expect(helper.getCreateActionsOptions()).toEqual({});
        }); 

        it('returns actionMessageTemplates options if defined as messageTemplates', () => {
            const helper = new SteinerHelper({
                actionMessageTemplates: {
                    createFail: '${resource} cannot be created!',
                    createSuccess: '${resource} created!'
                }
            });

            expect(helper.getCreateActionsOptions()).toEqual({
                messageTemplates: {
                    createFail: '${resource} cannot be created!',
                    createSuccess: '${resource} created!'
                }
            });
        });

        it('returns actionMessages options if defined as messages', () => {
            const helper = new SteinerHelper({
                actionMessages: {
                    createFail: 'Hooray!',
                    createSuccess: 'Boooo'
                }
            });

            expect(helper.getCreateActionsOptions()).toEqual({
                messages: {
                    createFail: 'Hooray!',
                    createSuccess: 'Boooo'
                }
            });
        });

        it('allow to override the helper\'s options', () => {
            const helper = new SteinerHelper({
                actionMessageTemplates: {
                    createFail: '${resource} cannot be created!',
                    createSuccess: '${resource} created!'
                }
            });

            const options = {
                messageTemplates: {
                    deleteFail: '${resource} cleared!'
                }
            };

            expect(helper.getCreateActionsOptions(options)).toEqual({
                messageTemplates: {
                    deleteFail: '${resource} cleared!'
                }
            });
        });
    });
});