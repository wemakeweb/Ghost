import {request as ajax} from 'ic-ajax';
import AuthenticatedRoute from 'ghost/routes/authenticated';
import CurrentUserSettings from 'ghost/mixins/current-user-settings';

export default AuthenticatedRoute.extend(CurrentUserSettings, {
    titleToken: 'Locations',

    classNames: ['settings-view-general'],

    model: function () {
    	return ajax('_api/log').then(function (locations) {
            return locations;
        }.bind(this));
    },

    actions: {
        save: function () {
            // since shortcuts are run on the route, we have to signal to the components
            // on the page that we're about to save.
            $('.page-actions .btn-blue').focus();

            this.get('controller').send('save');
        },

        willTransition: function () {
            // reset the model so that our CPs re-calc and unsaved changes aren't
            // persisted across transitions
            this.set('controller.model', null);
            return this._super(...arguments);
        }
    }
});




