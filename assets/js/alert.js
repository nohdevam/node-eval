$('#register').submit(function(event) {
	alert('Data Inserted Successfully!');
});

$('#update_user').submit(function(event) {
	event.preventDefault();

	var unindexed_array = $(this).serializeArray();
	var data = {};

	$.map(unindexed_array, function(n, i) {
		data[n['name']] = n['value'];
	});

	var request = {
		url: `http://localhost:3000/users/${data.id}`,
		method: 'PUT',
		data: data
	};

	$.ajax(request).done(function(response) {
		alert('Data Updated Successfully!');
	});
});

function deletedUser() {
	$.ajax({
		url: `http://localhost:3000/users/${id}`,
		type: 'DELETE',
		success: function(result) {
			console.log('deleted successfully !');
		}
	});
}

function deletedRecipe() {
	$.ajax({
		url: `http://localhost:3000/recipes/${id}`,
		type: 'DELETE',
		success: function(result) {
			console.log('deleted successfully !');
		}
	});
}
