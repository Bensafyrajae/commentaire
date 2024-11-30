const commentSection = document.getElementById("comments");
const commentInput = document.getElementById("comment-input");
const addCommentBtn = document.getElementById("add-comment-btn");

// Fonction pour ajouter un commentaire principal
function addComment(content, isSubComment = false, parentComment = null) {
    const comment = document.createElement("div");
    comment.className = isSubComment ? "comment sub-comment" : "comment";

    const commentContent = document.createElement("div");
    commentContent.className = "content";
    commentContent.innerText = content;

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.innerHTML = `<span class="reply">Répondre</span>`;
    
    // Ajouter une logique pour répondre
    actions.querySelector(".reply").addEventListener("click", () => {
        const replyBox = document.createElement("div");
        replyBox.className = "new-reply";
        replyBox.innerHTML = `
            <textarea placeholder="Répondre..."></textarea>
            <button>Publier</button>
        `;
        comment.appendChild(replyBox);

        const replyTextarea = replyBox.querySelector("textarea");
        const replyButton = replyBox.querySelector("button");
        replyButton.addEventListener("click", () => {
            if (replyTextarea.value.trim() !== "") {
                addComment(replyTextarea.value, true, comment);
                replyBox.remove();
            }
        });
    });

    comment.appendChild(commentContent);
    comment.appendChild(actions);

    if (parentComment) {
        parentComment.appendChild(comment);
    } else {
        commentSection.appendChild(comment);
    }
}

addCommentBtn.addEventListener("click", () => {
    const content = commentInput.value.trim();
    if (content) {
        addComment(content);
        commentInput.value = ""; 
    }
});
