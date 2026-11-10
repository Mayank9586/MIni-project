
// ===================================
// ANIMEVERSE - SHARED JAVASCRIPT
// ===================================

const animeData = [
    {
        id: 1,
        title: "Naruto",
        genre: ["Action", "Adventure"],
        rating: 8.4,
        episodes: 220,
        year: 2002,
        status: "Completed",
        color: "linear-gradient(135deg,#f97316,#7c2d12)",
        description: "Naruto Uzumaki dreams of becoming the strongest ninja and earning the respect of his village. Follow his journey of friendship, challenges and determination."
    },
    {
        id: 2,
        title: "Attack on Titan",
        genre: ["Action", "Drama"],
        rating: 9.1,
        episodes: 87,
        year: 2013,
        status: "Completed",
        color: "linear-gradient(135deg,#475569,#111827)",
        description: "Humanity fights for survival behind enormous walls while mysterious Titans threaten the last remaining cities."
    },
    {
        id: 3,
        title: "One Piece",
        genre: ["Adventure", "Fantasy"],
        rating: 9.0,
        episodes: 1100,
        year: 1999,
        status: "Ongoing",
        color: "linear-gradient(135deg,#0ea5e9,#164e63)",
        description: "Monkey D. Luffy and his crew sail across the seas in search of the legendary treasure known as One Piece."
    },
    {
        id: 4,
        title: "Demon Slayer",
        genre: ["Action", "Fantasy"],
        rating: 8.7,
        episodes: 63,
        year: 2019,
        status: "Ongoing",
        color: "linear-gradient(135deg,#16a34a,#14532d)",
        description: "Tanjiro Kamado joins the Demon Slayer Corps to protect people and find a way to help his sister."
    },
    {
        id: 5,
        title: "Death Note",
        genre: ["Mystery", "Thriller"],
        rating: 9.0,
        episodes: 37,
        year: 2006,
        status: "Completed",
        color: "linear-gradient(135deg,#7e22ce,#1e1b4b)",
        description: "A mysterious notebook gives its owner the power to determine a person's fate, leading to a battle of intelligence."
    },
    {
        id: 6,
        title: "Jujutsu Kaisen",
        genre: ["Action", "Fantasy"],
        rating: 8.6,
        episodes: 47,
        year: 2020,
        status: "Ongoing",
        color: "linear-gradient(135deg,#6d28d9,#312e81)",
        description: "Yuji Itadori enters the dangerous world of curses after becoming involved with a powerful cursed object."
    },
    {
        id: 7,
        title: "Your Name",
        genre: ["Romance", "Drama"],
        rating: 8.8,
        episodes: 1,
        year: 2016,
        status: "Movie",
        color: "linear-gradient(135deg,#ec4899,#312e81)",
        description: "Two teenagers discover a strange connection when they begin switching bodies and searching for each other."
    },
    {
        id: 8,
        title: "Solo Leveling",
        genre: ["Action", "Fantasy"],
        rating: 8.7,
        episodes: 25,
        year: 2024,
        status: "Ongoing",
        color: "linear-gradient(135deg,#2563eb,#111827)",
        description: "Sung Jinwoo begins as a weak hunter but receives a mysterious system that allows him to grow stronger."
    },
    {
        id: 9,
        title: "Spy x Family",
        genre: ["Comedy", "Action"],
        rating: 8.5,
        episodes: 37,
        year: 2022,
        status: "Ongoing",
        color: "linear-gradient(135deg,#d97706,#78350f)",
        description: "A spy, an assassin and a telepath form an unusual family while hiding their secrets from each other."
    },
    {
        id: 10,
        title: "Haikyuu!!",
        genre: ["Sports", "Comedy"],
        rating: 8.8,
        episodes: 85,
        year: 2014,
        status: "Completed",
        color: "linear-gradient(135deg,#ea580c,#7f1d1d)",
        description: "Shoyo Hinata works hard to become a great volleyball player despite his short height."
    }
];

// ===================================
// SHARED FUNCTIONS
// ===================================

function getWatchlist() {
    return JSON.parse(localStorage.getItem("animeverseWatchlist") || "[]");
}

function saveWatchlist(list) {
    localStorage.setItem("animeverseWatchlist", JSON.stringify(list));
}

function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function getAnimeById(id) {
    return animeData.find(anime => anime.id === Number(id));
}

// ===================================
// ANIME CARD CREATOR
// ===================================

function createAnimeCard(anime) {
    const watchlist = getWatchlist();
    const isSaved = watchlist.includes(anime.id);

    return `
        <article class="anime-card">
            <div class="poster" style="--poster:${anime.color}">
                <span class="poster-letter">${anime.title.charAt(0)}</span>
            </div>

            <div class="card-info">
                <h3>${anime.title}</h3>

                <div class="card-meta">
                    <span>⭐ ${anime.rating}</span>
                    <span>${anime.year}</span>
                </div>

                <div class="card-actions">
                    <a class="btn btn-small"
                       href="details.html?id=${anime.id}">
                       Details
                    </a>

                    <button
                        class="favorite-btn ${isSaved ? "saved" : ""}"
                        data-fav="${anime.id}"
                        aria-label="Toggle watchlist">
                        ${isSaved ? "♥" : "♡"}
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderAnimeList(containerId, list) {
    const container = document.getElementById(containerId);

    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1">
                <h2>No anime found</h2>
                <p>Try another search or filter.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(createAnimeCard).join("");
}

// ===================================
// HOME PAGE
// ===================================

function loadHomePage() {
    renderAnimeList(
        "featuredAnime",
        animeData.slice(0, 4)
    );
}

// ===================================
// EXPLORE PAGE
// ===================================

function loadExplorePage() {
    const search = document.getElementById("animeSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!search) return;

    let activeGenre = "All";

    function updateResults() {
        const searchText = search.value.toLowerCase();

        const filtered = animeData.filter(anime => {
            const matchesName =
                anime.title.toLowerCase().includes(searchText);

            const matchesGenre =
                activeGenre === "All" ||
                anime.genre.includes(activeGenre);

            return matchesName && matchesGenre;
        });

        renderAnimeList("exploreAnime", filtered);
    }

    search.addEventListener("input", updateResults);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");
            activeGenre = button.dataset.genre;

            updateResults();
        });
    });

    updateResults();
}

// ===================================
// TRENDING PAGE
// ===================================

function loadTrendingPage() {
    const trending = [...animeData].sort(
        (a, b) => b.rating - a.rating
    );

    renderAnimeList("trendingAnime", trending);
}

// ===================================
// DETAILS PAGE
// ===================================

function loadDetailsPage() {
    const container = document.getElementById("animeDetails");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const animeId = params.get("id");
    const anime = getAnimeById(animeId);

    if (!anime) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Anime not found</h2>
                <p>Please choose an anime from the Explore page.</p>
                <br>
                <a href="explore.html" class="btn">Explore Anime</a>
            </div>
        `;
        return;
    }

    const saved = getWatchlist().includes(anime.id);

    container.innerHTML = `
        <div class="details-layout">
            <div class="details-poster"
                 style="--poster:${anime.color}">
                ${anime.title.charAt(0)}
            </div>

            <div class="details-content">
                <span class="eyebrow">ANIME DETAILS</span>

                <h1>${anime.title}</h1>

                <div class="card-meta">
                    <span>⭐ ${anime.rating}/10</span>
                    <span>${anime.year}</span>
                    <span>${anime.episodes} episodes</span>
                </div>

                <div class="detail-tags">
                    ${anime.genre.map(genre =>
                        `<span class="tag">${genre}</span>`
                    ).join("")}
                    <span class="tag">${anime.status}</span>
                </div>

                <p>${anime.description}</p>

                <button
                    class="btn"
                    data-fav="${anime.id}">
                    ${saved ? "♥ Remove from Watchlist" : "♡ Add to Watchlist"}
                </button>

                <br><br>
                <a href="explore.html" class="btn btn-outline">
                    ← Back to Explore
                </a>
            </div>
        </div>
    `;
}

// ===================================
// WATCHLIST PAGE
// ===================================

function loadWatchlistPage() {
    const savedIds = getWatchlist();

    const savedAnime = animeData.filter(anime =>
        savedIds.includes(anime.id)
    );

    renderAnimeList("watchlistAnime", savedAnime);

    const count = document.getElementById("watchlistCount");

    if (count) {
        count.textContent = savedAnime.length;
    }
}

// ===================================
// GLOBAL WATCHLIST BUTTON HANDLER
// ===================================

document.addEventListener("click", function(event) {
    const button = event.target.closest("[data-fav]");

    if (!button) return;

    const id = Number(button.dataset.fav);
    let watchlist = getWatchlist();

    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(item => item !== id);
        showToast("Removed from your watchlist");
    } else {
        watchlist.push(id);
        showToast("Added to your watchlist!");
    }

    saveWatchlist(watchlist);

    // Refresh the current page's content
    if (document.getElementById("featuredAnime")) {
        loadHomePage();
    }

    if (document.getElementById("exploreAnime")) {
        loadExplorePage();
    }

    if (document.getElementById("trendingAnime")) {
        loadTrendingPage();
    }

    if (document.getElementById("watchlistAnime")) {
        loadWatchlistPage();
    }

    if (document.getElementById("animeDetails")) {
        loadDetailsPage();
    }
});

// ===================================
// MOBILE NAVIGATION
// ===================================

const menuButton = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// ===================================
// AUTOMATIC PAGE DETECTION
// ===================================

const currentPage = document.body.dataset.page;

if (currentPage === "home") loadHomePage();
if (currentPage === "explore") loadExplorePage();
if (currentPage === "trending") loadTrendingPage();
if (currentPage === "details") loadDetailsPage();
if (currentPage === "watchlist") loadWatchlistPage();
