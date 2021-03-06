var TerminateInstancesView = Backbone.View.extend({
    
    _template: _.template($('#terminateInstancesFormTemplate').html()),
    
    events: {
        'click #cancelBtn': 'close',
      	'click #close': 'close',
      	'click .modal-backdrop': 'close',
      	'click #confirm_terminate': 'onTerminateInstance'
    },
    
   	initialize: function() {
        this.model.bind("change", this.render, this);
        this.model.fetch();

    },
    
   	render: function () {
        if ($('#instances_terminate').html() != null) {
            $('#instances_terminate').remove();
        	$('.modal-backdrop').remove();
        }
        $(this.el).append(this._template({model:this.model}));
        $('.modal:last').modal();
        return this;
    },
    
    onTerminateInstance: function(e){
    	e.preventDefault();	
  		for (var index = 0; index < this.model.length; index++) { 
		var instanceId = this.model.models[index].get('id');	 		
		if($("#checkbox_"+instanceId).is(':checked'))
				{
				var instance =  this.model.models[index];      
        		console.log("Instances to terminate = " +this.model.models[index].get('id'));
        		//instance.destroy(); 
        		console.log("For the moment not terminating");
        		$('#instances_terminate').remove();
        		$('.modal-backdrop').remove();     
				}
      	}  
      	this.model.fetch();  
    },	
    
    close: function(e) {
        this.model.unbind("change", this.render, this);
        $('#instances_terminate').remove();
        $('.modal-backdrop').remove();
    },
   
});