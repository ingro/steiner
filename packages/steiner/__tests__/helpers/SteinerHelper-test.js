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
            // expect(helper.getCreateActionsOptions()).toEqual({
            //     messageTemplates: {
            //         createSuccess: '${resource} created with success!',
            //         createFail: 'An error occured while creating ${resource}',
            //         updateSuccess: '${resource} updated successfully!',
            //         updateFail: 'An error occured while updating ${resource}',
            //         deleteSuccess: '${resource} deleted with success!',
            //         deleteFail: 'An error occured while deleting ${resource}'
            //     }
            // });
        }); 

        it('returns actionMessageTemplates options if defined as messageTemplates', () => {
            const helper = new SteinerHelper({
                actionMessageTemplates: {
                    createFail: '${resource} cannot be created!',
                    createSuccess: '${resource} created!'
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();

            // expect(helper.getCreateActionsOptions()).toEqual({
            //     messageTemplates: {
            //         createFail: '${resource} cannot be created!',
            //         createSuccess: '${resource} created!'
            //     }
            // });
        });

        it('returns actionMessages options if defined as messages', () => {
            const helper = new SteinerHelper({
                actionMessages: {
                    createFail: 'Hooray!',
                    createSuccess: 'Boooo'
                }
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();

            // expect(helper.getCreateActionsOptions()).toEqual({
            //     messageTemplates: {
            //         createSuccess: '${resource} created with success!',
            //         createFail: 'An error occured while creating ${resource}',
            //         updateSuccess: '${resource} updated successfully!',
            //         updateFail: 'An error occured while updating ${resource}',
            //         deleteSuccess: '${resource} deleted with success!',
            //         deleteFail: 'An error occured while deleting ${resource}'
            //     },
            //     messages: {
            //         createFail: 'Hooray!',
            //         createSuccess: 'Boooo'
            //     }
            // });
        });

        it('returns translated default messages', () => {
            const helper = new SteinerHelper({
                lang: 'it'
            });

            expect(helper.getCreateActionsOptions()).toMatchSnapshot();

            // expect(helper.getCreateActionsOptions()).toEqual({
            //     messageTemplates: {
            //         createSuccess: '${resource} creato con successo!',
            //         createFail: 'Si è verificato un errore inaspettato durante la creazione di ${resource}',
            //         updateSuccess: '${resource} aggiornato con successo!',
            //         updateFail: 'Si è verificato un errore inaspettato durante l\'aggiornamento di ${resource}',
            //         deleteSuccess: '${resource} cancellato con successo!',
            //         deleteFail: 'Si è verificato un errore inaspettato durante la cancellazione di ${resource})'
            //     }
            // });
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

            // expect(helper.getCreateActionsOptions()).toEqual({
            //     messageTemplates: {
            //         createSuccess: 'Hooray ${resource}',
            //         createFail: 'Booo ${resource}'
            //     }
            // });
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

            // expect(helper.getCreateActionsOptions(options)).toEqual({
            //     messageTemplates: {
            //         deleteFail: '${resource} cleared!'
            //     }
            // });
        });
    });
});