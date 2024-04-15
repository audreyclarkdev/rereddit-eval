// access the input fields for the post
const textInput = document.getElementById('post-msg');
const nameInput = document.getElementById('name');

// access the post container
const postContainer = document.querySelector('.posts-container');

// add a new post by clicking the Submit Post button
document.getElementById('submit-post').addEventListener('click', () => {

  const  postText = textInput.value;
  const  postName = nameInput.value;

  // error handling for empty inputs
  if (postText === '' || postName === '') {
    alert('Please fill in both fields.');
    return;
  };

  // text from the input added to the post container
  const newPost = document.createElement('div');
  const newPostTextEl = document.createElement('p');
  const newPostTextNode = document.createTextNode(postText);
  newPostTextEl.appendChild(newPostTextNode);

  // name from the input added to the post container
  const newPostNameEl = document.createElement('p');
  const newPostNameNode = document.createTextNode('- Posted By: ' + postName);

  // make the name element bold and appending
  newPostNameEl.style.fontWeight = 'bold';
  newPostNameEl.appendChild(newPostNameNode);

  // create a break line between posts
  const divider = document.createElement('hr');
  
  // create delete button and add event listener to it
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('class', 'btn btn-danger btn-sm fa-solid fa-delete-left pull-right delete-btn');
  deleteBtn.addEventListener('click', (event) => {
    event.target.parentElement.remove()
  });
  
  // create a button that opens the comment form
  const commentFormBtn = document.createElement('button');
  commentFormBtn.setAttribute('class', 'comment-form btn btn-warning');
  commentFormBtn.setAttribute('type', 'button');
  commentFormBtn.innerHTML = 'Comments';
  
  // append post element, inputs, buttons into post div
  newPost.append(newPostTextEl);
  newPost.append(newPostNameEl);
  newPost.append(commentFormBtn);
  newPost.append(deleteBtn);
  
  // add the new post to the post container
  postContainer.append(newPost);

  // clear the input fields
  textInput.value = '';
  nameInput.value = '';

  // create container for comments
  const commentContainer = document.createElement('div');
  commentContainer.setAttribute('class', 'comments-container');  
  // append commentContainer to newPost
  newPost.append(commentContainer); 
  // newPost.append(divider);

  // event listener for the comment form button. When the button is clicked, create the comment form
  commentFormBtn.addEventListener('click', () => {
  
    // create the comment input form matching post form
    const commentForm = document.createElement('form');
    commentForm.setAttribute('style', 'margin-top: 30px');
    commentForm.setAttribute('onsubmit', 'event.preventDefault();');
    
    // create the comment text element 
    const commentTextForm = document.createElement('div');
    commentTextForm.setAttribute('class', 'form-group');
    
    // create the comment textarea input field
    const commentTextInput = document.createElement('textarea');
    commentTextInput.setAttribute('id', 'comment-msg');
    commentTextInput.setAttribute('type', 'text');
    commentTextInput.setAttribute('class', 'form-control');
    commentTextInput.setAttribute('placeholder', 'Write a comment');
    
    // create the comment name element
    const commentNameForm = document.createElement('div');
    commentNameForm.setAttribute('class', 'form-group');

    // create the comment name input field
    const commentNameInput = document.createElement('input');
    commentNameInput.setAttribute('id', 'comment-name');
    commentNameInput.setAttribute('type', 'text');
    commentNameInput.setAttribute('class', 'form-control');
    commentNameInput.setAttribute('placeholder', 'Your Name');

    // append comment inputs
    commentTextForm.append(commentTextInput);
    commentNameForm.append(commentNameInput);

    // create the comment submit button
    const submitCommentBtn = document.createElement('button');
    submitCommentBtn.setAttribute('id', 'submit-comment');
    submitCommentBtn.setAttribute('type', 'submit');
    submitCommentBtn.setAttribute('class', 'btn btn-primary');
    submitCommentBtn.innerHTML = 'Submit Comment';
    
    // append comment elements and inputs to the comment form, and then to the comment container
    commentForm.append(commentTextForm);
    commentForm.append(commentNameForm);
    commentForm.append(submitCommentBtn);
    commentContainer.append(commentForm);
    
    // add event listener for the submit comment button
    submitCommentBtn.addEventListener('click', () => {
      const commentText = commentTextInput.value;
      const commentName = commentNameInput.value;
      
      //error handling for a blank comment
      if (commentText === '' || commentName === '') {
        alert('Please fill in both fields.');
        return;
      };

      // create delete button for each comment
      const deleteComment = document.createElement('button');
      deleteComment.setAttribute('id', 'delete-comment');
      deleteComment.setAttribute('class', 'btn btn-danger btn-sm pull-right fa-solid fa-delete-left');
      deleteComment.setAttribute('type', 'button');
      
      // create button to toggle comments for each one
      const hideCommentsBtn = document.createElement('button');
      hideCommentsBtn.setAttribute('class', 'toggle-comments btn btn-warning btn-sm');
      hideCommentsBtn.setAttribute('type', 'button');
      hideCommentsBtn.innerHTML = 'Hide Comments';

      // create a new comments div for the comments to post to
      const newComment = document.createElement('div');
      const newCommentEl = document.createElement('p');
      const newCommentTextNode = document.createTextNode(commentText + '  - Commented By: ' + commentName);
      newCommentEl.appendChild(newCommentTextNode);
      newComment.append(newCommentEl);
      newComment.append(deleteComment);
      newComment.append(hideCommentsBtn);
      newPost.append(newComment);
      newComment.style.border = '1px solid white';
      newPost.append(divider);

      //commentContainer.append(newComment);
      
      // clear inputs after posting
      commentForm.style.display = 'none';
      commentTextInput.value = '';
      commentNameInput.value = '';

      // add event listener to button
      deleteComment.addEventListener('click', (event) => {
        event.target.parentElement.remove();
      });

      // add event listener for toggle button
      hideCommentsBtn.addEventListener('click', (event) => {
        event.target.parentElement.hidden = true;
        // const commentsClasses = commentContainer.classList;
        // if (commentsClasses.contains('d-none')) { 
        //     commentsClasses.remove('d-none'); 
        //   } else {commentsClasses.add('d-none');
        // };
      });
    });
  });
});