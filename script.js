let allIssues = [];
const cardContainer = document.getElementById("card-container");

// loader functions
const loader = document.getElementById("loader");
const showLoader = () => {
  loader.classList.remove("hidden");
};
const hideLoader = () => {
  loader.classList.add("hidden");
};

// button active function
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
  const errorHTML = document.getElementById("error");
  showLoader(); // loader show
  errorHTML.innerHTML = "";
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );

    if (!res.ok) {
      throw new Error("404 Not Found");
    }
    const data = await res.json();
    allIssues = data.data;
    renderAllCard(allIssues);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    cardContainer.innerHTML = ""; //if occurred error card content will be removed
    errorHTML.innerHTML = `
    <div class = "text-3xl text-orange-500 font-bold" >404</div> 
    <div class = "text-blue-500 font-bold" >Not Found Pleas try again!</div>
    `;
  } finally {
    hideLoader(); // remove loader
  }
};
fetchAllData();

// display issues cards function (this function called in fetchAllData() function)
const renderAllCard = (cardData) => {
  const issuesCounter = document.getElementById("issues-counter");

  issuesCounter.innerHTML = `${cardData?.length || 0} Issues`;
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
    <!-- call issues details function -->
       <div
          onclick = "fetchIssuesDetails(${info.id})" class="max-w-sm w-full bg-white rounded-xl shadow-md border-t-4 overflow-hidden ${cardBorder}"
        >
          <!-- top section -->
          <div class="p-5">
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
              ${cardDescriptionSizing(info.description)}
            </p>

            <!-- tags -->
            <div class="flex gap-1 flex-wrap">

            <!-- cal labels function -->
             ${getLabelHTML(info.labels)}
            </div>
          </div>

          <!-- footer -->
          <div class="bg-gray-50 px-5 py-4 text-gray-500 border-t">
            <p> #1 By ${info.author}</p>

            <!-- cal date Formatting function -->
             <p>${dateFormatting(info.createdAt)}</p>
          </div>
        </div>
  `;
    cardContainer.append(cardDiv);
  });
};

// labels function (this function called in renderAllCard() and  displayIssuesDetailsModal() function)
const getLabelHTML = (labels) => {
  return (
    labels
      ?.map((l) => {
        const config = {
          bug: { color: "text-red-500 bg-red-100", icon: "fa-bug" },
          "help wanted": {
            color: "text-yellow-500 bg-yellow-200",
            icon: "fa-life-ring",
          },
          enhancement: {
            color: "text-green-500 bg-green-200",
            icon: "fa-wand-magic-sparkles",
          },
          "good first issue": {
            color: "text-purple-500 bg-purple-200",
            icon: "fa-star",
          },
          documentation: {
            color: "text-gray-500 bg-gray-200",
            icon: "fa-file-code",
          },
        };

        const style = config[l.toLowerCase()];
        if (!style) return "";

        return `<span class="flex items-center gap-1 border px-2 rounded-full text-sm ${style.color} ${style.color}">
        <i class="fa-solid ${style.icon}"></i> ${l.toUpperCase()}
      </span>`;
      })
      .join("") || ""
  );
};

// date formatting function (this function called of renderAllCard() function in card date )
const dateFormatting = (date) => {
  const newDate = new Date(date);

  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
};

// fetch data issues details function (this function called in renderAllCard() function of parent div for get clicked card ID )
const fetchIssuesDetails = async (id) => {
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const details = await res.json();
    displayIssuesDetailsModal(details);
  } catch (error) {
    console.error("Fetch Error:", error.message);
  }
};

// display issues details (this function called in fetchIssuesDetails() function)
const displayIssuesDetailsModal = (details) => {
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
          <div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              ${d.status === "open" ? d.status.charAt(0).toUpperCase() + d.status.slice(1) + "ed" : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
            </span>
            <li  class ="ml-4">Opened by
              <span class="font-medium text-gray-700">
              ${d.author}
              </span></li>
            
            <li class ="ml-4">${dateFormatting(d.updatedAt)}</li>
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
              <p class="font-semibold text-gray-700">${d.assignee ? d.assignee : "Not Found Assignee"}</p>
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

// card description size fixing function (this function called of renderAllCard() function in card description )
const cardDescriptionSizing = (text) => {
  console.log(text);
  return text.length > 70 ? text.slice(0, 70) + "..." : text;
};
