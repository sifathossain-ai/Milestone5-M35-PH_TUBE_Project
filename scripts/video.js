// 1 - Fetch, Load & Show Categories on HTML (BUTTON)

// Create LoadCategories

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log("ERROR IS: ", error))
};

// Remove Active Class

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove('active');
    }
    console.log(buttons);
}

// Show Category Wise Videos

const LoadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // Remove Active Class
            removeActiveClass();
            // Call Active Class
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            displayVideos(data.category);
        })
        .catch(error => console.log("ERROR IS: ", error))
}

// Search Items

document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
})

// Create DisplayCategories

const displayCategories = (data) => {
    const categoryDisplay = document.getElementById('categories');
    for (const item of data) {
        // console.log(item);

        // Create Button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id ="btn-${item.category_id}" onclick = "LoadCategoryVideos(${item.category_id})" class ="btn bg-gray-100 border-none category-btn">${item.category}</button>
        `
        // Add button to display
        categoryDisplay.appendChild(buttonContainer)
    }
};

loadCategories();

// Fetch, Load & Show Categories on HTML (VIDEOS)

async function loadVideos(searchText = "") {
    try {
        const video = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await video.json();
        displayVideos(data.videos)
        // console.log(data.videos);
    }
    catch (err) {
        console.log("ERROR IS: ", err)
    }
};

// Load Details Videos

const loadVideoDetails = async(videoID) => {
    const videoId = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`)
    const dataVideoID = await videoId.json();
    displayDetails(dataVideoID.video)
}

// Display Details

const displayDetails = (videoDetails) => {
    console.log(videoDetails)
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2 class = "text-xl font-bold my-2">Total Views: ${videoDetails.others.views}</h2>
        <p><span style = "color: red;">Description:</span> ${videoDetails.description}</p>
    `
    // way-1
    document.getElementById('showModalData').click();
    // way-2
    // document.getElementById('customModal').showModal();
}

const displayVideos = (data) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (data.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class = "min-h-[300px] flex flex-col gap-3 justify-center items-center">
                <img src = "assets/Icon.png"/>
                <h2 class = "text-xl font-bold text-center pt-2">Oops! Sorry, No Contain <br>Here Available</H>
            </div>
        `
    }
    else {
        videoContainer.classList.add('grid');
    }

    data.forEach(item => {
        // console.log(item)
        const card = document.createElement('div');
        card.classList = " ";
        card.innerHTML = `
            <figure class = "h-[200px] relative">
                <img
                src=${item.thumbnail}
                class = "h-full w-full object-cover rounded-lg"
                alt="Videos" />

                ${item.others.posted_date?.length == 0 ? "" :
                `<span class ="absolute right-2 bottom-2 bg-black rounded-md text-white py-1 px-1.5 text-center text-[10px]">
                    ${parseInt((item.others.posted_date) / 3600)} hrs ${parseInt(((item.others.posted_date) % 3600) / 60)} min ago</span>`
            }
            </figure>
            <div class="px-0 py-4 flex justify-between">
                <div class = "flex gap-4 items-center">
                    <div>
                        <img class = "h-10 w-10 object-cover rounded-full" src = ${item.authors[0].profile_picture} />
                    </div>

                    <div>
                        <h2 class = "font-bold">${item.title}</h2>
                        <div class = "flex gap-2">
                            <small class = "text-gray-500 font-semibold">${item.authors[0].profile_name}</small>
                            ${item.authors[0].verified === true ? `<i class="fa-solid fa-star text-[#2568EF]"></i>` : ""}
                        </div>
                    </div>
                </div>
                <p class = "">
                    <button onclick = "loadVideoDetails('${item.video_id}')" class = "bg-red-400 text-[12px] py-1 px-2 rounded-sm text-white font-semibold">Details</button>
                </p>
            </div>
        `;
        videoContainer.append(card);
    });
}

loadVideos();