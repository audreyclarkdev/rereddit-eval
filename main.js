// Access the posts container/div
const postsContainer = document.querySelector('.posts-container');

// Create an object to store posts
const postsObj = {};

// Function to add a new post
function addPost(name, text) {
  const postId = Object.keys(postsObj).length + 1;
  postsObj[postId] = {
    name,
    text,
    comments: [],
  };
};

// Function to display posts
function displayPosts() {
  let storedPosts = '';
  for (const postId in postsObj) {
    const post = postsObj[postId];
    storedPosts = storedPosts + `
      <div id="${postId}" >
        <p>${post.text}</p>
        <p><strong>${'- Posted by '+ post.name}</strong></p>
        <button class="open-comments btn btn-warning">Comments</button>
        <button class="delete-btn btn btn-danger pull-right fa-solid fa-delete-left"></button>
        <div class="comments-container">
          <ul>
          ${post.comments.map((comment) => `<li>${comment}</li>`).join('')}
          </ul>
        </div>
        <hr>
      </div>
    `;
  }
  postsContainer.innerHTML = storedPosts;
};

// Event listener for submitting a new post
document.getElementById('submit-post').addEventListener('click', () => {
  const postText = document.getElementById('post-msg').value;
  const postName = document.getElementById('name').value;

  if (postText !== '' && postName !== '') {
    addPost(postName, postText);
    displayPosts();
    document.getElementById('post-msg').value = '';
    document.getElementById('name').value = '';
  } else {
    alert('Please fill in both fields.');
  }
});

  // Function to add a comment to a post
function addComment(postId, comment) {
  if (postsObj[postId]) {
    postsObj[postId].comments.push(comment);
  } else {
    console.error(`Post with ID ${postId} does not exist. Cannot push comment.`);
  }
};

// Function to show the comment input form
function displayCommentForm() {

  // Create container for comments and the form for comments
  const commentsContainer = document.querySelector('.comments-container');
    const commentInputForm = document.createElement('div');
    commentInputForm = commentInputForm.innerHTML + `
    <form style="margin-top: 30px" onsubmit="event.preventDefault();">
      <div class="form-group">
        <textarea
          id="comment-msg"
          class="form-control"
          type="text"
          placeholder="Write a Comment"
        ></textarea>
      </div>
      <div class="form-group">
        <input
          id="comment-name"
          class="form-control"
          type="text"
          placeholder="Your Name"
        />
      </div>
    </form>
    <button id="submit-comment" class="btn btn-primary">Submit Comment</button>`;
  // };

  // creates a break line between posts
  const dividingLine = document.createElement('hr');

  commentsContainer.append(commentPosts);
  commentsContainer.append(commentTextP);
  commentsContainer.append(inputCommentText);
  commentsContainer.append(commentNameP);
  commentsContainer.append(inputCommentName);
  commentsContainer.append(deleteBtn);
  commentsContainer.append(dividingLine);
};

// Event listener for submitting a new comment
document.getElementById('submit-comment').addEventListener('click', () => {
  const commentText = document.getElementById('comment-msg').value;
  const commentName = document.getElementById('comment-name').value;

  if (commentText !== '' && commentName !== '') {
    addComment(postId, comment);
    document.getElementById('comment-msg').value = '';
    document.getElementById('comment-name').value = '';
  } else {
    alert('Please fill in both fields.');
  }
});


// // Create delete button and add classes 
  // const deleteBtn = document.createElement('button');
  // deleteBtn.setAttribute('id', 'delete-btn');
  // deleteBtn.setAttribute('type', 'button');
  // deleteBtn.setAttribute('class', 'btn btn-danger pull-right fa-solid fa-delete-left');
deleteBtn.addEventListener('click', (event) => {

  if(event.target.classList.contains('delete-btn')){
    const container = event.target.parentElement;
    commentsContainer.removeChild(container);
    postsContainer.removeChild(container);
  }
});

// Create a button that shows and hides the comments
const showCommentsBtn = document.createElement('button');
  showCommentsBtn.setAttribute('class', 'open-comments btn btn-warning');
  showCommentsBtn.setAttribute('type', 'button');
  showCommentsBtn.innerHTML = 'Comments';
  showCommentsBtn.addEventListener('click', function() {
    const commentsClasses = commentsDiv.classList;
    if (commentsClasses.contains('d-none')) { 
        commentsClasses.remove('d-none'); 
      } else {commentsClasses.add('d-none');
    };
  });
  postsDiv.appendChild(showCommentsBtn);


  
// old version form code created on the dom
  // // Create comment post form
  // const commentPosts = document.createElement('form');
  // commentPosts.setAttribute('class', 'comments');
  // commentPosts.setAttribute('style', 'margin-top: 30px');
  // commentPosts.setAttribute('onsubmit', 'event.preventDefault();');

  // // Creating the comment text div 
  // const commentTextP = document.createElement('p');
  // commentTextP.setAttribute('class', 'form-group');

  // // creating the comment textarea input field
  // const inputCommentText = document.createElement('textarea');
  // inputCommentText.setAttribute('id', 'comment-msg');
  // inputCommentText.setAttribute('type', 'text');
  // inputCommentText.setAttribute('class', 'form-control');
  // inputCommentText.setAttribute('placeholder', 'Write a comment');

  // // creating the comment name p element
  // const commentNameP = document.createElement('p');
  // commentNameP.setAttribute('class', 'form-group');

  // // creating the comment name input field
  // const inputCommentName = document.createElement('input');
  // inputCommentName.setAttribute('id', 'comment-author-name');
  // inputCommentName.setAttribute('type', 'text');
  // inputCommentName.setAttribute('class', 'form-control');
  // inputCommentName.setAttribute('placeholder', 'Your Name');
