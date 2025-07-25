console.log("Hello!")

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
    for(const item of data){
        console.log(item);

        // Create Button
        const button = document.createElement('button');
        button.classList = 'btn bg-gray-100 border-none';
        button.innerText = item.category;

        // Add button to display
        categoryDisplay.appendChild(button)
    }
}

loadCategories();

// Fetch, Load & Show Categories on HTML (VIDEOS)

async function loadVideos() {
    const video = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await video.json();
    console.log(data);
};

loadVideos();