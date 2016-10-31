import steinerHelper from '../../src/helpers/steinerHelper';

describe('steinerHelper', () => {
    it('is instantiables', () => {
        const helper = new steinerHelper();

        expect(helper).toBeInstanceOf(steinerHelper);
    });

    describe('getCreateActionsOptions', () => {
        it('returns undefined if no helper options are defined', () => {
            const helper = new steinerHelper();

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        }); 

        it('returns actionMessageTemplates options if defined as messageTemplates', () => {
            const helper = new steinerHelper({
                actionMessageTemplates: {
                    createFail: '{{resource}} cannot be created!',
                    createSuccess: '{{resource}} created!'
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns actionMessages options if defined as messages', () => {
            const helper = new steinerHelper({
                actionMessages: {
                    createFail: 'Hooray!',
                    createSuccess: 'Boooo'
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns translated default messages', () => {
            const helper = new steinerHelper({
                lang: 'it'
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();
        });

        it('returns translated custom messages', () => {
            const helper = new steinerHelper({
                defaultMessages: {
                    en: {
                        templates: {
                            actionMessages: {
                                createSuccess: 'Hooray {{resource}}',
                                createFail: 'Booo {{resource}}'
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
            const helper = new steinerHelper({
                actionMessageTemplates: {
                    createFail: '{{resource}} cannot be created!',
                    createSuccess: '{{resource}} created!'
                }
            });

            const options = {
                messageTemplates: {
                    deleteFail: '{{resource}} cleared!'
                }
            };

            expect(helper.getCreateActionsOptions(options)).toMatchSnapshot();
        });
    });

    describe('createDefaultState', () => {
        it('returns the default state defined in the reducer', () => {
            const helper = new steinerHelper();

            expect(helper.createDefaultState()).toMatchSnapshot();
        }) ;

        it('returns the custom state', () => {
            const helper = new steinerHelper();

            const result = helper.createDefaultState({
                list: {
                    filters: {
                        perPage: 50
                    }
                }
            });

            expect(result).toMatchSnapshot();
        });

        it('uses default values if defined', () => {
            const helper = new steinerHelper({
                defaultPerPage: 30
            });

            expect(helper.createDefaultState()).toMatchSnapshot();
        });

        it('returns the custom state even if a default is provided', () => {
            const helper = new steinerHelper({
                defaultPerPage: 50
            });

            const result = helper.createDefaultState({
                list: {
                    filters: {
                        perPage: 15
                    }
                }
            });

            expect(result).toMatchSnapshot();
        });
    });
});