const searchBar = document.getElementById("search-bar");
let typingTimer;
let idleTimer = 1500;

searchBar.addEventListener("keyup", (e) => {
  clearTimeout(typingTimer);
  const searchString = e.target.value;

  if (searchString.length > 2) {
    // const filteredSearch = fetchTickers(searchString);
    // console.log(searchString);
    typingTimer = setTimeout(fetchTickers, idleTimer, searchString);
  }
});

const fetchTickers = async (str) => {
  try {
    const res = await fetch("/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: str,
      }),
    });

    const results = await res.json();

    console.log(results);
    displayResults(results);
  } catch (err) {
    console.error(err);
  }
};

const displayResults = (data) => {
  const htmlStr = data
    .map((el) => {
      return `
      <a href="/stocks/ticker?symbol=${el["1. symbol"]}")">
        <ul>
          <li>
            <strong>${el["1. symbol"]}</strong> - ${el["2. name"]}
          </li>
        </ul>
      </a>`;
    })
    .join("");

  const res = document.getElementById("results");
  res.style.display = "block";
  res.innerHTML = htmlStr;
};
