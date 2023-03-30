const url = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.querySelector("#load-button");
const sortCheckbox = document.querySelector("#sort-checkbox");
const userList = document.querySelector("#user-list");

loadButton.addEventListener("click", async () => {
    const response = await fetch(url);
    const data = await response.json();

    const randomUsers = [];
    while (randomUsers.length < 3) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomUser = data[randomIndex];
        if (!randomUsers.includes(randomUser)) {
            randomUsers.push(randomUser);
        }
    }

    if (sortCheckbox.checked) {
        randomUsers.sort((userA, userB) => {
            const wordsA = userA.name.split(" ");
            const lastNameA = wordsA[wordsA.length - 1];
            const wordsB = userB.name.split(" ");
            const lastNameB = wordsB[wordsB.length - 1];
            return lastNameA.localeCompare(lastNameB);
        });
    }
    let userDiv = ``;
    randomUsers.map((user) => {
        
        userDiv =
            userDiv +
            `
        <div class="card" style="width: 21rem">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: ${user.name}</li>
                    <li class="list-group-item">City: ${user.address.city}</li>
                    <li class="list-group-item">Company: ${user.company.name}</li>
                </ul>
            </div>
         </div>
        `;
    });

    userList.innerHTML = "";
    userList.innerHTML = userDiv;
});
