import Ember from 'ember';
/*global device*/

export default Ember.TextField.extend({
    classNames: 'gh-input',

    value: Ember.computed('city', 'country', function(){
        return this.get('city') ? [this.get('city'), this.get('country')].join(', ') : '';
    }),

    updateCityCountry: function(){
    	var cc = this.get('value');
    	
    	if(!cc || cc.trim() === ''){
    		return;
    	}

    	cc = cc.split(',');
    	
    	if(cc.length !== 2){
    		return;
    	}
    	
    	this.set('city', String(cc[0]).trim());
    	this.set('country', String(cc[1]).trim());
    }.observes('value')
});
