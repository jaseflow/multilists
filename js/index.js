var hearts = document.querySelectorAll(".heart")
    modal = document.getElementById("modal"),
    newCheckbox = document.getElementById("new-list-checkbox"),
    modalContent = document.getElementById("modal-content")
    toast = document.getElementById("toast"),
    heartNav = document.getElementById("heart-nav"),
    toastActions = document.querySelectorAll(".toast__action"),
    newInput = document.getElementById("new-list-input"),
    checkboxTemplate = document.getElementById("checkbox-template");

var titleSuggestion,
    activeHeartItemId;

var totalCheckedLists = 0;

function addListTemplate(list) {
  checkboxTemplate.content.querySelector("span").textContent = list.dataset.listName;
  checkboxTemplate.content.querySelector("input").setAttribute("id", list.dataset.listName.replace(/\s+/g, "-").toLowerCase());
  document.getElementById("above-here").insertBefore(document.importNode(checkboxTemplate.content, true), null);
}

function handleListFormSubmit(e) {
  var lists = e.target.querySelectorAll("input"),
    checked = [];
  e.preventDefault();
  if(modal.classList.contains("modal--in")) {
    modal.classList.remove("modal--in");
  }
  lists.forEach(function(list) {
    if(list.checked) {
      checked.push(list);
    }
    if(list.checked && list.id === "new-list-checkbox") {
      newInput.setAttribute("hidden", true);
      newCheckbox.checked = false;
      addListTemplate(list);
    }
  });

  setTimeout(function() {
    saveToList(checked);
  });
}

function handleNewInputKeypress(e) {
  newCheckbox.dataset.listName = e.target.value;
}

function saveToList(lists) {
  var singleListMessage = document.getElementById("single-list-message"),
      multipleListMessage = document.getElementById("multiple-list-message"),
      removalListMessage = document.getElementById("removal-list-message"),
      singleListName = document.getElementById("single-list-name");
      removalListName = document.getElementById("removal-list-name");
  if(lists.length > 0) {
    heartNav.classList.add("lists-link--on");
    toast.classList.add("toast--pop");
    if(lists.length == 1) {
      singleListMessage.hidden = false;
      singleListName.textContent = lists[0].dataset.listName;
    } else {
      multipleListMessage.hidden = false;
    }
    document.querySelector('input[data-item-id=' + activeHeartItemId + ']').checked = true;
    setTimeout(function() {
      toast.classList.add("toast--press");
      setTimeout(function() {
        toast.setAttribute("class", "toast");
        singleListMessage.hidden = true;
        multipleListMessage.hidden = true;
      }, 1000);
    }, 3000);
  } else if(lists.length === 0) {
    toast.classList.add("toast--pop");
    document.querySelector('input[data-item-id=' + activeHeartItemId + ']').checked = false;
    removalListMessage.hidden = false;
    setTimeout(function() {
      toast.classList.add("toast--press");
      setTimeout(function() {
        toast.setAttribute("class", "toast");
        removalListMessage.hidden = true;
      }, 1000);
    }, 3000);
  }
}

function displayLists(suggestion) {
  var saveBtn = document.getElementById("lists-save-button"),
      listOptions = modal.querySelectorAll(".lists__option"),
      listForm = modal.querySelector("#lists-form");
  if(!modal.classList.contains("modal--in")) {
    modal.classList.add("modal--in");
  }
  listOptions.forEach(function(option) {
    option.addEventListener("click", function(e) {
      if(option.id === "new-list-checkbox") {
        newInput.removeAttribute("hidden");
        if(suggestion) {
          newInput.setAttribute("value", suggestion);
          newCheckbox.setAttribute("data-list-name", suggestion);
        }
        newInput.focus();
        newInput.select();
      }
    })
  });
  listForm.addEventListener("submit", handleListFormSubmit);
  newInput.addEventListener("keyup", handleNewInputKeypress);
}

hearts.forEach(function(heart) {
  heart.addEventListener("click", function(e) {
    var suggestion = e.target.dataset.suggestion
        id = e.target.dataset.itemId;
    e.preventDefault();
    activeHeartItemId = id;
    displayLists(suggestion, id);
  });
})

toastActions.forEach(function(action) {
  action.addEventListener("click", function(e) {
    var suggestion = e.target.dataset.suggestion,
        id = e.target.dataset.itemId;
    displayLists(suggestion + "2", id);
  });
});

modal.addEventListener("click", function(e) {
  var listOptions = modal.querySelectorAll(".lists__option");
  if(modal.classList.contains("modal--in")) {
    modal.classList.remove("modal--in");
  }
});

modalContent.addEventListener("click", function(e) {
  e.stopPropagation();
});
