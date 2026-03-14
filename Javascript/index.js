const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const cardContainer = document.querySelector("#card-container");
const body = document.querySelector("body");

async function loadData() {

    const res = await fetch(url);
    const data = await res.json();

    const issues = data.data;

    const allBtn = document.querySelector("#all-btn");
    const openBtn = document.querySelector("#open-btn");
    const closeBtn = document.querySelector("#closed-btn");

    createCards(issues);
    updateIssuequantity(issues.length);

    const statusBtns = [allBtn, openBtn, closeBtn];

    for (const statusBtn of statusBtns) {

        statusBtn.addEventListener("click", (e) => {

            const id = e.target.id;

            if (id === "all-btn") {

                createCards(issues);
                updateIssuequantity(issues.length);

                openBtn.classList.remove("bg-primary", "text-white");
                closeBtn.classList.remove("bg-primary", "text-white");
                allBtn.classList.add("bg-primary", "text-white");

            }

            else if (id === "open-btn") {

                const openData = issues.filter(issue => issue.status === "open");

                createCards(openData);
                updateIssuequantity(openData.length);

                allBtn.classList.remove("bg-primary", "text-white");
                closeBtn.classList.remove("bg-primary", "text-white");
                openBtn.classList.add("bg-primary", "text-white");

            }

            else if (id === "closed-btn") {

                const closedData = issues.filter(issue => issue.status === "closed");

                createCards(closedData);
                updateIssuequantity(closedData.length);

                allBtn.classList.remove("bg-primary", "text-white");
                openBtn.classList.remove("bg-primary", "text-white");
                closeBtn.classList.add("bg-primary", "text-white");

            }

        });

    }

}

loadData();

function createCards(issues) {

    cardContainer.innerHTML = "";

    for (const issue of issues) {

        const card = document.createElement("div");

        card.className = "cards bg-white shadow-2xl rounded-sm p-4 cursor-pointer";

        /* -------- dynamic labels -------- */

        const labelsHTML = issue.labels.map(label => {

            let color = "bg-gray-200 text-gray-700";

            if (label === "bug") color = "bg-red-200 text-red-600";
            if (label === "help wanted") color = "bg-yellow-200 text-yellow-700";
            if (label === "enhancement") color = "bg-green-200 text-green-700";
            if (label === "documentation") color = "bg-blue-200 text-blue-700";
            if (label === "good first issue") color = "bg-purple-200 text-purple-700";

            return `
                <div class="rounded-sm px-2 text-[10px] ${color}">
                    ${label.toUpperCase()}
                </div>
            `;

        }).join("");

        // changing tinyimage logo in card basis on their status

        let UpdatestatusImg;

        if (issue.status === "open") {
            UpdatestatusImg = "Open-Status.png";
        }
        else {
            UpdatestatusImg = "ClosedStatus.png";
        }



        card.innerHTML = `
        
        <!-- priority section -->
        <div class="flex justify-between mb-3">

            <div>
                <img src="/assets/${UpdatestatusImg}">
            </div>

            <div class="priority-box rounded-sm bg-red-300 px-2 text-[10px] text-red-600">
                ${issue.priority}
            </div>

        </div>

        <!-- card body -->

        <div>

            <h3 class="font-bold">${issue.title}</h3>
            <p class="text-sm">${issue.description}</p>

            <div class="flex gap-2 mt-3 flex-wrap">

                ${labelsHTML}

            </div>

        </div>

        <div class="mt-3 text-[13px]">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        `;

        /* -------- priority color change -------- */

        const priorityBox = card.querySelector(".priority-box");

        if (issue.priority === "low") {

            priorityBox.classList.remove("bg-red-300", "text-red-600");
            priorityBox.classList.add("bg-gray-100", "text-gray-600");

        }

        if (issue.priority === "medium") {

            priorityBox.classList.remove("bg-red-300", "text-red-600");
            priorityBox.classList.add("bg-yellow-200", "text-yellow-700");

        }

        /* -------- status border change -------- */

        if (issue.status === "open") {

            card.classList.add("border-t-4", "border-green-500");

        }

        else {

            card.classList.add("border-t-4", "border-purple-500");

        }

        cardContainer.appendChild(card);


        // modal 
        const modal = document.querySelector("#my_modal_5");
        const modalContent = document.querySelector(".modal-box");
        card.addEventListener("click", () => {

            const modal = document.querySelector("#my_modal_5");
            const modalContent = document.querySelector("#my_modal_5 .modal-box");

            /* labels dynamic */

            const labelsHTML = issue.labels.map(label => {

                let color = "bg-gray-200 text-gray-700";

                if (label === "bug") color = "bg-red-100 text-red-600";
                if (label === "help wanted") color = "bg-yellow-100 text-yellow-700";
                if (label === "enhancement") color = "bg-green-100 text-green-700";
                if (label === "documentation") color = "bg-blue-100 text-blue-700";
                if (label === "good first issue") color = "bg-purple-100 text-purple-700";

                return `
<span class="px-2 py-1 text-xs rounded-full ${color}">
${label.toUpperCase()}
</span>
`;

            }).join("");

            /* status color */

            const statusColor =
                issue.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700";

            /* priority color */

            const priorityColor =
                issue.priority === "high"
                    ? "bg-red-500 text-white"
                    : issue.priority === "medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-400 text-white";

            modalContent.innerHTML = `

<h2 class="text-xl font-bold mb-2">
${issue.title}
</h2>

<div class="flex items-center gap-2 mb-3">

<span class="px-2 py-1 text-xs rounded-full ${statusColor}">
${issue.status}
</span>

<span class="text-sm text-gray-500">
Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>

<div class="flex gap-2 mb-4 flex-wrap">
${labelsHTML}
</div>

<p class="text-gray-600 mb-5">
${issue.description}
</p>

<div class="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded">

<div>
<p class="text-sm text-gray-500">Assignee:</p>
<p class="font-semibold">${issue.assignee || "Unassigned"}</p>
</div>

<div>
<p class="text-sm text-gray-500">Priority:</p>
<span class="px-2 py-1 text-xs rounded-full ${priorityColor}">
${issue.priority.toUpperCase()}
</span>
</div>

</div>

<div class="flex justify-end mt-6">
<form method="dialog">
<button class="btn bg-purple-600 text-white">
Close
</button>
</form>
</div>

`;

            modal.showModal();

        });
    }

}

function updateIssuequantity(size) {

    const totalIssue = document.querySelector(".totalissues");

    totalIssue.innerHTML = `
    
    <h1 class="font-bold">${size} Issues</h1>
    <h2>Track and manage your project issues</h2>
    
    `;

}