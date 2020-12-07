const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
const numQuestion = document.querySelector('#numQuestion');

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `perguntas.json`
  );

  const data = await res.json();

  return data;
}

// Show posts in DOM
async function showPosts() {
  const questions = await getPosts();
  questions.forEach((question, id) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${id + 1}</div>
      <div class="post-info">
        <h2 class="post-pergunta">${question.pergunta}</h2>
        <p class="post-body">${question.resposta}</p>
      </div>
    `;
    numQuestion.innerHTML = id + 1;
    postsContainer.appendChild(postEl);
  });
}



// Filter question+ by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-pergunta').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show initial posts
showPosts();


filter.addEventListener('input', filterPosts);
