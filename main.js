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
    storedPosts += `
      <div id="${postId}" >
        <p>${post.text}</p>
        <p><strong>${'- Posted by '+ post.name}</strong></p>
        <button class="open-comments btn btn-warning" onclick="displayCommentForm(${postId})">Comments</button>
        <button class="delete-btn btn btn-danger pull-right fa-solid fa-delete-left"></button>
        <div class="comments-container">
          <ul>
          ${post.comments.map((comment) => `<li>${comment}</li>`).join('')}
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
  const commentsContainer = document.getElementById(postId).getElementsByClassName('comments-container')[0];
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
    <button id="submit-comment" class="btn btn-primary" onclick="addComment(${postId})">Submit Comment</button>
    <hr>`;
  
  commentsContainer.innerHTML += commentInputForm;
  commentsContainer.appendChild(commentInputForm);
};

// Event Listener for submitting a comment 
const addComment = function (postId) {
  const commentText = document.getElementById('comment-msg-' + postId).value;
  const commentName  = document.getElementById('comment-name-' + postId).value;

  if (commentText !== '' && commentName !== '') {
    if (postsObj[postId]) {
    postsObj[postId].comments.push({ text: commentText, name: commentName });
    displayComments(postId);
    } else {
    console.error(`Cannot submit this comment.`);
    }
    document.getElementById('comment-msg-' + postId).value = '';
    document.getElementById('comment-name-' + postId).value = '';
  } else {
    alert('Please fill in both fields.');
  }
};

const displayComments = function (postId) {
  const post = postsObj[postId];
  const commentsContainer = document.getElementById(postId).getElementsByClassName('comments-container')[0];
  commentsContainer.innerHTML = ''; // clear previous comments

  // Create a container for comments
  const commentsList = document.createElement('ul');
  commentsList.classList.add('comments-list');
  post.comments.forEach(comment => {
    const commentItem = document.createElement('li');
    commentItem.textContent = `${comment.name}: ${comment.text}`;
    commentsList.appendChild(commentItem);
  });
  commentsContainer.appendChild(commentsList);
};

// create the submit comment button
const submitCommentBtn = document.createElement('button');
submitCommentBtn.setAttribute('id', 'submit-comment');
submitCommentBtn.setAttribute('type', 'button');
submitCommentBtn.setAttribute('class', 'btn btn-warning');
submitCommentBtn.appendChild(document.createTextNode('Submit Comment'));
commentInputForm.appendChild(submitCommentBtn);

// Event listener for submitting a new comment
submitCommentBtn.addEventListener('click', () => {
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

// Create delete button, style it and add event listener to it
const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('id', '`delete-btn-${postId}`');
deleteBtn.setAttribute('type', 'button');
deleteBtn.setAttribute('class', 'btn btn-danger pull-right fa-solid fa-delete-left `delete-btn-${postId}`');
deleteBtn.addEventListener('click', function () {
  event.target.parentElement.remove()
});

// // Event listener for deleting a post and comment
// const deleteBtn = document.querySelector(`#delete-btn-${postId}`);
// deleteBtn.addEventListener('click', (event) => {
//   if(event.target.classList.contains('delete-btn-${postId}')) {
//     // const container = event.target.parentElement;
//     // commentsContainer.removeChild(container);
//     this.parentElement.remove();
//   }
// });

// commentsContainer.addEventListener('click', (event) => {
//   if (event.target.classList.contains(`delete-btn-${postId}`)) {
//     const postId = event.target.parentElement.id;
//     delete postsObj[postId];
//   }
// });

// Create a button that shows and hides the comments
const showCommentsBtn = document.createElement('button');
showCommentsBtn.setAttribute('class', 'open-comments btn btn-warning');
showCommentsBtn.setAttribute('type', 'button');
showCommentsBtn.innerHTML = 'Comments';
postsContainer.appendChild(showCommentsBtn);

showCommentsBtn.addEventListener('click', () => {
  const commentsClasses = commentsContainer.classList;
  if (commentsClasses.contains('d-none')) { 
      commentsClasses.remove('d-none'); 
    } else {commentsClasses.add('d-none');
  };
});

