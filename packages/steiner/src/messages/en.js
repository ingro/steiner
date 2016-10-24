export default {
    templates: {
        actionMessages: {
            createSuccess: '{{resource}} created with success!',
            createFail: 'An error occured while creating {{resource}}',
            updateSuccess: '{{resource}} updated successfully!',
            updateFail: 'An error occured while updating {{resource}}',
            deleteSuccess: '{{resource}} deleted with success!',
            deleteFail: 'An error occured while deleting {{resource}}'
        }
    },
    messages: {
        breadcrumbs: {
            editNew: 'Create new'
        },
        confirmDialog: {
            title: 'Warning!',
            btn_primary_text: 'Confirm',
            btn_secondary_text: 'Cancel'
        },
        notifications: {
            titles: {
                success: 'Hooray!',
                fail: 'Oh snap!'
            }
        }
    },
    components: {
        actions: 'Actions',
        cancel: 'Cancel',
        confirmDeleteMessage: 'Do you really want to delete the selected item?',
        create: 'Create',
        edit: 'Edit',
        inputListFilterPlaceholder: 'Type to search...',
        loadingMsg: 'Please wait...',
        noRowsMsg: 'No items to show',
        reset: 'Reset',
        submit: 'Save'
    }
};