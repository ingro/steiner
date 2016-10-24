import SteinerHelper from '../../src/index';

describe('SteinerHelper', () => {
    it('is instantiable', () => {
        const helper = new SteinerHelper();

        expect(helper).toBeInstanceOf(SteinerHelper);
    });

    describe('getCreateActionsOptions', () => {
        it('returns undefined if no helper options are defined', () => {
            const helper = new SteinerHelper();

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        }); 

        it('returns actionMessageTemplates options if defined as messageTemplates', () => {
            const helper = new SteinerHelper({
                actionMessageTemplates: {
                    createFail: '${resource} cannot be created!',
                    createSuccess: '${resource} created!'
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns actionMessages options if defined as messages', () => {
            const helper = new SteinerHelper({
                actionMessages: {
                    createFail: 'Hooray!',
                    createSuccess: 'Boooo'
                }
            });

            // expect({ foo: 'bar' }).toMatchSnapshot();
            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns translated default messages', () => {
            const helper = new SteinerHelper({
                lang: 'it'
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns translated custom messages', () => {
            const helper = new SteinerHelper({
                defaultMessages: {
                    en: {
                        templates: {
                            actionMessages: {
                                createSuccess: 'Hooray ${resource}',
                                createFail: 'Booo ${resource}'
                            }
                        },
                        messages: {
                            notifications: {
                                titles: {
                                    success: 'Success',
                                    fail: 'Fail'
                                }
                            }
                        }
                    }
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
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

            expect(helper.getCreateActionsOptions(options)).toMatchSnapshot();
        });
    });
});