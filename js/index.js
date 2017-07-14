var hearts = document.querySelectorAll(".heart")
    modal = document.getElementById("modal"),
    newCheckbox = document.getElementById("new-list-checkbox"),
    modalContent = document.getElementById("modal-content")
    toast = document.getElementById("toast"),
    heartNav = document.getElementById("heart-nav");

var titleSuggestion,
    activeHeartItemId;

var totalCheckedLists = 0;


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
      singleListName = document.getElementById("single-list-name");
  if(lists.length > 0) {
    heartNav.classList.add("lists-link--on");
    toast.classList.add("toast--pop");
    document.querySelector('input[data-item-id=' + activeHeartItemId + ']').checked = true;
    setTimeout(function() {
      toast.classList.add("toast--press");
      setTimeout(function() {
        toast.setAttribute("class", "toast");
      }, 1000);
    }, 3000);
    if(lists.length == 1) {
      singleListMessage.hidden = false;
      singleListName.textContent = lists[0].dataset.listName;
    } else {
      multipleListMessage.hidden = false;
    }
  } else if(lists.length === 0) {
    document.querySelector('input[data-item-id=' + activeHeartItemId + ']').checked = false;
  }
}

function displayLists(suggestion) {
  var newInput = document.getElementById("new-list-input"),
      saveBtn = document.getElementById("lists-save-button"),
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
          newInput.setAttribute("data-list-name", suggestion);
        }
        newInput.focus();
        newInput.select();
      }
    })
  });
  listForm.addEventListener("submit", handleListFormSubmit);
  newInput.addEventListener("keypress", handleNewInputKeypress);
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

modal.addEventListener("click", function(e) {
  var listOptions = modal.querySelectorAll(".lists__option");
  if(modal.classList.contains("modal--in")) {
    modal.classList.remove("modal--in");
  }
});

modalContent.addEventListener("click", function(e) {
  e.stopPropagation();
});
