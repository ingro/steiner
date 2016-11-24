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
            authError: 'Authentication failed, please login again!',
            titles: {
                success: 'Hooray!',
                fail: 'Oh snap!'
            }
        }
    },
    components: {
        labels: {
            actions: 'Actions',
            cancel: 'Cancel',
            create: 'Create',
            displaying: 'Displaying',
            edit: 'Edit',
            help: 'Help',
            profileAndSettings: 'Profile & Settings',
            reset: 'Reset',
            searchPlaceholder: 'Type to search...',
            submit: 'Save'
        },
        messages: {
            confirmDelete: 'Do you really want to delete the selected item?',
            confirmLogout: 'Are you really want to exit from the application?',
            confirmReload: 'The page needs to be reloaded in order to apply the changes.',
            confirmUnsaved: 'Are you sure? Any unsaved changes will be lost.',
            loading: 'Please wait...',
            noRows: 'No items to show'
        }
    }
};