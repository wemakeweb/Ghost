import Ember from 'ember';
import DS from 'ember-data';
import SettingsSaveMixin from 'ghost/mixins/settings-save';
import ValidationEngine from 'ghost/mixins/validation-engine';
import DateFormatter from '../utils/date-formatting';
import {request as ajax} from 'ic-ajax';

const REQUIRED_FILES = ['city', 'country', 'arrival', 'coords'];

export const LocationItem = Ember.Object.extend(ValidationEngine, {
    city: '',
    country: '',
    departure: '',
    arrival: '',
    coords: '',

    last: false,

    validationType: 'navItem',

    isComplete: Ember.computed('city', 'country', 'arrival', 'coords', function () {
       return REQUIRED_FILES.every(function(field){
            return !!this.get(field);
        }, this);
    }),

    init: function () {
        this._super(...arguments);
        this.set('errors', DS.Errors.create());
        this.set('hasValidated', Ember.A());
    }
});


export default Ember.Controller.extend(SettingsSaveMixin, {
    config: Ember.inject.service(),
    notifications: Ember.inject.service(),

    locations: Ember.computed('model.locations', function () {
        var list = this.get('model.locations').sort(function(a, b) {
            return a.arrival - b.arrival
        }).map(function (data, index) {
            return LocationItem.create(data);
        });

        list.push(LocationItem.create({last: true}));
        return list//.reverse();
    }),

    updateLastNavItem: Ember.observer('locations.[]', function () {
        var navItems = this.get('locations');

        navItems.forEach(function (item, index, items) {
            if (index === (items.length - 1)) {
                item.set('last', true);
            } else {
                item.set('last', false);
            }
        });
    }),

    save: function () {
        var navSetting,
            locations = this.get('locations'),
            notifications = this.get('notifications'),
            self = this;

        return new Promise(function(resolve, reject){
            var data = self.get('locations').map(function (item) {
                if (item.get('last') && !item.get('isComplete')) {
                    return null;
                }

                return item.getProperties(
                    'city', 
                    'country',
                    'arrival',
                    'departure',
                    'coords',
                    'id',
                    'location_id'
                );
            });

            resolve(data.compact());
        }).then(function (data) {
            return ajax({
                url: '_api/log', 
                type: 'PATCH',
                dataType: 'json',
                data: {
                    locations: data
                }
            });
        })/*.then(function(){
            //self.set('model.locations', data);

            // trigger change event because even if the final JSON is unchanged
            // we need to have navigationItems recomputed.
            // self.get('model').notifyPropertyChange('locations');

            /*return self.get('model').save().catch(function (err) {
                notifications.showErrors(err);
            });
        })*/.catch(function (err) {
            console.log(err);
            notifications.showErrors(err);
            // TODO: noop - needed to satisfy spinner button
        });
    },

    actions: {
        addItem: function () {
            var navItems = this.get('locations'),
                lastItem = navItems.get('lastObject');

            if (lastItem && lastItem.get('isComplete')) {
                navItems.addObject(LocationItem.create({last: true})); // Adds new blank navItem
            }
        },

        deleteItem: function (item) {
            if (!item) {
                return;
            }

            var navItems = this.get('locations');

            navItems.removeObject(item);
        }
    }
});
