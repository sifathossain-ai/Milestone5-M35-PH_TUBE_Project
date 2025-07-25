// 1 - Fetch, Load & Show Categories on HTML (BUTTON)

// Create LoadCategories

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log("ERROR IS: ", error))
};

// Create DisplayCategories

const displayCategories = (data) => {
    const categoryDisplay = document.getElementById('categories');
    for (const item of data) {
        // console.log(item);

        // Create Button
        const button = document.createElement('button');
        button.classList = 'btn bg-gray-100 border-none';
        button.innerText = item.category;

        // Add button to display
        categoryDisplay.appendChild(button)
    }
};

loadCategories();

// Fetch, Load & Show Categories on HTML (VIDEOS)

async function loadVideos() {
    try {
        const video = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await video.json();
        displayVideos(data.videos)
        // console.log(data.videos);
    }
    catch (err) {
        console.log("ERROR IS: ", err)
    }
};

const cardDemo = {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}

const displayVideos = (data) => {
    const videoContainer = document.getElementById('videos');
    data.forEach(item => {
        console.log(item)
        const card = document.createElement('div');
        card.classList = " ";
        card.innerHTML = `
            <figure>
                <img
                src=${item.thumbnail}
                alt="Videos" />
                </figure>
            <div class="card-body">
                <h2 class="card-title">Card Title</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        videoContainer.append(card);
    });
}

loadVideos();