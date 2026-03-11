export function getCommentsFromLocalStrg() {
  return JSON.parse(localStorage.getItem("CustomersComments")) || [];
}

export function saveComments(savedComments) {
  localStorage.setItem("CustomersComments", JSON.stringify(savedComments));
}

export function saveCommentsToLocalStorage() {
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const emailAdresse = document.getElementById("email");
  const inputFeld = document.getElementById("commentInput");

  const fname = firstName.value.trim();
  const lname = lastName.value.trim();
  const email = emailAdresse.value.trim();
  const text = inputFeld.value.trim();

  let savedComments = getCommentsFromLocalStrg();

  const nameCheck = /^(?=.*[a-zA-ZäöüÄÖÜß])[a-zA-ZäöüÄÖÜß\s-]+$/;
  if (!nameCheck.test(fname) || !nameCheck.test(lname)) {
    alert("Namen dürfen keine Zahlen enthalten oder leer sein");
    return;
  }

  const isSameName = savedComments.some(
    (comment) => comment.firstName === fname && comment.lastName === lname,
  );

  if (isSameName) {
    alert("Dieser Name wurde bereit vergeben!");
    return;
  }

  if (!email.includes("@") || !email.includes(".") || !email.includes(".com")) {
    alert("Bitte eine echte E-mail Adresse eingeben!");
    return;
  }

  const emailExists = savedComments.some(
    (c) => c.email.toLowerCase() === email.toLowerCase(),
  );

  if (emailExists) {
    alert("Diese E-mail wurde bereits genutzt oder gespeichert");
    return;
  }

  const textExists = savedComments.some((c) => c.comment.trim() === text);
  if (textExists) {
    alert("Diesen kommentar hast du bereits so geschrieben.");
    return;
  }

  const newComment = {
    id: Date.now(),
    firstName: fname,
    lastName: lname,
    email: email,
    comment: text,
    date: new Date().toLocaleString(),
  };

  savedComments.unshift(newComment);

  const limitedComments = savedComments.slice(0, 3);
  saveComments(limitedComments);

  alert(
    "Erfolgreich gespeichert! nur die letzten 3 kommentare werden behalten.",
  );

  [firstName, lastName, emailAdresse, inputFeld].forEach(
    (el) => (el.value = ""),
  );
}
