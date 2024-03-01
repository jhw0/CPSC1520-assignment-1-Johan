document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('album-form');
    const albumTitleInput = document.getElementById('album-title');
    const albumDescriptionInput = document.getElementById('album-description');
    const albumArtSelect = document.getElementById('album-art');
    const albumsList = document.getElementById('all-albums-list');
    
    albumTitleInput.addEventListener('input', validateAlbumTitle);
    albumDescriptionInput.addEventListener('input', validateAlbumDescription);
    albumArtSelect.addEventListener('change', validateAlbumArt);

    form.addEventListener('submit', function(event) 
    {
        const isAlbumArtValid = validateAlbumArt();
        const isAlbumTitleValid = validateAlbumTitle();
        const isAlbumDescriptionValid = validateAlbumDescription();
        
        if (!isAlbumArtValid || !isAlbumTitleValid || !isAlbumDescriptionValid) 
        {
            event.preventDefault();
            console.log('Form submission prevented due to validation errors.');
        } 
        else 
        {
            console.log('Form is valid. Proceed with form submission logic here.');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateAlbumArt() && validateAlbumTitle() && validateAlbumDescription()) {
            createAlbumCard({
                title: albumTitleInput.value,
                description: albumDescriptionInput.value,
                image: albumArtSelect.value
            });
            form.reset();
            console.log('Album card created.');
        } else {
            console.log('Validation failed, no album card created.');
        }
    });

    function validateAlbumArt() {
        if (albumArtSelect.value === '') 
        {
            showError(albumArtSelect, 'Select album art');
            return false;
        } 
        else 
        {
            clearError(albumArtSelect);
            return true;
        }
    }

    function validateAlbumTitle() {
        if (albumTitleInput.value.length === 0 || albumTitleInput.value.length > 20) 
        {
            showError(albumTitleInput, 'Album title must be between 1 and 20 characters');
            return false;
        } 
        else 
        {
            clearError(albumTitleInput);
            return true;
        }
    }

    function validateAlbumDescription() 
    {
        if (albumDescriptionInput.value.length === 0 || albumDescriptionInput.value.length > 40) 
        {
            showError(albumDescriptionInput, 'Description must be between 1 and 40 characters');
            return false;
        } 
        else 
        {
            clearError(albumDescriptionInput);
            return true;
        }
    }

    function showError(inputElement, message) 
    {
        const formControl = inputElement.parentElement;
        const invalidFeedback = formControl.querySelector('.invalid-feedback');
        if (invalidFeedback) 
        {
            invalidFeedback.textContent = message;
            invalidFeedback.style.display = 'block'; 
        }
        inputElement.classList.add('is-invalid');
        return false; 
    }

    function clearError(inputElement) 
    {
        const formControl = inputElement.parentElement;
        const invalidFeedback = formControl.querySelector('.invalid-feedback');
        if (invalidFeedback) 
        {
            invalidFeedback.style.display = 'none'; 
        }
        inputElement.classList.remove('is-invalid');
    }

    function createAlbumCard(album) 
    {
        const cardHTML = 
            `
            <div class="col">
                <div class="card shadow-sm">
                    <img class="bd-placeholder-img card-img-top" src="img/${album.image}" />
                    <div class="card-body">
                        <h5 class="card-title">${album.title}</h5>
                        <p class="card-text">${album.description}</p>
                    </div>
                </div>
            </div>
            `;
        
        const range = document.createRange();
        const documentFragment = range.createContextualFragment(cardHTML);
        
        document.getElementById('all-albums-list').appendChild(documentFragment);
    }



});
