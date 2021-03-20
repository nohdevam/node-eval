$('#add_user').submit(function(event) {
	alert('Data Inserted Successfully!');
});

$('#update_user').submit(function(event) {
	alert('Update done successfully !');
});

if (window.location.pathname == '/') {
	$ondelete = $('.table tbody td a.delete');
	$ondelete.click(function() {
		var id = $(this).attr('data-id');

		var request = {
			url: `http://localhost:3000/users/${id}`,
			method: 'DELETE'
		};

		if (confirm('Do you really want to delete this record?')) {
			$.ajax(request).done(function(response) {
				alert('Data Deleted Successfully!');
				location.reload();
			});
		}
	});
}
