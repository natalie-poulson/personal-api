console.log("Sanity Check: JS is working!");

$(document).ready(function(){

///////////////Get all ///////
    $.ajax({
        method: 'GET',
        url: '/api/legacy',
        success: handleSuccess,
        error: handleError
    });
    function handleSuccess (json) {
        var legacies = json.data
        legacies.forEach( legacy => {
            $('#legacyTarget').append(`<li><p id="name">${legacy.name}</p><p id="address">${legacy.address}<p><p id="year">opened ${legacy.yearOpened}</p><button type="update" value="update" class="update" data-id=${legacy._id}>Update</button> <button type="delete" value="delete" class="delete" data-id=${legacy._id}>Delete</button></li>`);
        });
    };
///////////// Delete one /////
    $('#legacyTarget').on('click', '.delete', function (){
        console.log('clicked delete');
        // when user clicks delete, grab the id 
        var id = $(this).data("id")

        $.ajax({
            method:'DELETE',
            url:`/api/legacy/${id}`,
            success: deleteBookSuccess,
            error:handleError
        });
    });
        function deleteBookSuccess (json) {
            window.location.reload();
        };

//////////// Create one 
    $('form').on ('submit', function (e) { 
        e.preventDefault();
        console.log('button clicked');
        var newLegacy = {
            name : $('#name').val(),
            address: $('#address').val(),
            yearOpened: $('#yearOpened').val()
        }
        $.ajax({
            method: 'POST',
            url:'/api/legacy',
            data:newLegacy,
            success: newLegacySuccess,
            error: handleError
        });
    });
    function newLegacySuccess (json) {
        var legacy = json;
        $('#legacyTarget').append(`<li><p id="name">${legacy.name}</p><p id="address">${legacy.address}<p><p id="year">opened ${legacy.yearOpened}</p><button type="update" value="update" class="update" data-id=${legacy._id}>Update</button> <button type="delete" value="delete" class="delete" data-id=${legacy._id}>Delete</button></li>`);
    };
///////////////////// Update one   
    $('#legacyTarget').on('click', '.update', function (){
        console.log($(this));
        var id = $(this).data("id");
        // var info = {
        //     name:document.getElementById('name').textContent ,
        //     address:$('#address').text() ,
        //     yearOpened:$('#year') ,
        // }
        // console.log(info);

        $(this).parent().append (`<form id="updateForm">
        <input id="nameUpdate" type="text" name="name" placeholder="Name">
        <input id="addressUpdate" type="text" name="address" placeholder="Address">
        <input id="yearOpenedUpdate" type="text" name="yearOpened" placeholder="Year Established">
        <input type="submit" value="Submit"> 
        </form>`);
        $('form').on('submit', function (e) {
            e.preventDefault();
        
            var updatedLegacy = {
                name : $('#nameUpdate').val(),
                address: $('#addressUpdate').val(),
                yearOpened: $('#yearOpenedUpdate').val()
            }
            console.log(updatedLegacy);

            $.ajax({
                method:'PUT',
                url:`/api/legacy/${id}`,
                data: updatedLegacy,
                success: updatedLegacySuccess,
                error: handleError
            });        
        });
    });
    function updatedLegacySuccess (json) {
        var legacy = json;
        console.log(legacy);
        window.location.reload();
    };

///////////Error
    function handleError(e) {
        console.log('error', e);
        $('#legacyTarget').text('Failed to laod books, is the server working?');
    }

});
