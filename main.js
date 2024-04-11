// Access the posts container/div
const postsContainer = document.querySelector('.posts-container');
const commentsContainer = document.querySelector('.comments-container');

// Create an object to store posts
const postsObj = {};

// Function to add a new post
const addPost = function (name, text) {
  const postId = Object.keys(postsObj).length + 1;
  postsObj[postId] = {
    name,
    text,
    comments: [],
  };
  return postId;
};

// Function to display posts
const displayPosts = function (displayPostId) {
  let storedPosts = '';
  for (const postId in postsObj) {
    const post = postsObj[postId];
    storedPosts = storedPosts + `
      <div id="${postId}" >
        <p>${post.text}</p>
        <p><strong>${'- Posted by '+ post.name}</strong></p>
        <button class="open-comments btn btn-warning" onclick="displayCommentForm(${postId})">Comments</button>
        <button class="delete-btn btn btn-danger pull-right fa-solid fa-delete-left"></button>
        <div class="comments-container">
          <ul>
          ${post.comments.map((comment) => `<li>{comment}</li>`).join('')}
          </ul>
        </div>
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
    const postId = addPost(postName, postText);
    displayPosts(postId);
    document.getElementById('post-msg').value = '';
    document.getElementById('name').value = '';
  } else {
    alert('Please fill in both fields.');
  }
});

// Event listener for deleting a post
postsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const postId = event.target.parentElement.id;
    delete postsObj[postId];
    displayPosts();
  }
});

// Function to show the comment input form
const displayCommentForm = function (postId) {
  // Create container for comments and the form for comments
  const commentsContainer = document.querySelector('.comments-container');
    let commentInputForm = document.createElement('div');
    commentInputForm = commentInputForm.innerHTML + `
    <form style="margin-top: 30px" onsubmit="event.preventDefault();">
      <div class="form-group">
        <textarea
          id="comment-msg-${postId}"
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
    <button id="delete-btn-${postId}" class="btn btn-danger pull-right fa-solid fa-delete-left delete-btn-${postId} delete-comment"></button>
    <button id="submit-comment" class="btn btn-primary" onclick="addComment(${postId})">Submit Comment</button>
    <hr>`;
  
  commentsContainer.innerHTML += commentInputForm;
};

// Function to add a comment to a post
const addComment = function (postId) {
  const commentValue = document.getElementById('comment-msg-' + postId).value;
  if (postsObj[postId]) {
    postsObj[postId].comments.push(commentValue);
  } else {
    console.error(`Cannot submit this comment.`);
  }
};

const displayComments = function (postId) {
  const allComments = postsObj[postId].comments;

  if (allComments) {
    // Create a container for comments
    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments-list');
    for (let i = 0; i < allComments.length; i++) {
      const comment = document.createElement('li');
      comment.innerText = allComments[i];
      commentsList.appendChild(comment);
    }
    
    commentsContainer.appendChild(commentsList);
  } else {
    console.error(`Cannot display comments.`);
  }
};

// Event listener for submitting a new comment
document.querySelector('#submit-comment').addEventListener('click', () => {
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

// Event listener for deleting a post and comment
const deleteBtn = document.querySelector('#delete-btn-${postId}');
deleteBtn.addEventListener('click', (event) => {
  if(event.target.classList.contains('delete-btn-${postId}')) {
    // const container = event.target.parentElement;
    // commentsContainer.removeChild(container);
    this.parentElement.remove();
  }
});

commentsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn-${postId}')) {
    const postId = event.target.parentElement.id;
    delete postsObj[postId];
  }
});

// Create a button that shows and hides the comments
const showCommentsBtn = document.createElement('button');
  showCommentsBtn.setAttribute('class', 'open-comments btn btn-warning');
  showCommentsBtn.setAttribute('type', 'button');
  showCommentsBtn.innerHTML = 'Comments';
  showCommentsBtn.addEventListener('click', () => {
    const commentsClasses = commentsDiv.classList;
    if (commentsClasses.contains('d-none')) { 
        commentsClasses.remove('d-none'); 
      } else {commentsClasses.add('d-none');
    };
  });
  postsContainer.appendChild(showCommentsBtn);
