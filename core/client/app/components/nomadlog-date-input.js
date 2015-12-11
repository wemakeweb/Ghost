import Ember from 'ember';
/*global device*/

export default Ember.TextField.extend({
    classNames: 'gh-input',

    value: Ember.computed('date', function(){
        var date = this.get('date');
        return date ? moment(date).format(this.get('format') || 'DD.MM.YYYY') : ''
    }),

    updateDate: function() {
    	var date = this.get('value') ? moment(this.get('value'), this.get('format') || 'DD.MM.YYYY', true).toISOString(): ''
    	this.set('date', date);
  	}.observes('value')
});
