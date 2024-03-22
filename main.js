
// Adding a new post
document.getElementById('submitPost').addEventListener('click', function () {

  // accessing posts div
  const postsDiv = document.querySelector('.posts');

  // input fields
  const inputName = document.getElementById('name');
  const inputPostText = document.getElementById('post-msg');

  // creating and adding elements for a block of posts' text content
  const newPost = document.createElement('div');
  const newPostTextP = document.createElement('p');
  const newPostTextNode = document.createTextNode(inputPostText.value);

  newPostTextP.append(newPostTextNode);

  const newPostName = document.createElement('p');
  const newPostNameNode = document.createTextNode('Posted By: ' + inputName.value);

  // making the name element bold
  newPostName.style.fontWeight = 'bold';
  newPostName.style.fontSize = '14px';
  newPostName.appendChild(newPostNameNode);

  // creates a break line between posts
  const newPostHr = document.createElement('hr');

  
  // Create delete button, style it and append it
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('class', 'btn btn-danger pull-right fa-solid fa-delete-left');
  deleteBtn.addEventListener('click', function () {
    this.parentElement.remove()
  });
  
  // Comment post div, similar to postsDiv
  const commentPostDiv = document.createElement('div');
  commentPostDiv.setAttribute('class', 'comments');

  // Adding a comment to a post 
  const commentBtn = document.createElement('button');
  commentBtn.setAttribute('id', 'comment-btn');
  commentBtn.setAttribute('type', 'button');
  commentBtn.setAttribute('class', 'btn btn-warning');
  commentBtn.appendChild(document.createTextNode('Post a Comment'));

  // adding comment form section
  const commentForm = document.createElement('form');
  commentForm.setAttribute('style', 'margin-top: 30px');
  commentForm.setAttribute('onsubmit', 'event.preventDefault();');

  // creating the comment text div 
  const commentTextDiv = document.createElement('div');
  commentTextDiv.setAttribute('class', 'form-group');

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

  // appending post elements to display on posts div
  newPost.append(newPostTextP);
  newPost.append(newPostName);
  newPost.append(deleteBtn);
  newPost.append(commentBtn);
  newPost.append(newPostHr);
  postsDiv.append(newPost);

  // clear input fields after posting
  inputName.value = '';
  inputPostText.value = '';



});


