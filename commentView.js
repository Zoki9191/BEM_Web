import { getCommentsFromLocalStrg } from "./saveToLocSt.js";

export function savedCommentsShow() {
  const comments = getCommentsFromLocalStrg();
  const listElement = document.getElementById("commentList");

  if (!listElement) return;

  if (comments.length === 0) {
    listElement.innerHTML = "<li> Noch keine kommentare vorhanden. </li>";
    return;
  }

  listElement.innerHTML = comments
    .map(
      (c) => `
        
            <li class="commentList__comment-item">
            <strong>${c.firstName} </strong> <small> (${c.date}) </small><br>
            <p>${c.comment} </p>
            </li>
        `,
    )
    .join("");
}
