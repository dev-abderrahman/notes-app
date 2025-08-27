const header = document.querySelector(".header");
const navItem = header.querySelectorAll(".navigation button");
const menuBtn = header.querySelector(".menu-btn");
const sections = document.querySelectorAll(".section");
const divStatus = document.querySelector(".div-status");
const title_input = document.getElementById("title-input");
const select = document.getElementById("select");
const note_input = document.getElementById("note-input");
const add_btn = document.getElementById("add-btn");

// app dom
const dom = () => {
  navItem.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.getAttribute("data-section"));
      header.classList.remove("open-menu");
    });
  });
  menuBtn.addEventListener("click", () => {
    header.classList.toggle("open-menu");
  });
  //switch between sections
  const showSection = (TargetSection) => {
    sections.forEach((section) => {
      section.classList.remove("active-section");
    });
    TargetSection = document.querySelector(`.${TargetSection}`);
    TargetSection.classList.add("active-section");
  };
};
dom();

// app : "create note" , "delete note"
let notes;
if (localStorage.notes != null) {
  notes = JSON.parse(localStorage.notes);
} else {
  notes = [];
}

add_btn.addEventListener("click", () => {
  formValidation(title_input.value, select.value, note_input.value);
});

// form validation
const formValidation = (title, category, note) => {
  if (title && category && note) {
    createNote(title, category, note);
    addNotesToHTML();
    createSuccessful();
  } else {
    createError();
  }

  divStatus.classList.add("show-div-status");
  // remove status after 1,5 second
  setTimeout(() => {
    divStatus.classList.remove("show-div-status");
  }, 1500);
};

// create notes object
const createNote = (title, category, note) => {
  let noteObject = {
    title: title,
    category: category,
    note: note,
  };
  notes.push(noteObject);
  storageNotes(notes);
  resetForm();
};

//reset form
const resetForm = () => {
  title_input.value = "";
  select.value = "personal";
  note_input.value = "";
};

// create status
const div_message = document.createElement("div");

const createSuccessful = () => {
  let message = "create successful";
  divStatus.innerHTML = `<i class="hgi hgi-stroke hgi-tick-01"></i> ${message}`;
  divStatus.style.color = "#75ff59ff";
};

const createError = () => {
  let message = "invalid inputs";
  divStatus.innerHTML = `<i class="hgi hgi-stroke hgi-spam"></i> ${message}`;
  divStatus.style.color = "#ff5959";
};

// add to storage
const storageNotes = (notes) => {
  let starage = localStorage;
  let key = "notes";
  starage.setItem(key, JSON.stringify(notes));
};

// Read notes from storage
const addNotesToHTML = () => {
  let note_card = "";
  for (let i = 0; i < notes.length; i++) {
    note_card += `
        <div class="note-card" id="note-${i}">
           <div class="note-bar">
              <div class="note-bar-left">
                <p class="title">${notes[i].title}</p>
                <p class="category">
                  ${notes[i].category}
                </p>
              </div>
              <div class="note-bar-right">
                <button onclick='deleteNote(${i})'>
                  <i class="hgi hgi-stroke hgi-delete-02"></i>
                </button>
              </div>
            </div>
            <p class="note-text">
              ${notes[i].note}
            </p>
          </div>
          `;
  }
  document.querySelector(".notes-cards").innerHTML = note_card;
};
addNotesToHTML();

// delete note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.notes = JSON.stringify(notes);
  addNotesToHTML();
}

// app end