try {
	require(['Core/Container/List'], function (List_) {
		var list = new List_.List();
		list.addAtEnd('apple');
		list.addAtEnd('banana');
		list.addAtEnd('cerish');
		alert(list.toString());		
	});
}
catch (error) {
	alert(error);
}
