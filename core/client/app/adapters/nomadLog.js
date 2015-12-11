import DS from 'ember-data';
import Ember from 'ember';

const {inject} = Ember;

export default DS.RESTAdapter.extend({
    namespace: '_api/'
});
