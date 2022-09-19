const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const searchString = e.target.value;

  if (searchString.length > 2) {
    const filteredSearch = fetchTickers(searchString);
    // console.log(filteredSearch);
    // displayResults(filteredSearch);
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
        <li>${el["1. symbol"]}</li>
        <li>${el["2. name"]}</li>
        <li>${el["3. type"]}</li>
        <li>${el["4. region"]}</li>
        <li>${el["5. marketOpen"]}</li>
        <li>${el["6. marketClose"]}</li>
        <li>${el["7. timezone"]}</li>
        <li>${el["8. currency"]}</li>
        <li>${el["9. matchScore"]}</li>
      </ul>
      </a>
    `;
    })
    .join("");

  document.getElementById("results").innerHTML = htmlStr;
};

const fetchData = (ticker) => {
  console.log(`${ticker} was clicked`);
};
