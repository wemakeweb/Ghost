import Ember from 'ember';
/*global device*/

export default Ember.TextField.extend({
    classNames: 'gh-input',

    value: Ember.computed('coords', function(){
        var coords = this.get("coords");
        return coords ? coords.join(', ') : ''
    }),

    updateCoords: function() {
    	var coords = this.get('value');
    	if(!coords || coords.trim() === ''){
    		return;
    	}

    	coords = coords.split(',');
    	
    	if(coords.length !== 2){
    		return;
    	}

    	this.set('coords', coords.map(parseFloat));
  	}.observes('value')
});
