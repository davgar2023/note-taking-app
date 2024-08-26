// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

  const notesTable = document.getElementById('notes-table');
  const pagination = document.querySelector('.pagination');
  const noteAddButton = document.getElementById('note-add');
  const noteUpdateButton = document.getElementById('note-update');
  const noteIdInput = document.getElementById('note-id');

  let currentPage = 1;
  const notesPerPage = 10;

  // Event listener for button submission
  noteAddButton.addEventListener('click', async (e) => {
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const titleError = document.getElementById('title-error');
    const contentError = document.getElementById('content-error');

    // Clear previous errors
    titleError.classList.remove('error-message');
    contentError.classList.remove('error-message');
    titleError.style.display = 'none';
    contentError.style.display = 'none';

    var valid = true;

    // Validate title
    if (title.trim().length < 3 || title.trim().length > 100) {
        titleError.classList.add('error-message');
        titleError.style.display = 'block';
        valid = false;
    }

    // Validate content
    if (content.trim().length < 10) {
        contentError.classList.add('error-message');
        contentError.style.display = 'block';
        valid = false;
    }

    if (valid) {

        try {
          const response = await axios.post('/api/notes', {
            title: title,
            content: content
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
            withCredentials: true // Ensures cookies are included with the request
          });

          if (response.status === 200) {
            loadNotes(currentPage); // Reload notes after adding a new one
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
          }
        } catch (err) {
          console.error('Error:', err);
        }
   }
  });


  // Event listener for updating a note
  noteUpdateButton.addEventListener('click', async (e) => {
 
    const noteId = noteIdInput.value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const titleError = document.getElementById('title-error');
    const contentError = document.getElementById('content-error');

    // Clear previous errors
    titleError.classList.remove('error-message');
    contentError.classList.remove('error-message');
    titleError.style.display = 'none';
    contentError.style.display = 'none';


    try {
      const response = await axios.put(`/api/notes/${noteId}`, {
        title: title,
        content: content
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
        withCredentials: true
      });

      if (response.status === 200) {
        loadNotes(currentPage);
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        noteIdInput.value = ''; // Clear the hidden note ID
        noteUpdateButton.classList.add('d-none'); // Hide update button
        noteAddButton.classList.remove('d-none'); // Show add button
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
  
  // Function to load and display notes in the table
  const loadNotes = async (page) => {
    try {
      const response = await axios.get(`/api/notes?page=${page}&limit=${notesPerPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
        withCredentials: true
      });

      if (response.status === 200) {
        const { notes, totalPages } = response.data;
        notesTable.innerHTML = ''; // Clear the table before displaying new notes

        // Display each note in a new table row
        notes.forEach((note, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1 + (page - 1) * notesPerPage}</td>
            <td class="text-wrap text-wrap-title">${note.title}</td>
            <td class="text-wrap text-wrap-content">${note.content}</td>
            <td>${new Date(note.createdAt).toLocaleDateString()}</td>
            <td>
              <button class="btn btn-info btn-sm edit-btn" data-id="${note._id}" data-title="${note.title}" data-content="${note.content}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${note._id}">Delete</button>
            </td>
          `;
          notesTable.appendChild(row);
        });



        // Add event listeners for Edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', (e) => {
            const noteId = e.target.getAttribute('data-id');
            const noteTitle = e.target.getAttribute('data-title');
            const noteContent = e.target.getAttribute('data-content');
            
            document.getElementById('title').value = noteTitle;
            document.getElementById('content').value = noteContent;
            noteIdInput.value = noteId;

            noteAddButton.classList.add('d-none'); // Hide add button
            noteUpdateButton.classList.remove('d-none'); // Show update button
          });
        });

        // Add event listeners to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', async (e) => {
            const noteId = e.target.getAttribute('data-id');
            console.log(noteId);
            await deleteNote(noteId);
          });
        });

        // Update pagination
        updatePagination(totalPages, page);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Function to delete a note
  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/api/notes/${noteId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
        withCredentials: true
      });

      if (response.status === 200) {
        loadNotes(currentPage); // Reload notes after deleting one
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // Function to update pagination controls
  const updatePagination = (totalPages, currentPage) => {
    pagination.innerHTML = ''; // Clear current pagination

    // Previous button
    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    }
    prevButton.innerHTML = `
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    `;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadNotes(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      if (i === currentPage) {
        pageItem.classList.add('active');
      }
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageItem.addEventListener('click', () => {
        currentPage = i;
        loadNotes(currentPage);
      });
      pagination.appendChild(pageItem);
    }

    // Next button
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    }
    nextButton.innerHTML = `
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    `;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        loadNotes(currentPage);
      }
    });
    pagination.appendChild(nextButton);
  };

  // Initial call to load notes on page load
  loadNotes(currentPage);


  const logoutButton = document.getElementById('logout-button');

        logoutButton.addEventListener('click', function() {
            axios.post('/api/auth/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true  // Include cookies in the request
            })
            .then(response => {
                if (response.data.message === 'Logged out successfully') {
                    window.location.replace('/login'); // Redirect to login page after logout
                } else {
                    console.error('Logout failed:', response.data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


});
