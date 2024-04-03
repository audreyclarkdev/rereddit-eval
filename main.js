// Create an object to store posts
const posts = {};

// Function to add a new post
function addPost(name, text) {
  const postId = Object.keys(posts).length + 1;
  posts[postId] = {
    name,
    text,
    comments: [],
  };
};

// Function to display posts
function displayPosts() {
  const postsContainer = document.getElementsByClassName('posts')[0];
  postsContainer.innerHTML = '';
  
  for (const postId in posts) {
    const post = posts[postId];
    
    postsContainer.innerHTML = `
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
    `;
  }
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

  // Create delete button and add classes 
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('class', 'btn btn-danger pull-right fa-solid fa-delete-left');
  deleteBtn.addEventListener('click', function () {
    this.parentElement.remove()
  });

// Function to add a comment to a post
function addComment(postId, comment) {
  if (posts[postId]) {
    posts[postId].comments.push(comment);
  } else {
    console.error(`Post with ID ${postId} does not exist. Cannot push comment.`);
  }
};

// Function to show the comment input form
function displayCommentForm() {
  // Create a comments container
  const commentsContainer = document.querySelector('.comments-container');

  // Create comment post form
  const commentPosts = document.createElement('form');
  commentPosts.setAttribute('class', 'comments');
  commentPosts.setAttribute('style', 'margin-top: 30px');
  commentPosts.setAttribute('onsubmit', 'event.preventDefault();');

  // Creating the comment text div 
  const commentTextP = document.createElement('p');
  commentTextP.setAttribute('class', 'form-group');

  // creating the comment textarea input field
  const inputCommentText = document.createElement('textarea');
  inputCommentText.setAttribute('id', 'comment-msg');
  inputCommentText.setAttribute('type', 'text');
  inputCommentText.setAttribute('class', 'form-control');
  inputCommentText.setAttribute('placeholder', 'Write a comment');

  // creating the comment name p element
  const commentNameP = document.createElement('p');
  commentNameP.setAttribute('class', 'form-group');

  // creating the comment name input field
  const inputCommentName = document.createElement('input');
  inputCommentName.setAttribute('id', 'comment-author-name');
  inputCommentName.setAttribute('type', 'text');
  inputCommentName.setAttribute('class', 'form-control');
  inputCommentName.setAttribute('placeholder', 'Your Name');

  // creates a break line between posts
  const dividingLine = document.createElement('hr');

  commentsContainer.append(commentPosts);
  commentsContainer.append(commentTextP);
  commentsContainer.append(inputCommentText);
  commentsContainer.append(commentNameP);
  commentsContainer.append(inputCommentName);
  commentsContainer.append(deleteBtn);
  commentsContainer.append(dividingLine);

  return commentsContainer;
};

// Button and event listener for the comment input functionality
const commentFormBtn = document.querySelector('.open-comments');
commentFormBtn.addEventListener('click', function () {
  displayCommentForm();
});

// // delete button for comments
// function deletePost(event) {
//   if(event.target.classList.contains('delete-btn')){
//     const li = event.target.parentElement;
//     commentsContainer.removeChild(li);
//   }
// }

// Initial display of posts
displayPosts();
