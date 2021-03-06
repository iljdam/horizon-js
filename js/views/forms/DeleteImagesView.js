var DeleteImagesView = Backbone.View.extend({
    
    _template: _.template($('#deleteImagesFormTemplate').html()),
    
   	initialize: function() {
        this.model.bind("change", this.render, this);
        this.model.fetch();
    },
    
    events: {
        'click #confirm_delete': 'onDeleteImages',
        'click #cancelBtn': 'close',
      	'click #close': 'close',
      	'click .modal-backdrop': 'close'
    },
    
   	render: function () {
        console.log("Rendering delete images");
        if ($('#delete_images').html() != null) {
            $('#delete_images').remove();
        	$('.modal-backdrop').remove();
        }
        $(this.el).append(this._template({model:this.model}));
        $('.modal:last').modal();
        return this;
    },
       
    onDeleteImages: function(e){
	    	e.preventDefault(); 	           	
	  		for (var index = 0; index < this.model.length; index++) { 
			var imageId = this.model.models[index].get('id');	 		
			if($("#checkbox_"+imageId).is(':checked'))
					{
					var image =  this.model.models[index];      
	        		console.log("Image to delete = " +this.model.models[index].get('id'));
	        		image.destroy();      
					}
	      	}  
	      	this.model.fetch();  
	    },
    
    close: function(e) {
        this.model.unbind("change", this.render, this);
        $('#delete_images').remove();
        $('.modal-backdrop').remove();
    },
   
});