document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const postContent = document.getElementById('post-content');
    const mainTitle = document.getElementById('main-title');
    const backButton = document.getElementById('back-button');

    const contentBasePath = 'content/';
    let posts = [
      {
        "title": "Staying Safe from Holiday Scams",
        "file": "holiday-security.html",
        "date": "2025-12-09",
        "summary": "The holiday season is a prime time for cybercriminals. Learn how to recognize and avoid common holiday scams to keep your personal information secure."
      },
      {
        "title": "The Flipper Zero: A Hacker's Swiss Army Knife in Your Pocket",
        "file": "flipper-zero-risks.html",
        "date": "2025-12-08",
        "summary": "The Flipper Zero is a powerful, portable multi-tool for pentesters and hardware enthusiasts. But in the wrong hands, it poses significant security risks. Let's explore what it is and why you should be aware."
      }
    ];

    function loadPosts() {
        displayPostList();
    }

    function displayPostList() {
        postList.innerHTML = '';
        postContent.innerHTML = '';
        mainTitle.textContent = 'The Digital Watchdog';
        postList.style.display = 'block';
        postContent.style.display = 'none';
        backButton.style.display = 'none';

        posts.forEach((post, index) => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.dataset.index = index;
            card.innerHTML = `
                <h2>${post.title}</h2>
                <p class="post-meta">Published on ${post.date}</p>
                <p>${post.summary}</p>
            `;
            card.addEventListener('click', () => loadPostContent(index));
            postList.appendChild(card);
        });
    }

    async function loadPostContent(index) {
        const post = posts[index];
        try {
            const res = await fetch(`${contentBasePath}${post.file}`);
            if (!res.ok) throw new Error(`Could not fetch ${post.file}`);
            const content = await res.text();
            
            postList.style.display = 'none';
            postContent.style.display = 'block';
            backButton.style.display = 'block';

            mainTitle.textContent = post.title;
            postContent.innerHTML = content;
        } catch (error) {
            console.error('Error loading post content:', error);
            postContent.innerHTML = `<p>Error loading post content. Please try again later.</p>`;
        }
    }

    backButton.addEventListener('click', displayPostList);

    loadPosts();
});
