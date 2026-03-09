// button active function
let allIssues = [];

const btnActiveSystem = () => {
  const buttons = document.querySelectorAll(".primaryBtn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove class
      buttons.forEach((b) => {
        b.classList.remove("bg-blue-700", "text-white");
        b.classList.add("bg-white");
      });
      //add class
      btn.classList.remove("bg-white");
      btn.classList.add("bg-blue-700", "text-white");

      //added custom attribute in all button and hold
      const findBtn = btn.dataset.filter.toLowerCase();

      // filter issues with issues.status and default render all issues
      if (findBtn === "all") {
        renderAllCard(allIssues);
      } else {
        const filtered = allIssues.filter((issue) => issue.status === findBtn);
        renderAllCard(filtered);
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", btnActiveSystem);

// Data Fetching
const fetchAllData = async () => {
  const url = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await url.json();
  // reassign allIssues Data
  allIssues = data.data;
  renderAllCard(allIssues);
};

fetchAllData();

// display issues cards function
const renderAllCard = (cardData) => {
  const cardContainer = document.getElementById("card-container");
  const issuesCounter = document.getElementById("issues-counter");

  issuesCounter.innerHTML = `${cardData.length} Issues`;
  cardContainer.innerHTML = "";

  cardData.forEach((info) => {
    const cardDiv = document.createElement("div");
    const statusImg =
      info.status === "open"
        ? `<img src="./assets/Open-Status.png" alt="open-status" />`
        : `<img src="./assets/Closed-Status.png" alt="Closed-status" />`;

    const priorityClass =
      info.priority === "high"
        ? "bg-red-100 text-red-600"
        : info.priority === "medium"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-gray-100 text-gray-600";

    const cardBorder =
      info.status === "open" ? "border-green-500" : "border-purple-500";

    cardDiv.innerHTML = `
       <div
          onclick = "fetchIssuesDetails(${info.id})" class="max-w-sm w-full bg-white rounded-xl shadow-md border-t-4 overflow-hidden ${cardBorder}"
        >
          <!-- top section -->
          <div class="p-6">
            <!-- header -->
            <div class="flex justify-between items-start mb-4">
              <!-- icon -->
              <div
                class="rounded-full flex items-center justify-center"
              >
                 ${statusImg}
              </div>
              <!-- status -->
              <span
                class="${priorityClass} px-4 py-1 rounded-full text-sm font-semibold"
              >
                ${info.priority.toUpperCase()}
              </span>
            </div>
            <!-- title -->
            <h2 class="text-xl font-semibold text-gray-800 mb-2">
              ${info.title}
            </h2>
            <!-- description -->
            <p class="text-gray-500 text-sm mb-4">
              ${info.description}
            </p>

            <!-- tags -->
            <div class="flex gap-1 flex-wrap">

            <!-- cal labels function -->
             ${getLabelHTML(info.labels)}
            </div>
          </div>
          <!-- footer -->
          <div class="bg-gray-50 px-6 py-4 text-gray-500 border-t">
            <p>${info.author}</p>

            <!-- cal date Formatting function -->
             <p>${dateFormatting(info.createdAt)}</p>
          </div>
        </div>
  `;
    cardContainer.append(cardDiv);
  });
};

// labels function
const getLabelHTML = (labels) => {
  return (
    labels
      ?.map((l) => {
        const config = {
          bug: { color: "red", icon: "fa-bug" },
          "help wanted": { color: "yellow", icon: "fa-life-ring" },
          enhancement: { color: "green", icon: "fa-wand-magic-sparkles" },
          "good first issue": { color: "purple", icon: "fa-star" },
          documentation: { color: "gray", icon: "fa-file-code" },
        };

        const style = config[l.toLowerCase()];
        if (!style) return "";

        return `<span class="flex items-center gap-1 border px-2 py-1 rounded-full text-sm text-${style.color}-500 bg-${style.color}-200">
        <i class="fa-solid ${style.icon}"></i> ${l.toUpperCase()}
      </span>`;
      })
      .join("") || ""
  );
};

// date formatting function
const dateFormatting = (date) => {
  const newDate = new Date(date);

  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
};

// fetch data issues details function
const fetchIssuesDetails = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const details = await res.json();
  displayIssuesDetails(details);
};

// display issues details
const displayIssuesDetails = (details) => {
  const modalContainer = document.getElementById("modal-container");
  const d = details.data;

  const priorityModalClass =
    d.priority === "high"
      ? "bg-red-100 text-red-600"
      : d.priority === "medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-white text-gray-600";

  modalContainer.innerHTML = `
      <div class="bg-white  rounded-lg  w-auto">
          <!-- Title -->
          <h1 class="text-2xl font-bold text-gray-800">
          ${d.title}
          </h1>

          <!-- Status Row -->
          <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <span
              class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium"
            >
              ${d.status === "open" ? d.status.charAt(0).toUpperCase() + d.status.slice(1) + "ed" : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
            </span>
            <li  class ="ml-4"
              >Opened by
              <span class="font-medium text-gray-700">
              ${d.author}
              </span></
            >
            
            <li class ="ml-4">${dateFormatting(d.createdAt)}</li>
          </div>

          <!-- Labels -->
          <div class="flex gap-2 mt-4">
           ${getLabelHTML(d.labels)}
          </div>

          <!-- Description -->
          <p class="text-gray-500 mt-4">
           ${d.description}
          </p>

          <!-- Bottom Section -->
          <div
            class="bg-gray-100 rounded-lg p-4 mt-6 flex justify-between items-center"
          >
            <div>
              <p class="text-sm text-gray-500">Assignee:</p>
              <p class="font-semibold text-gray-700">${d.assignee ? d.assignee : ""}</p>
            </div>

            <div class="text-center">
              <p class="text-sm text-gray-500">Priority:</p>
              <span class=" text-xs px-3 py-1 font-bold rounded-full ${priorityModalClass}">
                ${d.priority.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

    `;

  document.getElementById("my_modal_1").showModal();
};
